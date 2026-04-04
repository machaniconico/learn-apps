import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STORYBOOK_LESSONS } from "@/lib/lessons-data";

export default function StorybookAdvancedPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">Storybook レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">実践的な活用</h1>
        <p className="text-gray-400">アドオン、ビジュアルテスト、ドキュメント生成、CI/CDとの連携を学ぼう</p>
      </div>

      {/* 主要アドオン */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">主要なアドオン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookの機能は<strong className="text-pink-400">アドオン</strong>で拡張できます。
          <code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">@storybook/addon-essentials</code>には
          よく使うアドオンがバンドルされていますが、個別に追加できるものも多くあります。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">@storybook/addon-a11y</h3>
            <p className="text-gray-300 text-sm mb-2">
              axe-coreを使ったアクセシビリティの自動チェック。WCAG違反をリアルタイムで検出し、
              修正方法をガイドしてくれます。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">コントラスト不足、alt属性の欠落、ARIA属性の誤用を検出</code>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">@storybook/addon-viewport</h3>
            <p className="text-gray-300 text-sm mb-2">
              モバイル、タブレット、デスクトップなど、様々な画面サイズでのプレビューを切り替えられます。
              カスタムビューポートの定義も可能です。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">iPhone SE、iPad、デスクトップなどのプリセット</code>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">@storybook/addon-actions</h3>
            <p className="text-gray-300 text-sm mb-2">
              onClickなどのイベントハンドラの呼び出しをActionsパネルに記録・表示します。
              コールバック関数の動作確認に便利です。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">argTypesのaction設定で自動的にActionsパネルにログ出力</code>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">@storybook/addon-backgrounds</h3>
            <p className="text-gray-300 text-sm mb-2">
              背景色を切り替えてコンポーネントの見え方を確認できます。
              ダークモード対応やコントラストの確認に活用できます。
            </p>
            <code className="text-pink-400 text-xs bg-gray-900 px-2 py-1 rounded">ライト・ダーク背景の切り替え</code>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// .storybook/main.ts でアドオンを追加
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",  // 基本セット
    "@storybook/addon-a11y",        // アクセシビリティ
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};

