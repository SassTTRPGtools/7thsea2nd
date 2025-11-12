/**
 * 7th Sea 2nd Edition - Composable for game data
 * 提供便捷的遊戲資料存取方法
 */

import { 
  traits, 
  skills, 
  nations,
  advantages,
  arcanas,
  type Trait, 
  type Skill,
  type Nation,
  type Advantage,
  type Arcana,
  type Virtue,
  type Hubris,
  getAdvantagesByCost,
  getAdvantageActualCost,
  getVirtues,
  getHubris
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

  /**
   * 取得所有優勢
   */
  const getAllAdvantages = (): Advantage[] => {
    return Object.values(advantages);
  };

  /**
   * 根據 key 取得優勢
   */
  const getAdvantageByKey = (key: string): Advantage | undefined => {
    return advantages[key];
  };

  /**
   * 根據成本取得優勢列表
   */
  const getAdvantagesByPointCost = (cost: number): Advantage[] => {
    return getAdvantagesByCost(cost);
  };

  /**
   * 取得優勢的實際成本（考慮國籍減免）
   */
  const getActualAdvantageCost = (advantageKey: string, nationKey?: string): number => {
    return getAdvantageActualCost(advantageKey, nationKey);
  };

  /**
   * 取得優勢中文名稱
   */
  const getAdvantageName = (key: string): string => {
    return advantages[key]?.name || key;
  };

  /**
   * 取得所有阿爾克那
   */
  const getAllArcanas = (): Arcana[] => {
    return Object.values(arcanas);
  };

  /**
   * 根據 key 取得阿爾克那
   */
  const getArcanaByKey = (key: string): Arcana | undefined => {
    return arcanas[key];
  };

  /**
   * 取得所有美德
   */
  const getAllVirtues = (): Virtue[] => {
    return getVirtues();
  };

  /**
   * 取得所有傲性
   */
  const getAllHubris = (): Hubris[] => {
    return getHubris();
  };

  /**
   * 取得阿爾克那中文名稱
   */
  const getArcanaName = (key: string): string => {
    return arcanas[key]?.name || key;
  };

  return {
    // 資料
    traits,
    skills,
    nations,
    advantages,
    arcanas,
    
    // 方法
    getAllTraits,
    getAllSkills,
    getAllNations,
    getAllAdvantages,
    getAllArcanas,
    getAllVirtues,
    getAllHubris,
    getTraitByKey,
    getSkillByKey,
    getNationByKey,
    getAdvantageByKey,
    getArcanaByKey,
    getTraitName,
    getSkillName,
    getNationName,
    getAdvantageName,
    getArcanaName,
    getNationTraitBonuses,
    getAdvantagesByPointCost,
    getActualAdvantageCost
  };
};
