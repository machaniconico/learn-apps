import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { STORYBOOK_LESSONS } from "@/lib/lessons-data";

export default function StorybookStoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 mb-4">Storybook レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ストーリーの書き方</h1>
        <p className="text-gray-400">CSF3フォーマット、args、controls、decorators、play functionsを使いこなそう</p>
      </div>

      {/* CSF3フォーマット */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">CSF3（Component Story Format 3）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Storybookのストーリーは<strong className="text-pink-400">CSF3</strong>というフォーマットで記述します。
          ファイルのデフォルトエクスポートが<code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">meta</code>（コンポーネント情報）、
          名前付きエクスポートが個々の<code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">Story</code>オブジェクトです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

// meta: コンポーネントの共通設定
const meta: Meta<typeof MyComponent> = {
  title: "UI/MyComponent",      // サイドバーの階層
  component: MyComponent,        // 対象コンポーネント
  tags: ["autodocs"],            // 自動ドキュメント生成
  parameters: {
    layout: "centered",          // 表示レイアウト
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

// 名前付きエクスポート = 個々のストーリー
export const Default: Story = {
  args: {
    // コンポーネントに渡すprops
  },
};`}</code>
        </pre>
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
          <h3 className="font-semibold text-pink-400 mb-2">CSF3の主な特徴</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
            <li>TypeScriptの型推論が効き、argsの補完が効く</li>
            <li>Storyオブジェクトはシンプルなオブジェクトリテラル</li>
            <li>metaの設定を各Storyが継承・上書きできる</li>
            <li>play functionsでインタラクションテストが可能</li>
          </ul>
        </div>
      </section>

      {/* argsとargTypes */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">argsとargTypes</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">args</code>はコンポーネントに渡すpropsの値、
          <code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">argTypes</code>はControls パネルでの操作方法を定義します。
          TypeScriptの型情報から自動推論もされますが、明示的に設定することもできます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// Cardコンポーネントの例
interface CardProps {
  title: string;
  description: string;
  variant: "default" | "outlined" | "elevated";
  showFooter?: boolean;
  onAction?: () => void;
}

// Card.stories.tsx
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",              // ドロップダウンで選択
      options: ["default", "outlined", "elevated"],
      description: "カードのスタイル",
    },
    showFooter: {
      control: "boolean",             // チェックボックス
      description: "フッターの表示切替",
    },
    onAction: {
      action: "clicked",              // Actionsパネルにログ出力
    },
    title: {
      control: "text",                // テキスト入力
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// metaでデフォルトargsを設定
// 各Storyで上書きできる
export const Default: Story = {
  args: {
    title: "カードタイトル",
    description: "カードの説明文がここに入ります。",
    variant: "default",
    showFooter: true,
  },
};

export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: "outlined",             // variantだけ上書き
  },
};

export const WithoutFooter: Story = {
  args: {
    ...Default.args,
    showFooter: false,
  },
};`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          Storybook UIの「Controls」パネルで、argsの値をリアルタイムに変更してコンポーネントの挙動を確認できます。
          デザイナーやPMがブラウザ上でバリエーションを確認するのに便利です。
        </p>
      </section>

      {/* Decorators */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Decorators（デコレーター）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          デコレーターは、ストーリーを<strong className="text-pink-400">ラップする関数</strong>です。
          レイアウト調整、テーマプロバイダー、ルーターのモックなど、
          コンポーネントの描画に必要な外部コンテキストを提供します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// ストーリー単位のデコレーター
export const WithPadding: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: "3rem" }}>
        <Story />
      </div>
    ),
  ],
  args: { label: "パディング付き" },
};

