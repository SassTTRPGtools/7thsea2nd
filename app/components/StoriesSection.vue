<template>
  <div class="stories-section">
    <h2 class="section-title">英雄故事 (Stories)</h2>
    
    <div class="stories-list">
      <div v-for="(story, index) in characterStore.stories" :key="index" class="story-item">
        <div class="story-header">
          <h3>故事 {{ index + 1 }}</h3>
          <button @click="removeStory(index)" class="btn-remove">✕</button>
        </div>
        
        <div class="story-fields">
          <div class="field-group">
            <label>故事名稱</label>
            <input 
              v-model="story.name" 
              type="text" 
              placeholder="故事標題"
              class="text-input"
            />
          </div>
          
          <div class="field-group">
            <label>目標</label>
            <input 
              v-model="story.goal" 
              type="text" 
              placeholder="你想達成什麼？"
              class="text-input"
            />
          </div>
          
          <div class="field-group">
            <label>獎勵</label>
            <input 
              v-model="story.reward" 
              type="text" 
              placeholder="完成後的獎勵"
              class="text-input"
            />
          </div>
          
          <div class="field-group">
            <label>步驟 1</label>
            <textarea 
              v-model="story.step1" 
              placeholder="第一個步驟..."
              class="textarea-input"
              rows="2"
            />
          </div>
        </div>
      </div>
    </div>
    
    <button @click="addStory" class="btn-add">
      + 新增英雄故事
    </button>

    <div class="stories-hint">
      <p><strong>英雄故事</strong>是角色的個人目標和追求。每完成一個步驟，可以獲得經驗值來提升角色能力。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();

const addStory = () => {
  characterStore.addStory({
    name: '',
    goal: '',
    reward: '',
    step1: ''
  });
};

const removeStory = (index: number) => {
  if (confirm('確定要刪除這個英雄故事嗎？')) {
    characterStore.removeStory(index);
  }
};
</script>

<style scoped>
.stories-section {
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

.stories-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.story-item {
  background: rgba(245, 230, 211, 0.1);
  border: 2px solid #8b7355;
  border-radius: 6px;
  padding: 16px;
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.story-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #d4af37;
  margin: 0;
}

.btn-remove {
  padding: 6px 12px;
  background: #b84c4c;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-remove:hover {
  background: #d86c6c;
}

.story-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-group label {
  font-size: 13px;
  font-weight: 600;
  color: #d4af37;
}

.text-input,
.textarea-input {
  padding: 10px 12px;
  background: rgba(245, 230, 211, 0.95);
  border: 1px solid #8b7355;
  border-radius: 4px;
  font-size: 14px;
  color: #2b1f17;
  font-family: inherit;
}

.text-input:focus,
.textarea-input:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.textarea-input {
  resize: vertical;
  line-height: 1.5;
}

.btn-add {
  width: 100%;
  padding: 12px;
  background: #4a7c59;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
  margin-bottom: 12px;
}

.btn-add:hover {
  background: #5a9c6d;
}

.stories-hint {
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid #d4af37;
  border-radius: 4px;
  padding: 12px;
}

.stories-hint p {
  margin: 0;
  font-size: 12px;
  color: #c9b895;
  line-height: 1.5;
}

.stories-hint strong {
  color: #d4af37;
}
</style>
