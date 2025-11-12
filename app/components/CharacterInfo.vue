<template>
  <div class="character-info-section">
    <h2 class="section-title">角色基本資訊</h2>
    
    <div class="info-grid">
      <div class="info-field">
        <label>玩家名稱</label>
        <input 
          v-model="characterStore.player" 
          type="text" 
          placeholder="輸入玩家名稱"
          class="text-input"
        />
      </div>

      <div class="info-field">
        <label>角色名稱</label>
        <input 
          v-model="characterStore.characterName" 
          type="text" 
          placeholder="輸入角色名稱"
          class="text-input"
        />
      </div>

      <div class="info-field full-width">
        <label>角色概念</label>
        <input 
          v-model="characterStore.concept" 
          type="text" 
          placeholder="用一句話描述你的角色"
          class="text-input"
        />
      </div>

      <div class="info-field">
        <label>國籍</label>
        <select v-model="characterStore.nation" class="select-input">
          <option value="">選擇國籍</option>
          <option v-for="nation in nations" :key="nation.key" :value="nation.key">
            {{ nation.name }}
          </option>
        </select>
      </div>

      <div class="info-field">
        <label>宗教</label>
        <input 
          v-model="characterStore.religion" 
          type="text" 
          placeholder="輸入宗教信仰"
          class="text-input"
        />
      </div>

      <div class="info-field">
        <label>財富</label>
        <input 
          v-model.number="characterStore.wealth" 
          type="number" 
          min="0"
          class="text-input"
        />
      </div>

      <div class="info-field full-width">
        <label>聲望</label>
        <div class="reputation-list">
          <div v-for="(rep, index) in characterStore.reputations" :key="index" class="reputation-item">
            <input 
              v-model="characterStore.reputations[index]" 
              type="text" 
              class="text-input"
            />
            <button @click="removeReputation(index)" class="btn-remove">
              ✕
            </button>
          </div>
          <button @click="addReputation" class="btn-add">
            + 新增聲望
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllNations } = useGameData();
const nations = getAllNations();

const addReputation = () => {
  characterStore.reputations.push('');
};

const removeReputation = (index: number) => {
  characterStore.reputations.splice(index, 1);
};
</script>

<style scoped>
.character-info-section {
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

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-field.full-width {
  grid-column: 1 / -1;
}

.info-field label {
  font-size: 14px;
  font-weight: 600;
  color: #d4af37;
}

.text-input,
.select-input {
  padding: 8px 12px;
  background: rgba(245, 230, 211, 0.95);
  border: 1px solid #8b7355;
  border-radius: 4px;
  font-size: 14px;
  color: #2b1f17;
}

.text-input:focus,
.select-input:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}

.reputation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reputation-item {
  display: flex;
  gap: 8px;
  align-items: center;
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

.btn-add {
  padding: 8px 16px;
  background: #4a7c59;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-add:hover {
  background: #5a9c6d;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
