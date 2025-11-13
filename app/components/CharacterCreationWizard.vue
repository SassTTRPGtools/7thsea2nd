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
            你會依照英雄所屬的國家獲得一項屬性加值選項。
          </p>

          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="nation in nations"
              :key="nation.key"
              @click="selectNation(nation.key)"
              :class="[
                'p-4 border-2 rounded text-left transition-all',
                characterStore.nation === nation.key
                  ? 'border-red-700 bg-red-50'
                  : 'border-stone-300 hover:border-red-500'
              ]"
            >
              <h3 class="font-bold text-lg">{{ nation.name }}</h3>
              <p class="text-sm text-gray-600 mt-1">
                屬性加值: 
                <span class="font-semibold">
                  {{ nation.traitBonuses.map(t => t.label).join(' 或 ') }}
                </span>
              </p>
            </button>
          </div>

          <!-- 國家詳情 -->
          <div v-if="selectedNation" class="mt-6 p-4 bg-stone-100 rounded">
            <h4 class="font-bold text-lg mb-2">{{ selectedNation.name }}</h4>
            <p class="text-sm text-gray-700 whitespace-pre-line">{{ selectedNation.description }}</p>
          </div>
        </div>

        <!-- 步驟 2: 屬性分配 -->
        <div v-else-if="currentStep === 2">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 2: 分配屬性點數</h2>
          <p class="text-gray-700 mb-4">
            每位英雄的所有屬性起始為 2，你有 <span class="font-bold text-red-700">2 點</span>可用來提升屬性。
          </p>
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
                <span class="text-2xl font-bold text-red-900">{{ value }}</span>
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
            <button
              v-for="bg in backgrounds"
              :key="bg.key"
              @click="toggleBackground(bg)"
              :disabled="!canSelectBackground(bg.key)"
              :class="[
                'p-4 border-2 rounded text-left transition-all',
                isBackgroundSelected(bg.key)
                  ? 'border-red-700 bg-red-50'
                  : canSelectBackground(bg.key)
                  ? 'border-stone-300 hover:border-red-500'
                  : 'border-stone-200 bg-stone-100 opacity-50 cursor-not-allowed'
              ]"
            >
              <h3 class="font-bold">{{ bg.name }}</h3>
              <p class="text-xs text-gray-600 mt-1">{{ bg.description }}</p>
              <div class="mt-2 text-xs">
                <span class="text-green-700 font-semibold">技能:</span> {{ bg.skills?.join(', ') }}
              </div>
            </button>
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
import { getBackgrounds, type Background } from '~/data/backgrounds';

const characterStore = useCharacterStore();
const creation = useCharacterCreation();

const currentStep = ref(1);
const stepTitles = ['國家', '屬性', '背景', '技能', '優勢', '阿爾克那'];

const nations = getNations();
const backgrounds = getBackgrounds();

// 載入已保存的角色資料
onMounted(() => {
  characterStore.loadFromLocalStorage();
});

const selectedNation = computed(() => {
  if (!characterStore.nation) return null;
  return nations.find(n => n.key === characterStore.nation);
});

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

const selectNation = (nationKey: string) => {
  characterStore.setNation(nationKey);
};

const increaseTrait = (trait: string) => {
  const current = characterStore.traits[trait as keyof typeof characterStore.traits];
  characterStore.setTrait(trait as keyof typeof characterStore.traits, current + 1);
};

const decreaseTrait = (trait: string) => {
  const current = characterStore.traits[trait as keyof typeof characterStore.traits];
  characterStore.setTrait(trait as keyof typeof characterStore.traits, current - 1);
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
    case 2: return creation.isStep2Complete.value;
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
