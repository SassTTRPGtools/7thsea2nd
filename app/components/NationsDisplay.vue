<!-- 7th Sea 2nd Edition - 國家資訊展示組件 -->
<template>
  <div class="nations-display p-6 max-w-7xl mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-center text-red-900">
      7th Sea 2nd Edition - 瑟亞諸國
    </h1>

    <!-- 國家列表 -->
    <div class="space-y-8">
      <div
        v-for="nation in allNations"
        :key="nation.key"
        class="nation-card bg-white border-4 border-red-800 rounded-lg overflow-hidden shadow-xl"
      >
        <!-- 國家標題 -->
        <div class="bg-red-800 text-white p-4">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold">
              {{ nation.name }}
              <span class="text-sm opacity-75">({{ nation.key }})</span>
            </h2>
            <div class="flex gap-2">
              <span
                v-for="bonus in nation.traitBonuses"
                :key="bonus.trait"
                class="bg-white text-red-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                +1 {{ bonus.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- 國家內容 -->
        <div class="p-6">
          <!-- 主要描述 -->
          <div class="mb-6">
            <h3 class="text-xl font-bold text-red-900 mb-3 border-b-2 border-red-300 pb-2">
              概述
            </h3>
            <p class="text-gray-800 whitespace-pre-line leading-relaxed">
              {{ nation.description }}
            </p>
          </div>

          <!-- 詳細資訊網格 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 外貌 -->
            <div v-if="nation.appearance" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 mb-2 flex items-center">
                <span class="mr-2">👤</span> 外貌
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed">
                {{ nation.appearance }}
              </p>
            </div>

            <!-- 常見職業 -->
            <div v-if="nation.commonProfessions" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 mb-2 flex items-center">
                <span class="mr-2">⚔️</span> 常見職業
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed">
                {{ nation.commonProfessions }}
              </p>
            </div>

            <!-- 信仰 -->
            <div v-if="nation.religion" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 mb-2 flex items-center">
                <span class="mr-2">✝️</span> 信仰
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {{ nation.religion }}
              </p>
            </div>

            <!-- 態度 -->
            <div v-if="nation.attitude" class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 mb-2 flex items-center">
                <span class="mr-2">🎭</span> 態度
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {{ nation.attitude }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 統計資訊 -->
    <div class="mt-8 p-6 bg-red-50 border-2 border-red-300 rounded-lg">
      <h3 class="text-xl font-bold text-red-900 mb-4">統計資訊</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="text-center">
          <div class="text-3xl font-bold text-red-800">{{ allNations.length }}</div>
          <div class="text-sm text-gray-600">國家總數</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-800">{{ traitBonusCount.brawn }}</div>
          <div class="text-sm text-gray-600">體魄加值</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-800">{{ traitBonusCount.finesse }}</div>
          <div class="text-sm text-gray-600">靈巧加值</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-800">{{ traitBonusCount.resolve }}</div>
          <div class="text-sm text-gray-600">堅毅加值</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-red-800">{{ traitBonusCount.wits }}</div>
          <div class="text-sm text-gray-600">機智加值</div>
        </div>
        <div class="text-center col-span-2 md:col-span-5">
          <div class="text-3xl font-bold text-red-800">{{ traitBonusCount.panache }}</div>
          <div class="text-sm text-gray-600">風采加值</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { getAllNations } = useGameData();

// 取得所有國家
const allNations = getAllNations();

// 計算各屬性加值的出現次數
const traitBonusCount = computed(() => {
  const count: Record<string, number> = {
    brawn: 0,
    finesse: 0,
    resolve: 0,
    wits: 0,
    panache: 0
  };

  allNations.forEach(nation => {
    nation.traitBonuses.forEach(bonus => {
      if (count[bonus.trait] !== undefined) {
        count[bonus.trait]++;
      }
    });
  });

  return count;
});
</script>

<style scoped>
.nation-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.nation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
