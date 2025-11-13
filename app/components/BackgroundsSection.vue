<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">背景</h2>
    </div>
    
    <div class="p-4">
      <!-- 已選背景列表 -->
      <div v-if="characterStore.backgrounds.length > 0" class="space-y-2 mb-3">
        <div v-for="(bg, index) in characterStore.backgrounds" :key="index" 
             class="bg-white border-2 border-stone-300 rounded p-3">
          <div class="flex items-start justify-between mb-2">
            <h3 class="font-bold text-red-900">{{ bg.name }}</h3>
            <button @click="removeBackground(index)" 
                    class="px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs">
              清除
            </button>
          </div>
          
          <div v-if="getBackgroundDetails(bg.key)" class="space-y-1 text-sm">
            <p class="text-stone-600">{{ getBackgroundDetails(bg.key)!.description }}</p>
            <div class="pt-1 border-t border-stone-200">
              <p class="text-xs text-stone-500">
                <span class="font-semibold">癖性:</span> {{ getBackgroundDetails(bg.key)!.quirk }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 選擇背景按鈕 (最多2個背景) -->
      <button v-if="characterStore.backgrounds.length < 2"
              @click="showModal = true" 
              class="w-full py-2 bg-red-900 hover:bg-red-800 text-white rounded text-sm font-semibold">
        + 選擇背景 ({{ characterStore.backgrounds.length }}/2)
      </button>
      <div v-else class="w-full py-2 bg-stone-300 text-stone-600 rounded text-sm font-semibold text-center">
        已達背景上限 (2/2)
      </div>
    </div>

    <!-- 背景選擇 Modal -->
    <Teleport to="body">
      <div v-if="showModal" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
           @click.self="showModal = false">
        <div class="bg-stone-50 rounded-lg max-w-6xl w-full max-h-[85vh] overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="bg-red-900 text-white px-4 py-3 flex justify-between items-center">
            <h2 class="text-xl font-bold">選擇背景</h2>
            <button @click="showModal = false" class="text-2xl hover:text-stone-300">×</button>
          </div>
          
          <!-- Category Tabs -->
          <div class="overflow-x-auto border-b border-stone-300 bg-white flex-shrink-0">
            <div class="flex min-w-max min-h-[44px]">
              <button v-for="cat in categories" :key="cat.key"
                      @click="selectedCategory = cat.key"
                      :class="[
                        'px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 flex-shrink-0 h-full',
                        selectedCategory === cat.key 
                          ? 'bg-red-900 text-white border-red-900' 
                          : 'text-stone-600 hover:bg-stone-100 border-transparent'
                      ]">
                {{ cat.label }}
                <span class="ml-1 opacity-70">({{ getBackgroundCountByCategory(cat.key) }})</span>
              </button>
            </div>
          </div>
          
          <!-- Background List -->
          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="filteredBackgrounds.length === 0" class="text-center py-8 text-stone-500">
              此分類暫無背景
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="bg in filteredBackgrounds" :key="bg.key"
                   @click="selectBackground(bg)"
                   :class="[
                     'bg-white border-2 rounded p-3 transition-all',
                     isBackgroundSelected(bg.key)
                       ? 'border-red-900 bg-red-50 cursor-not-allowed opacity-60'
                       : characterStore.backgrounds.length >= 2
                         ? 'border-stone-200 bg-stone-50 cursor-not-allowed opacity-50'
                         : 'border-stone-300 cursor-pointer hover:border-red-700 hover:shadow-md'
                   ]">
                <div class="flex items-start justify-between mb-1">
                  <h3 class="font-bold text-red-900">{{ bg.name }}</h3>
                  <span v-if="isBackgroundSelected(bg.key)" 
                        class="text-xs px-2 py-0.5 bg-red-900 text-white rounded">
                    已選擇
                  </span>
                </div>
                <p class="text-xs text-stone-600 mb-2">{{ bg.description }}</p>
                <p class="text-xs text-stone-500 mb-2">
                  <span class="font-semibold">癖性:</span> {{ bg.quirk }}
                </p>
                <div class="flex flex-wrap gap-1">
                  <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                    優勢: {{ formatAdvantages(bg.advantages) }}
                  </span>
                  <span class="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                    技能: {{ formatSkills(bg.skills) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';
import { backgrounds, getBackgroundsByCategory, categoryNames, type Background } from '~/data/backgrounds';
import { advantageNames } from '~/data/advantages';
import { skillNames } from '~/data/skills';

const characterStore = useCharacterStore();
const showModal = ref(false);
const selectedCategory = ref<Background['category']>('basic');

const categories = computed(() => [
  { key: 'basic' as const, label: categoryNames.basic },
  { key: 'glamourIsles' as const, label: categoryNames.glamourIsles },
  { key: 'avalon' as const, label: categoryNames.avalon },
  { key: 'inismore' as const, label: categoryNames.inismore },
  { key: 'highlandMarches' as const, label: categoryNames.highlandMarches },
  { key: 'castille' as const, label: categoryNames.castille },
  { key: 'eisen' as const, label: categoryNames.eisen },
  { key: 'montaigne' as const, label: categoryNames.montaigne },
  { key: 'sarmatian' as const, label: categoryNames.sarmatian },
  { key: 'ussura' as const, label: categoryNames.ussura },
  { key: 'vesten' as const, label: categoryNames.vesten },
  { key: 'vodacce' as const, label: categoryNames.vodacce }
]);

const filteredBackgrounds = computed(() => {
  return getBackgroundsByCategory(selectedCategory.value);
});

const getBackgroundDetails = (key: string): Background | undefined => {
  return backgrounds[key];
};

const getBackgroundCountByCategory = (category: Background['category']): number => {
  return getBackgroundsByCategory(category).length;
};

const isBackgroundSelected = (key: string): boolean => {
  return characterStore.backgrounds.some(bg => bg.key === key);
};

const formatAdvantages = (advKeys: string[]): string => {
  return advKeys.map(key => advantageNames[key] || key).join(', ');
};

const formatSkills = (skillKeys: string[]): string => {
  return skillKeys.map(key => skillNames[key] || key).join(', ');
};

const selectBackground = (bg: Background) => {
  // 檢查是否已達上限
  if (characterStore.backgrounds.length >= 2) {
    return;
  }
  
  // 檢查是否已選擇此背景
  if (characterStore.backgrounds.find(b => b.key === bg.key)) {
    return;
  }
  
  characterStore.addBackground(bg.key, bg.name);
  
  // 如果達到上限，自動關閉 modal
  if (characterStore.backgrounds.length >= 2) {
    showModal.value = false;
  }
};

const removeBackground = (index: number) => {
  characterStore.removeBackground(index);
};
</script>
