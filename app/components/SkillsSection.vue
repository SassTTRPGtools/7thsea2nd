<template>
  <div class="bg-stone-50 border-4 border-red-900 rounded-sm shadow-lg">
    <!-- 標題欄 -->
    <div class="bg-red-900 text-white text-center py-2 px-4">
      <h2 class="text-lg font-bold uppercase tracking-wider">Skills</h2>
    </div>
    
    <!-- 內容區 -->
    <div class="p-4">
      <!-- 左右兩欄 -->
      <div class="grid grid-cols-2 gap-x-4 gap-y-2">
        <div 
          v-for="(skill, index) in skills" 
          :key="skill.key"
          class="flex items-center justify-between"
        >
          <span class="text-xs font-medium text-gray-800 w-20">{{ skill.name }}</span>
          
          <div class="flex gap-0.5">
            <button
              v-for="n in 6"
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
        <p><strong>Rank 3:</strong> Re-Roll a single die</p>
        <p><strong>Rank 4:</strong> Sets of 15 = 2 Raises</p>
        <p><strong>Rank 5:</strong> 10s explode (+1 die)</p>
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

