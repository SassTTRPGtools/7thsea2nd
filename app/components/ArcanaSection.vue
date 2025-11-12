<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">Arcana</h2>
    </div>
    
    <div class="p-4 space-y-4">
      <div v-if="characterStore.virtue" class="border-l-4 border-green-700 pl-3">
        <div class="text-xs font-semibold text-green-800 mb-1">Virtue</div>
        <div class="text-sm font-bold text-gray-800">{{ characterStore.virtue.name }}</div>
        <button @click="clearVirtue" class="mt-1 text-xs text-red-700 hover:underline">清除</button>
      </div>
      <button v-else @click="showVirtueSelector = true" 
              class="w-full py-2 border-2 border-green-700 text-green-700 hover:bg-green-50 rounded transition-colors text-sm font-semibold">
        選擇 Virtue
      </button>

      <div v-if="characterStore.hubris" class="border-l-4 border-red-700 pl-3">
        <div class="text-xs font-semibold text-red-800 mb-1">Hubris</div>
        <div class="text-sm font-bold text-gray-800">{{ characterStore.hubris.name }}</div>
        <button @click="clearHubris" class="mt-1 text-xs text-red-700 hover:underline">清除</button>
      </div>
      <button v-else @click="showHubrisSelector = true" 
              class="w-full py-2 border-2 border-red-700 text-red-700 hover:bg-red-50 rounded transition-colors text-sm font-semibold">
        選擇 Hubris
      </button>
    </div>

    <div v-if="showVirtueSelector" @click="showVirtueSelector = false"
         class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div class="bg-green-800 text-white px-6 py-4 sticky top-0">
          <h3 class="text-xl font-bold">選擇 Virtue</h3>
        </div>
        <div class="p-6 space-y-3">
          <div v-for="arcana in arcanas" :key="arcana.key" 
               class="border-2 border-green-200 rounded-lg p-4 hover:border-green-500 transition-colors">
            <div class="font-bold text-green-900 mb-2">{{ arcana.name }}</div>
            <button @click="selectVirtue(arcana.key, arcana.virtue.key, arcana.virtue.name)"
                    class="w-full text-left bg-green-50 hover:bg-green-100 p-3 rounded transition-colors">
              <div class="font-semibold text-green-800">{{ arcana.virtue.name }}</div>
              <div class="text-xs text-gray-600 mt-1">{{ arcana.virtue.description }}</div>
            </button>
          </div>
        </div>
        <div class="p-4 border-t sticky bottom-0 bg-white">
          <button @click="showVirtueSelector = false" 
                  class="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold">
            關閉
          </button>
        </div>
      </div>
    </div>

    <div v-if="showHubrisSelector" @click="showHubrisSelector = false"
         class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div class="bg-red-800 text-white px-6 py-4 sticky top-0">
          <h3 class="text-xl font-bold">選擇 Hubris</h3>
        </div>
        <div class="p-6 space-y-3">
          <div v-for="arcana in arcanas" :key="arcana.key" 
               class="border-2 border-red-200 rounded-lg p-4 hover:border-red-500 transition-colors">
            <div class="font-bold text-red-900 mb-2">{{ arcana.name }}</div>
            <button @click="selectHubris(arcana.key, arcana.hubris.key, arcana.hubris.name)"
                    class="w-full text-left bg-red-50 hover:bg-red-100 p-3 rounded transition-colors">
              <div class="font-semibold text-red-800">{{ arcana.hubris.name }}</div>
              <div class="text-xs text-gray-600 mt-1">{{ arcana.hubris.description }}</div>
            </button>
          </div>
        </div>
        <div class="p-4 border-t sticky bottom-0 bg-white">
          <button @click="showHubrisSelector = false" 
                  class="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold">
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

const selectVirtue = (arcanaKey: string, virtueKey: string, name: string) => {
  characterStore.setVirtue(arcanaKey, virtueKey, name);
  showVirtueSelector.value = false;
};

const selectHubris = (arcanaKey: string, hubrisKey: string, name: string) => {
  characterStore.setHubris(arcanaKey, hubrisKey, name);
  showHubrisSelector.value = false;
};

const clearVirtue = () => {
  characterStore.virtue = null;
};

const clearHubris = () => {
  characterStore.hubris = null;
};
</script>
