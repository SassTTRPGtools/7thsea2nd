<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">Backgrounds</h2>
    </div>
    
    <div class="p-4">
      <div class="space-y-2 mb-3">
        <div v-for="(bg, index) in characterStore.backgrounds" :key="index" 
             class="flex gap-2">
          <input v-model="characterStore.backgrounds[index]" 
                 type="text" 
                 placeholder="背景..."
                 class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-900" />
          <button @click="removeBackground(index)" 
                  class="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs">
            ✕
          </button>
        </div>
      </div>
      <button @click="addBackground" 
              class="w-full py-2 bg-red-900 hover:bg-red-800 text-white rounded text-sm font-semibold">
        + 新增背景
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();

const addBackground = () => {
  characterStore.addBackground('');
};

const removeBackground = (index: number) => {
  characterStore.backgrounds.splice(index, 1);
};
</script>
