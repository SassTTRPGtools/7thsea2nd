/**
 * 7th Sea 2nd Edition - 阿爾克那 (Arcana)
 * 包含美德 (Virtue) 和傲性 (Hubris)
 */

export interface Virtue {
  key: string;
  arcanaKey: string;
  name: string;
  description: string;
  activation: string; // 啟動條件
  effect: string; // 效果
}

export interface Hubris {
  key: string;
  arcanaKey: string;
  name: string;
  description: string;
  trigger: string; // 觸發條件
  reward: string; // 獎勵（通常是英雄點）
}

export interface Arcana {
  key: string;
  name: string;
  nameEn: string;
  virtue: Virtue;
  hubris: Hubris;
}

export const arcanas: Record<string, Arcana> = {
  fool: {
    key: 'fool',
    name: '愚者',
    nameEn: 'The Fool',
    virtue: {
      key: 'wary',
      arcanaKey: 'fool',
      name: '機敏',
      description: '啟動你的美德以逃離當前場景中的危險。你只能拯救自己，無法救他人。',
      activation: '當你需要逃離危險場景時',
      effect: '成功逃離當前場景的危險，但只能拯救自己'
    },
    hubris: {
      key: 'curious',
      arcanaKey: 'fool',
      name: '好奇',
      description: '當你去探查某件不尋常、尤其是看起來危險的事物時，獲得一點英雄點。',
      trigger: '探查不尋常或危險的事物',
      reward: '1 點英雄點'
    }
  },
  road: {
    key: 'road',
    name: '旅途',
    nameEn: 'The Road',
    virtue: {
      key: 'friendly',
      arcanaKey: 'road',
      name: '友善',
      description: '當你第一次與某位角色（即使是反派）相遇時啟動你的美德。她在該場景中會將你視為友人。',
      activation: '第一次與某位角色相遇時',
      effect: '該角色在本場景中將你視為友人'
    },
    hubris: {
      key: 'indecisive',
      arcanaKey: 'road',
      name: '缺乏自信',
      description: '當你的英雄認為自己若無他人幫助便無法行動時，獲得一點英雄點——例如堅持要求另一位英雄花費英雄點給你額外骰數，或請她使用優勢協助你。',
      trigger: '認為自己需要他人幫助才能行動',
      reward: '1 點英雄點'
    }
  },
  magician: {
    key: 'magician',
    name: '魔術師',
    nameEn: 'The Magician',
    virtue: {
      key: 'steadfast',
      arcanaKey: 'magician',
      name: '堅定',
      description: '啟動你的美德並指定一位反派。直到本場景結束，你與該反派皆無法花費英雄點或危機點。',
      activation: '指定一位反派',
      effect: '雙方無法花費英雄點或危機點，直到場景結束'
    },
    hubris: {
      key: 'ambitious',
      arcanaKey: 'magician',
      name: '野心',
      description: '當你追逐力量，而這份追求本身充滿危險或導致麻煩時，獲得一點英雄點。',
      trigger: '追逐力量而陷入危險或麻煩',
      reward: '1 點英雄點'
    }
  },
  lovers: {
    key: 'lovers',
    name: '戀人',
    nameEn: 'The Lovers',
    virtue: {
      key: 'passionate',
      arcanaKey: 'lovers',
      name: '熱情',
      description: '當另一位英雄將承受傷勢時啟動你的美德，使她免於受傷。你承擔一點戲劇傷勢以代替她。',
      activation: '另一位英雄將承受傷勢時',
      effect: '代替她承受傷勢，你承擔 1 點戲劇傷勢'
    },
    hubris: {
      key: 'starcrossed',
      arcanaKey: 'lovers',
      name: '命運多舛',
      description: '當你的英雄愛上了一個她絕不該愛的人時，獲得一點英雄點。',
      trigger: '愛上不該愛的人',
      reward: '1 點英雄點'
    }
  },
  wheel: {
    key: 'wheel',
    name: '命運之輪',
    nameEn: 'The Wheel',
    virtue: {
      key: 'fortunate',
      arcanaKey: 'wheel',
      name: '幸運',
      description: '啟動你的美德以將一個機運或後果延遲 1 次行動。',
      activation: '面對機運或後果時',
      effect: '將機運或後果延遲 1 次行動'
    },
    hubris: {
      key: 'unfortunate',
      arcanaKey: 'wheel',
      name: '不幸',
      description: '當你選擇在擲骰前主動讓一次重要的檢定失敗時，獲得兩點英雄點。',
      trigger: '主動讓重要檢定失敗',
      reward: '2 點英雄點'
    }
  },
  devil: {
    key: 'devil',
    name: '惡魔',
    nameEn: 'The Devil',
    virtue: {
      key: 'astute',
      arcanaKey: 'devil',
      name: '敏銳',
      description: '在反派花費勢頭進行行動後啟動你的美德。該行動自動失敗，但反派仍失去已花費的勢頭。',
      activation: '反派花費勢頭進行行動後',
      effect: '該行動自動失敗，反派失去已花費的勢頭'
    },
    hubris: {
      key: 'trusting',
      arcanaKey: 'devil',
      name: '輕信',
      description: '當你接受他人的謊言或不公平的交易時，獲得一點英雄點。',
      trigger: '接受謊言或不公平交易',
      reward: '1 點英雄點'
    }
  },
  tower: {
    key: 'tower',
    name: '高塔',
    nameEn: 'The Tower',
    virtue: {
      key: 'humble',
      arcanaKey: 'tower',
      name: '謙遜',
      description: '啟動你的美德時，當你觸發傲性或特質癖性而獲得英雄點時，改為獲得兩點而非一點。',
      activation: '觸發傲性或特質癖性時',
      effect: '獲得 2 點英雄點而非 1 點'
    },
    hubris: {
      key: 'arrogant',
      arcanaKey: 'tower',
      name: '傲慢',
      description: '當你的英雄對反派或可能傷害朋友的人表現出輕蔑、鄙視或居高臨下態度時，獲得一點英雄點。',
      trigger: '對敵人表現輕蔑或居高臨下',
      reward: '1 點英雄點'
    }
  },
  beggar: {
    key: 'beggar',
    name: '乞者',
    nameEn: 'The Beggar',
    virtue: {
      key: 'insightful',
      arcanaKey: 'beggar',
      name: '洞察',
      description: '啟動你的美德以得知一支暴徒隊的類型，或辨識一位反派的等級與優勢。',
      activation: '需要情報時',
      effect: '得知暴徒隊類型或反派的等級與優勢'
    },
    hubris: {
      key: 'envious',
      arcanaKey: 'beggar',
      name: '嫉妒',
      description: '當你的英雄因渴望某物而採取不智行動時，獲得一點英雄點。',
      trigger: '因渴望某物而採取不智行動',
      reward: '1 點英雄點'
    }
  },
  witch: {
    key: 'witch',
    name: '女巫',
    nameEn: 'The Witch',
    virtue: {
      key: 'intuitive',
      arcanaKey: 'witch',
      name: '直覺',
      description: '啟動你的美德向遊戲主持人（GM）提出一個有關非玩家角色（NPC）的「是或否」問題。GM 必須誠實回答，並應給予充分說明——若有條件限制，也必須一併告知與解釋。',
      activation: '詢問 NPC 相關問題時',
      effect: 'GM 必須誠實回答「是或否」問題並給予說明'
    },
    hubris: {
      key: 'manipulative',
      arcanaKey: 'witch',
      name: '操弄',
      description: '當你企圖讓他人替你做骯髒工作，結果卻反遭反噬時，獲得一點英雄點。',
      trigger: '操弄他人替你做事卻反遭反噬',
      reward: '1 點英雄點'
    }
  },
  war: {
    key: 'war',
    name: '戰爭',
    nameEn: 'The War',
    virtue: {
      key: 'victorious',
      arcanaKey: 'war',
      name: '凱旋',
      description: '在戰鬥中首次使一位反派受到傷勢時啟動你的美德，使其額外承受一點戲劇傷勢，此外仍需承受原有傷勢。',
      activation: '首次使反派受傷時',
      effect: '反派額外承受 1 點戲劇傷勢'
    },
    hubris: {
      key: 'loyal',
      arcanaKey: 'war',
      name: '忠誠',
      description: '當你的英雄返回救援倒下的同伴，或拒絕拋下受傷盟友時，獲得一點英雄點。',
      trigger: '返回救援同伴或拒絕拋下盟友',
      reward: '1 點英雄點'
    }
  },
  hangedMan: {
    key: 'hangedMan',
    name: '吊人',
    nameEn: 'The Hanged Man',
    virtue: {
      key: 'selfless',
      arcanaKey: 'hangedMan',
      name: '無私',
      description: '啟動你的美德以替另一位英雄承擔一次檢定的後果。',
      activation: '另一位英雄面對檢定後果時',
      effect: '代替她承擔後果'
    },
    hubris: {
      key: 'indecisive2',
      arcanaKey: 'hangedMan',
      name: '猶豫',
      description: '當你的英雄因遲疑、懷疑或不確定而浪費一次行動時，獲得一點英雄點。',
      trigger: '因猶豫不決而浪費行動',
      reward: '1 點英雄點'
    }
  },
  ferryman: {
    key: 'ferryman',
    name: '擺渡錢幣',
    nameEn: 'Coins, for the Ferryman',
    virtue: {
      key: 'adaptable',
      arcanaKey: 'ferryman',
      name: '適應',
      description: '啟動你的美德以在本回合中搶先於所有人進行第一次行動。',
      activation: '回合開始時',
      effect: '搶先於所有人進行第一次行動'
    },
    hubris: {
      key: 'relentless',
      arcanaKey: 'ferryman',
      name: '執著',
      description: '當你拒絕適可而止、無法放手或在成功後仍不願停下而惹出麻煩時，獲得一點英雄點。',
      trigger: '過度執著而惹出麻煩',
      reward: '1 點英雄點'
    }
  },
  thrones: {
    key: 'thrones',
    name: '王座',
    nameEn: 'The Thrones',
    virtue: {
      key: 'comforting',
      arcanaKey: 'thrones',
      name: '安慰',
      description: '啟動你的美德以消除你與同伴身上的恐懼效果。',
      activation: '面對恐懼效果時',
      effect: '消除自己與同伴的恐懼效果'
    },
    hubris: {
      key: 'stubborn',
      arcanaKey: 'thrones',
      name: '固執',
      description: '當你的英雄在明確證據面前仍拒絕改變主意時，獲得一點英雄點。',
      trigger: '面對證據仍拒絕改變主意',
      reward: '1 點英雄點'
    }
  },
  moonlessNight: {
    key: 'moonlessNight',
    name: '無月之夜',
    nameEn: 'The Moonless Night',
    virtue: {
      key: 'subtle',
      arcanaKey: 'moonlessNight',
      name: '隱密',
      description: '當你於幕後行動、在暗影中活動或透過代理執行時啟動你的美德。在下一次檢定判定勢頭時，每一顆骰子皆算作一點勢頭。',
      activation: '幕後行動或暗影活動時',
      effect: '下一次檢定每顆骰子算作 1 點勢頭'
    },
    hubris: {
      key: 'confusion',
      arcanaKey: 'moonlessNight',
      name: '混亂',
      description: '當你的英雄誤解了重要劇情要素，並因此導致自己或他人陷入危險時，獲得一點英雄點。',
      trigger: '誤解劇情導致危險',
      reward: '1 點英雄點'
    }
  },
  sun: {
    key: 'sun',
    name: '太陽',
    nameEn: 'The Sun',
    virtue: {
      key: 'glorious',
      arcanaKey: 'sun',
      name: '光輝',
      description: '當你成為眾人矚目的焦點時啟動你的美德。在下一次檢定判定勢頭時，每一顆骰子皆算作一點勢頭。',
      activation: '成為眾人焦點時',
      effect: '下一次檢定每顆骰子算作 1 點勢頭'
    },
    hubris: {
      key: 'proud',
      arcanaKey: 'sun',
      name: '驕傲',
      description: '當你的英雄拒絕他人協助時獲得一點英雄點——例如有另一位英雄試圖花費英雄點給你額外骰數，而你選擇拒絕。',
      trigger: '拒絕他人協助',
      reward: '1 點英雄點'
    }
  },
  prophet: {
    key: 'prophet',
    name: '先知',
    nameEn: 'The Prophet',
    virtue: {
      key: 'illuminating',
      arcanaKey: 'prophet',
      name: '洞明',
      description: '啟動你的美德，使你能在本場景結束前察覺任何角色對你說謊。',
      activation: '啟動後至場景結束',
      effect: '能察覺任何角色的謊言'
    },
    hubris: {
      key: 'overzealous',
      arcanaKey: 'prophet',
      name: '過於狂熱',
      description: '當你的英雄在不合時宜的時刻強烈辯護自己的觀點時，獲得一點英雄點。',
      trigger: '不合時宜地強烈辯護觀點',
      reward: '1 點英雄點'
    }
  },
  reunion: {
    key: 'reunion',
    name: '重逢',
    nameEn: 'Reunion',
    virtue: {
      key: 'exemplary',
      arcanaKey: 'reunion',
      name: '模範',
      description: '啟動你的美德並選擇同場景中的另一位英雄。你們在本回合共享勢頭池，可從合併的勢頭中共同花費進行行動。',
      activation: '選擇另一位英雄',
      effect: '本回合共享勢頭池'
    },
    hubris: {
      key: 'resentful',
      arcanaKey: 'reunion',
      name: '怨懟',
      description: '當你的英雄提起舊恨或不快往事，而這麼做將導致麻煩時，獲得一點英雄點。',
      trigger: '提起舊恨導致麻煩',
      reward: '1 點英雄點'
    }
  },
  hero: {
    key: 'hero',
    name: '英雄',
    nameEn: 'The Hero',
    virtue: {
      key: 'courageous',
      arcanaKey: 'hero',
      name: '勇敢',
      description: '啟動你的美德以在檢定中獲得等同目標恐懼值的額外骰數。',
      activation: '面對恐懼目標時',
      effect: '獲得等同目標恐懼值的額外骰數'
    },
    hubris: {
      key: 'foolhardy',
      arcanaKey: 'hero',
      name: '魯莽',
      description: '當你的英雄因冒失、驕傲或魯莽的行為而使自己與他人陷入麻煩時，獲得一點英雄點。',
      trigger: '魯莽行為導致麻煩',
      reward: '1 點英雄點'
    }
  },
  glyph: {
    key: 'glyph',
    name: '符印',
    nameEn: 'The Glyph',
    virtue: {
      key: 'temperate',
      arcanaKey: 'glyph',
      name: '節制',
      description: '啟動你的美德，使任何魔法效果（巫術、神器、怪物等）皆無法影響你。',
      activation: '面對魔法效果時',
      effect: '免疫所有魔法效果'
    },
    hubris: {
      key: 'superstitious',
      arcanaKey: 'glyph',
      name: '迷信',
      description: '當你拒絕使用巫術、神器或任何你不信任的神秘效應來解決問題時，獲得一點英雄點。',
      trigger: '拒絕使用神秘效應',
      reward: '1 點英雄點'
    }
  },
  emperor: {
    key: 'emperor',
    name: '皇帝',
    nameEn: 'The Emperor',
    virtue: {
      key: 'commanding',
      arcanaKey: 'emperor',
      name: '威嚴',
      description: '啟動你的美德，使遊戲主持人賦予場景中所有其他英雄各一點英雄點。',
      activation: '啟動時',
      effect: '所有其他英雄各獲得 1 點英雄點'
    },
    hubris: {
      key: 'hotHeaded',
      arcanaKey: 'emperor',
      name: '暴躁',
      description: '當你的英雄因憤怒而失控、發脾氣並造成麻煩時，獲得一點英雄點。',
      trigger: '憤怒失控造成麻煩',
      reward: '1 點英雄點'
    }
  }
};

