<template>
  <div class="character-sheet-container">
    <!-- 背景圖片 -->
    <div class="sheet-background" 
         :style="{ backgroundImage: `url(/sheet_background.jpg)` }">
    </div>

    <!-- Logo -->
    <div class="logo-container">
      <img src="/logo.png" alt="7th Sea Logo" class="logo" />
    </div>

    <!-- 角色表內容 -->
    <div class="character-sheet-content">
      <div class="sheet-grid">
        <!-- 第一欄 -->
        <div class="sheet-column">
          <CharacterInfo />
          <TraitsSection />
          <SkillsSection />
        </div>

        <!-- 第二欄 -->
        <div class="sheet-column">
          <ArcanaSection />
          <BackgroundsSection />
          <AdvantagesSection />
        </div>

        <!-- 第三欄 -->
        <div class="sheet-column">
          <StoriesSection />
          <DeathSpiralSection />
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="action-buttons">
        <button @click="exportCharacter" class="btn-export">
          匯出角色
        </button>
        <button @click="importCharacter" class="btn-import">
          匯入角色
        </button>
        <button @click="resetCharacter" class="btn-reset">
          重置角色
        </button>
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

<style scoped>
.character-sheet-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.sheet-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
}

.logo-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.logo {
  width: 120px;
  height: auto;
  opacity: 0.8;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}

.character-sheet-content {
  position: relative;
  z-index: 1;
  max-width: 1800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.sheet-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.sheet-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding: 20px;
  background: rgba(43, 31, 23, 0.8);
  border-radius: 8px;
  border: 2px solid #8b7355;
}

.action-buttons button {
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid;
}

.btn-export {
  background: #4a7c59;
  color: #f5e6d3;
  border-color: #5a9c6d;
}

.btn-export:hover {
  background: #5a9c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(74, 124, 89, 0.4);
}

.btn-import {
  background: #6b5d99;
  color: #f5e6d3;
  border-color: #8b7db9;
}

.btn-import:hover {
  background: #8b7db9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(107, 93, 153, 0.4);
}

.btn-reset {
  background: #b84c4c;
  color: #f5e6d3;
  border-color: #d86c6c;
}

.btn-reset:hover {
  background: #d86c6c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(184, 76, 76, 0.4);
}

/* 響應式設計 */
@media (max-width: 1400px) {
  .sheet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .sheet-grid {
    grid-template-columns: 1fr;
  }
  
  .logo {
    width: 80px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
