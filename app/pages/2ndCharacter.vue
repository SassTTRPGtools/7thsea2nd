<template>
  <div class="min-h-screen relative bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
    <!-- 背景圖片 -->
    <div class="fixed inset-0 opacity-10 bg-cover bg-center pointer-events-none"
         style="background-image: url('/sheet_background.webp')">
    </div>

    <!-- 主要內容 -->
    <div class="relative z-10 max-w-[1600px] mx-auto p-4 md:p-8">
      <!-- 頂部 Logo（置中） -->
      <div class="flex justify-center items-center mb-6">
        <img src="/logo.webp" alt="7th Sea" class="h-24 md:h-28 drop-shadow-lg opacity-80" />
      </div>

      <!-- 右側浮動操作按鈕 -->
      <div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        <button v-if="!showCreationWizard" @click="toggleCreationWizard" 
                class="w-14 h-14 bg-blue-700 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center group relative"
                title="角色創建嚮導">
          <span class="text-2xl">✨</span>
          <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            角色創建嚮導
          </span>
        </button>
        <button v-if="showCreationWizard" @click="toggleCreationWizard" 
                class="w-14 h-14 bg-stone-600 hover:bg-stone-500 text-white rounded-full shadow-lg transition-all flex items-center justify-center group relative"
                title="返回角色表">
          <span class="text-2xl">📋</span>
          <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            返回角色表
          </span>
        </button>
        <button @click="exportCharacter" 
                class="w-14 h-14 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center group relative"
                title="匯出角色">
          <span class="text-2xl">💾</span>
          <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            匯出角色
          </span>
        </button>
        <button @click="importCharacter" 
                class="w-14 h-14 bg-indigo-700 hover:bg-indigo-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center group relative"
                title="匯入角色">
          <span class="text-2xl">📂</span>
          <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            匯入角色
          </span>
        </button>
        <button @click="resetCharacter" 
                class="w-14 h-14 bg-red-700 hover:bg-red-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center group relative"
                title="重置角色">
          <span class="text-2xl">🗑️</span>
          <span class="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            重置角色
          </span>
        </button>
      </div>

      <!-- 角色創建嚮導 -->
      <CharacterCreationWizard v-if="showCreationWizard" @complete="onWizardComplete" />

      <!-- 三欄佈局 -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <!-- 左欄 -->
        <div class="space-y-4 md:space-y-6">
          <CharacterInfo />
          <ArcanaSection />
          <StoriesSection />
        </div>

        <!-- 中欄 -->
        <div class="space-y-4 md:space-y-6">
          <TraitsSection />
          <SkillsSection />
          <DeathSpiralSection />
        </div>

        <!-- 右欄 -->
        <div class="space-y-4 md:space-y-6">
          <BackgroundsSection />
          <AdvantagesSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const showCreationWizard = ref(false);

// 頁面載入時從 localStorage 載入角色資料
onMounted(() => {
  characterStore.loadFromLocalStorage();
});

const toggleCreationWizard = () => {
  // 如果正要開啟嚮導，檢查是否已有資料
  if (!showCreationWizard.value) {
    const hasData = characterStore.characterName || 
                    characterStore.nation || 
                    characterStore.backgrounds.length > 0;
    
    if (hasData) {
      const confirmClear = confirm(
        '檢測到已有角色資料。\n\n' +
        '點擊「確定」清除資料並創建新角色\n' +
        '點擊「取消」繼續編輯現有角色'
      );
      if (confirmClear) {
        characterStore.resetCharacter();
      } else {
        // 取消，不開啟嚮導
        return;
      }
    }
  }
  showCreationWizard.value = !showCreationWizard.value;
};

const onWizardComplete = () => {
  showCreationWizard.value = false;
};

const exportCharacter = () => {
  const json = characterStore.exportCharacter();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${characterStore.characterName || 'character'}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const importCharacter = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        if (characterStore.importCharacter(json)) {
          alert('角色匯入成功！');
        } else {
          alert('角色匯入失敗，請檢查檔案格式。');
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
};

const resetCharacter = () => {
  if (confirm('確定要重置角色資料嗎？此操作無法復原。')) {
    characterStore.resetCharacter();
    alert('角色已重置');
  }
};
</script>