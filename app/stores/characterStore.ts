import { defineStore } from 'pinia';

export interface CharacterData {
  // 基本資訊
  player: string;
  characterName: string;
  concept: string;
  nation: string;
  religion: string;
  reputations: string[];
  wealth: number;

  // 屬性 (Traits)
  traits: {
    brawn: number;
    finesse: number;
    resolve: number;
    wits: number;
    panache: number;
  };

  // 技能 (Skills)
  skills: {
    aim: number;
    athletics: number;
    brawl: number;
    convince: number;
    empathy: number;
    hide: number;
    intimidate: number;
    notice: number;
    perform: number;
    ride: number;
    sailing: number;
    scholarship: number;
    tempt: number;
    theft: number;
    warfare: number;
    weaponry: number;
  };

  // 阿爾克那
  virtue: {
    arcanaKey: string;
    name: string;
    description: string;
  } | null;
  
  hubris: {
    arcanaKey: string;
    name: string;
    description: string;
  } | null;

  // 背景故事
  backgrounds: Array<{
    key: string;
    name: string;
  }>;

  // 優勢
  advantages: Array<{
    key: string;
    name: string;
  }>;

  // 英雄故事
  stories: Array<{
    name: string;
    goal: string;
    reward: string;
    step1: string;
  }>;

  // 死亡螺旋 (Death Spiral)
  deathSpiral: {
    currentWounds: number; // 當前傷勢數量 (0-4)
    dramaticWounds: boolean[]; // 20 個戲劇傷勢圓圈狀態
  };
}

