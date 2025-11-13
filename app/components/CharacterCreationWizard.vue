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
          <p class="text-gray-700 mb-4">
            為你的英雄選擇<span class="font-bold text-red-700">兩個背景</span>，並獲得這些背景列出的所有優勢與技能（等級 1）。
          </p>

          <!-- 隨機選擇按鈕 -->
          <div class="mb-4">
            <button
              @click="randomBackgrounds"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-md flex items-center gap-2"
            >
              🎲 隨機選擇背景
            </button>
          </div>

          <!-- 已選背景 - 完整卡片顯示 -->
          <div v-if="getSelectedBackgrounds.length > 0" class="mb-6">
            <h3 class="font-bold text-lg mb-4 text-red-900 flex items-center gap-2">
              ✓ 已選擇的背景 ({{ getSelectedBackgrounds.length }}/2)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                v-for="(bg, index) in getSelectedBackgrounds"
                :key="bg.key"
                class="p-4 border-4 border-red-700 bg-red-50 rounded-lg shadow-lg relative"
              >
                <!-- 刪除按鈕 -->
                <button
                  @click="characterStore.removeBackground(index)"
                  class="absolute top-2 right-2 w-8 h-8 bg-red-700 text-white rounded-full hover:bg-red-800 font-bold text-lg flex items-center justify-center shadow-md transition-all"
                  title="移除此背景"
                >
                  ✕
                </button>

                <!-- 標題和類別 -->
                <div class="flex justify-between items-start mb-3 pr-8">
                  <h4 class="font-bold text-xl text-red-900">{{ bg.name }}</h4>
                  <span class="text-xs bg-red-200 text-red-900 px-3 py-1 rounded font-semibold">
                    {{ getCategoryLabel(bg.category) }}
                  </span>
                </div>
                
                <!-- 描述 -->
                <p class="text-sm text-gray-700 mb-4 leading-relaxed">{{ bg.description }}</p>
                
                <!-- 癖性 -->
                <div class="mb-4 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                  <p class="text-sm font-bold text-yellow-900 mb-2 flex items-center gap-2">
                    🎭 癖性
                  </p>
                  <p class="text-sm text-yellow-800 leading-relaxed">{{ bg.quirk }}</p>
                </div>
                
                <!-- 優勢 -->
                <div class="mb-4">
                  <p class="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                    ✨ 優勢
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="advKey in bg.advantages"
                      :key="advKey"
                      class="relative group"
                    >
                      <span
                        class="text-sm bg-green-200 text-green-900 px-3 py-1 rounded-lg cursor-help inline-block font-semibold border-2 border-green-300"
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
                  <p class="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
                    🎯 技能
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skillKey in bg.skills"
                      :key="skillKey"
                      class="text-sm bg-blue-200 text-blue-900 px-3 py-1 rounded-lg font-semibold border-2 border-blue-300"
                    >
                      {{ getSkillName(skillKey) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 可選背景列表標題 -->
          <div v-if="getSelectedBackgrounds.length < 2" class="mb-4">
            <h3 class="font-bold text-lg text-gray-700">
              {{ getSelectedBackgrounds.length === 0 ? '選擇背景' : '選擇第二個背景' }}
            </h3>
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

        <!-- 步驟 4: 技能分配 -->
        <div v-else-if="currentStep === 4">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 4: 技能分配</h2>
          <p class="text-gray-700 mb-4">
            你有 <span class="font-bold text-red-700">10 點</span>技能點數可用來提升背景技能，並加入非背景技能。
            創角時，任何技能都不能高於等級 3。
          </p>

          <!-- 背景技能說明 -->
          <div v-if="creation.backgroundSkills.value.length > 0" class="mb-6 p-4 bg-blue-50 border-2 border-blue-400 rounded-lg">
            <h3 class="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <span class="text-xl">📚</span> 
              背景技能（已自動設定等級）
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(level, skillKey) in creation.backgroundSkillsWithLevels.value"
                :key="skillKey"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-semibold flex items-center gap-1',
                  level > 1 
                    ? 'bg-yellow-500 text-white border-2 border-yellow-600' 
                    : 'bg-blue-600 text-white'
                ]"
              >
                {{ getSkillName(skillKey as string) }}
                <span class="text-xs">Lv.{{ level }}</span>
                <span v-if="level > 1" class="text-xs" title="重複的背景技能">⭐</span>
              </span>
            </div>
            <p class="text-xs text-blue-800 mt-2">
              💡 提示：背景技能的基礎等級是免費的。如果兩個背景都提供同一技能，等級會累計！
            </p>
            <p v-if="Object.values(creation.backgroundSkillsWithLevels.value).some((l: number) => l > 1)" class="text-xs text-yellow-800 mt-1 font-semibold">
              ⭐ 高亮標記的技能來自多個背景，已累計等級！
            </p>
          </div>

          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-600">
              剩餘點數: <span class="font-bold text-lg" :class="creation.availableSkillPoints.value === 0 ? 'text-green-700' : 'text-red-700'">
                {{ creation.availableSkillPoints.value }}
              </span> / 10
            </p>
            <button
              @click="resetSkillPoints"
              class="px-4 py-2 bg-stone-500 text-white rounded-lg font-semibold hover:bg-stone-600 transition-all shadow-md flex items-center gap-2"
              title="重置所有技能點數分配，但保留背景技能"
            >
              🔄 重新分配點數
            </button>
          </div>

          <!-- 技能列表 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <div 
              v-for="skill in allSkills" 
              :key="skill.key"
              :class="[
                'flex items-center justify-between group p-2 rounded-lg transition-all',
                getBackgroundSkillLevel(skill.key) > 1 
                  ? 'bg-yellow-50 border-2 border-yellow-400' 
                  : getBackgroundSkillLevel(skill.key) === 1
                  ? 'bg-blue-50'
                  : ''
              ]"
            >
              <!-- 技能名稱與說明 -->
              <div class="relative flex-shrink-0 w-32">
                <span 
                  class="text-sm font-medium cursor-help flex items-center gap-1"
                  :class="getBackgroundSkillLevel(skill.key) > 1 ? 'text-yellow-800 font-bold' : isBackgroundSkill(skill.key) ? 'text-blue-700' : 'text-gray-800'"
                >
                  {{ skill.name }}
                  <span v-if="getBackgroundSkillLevel(skill.key) > 1" class="text-yellow-600" title="重複的背景技能">⭐</span>
                  <span v-else-if="isBackgroundSkill(skill.key)" class="text-blue-600">★</span>
                </span>
                
                <!-- 技能說明 Tooltip -->
                <div class="absolute left-0 bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl z-50 pointer-events-none">
                  <div class="font-semibold mb-1">{{ skill.name }}</div>
                  <div class="text-gray-200 leading-relaxed">{{ skill.description }}</div>
                  <div v-if="getBackgroundSkillLevel(skill.key) > 0" class="text-yellow-300 mt-1 font-semibold">
                    背景提供: Lv.{{ getBackgroundSkillLevel(skill.key) }}
                  </div>
                  <div class="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <!-- 技能等級圓圈 -->
              <div class="flex gap-1">
                <button
                  v-for="n in 5"
                  :key="n"
                  @click="setSkillLevel(skill.key, n)"
                  :disabled="n > 3"
                  :class="[
                    'w-7 h-7 rounded-full border-2 transition-all relative',
                    n <= characterStore.skills[skill.key as keyof typeof characterStore.skills]
                      ? isBackgroundSkill(skill.key)
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-red-900 border-red-900'
                      : n > 3
                      ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-white border-gray-400 hover:border-red-700 cursor-pointer'
                  ]"
                  :title="n > 3 ? '創角時最高 3 級' : `設為 ${n} 級`"
                >
                  <!-- 顯示等級數字 -->
                  <span 
                    v-if="n <= characterStore.skills[skill.key as keyof typeof characterStore.skills]"
                    class="absolute inset-0 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {{ n }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- 技能等級效果說明 -->
          <div class="mt-6 p-4 bg-stone-100 rounded-lg border-2 border-stone-300">
            <h4 class="font-bold text-sm text-red-900 mb-2">技能等級效果</h4>
            <div class="text-xs text-gray-700 space-y-1">
              <p><strong>1-2 級:</strong> 基礎熟練度</p>
              <p><strong>3 級:</strong> 從檢定骰池選擇一顆重骰</p>
              <p><strong>4 級:</strong> 用結果組成 15 並獲得 2 勢頭</p>
              <p><strong>5 級:</strong> 結果 10 視為爆炸骰（額外擲一顆骰子）</p>
              <p class="text-red-600 font-semibold mt-2">⚠️ 創角時，任何技能最高只能達到 3 級</p>
            </div>
          </div>
        </div>

        <!-- 步驟 5: 購買優勢 -->
        <div v-else-if="currentStep === 5">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 5: 購買優勢</h2>
          <p class="text-gray-700 mb-4">
            你有 <span class="font-bold text-red-700">5 點</span>可購買新的優勢。你只能購買你符合資格的優勢。
          </p>

          <!-- 背景優勢 - 完整卡片顯示 -->
          <div v-if="backgroundAdvantagesDetails.length > 0" class="mb-6">
            <h3 class="font-bold text-lg mb-4 text-green-900 flex items-center gap-2">
              🎁 背景優勢（免費獲得，共 {{ backgroundAdvantagesDetails.length }} 個）
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div
                v-for="advantage in backgroundAdvantagesDetails"
                :key="advantage.key"
                class="p-4 border-4 border-green-600 bg-green-50 rounded-lg shadow-lg"
              >
                <!-- 優勢標題 -->
                <div class="flex justify-between items-start mb-3">
                  <div class="flex-1">
                    <h4 class="font-bold text-xl text-green-900 flex items-center gap-2">
                      {{ advantage.name }}
                      <span v-if="advantage.isHeroPoint" class="text-yellow-600 text-lg" title="需要消耗英雄點啟用">★</span>
                      <span v-if="advantage.isPersonal" class="text-blue-600 text-lg" title="個人特質">👤</span>
                    </h4>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <span class="px-3 py-1 bg-green-700 text-white rounded-lg font-bold text-sm">
                      免費
                    </span>
                    <span class="text-xs text-green-700 font-semibold">
                      原價 {{ advantage.cost }} 點
                    </span>
                  </div>
                </div>

                <!-- 優勢說明 -->
                <p class="text-sm text-gray-700 leading-relaxed">{{ advantage.description }}</p>
              </div>
            </div>
            <div class="p-3 bg-green-100 border-2 border-green-400 rounded-lg">
              <p class="text-sm text-green-900 font-semibold">
                💡 提示：背景優勢是免費的，不會消耗你的 5 點購買額度。
              </p>
            </div>
          </div>

          <!-- 已購買優勢 - 完整卡片顯示 -->
          <div v-if="purchasedAdvantagesDetails.length > 0" class="mb-6">
            <h3 class="font-bold text-lg mb-4 text-red-900 flex items-center gap-2">
              ✓ 已購買的優勢（共 {{ purchasedAdvantagesDetails.length }} 個）
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="advantage in purchasedAdvantagesDetails"
                :key="advantage.key"
                class="p-4 border-4 border-red-700 bg-red-50 rounded-lg shadow-lg relative"
              >
                <!-- 刪除按鈕 -->
                <button
                  @click="removeAdvantage(advantage.key)"
                  class="absolute top-2 right-2 w-8 h-8 bg-red-700 text-white rounded-full hover:bg-red-800 font-bold text-lg flex items-center justify-center shadow-md transition-all"
                  title="退還此優勢"
                >
                  ✕
                </button>

                <!-- 優勢標題 -->
                <div class="flex justify-between items-start mb-3 pr-8">
                  <div class="flex-1">
                    <h4 class="font-bold text-xl text-red-900 flex items-center gap-2">
                      {{ advantage.name }}
                      <span v-if="advantage.isHeroPoint" class="text-yellow-600 text-lg" title="需要消耗英雄點啟用">★</span>
                      <span v-if="advantage.isPersonal" class="text-blue-600 text-lg" title="個人特質">👤</span>
                    </h4>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <span class="px-3 py-1 bg-red-700 text-white rounded-lg font-bold text-sm">
                      {{ getAdvantageActualCost(advantage.key) }} 點
                    </span>
                    <span v-if="getAdvantageActualCost(advantage.key) < advantage.cost" class="text-xs text-green-700 font-semibold">
                      原價 {{ advantage.cost }} 點
                    </span>
                  </div>
                </div>

                <!-- 優勢說明 -->
                <p class="text-sm text-gray-700 leading-relaxed">{{ advantage.description }}</p>

                <!-- 折扣說明 -->
                <div v-if="advantage.conditionalCost && hasDiscount(advantage)" class="mt-3 text-xs font-semibold text-green-700 bg-green-100 px-3 py-2 rounded-lg border border-green-300">
                  💰 {{ getDiscountReason(advantage) }}
                </div>
              </div>
            </div>
          </div>

          <!-- 點數顯示 -->
          <div class="mb-6 p-4 bg-stone-100 border-2 border-stone-300 rounded-lg">
            <p class="text-base text-gray-700">
              剩餘點數: <span class="font-bold text-2xl ml-2" :class="creation.availableAdvantagePoints.value === 0 ? 'text-green-700' : 'text-red-700'">
                {{ creation.availableAdvantagePoints.value }}
              </span> / 5
            </p>
          </div>

          <!-- 可選優勢列表標題 -->
          <div class="mb-4">
            <h3 class="font-bold text-lg text-gray-700">
              可購買的優勢
            </h3>
          </div>

          <!-- 成本篩選器 -->
          <div class="mb-6 flex items-center gap-3">
            <span class="font-semibold text-gray-700">篩選成本:</span>
            <div class="flex gap-2">
              <button
                v-for="cost in [1, 2, 3, 4, 5]"
                :key="cost"
                @click="selectedCostFilter = selectedCostFilter === cost ? null : cost"
                :class="[
                  'px-4 py-2 rounded-lg font-semibold transition-all',
                  selectedCostFilter === cost
                    ? 'bg-red-700 text-white'
                    : 'bg-stone-200 text-gray-700 hover:bg-stone-300'
                ]"
              >
                {{ cost }} 點
              </button>
              <button
                v-if="selectedCostFilter !== null"
                @click="selectedCostFilter = null"
                class="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500"
              >
                顯示全部
              </button>
            </div>
          </div>

          <!-- 優勢列表 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            <div
              v-for="advantage in filteredAdvantages"
              :key="advantage.key"
              :class="[
                'p-4 border-2 rounded-lg transition-all',
                isBackgroundAdvantage(advantage.key)
                  ? 'border-gray-300 bg-gray-100 opacity-60'
                  : canPurchaseAdvantage(advantage.key)
                  ? 'border-stone-300 hover:border-red-500 cursor-pointer hover:shadow-md'
                  : 'border-stone-200 bg-stone-50 opacity-40 cursor-not-allowed'
              ]"
              @click="!isBackgroundAdvantage(advantage.key) && canPurchaseAdvantage(advantage.key) && purchaseAdvantage(advantage.key)"
            >
              <!-- 優勢標題 -->
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                  <h3 class="font-bold text-lg flex items-center gap-2">
                    {{ advantage.name }}
                    <span v-if="advantage.isHeroPoint" class="text-yellow-600 text-sm" title="需要消耗英雄點啟用">★</span>
                    <span v-if="advantage.isPersonal" class="text-blue-600 text-sm" title="個人特質">👤</span>
                  </h3>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="px-3 py-1 bg-red-700 text-white rounded-lg font-bold text-sm">
                    {{ getAdvantageActualCost(advantage.key) }} 點
                  </span>
                  <span v-if="getAdvantageActualCost(advantage.key) < advantage.cost" class="text-xs text-green-700 font-semibold">
                    原價 {{ advantage.cost }} 點
                  </span>
                </div>
              </div>

              <!-- 優勢說明 -->
              <p class="text-sm text-gray-700 mb-2 leading-relaxed">{{ advantage.description }}</p>

              <!-- 背景優勢標記 -->
              <div v-if="isBackgroundAdvantage(advantage.key)" class="mt-2 text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded">
                ✓ 已從背景獲得
              </div>

              <!-- 折扣說明 -->
              <div v-else-if="advantage.conditionalCost && hasDiscount(advantage)" class="mt-2 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                💰 {{ getDiscountReason(advantage) }}
              </div>

              <!-- 點數不足提示 -->
              <div v-else-if="!canPurchaseAdvantage(advantage.key) && !characterStore.advantages.find(a => a.key === advantage.key)" class="mt-2 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                ⚠️ 點數不足
              </div>
            </div>
          </div>

          <!-- 優勢說明 -->
          <div class="mt-6 p-4 bg-stone-100 rounded-lg border-2 border-stone-300">
            <h4 class="font-bold text-sm text-red-900 mb-2">優勢圖示說明</h4>
            <div class="text-xs text-gray-700 space-y-1">
              <p><strong>★</strong> 需要消耗英雄點才能啟用此優勢的效果</p>
              <p><strong>👤</strong> 個人特質優勢（通常影響角色的基本屬性或外觀）</p>
              <p><strong>💰 折扣</strong> 某些優勢對特定國家出身的角色有成本減免</p>
            </div>
          </div>
        </div>

        <!-- 步驟 6: 選擇阿爾克那 -->
        <div v-else-if="currentStep === 6">
          <h2 class="text-xl font-bold mb-4 text-red-900">步驟 6: 選擇阿爾克那</h2>
          <p class="text-gray-700 mb-4">
            每位英雄都有其命運。選擇一個<span class="font-bold text-red-700">美德</span>與一個<span class="font-bold text-red-700">傲性</span>：你的正位牌與交叉牌。
          </p>

          <!-- 隨機選擇按鈕 -->
          <div class="mb-6 flex gap-3">
            <button
              @click="randomVirtue"
              class="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md flex items-center gap-2"
            >
              🎲 隨機美德
            </button>
            <button
              @click="randomHubris"
              class="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-md flex items-center gap-2"
            >
              🎲 隨機傲性
            </button>
            <button
              v-if="characterStore.virtue || characterStore.hubris"
              @click="clearArcanas"
              class="px-6 py-3 bg-stone-400 text-white rounded-lg font-semibold hover:bg-stone-500 transition-all shadow-md"
            >
              清除選擇
            </button>
          </div>

          <!-- 已選擇顯示 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <!-- 已選美德 -->
            <div v-if="characterStore.virtue" class="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
              <h3 class="font-bold text-green-900 mb-2 flex items-center gap-2">
                <span class="text-xl">✨</span> 
                已選美德
              </h3>
              <div class="bg-white p-3 rounded">
                <p class="font-bold text-lg text-green-800 mb-1">{{ selectedVirtueDetails?.name }}</p>
                <p class="text-sm text-gray-700">{{ selectedVirtueDetails?.description }}</p>
                <p class="text-xs text-gray-500 mt-2">來自: {{ getArcanaName(characterStore.virtue?.arcanaKey || '') }}</p>
              </div>
            </div>

            <!-- 已選傲性 -->
            <div v-if="characterStore.hubris" class="p-4 bg-purple-50 border-2 border-purple-500 rounded-lg">
              <h3 class="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span class="text-xl">⚠️</span> 
                已選傲性
              </h3>
              <div class="bg-white p-3 rounded">
                <p class="font-bold text-lg text-purple-800 mb-1">{{ selectedHubrisDetails?.name }}</p>
                <p class="text-sm text-gray-700">{{ selectedHubrisDetails?.description }}</p>
                <p class="text-xs text-gray-500 mt-2">來自: {{ getArcanaName(characterStore.hubris?.arcanaKey || '') }}</p>
              </div>
            </div>
          </div>

          <!-- 阿爾克那列表 -->
          <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <div
              v-for="arcana in allArcanas"
              :key="arcana.key"
              class="p-4 border-2 rounded-lg transition-all hover:shadow-md"
              :class="[
                isArcanaSelected(arcana.key) 
                  ? 'border-red-700 bg-red-50' 
                  : 'border-stone-300 hover:border-red-500'
              ]"
            >
              <!-- 阿爾克那標題 -->
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-bold text-xl">{{ arcana.name }}</h3>
                <span class="text-sm text-gray-500">{{ arcana.nameEn }}</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- 美德 -->
                <div 
                  @click="selectVirtue(arcana.key)"
                  :class="[
                    'p-3 rounded-lg cursor-pointer transition-all',
                    characterStore.virtue?.arcanaKey === arcana.key
                      ? 'bg-green-600 text-white ring-2 ring-green-400'
                      : 'bg-green-50 hover:bg-green-100 border-2 border-green-300'
                  ]"
                >
                  <div class="flex items-start gap-2 mb-2">
                    <span class="text-lg">✨</span>
                    <div class="flex-1">
                      <p 
                        :class="[
                          'font-bold mb-1',
                          characterStore.virtue?.arcanaKey === arcana.key ? 'text-white' : 'text-green-800'
                        ]"
                      >
                        美德: {{ arcana.virtue.name }}
                      </p>
                      <p 
                        :class="[
                          'text-sm leading-relaxed',
                          characterStore.virtue?.arcanaKey === arcana.key ? 'text-green-50' : 'text-gray-700'
                        ]"
                      >
                        {{ arcana.virtue.description }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- 傲性 -->
                <div 
                  @click="selectHubris(arcana.key)"
                  :class="[
                    'p-3 rounded-lg cursor-pointer transition-all',
                    characterStore.hubris?.arcanaKey === arcana.key
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                      : 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-300'
                  ]"
                >
                  <div class="flex items-start gap-2 mb-2">
                    <span class="text-lg">⚠️</span>
                    <div class="flex-1">
                      <p 
                        :class="[
                          'font-bold mb-1',
                          characterStore.hubris?.arcanaKey === arcana.key ? 'text-white' : 'text-purple-800'
                        ]"
                      >
                        傲性: {{ arcana.hubris.name }}
                      </p>
                      <p 
                        :class="[
                          'text-sm leading-relaxed',
                          characterStore.hubris?.arcanaKey === arcana.key ? 'text-purple-50' : 'text-gray-700'
                        ]"
                      >
                        {{ arcana.hubris.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import { skills, getSkills } from '~/data/skills';
import { advantages, getAdvantages, getAdvantageActualCost as getActualCost, type Advantage } from '~/data/advantages';
import { getArcanas, type Arcana } from '~/data/arcanas';
import { getAssetUrl } from '~/composables/useAssetUrl';

// 定義 emit 事件
const emit = defineEmits<{
  complete: []
}>();

const characterStore = useCharacterStore();
const creation = useCharacterCreation();

const currentStep = ref(1);
const stepTitles = ['國家', '屬性', '背景', '技能', '優勢', '阿爾克那'];

const nations = getNations();
const allBackgrounds = getBackgrounds();
const allSkills = getSkills();
const allAdvantages = getAdvantages();
const allArcanas = getArcanas();

// 步驟 5: 優勢購買
const selectedCostFilter = ref<number | null>(null);

// 步驟 6: 阿爾克那
const selectedVirtueDetails = computed(() => {
  if (!characterStore.virtue) return null;
  return characterStore.virtue;
});

const selectedHubrisDetails = computed(() => {
  if (!characterStore.hubris) return null;
  return characterStore.hubris;
});

// 已購買的優勢（排除背景優勢）
const purchasedAdvantages = computed(() => {
  return characterStore.advantages.filter(adv => 
    !creation.backgroundAdvantages.value.includes(adv.key)
  );
});

// 獲取背景優勢的完整資訊
const backgroundAdvantagesDetails = computed(() => {
  return creation.backgroundAdvantages.value
    .map(key => allAdvantages.find(adv => adv.key === key))
    .filter(adv => adv !== undefined) as Advantage[];
});

// 獲取已購買優勢的完整資訊
const purchasedAdvantagesDetails = computed(() => {
  return purchasedAdvantages.value
    .map(adv => allAdvantages.find(a => a.key === adv.key))
    .filter(adv => adv !== undefined) as Advantage[];
});

// 根據成本篩選優勢
const filteredAdvantages = computed(() => {
  if (selectedCostFilter.value === null) {
    return allAdvantages;
  }
  return allAdvantages.filter(adv => {
    const actualCost = getActualCost(adv.key, characterStore.nation);
    return actualCost === selectedCostFilter.value;
  });
});

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
  
  // 清除所有非背景優勢（重新進入創角流程時）
  // 保留背景優勢，移除所有購買的優勢
  const backgroundAdvKeys = creation.backgroundAdvantages.value;
  characterStore.advantages = characterStore.advantages.filter(adv => 
    backgroundAdvKeys.includes(adv.key)
  );
});

