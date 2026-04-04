import { CodePlayground } from "@/components/code-playground";

export default function PlaygroundPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          <span className="text-indigo-400">{"{ }"}</span> フリープレイグラウンド
        </h1>
        <p className="text-gray-400">
          HTML・CSS・JavaScriptを自由に書いて、すぐに結果を確認できます。レッスンで学んだことを試したり、自分のアイデアを形にしてみましょう。
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">エディタ</h2>
        <p className="text-gray-400 text-sm mb-4">
          左側でコードを書いて、右側でリアルタイムプレビュー。Tab でインデント、Ctrl(Cmd)+Enter で再実行できます。
        </p>
        <CodePlayground
          mode="all"
          defaultHtml={`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>マイページ</title>
</head>
<body>
  <h1>ようこそ！</h1>
  <p>ここに自由にコードを書いてみましょう。</p>
  <button id="btn">クリック</button>
  <p id="output"></p>
</body>
</html>`}
          defaultCss={`body {
  font-family: sans-serif;
  padding: 20px;
  background: #f8f9fa;
  color: #333;
}

h1 {
  color: #6366f1;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #4f46e5;
}`}
          defaultJs={`let count = 0;

document.getElementById('btn')
  .addEventListener('click', () => {
    count++;
    document.getElementById('output')
      .textContent = count + '回クリックしました！';
  });

console.log('準備完了！');`}
        />
      </section>

      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">使い方のヒント</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-orange-400 mb-2">HTML</h3>
            <p className="text-sm text-gray-400">ページの構造を定義します。タグを使って見出し、段落、ボタンなどの要素を配置しましょう。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-blue-400 mb-2">CSS</h3>
            <p className="text-sm text-gray-400">見た目をデザインします。色、フォント、レイアウトなどをスタイルで指定しましょう。</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-yellow-400 mb-2">JavaScript</h3>
            <p className="text-sm text-gray-400">動きを加えます。ボタンクリック、データ処理、アニメーションなどのロジックを書きましょう。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
