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
            @click="toggleDramaticWound(n - 1)"
            :class="[
              'absolute w-6 h-6 rounded-full border-2 transition-all',
              characterStore.deathSpiral.dramaticWounds[n - 1]
                ? 'bg-red-700 border-red-900'
                : 'bg-white bg-opacity-60 border-gray-600 hover:border-red-700'
            ]"
            :style="getCirclePosition(n - 1)"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '~/stores/characterStore';

const characterStore = useCharacterStore();

const setWounds = (level: number) => {
  characterStore.setCurrentWounds(level);
};

const toggleDramaticWound = (index: number) => {
  characterStore.toggleDramaticWound(index);
};

const getCirclePosition = (index: number) => {
  const totalCircles = 20;
  const angle = (index / totalCircles) * Math.PI * 4;
  const radius = 35 + (index / totalCircles) * 10;
  
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)'
  };
};
</script>
