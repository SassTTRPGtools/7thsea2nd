<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">死亡螺旋</h2>
    </div>
    
    <div class="p-4">
      <!-- 劇烈傷勢效果說明 -->
      <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div class="space-y-1">
          <div 
            :class="[
              'font-semibold p-1 rounded transition-all',
              characterStore.deathSpiral.severeWounds >= 1 
                ? 'bg-yellow-200 text-yellow-900 border-2 border-yellow-600' 
                : 'text-gray-700'
            ]"
          >
            1 劇烈傷: 所有檢定 +1 額外骰數
          </div>
          <div 
            :class="[
              'font-semibold p-1 rounded transition-all',
              characterStore.deathSpiral.severeWounds >= 2 
                ? 'bg-orange-200 text-orange-900 border-2 border-orange-600' 
                : 'text-gray-700'
            ]"
          >
            2 劇烈傷: 反派 +2 額外骰數
          </div>
        </div>
        <div class="space-y-1">
          <div 
            :class="[
              'font-semibold p-1 rounded transition-all',
              characterStore.deathSpiral.severeWounds >= 3 
                ? 'bg-red-200 text-red-900 border-2 border-red-600' 
                : 'text-gray-700'
            ]"
          >
            3 劇烈傷: 10 爆炸骰 (額外骰一顆)
          </div>
          <div 
            :class="[
              'font-semibold p-1 rounded transition-all',
              characterStore.deathSpiral.severeWounds >= 4 
                ? 'bg-red-700 text-white border-2 border-red-900 animate-pulse' 
                : 'text-gray-700'
            ]"
          >
            4 劇烈傷: 你陷入無助
          </div>
        </div>
      </div>

      <!-- Death Spiral 圖片 -->
      <div class="relative mx-auto" style="width: 280px; height: 280px;">
        <img :src="getAssetUrl('/death_spiral.webp')" alt="Death Spiral" 
             class="w-full h-full object-contain opacity-70" />
        
        <!-- 疊加的圓圈 -->
        <div class="absolute inset-0">
          <button
            v-for="n in 20"
            :key="n"
            @click="handleCircleClick(n - 1)"
            :class="[
              'absolute w-6 h-6 wound-mark rounded-full',
              getWoundLevelClass(n),
              isSevereWoundPosition(n) ? 'severe-position' : ''
            ]"
            :style="getCirclePosition(n - 1)"
          >
            <span v-if="characterStore.displayWounds[n - 1]" 
                  :class="[
                    'slash-mark',
                    isSevereWoundFilled(n - 1) ? 'severe-filled' : ''
                  ]"></span>
          </button>
        </div>
      </div>
      <div v-if="characterStore.isHelpless" 
           class="mt-3 text-center text-red-700 font-bold text-sm animate-pulse">
        ⚠️ 角色已無助！
      </div>

      <!-- 劇烈傷勢控制 -->
      <div class="mt-4 border-t-2 border-red-300 pt-3">
        <div class="mb-3">
          <div class="text-sm font-bold text-red-900 mb-2">劇烈傷勢調整</div>
          <div class="flex items-center gap-2">
            <button
              @click="characterStore.removeSevereWound()"
              :disabled="characterStore.deathSpiral.severeWounds === 0"
              class="px-3 py-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded transition-colors"
            >
              −
            </button>
            <div class="flex-1 text-center">
              <span class="text-2xl font-bold text-red-900">{{ characterStore.deathSpiral.severeWounds }}</span>
              <span class="text-sm text-gray-600"> / 4</span>
            </div>
            <button
              @click="characterStore.addSevereWound()"
              :disabled="characterStore.deathSpiral.severeWounds === 4"
              class="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded transition-colors"
            >
              +
            </button>
          </div>
          <div class="text-xs text-gray-600 text-center mt-1">
            每承受 5 個傷勢可增加 1 個劇烈傷勢
          </div>
        </div>
        
        <div class="flex gap-2">
          <button
            @click="handleClearWounds"
            class="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            title="清空所有當前傷勢，但保留劇烈傷勢（場景結束時使用）"
          >
            🏥 清空傷勢
          </button>
          <button
            @click="handleClearSevereWounds"
            class="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
            title="清除所有劇烈傷勢和傷勢（劇集結束時使用）"
          >
            ✨ 清除劇烈傷勢
          </button>
        </div>
        
        <div class="mt-2 text-xs text-gray-600 space-y-1">
          <div>• 場景結束：清空傷勢（保留劇烈傷勢）</div>
          <div>• 劇集結束：清除劇烈傷勢（完全痊癒）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';
