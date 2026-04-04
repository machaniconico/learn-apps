import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STORYBOOK_LESSONS } from "@/lib/lessons-data";

export default function StorybookBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">Storybook レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Storybookの基本</h1>
        <p className="text-gray-400">コンポーネントカタログとは何か、セットアップから最初のストーリーまでを学ぼう</p>
      </div>

      {/* Storybookとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Storybookとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookは、UIコンポーネントを<strong className="text-pink-400">アプリケーションから独立した環境</strong>で
          開発・テスト・ドキュメント化するためのオープンソースツールです。
          React、Vue、Angular、Svelte、Web Componentsなど主要なフレームワークに対応しています。
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">Storybookがない場合</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>コンポーネントの確認にアプリ全体の起動が必要</li>
              <li>特定の状態の再現が手間（エラー状態、ローディング等）</li>
              <li>デザイナーとの認識合わせが難しい</li>
              <li>コンポーネントの一覧性がない</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">Storybookがある場合</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>コンポーネント単体で即座に確認・操作できる</li>
              <li>あらゆる状態をストーリーとして定義・再現可能</li>
              <li>デザイナーもブラウザで確認できる</li>
              <li>コンポーネントカタログとして一覧管理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* コンポーネント駆動開発 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">コンポーネント駆動開発（CDD）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          コンポーネント駆動開発（Component-Driven Development）は、UIを小さなコンポーネントから
          ボトムアップで構築していく手法です。Storybookはこの開発スタイルの中核ツールです。
        </p>
        <div className="space-y-3 mb-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">1. Atoms（原子）</h3>
            <p className="text-gray-300 text-sm">ボタン、入力欄、アイコンなど最小単位のUI要素</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">2. Molecules（分子）</h3>
            <p className="text-gray-300 text-sm">検索バー（入力欄＋ボタン）のようなAtomsの組み合わせ</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">3. Organisms（有機体）</h3>
            <p className="text-gray-300 text-sm">ヘッダー、サイドバーなどMoleculesを含む複合コンポーネント</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-white mb-1">4. Pages（ページ）</h3>
            <p className="text-gray-300 text-sm">Organismsを配置したページ全体のレイアウト</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Storybookでは各レイヤーのコンポーネントをストーリーとして登録し、
          個別に開発・テストできます。
        </p>
      </section>

      {/* インストールとセットアップ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">インストールとセットアップ</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookは既存のプロジェクトに1コマンドで追加できます。
          フレームワークやビルドツールを自動検出して最適な設定を生成してくれます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`# 既存プロジェクトにStorybookを追加
npx storybook@latest init

# 実行すると以下が自動的に行われる:
# 1. フレームワーク（React, Vue等）を検出
# 2. 必要なパッケージをインストール
# 3. .storybook/ ディレクトリに設定ファイルを生成
# 4. サンプルストーリーを作成`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed mb-4">
          Next.jsプロジェクトの場合は、自動的に<code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">@storybook/nextjs</code>が
          選択され、Next.jsの機能（Image、Link、Router等）がStorybook内で動作するように設定されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# package.jsonに追加されるスクリプト
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}`}</code>
        </pre>
      </section>

      {/* プロジェクト構造 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクト構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookの設定は<code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">.storybook/</code>ディレクトリに格納されます。
          主要なファイルの役割を理解しましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`プロジェクトルート/
├── .storybook/
│   ├── main.ts          # Storybookの主設定ファイル
│   └── preview.ts       # ストーリー表示の共通設定
├── src/
│   └── components/
│       ├── Button.tsx
│       └── Button.stories.tsx  # ストーリーファイル
└── package.json`}</code>
        </pre>
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-1">main.ts</h3>
            <p className="text-gray-300 text-sm mb-2">ストーリーの検索パス、アドオン、フレームワーク設定を定義</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// .storybook/main.ts
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};

export default config;`}</code>
            </pre>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-1">preview.ts</h3>
            <p className="text-gray-300 text-sm mb-2">すべてのストーリーに共通する設定（グローバルスタイル、デコレーター等）</p>
            <pre className="bg-gray-950 rounded-lg p-3 text-sm overflow-x-auto border border-gray-700">
              <code className="text-gray-300 font-mono">{`// .storybook/preview.ts
import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; // グローバルCSS

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* 最初のストーリー */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">最初のストーリーを書いてみよう</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストーリーファイルは<code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">*.stories.tsx</code>という命名規則で作成します。
          コンポーネントと同じディレクトリに置くのが一般的です。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/components/Button.tsx
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  onClick,
}: ButtonProps) {
  const base = "rounded font-semibold transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={\`\${base} \${variants[variant]} \${sizes[size]}\`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// src/components/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

// 基本のストーリー
export const Primary: Story = {
  args: {
    label: "ボタン",
    variant: "primary",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    label: "キャンセル",
    variant: "secondary",
  },
};`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`# Storybookを起動して確認
npm run storybook

# ブラウザで http://localhost:6006 が開く
# サイドバーに "Components / Button" が表示される`}</code>
        </pre>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>StorybookはUIコンポーネントを独立環境で開発・テスト・ドキュメント化するツール</li>
          <li>コンポーネント駆動開発（CDD）でボトムアップにUIを構築できる</li>
          <li><code className="text-pink-400 text-sm">npx storybook@latest init</code>で既存プロジェクトに簡単に追加</li>
          <li><code className="text-pink-400 text-sm">.storybook/</code>ディレクトリにmain.tsとpreview.tsが設定の中心</li>
          <li>ストーリーファイルは<code className="text-pink-400 text-sm">*.stories.tsx</code>の命名規則で作成する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="storybook" lessonId="basics" color="pink" />
      <LessonNav lessons={STORYBOOK_LESSONS} currentId="basics" basePath="/learn/storybook" color="pink" />
    </div>
  );
}
