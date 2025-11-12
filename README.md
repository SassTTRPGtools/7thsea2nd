# 7th Sea 2nd Edition - 角色表系統

這是一個基於 Nuxt 3 構建的《七海傳奇》第二版 TTRPG 角色管理系統，提供完整的角色創建、管理和追蹤功能。

## 功能特色

### 🎲 完整的遊戲資料系統
- **5 種屬性 (Traits)**: 蠻力、靈巧、意志、機智、魅力
- **16 種技能 (Skills)**: 涵蓋戰鬥、社交、探索等各方面
- **10 個國家**: 詳細的文化背景和特色
- **76 個優勢 (Advantages)**: 5 個成本層級，支援國籍折扣
- **20 張阿爾克那 (Arcana)**: 每張卡包含美德和傲性

### 📝 互動式角色表
訪問 `/2ndCharacter` 頁面使用完整的角色表功能：

1. **基本資訊**: 玩家、角色名、概念、國籍、宗教、財富、聲望
2. **屬性與技能**: 圓圈選擇介面，即時顯示總點數
3. **阿爾克那選擇**: 從 20 張牌中選擇美德和傲性
4. **背景故事**: 管理角色背景
5. **優勢管理**: 篩選、選擇優勢，自動計算成本（含國籍折扣）
6. **英雄故事**: 追蹤角色的個人目標和進度
7. **死亡螺旋**: 視覺化的傷勢追蹤系統
8. **資料匯出/匯入**: JSON 格式儲存和載入角色

### 💾 角色資料管理
- 使用 Pinia Store 進行狀態管理
- 支援角色資料匯出為 JSON
- 可匯入已儲存的角色檔案
- 一鍵重置功能

## 技術架構

- **框架**: Nuxt 3.14.15
- **UI 框架**: Vue 3.5.17
- **樣式**: Tailwind CSS 6.14.0
- **狀態管理**: Pinia 3.0.3
- **TypeScript**: 完整類型支援

## 專案結構

```
app/
├── data/              # 遊戲資料
│   ├── traits.ts      # 屬性定義
│   ├── skills.ts      # 技能定義
│   ├── nations.ts     # 國家定義
│   ├── advantages.ts  # 優勢定義 (76 個)
│   ├── arcanas.ts     # 阿爾克那定義 (20 張)
│   └── index.ts       # 統一匯出
├── stores/            # Pinia 狀態管理
│   └── characterStore.ts  # 角色資料 Store
├── composables/       # 組合式函數
│   └── useGameData.ts # 遊戲資料存取 API
├── components/        # Vue 組件
│   ├── CharacterInfo.vue      # 基本資訊
│   ├── TraitsSection.vue      # 屬性選擇
│   ├── SkillsSection.vue      # 技能選擇
│   ├── ArcanaSection.vue      # 阿爾克那選擇
│   ├── BackgroundsSection.vue # 背景管理
│   ├── AdvantagesSection.vue  # 優勢選擇
│   ├── StoriesSection.vue     # 英雄故事
│   └── DeathSpiralSection.vue # 死亡螺旋
├── pages/             # 路由頁面
│   ├── index.vue      # 首頁
│   └── 2ndCharacter.vue # 角色表主頁面
└── assets/            # 靜態資源
    ├── logo.png
    ├── death_spiral.png
    └── sheet_background.jpg
```

## 快速開始

## 快速開始

### 安裝依賴

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 開發伺服器

Start the development server on `http://localhost:3000/7thsea/`:

```bash
npm run dev
```

訪問 `http://localhost:3000/7thsea/2ndCharacter` 開始使用角色表系統。

## 主要頁面

- **首頁** (`/`): 系統介紹和資料展示
- **角色表** (`/2ndCharacter`): 完整的互動式角色表

## API 使用範例

```typescript
// 在組件中使用
import { useGameData } from '~/composables/useGameData';

const {
  getAllTraits,
  getAllSkills,
  getAllNations,
  getAllAdvantages,
  getAllArcanas,
  getActualAdvantageCost
} = useGameData();

// 取得所有優勢
const advantages = getAllAdvantages();

// 計算優勢實際成本（含國籍折扣）
const cost = getActualAdvantageCost('advantageKey', 'nationKey');
```

## 角色資料結構

```typescript
interface CharacterData {
  // 基本資訊
  player: string;
  characterName: string;
  concept: string;
  nation: string;
  religion: string;
  reputations: string[];
  wealth: number;

  // 屬性 (1-5)
  traits: { brawn, finesse, resolve, wits, panache };

  // 技能 (0-5)
  skills: { aim, athletics, brawl, ... };

  // 阿爾克那
  virtue: { arcanaKey, virtueKey, name };
  hubris: { arcanaKey, hubrisKey, name };

  // 其他
  backgrounds: string[];
  advantages: string[];
  stories: Array<{...}>;
  deathSpiral: {...};
}
```

## 文件說明

- **README.md**: 專案總覽和使用說明
- **ADVANTAGES_SUMMARY.md**: 完整的 76 個優勢列表

## 開發團隊

- 框架: Nuxt 3
- 遊戲規則: 7th Sea 2nd Edition by John Wick Presents

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
