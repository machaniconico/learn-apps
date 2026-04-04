import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function GotoLabelPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">goto文</h1>
        <p className="text-gray-400">goto文の使い方と避けるべき理由を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">goto文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">goto</code> 文は、
          プログラムの実行を指定したラベルの位置に無条件でジャンプさせます。
          C++では使用可能ですが、コードの可読性を著しく下げるため、
          <strong className="text-white">一般的には使用が推奨されません</strong>。
        </p>
        <p className="text-gray-300 leading-relaxed">
          唯一の合理的な用途は、深くネストしたループからの脱出です。
          それでも関数分割やフラグ変数で代替できることがほとんどです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">goto文の基本構文</h2>
        <p className="text-gray-400 mb-4">ラベルを定義し、gotoでジャンプします。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 基本的なgoto
    cout << "ステップ1" << endl;
    goto step3;

    cout << "ステップ2（スキップされる）" << endl;

step3:
    cout << "ステップ3" << endl;

    // gotoでループを模倣（非推奨）
    int count = 1;
loop_start:
    if (count <= 3) {
        cout << "カウント: " << count << endl;
        count++;
        goto loop_start;
    }

    cout << "完了" << endl;

    return 0;
}`}
          expectedOutput={`ステップ1
ステップ3
カウント: 1
カウント: 2
カウント: 3
完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">多重ループからの脱出</h2>
        <p className="text-gray-400 mb-4">gotoの唯一の合理的な使用例と、その代替方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // goto版: 多重ループからの脱出
    cout << "=== goto版 ===" << endl;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (i == 1 && j == 2) {
                cout << "発見: [" << i << "," << j << "]" << endl;
                goto found;
            }
        }
    }
found:
    cout << "ループ終了" << endl;

    // 代替: フラグ変数を使う方法（推奨）
    cout << "=== フラグ版 ===" << endl;
    bool done = false;
    for (int i = 0; i < 3 && !done; i++) {
        for (int j = 0; j < 3 && !done; j++) {
            if (i == 1 && j == 2) {
                cout << "発見: [" << i << "," << j << "]" << endl;
                done = true;
            }
        }
    }
    cout << "ループ終了" << endl;

    return 0;
}`}
          expectedOutput={`=== goto版 ===
発見: [1,2]
ループ終了
=== フラグ版 ===
発見: [1,2]
ループ終了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="goto-label" />
      </div>
      <LessonNav lessons={lessons} currentId="goto-label" basePath="/learn/control" />
    </div>
  );
}
