<div align="center">

# ⛏️ SkillMiner

### あなたの中に眠る、収益化可能なスキルを採掘する

**AI-Powered Skill Discovery Platform**

AIがあなたのSNS・経歴・趣味を分析し、本人も気づいていない収益化可能なスキルを発見。  
自動でスキルと案件をマッチングし、副業開始までサポートします。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AIスキル分析** | OpenAI GPT-4がユーザーの経験・趣味・SNSデータを分析し、隠れた収益化可能スキルを発見 |
| 🎯 **ニッチ案件マッチング** | 競合の少ない注目案件を自動マッチング。マッチ率・報酬・難易度を表示 |
| 🗺️ **スキル開発ロードマップ** | 8週間のカスタムロードマップで副業開始まで完全サポート |
| 🔗 **SNS連携分析** | Twitter/LinkedIn のデータからスキルパターンを検出 |
| 📊 **ダッシュボード** | スキルレーダーチャート、タイムライン、推奨アクションを一覧表示 |

---

## 🖥️ Screenshots

<details>
<summary>📸 スクリーンショットを見る</summary>

### ランディングページ
ダークテーマ＋ゴールドグラデーションのプレミアムデザイン

### オンボーディング
4ステップウィザード（基本情報→スキル選択→趣味→SNS連携）

### AI分析結果
マイニングアニメーション後、発見スキルを順次表示

### 案件マッチング
マッチ率リングチャート、フィルター/ソート機能

### ダッシュボード
サイドバーナビ、スキルレーダーチャート、ロードマップタイムライン

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x 以上
- **npm** 9.x 以上
- **OpenAI API Key**（任意 — なくてもモックモードで動作します）

### Installation

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/skillminer.git
cd skillminer

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env
# .env を編集して API キーを設定

# データベースをセットアップ
npx prisma migrate dev --name init

# 開発サーバーを起動
npm run dev
```

→ **https://skill-miner.vercel.app/** にアクセス

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | SQLite DB パス（デフォルト: `file:./dev.db`） |
| `NEXTAUTH_SECRET` | ✅ | NextAuth セッション暗号化キー |
| `NEXTAUTH_URL` | ✅ | アプリの URL（`http://localhost:3000`） |
| `OPENAI_API_KEY` | ❌ | OpenAI API キー（未設定時はモックモード） |
| `TWITTER_API_KEY` | ❌ | Twitter API キー |
| `LINKEDIN_CLIENT_ID` | ❌ | LinkedIn Client ID |

---

## 🏗️ Tech Stack

```
Frontend:  Next.js 16 (App Router) + TypeScript + Framer Motion
Styling:   CSS Modules + Custom Design System
Backend:   Next.js API Routes + NextAuth.js v5
Database:  SQLite + Prisma 6
AI:        OpenAI GPT-4 (with mock fallback)
```

## 📁 Project Structure

```
skillminer/
├── prisma/
│   └── schema.prisma          # DB スキーマ
├── src/
│   ├── app/
│   │   ├── page.tsx           # ランディングページ
│   │   ├── globals.css        # デザインシステム
│   │   ├── auth/signin/       # 認証ページ
│   │   ├── onboarding/        # オンボーディング
│   │   ├── analysis/          # AI分析結果
│   │   ├── matching/          # 案件マッチング
│   │   ├── dashboard/         # ダッシュボード
│   │   └── api/               # API Routes
│   │       ├── analyze/       # AI分析エンドポイント
│   │       ├── register/      # ユーザー登録
│   │       └── auth/          # NextAuth
│   └── lib/
│       ├── openai.ts          # OpenAI 連携
│       ├── prisma.ts          # Prisma クライアント
│       ├── auth.ts            # NextAuth 設定
│       └── sns.ts             # SNS 連携
└── .env.example
```

---

## 🔧 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/register` | ユーザー新規登録 |
| `POST` | `/api/analyze` | AI スキル分析実行 |
| `GET/POST` | `/api/auth/[...nextauth]` | 認証（NextAuth） |

### `/api/analyze` Request Body

```json
{
  "skills": ["プログラミング", "データ分析"],
  "hobbies": ["読書", "ブログ"],
  "occupation": "ソフトウェアエンジニア",
  "twitterUsername": "@example",
  "linkedinUsername": "example-user"
}
```

---

## 🎨 Design System

- **テーマ**: ダーク × ゴールド（採掘テーマ）
- **フォント**: Inter + Outfit（Google Fonts）
- **エフェクト**: グラスモーフィズム、パーティクル背景
- **アニメーション**: Framer Motion によるページトランジション

---

## 📄 License

MIT License

---

<div align="center">

**Built with ❤️ and AI**

⛏️ *あなたの隠れたスキルを発見しましょう*

</div>
