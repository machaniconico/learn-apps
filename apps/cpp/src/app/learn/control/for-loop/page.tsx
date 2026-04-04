import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function ForLoopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">forループ</h1>
        <p className="text-gray-400">カウンタベースの繰り返し処理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">forループとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">for</code> ループは
          「初期化; 条件; 後処理」の3つの部分で構成されます。
          繰り返し回数が明確な場合に最適です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          構文: <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">{"for (初期化; 条件; 後処理) { 本体 }"}</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なforループ</h2>
        <p className="text-gray-400 mb-4">カウンタ変数を使った基本的な繰り返しです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 1から5まで表示
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // カウントダウン
    for (int i = 5; i >= 1; i--) {
        cout << i << " ";
    }
    cout << endl;

    // 2ずつ増加
    for (int i = 0; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << endl;

    // 合計を計算
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    cout << "1〜100の合計: " << sum << endl;

    return 0;
}`}
          expectedOutput={`1 2 3 4 5
5 4 3 2 1
0 2 4 6 8 10
1〜100の合計: 5050`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたforループ</h2>
        <p className="text-gray-400 mb-4">forループの中にforループを書く方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 九九の一部（2の段と3の段）
    for (int i = 2; i <= 3; i++) {
        for (int j = 1; j <= 5; j++) {
            cout << i << "x" << j << "=" << i * j << " ";
        }
        cout << endl;
    }

    cout << endl;

    // 三角形のパターン
    for (int i = 1; i <= 5; i++) {
        for (int j = 0; j < i; j++) {
            cout << "* ";
        }
        cout << endl;
    }

    return 0;
}`}
          expectedOutput={`2x1=2 2x2=4 2x3=6 2x4=8 2x5=10
3x1=3 3x2=6 3x3=9 3x4=12 3x5=15

*
* *
* * *
* * * *
* * * * *`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="for-loop" />
      </div>
      <LessonNav lessons={lessons} currentId="for-loop" basePath="/learn/control" />
    </div>
  );
}
