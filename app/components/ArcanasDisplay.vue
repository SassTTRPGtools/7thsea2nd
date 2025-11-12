<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">阿爾克那系統 (Arcana)</h1>
    
    <!-- 說明 -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
      <h2 class="font-bold text-lg mb-2">關於阿爾克那</h2>
      <p class="text-gray-700 mb-2">
        每位英雄需要選擇一項<strong class="text-green-700">美德 (Virtue)</strong>與一項<strong class="text-red-700">傲性 (Hubris)</strong>。
        它們不必出自同一張牌。
      </p>
      <ul class="text-sm text-gray-600 space-y-1">
        <li>• <strong class="text-green-700">美德</strong>：主動啟動的強力效果，幫助你度過困境</li>
        <li>• <strong class="text-red-700">傲性</strong>：當你按照角色性格行動時，獲得英雄點</li>
      </ul>
    </div>

    <!-- 統計資訊 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-purple-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-purple-800">{{ totalArcanas }}</div>
        <div class="text-sm text-purple-600">阿爾克那牌數</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-green-800">{{ totalArcanas }}</div>
        <div class="text-sm text-green-600">美德數量</div>
      </div>
      <div class="bg-red-100 p-4 rounded-lg">
        <div class="text-2xl font-bold text-red-800">{{ totalArcanas }}</div>
        <div class="text-sm text-red-600">傲性數量</div>
      </div>
    </div>

    <!-- 篩選 -->
    <div class="mb-6 flex gap-4">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="搜尋阿爾克那、美德或傲性..."
        class="flex-1 border rounded px-4 py-2"
      >
      <select 
        v-model="sortBy" 
        class="border rounded px-4 py-2"
      >
        <option value="default">預設順序</option>
        <option value="name">按名稱排序</option>
      </select>
    </div>

    <!-- 阿爾克那卡片列表 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div 
        v-for="arcana in filteredArcanas" 
        :key="arcana.key"
        class="bg-white border-2 border-purple-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
      >
        <!-- 標題 -->
        <div class="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4">
          <h3 class="text-2xl font-bold">{{ arcana.name }}</h3>
          <p class="text-sm text-purple-200">{{ arcana.nameEn }}</p>
        </div>

        <div class="p-4 space-y-4">
          <!-- 美德 -->
          <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div class="flex items-center mb-2">
              <span class="text-2xl mr-2">✓</span>
              <div>
                <h4 class="font-bold text-green-800 text-lg">
                  美德：{{ arcana.virtue.name }}
                </h4>
                <p class="text-xs text-green-600">{{ arcana.virtue.activation }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-700 mb-2">{{ arcana.virtue.description }}</p>
            <div class="bg-green-100 rounded p-2 text-sm">
              <strong class="text-green-800">效果：</strong>
              <span class="text-gray-700">{{ arcana.virtue.effect }}</span>
            </div>
          </div>

          <!-- 傲性 -->
          <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div class="flex items-center mb-2">
              <span class="text-2xl mr-2">✗</span>
              <div>
                <h4 class="font-bold text-red-800 text-lg">
                  傲性：{{ arcana.hubris.name }}
                </h4>
                <p class="text-xs text-red-600">{{ arcana.hubris.trigger }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-700 mb-2">{{ arcana.hubris.description }}</p>
            <div class="bg-red-100 rounded p-2 text-sm">
              <strong class="text-red-800">獎勵：</strong>
              <span class="text-gray-700">{{ arcana.hubris.reward }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 圖例說明 -->
    <div class="mt-8 p-4 bg-gray-100 rounded-lg">
      <h3 class="font-bold mb-2">遊戲機制說明：</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 class="font-semibold text-green-700 mb-1">美德 (Virtue)</h4>
          <ul class="space-y-1 text-gray-700">
            <li>• 主動啟動的能力</li>
            <li>• 通常在關鍵時刻使用</li>
            <li>• 可以扭轉局勢或保護隊友</li>
            <li>• 每個美德有特定啟動條件</li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-red-700 mb-1">傲性 (Hubris)</h4>
          <ul class="space-y-1 text-gray-700">
            <li>• 角色性格缺陷</li>
            <li>• 按照傲性行動時獲得英雄點</li>
            <li>• 通常會製造麻煩或困難</li>
            <li>• 讓角色更有戲劇性和深度</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 隨機選擇器 -->
    <div class="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 class="font-bold text-xl mb-4">隨機命運之牌</h3>
      <div class="flex gap-4 mb-4">
        <button 
          @click="randomVirtue"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition"
        >
          抽取隨機美德
        </button>
        <button 
          @click="randomHubris"
          class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition"
        >
          抽取隨機傲性
        </button>
        <button 
          @click="randomBoth"
          class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded transition"
        >
          同時抽取兩者
        </button>
      </div>

      <!-- 隨機結果顯示 -->
      <div v-if="selectedVirtue || selectedHubris" class="space-y-4">
        <div v-if="selectedVirtue" class="bg-green-100 border border-green-300 rounded p-4">
          <h4 class="font-bold text-green-800 mb-2">
            抽到美德：{{ selectedVirtue.name }} ({{ getArcanaName(selectedVirtue.arcanaKey) }})
          </h4>
          <p class="text-sm text-gray-700">{{ selectedVirtue.description }}</p>
        </div>
        <div v-if="selectedHubris" class="bg-red-100 border border-red-300 rounded p-4">
          <h4 class="font-bold text-red-800 mb-2">
            抽到傲性：{{ selectedHubris.name }} ({{ getArcanaName(selectedHubris.arcanaKey) }})
          </h4>
          <p class="text-sm text-gray-700">{{ selectedHubris.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Arcana, Virtue, Hubris } from '~/data';

const { 
  getAllArcanas, 
  getAllVirtues,
  getAllHubris,
  getArcanaName 
} = useGameData();

const allArcanas: Arcana[] = getAllArcanas();
const allVirtues: Virtue[] = getAllVirtues();
const allHubris: Hubris[] = getAllHubris();

// 篩選與排序
const searchQuery = ref<string>('');
const sortBy = ref<'default' | 'name'>('default');

// 隨機選擇結果
const selectedVirtue = ref<Virtue | null>(null);
const selectedHubris = ref<Hubris | null>(null);

// 統計
const totalArcanas = computed(() => allArcanas.length);

// 篩選阿爾克那
const filteredArcanas = computed(() => {
  let result = [...allArcanas];

  // 搜尋篩選
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(arcana => 
      arcana.name.toLowerCase().includes(query) ||
      arcana.nameEn.toLowerCase().includes(query) ||
      arcana.virtue.name.toLowerCase().includes(query) ||
      arcana.hubris.name.toLowerCase().includes(query)
    );
  }

  // 排序
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'zh-TW'));
  }

  return result;
});

// 隨機選擇函數
const randomVirtue = () => {
  const randomIndex = Math.floor(Math.random() * allVirtues.length);
  const virtue = allVirtues[randomIndex];
  if (virtue) {
    selectedVirtue.value = virtue;
  }
  selectedHubris.value = null;
};

const randomHubris = () => {
  const randomIndex = Math.floor(Math.random() * allHubris.length);
  const hubris = allHubris[randomIndex];
  if (hubris) {
    selectedHubris.value = hubris;
  }
  selectedVirtue.value = null;
};

const randomBoth = () => {
  const virtueIndex = Math.floor(Math.random() * allVirtues.length);
  const hubrisIndex = Math.floor(Math.random() * allHubris.length);
  const virtue = allVirtues[virtueIndex];
  const hubris = allHubris[hubrisIndex];
  if (virtue) selectedVirtue.value = virtue;
  if (hubris) selectedHubris.value = hubris;
};
</script>
