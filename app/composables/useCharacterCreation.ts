/**
 * 角色創建流程的輔助功能
 */

import { computed } from 'vue';
import { useCharacterStore } from '~/stores/characterStore';
import { getBackgroundByKey } from '~/data/backgrounds';
import { getAdvantageByKey } from '~/data/advantages';

export const useCharacterCreation = () => {
  const characterStore = useCharacterStore();

  /**
   * 步驟 1: 國家選擇
   * 選擇國家後獲得屬性加值選項
   */
  const isStep1Complete = computed(() => {
    return !!characterStore.nation;
  });

  /**
   * 步驟 2: 屬性分配
   * 所有屬性起始為 2，有 2 點可分配
   */
  const isStep2Complete = computed(() => {
    return characterStore.remainingTraitPoints === 0;
  });

  /**
   * 步驟 3: 背景選擇
   * 選擇兩個背景，自動獲得優勢與技能（等級 1）
   */
  const isStep3Complete = computed(() => {
    return characterStore.backgrounds.length === 2;
  });

  // 從背景獲得的技能列表
  const backgroundSkills = computed<string[]>(() => {
    const skills: string[] = [];
    characterStore.backgrounds.forEach(bg => {
      const background = getBackgroundByKey(bg.key);
      if (background && background.skills) {
        skills.push(...background.skills);
      }
    });
    return skills;
  });

  // 從背景獲得的優勢列表
  const backgroundAdvantages = computed<string[]>(() => {
    const advantages: string[] = [];
    characterStore.backgrounds.forEach(bg => {
      const background = getBackgroundByKey(bg.key);
      if (background && background.advantages) {
        advantages.push(...background.advantages);
      }
    });
    return advantages;
  });

  /**
   * 步驟 4: 技能分配
   * 有 10 點技能點數，創角時任何技能不能高於 3 級
   * 背景技能已自動設為 1 級
   */
  const availableSkillPoints = computed(() => {
    // 計算非背景技能的點數花費
    let spent = 0;
    const bgSkills = backgroundSkills.value;
    
    Object.entries(characterStore.skills).forEach(([skill, level]) => {
      if (level > 0) {
        // 如果是背景技能，第一級不計入花費
        if (bgSkills.includes(skill)) {
          spent += Math.max(0, level - 1);
        } else {
          spent += level;
        }
      }
    });
    
    return 10 - spent;
  });

  const isStep4Complete = computed(() => {
    // 所有技能不超過 3 級，且點數用完
    const allSkillsValid = Object.values(characterStore.skills).every(level => level <= 3);
    return allSkillsValid && availableSkillPoints.value === 0;
  });

  /**
   * 步驟 5: 優勢購買
   * 有 5 點可購買優勢，只能購買符合資格的優勢
   */
  const spentAdvantagePoints = computed(() => {
    let total = 0;
    characterStore.advantages.forEach(adv => {
      const advantage = getAdvantageByKey(adv.key);
      if (advantage) {
        // 檢查是否有條件性折扣
        let cost = advantage.cost;
        if (advantage.conditionalCost && characterStore.nation) {
          const discount = advantage.conditionalCost.find(
            cond => cond.nation === characterStore.nation
          );
          if (discount) {
            cost = discount.reducedCost;
          }
        }
        total += cost;
      }
    });
    return total;
  });

  const availableAdvantagePoints = computed(() => {
    return 5 - spentAdvantagePoints.value;
  });

  const isStep5Complete = computed(() => {
    return availableAdvantagePoints.value === 0;
  });

  /**
   * 步驟 6: 阿爾克那選擇
   * 選擇一個美德與一個傲性
   */
  const isStep6Complete = computed(() => {
    return !!(characterStore.virtue && characterStore.hubris);
  });

  /**
   * 整體完成度檢查
   */
  const isCharacterCreationComplete = computed(() => {
    return (
      isStep1Complete.value &&
      isStep2Complete.value &&
      isStep3Complete.value &&
      isStep4Complete.value &&
      isStep5Complete.value &&
      isStep6Complete.value
    );
  });

  /**
   * 應用背景獲得的技能
   */
  const applyBackgroundSkills = () => {
    backgroundSkills.value.forEach(skill => {
      if (characterStore.skills[skill as keyof typeof characterStore.skills] === 0) {
        characterStore.setSkill(skill as keyof typeof characterStore.skills, 1);
      }
    });
  };

  /**
   * 應用背景獲得的優勢
   */
  const applyBackgroundAdvantages = () => {
    backgroundAdvantages.value.forEach(advantageKey => {
      const advantage = getAdvantageByKey(advantageKey);
      if (advantage && !characterStore.advantages.find(a => a.key === advantageKey)) {
        characterStore.addAdvantage(advantageKey, advantage.name);
      }
    });
  };

  /**
   * 檢查技能是否為背景技能
   */
  const isBackgroundSkill = (skillKey: string): boolean => {
    return backgroundSkills.value.includes(skillKey);
  };

  /**
   * 檢查優勢是否為背景優勢
   */
  const isBackgroundAdvantage = (advantageKey: string): boolean => {
    return backgroundAdvantages.value.includes(advantageKey);
  };

  /**
   * 檢查是否符合優勢購買資格
   */
  const canPurchaseAdvantage = (advantageKey: string): boolean => {
    const advantage = getAdvantageByKey(advantageKey);
    if (!advantage) return false;

    // 檢查是否已擁有
    if (characterStore.advantages.find(a => a.key === advantageKey)) {
      return false;
    }

    // 檢查成本
    let cost = advantage.cost;
    if (advantage.conditionalCost && characterStore.nation) {
      const discount = advantage.conditionalCost.find(
        cond => cond.nation === characterStore.nation
      );
      if (discount) {
        cost = discount.reducedCost;
      }
    }

    if (cost > availableAdvantagePoints.value) {
      return false;
    }

    return true;
  };

  return {
    // 步驟完成狀態
    isStep1Complete,
    isStep2Complete,
    isStep3Complete,
    isStep4Complete,
    isStep5Complete,
    isStep6Complete,
    isCharacterCreationComplete,

    // 點數計算
    availableSkillPoints,
    spentAdvantagePoints,
    availableAdvantagePoints,

    // 背景相關
    backgroundSkills,
    backgroundAdvantages,
    isBackgroundSkill,
    isBackgroundAdvantage,
    applyBackgroundSkills,
    applyBackgroundAdvantages,

    // 優勢相關
    canPurchaseAdvantage
  };
};
