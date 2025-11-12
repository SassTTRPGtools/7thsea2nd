<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">優勢系統 (Advantages)</h1>
    
    <!-- 統計資訊 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div class="bg-blue-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-blue-800">{{ totalAdvantages }}</div>
        <div class="text-sm text-blue-600">總優勢數量</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-green-800">{{ onePointAdvantages }}</div>
        <div class="text-sm text-green-600">一點優勢</div>
      </div>
      <div class="bg-purple-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-purple-800">{{ twoPointAdvantages }}</div>
        <div class="text-sm text-purple-600">二點優勢</div>
      </div>
      <div class="bg-yellow-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-yellow-800">{{ threePointAdvantages }}</div>
        <div class="text-sm text-yellow-600">三點優勢</div>
      </div>
      <div class="bg-orange-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-orange-800">{{ fourPointAdvantages }}</div>
        <div class="text-sm text-orange-600">四點優勢</div>
      </div>
      <div class="bg-red-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-red-800">{{ fivePointAdvantages }}</div>
        <div class="text-sm text-red-600">五點優勢</div>
      </div>
    </div>

    <!-- 優勢篩選 -->
    <div class="mb-6 flex flex-wrap gap-4">
      <select 
        v-model="filterCost" 
        class="border rounded px-4 py-2"
      >
        <option value="all">所有成本 (76)</option>
        <option value="1">一點優勢 (10)</option>
        <option value="2">二點優勢 (26)</option>
        <option value="3">三點優勢 (20)</option>
        <option value="4">四點優勢 (11)</option>
        <option value="5">五點優勢 (9)</option>
      </select>
      
      <select 
        v-model="filterType" 
        class="border rounded px-4 py-2"
      >
        <option value="all">所有類型</option>
        <option value="heroPoint">需英雄點 ★</option>
        <option value="personal">個人特質 👤</option>
        <option value="passive">被動效果</option>
      </select>

      <select 
        v-model="selectedNation" 
        class="border rounded px-4 py-2"
      >
        <option value="">選擇國籍（查看減免）</option>
        <option v-for="nation in allNations" :key="nation.key" :value="nation.key">
          {{ nation.name }}
        </option>
      </select>
    </div>

    <!-- 優勢列表 -->
    <div class="space-y-4">
      <div 
        v-for="advantage in filteredAdvantages" 
        :key="advantage.key"
        class="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-bold">
            {{ advantage.name }}
            <span v-if="advantage.isHeroPoint" class="text-yellow-600">★</span>
            <span v-if="advantage.isPersonal" class="text-blue-600">👤</span>
          </h3>
          <div class="flex flex-col items-end">
            <span 
              class="px-3 py-1 rounded-full text-sm font-semibold"
              :class="getCostBadgeClass(advantage.cost)"
            >
              {{ getDisplayCost(advantage) }}
            </span>
            <span 
              v-if="hasDiscount(advantage)" 
              class="text-xs text-green-600 mt-1"
            >
              ※ 有條件減免
            </span>
          </div>
        </div>
        
        <p class="text-gray-700 mb-3">{{ advantage.description }}</p>
        
        <!-- 條件性成本減免資訊 -->
        <div 
          v-if="advantage.conditionalCost && advantage.conditionalCost.length > 0"
          class="bg-green-50 border border-green-200 rounded p-3 mt-3"
        >
          <div class="text-sm font-semibold text-green-800 mb-1">條件性成本：</div>
          <ul class="text-sm text-green-700 space-y-1">
            <li v-for="(cond, idx) in advantage.conditionalCost" :key="idx">
              • {{ cond.condition }}：僅需 <strong>{{ cond.reducedCost }}</strong> 點
              <span v-if="cond.nation">
                （{{ getNationName(cond.nation) }}）
              </span>
            </li>
          </ul>
        </div>

        <!-- 當前國籍成本顯示 -->
        <div 
          v-if="selectedNation && getActualCost(advantage.key) !== advantage.cost"
          class="bg-blue-50 border border-blue-200 rounded p-2 mt-2"
        >
          <div class="text-sm text-blue-800">
            <strong>{{ getNationName(selectedNation) }}</strong> 角色購買此優勢：
            <span class="line-through text-gray-500">{{ advantage.cost }} 點</span>
            → <strong class="text-blue-600">{{ getActualCost(advantage.key) }} 點</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- 圖例說明 -->
    <div class="mt-8 p-4 bg-gray-100 rounded-lg">
      <h3 class="font-bold mb-2">圖例說明：</h3>
      <ul class="text-sm space-y-1">
        <li><span class="text-yellow-600">★</span> = 需要消耗英雄點才能啟用的優勢</li>
        <li><span class="text-blue-600">👤</span> = 個人特質（影響角色體質或背景）</li>
        <li>被動效果 = 無需啟用，自動生效的優勢</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Advantage } from '~/data';

const { 
  getAllAdvantages, 
  getAllNations,
  getActualAdvantageCost,
  getNationName 
} = useGameData();

const allAdvantages: Advantage[] = getAllAdvantages();
const allNations = getAllNations();

// 篩選條件
const filterCost = ref<'all' | '1' | '2' | '3' | '4' | '5'>('all');
const filterType = ref<'all' | 'heroPoint' | 'personal' | 'passive'>('all');
const selectedNation = ref<string>('');

// 統計
const totalAdvantages = computed(() => allAdvantages.length);
const onePointAdvantages = computed(() => 
  allAdvantages.filter((adv: Advantage) => adv.cost === 1).length
);
const twoPointAdvantages = computed(() => 
  allAdvantages.filter((adv: Advantage) => adv.cost === 2).length
);
const threePointAdvantages = computed(() => 
  allAdvantages.filter((adv: Advantage) => adv.cost === 3).length
);
const fourPointAdvantages = computed(() => 
  allAdvantages.filter((adv: Advantage) => adv.cost === 4).length
);
const fivePointAdvantages = computed(() => 
  allAdvantages.filter((adv: Advantage) => adv.cost === 5).length
);

// 篩選優勢
const filteredAdvantages = computed(() => {
  return allAdvantages.filter((adv: Advantage) => {
    // 成本篩選
    if (filterCost.value !== 'all' && adv.cost !== parseInt(filterCost.value)) {
      return false;
    }
    
    // 類型篩選
    if (filterType.value === 'heroPoint' && !adv.isHeroPoint) return false;
    if (filterType.value === 'personal' && !adv.isPersonal) return false;
    if (filterType.value === 'passive' && (adv.isHeroPoint || adv.isPersonal)) return false;
    
    return true;
  });
});

// 取得成本標籤樣式
const getCostBadgeClass = (cost: number) => {
  const costClasses: Record<number, string> = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-purple-100 text-purple-800',
    3: 'bg-yellow-100 text-yellow-800',
    4: 'bg-orange-100 text-orange-800',
    5: 'bg-red-100 text-red-800'
  };
  return costClasses[cost] || 'bg-gray-100 text-gray-800';
};

// 取得顯示成本
const getDisplayCost = (advantage: Advantage) => {
  const actualCost = selectedNation.value 
    ? getActualCost(advantage.key)
    : advantage.cost;
  return `${actualCost} 點`;
};

// 取得實際成本
const getActualCost = (advantageKey: string) => {
  return getActualAdvantageCost(advantageKey, selectedNation.value || undefined);
};

// 檢查是否有減免
const hasDiscount = (advantage: Advantage) => {
  return advantage.conditionalCost && advantage.conditionalCost.length > 0;
};
</script>
