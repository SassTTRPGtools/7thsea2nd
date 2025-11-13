<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
      <!-- 標題 -->
      <div class="bg-red-900 text-white text-center py-3 px-6">
        <h1 class="text-2xl font-bold uppercase tracking-wider">角色創建</h1>
        <p class="text-sm mt-1 opacity-90">步驟 {{ currentStep }} / 6</p>
      </div>

      <!-- 進度條 -->
      <div class="bg-stone-200 h-2">
        <div 
          class="bg-red-700 h-full transition-all duration-300"
          :style="{ width: `${(currentStep / 6) * 100}%` }"
        ></div>
      </div>

      <!-- 步驟導航 -->
      <div class="flex justify-between p-4 border-b-2 border-stone-300">
        <button
          v-for="step in 6"
          :key="step"
          @click="goToStep(step)"
          :class="[
            'px-4 py-2 rounded text-sm font-semibold transition-all',
            currentStep === step
              ? 'bg-red-700 text-white'
              : isStepComplete(step)
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-stone-300 text-gray-600 cursor-not-allowed'
          ]"
          :disabled="!canNavigateTo(step)"
        >
          {{ step }}. {{ stepTitles[step - 1] }}
        </button>
      </div>

      <!-- 步驟內容 -->
      <div class="p-6 min-h-[500px]">
        <!-- 步驟 1: 國家選擇 -->
        <div v-if="currentStep === 1">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 1: 選擇國家</h2>
          <p class="text-gray-700 mb-6">
            選擇你的英雄所屬的國家。每個國家都有獨特的文化背景與特色。
          </p>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            <button
              v-for="nation in nations"
              :key="nation.key"
              @click="selectNation(nation.key)"
              :class="[
                'p-4 border-2 rounded-lg text-left transition-all hover:shadow-lg',
                characterStore.nation === nation.key
                  ? 'border-red-700 bg-red-50 ring-2 ring-red-300'
                  : 'border-stone-300 hover:border-red-500'
              ]"
            >
              <div class="flex items-start gap-3">
                <img 
                  :src="getNationImage(nation.key)" 
                  :alt="nation.name"
                  class="w-16 h-16 object-cover rounded border-2 border-stone-300"
                />
                <div class="flex-1">
                  <h3 class="font-bold text-lg">{{ nation.name }}</h3>
                </div>
              </div>
            </button>
          </div>

          <!-- 國家詳細資訊 -->
          <div v-if="selectedNation" class="mt-6 bg-stone-100 rounded-lg overflow-hidden border-2 border-stone-300">
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="getNationImage(selectedNation.key)" 
                :alt="selectedNation.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 class="absolute bottom-4 left-4 text-white text-2xl font-bold drop-shadow-lg">
                {{ selectedNation.name }}
              </h3>
            </div>
            
            <div class="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              <!-- 描述 -->
              <div>
                <h4 class="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span class="text-xl">📖</span> 描述
                </h4>
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ selectedNation.description }}
                </p>
              </div>

              <!-- 外貌 -->
              <div v-if="selectedNation.appearance">
                <h4 class="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span class="text-xl">👤</span> 外貌
                </h4>
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ selectedNation.appearance }}
                </p>
              </div>

              <!-- 常見職業 -->
              <div v-if="selectedNation.commonProfessions">
                <h4 class="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span class="text-xl">⚔️</span> 常見職業
                </h4>
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ selectedNation.commonProfessions }}
                </p>
              </div>

              <!-- 信仰 -->
              <div v-if="selectedNation.religion">
                <h4 class="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span class="text-xl">✝️</span> 信仰
                </h4>
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ selectedNation.religion }}
                </p>
              </div>

              <!-- 態度 -->
              <div v-if="selectedNation.attitude">
                <h4 class="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <span class="text-xl">💭</span> 態度
                </h4>
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ selectedNation.attitude }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 步驟 2: 屬性分配 -->
        <div v-else-if="currentStep === 2">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 2: 分配屬性點數</h2>
          <p class="text-gray-700 mb-4">
            每位英雄的所有屬性起始為 2，你有 <span class="font-bold text-red-700">2 點</span>可用來提升屬性。
          </p>

          <!-- 國家屬性加值選擇 -->
          <div v-if="selectedNation && !characterStore.nationTraitBonus" class="mb-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
            <h3 class="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <span class="text-xl">⭐</span> 
              {{ selectedNation.name }} 國家加值
            </h3>
            <p class="text-sm text-yellow-800 mb-3">
              選擇一項屬性獲得 +1 加值（此加值不計入 2 點分配額度）
            </p>
            <div class="flex gap-3">
              <button
                v-for="bonus in selectedNation.traitBonuses"
                :key="bonus.trait"
                @click="selectTraitBonus(bonus.trait)"
                class="flex-1 px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-all shadow-md"
              >
                {{ bonus.label }}
              </button>
            </div>
          </div>

          <!-- 已選擇的國家加值 -->
          <div v-if="characterStore.nationTraitBonus" class="mb-6 p-3 bg-green-50 border-2 border-green-400 rounded-lg">
            <p class="text-sm text-green-800">
              ✓ 已選擇國家加值: <span class="font-bold">{{ getTraitLabel(characterStore.nationTraitBonus) }} +1</span>
            </p>
          </div>

          <p class="text-sm text-gray-600 mb-6">
            剩餘點數: <span class="font-bold text-lg">{{ characterStore.remainingTraitPoints }}</span>
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(value, trait) in characterStore.traits"
              :key="trait"
              class="p-4 border-2 border-stone-300 rounded"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold">{{ getTraitLabel(trait) }}</span>
                <div class="flex items-center gap-2">
                  <span 
                    v-if="trait === characterStore.nationTraitBonus" 
                    class="text-xs text-green-700 font-semibold"
                  >
                    (+1 國家)
                  </span>
                  <span class="text-2xl font-bold text-red-900">{{ value }}</span>
                  <span 
                    v-if="trait === characterStore.nationTraitBonus" 
                    class="text-lg text-gray-500"
                  >
                    (總計: {{ value + 1 }})
                  </span>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  @click="decreaseTrait(trait)"
                  :disabled="value <= 2"
                  class="flex-1 py-2 bg-stone-300 rounded hover:bg-stone-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <button
                  @click="increaseTrait(trait)"
                  :disabled="value >= 5 || characterStore.remainingTraitPoints <= 0"
                  class="flex-1 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 步驟 3: 背景選擇 -->
        <div v-else-if="currentStep === 3">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 3: 選擇背景</h2>
          <p class="text-gray-700 mb-6">
            為你的英雄選擇<span class="font-bold text-red-700">兩個背景</span>，並獲得這些背景列出的所有優勢與技能（等級 1）。
          </p>

          <!-- 已選背景 -->
          <div v-if="characterStore.backgrounds.length > 0" class="mb-6">
            <h3 class="font-semibold mb-2">已選擇的背景:</h3>
            <div class="flex gap-2">
              <div
                v-for="(bg, index) in characterStore.backgrounds"
                :key="bg.key"
                class="px-4 py-2 bg-red-700 text-white rounded flex items-center gap-2"
              >
                <span>{{ bg.name }}</span>
                <button
                  @click="characterStore.removeBackground(index)"
                  class="text-white hover:text-red-200"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- 背景列表 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="bg in backgrounds"
              :key="bg.key"
              :class="[
                'p-4 border-2 rounded transition-all',
                isBackgroundSelected(bg.key)
                  ? 'border-red-700 bg-red-50'
                  : canSelectBackground(bg.key)
                  ? 'border-stone-300 hover:border-red-500 cursor-pointer'
                  : 'border-stone-200 bg-stone-100 opacity-50 cursor-not-allowed'
              ]"
              @click="canSelectBackground(bg.key) && toggleBackground(bg)"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-lg">{{ bg.name }}</h3>
                <span class="text-xs bg-stone-200 px-2 py-1 rounded">
                  {{ getCategoryLabel(bg.category) }}
                </span>
              </div>
              
              <p class="text-xs text-gray-700 mb-3 leading-relaxed">{{ bg.description }}</p>
              
              <!-- 癖性 -->
              <div class="mb-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                <p class="text-xs font-semibold text-yellow-900 mb-1">🎭 癖性</p>
                <p class="text-xs text-yellow-800 leading-relaxed">{{ bg.quirk }}</p>
              </div>
              
              <!-- 優勢 -->
              <div class="mb-2">
                <p class="text-xs font-semibold text-green-700 mb-1">✨ 優勢</p>
                <div class="flex flex-wrap gap-1">
                  <div
                    v-for="advKey in bg.advantages"
                    :key="advKey"
                    class="relative group"
                  >
                    <span
                      class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded cursor-help inline-block"
                    >
                      {{ getAdvantageName(advKey) }}
                    </span>
                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                      <div class="font-bold mb-1">{{ getAdvantageName(advKey) }}</div>
                      <div class="text-gray-300 mb-1">成本: {{ getAdvantageCost(advKey) }} 點</div>
                      <div class="leading-relaxed">{{ getAdvantageDescription(advKey) }}</div>
                      <!-- 小三角形 -->
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div class="border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 技能 -->
              <div>
                <p class="text-xs font-semibold text-blue-700 mb-1">🎯 技能</p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="skillKey in bg.skills"
                    :key="skillKey"
                    class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {{ getSkillName(skillKey) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 步驟 4-6: 占位符 -->
        <div v-else-if="currentStep === 4">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 4: 技能分配</h2>
          <p class="text-gray-700 mb-4">
            你有 <span class="font-bold text-red-700">10 點</span>技能點數可用來提升背景技能，並加入非背景技能。
            創角時，任何技能都不能高於等級 3。
          </p>
          <p class="text-sm text-gray-600 mb-6">
            剩餘點數: <span class="font-bold text-lg">{{ creation.availableSkillPoints }}</span>
          </p>
          <p class="text-center text-gray-500 py-20">技能分配功能開發中...</p>
        </div>

        <div v-else-if="currentStep === 5">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 5: 購買優勢</h2>
          <p class="text-gray-700 mb-4">
            你有 <span class="font-bold text-red-700">5 點</span>可購買新的優勢。你只能購買你符合資格的優勢。
          </p>
          <p class="text-sm text-gray-600 mb-6">
            剩餘點數: <span class="font-bold text-lg">{{ creation.availableAdvantagePoints }}</span>
          </p>
          <p class="text-center text-gray-500 py-20">優勢購買功能開發中...</p>
        </div>

        <div v-else-if="currentStep === 6">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 6: 選擇阿爾克那</h2>
          <p class="text-gray-700 mb-6">
            每位英雄都有其命運。選擇一個<span class="font-bold text-red-700">美德</span>與一個<span class="font-bold text-red-700">傲性</span>：你的正位牌與交叉牌。
          </p>
          <p class="text-center text-gray-500 py-20">阿爾克那選擇功能開發中...</p>
        </div>
      </div>

      <!-- 導航按鈕 -->
      <div class="flex justify-between p-6 border-t-2 border-stone-300">
        <button
          @click="previousStep"
          :disabled="currentStep === 1"
          class="px-6 py-2 bg-stone-400 text-white rounded hover:bg-stone-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一步
        </button>
        <button
          @click="nextStep"
          :disabled="!canProceedToNext"
          class="px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ currentStep === 6 ? '完成' : '下一步' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';
import { useCharacterCreation } from '~/composables/useCharacterCreation';
import { getNations, type Nation } from '~/data/nations';
import { getBackgrounds, type Background, categoryNames } from '~/data/backgrounds';
import { skills } from '~/data/skills';
import { advantages } from '~/data/advantages';

const characterStore = useCharacterStore();
const creation = useCharacterCreation();

const currentStep = ref(1);
const stepTitles = ['國家', '屬性', '背景', '技能', '優勢', '阿爾克那'];

const nations = getNations();
const allBackgrounds = getBackgrounds();

// 根據所選國家篩選背景
const backgrounds = computed(() => {
  if (!characterStore.nation) return allBackgrounds.filter(bg => bg.category === 'basic');
  
  // 國家 key 到背景分類的映射
  const nationToCategoryMap: Record<string, Background['category'][]> = {
    avalon: ['basic', 'glamourIsles', 'avalon'],
    inismore: ['basic', 'glamourIsles', 'inismore'],
    highlandMarches: ['basic', 'glamourIsles', 'highlandMarches'],
    castille: ['basic', 'castille'],
    eisen: ['basic', 'eisen'],
    montaigne: ['basic', 'montaigne'],
    sarmatianCommonwealth: ['basic', 'sarmatian'],
    ussura: ['basic', 'ussura'],
    vestenmennavenjar: ['basic', 'vesten'],
    vodacce: ['basic', 'vodacce']
  };
  
  const allowedCategories = nationToCategoryMap[characterStore.nation] || ['basic'];
  return allBackgrounds.filter(bg => allowedCategories.includes(bg.category));
});

// 載入已保存的角色資料
onMounted(() => {
  characterStore.loadFromLocalStorage();
});

const selectedNation = computed(() => {
  if (!characterStore.nation) return null;
  return nations.find(n => n.key === characterStore.nation);
});

// 獲取國家圖片路徑
const getNationImage = (nationKey: string): string => {
  // 移到 public 資料夾的圖片可以直接用 /path 存取
  // 或者從 assets 引入需要使用 import
  const imageMap: Record<string, string> = {
    avalon: '/nations/Avalon.webp',
    inismore: '/nations/Inismore.webp',
    highlandMarches: '/nations/The Highland Marches.webp',
    castille: '/nations/Castille.webp',
    eisen: '/nations/Eisen.webp',
    montaigne: '/nations/Montaigne.webp',
    sarmatianCommonwealth: '/nations/The Sarmatian.webp',
    ussura: '/nations/Ussura.webp',
    vestenmennavenjar: '/nations/Vestenmennavenjar.webp',
    vodacce: '/nations/Vodacce.webp'
  };
  return imageMap[nationKey] || '/logo.png';
};

const getTraitLabel = (trait: string): string => {
  const labels: Record<string, string> = {
    brawn: '體魄',
    finesse: '靈巧',
    resolve: '堅毅',
    wits: '機智',
    panache: '風采'
  };
  return labels[trait] || trait;
};

const getCategoryLabel = (category: Background['category']): string => {
  return categoryNames[category] || category;
};

const getSkillName = (skillKey: string): string => {
  return skills[skillKey]?.name || skillKey;
};

const getAdvantageName = (advantageKey: string): string => {
  return advantages[advantageKey]?.name || advantageKey;
};

const getAdvantageCost = (advantageKey: string): number => {
  return advantages[advantageKey]?.cost || 0;
};

const getAdvantageDescription = (advantageKey: string): string => {
  return advantages[advantageKey]?.description || '';
};

const selectNation = (nationKey: string) => {
  characterStore.setNation(nationKey);
};

const selectTraitBonus = (trait: string) => {
  characterStore.setNationTraitBonus(trait);
};

const increaseTrait = (trait: string) => {
  const current = characterStore.traits[trait as keyof typeof characterStore.traits];
  characterStore.setTrait(trait as keyof typeof characterStore.traits, current + 1);
};

const decreaseTrait = (trait: string) => {
  const current = characterStore.traits[trait as keyof typeof characterStore.traits];
  // 基礎屬性最低為 2
  if (current > 2) {
    characterStore.setTrait(trait as keyof typeof characterStore.traits, current - 1);
  }
};

const isBackgroundSelected = (bgKey: string): boolean => {
  return characterStore.backgrounds.some(bg => bg.key === bgKey);
};

const canSelectBackground = (bgKey: string): boolean => {
  if (isBackgroundSelected(bgKey)) return true;
  return characterStore.backgrounds.length < 2;
};

const toggleBackground = (bg: Background) => {
  if (isBackgroundSelected(bg.key)) {
    const index = characterStore.backgrounds.findIndex(b => b.key === bg.key);
    characterStore.removeBackground(index);
  } else if (characterStore.backgrounds.length < 2) {
    characterStore.addBackground(bg.key, bg.name);
    // 自動應用背景技能和優勢
    creation.applyBackgroundSkills();
    creation.applyBackgroundAdvantages();
  }
};

const isStepComplete = (step: number): boolean => {
  switch (step) {
    case 1: return creation.isStep1Complete.value;
    case 2: 
      // 步驟 2 需要選擇國家加值並分配完 2 點屬性
      return !!characterStore.nationTraitBonus && creation.isStep2Complete.value;
    case 3: return creation.isStep3Complete.value;
    case 4: return creation.isStep4Complete.value;
    case 5: return creation.isStep5Complete.value;
    case 6: return creation.isStep6Complete.value;
    default: return false;
  }
};

const canNavigateTo = (step: number): boolean => {
  if (step === currentStep.value) return true;
  if (step < currentStep.value) return true;
  // 只能前往下一步，且當前步驟必須完成
  return step === currentStep.value + 1 && isStepComplete(currentStep.value);
};

const canProceedToNext = computed(() => {
  return isStepComplete(currentStep.value);
});

const goToStep = (step: number) => {
  if (canNavigateTo(step)) {
    currentStep.value = step;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const nextStep = () => {
  if (canProceedToNext.value) {
    if (currentStep.value < 6) {
      currentStep.value++;
    } else {
      // 完成創建
      alert('角色創建完成！');
    }
  }
};
</script>
