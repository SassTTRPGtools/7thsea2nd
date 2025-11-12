<template>
  <div class="death-spiral-section">
    <h2 class="section-title">死亡螺旋 (Death Spiral)</h2>
    
    <!-- 當前傷勢等級 -->
    <div class="wounds-status">
      <div class="status-label">當前傷勢等級:</div>
      <div class="wounds-circles">
        <button
          v-for="n in 5"
          :key="n - 1"
          @click="setWounds(n - 1)"
          :class="['wound-circle', { 
            'active': (n - 1) === characterStore.deathSpiral.currentWounds,
            'filled': (n - 1) <= characterStore.deathSpiral.currentWounds
          }]"
        >
          <span class="wound-label">{{ woundLabels[n - 1] }}</span>
        </button>
      </div>
      <div v-if="characterStore.isHelpless" class="helpless-warning">
        ⚠️ 角色已無助！
      </div>
    </div>

    <!-- 死亡螺旋圖示 -->
    <div class="spiral-container">
      <div class="spiral-image-wrapper">
        <img src="/death_spiral.png" alt="Death Spiral" class="spiral-image" />
        
        <!-- 20 個戲劇傷勢圓圈覆蓋層 -->
        <div class="dramatic-wounds-overlay">
          <button
            v-for="n in 20"
            :key="n"
            @click="toggleDramaticWound(n - 1)"
            :class="['dramatic-circle', { 
              'marked': characterStore.deathSpiral.dramaticWounds[n - 1]
            }]"
            :style="getCirclePosition(n - 1)"
          >
          </button>
        </div>
      </div>
      
      <div class="dramatic-wounds-info">
        <span>已標記戲劇傷勢: {{ characterStore.markedDramaticWounds }} / 20</span>
      </div>
    </div>

    <div class="death-spiral-hint">
      <p><strong>傷勢等級:</strong></p>
      <ul>
        <li><strong>健康:</strong> 無任何影響</li>
        <li><strong>受傷:</strong> 所有骰池 -1</li>
        <li><strong>重傷:</strong> 所有骰池 -2</li>
        <li><strong>嚴重:</strong> 所有骰池 -3</li>
        <li><strong>無助:</strong> 無法行動</li>
      </ul>
      <p><strong>戲劇傷勢:</strong> 點擊螺旋圖上的圓圈來標記已受的戲劇傷勢。每 5 個戲劇傷勢會增加 1 級傷勢等級。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();

const woundLabels = ['健康', '受傷', '重傷', '嚴重', '無助'];

const setWounds = (level: number) => {
  characterStore.setCurrentWounds(level);
};

const toggleDramaticWound = (index: number) => {
  characterStore.toggleDramaticWound(index);
};

// 為 20 個圓圈計算螺旋位置
const getCirclePosition = (index: number) => {
  const totalCircles = 20;
  const angle = (index / totalCircles) * Math.PI * 4; // 2 圈螺旋
  const radius = 35 + (index / totalCircles) * 10; // 從 35% 到 45% 的半徑
  
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;
  
  return {
    left: `${x}%`,
    top: `${y}%`
  };
};
</script>

<style scoped>
.death-spiral-section {
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

.wounds-status {
  margin-bottom: 20px;
  background: rgba(245, 230, 211, 0.1);
  border: 1px solid #8b7355;
  border-radius: 6px;
  padding: 16px;
}

.status-label {
  font-size: 14px;
  font-weight: 600;
  color: #d4af37;
  margin-bottom: 12px;
  text-align: center;
}

.wounds-circles {
  display: flex;
  justify-content: space-around;
  gap: 8px;
  margin-bottom: 12px;
}

.wound-circle {
  flex: 1;
  padding: 12px 8px;
  background: rgba(245, 230, 211, 0.2);
  border: 2px solid #8b7355;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 11px;
  font-weight: 600;
  color: #c9b895;
}

.wound-circle:hover {
  border-color: #d4af37;
  background: rgba(212, 175, 55, 0.2);
}

.wound-circle.filled {
  background: rgba(184, 76, 76, 0.4);
  border-color: #d86c6c;
  color: #f5e6d3;
}

.wound-circle.active {
  background: #b84c4c;
  border-color: #f5e6d3;
  color: #f5e6d3;
  box-shadow: 0 0 12px rgba(184, 76, 76, 0.6);
  transform: scale(1.05);
}

.wound-label {
  display: block;
  text-align: center;
}

.helpless-warning {
  text-align: center;
  color: #ff6b6b;
  font-weight: 700;
  font-size: 16px;
  padding: 8px;
  background: rgba(255, 107, 107, 0.2);
  border-radius: 4px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.spiral-container {
  margin-bottom: 16px;
}

.spiral-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  aspect-ratio: 1;
}

.spiral-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.7;
}

.dramatic-wounds-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dramatic-circle {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #8b7355;
  background: rgba(245, 230, 211, 0.3);
  cursor: pointer;
  transition: all 0.3s;
  transform: translate(-50%, -50%);
}

.dramatic-circle:hover {
  border-color: #d4af37;
  background: rgba(212, 175, 55, 0.5);
  transform: translate(-50%, -50%) scale(1.2);
}

.dramatic-circle.marked {
  background: #b84c4c;
  border-color: #f5e6d3;
  box-shadow: 0 0 8px rgba(184, 76, 76, 0.8);
}

.dramatic-wounds-info {
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #d4af37;
}

.death-spiral-hint {
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid #d4af37;
  border-radius: 4px;
  padding: 12px;
}

.death-spiral-hint p {
  margin: 8px 0;
  font-size: 12px;
  color: #c9b895;
  line-height: 1.5;
}

.death-spiral-hint strong {
  color: #d4af37;
}

.death-spiral-hint ul {
  margin: 8px 0;
  padding-left: 20px;
  font-size: 12px;
  color: #c9b895;
  line-height: 1.6;
}

.death-spiral-hint li {
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .wounds-circles {
    flex-wrap: wrap;
  }
  
  .wound-circle {
    min-width: 60px;
  }
  
  .dramatic-circle {
    width: 20px;
    height: 20px;
  }
}
</style>
