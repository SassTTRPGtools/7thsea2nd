# 7th Sea 2nd Edition - 遊戲資料使用說明

## 概述

本專案包含了 7th Sea 2nd Edition 的基本遊戲資料，包括角色屬性（Traits）、技能（Skills）、國家（Nations）和優勢（Advantages）。

## 資料結構

### 屬性 (Traits)

位置：`app/data/traits.ts`

包含五大基本屬性：
- **體魄 (Brawn)**: 代表英雄的力量與體能
- **靈巧 (Finesse)**: 衡量英雄的協調與敏捷
- **堅毅 (Resolve)**: 代表英雄的意志力與耐力
- **機智 (Wits)**: 衡量英雄臨機應變的反應速度
- **風采 (Panache)**: 代表英雄的魅力與個人風格

### 技能 (Skills)

位置：`app/data/skills.ts`

包含 16 項技能：
- 瞄準 (Aim)
- 運動 (Athletics)
- 格鬥 (Brawl)
- 說服 (Convince)
- 洞悉 (Empathy)
- 隱匿 (Hide)
- 威嚇 (Intimidate)
- 察覺 (Notice)
- 表演 (Perform)
- 騎乘 (Ride)
- 航海 (Sailing)
- 學識 (Scholarship)
- 誘惑 (Tempt)
- 竊盜 (Theft)
- 戰術 (Warfare)
- 武技 (Weaponry)

### 國家 (Nations)

位置：`app/data/nations.ts`

包含 10 個瑟亞國家：
- **阿瓦隆 (Avalon)**: +1 風采或堅毅
- **伊尼斯摩 (Inismore)**: +1 風采或機智
- **高地行省 (The Highland Marches)**: +1 體魄或靈巧
- **卡施緹耶 (Castille)**: +1 靈巧或機智
- **艾森 (Eisen)**: +1 體魄或堅毅
- **蒙泰涅 (Montaigne)**: +1 靈巧或風采
- **薩馬提亞聯邦 (The Sarmatian Commonwealth)**: +1 體魄或風采
- **烏蘇拉 (Ussura)**: +1 堅毅或機智
- **維斯騰曼納維爾 (Vestenmennavenjar)**: +1 體魄或機智
- **沃達奇 (Vodacce)**: +1 靈巧或堅毅

每個國家包含：
- 屬性加值選項（二選一）
- 國家概述與歷史背景
- 外貌特徵
- 常見職業
- 宗教信仰
- 文化態度

### 優勢 (Advantages)

位置：`app/data/advantages.ts`

包含角色可購買的優勢，共 76 個，分為五種成本等級：

#### 一點優勢 (1 Point Advantages) - 10 個
- 強健酒徒、鑄鐵胃、方向感、外國出身 👤、體型巨大 👤、語言學者、海上步伐、體型嬌小 👤、生存專家、時間感知

#### 二點優勢 (2 Point Advantages) - 26 個
- 精明交易者 ★、嫵媚召喚 ★、人脈關係、動人微笑 ★、鷹眼、擴大家族 ★、魅惑專注 ★、宮廷好友 ★、我辦得到！★、巧手匠人 ★、堅定意志 ★、激發慷慨 ★、領導才能 ★、海之所屬、完美平衡 ★、免疫毒性、嘿，這邊！★、不顧一切擊倒 ★、名聲、攀牆高手 ★、脫困之技 ★、巫術、凝視壓迫 ★、街頭智慧 ★、團隊夥伴、勇毅之魂

#### 三點優勢 (3 Point Advantages) - 20 個
- 善意誤會 ★、酒吧鬥士、拳擊手、重擊者、擦肩暗手 ★、同袍情誼、神射手、機動作法 ★、劍士、人間颱風、傑作工匠、機運之徒 ★、受任聖職、贊助者、快速反應、富裕、標誌物品、狙擊手、大學終身職、名家藝匠

