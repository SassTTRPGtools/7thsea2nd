/**
 * 7th Sea 2nd Edition - 角色屬性 (Traits)
 * 定義角色的五大基本屬性
 */

export interface Trait {
  key: string;
  name: string;
  description: string;
}

export const traits: Record<string, Trait> = {
  brawn: {
    key: 'brawn',
    name: '體魄',
    description: '代表力量與體能。'
  },
  finesse: {
    key: 'finesse',
    name: '靈巧',
    description: '代表協調與敏捷。'
  },
  resolve: {
    key: 'resolve',
    name: '堅毅',
    description: '代表意志力與耐力。'
  },
  wits: {
    key: 'wits',
    name: '機智',
    description: '衡量臨機應變的反應速度。'
  },
  panache: {
    key: 'panache',
    name: '風采',
    description: '代表魅力與個人吸引力。'
  }
};

/**
 * 取得所有屬性列表
 */
export const getTraits = (): Trait[] => {
  return Object.values(traits);
};

/**
 * 根據 key 取得特定屬性
 */
export const getTraitByKey = (key: string): Trait | undefined => {
  return traits[key];
};

/**
 * 屬性名稱對照表（英文 -> 中文）
 */
export const traitNames: Record<string, string> = {
  brawn: '體魄',
  finesse: '靈巧',
  resolve: '堅毅',
  wits: '機智',
  panache: '風采'
};
