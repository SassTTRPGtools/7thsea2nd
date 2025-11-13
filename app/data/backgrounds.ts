/**
 * 7th Sea 2nd Edition - 背景 (Backgrounds)
 * 定義角色可選擇的背景及其特性
 */

export interface Background {
  key: string;
  name: string;
  nameEn: string;
  description: string;
  quirk: string; // 癖性
  advantages: string[]; // 優勢 key 列表
  skills: string[]; // 技能 key 列表
  category: 'basic' | 'glamourIsles' | 'avalon' | 'inismore' | 'highlandMarches' | 'castille' | 'eisen' | 'montaigne' | 'sarmatian' | 'ussura' | 'vesten' | 'vodacce';
}

export const backgrounds: Record<string, Background> = {
  // 基礎背景 (Basic Backgrounds)
  archaeologist: {
    key: 'archaeologist',
    name: '考古學家',
    nameEn: 'Archæologist',
    description: '你研究塞涅斯遺跡，並探索泰拉失落的角落。',
    quirk: '當你將一件有價值的遺物交給大學、博物館或公開展示的場所時，獲得１點英雄點。',
    advantages: ['signatureItem', 'eagleEyes'],
    skills: ['athletics', 'convince', 'notice', 'scholarship', 'theft'],
    category: 'basic'
  },
  aristocrat: {
    key: 'aristocrat',
    name: '貴族',
    nameEn: 'Aristocrat',
    description: '你生於祖國的貴族階層，經常出入宮廷。',
    quirk: '當你證明貴族的價值不僅止於華服與禮儀時，獲得１點英雄點。',
    advantages: ['rich', 'disarmingSmile'],
    skills: ['aim', 'convince', 'empathy', 'ride', 'scholarship'],
    category: 'basic'
  },
  armyOfficer: {
    key: 'armyOfficer',
    name: '陸軍軍官',
    nameEn: 'Army Officer',
    description: '你曾入伍服役，並很快晉升為指揮職。',
    quirk: '當你在極端暴力或危險時刻奪取指揮權時，獲得１點英雄點。',
    advantages: ['academy', 'directionSense'],
    skills: ['aim', 'athletics', 'intimidate', 'ride', 'warfare'],
    category: 'basic'
  },
  artist: {
    key: 'artist',
    name: '藝術家',
    nameEn: 'Artist',
    description: '你孜孜不倦地創作美麗的作品。',
    quirk: '當你為了讓瑟亞大陸變得更美而犧牲某些東西時，獲得１點英雄點。',
    advantages: ['patron', 'fascinate'],
    skills: ['convince', 'empathy', 'perform', 'ride', 'tempt'],
    category: 'basic'
  },
  assassin: {
    key: 'assassin',
    name: '刺客',
    nameEn: 'Assassin',
    description: '你曾為血錢潛行於暗影之中，成為死亡的幽靈，如今已不再如此。',
    quirk: '當你主動避免殺害對手，或拒絕可能導致他人死亡的行動時，獲得１點英雄點。',
    advantages: ['fencer', 'psstOverHere'],
    skills: ['athletics', 'empathy', 'hide', 'intimidate', 'weaponry'],
    category: 'basic'
  },
  cavalry: {
    key: 'cavalry',
    name: '騎兵',
    nameEn: 'Cavalry',
    description: '你是祖國中受人尊敬的騎兵戰士之一。',
    quirk: '當你將騎術應用於非典型場合時，獲得１點英雄點。',
    advantages: ['bruiser', 'indomitableWill'],
    skills: ['intimidate', 'notice', 'ride', 'warfare', 'weaponry'],
    category: 'basic'
  },
  courtier: {
    key: 'courtier',
    name: '朝臣',
    nameEn: 'Courtier',
    description: '你常駐祖國宮廷，並作為外交使節出訪他國。',
    quirk: '當你以風采與魅力扭轉暴力局勢時，獲得１點英雄點。',
    advantages: ['anHonestMisunderstanding', 'friendAtCourt'],
    skills: ['empathy', 'perform', 'ride', 'tempt', 'weaponry'],
    category: 'basic'
  },
  crafter: {
    key: 'crafter',
    name: '匠人',
    nameEn: 'Crafter',
    description: '你孜孜不倦地製作實用的器物。',
    quirk: '當你以日常工藝技術解決他人認為過於複雜的問題時，獲得１點英雄點。',
    advantages: ['masterpieceCrafter', 'handy'],
    skills: ['athletics', 'convince', 'notice', 'perform', 'scholarship'],
    category: 'basic'
  },
  criminal: {
    key: 'criminal',
    name: '罪犯',
    nameEn: 'Criminal',
    description: '你為了更崇高的理想，違背不義的法律。',
    quirk: '當你為了正義或高尚目標而違法時，獲得１點英雄點。',
    advantages: ['camaraderie', 'streetwise'],
    skills: ['athletics', 'empathy', 'hide', 'intimidate', 'theft'],
    category: 'basic'
  },
  doctor: {
    key: 'doctor',
    name: '醫師',
    nameEn: 'Doctor',
    description: '你致力於治癒病患，照料傷者。',
    quirk: '當你治療了反派或被反派傷害的無辜者時，獲得１點英雄點。',
    advantages: ['miracleWorker', 'timeSense'],
    skills: ['convince', 'empathy', 'notice', 'ride', 'scholarship'],
    category: 'basic'
  },
  duelist: {
    key: 'duelist',
    name: '決鬥者',
    nameEn: 'Duelist',
    description: '你畢生奉獻於劍術之道。',
    quirk: '當你為了守護崇高信念而拔劍戰鬥時，獲得１點英雄點。',
    advantages: ['duelistAcademy'],
    skills: ['athletics', 'empathy', 'intimidate', 'perform', 'weaponry'],
    category: 'basic'
  },
  engineer: {
    key: 'engineer',
    name: '工程師',
    nameEn: 'Engineer',
    description: '你運用科學知識、數學與創造力,解決技術、社會或商業上的問題。',
    quirk: '當你以技術知識與巧思成功解決難題時，獲得１點英雄點。',
    advantages: ['masterpieceCrafter', 'directionSense', 'timeSense'],
    skills: ['aim', 'convince', 'ride', 'scholarship', 'warfare'],
    category: 'basic'
  },
  explorer: {
    key: 'explorer',
    name: '探險家',
    nameEn: 'Explorer',
    description: '你生於冒險，追求見證泰拉最遙遠的疆界。',
    quirk: '當你親眼目睹鮮少瑟亞大陸人曾見之景象時，獲得１點英雄點。',
    advantages: ['quickReflexes', 'secondStoryWork'],
    skills: ['athletics', 'convince', 'empathy', 'ride', 'sailing'],
    category: 'basic'
  },
  farmkid: {
    key: 'farmkid',
    name: '農莊子弟',
    nameEn: 'Farmkid',
    description: '你成長於農場，熟悉勞作與生存，從未經歷過冒險生活。',
    quirk: '當你以簡單、實用的農村方法解決複雜問題時，獲得１點英雄點。',
    advantages: ['legendaryTrait', 'survivalist'],
    skills: ['athletics', 'convince', 'empathy', 'perform', 'ride'],
    category: 'basic'
  },
  hunter: {
    key: 'hunter',
    name: '獵人',
    nameEn: 'Hunter',
    description: '你以星空為被、雙手為刃，自力捕食、行於荒野。',
    quirk: '當你運用獵人本能救人於危險之中時，獲得１點英雄點。',
    advantages: ['sniper', 'gotIt'],
    skills: ['aim', 'hide', 'intimidate', 'notice', 'ride'],
    category: 'basic'
  },
  jenny: {
    key: 'jenny',
    name: '交際花',
    nameEn: 'Jenny',
    description: '你以誘惑與魅力，將樂趣與利益化為生活之道。',
    quirk: '當你以誘惑或風情化解衝突時，獲得１點英雄點。',
    advantages: ['dynamicApproach', 'comeHither'],
    skills: ['aim', 'athletics', 'empathy', 'perform', 'tempt'],
    category: 'basic'
  },
  mercenary: {
    key: 'mercenary',
    name: '傭兵',
    nameEn: 'Mercenary',
    description: '你將戰場技能賣給出價最高的雇主。',
    quirk: '當你因信念或情感，而非金錢利益而出手時，獲得１點英雄點。',
    advantages: ['hardToKill', 'castIronStomach'],
    skills: ['athletics', 'brawl', 'intimidate', 'notice', 'weaponry'],
    category: 'basic'
  },
  merchant: {
    key: 'merchant',
    name: '商人',
    nameEn: 'Merchant',
    description: '你穿行於鄉間與港口，販售貨物、經營貿易。',
    quirk: '當你以低於市價的價格，將物品賣給迫切需要之人時，獲得１點英雄點。',
    advantages: ['lyceum', 'timeSense'],
    skills: ['convince', 'empathy', 'intimidate', 'ride', 'tempt'],
    category: 'basic'
  },
  navalOfficer: {
    key: 'navalOfficer',
    name: '海軍軍官',
    nameEn: 'Naval Officer',
    description: '你加入海軍，並逐步晉升至艦上指揮階層。',
    quirk: '當你將船員的安全置於任務目標之上時，獲得１點英雄點。',
    advantages: ['perfectBalance', 'barterer', 'seaLegs'],
    skills: ['intimidate', 'notice', 'sailing', 'warfare', 'weaponry'],
    category: 'basic'
  },
  orphan: {
    key: 'orphan',
    name: '孤兒',
    nameEn: 'Orphan',
    description: '你自幼失去雙親,被迫獨自求生。',
    quirk: '當你冒險涉險，只為不讓他人孤單受苦時，獲得１點英雄點。',
    advantages: ['brushPass', 'recklessTakedown'],
    skills: ['athletics', 'brawl', 'empathy', 'hide', 'intimidate'],
    category: 'basic'
  },
  performer: {
    key: 'performer',
    name: '表演者',
    nameEn: 'Performer',
    description: '你致力於創造能打動人心的藝術體驗。',
    quirk: '當你運用取悅群眾的技巧，為超越金錢的目的而行動時，獲得１點英雄點。',
    advantages: ['virtuoso', 'inspireGenerosity'],
    skills: ['athletics', 'empathy', 'perform', 'tempt', 'theft'],
    category: 'basic'
  },
  pirate: {
    key: 'pirate',
    name: '海盜',
    nameEn: 'Pirate',
    description: '你乘風破浪、掠取所需，並為追隨自由的人帶來解放。',
    quirk: '當你為他人的自由而作出個人犧牲時，獲得１點英雄點。',
    advantages: ['deadeye', 'indomitableWill'],
    skills: ['aim', 'intimidate', 'notice', 'sailing', 'theft'],
    category: 'basic'
  },
  priest: {
    key: 'priest',
    name: '牧師',
    nameEn: 'Priest',
    description: '你將一生奉獻於侍奉更高的信仰與教義。',
    quirk: '當你放下言辭，身體力行你所宣揚的美德時，獲得１點英雄點。',
    advantages: ['ordained', 'inspireGenerosity'],
    skills: ['empathy', 'perform', 'ride', 'scholarship', 'tempt'],
    category: 'basic'
  },
  professor: {
    key: 'professor',
    name: '教授',
    nameEn: 'Professor',
    description: '你在知名學院任教，傳授知識與智慧。',
    quirk: '當你運用冷門文獻中的知識成功解決難題時，獲得１點英雄點。',
    advantages: ['tenure', 'teamPlayer'],
    skills: ['convince', 'empathy', 'perform', 'scholarship', 'tempt'],
    category: 'basic'
  },
  pugilist: {
    key: 'pugilist',
    name: '拳鬥士',
    nameEn: 'Pugilist',
    description: '你仰賴雙手與雙腳，解決生命中所有暴力的問題。',
    quirk: '當你放下武器，選擇徒手迎戰，無論對手持何種武器時，獲得１點英雄點。',
    advantages: ['boxer', 'staredown'],
    skills: ['athletics', 'brawl', 'convince', 'empathy', 'perform'],
    category: 'basic'
  },
  quartermaster: {
    key: 'quartermaster',
    name: '船務長',
    nameEn: 'Quartermaster',
    description: '你在船上負責處理所有其他水手忽視的瑣事。',
    quirk: '當你為船員解決實際問題時，獲得１點英雄點。',
    advantages: ['handy', 'gotIt', 'seaLegs'],
    skills: ['aim', 'brawl', 'hide', 'sailing', 'warfare'],
    category: 'basic'
  },
  sailor: {
    key: 'sailor',
    name: '水手',
    nameEn: 'Sailor',
    description: '你不效忠任何國家或主子;對你而言，船與船員就是你的家人。',
    quirk: '當你為了同伴的安全與舒適而放下個人慾望時，獲得１點英雄點。',
    advantages: ['barFighter', 'eagleEyes'],
    skills: ['brawl', 'notice', 'sailing', 'tempt', 'weaponry'],
    category: 'basic'
  },
  scholar: {
    key: 'scholar',
    name: '學者',
    nameEn: 'Scholar',
    description: '你獻身於知識的追求，致力記錄泰拉的奇觀。',
    quirk: '當你為了獲得知識而身陷險境時，獲得１點英雄點。',
    advantages: ['university', 'linguist'],
    skills: ['convince', 'empathy', 'notice', 'perform', 'scholarship'],
    category: 'basic'
  },
  servant: {
    key: 'servant',
    name: '僕役',
    nameEn: 'Servant',
    description: '你侍奉他人，盡力完成主人的一切差事。',
    quirk: '當你為了協助他人完成困難任務而使自己陷入危險時，獲得１點英雄點。',
    advantages: ['foulWeatherJack', 'teamPlayer'],
    skills: ['hide', 'notice', 'ride', 'tempt', 'theft'],
    category: 'basic'
  },
  shipCaptain: {
    key: 'shipCaptain',
    name: '船長',
    nameEn: 'Ship Captain',
    description: '你指揮著船員，揚帆於海上，為信念或旗幟而航行。',
    quirk: '當你成為船員中最後一個脫險者時，獲得１點英雄點。',
    advantages: ['marriedToTheSea', 'leadership', 'seaLegs'],
    skills: ['aim', 'convince', 'notice', 'sailing', 'warfare'],
    category: 'basic'
  },
  soldier: {
    key: 'soldier',
    name: '士兵',
    nameEn: 'Soldier',
    description: '你熟悉戰鬥與殺戮，並在戰旗之下為貴族與領主而戰。',
    quirk: '當你堅守既定計畫，即便因此身陷危險時，獲得１點英雄點。',
    advantages: ['riotBreaker', 'ableDrinker'],
    skills: ['aim', 'intimidate', 'notice', 'warfare', 'weaponry'],
    category: 'basic'
  },
  spy: {
    key: 'spy',
    name: '間諜',
    nameEn: 'Spy',
    description: '你為國家效力，滲透敵陣以竊取祕密。',
    quirk: '當你冒極大風險揭開隱密真相時，獲得１點英雄點。',
    advantages: ['opportunist', 'poisonImmunity'],
    skills: ['empathy', 'hide', 'notice', 'tempt', 'theft'],
    category: 'basic'
  },

  // 幻魅群島背景 (Glamour Isles Backgrounds)
  bard: {
    key: 'bard',
    name: '吟遊詩人',
    nameEn: 'Bard',
    description: '你講述古老傳說與英雄故事，確保阿瓦隆的靈魂永不被遺忘。',
    quirk: '當你依循傳奇的榜樣行事而解決問題時，獲得１點英雄點。',
    advantages: ['barterer', 'virtuoso', 'ableDrinker'],
    skills: ['aim', 'convince', 'empathy', 'perform', 'ride'],
    category: 'glamourIsles'
  },
  knightErrant: {
    key: 'knightErrant',
    name: '遊俠騎士',
    nameEn: 'Knight Errant',
    description: '你被伊利洛德王之騎士所傳承的傳奇魔法所加持。',
    quirk: '當你堅持騎士的美德而陷入麻煩時，獲得１點英雄點。',
    advantages: ['sorcery', 'sorcery', 'directionSense'],
    skills: ['brawl', 'intimidate', 'ride', 'warfare', 'weaponry'],
    category: 'glamourIsles'
  },
  privateer: {
    key: 'privateer',
    name: '私掠船長',
    nameEn: 'Privateer',
    description: '你持有阿瓦隆王冠的特許狀，奉命攻擊一切王國之敵艦。',
    quirk: '當你擊敗阿瓦隆王冠的敵人時，獲得１點英雄點。',
    advantages: ['theDevilsOwnLuck', 'perfectBalance'],
    skills: ['notice', 'sailing', 'tempt', 'theft', 'weaponry'],
    category: 'glamourIsles'
  },
  unificationAgent: {
    key: 'unificationAgent',
    name: '統合特使',
    nameEn: 'Unification Agent',
    description: '你受阿瓦隆王冠之命，維持幻魅群島的和平與穩定。',
    quirk: '當你確保幻魅群島統一的穩定時，獲得１點英雄點。',
    advantages: ['university', 'survivalist'],
    skills: ['aim', 'empathy', 'notice', 'scholarship', 'tempt'],
    category: 'glamourIsles'
  },

  // 阿瓦隆背景 (Avalon Backgrounds)
  puritan: {
    key: 'puritan',
    name: '清教徒',
    nameEn: 'Puritan',
    description: '你是改革異議派的信徒，致力於清除阿瓦隆教會中所有教宗教會的殘留習俗。',
    quirk: '當你揭露教宗教會中的腐敗、偽善或無能時，獲得１點英雄點。',
    advantages: ['dynamicApproach', 'reputation'],
    skills: ['convince', 'empathy', 'intimidate', 'ride', 'scholarship'],
    category: 'avalon'
  },

  // 伊尼斯摩背景 (Inismore Backgrounds)
  saoi: {
    key: 'saoi',
    name: '智者',
    nameEn: 'Saoi／Wise One',
    description: '你擁有被尊為奧斯達納的最高榮譽，身為受國家支持的創作者與藝術守護者。',
    quirk: '當你為了保護瑟亞大陸的藝術家而身陷險境時，獲得１點英雄點。',
    advantages: ['teamPlayer', 'disarmingSmile', 'ableDrinker'],
    skills: ['athletics', 'convince', 'empathy', 'perform', 'weaponry'],
    category: 'inismore'
  },

  // 高地行省背景 (Highland Marches Background)
  seanchaidh: {
    key: 'seanchaidh',
    name: '武詩者',
    nameEn: 'Seanchaidh／Warrior-Poet',
    description: '你是說書人與史官，精通族群的古老律法與傳統。',
    quirk: '當你執行並維護族裔古法時，獲得１點英雄點。',
    advantages: ['riotBreaker', 'linguist'],
    skills: ['convince', 'notice', 'perform', 'ride', 'weaponry'],
    category: 'highlandMarches'
  },

  // 卡施緹耶背景 (Castille Backgrounds)
  alquimista: {
    key: 'alquimista',
    name: '鍊金術師',
    nameEn: 'Alquimista',
    description: '你經歷漫長研究，終於揭開鍊金創造的奧祕。',
    quirk: '當你以鍊金術改善他人生活時，獲得１點英雄點。',
    advantages: ['alchemist', 'castIronStomach'],
    skills: ['empathy', 'notice', 'scholarship', 'tempt', 'theft'],
    category: 'castille'
  },
  antropologo: {
    key: 'antropologo',
    name: '人類學者',
    nameEn: 'Antropólogo',
    description: '你與考古學家相似，但你專注於人群與文化，而非他們留下的遺跡。',
    quirk: '當你為一群陌生人解決問題時，獲得１點英雄點。',
    advantages: ['university', 'linguist'],
    skills: ['athletics', 'convince', 'empathy', 'notice', 'scholarship'],
    category: 'castille'
  },
  diestro: {
    key: 'diestro',
    name: '劍術宗師',
    nameEn: 'Diestro',
    description: '你畢生致力於理解劍，不僅止於其戰鬥用途。',
    quirk: '當你在決鬥中擊敗受過正式訓練的劍士時，獲得１點英雄點。',
    advantages: ['fencer', 'disarmingSmile'],
    skills: ['athletics', 'empathy', 'intimidate', 'scholarship', 'weaponry'],
    category: 'castille'
  },
  mirabilis: {
    key: 'mirabilis',
    name: '奇蹟教士',
    nameEn: 'Mirabilis／Priest',
    description: '你是教宗教會的高等學者,隸屬奇蹟教團(Ordo Doctorem Mirabilis)。',
    quirk: '當你以身作則展現教宗教會的慈悲與溫暖時，獲得１點英雄點。',
    advantages: ['ordained', 'sparkOfGenius'],
    skills: ['convince', 'empathy', 'perform', 'ride', 'scholarship'],
    category: 'castille'
  },

  // 艾森背景 (Eisen Backgrounds)
  hexe: {
    key: 'hexe',
    name: '赫森術師',
    nameEn: 'Hexe',
    description: '你精通赫森術，那是與亡者相關的黑暗巫術。',
    quirk: '當你特意確保死者不再復起時，獲得１點英雄點。',
    advantages: ['sorcery', 'sorcery', 'castIronStomach'],
    skills: ['athletics', 'intimidate', 'notice', 'tempt', 'weaponry'],
    category: 'eisen'
  },
  krieger: {
    key: 'krieger',
    name: '戰士',
    nameEn: 'Krieger／Warrior',
    description: '你歷經十字之戰洗禮，身上留滿戰火的傷痕。',
    quirk: '當你挺身戰鬥以保護弱者或防止破壞時，獲得１點英雄點。',
    advantages: ['staredown', 'academy'],
    skills: ['aim', 'athletics', 'ride', 'warfare', 'weaponry'],
    category: 'eisen'
  },
  ungetumjager: {
    key: 'ungetumjager',
    name: '獵魔人',
    nameEn: 'Ungetümjäger／Monster Hunter',
    description: '你深知家鄉暗藏非人怪物，並立誓將其殲滅。',
    quirk: '當你追獵異形生物，使其永不再害人時，獲得１點英雄點。',
    advantages: ['iWontDieHere', 'indomitableWill'],
    skills: ['aim', 'athletics', 'brawl', 'notice', 'weaponry'],
    category: 'eisen'
  },
  vitalienbruder: {
    key: 'vitalienbruder',
    name: '維塔連兄弟',
    nameEn: 'Vitalienbruder／Pirate',
    description: '你是艾森的海上兄弟之一，信奉公平交易與平等分配。',
    quirk: '當你劫富濟貧時，獲得１點英雄點。',
    advantages: ['leadership', 'streetwise', 'seaLegs'],
    skills: ['brawl', 'hide', 'sailing', 'theft', 'warfare'],
    category: 'eisen'
  },

  // 蒙泰涅背景 (Montaigne Backgrounds)
  lamiDuRoi: {
    key: 'lamiDuRoi',
    name: '國王之友',
    nameEn: 'L\'Ami du Roi／Courtier',
    description: '你是真正受蒙泰涅國王寵愛的宮廷要員。',
    quirk: '當你運用國王的恩寵解決問題時，獲得１點英雄點。',
    advantages: ['connection', 'friendAtCourt', 'linguist'],
    skills: ['convince', 'perform', 'ride', 'tempt', 'weaponry'],
    category: 'montaigne'
  },
  mousquetaire: {
    key: 'mousquetaire',
    name: '火槍衛士',
    nameEn: 'Mousquetaire',
    description: '你宣誓保衛蒙泰涅國王與你的同袍，直至生命終結。',
    quirk: '當你為保護戰友或國王而受重傷時，獲得１點英雄點。',
    advantages: ['camaraderie', 'quickReflexes'],
    skills: ['aim', 'intimidate', 'notice', 'ride', 'weaponry'],
    category: 'montaigne'
  },
  revolutionnaire: {
    key: 'revolutionnaire',
    name: '革命者',
    nameEn: 'Révolutionnaire',
    description: '你誓言解放祖國，推翻貴族的暴政。',
    quirk: '當你為自由犧牲個人利益時，獲得１點英雄點。',
    advantages: ['joieDeVivre', 'slipFree'],
    skills: ['hide', 'notice', 'ride', 'theft', 'weaponry'],
    category: 'montaigne'
  },
  sorcierPorte: {
    key: 'sorcierPorte',
    name: '傳門術士',
    nameEn: 'Sorcier Porté',
    description: '你精通傳送魔法——開啟空間之門的魔法。',
    quirk: '當你關閉被反派撕裂開的傷痕時，獲得１點英雄點。',
    advantages: ['sorcery', 'sorcery', 'timeSense'],
    skills: ['empathy', 'hide', 'ride', 'scholarship', 'tempt'],
    category: 'montaigne'
  },

  // 薩馬提亞聯邦背景 (Sarmatian Backgrounds)
  posel: {
    key: 'posel',
    name: '使節',
    nameEn: 'Poseł／Envoy',
    description: '你是整個聯邦議會的顧問與代言人。',
    quirk: '當你在投票對你不利時仍堅持民主原則，獲得１點英雄點。',
    advantages: ['leadership', 'lyceum'],
    skills: ['convince', 'empathy', 'intimidate', 'perform', 'tempt'],
    category: 'sarmatian'
  },
  tremtis: {
    key: 'tremtis',
    name: '流亡者',
    nameEn: 'Tremtis／Expatriate',
    description: '在「貴族民主制」建立後，你逃往聯邦尋求庇護。',
    quirk: '當你被過去的陰影追上時，獲得１點英雄點。',
    advantages: ['foreignBorn', 'streetwise', 'connection'],
    skills: ['brawl', 'empathy', 'hide', 'notice', 'theft'],
    category: 'sarmatian'
  },
  wingedHussar: {
    key: 'wingedHussar',
    name: '翼騎兵',
    nameEn: 'Winged Hussar',
    description: '你是聯邦最驕傲的騎兵部隊成員之一，身披羽翼甲冑的菁英戰士。',
    quirk: '當你與坐騎無懼危險、率先衝入戰場時，獲得１點英雄點。',
    advantages: ['togetherWeAreStrong', 'teamPlayer'],
    skills: ['convince', 'notice', 'ride', 'warfare', 'weaponry'],
    category: 'sarmatian'
  },
  zynys: {
    key: 'zynys',
    name: '占卜祭司',
    nameEn: 'Žynys／Soothsayer',
    description: '你曾於旅途中智勝惡魔，並以此獲得操控其力量的能力。',
    quirk: '當你以邪惡之力行善時，獲得１點英雄點。',
    advantages: ['sorcery', 'sorcery', 'linguist'],
    skills: ['athletics', 'convince', 'perform', 'scholarship', 'weaponry'],
    category: 'sarmatian'
  },

  // 烏蘇拉背景 (Ussura Backgrounds)
  cossack: {
    key: 'cossack',
    name: '哥薩克',
    nameEn: 'Cossack',
    description: '你生活於烏蘇拉東部草原，這裡以驍勇善戰與高超騎術聞名。',
    quirk: '當你放棄重要之物、輕裝前行以利旅途時，獲得１點英雄點。',
    advantages: ['strengthOfTen', 'recklessTakedown'],
    skills: ['brawl', 'intimidate', 'notice', 'ride', 'weaponry'],
    category: 'ussura'
  },
  progressivist: {
    key: 'progressivist',
    name: '進步主義者',
    nameEn: 'Progressivist',
    description: '你周遊瑟亞大陸，為了將創新技術帶回祖國，推動現代化。',
    quirk: '當你冒著生命危險去獲取先進技術時，獲得１點英雄點。',
    advantages: ['extendedFamily', 'handy', 'connection'],
    skills: ['athletics', 'convince', 'empathy', 'ride', 'tempt'],
    category: 'ussura'
  },
  touchedByMatushka: {
    key: 'touchedByMatushka',
    name: '瑪圖什卡之觸',
    nameEn: 'Touched by Matushka',
    description: '你受到瑪圖什卡祝福——擁有強大力量，卻也付出沉重代價。',
    quirk: '當你以一種能讓瑪圖什卡自豪的方式教導他人時，獲得１點英雄點。',
    advantages: ['sorcery', 'sorcery', 'survivalist'],
    skills: ['athletics', 'intimidate', 'perform', 'tempt', 'theft'],
    category: 'ussura'
  },
  whaler: {
    key: 'whaler',
    name: '捕鯨者',
    nameEn: 'Whaler',
    description: '你航行於烏蘇拉冰冷的海域，以魚叉與小艇獵殺最危險的海獸。',
    quirk: '當你面對能吞噬整個人類的巨大生物時，獲得１點英雄點。',
    advantages: ['ableDrinker', 'seaLegs', 'patron'],
    skills: ['athletics', 'brawl', 'notice', 'sailing', 'weaponry'],
    category: 'ussura'
  },

  // 維斯騰曼納維爾背景 (Vestenmennavenjar Backgrounds)
  bearsark: {
    key: 'bearsark',
    name: '狂熊戰士',
    nameEn: 'Bearsark',
    description: '你以近乎失控的狂怒作戰，陷入如狂戰之夢般的恍惚。',
    quirk: '當你讓遊戲主持人決定你角色的下一個行動時，獲得１點英雄點。',
    advantages: ['hardToKill', 'ableDrinker'],
    skills: ['brawl', 'intimidate', 'sailing', 'warfare', 'weaponry'],
    category: 'vesten'
  },
  guildmastaren: {
    key: 'guildmastaren',
    name: '公會長',
    nameEn: 'Guildmästaren',
    description: '你是文德爾商聯的管理者之一，負責經營商會。',
    quirk: '當你將商聯龐大資源用於比利益更高尚的目的時，獲得１點英雄點。',
    advantages: ['masterpieceCrafter', 'rich'],
    skills: ['convince', 'empathy', 'ride', 'scholarship', 'tempt'],
    category: 'vesten'
  },
  sjorover: {
    key: 'sjorover',
    name: '維斯騰海盜',
    nameEn: 'Sjørøver／Pirate',
    description: '你傳承維斯騰曼納維爾的古老榮譽，致力於海上戰鬥與掠奪。',
    quirk: '當你為了在眾神之父之席贏得榮耀而身陷險境時，獲得１點英雄點。',
    advantages: ['imTakingYouWithMe', 'staredown'],
    skills: ['brawl', 'intimidate', 'notice', 'sailing', 'weaponry'],
    category: 'vesten'
  },
  skald: {
    key: 'skald',
    name: '詩人',
    nameEn: 'Skald',
    description: '你解讀篝火與骸骨中的奧祕，吟誦榮耀與敗亡的傳說。',
    quirk: '當你以符文詠者的智慧協助他人解決問題或阻止反派時，獲得１點英雄點。',
    advantages: ['seidr', 'seaLegs'],
    skills: ['brawl', 'intimidate', 'perform', 'sailing', 'weaponry'],
    category: 'vesten'
  },

  // 沃達奇背景 (Vodacce Backgrounds)
  bravo: {
    key: 'bravo',
    name: '保鏢',
    nameEn: 'Bravo',
    description: '你宣誓守護某個重要之人，無論何時都會在他身旁。',
    quirk: '當你為了保護所守護之人的性命而身陷危險時，獲得１點英雄點。',
    advantages: ['poisonImmunity', 'hardToKill'],
    skills: ['athletics', 'empathy', 'intimidate', 'notice', 'weaponry'],
    category: 'vodacce'
  },
  consigliere: {
    key: 'consigliere',
    name: '顧問',
    nameEn: 'Consigliere',
    description: '你擔任貿易親王的「顧問」，專司處理機密與謀略。',
    quirk: '當你為了保守他人祕密而冒極大風險時，獲得１點英雄點。',
    advantages: ['wereNotSoDifferent', 'streetwise'],
    skills: ['convince', 'empathy', 'notice', 'ride', 'tempt'],
    category: 'vodacce'
  },
  esploratore: {
    key: 'esploratore',
    name: '探險代理人',
    nameEn: 'Esploratore',
    description: '你受貿易親王之託，代其遠行海外以拓展勢力與情報。',
    quirk: '當你運用非瑟亞世界的物品或知識解決問題時，獲得１點英雄點。',
    advantages: ['lyceum', 'linguist'],
    skills: ['convince', 'empathy', 'intimidate', 'sailing', 'tempt'],
    category: 'vodacce'
  },
  sorteStrega: {
    key: 'sorteStrega',
    name: '命運女巫',
    nameEn: 'Sorte Strega',
    description: '(註:僅限女性英雄可選擇此背景。)\n你能感知命運的絲線，並能扭轉其流向，但這種力量絕非無代價。',
    quirk: '當你選擇一條危險的道路，因相信那是命運的安排時，獲得１點英雄點。',
    advantages: ['sorcery', 'sorcery', 'timeSense'],
    skills: ['convince', 'hide', 'perform', 'ride', 'tempt'],
    category: 'vodacce'
  }
};