/**
 * 取得所有阿爾克那
 */
export const getArcanas = (): Arcana[] => {
  return Object.values(arcanas);
};

/**
 * 根據 key 取得特定阿爾克那
 */
export const getArcanaByKey = (key: string): Arcana | undefined => {
  return arcanas[key];
};

/**
 * 取得所有美德
 */
export const getVirtues = (): Virtue[] => {
  return Object.values(arcanas).map(arcana => arcana.virtue);
};

/**
 * 取得所有傲性
 */
export const getHubris = (): Hubris[] => {
  return Object.values(arcanas).map(arcana => arcana.hubris);
};

/**
 * 根據 key 取得特定美德
 */
export const getVirtueByKey = (key: string): Virtue | undefined => {
  return getVirtues().find(v => v.key === key);
};

/**
 * 根據 key 取得特定傲性
 */
export const getHubrisByKey = (key: string): Hubris | undefined => {
  return getHubris().find(h => h.key === key);
};

/**
 * 阿爾克那名稱對照表（英文 -> 中文）
 */
export const arcanaNames: Record<string, string> = {
  fool: '愚者',
  road: '旅途',
  magician: '魔術師',
  lovers: '戀人',
  wheel: '命運之輪',
  devil: '惡魔',
  tower: '高塔',
  beggar: '乞者',
  witch: '女巫',
  war: '戰爭',
  hangedMan: '吊人',
  ferryman: '擺渡錢幣',
  thrones: '王座',
  moonlessNight: '無月之夜',
  sun: '太陽',
  prophet: '先知',
  reunion: '重逢',
  hero: '英雄',
  glyph: '符印',
  emperor: '皇帝'
};