// インストール
// npm install -D @storybook/addon-a11y`}</code>
        </pre>
      </section>

      {/* ビジュアルリグレッションテスト */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ビジュアルリグレッションテスト</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビジュアルリグレッションテストは、UIのスクリーンショットを前回と比較して
          <strong className="text-pink-400">意図しない見た目の変更</strong>を検出する手法です。
          Storybookとの連携により、各ストーリーを自動でスクリーンショット比較できます。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">Chromatic（推奨）</h3>
            <p className="text-gray-300 text-sm">
              Storybook公式のビジュアルテストサービス。クラウド上でストーリーのスクリーンショットを
              取得・比較し、PRにレビューコメントを自動追加します。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">その他のツール</h3>
            <p className="text-gray-300 text-sm">
              Percy、reg-suit、Playwrightのスクリーンショット比較など、
              セルフホスト型のソリューションも利用可能です。
            </p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Chromaticのセットアップ
npm install -D chromatic

# ビジュアルテストを実行
npx chromatic --project-token=<your-token>

# CI（GitHub Actions）での自動実行例
# .github/workflows/chromatic.yml
name: Chromatic
on: push
jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: chromaui/action@latest
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          PRごとにビジュアル差分が自動検出されるため、CSSの変更やコンポーネントの修正が
          他のUIに影響していないかを確認できます。
        </p>
      </section>

      {/* ドキュメント自動生成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ドキュメント自動生成</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookの<strong className="text-pink-400">autodocs</strong>機能を使うと、
          コンポーネントのprops、ストーリー、ソースコードから自動的にドキュメントページが生成されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// metaにtags: ["autodocs"]を追加するだけ
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],   // ← これだけでDocsページが生成される
  argTypes: {
    variant: {
      description: "ボタンのスタイルバリエーション",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: "ボタンのサイズ",
      table: {
        defaultValue: { summary: "md" },
      },
    },
  },
};

// 自動生成されるDocsページには以下が含まれる:
// - コンポーネントの説明（JSDocコメントから取得）
// - Propsテーブル（型、デフォルト値、説明）
// - 全ストーリーのプレビュー
// - ソースコードの表示`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          さらに、MDXファイルを使ってカスタムドキュメントを作成することも可能です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// src/docs/GettingStarted.mdx
import { Meta, Story, Canvas } from "@storybook/blocks";
import * as ButtonStories from "../components/Button.stories";

<Meta title="Guides/Getting Started" />

# はじめに

このデザインシステムの使い方を説明します。

## Buttonコンポーネント

基本的なボタンコンポーネントです。

<Canvas of={ButtonStories.Primary} />

### バリエーション

<Canvas>
  <Story of={ButtonStories.Primary} />
  <Story of={ButtonStories.Secondary} />
</Canvas>`}</code>
        </pre>
      </section>

      {/* CI/CDとの連携 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CI/CDとの連携</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookをビルドして静的サイトとしてデプロイすることで、チーム全員がコンポーネントカタログにアクセスできます。
          CIパイプラインにインタラクションテストやビジュアルテストを組み込むことも重要です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# Storybookを静的サイトとしてビルド
npm run build-storybook
# → storybook-static/ ディレクトリに出力

# test-runnerでインタラクションテストをCIで実行
npm install -D @storybook/test-runner
npx test-storybook --url http://localhost:6006`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# GitHub Actionsの例
# .github/workflows/storybook.yml
name: Storybook CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci

      # Storybookをバックグラウンドで起動
      - run: npx storybook dev -p 6006 --ci &
      - run: npx wait-on http://localhost:6006

      # インタラクションテスト実行
      - run: npx test-storybook

      # 静的ビルド（デプロイ用）
      - run: npm run build-storybook

      # デプロイ（例: GitHub Pages）
      - uses: actions/upload-pages-artifact@v3
        with:
          path: storybook-static/`}</code>
        </pre>
      </section>

      {/* デザインシステムワークフロー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">デザインシステムワークフロー</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookはデザインシステムの構築・運用の中心的なツールです。
          デザイナーと開発者の<strong className="text-pink-400">共通言語</strong>として機能し、
          コンポーネントの一貫性を保ちます。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">1. デザイントークンの定義</h3>
            <p className="text-gray-300 text-sm">
              カラー、タイポグラフィ、スペーシングなどのデザイントークンをStorybookでドキュメント化。
              Figmaのデザイントークンと同期させることも可能です。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">2. コンポーネントの開発</h3>
            <p className="text-gray-300 text-sm">
              Storybook上でコンポーネントを開発し、全バリエーションをストーリーとして登録。
              デザイナーがブラウザで実装を確認できます。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">3. レビューとテスト</h3>
            <p className="text-gray-300 text-sm">
              PRごとにChromaticでビジュアルテスト、a11yアドオンでアクセシビリティチェック、
              play functionsでインタラクションテストを自動実行。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">4. 公開とメンテナンス</h3>
            <p className="text-gray-300 text-sm">
              Storybookを静的サイトとしてデプロイし、チーム全体のリファレンスとして活用。
              npmパッケージとして配布することで、複数プロジェクトで共有できます。
            </p>
          </div>
        </div>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# デザインシステムの典型的なディレクトリ構造
design-system/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── tokens/
│   │   ├── colors.ts           # カラートークン
│   │   ├── typography.ts       # タイポグラフィ
│   │   └── spacing.ts          # スペーシング
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.test.tsx
│   │   └── Card/
│   │       ├── Card.tsx
│   │       ├── Card.stories.tsx
│   │       └── Card.test.tsx
│   └── docs/
│       ├── Introduction.mdx     # カスタムドキュメント
│       └── ColorPalette.mdx
└── package.json`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>a11y、viewport、actions、backgroundsなどのアドオンで機能を拡張できる</li>
          <li>Chromaticなどを使ったビジュアルリグレッションテストでUIの意図しない変更を検出</li>
          <li>autodocsとMDXでコンポーネントのドキュメントを自動・手動で生成できる</li>
          <li>CI/CDパイプラインにビルド、テスト、デプロイを組み込んで品質を自動化</li>
          <li>Storybookはデザインシステムの構築・運用において開発者とデザイナーの共通基盤となる</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="storybook" lessonId="advanced" color="pink" />
      <LessonNav lessons={STORYBOOK_LESSONS} currentId="advanced" basePath="/learn/storybook" color="pink" />
    </div>
  );
}
