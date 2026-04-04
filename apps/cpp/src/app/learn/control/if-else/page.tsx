import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function IfElsePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">if-else文</h1>
        <p className="text-gray-400">基本的なif、if-else、ネストしたif文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if文とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">if</code> 文は最も基本的な条件分岐です。
          条件式が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> のときだけ、
          ブロック内のコードを実行します。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else</code> を追加すると、
          条件が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code> のときの処理も書けます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C++では条件式に整数値も使えます。0が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">false</code>、
          0以外が <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">true</code> として評価されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なif-else</h2>
        <p className="text-gray-400 mb-4">条件に応じて異なるメッセージを表示する例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int temperature = 25;

    // 基本的なif
    if (temperature > 30) {
        cout << "暑いです！" << endl;
    }

    // if-else
    if (temperature >= 20) {
        cout << "気持ちの良い天気です" << endl;
    } else {
        cout << "肌寒いです" << endl;
    }

    // ブレースなし（1文のみの場合）
    bool isWeekend = true;
    if (isWeekend)
        cout << "今日は休日です" << endl;
    else
        cout << "今日は平日です" << endl;

    return 0;
}`}
          expectedOutput={`気持ちの良い天気です
今日は休日です`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたif文</h2>
        <p className="text-gray-300 leading-relaxed">
          if文の中にさらにif文を書くことができます（ネスト）。ただし、深くネストするとコードが読みにくくなります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">else if</code> や早期リターンを使うとスッキリします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたifの例</h2>
        <p className="text-gray-400 mb-4">複数の条件を組み合わせる例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int age = 20;
    bool hasID = true;

    // ネストしたif
    if (age >= 18) {
        cout << "年齢確認: OK" << endl;
        if (hasID) {
            cout << "ID確認: OK" << endl;
            cout << "入場できます！" << endl;
        } else {
            cout << "IDが必要です" << endl;
        }
    } else {
        cout << "18歳未満は入場できません" << endl;
    }

    // 複合条件（&&）でシンプルに書ける場合
    if (age >= 18 && hasID) {
        cout << "入場OK（複合条件版）" << endl;
    }

    return 0;
}`}
          expectedOutput={`年齢確認: OK
ID確認: OK
入場できます！
入場OK（複合条件版）`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="if-else" />
      </div>
      <LessonNav lessons={lessons} currentId="if-else" basePath="/learn/control" />
    </div>
  );
}