#### 四點優勢 (4 Point Advantages) - 11 個
- 軍事學院 👤、鍊金術師 ★（僅限卡施緹耶）、難以殺死、傳奇屬性、貴族學院 👤、奇蹟醫者 ★、鎮暴者、符文詠者 ★（僅限維斯騰曼納維爾）、專精者、忠誠夥伴、大學學者 👤

#### 五點優勢 (5 Point Advantages) - 9 個
- 決鬥學院、我不會死在這裡 ★、我要拉你下地獄 ★、生命樂章 ★、天才火花 ★、十人之力 ★、惡魔之運 ★、同心協力 ★、我們並無不同… ★

圖例：
- ★ = 需要消耗英雄點才能啟用的優勢
- 👤 = 個人特質（影響角色體質或背景）

#### 條件性成本減免
多個優勢具有國籍相關的成本減免：

**一至二點優勢：**
- **精明交易者**: 幻魅群島出身僅需 1 點
- **擴大家族**: 烏蘇拉出身僅需 1 點
- **領導才能**: 薩馬提亞聯邦出身僅需 1 點
- **免疫毒性**: 沃達奇出身僅需 1 點
- **凝視壓迫**: 艾森出身僅需 1 點

### 阿爾克那 (Arcana)

位置：`app/data/arcanas.ts`

包含 20 張命運之牌，每張牌包含一項美德與一項傲性：

#### 美德 (Virtue)
主動啟動的強力效果，幫助英雄度過困境。每位英雄選擇一項美德。

#### 傲性 (Hubris)
角色性格缺陷，當按照傲性行動時可獲得英雄點。每位英雄選擇一項傲性。

**注意**：美德與傲性不必出自同一張牌。

#### 阿爾克那清單（20 張牌）

1. **愚者** (The Fool) - 美德：機敏 / 傲性：好奇
2. **旅途** (The Road) - 美德：友善 / 傲性：缺乏自信
3. **魔術師** (The Magician) - 美德：堅定 / 傲性：野心
4. **戀人** (The Lovers) - 美德：熱情 / 傲性：命運多舛
5. **命運之輪** (The Wheel) - 美德：幸運 / 傲性：不幸
6. **惡魔** (The Devil) - 美德：敏銳 / 傲性：輕信
7. **高塔** (The Tower) - 美德：謙遜 / 傲性：傲慢
8. **乞者** (The Beggar) - 美德：洞察 / 傲性：嫉妒
9. **女巫** (The Witch) - 美德：直覺 / 傲性：操弄
10. **戰爭** (The War) - 美德：凱旋 / 傲性：忠誠
11. **吊人** (The Hanged Man) - 美德：無私 / 傲性：猶豫
12. **擺渡錢幣** (Coins, for the Ferryman) - 美德：適應 / 傲性：執著
13. **王座** (The Thrones) - 美德：安慰 / 傲性：固執
14. **無月之夜** (The Moonless Night) - 美德：隱密 / 傲性：混亂
15. **太陽** (The Sun) - 美德：光輝 / 傲性：驕傲
16. **先知** (The Prophet) - 美德：洞明 / 傲性：過於狂熱
17. **重逢** (Reunion) - 美德：模範 / 傲性：怨懟
18. **英雄** (The Hero) - 美德：勇敢 / 傲性：魯莽
19. **符印** (The Glyph) - 美德：節制 / 傲性：迷信
20. **皇帝** (The Emperor) - 美德：威嚴 / 傲性：暴躁

**三點優勢：**
- **同袍情誼**: 蒙泰涅出身僅需 2 點
- **傑作工匠**: 維斯騰曼納維爾出身僅需 2 點
- **受任聖職**: 卡施緹耶出身僅需 2 點

**五點優勢（國家專屬強力優勢）：**
- **我不會死在這裡**: 艾森出身僅需 3 點
- **我要拉你下地獄**: 維斯騰曼納維爾出身僅需 3 點
- **生命樂章**: 蒙泰涅出身僅需 3 點
- **天才火花**: 卡施緹耶出身僅需 3 點
- **十人之力**: 烏蘇拉出身僅需 3 點
- **惡魔之運**: 幻魅群島出身僅需 3 點
- **同心協力**: 薩馬提亞聯邦出身僅需 3 點
- **我們並無不同…**: 沃達奇出身僅需 3 點

