import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello World</h1>
        <p className="text-gray-400">最初のCプログラムを作成して実行する。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C言語のプログラム構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語のプログラムは<strong className="text-blue-400">main関数</strong>から実行が始まります。
          最も基本的な構造を覚えましょう。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">#include &lt;stdio.h&gt;</code> - 標準入出力ライブラリのインクルード</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int main()</code> - プログラムのエントリポイント</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">printf()</code> - 文字列を標準出力に表示する関数</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">return 0;</code> - 正常終了を示す戻り値</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Hello Worldプログラム</h2>
        <p className="text-gray-400 mb-4">
          C言語伝統の最初のプログラムです。<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">printf</code> 関数で文字列を出力します。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">\n</code> は改行を表すエスケープシーケンスです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`}
          expectedOutput={`Hello, World!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数行の出力</h2>
        <p className="text-gray-400 mb-4">
          複数の <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">printf</code> を使って複数行を出力できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("C言語へようこそ！\\n");
    printf("プログラミングを始めましょう。\\n");
    printf("===========================\\n");
    printf("行1\\n行2\\n行3\\n");
    return 0;
}`}
          expectedOutput={`C言語へようこそ！
プログラミングを始めましょう。
===========================
行1
行2
行3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エスケープシーケンス</h2>
        <p className="text-gray-400 mb-4">
          バックスラッシュで始まる特殊文字を<strong className="text-blue-400">エスケープシーケンス</strong>といいます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("改行: 行1\\n行2\\n");
    printf("タブ: 列1\\t列2\\t列3\\n");
    printf("バックスラッシュ: C:\\\\Users\\\\\\n");
    printf("ダブルクォート: \\"Hello\\"\\n");
    return 0;
}`}
          expectedOutput={`改行: 行1
行2
タブ: 列1	列2	列3
バックスラッシュ: C:\Users\
ダブルクォート: "Hello"`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
