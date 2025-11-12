<!-- 7th Sea 2nd Edition - 資料使用範例組件 -->
<template>
  <div class="game-data-example p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">7th Sea 2nd Edition - 角色資料</h1>

    <!-- 屬性區塊 -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-red-800 border-b-2 border-red-800 pb-2">
        屬性 (Traits)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="trait in allTraits"
          :key="trait.key"
          class="bg-white border-2 border-red-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h3 class="text-xl font-bold text-red-900 mb-2">
            {{ trait.name }} <span class="text-sm text-gray-600">({{ trait.key }})</span>
          </h3>
          <p class="text-gray-700">{{ trait.description }}</p>
        </div>
      </div>
    </section>

    <!-- 技能區塊 -->
    <section>
      <h2 class="text-2xl font-semibold mb-4 text-red-800 border-b-2 border-red-800 pb-2">
        技能 (Skills)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="skill in allSkills"
          :key="skill.key"
          class="bg-white border-2 border-red-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h3 class="text-lg font-bold text-red-900 mb-2">
            {{ skill.name }} <span class="text-sm text-gray-600">({{ skill.key }})</span>
          </h3>
          <p class="text-gray-700 text-sm">{{ skill.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { getAllTraits, getAllSkills } = useGameData();

// 取得所有屬性和技能
const allTraits = getAllTraits();
const allSkills = getAllSkills();
</script>

<style scoped>
/* 可以根據需要添加額外的樣式 */
</style>
