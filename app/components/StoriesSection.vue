<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <button class="w-full py-2 bg-red-900 hover:bg-red-800 text-white rounded text-sm font-semibold"@click="addStory" >+ 新增故事</button>
    </div>
    <div class="p-4">
      <div class="space-y-2 mb-3">
        <div v-for="(story, index) in reversedStories" :key="story.originalIndex" 
             class="border-2 border-gray-300 rounded overflow-hidden">
          <!-- 摺疊標題列 -->
          <div @click="toggleStory(story.originalIndex)"
               class="flex justify-between items-center p-2 bg-stone-100 hover:bg-stone-200 cursor-pointer">
            <div class="flex items-center gap-2 flex-1 min-w-0">
              <span class="text-lg">{{ expandedStories.has(story.originalIndex) ? '▼' : '▶' }}</span>
              <span class="font-bold text-gray-800 text-sm">
                {{ story.data.name || `故事 ${story.originalIndex + 1}` }}
              </span>
            </div>
            <button @click.stop="removeStory(story.originalIndex)" 
                    class="px-2 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs flex-shrink-0">
              ✕
            </button>
          </div>
          
          <!-- 摺疊內容 -->
          <div v-show="expandedStories.has(story.originalIndex)" class="p-3 space-y-2">
            <input v-model="story.data.name" type="text" placeholder="故事名稱"
                   class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
            <input v-model="story.data.goal" type="text" placeholder="目標"
                   class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
            <input v-model="story.data.reward" type="text" placeholder="獎勵"
                   class="w-full px-2 py-1 border border-gray-300 rounded text-sm" />
            <textarea v-model="story.data.step1" placeholder="步驟" rows="2"
                      class="w-full h-60 px-2 py-1 border border-gray-300 rounded text-sm resize-none"></textarea>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const expandedStories = ref(new Set<number>());

// 反轉故事順序,最新的在最上方
const reversedStories = computed(() => {
  return characterStore.stories
    .map((story, index) => ({ data: story, originalIndex: index }))
    .reverse();
});

const addStory = () => {
  const newIndex = characterStore.stories.length;
  characterStore.addStory({ name: '', goal: '', reward: '', step1: '' });
  // 自動展開新增的故事
  expandedStories.value.add(newIndex);
};

const removeStory = (index: number) => {
  if (confirm('確定要刪除這個故事嗎？')) {
    characterStore.removeStory(index);
    // 移除展開狀態
    expandedStories.value.delete(index);
  }
};

const toggleStory = (index: number) => {
  if (expandedStories.value.has(index)) {
    expandedStories.value.delete(index);
  } else {
    expandedStories.value.add(index);
  }
};
</script>
