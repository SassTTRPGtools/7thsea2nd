<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <!-- 標題欄 -->
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">角色資訊</h2>
    </div>
    
    <!-- 內容區 -->
    <div class="p-4 space-y-3">
      <!-- 單行輸入欄位 -->
      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">玩家名稱</label>
        <input v-model="characterStore.player" 
               type="text" 
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800" />
      </div>

      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">角色名稱</label>
        <input v-model="characterStore.characterName" 
               type="text" 
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800" />
      </div>

      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">形象</label>
        <input v-model="characterStore.concept" 
               type="text" 
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800" />
      </div>

      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">國籍</label>
        <input v-model="nationName" 
               type="text" 
               readonly
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800 cursor-default" />
      </div>

      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">宗教</label>
        <input v-model="characterStore.religion" 
               type="text" 
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800" />
      </div>

      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">聲望</label>
        <input v-model="reputationText" 
               type="text" 
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800" />
      </div>

      <div class="flex items-center border-b border-red-900">
        <label class="w-28 text-sm font-semibold text-red-900">財富</label>
        <input v-model.number="characterStore.wealth" 
               type="number" 
               min="0"
               class="flex-1 px-2 py-1 bg-transparent focus:outline-none text-gray-800" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';
import { nations } from '~/data/nations';

const characterStore = useCharacterStore();

// 將聲望陣列轉換為單一字串，用逗號分隔
const reputationText = computed({
  get: () => characterStore.reputations.join(', '),
  set: (value: string) => {
    characterStore.reputations = value.split(',').map(s => s.trim()).filter(s => s);
  }
});

// 獲取國家的中文名稱
const nationName = computed(() => {
  if (!characterStore.nation) return '';
  const nation = nations[characterStore.nation];
  return nation ? nation.name : characterStore.nation;
});
</script>