/**
 * 取得所有背景列表
 */
export const getBackgrounds = (): Background[] => {
  return Object.values(backgrounds);
};

/**
 * 根據 key 取得特定背景
 */
export const getBackgroundByKey = (key: string): Background | undefined => {
  return backgrounds[key];
};

/**
 * 根據分類篩選背景
 */
export const getBackgroundsByCategory = (category: Background['category']): Background[] => {
  return Object.values(backgrounds).filter(bg => bg.category === category);
};

/**
 * 背景名稱對照表 (英文 -> 中文)
 */
export const backgroundNames: Record<string, string> = {
  // 基礎背景
  archaeologist: '考古學家',
  aristocrat: '貴族',
  armyOfficer: '陸軍軍官',
  artist: '藝術家',
  assassin: '刺客',
  cavalry: '騎兵',
  courtier: '朝臣',
  crafter: '匠人',
  criminal: '罪犯',
  doctor: '醫師',
  duelist: '決鬥者',
  engineer: '工程師',
  explorer: '探險家',
  farmkid: '農莊子弟',
  hunter: '獵人',
  jenny: '交際花',
  mercenary: '傭兵',
  merchant: '商人',
  navalOfficer: '海軍軍官',
  orphan: '孤兒',
  performer: '表演者',
  pirate: '海盜',
  priest: '牧師',
  professor: '教授',
  pugilist: '拳鬥士',
  quartermaster: '船務長',
  sailor: '水手',
  scholar: '學者',
  servant: '僕役',
  shipCaptain: '船長',
  soldier: '士兵',
  spy: '間諜',
  // 幻魅群島
  bard: '吟遊詩人',
  knightErrant: '遊俠騎士',
  privateer: '私掠船長',
  unificationAgent: '統合特使',
  // 阿瓦隆
  puritan: '清教徒',
  // 伊尼斯摩
  saoi: '智者',
  // 高地行省
  seanchaidh: '武詩者',
  // 卡施緹耶
  alquimista: '鍊金術師',
  antropologo: '人類學者',
  diestro: '劍術宗師',
  mirabilis: '奇蹟教士',
  // 艾森
  hexe: '赫森術師',
  krieger: '戰士',
  ungetumjager: '獵魔人',
  vitalienbruder: '維塔連兄弟',
  // 蒙泰涅
  lamiDuRoi: '國王之友',
  mousquetaire: '火槍衛士',
  revolutionnaire: '革命者',
  sorcierPorte: '傳門術士',
  // 薩馬提亞聯邦
  posel: '使節',
  tremtis: '流亡者',
  wingedHussar: '翼騎兵',
  zynys: '占卜祭司',
  // 烏蘇拉
  cossack: '哥薩克',
  progressivist: '進步主義者',
  touchedByMatushka: '瑪圖什卡之觸',
  whaler: '捕鯨者',
  // 維斯騰曼納維爾
  bearsark: '狂熊戰士',
  guildmastaren: '公會長',
  sjorover: '維斯騰海盜',
  skald: '詩人',
  // 沃達奇
  bravo: '保鏢',
  consigliere: '顧問',
  esploratore: '探險代理人',
  sorteStrega: '命運女巫'
};

/**
 * 分類名稱對照表
 */
export const categoryNames: Record<Background['category'], string> = {
  basic: '基礎背景',
  glamourIsles: '幻魅群島背景',
  avalon: '阿瓦隆背景',
  inismore: '伊尼斯摩背景',
  highlandMarches: '高地行省背景',
  castille: '卡施緹耶背景',
  eisen: '艾森背景',
  montaigne: '蒙泰涅背景',
  sarmatian: '薩馬提亞聯邦背景',
  ussura: '烏蘇拉背景',
  vesten: '維斯騰曼納維爾背景',
  vodacce: '沃達奇背景'
};
