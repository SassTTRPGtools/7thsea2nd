# 7th Sea 2nd Edition - 遊戲資料使用說明

## 概述

本專案包含了 7th Sea 2nd Edition 的基本遊戲資料，包括角色屬性（Traits）、技能（Skills）和國家（Nations）。

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

## 使用方式

### 1. 直接導入資料

```typescript
// 導入所有資料
import { traits, skills, nations } from '~/data';

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
```

### 2. 使用 Composable（推薦）

```typescript
// 在 Vue 組件中使用
const { 
  getAllTraits, 
  getAllSkills,
  getAllNations,
  getTraitByKey, 
  getSkillByKey,
  getNationByKey,
  getNationTraitBonuses
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

## 檔案結構

```
app/
├── data/
│   ├── index.ts        # 統一匯出
│   ├── traits.ts       # 屬性資料
│   ├── skills.ts       # 技能資料
│   └── nations.ts      # 國家資料
├── composables/
│   └── useGameData.ts  # 資料存取 composable
└── components/
    ├── GameDataExample.vue  # 屬性技能範例
    └── NationsDisplay.vue   # 國家資訊展示
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
