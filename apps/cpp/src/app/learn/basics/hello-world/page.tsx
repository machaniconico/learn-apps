import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Hello World</h1>
        <p className="text-gray-400">最初のC++プログラムを作成して実行してみましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++プログラムの基本構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++プログラムの最初の一歩は「Hello, World!」を画面に表示することです。
          C++では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">#include &lt;iostream&gt;</code> で入出力ライブラリを読み込み、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::cout</code> を使って文字列を出力します。
        </p>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてのC++プログラムは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">main()</code> 関数から始まります。
          この関数がプログラムのエントリーポイント（開始地点）です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">#include &lt;iostream&gt;</code> - 入出力のためのヘッダファイル</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int main()</code> - プログラムの開始地点</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">std::cout &lt;&lt;</code> - 標準出力へ表示</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">return 0;</code> - プログラムの正常終了</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラシックなHello World</h2>
        <p className="text-gray-400 mb-4">
          伝統的なC++の書き方です。<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::endl</code> は改行して出力バッファをフラッシュします。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "C++へようこそ！" << std::endl;

    return 0;
}`}
          expectedOutput={`Hello, World!
C++へようこそ！`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">using namespace std</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          毎回 <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::</code> を書くのが面倒な場合、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">using namespace std;</code> と宣言すると省略できます。
          ただし、大規模プロジェクトでは名前の衝突を避けるため、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::</code> を明示的に書くことが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">using namespace を使った書き方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">using namespace std;</code> を使うとコードがシンプルになります。学習段階ではこちらも便利です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "using namespace std を使うと" << endl;
    cout << "std:: を省略できます" << endl;

    return 0;
}`}
          expectedOutput={`Hello, World!
using namespace std を使うと
std:: を省略できます`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">endl と \\n の違い</h2>
        <p className="text-gray-400 mb-4">
          改行には <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::endl</code> と
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">"\\n"</code> の2つの方法があります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">endl</code> はバッファをフラッシュするため若干遅く、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">"\\n"</code> の方がパフォーマンスに優れています。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // endl を使う（バッファフラッシュあり）
    std::cout << "行1" << std::endl;
    std::cout << "行2" << std::endl;

    // \\n を使う（バッファフラッシュなし・高速）
    std::cout << "行3\\n";
    std::cout << "行4\\n";

    // 混在も可能
    std::cout << "行5" << "\\n";

    return 0;
}`}
          expectedOutput={`行1
行2
行3
行4
行5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="hello-world" />
      </div>
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