import { getAssetUrl } from '~/composables/useAssetUrl';

const characterStore = useCharacterStore();

// 判斷是否為劇烈傷勢位置（第 5, 10, 15, 20 個）
const isSevereWoundPosition = (n: number) => {
  return n % 5 === 0 && n > 0;
};

// 判斷該位置是否由劇烈傷勢填補（而非當前傷勢）
const isSevereWoundFilled = (index: number) => {
  // 該位置有顯示，但當前傷勢陣列中沒有標記，說明是劇烈傷勢填補的
  return characterStore.displayWounds[index] && !characterStore.deathSpiral.wounds[index];
};

// 根據傷勢圓圈編號返回對應的高亮樣式（每 5 個為一個劇烈傷勢等級）
const getWoundLevelClass = (n: number) => {
  const severeLevel = Math.floor(n / 5); // 0-3 對應 1-4 劇烈傷勢
  
  // 每 5 個傷勢的最後一個圓圈（第 5, 10, 15, 20 個）使用特殊樣式
  if (n % 5 === 0 && n > 0) {
    if (severeLevel === 1) {
      return 'border-2 border-yellow-500 bg-yellow-100';
    } else if (severeLevel === 2) {
      return 'border-2 border-orange-500 bg-orange-100';
    } else if (severeLevel === 3) {
      return 'border-2 border-red-500 bg-red-100';
    } else if (severeLevel === 4) {
      return 'border-2 border-red-700 bg-red-200';
    }
  }
  return 'border-2 border-blue-500 bg-blue-200 bg-opacity-50';
};

// 根據圖片實際位置的精確座標（以百分比表示）
// 這些座標是按照圖片上的圓圈順時針排列
const circlePositions = [
  // 外圈（第一圈）- 0-4
  { left: 10, top: 53 },    // 0: 上方
  { left: 16, top: 42 },   // 1: 右上
  { left: 22, top: 32 },   // 2: 右
  { left: 32, top: 24 },   // 3: 右下
  { left: 44, top: 19 },   // 4: 下右
  
  // 外圈（第二圈）- 5-9
  { left: 58, top: 21 },   // 5: 下方
  { left: 69, top: 25 },   // 6: 下左
  { left: 78, top: 33 },   // 7: 左下
  { left: 84, top: 43 },   // 8: 左
  { left: 87, top: 57 },   // 9: 左上
  
  // 內圈（第三圈）- 10-14
  { left: 83, top: 70 },   // 10: 上方
  { left: 74, top: 77 },   // 11: 右上
  { left: 64, top: 82 },   // 12: 右
  { left: 52, top: 84 },   // 13: 右下
  { left: 40, top: 78 },   // 14: 下方
  
  // 內圈（第四圈）- 15-19
  { left: 31, top: 68 },   // 15: 下左
  { left: 30, top: 56 },   // 16: 左
  { left: 36, top: 46 },   // 17: 左上
  { left: 47, top: 42 },   // 18: 中左
  { left: 59, top: 48 },   // 19: 中右
];

