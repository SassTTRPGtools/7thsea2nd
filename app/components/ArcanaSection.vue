<template>
  <div class="arcana-section">
    <h2 class="section-title">阿爾克那 (Arcana)</h2>
    
    <!-- 美德 -->
    <div class="arcana-block virtue-block">
      <h3 class="block-title">美德 (Virtue)</h3>
      <div v-if="characterStore.virtue" class="selected-arcana">
        <div class="arcana-card">
          <div class="arcana-name">{{ getArcanaName(characterStore.virtue.arcanaKey) }}</div>
          <div class="arcana-detail">
            <strong>{{ characterStore.virtue.name }}</strong>
          </div>
          <div class="arcana-desc">
            {{ getVirtueDescription(characterStore.virtue.arcanaKey, characterStore.virtue.virtueKey) }}
          </div>
          <button @click="clearVirtue" class="btn-clear">清除</button>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>尚未選擇美德</p>
        <button @click="showVirtueSelector = true" class="btn-select">選擇美德</button>
      </div>
    </div>

    <!-- 傲性 -->
    <div class="arcana-block hubris-block">
      <h3 class="block-title">傲性 (Hubris)</h3>
      <div v-if="characterStore.hubris" class="selected-arcana">
        <div class="arcana-card">
          <div class="arcana-name">{{ getArcanaName(characterStore.hubris.arcanaKey) }}</div>
          <div class="arcana-detail">
            <strong>{{ characterStore.hubris.name }}</strong>
          </div>
          <div class="arcana-desc">
            {{ getHubrisDescription(characterStore.hubris.arcanaKey, characterStore.hubris.hubrisKey) }}
          </div>
          <button @click="clearHubris" class="btn-clear">清除</button>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>尚未選擇傲性</p>
        <button @click="showHubrisSelector = true" class="btn-select">選擇傲性</button>
      </div>
    </div>

    <!-- 美德選擇器 -->
    <div v-if="showVirtueSelector" class="modal-overlay" @click="showVirtueSelector = false">
      <div class="modal-content" @click.stop>
        <h3>選擇美德</h3>
        <div class="arcana-list">
          <div v-for="arcana in arcanas" :key="arcana.key" class="arcana-option">
            <div class="arcana-header">{{ arcana.name }}</div>
            <button 
              @click="selectVirtue(arcana.key, arcana.virtue.key, arcana.virtue.name)"
              class="arcana-btn virtue-btn"
            >
              <strong>{{ arcana.virtue.name }}</strong>
              <p>{{ arcana.virtue.description }}</p>
            </button>
          </div>
        </div>
        <button @click="showVirtueSelector = false" class="btn-close">關閉</button>
      </div>
    </div>

    <!-- 傲性選擇器 -->
    <div v-if="showHubrisSelector" class="modal-overlay" @click="showHubrisSelector = false">
      <div class="modal-content" @click.stop>
        <h3>選擇傲性</h3>
        <div class="arcana-list">
          <div v-for="arcana in arcanas" :key="arcana.key" class="arcana-option">
            <div class="arcana-header">{{ arcana.name }}</div>
            <button 
              @click="selectHubris(arcana.key, arcana.hubris.key, arcana.hubris.name)"
              class="arcana-btn hubris-btn"
            >
              <strong>{{ arcana.hubris.name }}</strong>
              <p>{{ arcana.hubris.description }}</p>
            </button>
          </div>
        </div>
        <button @click="showHubrisSelector = false" class="btn-close">關閉</button>
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

const getArcanaName = (key: string) => {
  return arcanas.find(a => a.key === key)?.name || '';
};

const getVirtueDescription = (arcanaKey: string, virtueKey: string) => {
  const arcana = arcanas.find(a => a.key === arcanaKey);
  return arcana?.virtue.description || '';
};

const getHubrisDescription = (arcanaKey: string, hubrisKey: string) => {
  const arcana = arcanas.find(a => a.key === arcanaKey);
  return arcana?.hubris.description || '';
};

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

<style scoped>
.arcana-section {
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

.arcana-block {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 6px;
}

.virtue-block {
  background: rgba(74, 124, 89, 0.2);
  border: 1px solid #5a9c6d;
}

.hubris-block {
  background: rgba(184, 76, 76, 0.2);
  border: 1px solid #d86c6c;
}

.block-title {
  font-size: 18px;
  font-weight: 600;
  color: #f5e6d3;
  margin-bottom: 10px;
}

.arcana-card {
  background: rgba(245, 230, 211, 0.1);
  border: 1px solid #8b7355;
  border-radius: 4px;
  padding: 12px;
}

.arcana-name {
  font-size: 16px;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 6px;
}

.arcana-detail {
  font-size: 14px;
  color: #f5e6d3;
  margin-bottom: 6px;
}

.arcana-desc {
  font-size: 12px;
  color: #c9b895;
  line-height: 1.4;
  margin-bottom: 10px;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #c9b895;
}

.btn-select,
.btn-clear,
.btn-close {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-select {
  background: #4a7c59;
  color: #f5e6d3;
}

.btn-select:hover {
  background: #5a9c6d;
}

.btn-clear {
  background: #b84c4c;
  color: #f5e6d3;
  width: 100%;
}

.btn-clear:hover {
  background: #d86c6c;
}

.btn-close {
  background: #6b5d99;
  color: #f5e6d3;
  width: 100%;
  margin-top: 12px;
}

.btn-close:hover {
  background: #8b7db9;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #2b1f17;
  border: 2px solid #8b7355;
  border-radius: 8px;
  padding: 24px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  color: #f5e6d3;
}

.modal-content h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #d4af37;
}

.arcana-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.arcana-option {
  border: 1px solid #8b7355;
  border-radius: 6px;
  padding: 12px;
  background: rgba(245, 230, 211, 0.05);
}

.arcana-header {
  font-size: 16px;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 8px;
  text-align: center;
}

.arcana-btn {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  border: 2px solid;
}

.virtue-btn {
  background: rgba(74, 124, 89, 0.3);
  border-color: #5a9c6d;
  color: #f5e6d3;
}

.virtue-btn:hover {
  background: rgba(74, 124, 89, 0.5);
}

.hubris-btn {
  background: rgba(184, 76, 76, 0.3);
  border-color: #d86c6c;
  color: #f5e6d3;
}

.hubris-btn:hover {
  background: rgba(184, 76, 76, 0.5);
}

.arcana-btn strong {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
}

.arcana-btn p {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.9;
}
</style>
