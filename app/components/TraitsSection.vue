<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <!-- 標題欄 -->
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">屬性</h2>
    </div>
    
    <!-- 內容區 -->
    <div class="p-4 space-y-3">
      <div 
        v-for="trait in traits" 
        :key="trait.key" 
        class="flex items-center justify-between"
      >
        <span class="text-x font-semibold text-gray-800 w-8">{{ trait.name }}</span>
        
        <div class="flex gap-1">
          <button
            v-for="n in 5"
            :key="n"
            @click="setTraitValue(trait.key, n)"
            :class="[
              'w-8 h-8 rounded-full border-2 transition-all',
              n <= characterStore.traits[trait.key as keyof typeof characterStore.traits]
                ? 'bg-red-900 border-red-900 text-white'
                : 'bg-white border-gray-400 hover:border-red-700'
            ]"
          >
          </button>
        </div>

        <span class="text-sm font-semibold text-gray-800 w-44">{{ trait.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllTraits } = useGameData();
const traits = getAllTraits();

const setTraitValue = (traitKey: string, value: number) => {
  characterStore.setTrait(traitKey as any, value);
};
</script>

