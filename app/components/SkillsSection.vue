<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <!-- 標題欄 -->
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">技能</h2>
    </div>
    
    <!-- 內容區 -->
    <div class="p-4">
      <!-- 左右兩欄 -->
      <div class="grid grid-cols-2 gap-x-4 gap-y-2">
        <div 
          v-for="(skill, index) in skills" 
          :key="skill.key"
          class="flex items-center justify-between group"
        >
          <div class="relative">
            <span class="text-x font-medium text-gray-800 w-20 cursor-help">{{ skill.name }}</span>
            <!-- 懸停提示框 -->
            <div class="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl z-50">
              <div class="font-semibold mb-1">{{ skill.name }}</div>
              <div class="text-gray-200">{{ skill.description }}</div>
              <!-- 小三角形箭頭 -->
              <div class="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
          
          <div class="flex gap-0.5">
            <button
              v-for="n in 5"
              :key="n - 1"
              @click="setSkillValue(skill.key, n - 1)"
              :class="[
                'w-6 h-6 rounded-full border-2 transition-all',
                (n - 1) <= characterStore.skills[skill.key as keyof typeof characterStore.skills]
                  ? 'bg-red-900 border-red-900'
                  : 'bg-white border-gray-400 hover:border-red-700'
              ]"
            >
            </button>
          </div>
        </div>
      </div>

      <!-- 技能說明 -->
      <div class="mt-4 pt-3 border-t border-gray-300 text-xs text-gray-600 space-y-1">
        <p><strong>3 級:</strong> 從檢定骰池選擇一顆重骰</p>
        <p><strong>4 級:</strong> 用結果組成 15 並獲得 2 勢頭</p>
        <p><strong>5 級:</strong> 結果 10 視為爆炸骰 (額外擲一顆骰子)</p>
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

