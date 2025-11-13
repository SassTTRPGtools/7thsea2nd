<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">死亡螺旋</h2>
    </div>
    
    <div class="p-4">
      <!-- 傷勢等級說明 -->
      <div class="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div class="space-y-1">
          <div class="font-semibold text-gray-700">1: 所有檢定 +1 額外骰數</div>
          <div class="font-semibold text-gray-700">2: 反派 +2 額外骰數</div>
        </div>
        <div class="space-y-1">
          <div class="font-semibold text-gray-700">3: 啟動 10 爆炸骰 (額外骰一顆)</div>
          <div class="font-semibold text-gray-700">4: 你陷入無助</div>
        </div>
      </div>

      <!-- Death Spiral 圖片 -->
      <div class="relative mx-auto" style="width: 280px; height: 280px;">
        <img src="/death_spiral.png" alt="Death Spiral" 
             class="w-full h-full object-contain opacity-70" />
        
        <!-- 疊加的圓圈 -->
        <div class="absolute inset-0">
          <button
            v-for="n in 20"
            :key="n"
            @click="(e) => handleCircleClick(e, n - 1)"
            :class="[
              'absolute w-6 h-6 rounded-full border-2 transition-all',
              characterStore.deathSpiral.dramaticWounds[n - 1]
                ? 'bg-red-700 border-red-900'
                : 'bg-white bg-opacity-60 border-gray-600 hover:border-red-700'
            ]"
            :style="getCirclePosition(n - 1)"
            :title="debugMode ? `圓圈 ${n - 1}` : ''"
          >
          </button>
        </div>

        <!-- 中心傷勢等級 -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-6xl font-bold text-red-900 drop-shadow-lg">
            {{ characterStore.deathSpiral.currentWounds }}
          </div>
        </div>
      </div>

      <!-- 傷勢控制 -->
      <div class="mt-4 flex justify-center gap-2">
        <button
          v-for="n in 5"
          :key="n - 1"
          @click="setWounds(n - 1)"
          :class="[
            'w-10 h-10 rounded-full border-2 font-bold transition-all',
            (n - 1) === characterStore.deathSpiral.currentWounds
              ? 'bg-red-900 border-red-900 text-white'
              : 'bg-white border-gray-400 text-gray-700 hover:border-red-700'
          ]"
        >
          {{ n - 1 }}
        </button>
      </div>

      <div v-if="characterStore.isHelpless" 
           class="mt-3 text-center text-red-700 font-bold text-sm animate-pulse">
        ⚠️ 角色已無助！
      </div>

      <div class="mt-3 text-center text-xs text-gray-600">
        已標記: {{ characterStore.markedDramaticWounds }} / 20
      </div>

      <!-- 調試模式開關 -->
      <div class="mt-2 text-center">
        <button
          @click="debugMode = !debugMode"
          class="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          {{ debugMode ? '關閉' : '開啟' }}調試模式
        </button>
        <div v-if="debugMode" class="mt-2 text-xs text-gray-500">
          💡 按住 Ctrl + 點擊圓圈可在控制台顯示座標
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();
const debugMode = ref(false); // 設為 true 可以看到座標資訊

const setWounds = (level: number) => {
  characterStore.setCurrentWounds(level);
};

const toggleDramaticWound = (index: number) => {
  characterStore.toggleDramaticWound(index);
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

// 開發用：按住 Ctrl+點擊可以顯示座標（用於調整）
const handleCircleClick = (event: MouseEvent, index: number) => {
  if (event.ctrlKey && debugMode.value) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.parentElement as HTMLElement;
    const rect = parent.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);
    console.log(`圓圈 ${index}: { left: ${x}, top: ${y} }`);
  } else {
    toggleDramaticWound(index);
  }
};
</script>
