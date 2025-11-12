<template>
  <div class="skills-section">
    <h2 class="section-title">技能 (Skills)</h2>
    
    <div class="skills-info">
      <span>總計: {{ characterStore.totalSkillPoints }}</span>
    </div>

    <div class="skills-grid">
      <div 
        v-for="skill in skills" 
        :key="skill.key" 
        class="skill-item"
      >
        <div class="skill-header">
          <h3 class="skill-name">{{ skill.name }}</h3>
          <span class="skill-value">{{ characterStore.skills[skill.key as keyof typeof characterStore.skills] }}</span>
        </div>
        
        <div class="skill-circles">
          <button
            v-for="n in 6"
            :key="n - 1"
            @click="setSkillValue(skill.key, n - 1)"
            :class="['circle', { 
              'filled': (n - 1) <= characterStore.skills[skill.key as keyof typeof characterStore.skills],
              'current': (n - 1) === characterStore.skills[skill.key as keyof typeof characterStore.skills]
            }]"
          >
            {{ n - 1 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const { getAllSkills } = useGameData();
const skills = getAllSkills();

const setSkillValue = (skillKey: string, value: number) => {
  characterStore.setSkill(skillKey as any, value);
};
</script>

<style scoped>
.skills-section {
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

.skills-info {
  text-align: center;
  color: #d4af37;
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 14px;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.skill-item {
  background: rgba(245, 230, 211, 0.1);
  border: 1px solid #8b7355;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 120px;
}

.skill-name {
  font-size: 15px;
  font-weight: 600;
  color: #f5e6d3;
  margin: 0;
}

.skill-value {
  font-size: 18px;
  font-weight: 700;
  color: #d4af37;
  background: rgba(139, 115, 85, 0.3);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-circles {
  display: flex;
  gap: 6px;
}

.circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #8b7355;
  background: rgba(245, 230, 211, 0.2);
  color: #8b7355;
  font-weight: 600;
  font-size: 13px;
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
  background: rgba(74, 124, 89, 0.6);
  border-color: #5a9c6d;
  color: #f5e6d3;
}

.circle.current {
  background: #4a7c59;
  border-color: #f5e6d3;
  color: #f5e6d3;
  box-shadow: 0 0 8px rgba(74, 124, 89, 0.6);
}

@media (max-width: 768px) {
  .skill-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .skill-circles {
    width: 100%;
    justify-content: space-between;
  }
  
  .circle {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
}
</style>
