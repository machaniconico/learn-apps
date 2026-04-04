import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">$記号を使った変数宣言と代入の基本を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを一時的に保存するための「名前付きの箱」です。PHPでは変数名の前に<code className="text-blue-300">$</code>記号を付けます。変数の型は値を代入するときに自動的に決まります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>変数名は <code className="text-blue-300">$</code> で始まる</li>
          <li>変数名は英字またはアンダースコアで始まる（数字は不可）</li>
          <li>大文字と小文字は区別される（<code className="text-blue-300">$name</code>と<code className="text-blue-300">$Name</code>は別の変数）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の宣言と代入</h2>
        <p className="text-gray-400 mb-4">変数に値を代入するには <code className="text-blue-300">=</code> 演算子を使います。</p>
        <PhpEditor
          defaultCode={`<?php\n$name = "山田太郎";\n$age = 30;\n$city = "東京";\n\necho $name . "\\n";\necho $age . "\\n";\necho $city;`}
          expectedOutput={`山田太郎\n30\n東京`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の再代入</h2>
        <p className="text-gray-400 mb-4">変数の値はいつでも変更できます。新しい値を代入すると上書きされます。</p>
        <PhpEditor
          defaultCode={`<?php\n$count = 0;\necho "初期値: " . $count . "\\n";\n\n$count = 10;\necho "変更後: " . $count . "\\n";\n\n$count = $count + 5;\necho "加算後: " . $count;`}
          expectedOutput={`初期値: 0\n変更後: 10\n加算後: 15`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の文字列への埋め込み</h2>
        <p className="text-gray-400 mb-4">ダブルクォートの中では変数が展開されます。<code className="text-blue-300">{"{$var}"}</code>形式も使えます。</p>
        <PhpEditor
          defaultCode={`<?php\n$firstName = "花子";\n$lastName = "鈴木";\n$age = 25;\n\necho "{$lastName}{$firstName}さんは{$age}歳です。\\n";\necho $lastName . $firstName . "さん、こんにちは！";`}
          expectedOutput={`鈴木花子さんは25歳です。\n鈴木花子さん、こんにちは！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
