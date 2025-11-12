<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">Advantages</h2>
    </div>
    
    <div class="p-4">
      <div v-if="characterStore.advantages.length > 0" class="space-y-2 mb-3">
        <div v-for="(advKey, index) in characterStore.advantages" :key="index" 
             class="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
          <div class="flex-1">
            <div class="text-sm font-semibold text-gray-800">{{ getAdvantageName(advKey) }}</div>
            <div class="text-xs text-gray-600">{{ getAdvantageCost(advKey) }} 點</div>
          </div>
          <button @click="removeAdvantage(advKey)" 
                  class="px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs">
            ✕
          </button>
        </div>
        <div class="text-center py-2 bg-amber-50 border border-amber-300 rounded font-semibold text-sm">
          總成本: {{ totalCost }} 點
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-500 text-sm italic">
        尚未選擇優勢
      </div>
      <button @click="showSelector = true" 
              class="w-full py-2 bg-red-900 hover:bg-red-800 text-white rounded text-sm font-semibold">
        + 選擇優勢
      </button>
    </div>

    <div v-if="showSelector" @click="showSelector = false"
         class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto">
        <div class="bg-red-900 text-white px-6 py-4 sticky top-0 z-10">
          <h3 class="text-xl font-bold">選擇優勢</h3>
          <select v-model="filterCost" 
                  class="mt-2 px-3 py-1 bg-white text-gray-800 rounded text-sm font-semibold">
            <option value="all">全部成本</option>
            <option value="1">1 點</option>
            <option value="2">2 點</option>
            <option value="3">3 點</option>
            <option value="4">4 點</option>
            <option value="5">5 點</option>
          </select>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            v-for="adv in filteredAdvantages"
            :key="adv.key"
            @click="addAdvantage(adv.key)"
            :disabled="characterStore.advantages.includes(adv.key)"
            :class="[
              'text-left p-4 border-2 rounded-lg transition-all',
              characterStore.advantages.includes(adv.key)
                ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                : 'bg-white border-red-200 hover:border-red-500 hover:shadow-md'
            ]"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="font-bold text-gray-800 text-sm">{{ adv.name }}</div>
              <div class="px-2 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-bold">
                {{ getAdvantageCost(adv.key) }}
              </div>
            </div>
            <div class="text-xs text-gray-600 leading-relaxed">{{ adv.description }}</div>
            <div v-if="hasDiscount(adv)" class="mt-2 text-xs text-green-700 font-semibold">
              🎯 國籍折扣
            </div>
          </button>
        </div>
        <div class="p-4 border-t sticky bottom-0 bg-white">
          <button @click="showSelector = false" 
                  class="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllAdvantages, getActualAdvantageCost } = useGameData();
const advantages = getAllAdvantages();

const showSelector = ref(false);
const filterCost = ref<string>('all');

const filteredAdvantages = computed(() => {
  if (filterCost.value === 'all') return advantages;
  const cost = parseInt(filterCost.value);
  return advantages.filter(adv => getActualAdvantageCost(adv.key, characterStore.nation) === cost);
});

const getAdvantageName = (key: string) => {
  return advantages.find(a => a.key === key)?.name || '';
};

const getAdvantageCost = (key: string) => {
  return getActualAdvantageCost(key, characterStore.nation);
};

const totalCost = computed(() => {
  return characterStore.advantages.reduce((sum, key) => 
    sum + getActualAdvantageCost(key, characterStore.nation), 0);
});

const hasDiscount = (adv: any) => {
  if (!adv.conditionalCost || !characterStore.nation) return false;
  return adv.conditionalCost.some((cond: any) => cond.nation === characterStore.nation);
};

const addAdvantage = (key: string) => {
  if (!characterStore.advantages.includes(key)) {
    characterStore.addAdvantage(key);
  }
};

const removeAdvantage = (key: string) => {
  characterStore.removeAdvantage(key);
};
</script>
