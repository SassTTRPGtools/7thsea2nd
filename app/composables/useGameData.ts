/**
 * 7th Sea 2nd Edition - Composable for game data
 * 提供便捷的遊戲資料存取方法
 */

import { 
  traits, 
  skills, 
  nations,
  type Trait, 
  type Skill,
  type Nation 
} from '~/data';

export const useGameData = () => {
  /**
   * 取得所有屬性
   */
  const getAllTraits = (): Trait[] => {
    return Object.values(traits);
  };

  /**
   * 取得所有技能
   */
  const getAllSkills = (): Skill[] => {
    return Object.values(skills);
  };

  /**
   * 取得所有國家
   */
  const getAllNations = (): Nation[] => {
    return Object.values(nations);
  };

  /**
   * 根據 key 取得屬性
   */
  const getTraitByKey = (key: string): Trait | undefined => {
    return traits[key];
  };

  /**
   * 根據 key 取得技能
   */
  const getSkillByKey = (key: string): Skill | undefined => {
    return skills[key];
  };

  /**
   * 根據 key 取得國家
   */
  const getNationByKey = (key: string): Nation | undefined => {
    return nations[key];
  };

  /**
   * 取得屬性中文名稱
   */
  const getTraitName = (key: string): string => {
    return traits[key]?.name || key;
  };

  /**
   * 取得技能中文名稱
   */
  const getSkillName = (key: string): string => {
    return skills[key]?.name || key;
  };

  /**
   * 取得國家中文名稱
   */
  const getNationName = (key: string): string => {
    return nations[key]?.name || key;
  };

  /**
   * 取得國家的屬性加值選項
   */
  const getNationTraitBonuses = (nationKey: string) => {
    return nations[nationKey]?.traitBonuses || [];
  };

  return {
    // 資料
    traits,
    skills,
    nations,
    
    // 方法
    getAllTraits,
    getAllSkills,
    getAllNations,
    getTraitByKey,
    getSkillByKey,
    getNationByKey,
    getTraitName,
    getSkillName,
    getNationName,
    getNationTraitBonuses
  };
};
