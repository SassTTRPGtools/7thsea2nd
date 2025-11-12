<template>
  <div class="min-h-screen relative bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300">
    <!-- 背景圖片 -->
    <div class="fixed inset-0 opacity-10 bg-cover bg-center pointer-events-none"
         :style="{ backgroundImage: `url(/sheet_background.jpg)` }">
    </div>

    <!-- 主要內容 -->
    <div class="relative z-10 max-w-[1600px] mx-auto p-4 md:p-8">
      <!-- 頂部 Logo 和操作按鈕 -->
      <div class="flex justify-between items-center mb-6">
        <img src="/logo.png" alt="7th Sea" class="h-16 md:h-20 drop-shadow-lg opacity-80" />
        
        <div class="flex gap-2 md:gap-3">
          <button @click="exportCharacter" 
                  class="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded shadow-md transition-all text-sm md:text-base font-semibold">
            匯出
          </button>
          <button @click="importCharacter" 
                  class="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded shadow-md transition-all text-sm md:text-base font-semibold">
            匯入
          </button>
          <button @click="resetCharacter" 
                  class="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded shadow-md transition-all text-sm md:text-base font-semibold">
            重置
          </button>
        </div>
      </div>

      <!-- 三欄佈局 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
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
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();

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

