<template>
  <div class="backgrounds-section">
    <h2 class="section-title">背景 (Backgrounds)</h2>
    
    <div class="backgrounds-list">
      <div v-for="(bg, index) in characterStore.backgrounds" :key="index" class="background-item">
        <input 
          v-model="characterStore.backgrounds[index]" 
          type="text" 
          placeholder="輸入背景故事"
          class="text-input"
        />
        <button @click="removeBackground(index)" class="btn-remove">
          ✕
        </button>
      </div>
      
      <button @click="addBackground" class="btn-add">
        + 新增背景
      </button>
    </div>

    <div class="backgrounds-hint">
      <p>背景故事描述角色的過去經歷，每個背景可以獲得特定技能或優勢。</p>
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

<style scoped>
.backgrounds-section {
  background: rgba(43, 31, 23, 0.9);
  border: 2px solid #8b7355;
  border-radius: 8px;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #f5e6d3;
  margin-bottom: 16px;
  text-align: center;
  border-bottom: 2px solid #8b7355;
  padding-bottom: 8px;
}

.backgrounds-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.background-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.text-input {
  flex: 1;
  padding: 10px 12px;
  background: rgba(245, 230, 211, 0.95);
  border: 1px solid #8b7355;
  border-radius: 4px;
  font-size: 14px;
  color: #2b1f17;
}

.text-input:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.btn-remove {
  padding: 8px 14px;
  background: #b84c4c;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: background 0.3s;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #d86c6c;
}

.btn-add {
  padding: 10px 16px;
  background: #4a7c59;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
  width: 100%;
}

.btn-add:hover {
  background: #5a9c6d;
}

.backgrounds-hint {
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid #d4af37;
  border-radius: 4px;
  padding: 12px;
  margin-top: 12px;
}

.backgrounds-hint p {
  margin: 0;
  font-size: 12px;
  color: #c9b895;
  line-height: 1.5;
}
</style>