export const useCharacterStore = defineStore('character', {
  state: (): CharacterData => ({
    player: '',
    characterName: '',
    concept: '',
    nation: '',
    religion: '',
    reputations: [],
    wealth: 0,

    traits: {
      brawn: 2,
      finesse: 2,
      resolve: 2,
      wits: 2,
      panache: 2
    },

    skills: {
      aim: 0,
      athletics: 0,
      brawl: 0,
      convince: 0,
      empathy: 0,
      hide: 0,
      intimidate: 0,
      notice: 0,
      perform: 0,
      ride: 0,
      sailing: 0,
      scholarship: 0,
      tempt: 0,
      theft: 0,
      warfare: 0,
      weaponry: 0
    },

    virtue: null,
    hubris: null,

    backgrounds: [],
    advantages: [],
    
    stories: [],

    deathSpiral: {
      currentWounds: 0,
      dramaticWounds: Array(20).fill(false)
    }
  }),

  getters: {
    // 計算總屬性點數
    totalTraitPoints: (state) => {
      return Object.values(state.traits).reduce((sum, val) => sum + val, 0);
    },

    // 計算已分配的屬性點數（扣除基礎 10 點）
    spentTraitPoints: (state) => {
      const basePoints = 10; // 5 個屬性各 2 點
      return Object.values(state.traits).reduce((sum, val) => sum + val, 0) - basePoints;
    },

    // 剩餘可用屬性點數（初始 2 點）
    remainingTraitPoints(): number {
      return 2 - this.spentTraitPoints;
    },

    // 計算總技能點數
    totalSkillPoints: (state) => {
      return Object.values(state.skills).reduce((sum, val) => sum + val, 0);
    },

    // 計算已花費的技能點數（購買技能等級所需點數總和）
    spentSkillPoints: (state) => {
      // 從背景獲得的技能（1 級）不計入花費
      return Object.values(state.skills).reduce((sum, val) => sum + val, 0);
    },

    // 剩餘可用技能點數（初始 10 點 + 背景技能）
    remainingSkillPoints(): number {
      // 這裡需要根據背景獲得的技能來計算
      return 10 - this.spentSkillPoints;
    },

    // 計算已花費的優勢點數
    spentAdvantagePoints: (state) => {
      // 需要根據實際優勢的成本計算，這裡先簡化
      return state.advantages.length * 2; // 假設每個優勢平均 2 點
    },

    // 剩餘可用優勢點數（初始 5 點）
    remainingAdvantagePoints(): number {
      return 5 - this.spentAdvantagePoints;
    },

    // 檢查是否無助 (4 次戲劇傷勢)
    isHelpless: (state) => {
      return state.deathSpiral.currentWounds >= 4;
    },

    // 計算已標記的戲劇傷勢數量
    markedDramaticWounds: (state) => {
      return state.deathSpiral.dramaticWounds.filter(w => w).length;
    },

    // 檢查角色創建是否完成
    isCharacterComplete: (state) => {
      return !!(
        state.nation &&
        state.backgrounds.length === 2 &&
        state.virtue &&
        state.hubris
      );
    }
  },

  actions: {
    // 設定屬性值
    setTrait(trait: keyof CharacterData['traits'], value: number) {
      if (value >= 1 && value <= 5) {
        this.traits[trait] = value;
        this.saveToLocalStorage();
      }
    },

    // 設定技能值
    setSkill(skill: keyof CharacterData['skills'], value: number) {
      if (value >= 0 && value <= 5) {
        this.skills[skill] = value;
        this.saveToLocalStorage();
      }
    },

    // 設定國家
    setNation(nationKey: string) {
      this.nation = nationKey;
      this.saveToLocalStorage();
    },

    // 設定美德
    setVirtue(arcanaKey: string, name: string, description: string) {
      this.virtue = { arcanaKey, name, description };
      this.saveToLocalStorage();
    },

    // 設定傲性
    setHubris(arcanaKey: string, name: string, description: string) {
      this.hubris = { arcanaKey, name, description };
      this.saveToLocalStorage();
    },

    // 新增背景
    addBackground(key: string, name: string) {
      if (!this.backgrounds.find(bg => bg.key === key) && this.backgrounds.length < 2) {
        this.backgrounds.push({ key, name });
        this.saveToLocalStorage();
      }
    },

    // 移除背景
    removeBackground(index: number) {
      if (index >= 0 && index < this.backgrounds.length) {
        this.backgrounds.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    // 新增優勢
    addAdvantage(key: string, name: string) {
      if (!this.advantages.find(adv => adv.key === key)) {
        this.advantages.push({ key, name });
        this.saveToLocalStorage();
      }
    },

    // 移除優勢
    removeAdvantage(index: number) {
      if (index >= 0 && index < this.advantages.length) {
        this.advantages.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    // 新增故事
    addStory(story: CharacterData['stories'][0]) {
      this.stories.push(story);
      this.saveToLocalStorage();
    },

    // 更新故事
    updateStory(index: number, story: CharacterData['stories'][0]) {
      if (index >= 0 && index < this.stories.length) {
        this.stories[index] = story;
        this.saveToLocalStorage();
      }
    },

    // 移除故事
    removeStory(index: number) {
      if (index >= 0 && index < this.stories.length) {
        this.stories.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    // 設定當前傷勢
    setCurrentWounds(wounds: number) {
      if (wounds >= 0 && wounds <= 4) {
        this.deathSpiral.currentWounds = wounds;
        this.saveToLocalStorage();
      }
    },

    // 切換戲劇傷勢圓圈
    toggleDramaticWound(index: number) {
      if (index >= 0 && index < 20) {
        this.deathSpiral.dramaticWounds[index] = !this.deathSpiral.dramaticWounds[index];
        this.saveToLocalStorage();
      }
    },

    // 儲存到 localStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('7thsea-character', JSON.stringify(this.$state));
        } catch (error) {
          console.error('儲存角色資料失敗:', error);
        }
      }
    },

    // 從 localStorage 載入
    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('7thsea-character');
          if (saved) {
            const data = JSON.parse(saved);
            this.$patch(data);
            return true;
          }
        } catch (error) {
          console.error('載入角色資料失敗:', error);
        }
      }
      return false;
    },

    // 重置角色
    resetCharacter() {
      this.$reset();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('7thsea-character');
      }
    },

    // 匯出角色資料 (JSON)
    exportCharacter() {
      return JSON.stringify(this.$state, null, 2);
    },

    // 匯入角色資料
    importCharacter(jsonData: string) {
      try {
        const data = JSON.parse(jsonData);
        this.$patch(data);
        this.saveToLocalStorage();
        return true;
      } catch (error) {
        console.error('匯入角色失敗:', error);
        return false;
      }
    }
  }
});
