<template>
  <div class="traits-section">
    <h2 class="section-title">屬性 (Traits)</h2>
    
    <div class="traits-info">
      <span>總計: {{ characterStore.totalTraitPoints }}</span>
    </div>

    <div class="traits-grid">
      <div 
        v-for="trait in traits" 
        :key="trait.key" 
        class="trait-item"
      >
        <div class="trait-header">
          <h3 class="trait-name">{{ trait.name }}</h3>
          <span class="trait-value">{{ characterStore.traits[trait.key as keyof typeof characterStore.traits] }}</span>
        </div>
        <p class="trait-desc">{{ trait.description }}</p>
        
        <div class="trait-circles">
          <button
            v-for="n in 5"
            :key="n"
            @click="setTraitValue(trait.key, n)"
            :class="['circle', { 
              'filled': n <= characterStore.traits[trait.key as keyof typeof characterStore.traits],
              'current': n === characterStore.traits[trait.key as keyof typeof characterStore.traits]
            }]"
          >
            {{ n }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllTraits } = useGameData();
const traits = getAllTraits();

const setTraitValue = (traitKey: string, value: number) => {
  characterStore.setTrait(traitKey as any, value);
};
</script>

<style scoped>
.traits-section {
  background: rgba(43, 31, 23, 0.9);
  border: 2px solid #8b7355;
  border-radius: 8px;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #f5e6d3;
  margin-bottom: 12px;
  text-align: center;
  border-bottom: 2px solid #8b7355;
  padding-bottom: 8px;
}

.traits-info {
  text-align: center;
  color: #d4af37;
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 14px;
}

.traits-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trait-item {
  background: rgba(245, 230, 211, 0.1);
  border: 1px solid #8b7355;
  border-radius: 6px;
  padding: 12px;
}

.trait-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.trait-name {
  font-size: 18px;
  font-weight: 700;
  color: #d4af37;
  margin: 0;
}

.trait-value {
  font-size: 24px;
  font-weight: 700;
  color: #f5e6d3;
  background: rgba(139, 115, 85, 0.3);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trait-desc {
  font-size: 12px;
  color: #c9b895;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.trait-circles {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #8b7355;
  background: rgba(245, 230, 211, 0.2);
  color: #8b7355;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle:hover {
  border-color: #d4af37;
  background: rgba(212, 175, 55, 0.3);
  transform: scale(1.1);
}

.circle.filled {
  background: rgba(212, 175, 55, 0.6);
  border-color: #d4af37;
  color: #2b1f17;
}

.circle.current {
  background: #d4af37;
  border-color: #f5e6d3;
  color: #2b1f17;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
}

@media (max-width: 768px) {
  .trait-circles {
    gap: 6px;
  }
  
  .circle {
    width: 36px;
    height: 36px;
  }
}
</style>
