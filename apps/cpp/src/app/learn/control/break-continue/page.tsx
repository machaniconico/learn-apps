import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function BreakContinuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">break・continue</h1>
        <p className="text-gray-400">ループを中断・スキップする制御文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">break と continue の違い</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 text-base">break</h3>
            <p className="text-gray-300 leading-relaxed">
              ループを<strong className="text-white">完全に終了</strong>します。
              ループブロックを抜けて、次の処理に移ります。
              switch文でも使います。
            </p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 text-base">continue</h3>
            <p className="text-gray-300 leading-relaxed">
              現在の<strong className="text-white">イテレーションをスキップ</strong>して、
              次のイテレーションに進みます。ループ自体は続きます。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">break と continue の基本動作</h2>
        <p className="text-gray-400 mb-4">break はループを抜け、continue は次の繰り返しへスキップします。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    // break: 5が見つかったらループ終了
    cout << "break例: ";
    for (int i = 0; i < 10; i++) {
        if (i == 5) break;
        cout << i << " ";
    }
    cout << "(終了)" << endl;

    // continue: 偶数をスキップ
    cout << "continue例（奇数のみ）: ";
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) continue;
        cout << i << " ";
    }
    cout << endl;

    // 範囲forでのbreak
    string names[] = {"田中", "鈴木", "探している人", "山田", "佐藤"};
    for (const auto& name : names) {
        cout << "チェック: " << name << endl;
        if (name == "探している人") {
            cout << "見つかりました！" << endl;
            break;
        }
    }

    return 0;
}`}
          expectedOutput={`break例: 0 1 2 3 4 (終了)
continue例（奇数のみ）: 1 3 5 7 9
チェック: 田中
チェック: 鈴木
チェック: 探している人
見つかりました！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたループでのbreak</h2>
        <p className="text-gray-400 mb-4">breakはネストの最も内側のループだけを抜けます。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // ネストしたループでのbreak
    bool found = false;
    int targetRow = -1, targetCol = -1;
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    for (int row = 0; row < 3 && !found; row++) {
        for (int col = 0; col < 3; col++) {
            if (matrix[row][col] == 5) {
                targetRow = row;
                targetCol = col;
                found = true;
                break; // 内側のループを抜ける
            }
        }
    }

    if (found)
        cout << "5は [" << targetRow << ", " << targetCol << "] にあります" << endl;

    // フィルタリング（continue の実用例）
    int numbers[] = {1, -3, 5, -2, 8, -7, 4};
    cout << "正の数のみ: ";
    for (int n : numbers) {
        if (n <= 0) continue;
        cout << n << " ";
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`5は [1, 1] にあります
正の数のみ: 1 5 8 4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="break-continue" />
      </div>
      <LessonNav lessons={lessons} currentId="break-continue" basePath="/learn/control" />
    </div>
  );
}
