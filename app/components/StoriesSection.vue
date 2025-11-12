<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">Stories</h2>
    </div>
    
    <div class="p-4">
      <div class="space-y-3 mb-3">
        <div v-for="(story, index) in characterStore.stories" :key="index" 
             class="border-2 border-gray-300 rounded p-3 space-y-2">
          <div class="flex justify-between items-center mb-2">
            <div class="font-bold text-gray-800 text-sm">故事 {{ index + 1 }}</div>
            <button @click="removeStory(index)" 
                    class="px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs">
              ✕
            </button>
          </div>
          <input v-model="story.name" type="text" placeholder="故事名稱"
                 class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
          <input v-model="story.goal" type="text" placeholder="目標"
                 class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
          <input v-model="story.reward" type="text" placeholder="獎勵"
                 class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
          <textarea v-model="story.step1" placeholder="步驟 1" rows="2"
                    class="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none"></textarea>
        </div>
      </div>
      <button @click="addStory" 
              class="w-full py-2 bg-red-900 hover:bg-red-800 text-white rounded text-sm font-semibold">
        + 新增故事
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();

const addStory = () => {
  characterStore.addStory({ name: '', goal: '', reward: '', step1: '' });
};

const removeStory = (index: number) => {
  if (confirm('確定要刪除這個故事嗎？')) {
    characterStore.removeStory(index);
  }
};
</script>