const selectedNation = computed(() => {
  if (!characterStore.nation) return null;
  return nations.find(n => n.key === characterStore.nation);
});

// 獲取國家圖片路徑
const getNationImage = (nationKey: string): string => {
  const imageMap: Record<string, string> = {
    avalon: getAssetUrl('/nations/Avalon.webp'),
    inismore: getAssetUrl('/nations/Inismore.webp'),
    highlandMarches: getAssetUrl('/nations/The Highland Marches.webp'),
    castille: getAssetUrl('/nations/Castille.webp'),
    eisen: getAssetUrl('/nations/Eisen.webp'),
    montaigne: getAssetUrl('/nations/Montaigne.webp'),
    sarmatianCommonwealth: getAssetUrl('/nations/The Sarmatian.webp'),
    ussura: getAssetUrl('/nations/Ussura.webp'),
    vestenmennavenjar: getAssetUrl('/nations/Vestenmennavenjar.webp'),
    vodacce: getAssetUrl('/nations/Vodacce.webp')
  };
  return imageMap[nationKey] || getAssetUrl('/logo.png');
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

const getAdvantageActualCost = (advantageKey: string): number => {
  return getActualCost(advantageKey, characterStore.nation);
};

const isBackgroundAdvantage = (advantageKey: string): boolean => {
  return creation.backgroundAdvantages.value.includes(advantageKey);
};

const canPurchaseAdvantage = (advantageKey: string): boolean => {
  // 如果是背景優勢，不能購買
  if (isBackgroundAdvantage(advantageKey)) {
    return false;
  }
  
  // 如果已經擁有，不能再購買
  if (characterStore.advantages.find(a => a.key === advantageKey)) {
    return false;
  }
  
  // 檢查點數是否足夠
  const cost = getAdvantageActualCost(advantageKey);
  return cost <= creation.availableAdvantagePoints.value;
};

const purchaseAdvantage = (advantageKey: string) => {
  if (!canPurchaseAdvantage(advantageKey)) return;
  
  const advantage = advantages[advantageKey];
  if (advantage) {
    characterStore.addAdvantage(advantageKey, advantage.name);
  }
};

const removeAdvantage = (advantageKey: string) => {
  const index = characterStore.advantages.findIndex(a => a.key === advantageKey);
  if (index !== -1 && !isBackgroundAdvantage(advantageKey)) {
    characterStore.removeAdvantage(index);
  }
};

const hasDiscount = (advantage: Advantage): boolean => {
  if (!advantage.conditionalCost || !characterStore.nation) return false;
  return advantage.conditionalCost.some(cond => cond.nation === characterStore.nation);
};

const getDiscountReason = (advantage: Advantage): string => {
  if (!advantage.conditionalCost || !characterStore.nation) return '';
  const discount = advantage.conditionalCost.find(cond => cond.nation === characterStore.nation);
  return discount?.condition || '';
};

const getArcanaName = (arcanaKey: string): string => {
  const arcana = allArcanas.find(a => a.key === arcanaKey);
  return arcana?.name || arcanaKey;
};

const isArcanaSelected = (arcanaKey: string): boolean => {
  return characterStore.virtue?.arcanaKey === arcanaKey || 
         characterStore.hubris?.arcanaKey === arcanaKey;
};

const selectVirtue = (arcanaKey: string) => {
  const arcana = allArcanas.find(a => a.key === arcanaKey);
  if (arcana) {
    characterStore.setVirtue(arcanaKey, arcana.virtue.name, arcana.virtue.description);
  }
};

const selectHubris = (arcanaKey: string) => {
  const arcana = allArcanas.find(a => a.key === arcanaKey);
  if (arcana) {
    characterStore.setHubris(arcanaKey, arcana.hubris.name, arcana.hubris.description);
  }
};

const randomVirtue = () => {
  if (allArcanas.length === 0) return;
  const randomIndex = Math.floor(Math.random() * allArcanas.length);
  const randomArcana = allArcanas[randomIndex];
  if (randomArcana) {
    selectVirtue(randomArcana.key);
  }
};

const randomHubris = () => {
  if (allArcanas.length === 0) return;
  const randomIndex = Math.floor(Math.random() * allArcanas.length);
  const randomArcana = allArcanas[randomIndex];
  if (randomArcana) {
    selectHubris(randomArcana.key);
  }
};

const clearArcanas = () => {
  characterStore.setVirtue('', '', '');
  characterStore.setHubris('', '', '');
};

const isBackgroundSkill = (skillKey: string): boolean => {
  return creation.backgroundSkills.value.includes(skillKey);
};

const getBackgroundSkillLevel = (skillKey: string): number => {
  return creation.backgroundSkillsWithLevels.value[skillKey] || 0;
};

const resetSkillPoints = () => {
  // 重置所有技能到背景提供的等級
  Object.keys(characterStore.skills).forEach(skillKey => {
    const bgLevel = getBackgroundSkillLevel(skillKey);
    characterStore.setSkill(skillKey as any, bgLevel);
  });
};

const setSkillLevel = (skillKey: string, level: number) => {
  const currentLevel = characterStore.skills[skillKey as keyof typeof characterStore.skills];
  
  // 如果點擊同一等級，則降為 0（關閉）
  if (currentLevel === level) {
    characterStore.setSkill(skillKey as any, 0);
  } else {
    // 否則設為該等級
    characterStore.setSkill(skillKey as any, level);
  }
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

const randomBackgrounds = () => {
  // 清除現有背景
  while (characterStore.backgrounds.length > 0) {
    characterStore.removeBackground(0);
  }
  
  // 從可用背景中隨機選擇 2 個
  const availableBackgrounds = [...backgrounds.value];
  const selected: Background[] = [];
  
  while (selected.length < 2 && availableBackgrounds.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableBackgrounds.length);
    const randomBg = availableBackgrounds[randomIndex];
    if (randomBg) {
      selected.push(randomBg);
    }
    availableBackgrounds.splice(randomIndex, 1);
  }
  
  // 添加選中的背景
  selected.forEach(bg => {
    characterStore.addBackground(bg.key, bg.name);
  });
  
  // 應用背景技能和優勢
  creation.applyBackgroundSkills();
  creation.applyBackgroundAdvantages();
};

const getSelectedBackgrounds = computed(() => {
  return characterStore.backgrounds
    .map(bg => allBackgrounds.find(b => b.key === bg.key))
    .filter(bg => bg !== undefined) as Background[];
});

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
      // 完成創建，保存到 localStorage 並觸發完成事件
      characterStore.saveToLocalStorage();
      emit('complete');
    }
  }
};
</script>
