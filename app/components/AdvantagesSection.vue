<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">優勢</h2>
    </div>
    
    <div class="p-4">
      <div v-if="characterStore.advantages.length > 0" class="space-y-2 mb-3">
        <div v-for="(advKey, index) in characterStore.advantages" :key="index" 
             @click="copyAdvantageContent(advKey)"
             class="p-3 bg-white rounded border border-gray-300 shadow-sm cursor-pointer hover:border-red-400 hover:shadow-md transition-all relative group">
          <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
              <div class="text-sm font-bold text-gray-800 mb-1">
                <span v-if="getAdvantage(advKey)?.isHeroPoint" class="mr-1">★</span>
                <span v-if="getAdvantage(advKey)?.isPersonal" class="mr-1">👤</span>
                {{ getAdvantageName(advKey) }}
              </div>
              <div class="text-xs text-gray-600 leading-relaxed">
                {{ getAdvantage(advKey)?.description }}
              </div>
              <div v-if="getAdvantage(advKey)?.conditionalCost && getAdvantage(advKey)!.conditionalCost!.length > 0" 
                   class="mt-2 text-xs text-blue-700">
                <div v-for="(cond, idx) in getAdvantage(advKey)!.conditionalCost" :key="idx">
                  💰 {{ getNationName(cond.nation) }}: {{ cond.reducedCost }} 點 ({{ cond.condition || '國籍折扣' }})
                </div>
              </div>
            </div>
            <div class="ml-3 flex flex-col items-end gap-2">
              <div class="px-2 py-1 bg-amber-400 text-amber-900 rounded text-xs font-bold whitespace-nowrap">
                {{ getAdvantageCost(advKey) }} 點
              </div>
              <button @click.stop="removeAdvantage(advKey)" 
                      class="px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 複製成功提示 -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <div v-if="showCopyToast" 
             class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="font-semibold">已複製優勢內容！</span>
        </div>
      </Transition>
      
      <div v-if="characterStore.advantages.length === 0" class="text-center py-4 text-gray-500 text-sm italic">
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
            :disabled="isAdvantageSelected(adv.key)"
            :class="[
              'text-left p-4 border-2 rounded-lg transition-all',
              isAdvantageSelected(adv.key)
                ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
                : 'bg-white border-red-200 hover:border-red-500 hover:shadow-md'
            ]"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="font-bold text-gray-800 text-sm">
                <span v-if="adv.isHeroPoint" class="mr-1">★</span>
                <span v-if="adv.isPersonal" class="mr-1">👤</span>
                {{ adv.name }}
              </div>
              <div class="px-2 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-bold whitespace-nowrap">
                {{ adv.cost }}
              </div>
            </div>
            <div class="text-xs text-gray-600 leading-relaxed mb-2">{{ adv.description }}</div>
            <div v-if="adv.conditionalCost && adv.conditionalCost.length > 0" 
                 class="mt-2 space-y-1">
              <div v-for="(cond, idx) in adv.conditionalCost" :key="idx"
                   class="text-xs text-blue-700 font-semibold">
                💰 {{ getNationName(cond.nation) }}: {{ cond.reducedCost }} 點
              </div>
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
import { getAdvantages, getAdvantageByKey } from '~/data/advantages';
import { getNationByKey } from '~/data/nations';

const characterStore = useCharacterStore();
const advantages = getAdvantages();

const showSelector = ref(false);
const filterCost = ref<string>('all');
const showCopyToast = ref(false);

const filteredAdvantages = computed(() => {
  if (filterCost.value === 'all') return advantages;
  const cost = parseInt(filterCost.value);
  return advantages.filter(adv => adv.cost === cost);
});

const getAdvantage = (advObj: { key: string; name: string }) => {
  return getAdvantageByKey(advObj.key);
};

const getAdvantageName = (advObj: { key: string; name: string }) => {
  return advObj.name;
};

const getAdvantageCost = (advObj: { key: string; name: string }) => {
  const advantage = getAdvantageByKey(advObj.key);
  return advantage?.cost || 0;
};

const getNationName = (nationKey?: string) => {
  if (!nationKey) return '';
  const nation = getNationByKey(nationKey);
  return nation?.name || nationKey;
};

const totalCost = computed(() => {
  return characterStore.advantages.reduce((sum, advObj) => {
    const advantage = getAdvantageByKey(advObj.key);
    return sum + (advantage?.cost || 0);
  }, 0);
});

const addAdvantage = (key: string) => {
  const advantage = getAdvantageByKey(key);
  if (advantage && !characterStore.advantages.some(a => a.key === key)) {
    characterStore.addAdvantage(key, advantage.name);
  }
};

const removeAdvantage = (advObj: { key: string; name: string }) => {
  const index = characterStore.advantages.findIndex(a => a.key === advObj.key);
  if (index !== -1) {
    characterStore.removeAdvantage(index);
  }
};

const isAdvantageSelected = (key: string) => {
  return characterStore.advantages.some(a => a.key === key);
};

const copyAdvantageContent = async (advObj: { key: string; name: string }) => {
  const advantage = getAdvantageByKey(advObj.key);
  if (!advantage) return;

  // 組合優勢的完整內容
  let content = '';
  
  // 標題和標記
  const markers = [];
  if (advantage.isHeroPoint) markers.push('★');
  if (advantage.isPersonal) markers.push('👤');
  content += `${markers.join(' ')} ${advantage.name}${markers.length > 0 ? '' : ''}\n`;
  content += `成本: ${advantage.cost} 點\n\n`;
  
  // 描述
  content += `${advantage.description}\n`;
  
  // 條件性折扣
  if (advantage.conditionalCost && advantage.conditionalCost.length > 0) {
    content += `\n條件性折扣:\n`;
    advantage.conditionalCost.forEach(cond => {
      const nationName = getNationName(cond.nation);
      content += `💰 ${nationName}: ${cond.reducedCost} 點 (${cond.condition || '國籍折扣'})\n`;
    });
  }

  try {
    await navigator.clipboard.writeText(content);
    showCopyToast.value = true;
    setTimeout(() => {
      showCopyToast.value = false;
    }, 2000);
  } catch (err) {
    console.error('複製失敗:', err);
  }
};
</script>