const getCirclePosition = (index: number) => {
  const pos = circlePositions[index];
  if (!pos) {
    return { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
  }
  return {
    left: `${pos.left}%`,
    top: `${pos.top}%`,
    transform: 'translate(-50%, -50%)'
  };
};

// 點擊圓圈處理：連續選擇邏輯
// 點選第 N 個時，0 到 N 都會被選中
// 點選比當前更前面的，則會清除後面的選擇
const handleCircleClick = (index: number) => {
  const wounds = characterStore.deathSpiral.wounds;
  
  // 如果點擊的這個圓圈已經被選中
  if (wounds[index]) {
    // 檢查是否有比它更後面的被選中
    const hasLaterSelected = wounds.slice(index + 1).some(w => w);
    
    if (hasLaterSelected) {
      // 如果有更後面的被選中，清除 index+1 之後的所有選擇
      for (let i = index + 1; i < 20; i++) {
        if (wounds[i]) {
          characterStore.toggleWound(i);
        }
      }
    } else {
      // 如果沒有更後面的，則取消當前這個（和之前的連續選擇）
      // 從後往前找到第一個未被選中的位置
      let lastSelected = index;
      for (let i = index; i >= 0; i--) {
        if (!wounds[i]) {
          break;
        }
        lastSelected = i;
      }
      // 取消從 lastSelected 到 index 的選擇
      for (let i = lastSelected; i <= index; i++) {
        if (wounds[i]) {
          characterStore.toggleWound(i);
        }
      }
    }
  } else {
    // 如果點擊的圓圈還沒被選中，選中從 0 到 index 的所有圓圈
    for (let i = 0; i <= index; i++) {
      if (!wounds[i]) {
        characterStore.toggleWound(i);
      }
    }
  }
};

// 清空傷勢（場景結束）
const handleClearWounds = () => {
  if (confirm('確定要清空傷勢嗎？\n\n這會清除所有當前傷勢（20個圓圈），但保留劇烈傷勢（適用於場景結束時）。')) {
    characterStore.clearWounds();
  }
};

// 清除劇烈傷勢（劇集結束）
const handleClearSevereWounds = () => {
  if (confirm('確定要清除劇烈傷勢嗎？\n\n這會清除所有劇烈傷勢和當前傷勢，角色完全痊癒（適用於劇集結束時）。')) {
    characterStore.clearSevereWounds();
  }
};
</script>

<style scoped>
/* 傷勢按鈕基礎樣式 - 透明無背景 */
.wound-mark {
  background: transparent;
  border: none;
  cursor: pointer;
}

/* 刀劃痕跡效果 */
.slash-mark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.slash-mark::before,
.slash-mark::after {
  content: '';
  position: absolute;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(139, 0, 0, 0.9) 20%,
    rgba(185, 28, 28, 1) 50%,
    rgba(139, 0, 0, 0.9) 80%,
    transparent 100%
  );
  box-shadow: 
    0 0 3px rgba(220, 38, 38, 0.9),
    0 0 6px rgba(185, 28, 28, 0.6);
}

/* 主要斜線 - 從左上到右下 */
.slash-mark::before {
  width: 160%;
  height: 2.5px;
  transform: rotate(-45deg);
  animation: slashAppear 0.25s ease-out;
}

/* 次要斜線 - 從右上到左下 */
.slash-mark::after {
  width: 140%;
  height: 2px;
  transform: rotate(45deg);
  opacity: 0.7;
  animation: slashAppear 0.3s ease-out;
}

/* 刀劃出現動畫 */
@keyframes slashAppear {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 劇烈傷勢位置的特殊標記 */
.severe-position {
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
}

/* 劇烈傷勢填補的刀劃（使用金色表示持久傷害）*/
.severe-filled::before,
.severe-filled::after {
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(180, 83, 9, 0.9) 20%,
    rgba(217, 119, 6, 1) 50%,
    rgba(180, 83, 9, 0.9) 80%,
    transparent 100%
  );
  box-shadow: 
    0 0 3px rgba(217, 119, 6, 0.9),
    0 0 6px rgba(180, 83, 9, 0.6);
}
</style>
