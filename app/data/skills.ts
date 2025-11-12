/**
 * 7th Sea 2nd Edition - 角色技能 (Skills)
 * 定義角色的所有可用技能
 */

export interface Skill {
  key: string;
  name: string;
  description: string;
}

export const skills: Record<string, Skill> = {
  aim: {
    key: 'aim',
    name: '瞄準',
    description: '當你舉起手槍瞄準並扣下扳機時，使用此技能。當你在擁擠的房間中精準投擲匕首，不論目標是人或物，也使用此技能。'
  },
  athletics: {
    key: 'athletics',
    name: '運動',
    description: '當你從吊燈上擺盪穿越房間、從屋頂跳到屋頂，或進行任何危險的體能特技時，使用此技能。'
  },
  brawl: {
    key: 'brawl',
    name: '格鬥',
    description: '當你用拳腳攻擊他人時，使用此技能。當你抓住某人並將他拖進巷子裡時，也使用此技能。'
  },
  convince: {
    key: 'convince',
    name: '說服',
    description: '當你訴諸他人的善意本性時，使用此技能。當你想讓他人相信你的誠意與可信度時，也使用此技能。'
  },
  empathy: {
    key: 'empathy',
    name: '洞悉',
    description: '當你想判斷某人是否真誠時，使用此技能。當你想了解某人的心理狀態（如害怕、緊張或憤怒）時，也使用此技能。'
  },
  hide: {
    key: 'hide',
    name: '隱匿',
    description: '當你在黑暗的房間中悄悄行動而不被守衛發現時，使用此技能。當你將物品藏於身上並希望在搜身時不被找到時，使用此技能。當你用武器或拳頭偷襲毫無防備的目標時，也使用此技能。隱匿亦可用於偽裝自身或掩飾某個地點。'
  },
  intimidate: {
    key: 'intimidate',
    name: '威嚇',
    description: '當你以威脅行動（無論是身體上的或其他形式的）迫使他人聽從你的意志時，使用此技能。'
  },
  notice: {
    key: 'notice',
    name: '察覺',
    description: '當你調查犯罪現場或搜尋反派書房尋找線索時使用。當你想在瞬間捕捉細微細節時，也使用此技能。'
  },
  perform: {
    key: 'perform',
    name: '表演',
    description: '當你試圖以表演吸引觀眾注意時，使用此技能。當你希望透過表演傳達特定訊息，或激起觀眾特定情緒（讓他們因喜劇而發笑、因悲劇而落淚、或因演說而被激勵）時，也使用此技能。'
  },
  ride: {
    key: 'ride',
    name: '騎乘',
    description: '當你進行高速馬車追逐時，使用此技能。當你策馬疾馳穿越森林時，也使用此技能。'
  },
  sailing: {
    key: 'sailing',
    name: '航海',
    description: '當你在船的索具間靈巧移動時，使用此技能。當你在海上激戰中操舵，或駕船通過危險的狹窄水道時，也使用此技能。'
  },
  scholarship: {
    key: 'scholarship',
    name: '學識',
    description: '當你滔滔不絕地談論某一專題（無論是個人經驗或所學知識）時，使用此技能。當你運用學識補足某主題的細節，或利用醫學訓練處理傷勢時，也使用此技能。'
  },
  tempt: {
    key: 'tempt',
    name: '誘惑',
    description: '當你以賄賂使他人為你做出她本不該同意之事時，使用此技能。當你試圖說服某人給你「單獨相處」的時間時，也使用此技能。'
  },
  theft: {
    key: 'theft',
    name: '竊盜',
    description: '當你趁人不注意時從其口袋中取物，使用此技能。當你開鎖、破解保險箱或執行類似行動時，也使用此技能。'
  },
  warfare: {
    key: 'warfare',
    name: '戰術',
    description: '當你需要戰術知識時（例如突襲城堡防線），使用此技能。當你率領軍隊作戰時，也使用此技能。'
  },
  weaponry: {
    key: 'weaponry',
    name: '武技',
    description: '當你以手中的劍、斧、鎚或匕首攻擊時，使用此技能。'
  }
};

/**
 * 取得所有技能列表
 */
export const getSkills = (): Skill[] => {
  return Object.values(skills);
};

/**
 * 根據 key 取得特定技能
 */
export const getSkillByKey = (key: string): Skill | undefined => {
  return skills[key];
};

/**
 * 技能名稱對照表（英文 -> 中文）
 */
export const skillNames: Record<string, string> = {
  aim: '瞄準',
  athletics: '運動',
  brawl: '格鬥',
  convince: '說服',
  empathy: '洞悉',
  hide: '隱匿',
  intimidate: '威嚇',
  notice: '察覺',
  perform: '表演',
  ride: '騎乘',
  sailing: '航海',
  scholarship: '學識',
  tempt: '誘惑',
  theft: '竊盜',
  warfare: '戰術',
  weaponry: '武技'
};
