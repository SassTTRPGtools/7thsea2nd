<template>
  <div class="advantages-section">
    <h2 class="section-title">優勢 (Advantages)</h2>
    
    <div class="selected-advantages">
      <h3 class="subsection-title">已選優勢</h3>
      <div v-if="characterStore.advantages.length > 0" class="advantage-list">
        <div v-for="(advKey, index) in characterStore.advantages" :key="index" class="advantage-item">
          <div class="advantage-info">
            <strong>{{ getAdvantageName(advKey) }}</strong>
            <span class="advantage-cost">{{ getAdvantageCost(advKey) }} 點</span>
          </div>
          <button @click="removeAdvantage(advKey)" class="btn-remove">✕</button>
        </div>
        <div class="total-cost">
          總成本: <strong>{{ totalCost }}</strong> 點
        </div>
      </div>
      <div v-else class="empty-state">
        尚未選擇優勢
      </div>
    </div>

    <button @click="showSelector = true" class="btn-add-advantage">
      + 選擇優勢
    </button>

    <!-- 優勢選擇器 Modal -->
    <div v-if="showSelector" class="modal-overlay" @click="showSelector = false">
      <div class="modal-content" @click.stop>
        <h3>選擇優勢</h3>
        
        <!-- 成本篩選 -->
        <div class="filter-section">
          <label>篩選成本:</label>
          <select v-model="filterCost" class="filter-select">
            <option value="all">全部</option>
            <option value="1">1 點</option>
            <option value="2">2 點</option>
            <option value="3">3 點</option>
            <option value="4">4 點</option>
            <option value="5">5 點</option>
          </select>
        </div>

        <div class="advantages-grid">
          <button
            v-for="adv in filteredAdvantages"
            :key="adv.key"
            @click="addAdvantage(adv.key)"
            :disabled="characterStore.advantages.includes(adv.key)"
            class="advantage-card"
            :class="{ 'selected': characterStore.advantages.includes(adv.key) }"
          >
            <div class="advantage-header">
              <strong>{{ adv.name }}</strong>
              <span class="cost-badge">{{ getAdvantageCost(adv.key) }}</span>
            </div>
            <p class="advantage-desc">{{ adv.description }}</p>
            <div v-if="hasDiscount(adv)" class="discount-info">
              🎯 國籍折扣
            </div>
          </button>
        </div>

        <button @click="showSelector = false" class="btn-close">關閉</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllAdvantages, getActualAdvantageCost } = useGameData();
const advantages = getAllAdvantages();

const showSelector = ref(false);
const filterCost = ref<string>('all');

const filteredAdvantages = computed(() => {
  if (filterCost.value === 'all') {
    return advantages;
  }
  const cost = parseInt(filterCost.value);
  return advantages.filter(adv => {
    const actualCost = getActualAdvantageCost(adv.key, characterStore.nation);
    return actualCost === cost;
  });
});

const getAdvantageName = (key: string) => {
  return advantages.find(a => a.key === key)?.name || '';
};

const getAdvantageCost = (key: string) => {
  return getActualAdvantageCost(key, characterStore.nation);
};

const totalCost = computed(() => {
  return characterStore.advantages.reduce((sum, key) => {
    return sum + getActualAdvantageCost(key, characterStore.nation);
  }, 0);
});

const hasDiscount = (adv: any) => {
  if (!adv.conditionalCost || !characterStore.nation) return false;
  return adv.conditionalCost.some((cond: any) => cond.nation === characterStore.nation);
};

const addAdvantage = (key: string) => {
  if (!characterStore.advantages.includes(key)) {
    characterStore.addAdvantage(key);
  }
};

const removeAdvantage = (key: string) => {
  characterStore.removeAdvantage(key);
};
</script>

<style scoped>
.advantages-section {
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

.subsection-title {
  font-size: 16px;
  font-weight: 600;
  color: #d4af37;
  margin-bottom: 10px;
}

.selected-advantages {
  margin-bottom: 16px;
}

.advantage-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.advantage-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(245, 230, 211, 0.1);
  border: 1px solid #8b7355;
  border-radius: 4px;
  padding: 10px 12px;
}

.advantage-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.advantage-info strong {
  color: #f5e6d3;
  font-size: 14px;
}

.advantage-cost {
  color: #d4af37;
  font-size: 12px;
}

.total-cost {
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid #d4af37;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  color: #f5e6d3;
  font-size: 16px;
  margin-top: 8px;
}

.total-cost strong {
  color: #d4af37;
  font-size: 18px;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #c9b895;
  font-style: italic;
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

.btn-add-advantage {
  width: 100%;
  padding: 12px;
  background: #4a7c59;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: background 0.3s;
}

.btn-add-advantage:hover {
  background: #5a9c6d;
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
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  color: #f5e6d3;
  width: 90%;
}

.modal-content h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #d4af37;
  font-size: 22px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background: rgba(245, 230, 211, 0.1);
  border-radius: 4px;
}

.filter-section label {
  font-weight: 600;
  color: #d4af37;
}

.filter-select {
  padding: 8px 12px;
  background: rgba(245, 230, 211, 0.95);
  border: 1px solid #8b7355;
  border-radius: 4px;
  color: #2b1f17;
  font-weight: 600;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.advantage-card {
  background: rgba(245, 230, 211, 0.05);
  border: 2px solid #8b7355;
  border-radius: 6px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
}

.advantage-card:hover:not(:disabled) {
  background: rgba(212, 175, 55, 0.2);
  border-color: #d4af37;
  transform: translateY(-2px);
}

.advantage-card.selected {
  background: rgba(74, 124, 89, 0.3);
  border-color: #5a9c6d;
  opacity: 0.6;
  cursor: not-allowed;
}

.advantage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.advantage-header strong {
  color: #f5e6d3;
  font-size: 14px;
}

.cost-badge {
  background: #d4af37;
  color: #2b1f17;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.advantage-desc {
  margin: 0;
  font-size: 12px;
  color: #c9b895;
  line-height: 1.4;
}

.discount-info {
  margin-top: 8px;
  padding: 6px;
  background: rgba(74, 124, 89, 0.3);
  border-radius: 4px;
  font-size: 11px;
  color: #5a9c6d;
  font-weight: 600;
}

.btn-close {
  width: 100%;
  padding: 12px;
  background: #6b5d99;
  color: #f5e6d3;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-close:hover {
  background: #8b7db9;
}
</style>
