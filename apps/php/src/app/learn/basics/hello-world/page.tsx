import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">PHP基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello, World!</h1>
        <p className="text-gray-400">PHPで最初のプログラムを作成し、画面に文字を出力する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">PHPとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPはWebアプリケーション開発に広く使われるサーバーサイドのスクリプト言語です。HTMLと組み合わせて使われることが多く、動的なWebページを簡単に作成できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>PHPコードは <code className="text-blue-300">&lt;?php</code> タグで始まります</li>
          <li><code className="text-blue-300">echo</code> 文を使って文字列を出力します</li>
          <li>各文はセミコロン（;）で終わります</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">最初のHello World</h2>
        <p className="text-gray-400 mb-4">最もシンプルなPHPプログラムです。<code className="text-blue-300">echo</code>を使って文字列を出力します。</p>
        <PhpEditor
          defaultCode={`<?php\necho "Hello, World!";`}
          expectedOutput={`Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数行の出力</h2>
        <p className="text-gray-400 mb-4">改行文字 <code className="text-blue-300">\n</code> を使って複数行を出力できます。また、<code className="text-blue-300">echo</code>は複数回呼び出せます。</p>
        <PhpEditor
          defaultCode={`<?php\necho "1行目\\n";\necho "2行目\\n";\necho "3行目\\n";\necho "PHPを学ぼう！";`}
          expectedOutput={`1行目\n2行目\n3行目\nPHPを学ぼう！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">echoとprint</h2>
        <p className="text-gray-400 mb-4"><code className="text-blue-300">echo</code>に加えて、<code className="text-blue-300">print</code>も文字列を出力できます。<code className="text-blue-300">echo</code>はカンマ区切りで複数の値を出力できます。</p>
        <PhpEditor
          defaultCode={`<?php\necho "echo: Hello", " ", "World\\n";\nprint "print: こんにちは\\n";\necho "PHPは楽しい！";`}
          expectedOutput={`echo: Hello World\nprint: こんにちは\nPHPは楽しい！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
