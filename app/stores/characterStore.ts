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

    // 計算總技能點數
    totalSkillPoints: (state) => {
      return Object.values(state.skills).reduce((sum, val) => sum + val, 0);
    },

    // 檢查是否無助 (4 次戲劇傷勢)
    isHelpless: (state) => {
      return state.deathSpiral.currentWounds >= 4;
    },

    // 計算已標記的戲劇傷勢數量
    markedDramaticWounds: (state) => {
      return state.deathSpiral.dramaticWounds.filter(w => w).length;
    }
  },

  actions: {
    // 設定屬性值
    setTrait(trait: keyof CharacterData['traits'], value: number) {
      if (value >= 1 && value <= 5) {
        this.traits[trait] = value;
      }
    },

    // 設定技能值
    setSkill(skill: keyof CharacterData['skills'], value: number) {
      if (value >= 0 && value <= 5) {
        this.skills[skill] = value;
      }
    },

    // 設定美德
    setVirtue(arcanaKey: string, name: string, description: string) {
      this.virtue = { arcanaKey, name, description };
    },

    // 設定傲性
    setHubris(arcanaKey: string, name: string, description: string) {
      this.hubris = { arcanaKey, name, description };
    },

    // 新增背景
    addBackground(key: string, name: string) {
      if (!this.backgrounds.find(bg => bg.key === key)) {
        this.backgrounds.push({ key, name });
      }
    },

    // 移除背景
    removeBackground(index: number) {
      if (index >= 0 && index < this.backgrounds.length) {
        this.backgrounds.splice(index, 1);
      }
    },

    // 新增優勢
    addAdvantage(key: string, name: string) {
      if (!this.advantages.find(adv => adv.key === key)) {
        this.advantages.push({ key, name });
      }
    },

    // 移除優勢
    removeAdvantage(index: number) {
      if (index >= 0 && index < this.advantages.length) {
        this.advantages.splice(index, 1);
      }
    },

    // 新增故事
    addStory(story: CharacterData['stories'][0]) {
      this.stories.push(story);
    },

    // 更新故事
    updateStory(index: number, story: CharacterData['stories'][0]) {
      if (index >= 0 && index < this.stories.length) {
        this.stories[index] = story;
      }
    },

    // 移除故事
    removeStory(index: number) {
      if (index >= 0 && index < this.stories.length) {
        this.stories.splice(index, 1);
      }
    },

    // 設定當前傷勢
    setCurrentWounds(wounds: number) {
      if (wounds >= 0 && wounds <= 4) {
        this.deathSpiral.currentWounds = wounds;
      }
    },

    // 切換戲劇傷勢圓圈
    toggleDramaticWound(index: number) {
      if (index >= 0 && index < 20) {
        this.deathSpiral.dramaticWounds[index] = !this.deathSpiral.dramaticWounds[index];
      }
    },

    // 重置角色
    resetCharacter() {
      this.$reset();
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
        return true;
      } catch (error) {
        console.error('匯入角色失敗:', error);
        return false;
      }
    }
  }
});