## 使用方式

### 1. 直接導入資料

```typescript
// 導入所有資料
import { traits, skills, nations, advantages, arcanas } from '~/data';

// 使用特定屬性
const brawn = traits.brawn;
console.log(brawn.name); // "體魄"
console.log(brawn.description); // "代表英雄的力量與體能。"

// 使用特定技能
const aim = skills.aim;
console.log(aim.name); // "瞄準"

// 使用特定國家
const avalon = nations.avalon;
console.log(avalon.name); // "阿瓦隆"
console.log(avalon.traitBonuses); // [{ trait: 'panache', label: '風采' }, ...]

// 使用特定優勢
const linguist = advantages.linguist;
console.log(linguist.name); // "語言學者"
console.log(linguist.cost); // 1

// 使用特定阿爾克那
const fool = arcanas.fool;
console.log(fool.name); // "愚者"
console.log(fool.virtue.name); // "機敏"
console.log(fool.hubris.name); // "好奇"
```

### 2. 使用 Composable（推薦）

```typescript
// 在 Vue 組件中使用
const { 
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
  getNationTraitBonuses,
  getAdvantagesByPointCost,
  getActualAdvantageCost
} = useGameData();

// 取得所有屬性
const allTraits = getAllTraits();

// 取得特定屬性
const brawn = getTraitByKey('brawn');

// 取得所有技能
const allSkills = getAllSkills();

// 取得特定技能
const aim = getSkillByKey('aim');

// 取得所有國家
const allNations = getAllNations();

// 取得特定國家
const avalon = getNationByKey('avalon');

// 取得國家的屬性加值選項
const avalonBonuses = getNationTraitBonuses('avalon');
// 返回: [{ trait: 'panache', label: '風采' }, { trait: 'resolve', label: '堅毅' }]

// 取得所有優勢
const allAdvantages = getAllAdvantages();

// 取得特定優勢
const linguist = getAdvantageByKey('linguist');

// 根據成本取得優勢列表
const onePointAdvantages = getAdvantagesByPointCost(1);
const twoPointAdvantages = getAdvantagesByPointCost(2);

// 取得優勢的實際成本（考慮國籍減免）
const cost1 = getActualAdvantageCost('barterer', 'avalon'); // 1 (幻魅群島減免)
const cost2 = getActualAdvantageCost('barterer', 'eisen'); // 2 (無減免)

// 取得所有阿爾克那
const allArcanas = getAllArcanas();

// 取得特定阿爾克那
const fool = getArcanaByKey('fool');

// 取得所有美德
const allVirtues = getAllVirtues();

// 取得所有傲性
const allHubris = getAllHubris();
```

### 3. 在 Vue 組件中使用

```vue
<template>
  <div>
    <h2>選擇你的國家</h2>
    <div v-for="nation in allNations" :key="nation.key">
      <h3>{{ nation.name }}</h3>
      <p>{{ nation.description }}</p>
      <div>
        <span>可選屬性加值：</span>
        <span v-for="bonus in nation.traitBonuses" :key="bonus.trait">
          +1 {{ bonus.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAllNations } = useGameData();
const allNations = getAllNations();
</script>
```

### 4. 範例組件

- 查看 `app/components/GameDataExample.vue` 以獲得屬性和技能的使用範例
- 查看 `app/components/NationsDisplay.vue` 以獲得國家資訊的完整展示範例
- 查看 `app/components/AdvantagesDisplay.vue` 以獲得優勢系統的完整展示範例（包含成本計算與條件減免）
- 查看 `app/components/ArcanasDisplay.vue` 以獲得阿爾克那系統的完整展示範例（包含隨機抽牌功能）

## 資料類型

### Trait 介面

