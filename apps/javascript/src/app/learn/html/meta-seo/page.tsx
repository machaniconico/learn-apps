import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { HTML_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function MetaSeoLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">HTML レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メタデータとSEO</h1>
        <p className="text-gray-400">検索エンジンやSNSにページ情報を正しく伝えよう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">メタデータとは？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          メタデータは「データに関するデータ」です。HTMLの<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;head&gt;</code>内に書き、
          ページのタイトル、説明文、文字コード、SNSでの表示設定などをブラウザや検索エンジンに伝えます。
          ユーザーには直接見えませんが、検索結果の表示やSNSシェア時の見た目に影響します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本のmetaタグ</h2>
        <CodePlayground
          mode="html"
          defaultHtml={`<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- 文字コード（必須） -->
  <meta charset="UTF-8">

  <!-- レスポンシブ対応（モバイル必須） -->
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0">

  <!-- ページタイトル（検索結果に表示） -->
  <title>サイト名 | ページタイトル</title>

  <!-- 説明文（検索結果のスニペット） -->
  <meta name="description"
    content="このページの説明文。120文字程度が目安。">

  <!-- 検索エンジンへの指示 -->
  <meta name="robots" content="index, follow">

  <!-- OGP: SNSシェア時の表示 -->
  <meta property="og:title" content="ページタイトル">
  <meta property="og:description" content="説明文">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">

  <!-- ファビコン -->
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <h1>メタデータの例</h1>
  <p>上のheadタグ内を確認してください。</p>
  <p>これらはページ上には表示されませんが、
     検索結果やSNSシェア時に使われます。</p>
</body>
</html>`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SEOの基本ポイント</h2>
        <div className="space-y-3 text-gray-300 text-sm">
          <div className="flex gap-2"><span className="text-orange-400">1.</span> titleタグは各ページでユニークに（30-60文字）</div>
          <div className="flex gap-2"><span className="text-orange-400">2.</span> meta descriptionは120文字程度で内容を要約</div>
          <div className="flex gap-2"><span className="text-orange-400">3.</span> h1はページに1つ、h2-h6で階層構造を作る</div>
          <div className="flex gap-2"><span className="text-orange-400">4.</span> imgにはalt属性を必ずつける</div>
          <div className="flex gap-2"><span className="text-orange-400">5.</span> セマンティックHTMLを使う</div>
          <div className="flex gap-2"><span className="text-orange-400">6.</span> ページの読み込み速度を意識する</div>
          <div className="flex gap-2"><span className="text-orange-400">7.</span> OGP設定でSNSシェア時の見た目を整える</div>
        </div>
      </section>
      <LessonCompleteButton categoryId="html" lessonId="meta-seo" color="orange" />
      <LessonNav lessons={HTML_LESSONS} currentId="meta-seo" basePath="/learn/html" color="orange" />
    </div>
  );
}
