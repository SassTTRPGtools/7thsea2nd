<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">阿爾卡那</h2>
    </div>
    
    <div class="p-3 space-y-2">
      <div v-if="characterStore.virtue" class="border-l-4 border-green-700 pl-2 py-1">
        <div class="flex items-baseline justify-between">
          <div class="flex items-baseline gap-2">
            <span class="text-xs font-semibold text-green-800">美德:</span>
            <span class="text-sm font-bold text-gray-800">{{ characterStore.virtue.name }}</span>
          </div>
          <button @click="clearVirtue" class="text-xs text-red-700 hover:underline">清除</button>
        </div>
        <div class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ characterStore.virtue.description }}</div>
      </div>
      <button v-else @click="showVirtueSelector = true" 
              class="w-full py-1.5 border-2 border-green-700 text-green-700 hover:bg-green-50 rounded transition-colors text-sm font-semibold">
        選擇美德
      </button>

      <div v-if="characterStore.hubris" class="border-l-4 border-red-700 pl-2 py-1">
        <div class="flex items-baseline justify-between">
          <div class="flex items-baseline gap-2">
            <span class="text-xs font-semibold text-red-800">傲性:</span>
            <span class="text-sm font-bold text-gray-800">{{ characterStore.hubris.name }}</span>
          </div>
          <button @click="clearHubris" class="text-xs text-red-700 hover:underline">清除</button>
        </div>
        <div class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ characterStore.hubris.description }}</div>
      </div>
      <button v-else @click="showHubrisSelector = true" 
              class="w-full py-1.5 border-2 border-red-700 text-red-700 hover:bg-red-50 rounded transition-colors text-sm font-semibold">
        選擇傲性
      </button>
    </div>

    <div v-if="showVirtueSelector" @click="showVirtueSelector = false"
         class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto">
        <div class="bg-green-800 text-white px-4 py-2 sticky top-0">
          <h3 class="text-lg font-bold">選擇美德</h3>
        </div>
        <div class="p-3 grid grid-cols-2 gap-2">
          <div v-for="arcana in arcanas" :key="arcana.key" 
               class="border border-green-200 rounded p-2 hover:border-green-500 hover:bg-green-50 transition-colors">
            <div class="text-xs font-bold text-green-900 mb-1">{{ arcana.name }}</div>
            <button @click="selectVirtue(arcana.key, arcana.virtue.name, arcana.virtue.description)"
                    class="w-full text-left">
              <div class="text-sm font-semibold text-green-800">{{ arcana.virtue.name }}</div>
              <div class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ arcana.virtue.description }}</div>
            </button>
          </div>
        </div>
        <div class="p-2 border-t sticky bottom-0 bg-white">
          <button @click="showVirtueSelector = false" 
                  class="w-full py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold">
            關閉
          </button>
        </div>
      </div>
    </div>

    <div v-if="showHubrisSelector" @click="showHubrisSelector = false"
         class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto">
        <div class="bg-red-800 text-white px-4 py-2 sticky top-0">
          <h3 class="text-lg font-bold">選擇傲性</h3>
        </div>
        <div class="p-3 grid grid-cols-2 gap-2">
          <div v-for="arcana in arcanas" :key="arcana.key" 
               class="border border-red-200 rounded p-2 hover:border-red-500 hover:bg-red-50 transition-colors">
            <div class="text-xs font-bold text-red-900 mb-1">{{ arcana.name }}</div>
            <button @click="selectHubris(arcana.key, arcana.hubris.name, arcana.hubris.description)"
                    class="w-full text-left">
              <div class="text-sm font-semibold text-red-800">{{ arcana.hubris.name }}</div>
              <div class="text-xs text-gray-600 mt-0.5 line-clamp-2">{{ arcana.hubris.description }}</div>
            </button>
          </div>
        </div>
        <div class="p-2 border-t sticky bottom-0 bg-white">
          <button @click="showHubrisSelector = false" 
                  class="w-full py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm font-semibold">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllArcanas } = useGameData();
const arcanas = getAllArcanas();

const showVirtueSelector = ref(false);
const showHubrisSelector = ref(false);

const selectVirtue = (arcanaKey: string, name: string, description: string) => {
  characterStore.setVirtue(arcanaKey, name, description);
  showVirtueSelector.value = false;
};

const selectHubris = (arcanaKey: string, name: string, description: string) => {
  characterStore.setHubris(arcanaKey, name, description);
  showHubrisSelector.value = false;
};

const clearVirtue = () => {
  characterStore.virtue = null;
};

const clearHubris = () => {
  characterStore.hubris = null;
};
</script>