// metaレベル（全ストーリー共通）のデコレーター
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div className="flex gap-4 items-center">
        <Story />
      </div>
    ),
  ],
};`}</code>
        </pre>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// preview.tsでグローバルデコレーター（全ストーリーに適用）
// .storybook/preview.ts
import { ThemeProvider } from "../src/providers/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;`}</code>
        </pre>
        <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 mt-4">
          <h3 className="font-semibold text-pink-400 mb-2">デコレーターの適用順序</h3>
          <p className="text-gray-300 text-sm">
            Story単位 → meta単位 → グローバル（preview.ts）の順で内側から外側に適用されます。
            最も外側にグローバルデコレーターが来るため、テーマやルーターなどの共通コンテキストはpreview.tsに設定するのが定石です。
          </p>
        </div>
      </section>

      {/* Play Functions */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Play Functions（インタラクションテスト）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">play</code>関数を使うと、
          ストーリーが描画された後に<strong className="text-pink-400">ユーザー操作をシミュレート</strong>できます。
          クリック、入力、待機などを自動実行し、結果をアサーションで検証します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`import { within, userEvent, expect } from "@storybook/test";

// ログインフォームのインタラクションテスト
export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // メールアドレスを入力
    const emailInput = canvas.getByLabelText("メールアドレス");
    await userEvent.type(emailInput, "test@example.com");

    // パスワードを入力
    const passwordInput = canvas.getByLabelText("パスワード");
    await userEvent.type(passwordInput, "password123");

    // ログインボタンをクリック
    const submitButton = canvas.getByRole("button", {
      name: "ログイン",
    });
    await userEvent.click(submitButton);

    // 結果を検証
    await expect(
      canvas.getByText("ログイン成功")
    ).toBeInTheDocument();
  },
};`}</code>
        </pre>
        <p className="text-gray-300 leading-relaxed">
          play functionsはStorybookのUIで実行状況がステップごとに表示されます。
          また、<code className="text-pink-400 text-sm bg-gray-800 px-2 py-0.5 rounded">test-runner</code>と組み合わせることで
          CIでも実行できます。
        </p>
      </section>

      {/* ストーリーの命名規則 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">ストーリーの命名規則とベストプラクティス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストーリーの命名を統一することで、チーム全体でコンポーネントカタログを効率的に活用できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700 mb-4">
          <code className="text-gray-300 font-mono">{`// titleの階層化でサイドバーを整理
const meta: Meta<typeof Button> = {
  title: "Design System/Atoms/Button",
  //       ↑グループ    ↑カテゴリ ↑コンポーネント名
};

// ストーリー名の命名パターン
export const Default: Story = {};        // 基本状態
export const Small: Story = {};          // サイズバリエーション
export const Large: Story = {};
export const Disabled: Story = {};       // 無効状態
export const Loading: Story = {};        // ローディング状態
export const WithIcon: Story = {};       // アイコン付き
export const LongText: Story = {};       // エッジケース`}</code>
        </pre>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">推奨パターン</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>Defaultストーリーを必ず用意する</li>
              <li>propsのバリエーションごとにストーリーを作成</li>
              <li>エッジケース（長い文字列、空データ）も網羅</li>
              <li>PascalCaseで命名する</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-pink-400 mb-2">避けるべきパターン</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
              <li>1つのストーリーに複数状態を詰め込む</li>
              <li>Story1、Story2のような意味のない名前</li>
              <li>render関数内で大量のロジックを書く</li>
              <li>ストーリーファイルの肥大化</li>
            </ul>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>CSF3はdefault export（meta）と named export（Story）で構成される</li>
          <li>argsでpropsを定義し、argTypesでControlsパネルの表示をカスタマイズ</li>
          <li>decoratorsでテーマやレイアウトなどの外部コンテキストを提供できる</li>
          <li>play functionsでユーザー操作のシミュレーションとアサーションが可能</li>
          <li>ストーリー名は状態やバリエーションを明確にするPascalCaseで命名する</li>
        </ul>
      </section>

      <LessonCompleteButton categoryId="storybook" lessonId="stories" color="pink" />
      <LessonNav lessons={STORYBOOK_LESSONS} currentId="stories" basePath="/learn/storybook" color="pink" />
    </div>
  );
}
