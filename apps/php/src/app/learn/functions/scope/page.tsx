import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsScopePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スコープ</h1>
        <p className="text-gray-400">変数のスコープ、global文、static変数を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPでは関数内の変数はローカルスコープを持ち、外部から見えません。<code className="text-purple-300">global</code>キーワードでグローバル変数にアクセスでき、<code className="text-purple-300">static</code>変数は関数呼び出し間で値を保持します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>関数内の変数は関数外からアクセスできない（ローカルスコープ）</li>
          <li>globalキーワードでグローバル変数を関数内で使える</li>
          <li>static変数は関数終了後も値を保持し続ける</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ローカルスコープとglobal</h2>
        <p className="text-gray-400 mb-4">関数内外での変数の見え方と、globalによるアクセスを確認します。</p>
        <PhpEditor
          defaultCode={`<?php
$appName = "PHPアプリ";
$version = "1.0.0";

function showAppInfo(): void {
    global $appName, $version;
    echo "アプリ名: {$appName} v{$version}\\n";
}

function localExample(): void {
    $localVar = "ローカル変数";
    echo "関数内: {$localVar}\\n";
}

showAppInfo();
localExample();

// グローバル変数を変更
$counter = 0;
function incrementGlobal(): void {
    global $counter;
    $counter++;
}
incrementGlobal();
incrementGlobal();
incrementGlobal();
echo "カウンター: {$counter}\\n";`}
          expectedOutput={`アプリ名: PHPアプリ v1.0.0
関数内: ローカル変数
カウンター: 3`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static変数</h2>
        <p className="text-gray-400 mb-4">static変数は関数を呼び出すたびに値が保持されます。</p>
        <PhpEditor
          defaultCode={`<?php
function callCounter(): int {
    static $count = 0;
    $count++;
    return $count;
}

function generateId(): string {
    static $id = 0;
    $id++;
    return "ID-" . str_pad((string)$id, 4, "0", STR_PAD_LEFT);
}

echo callCounter() . "回目\\n";
echo callCounter() . "回目\\n";
echo callCounter() . "回目\\n";
echo callCounter() . "回目\\n";
echo callCounter() . "回目\\n";

echo generateId() . "\\n";
echo generateId() . "\\n";
echo generateId() . "\\n";`}
          expectedOutput={`1回目
2回目
3回目
4回目
5回目
ID-0001
ID-0002
ID-0003`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="scope" />
      </div>
      <LessonNav lessons={lessons} currentId="scope" basePath="/learn/functions" />
    </div>
  );
}