```typescript
interface Trait {
  key: string;        // 英文鍵值（如 'brawn'）
  name: string;       // 中文名稱（如 '體魄'）
  description: string; // 說明文字
}
```

### Skill 介面

```typescript
interface Skill {
  key: string;        // 英文鍵值（如 'aim'）
  name: string;       // 中文名稱（如 '瞄準'）
  description: string; // 說明文字
}
```

### Nation 介面

```typescript
interface TraitBonus {
  trait: string;      // 屬性 key（如 'brawn'）
  label: string;      // 屬性中文名（如 '體魄'）
}

interface Nation {
  key: string;                  // 英文鍵值（如 'avalon'）
  name: string;                 // 中文名稱（如 '阿瓦隆'）
  traitBonuses: TraitBonus[];   // 屬性加值選項
  description: string;          // 國家概述
  appearance?: string;          // 外貌描述
  commonProfessions?: string;   // 常見職業
  religion?: string;            // 宗教信仰
  attitude?: string;            // 文化態度
}
```

### Advantage 介面

```typescript
interface Advantage {
  key: string;                  // 英文鍵值（如 'linguist'）
  name: string;                 // 中文名稱（如 '語言學者'）
  cost: number;                 // 成本點數（1-5）
  description: string;          // 效果說明
  isHeroPoint?: boolean;        // 是否需要消耗英雄點才能啟用（標記 ★）
  isPersonal?: boolean;         // 是否為個人特質（標記 👤）
  conditionalCost?: {           // 條件性成本減免
    nation?: string;            // 適用國家 key
    condition?: string;         // 條件說明
    reducedCost: number;        // 減免後成本
  }[];
}
```

### Arcana 介面

```typescript
interface Virtue {
  key: string;              // 美德鍵值（如 'wary'）
  arcanaKey: string;        // 所屬阿爾克那（如 'fool'）
  name: string;             // 美德名稱（如 '機敏'）
  description: string;      // 完整說明
  activation: string;       // 啟動條件
  effect: string;           // 效果
}

interface Hubris {
  key: string;              // 傲性鍵值（如 'curious'）
  arcanaKey: string;        // 所屬阿爾克那（如 'fool'）
  name: string;             // 傲性名稱（如 '好奇'）
  description: string;      // 完整說明
  trigger: string;          // 觸發條件
  reward: string;           // 獎勵（通常是英雄點）
}

interface Arcana {
  key: string;              // 英文鍵值（如 'fool'）
  name: string;             // 中文名稱（如 '愚者'）
  nameEn: string;           // 英文名稱（如 'The Fool'）
  virtue: Virtue;           // 美德
  hubris: Hubris;           // 傲性
}
```

## 檔案結構

```
app/
├── data/
│   ├── index.ts        # 統一匯出
│   ├── traits.ts       # 屬性資料
│   ├── skills.ts       # 技能資料
│   ├── nations.ts      # 國家資料
│   ├── advantages.ts   # 優勢資料
│   └── arcanas.ts      # 阿爾克那資料
├── composables/
│   └── useGameData.ts  # 資料存取 composable
└── components/
    ├── GameDataExample.vue    # 屬性技能範例
    ├── NationsDisplay.vue     # 國家資訊展示
    ├── AdvantagesDisplay.vue  # 優勢系統展示
    └── ArcanasDisplay.vue     # 阿爾克那系統展示
```

## 擴充說明

如需新增其他遊戲資料（如背景、優勢等），可以參照現有的 `traits.ts` 和 `skills.ts` 結構：

1. 在 `app/data/` 目錄下建立新的 `.ts` 檔案
2. 定義相應的介面（Interface）
3. 建立資料物件
4. 在 `app/data/index.ts` 中匯出
5. 在 `app/composables/useGameData.ts` 中新增相關方法

## 注意事項

- 所有 key 值均使用小寫英文
- 資料採用 TypeScript 以提供型別安全
- 使用 Record 類型以支援快速鍵值查詢
- Composable 採用 Nuxt 3 的 auto-import 機制
