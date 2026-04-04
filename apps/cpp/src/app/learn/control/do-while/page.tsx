import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function DoWhilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-whileループ</h1>
        <p className="text-gray-400">最低1回は実行するdo-while構文を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-whileとwhileの違い</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 text-base">while</h3>
            <p className="text-gray-300 leading-relaxed">
              条件を<strong className="text-white">先にチェック</strong>します。
              条件が最初からfalseなら一度も実行されません。
            </p>
          </div>
          <div className="p-4 bg-gray-900 rounded-lg border border-blue-500/30">
            <h3 className="text-blue-400 font-semibold mb-2 text-base">do-while</h3>
            <p className="text-gray-300 leading-relaxed">
              本体を<strong className="text-white">先に実行</strong>してから条件をチェックします。
              最低1回は必ず実行されます。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なdo-while</h2>
        <p className="text-gray-400 mb-4">whileとdo-whileの動作の違いを比較します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // do-while: 条件がfalseでも1回は実行
    int x = 10;
    do {
        cout << "do-while: x = " << x << endl;
        x++;
    } while (x < 5);

    // while: 条件がfalseなら実行されない
    int y = 10;
    while (y < 5) {
        cout << "while: y = " << y << endl;
        y++;
    }
    cout << "whileは実行されませんでした" << endl;

    // カウントアップ
    int count = 1;
    do {
        cout << count << " ";
        count++;
    } while (count <= 5);
    cout << endl;

    return 0;
}`}
          expectedOutput={`do-while: x = 10
whileは実行されませんでした
1 2 3 4 5`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">do-whileの実用例</h2>
        <p className="text-gray-400 mb-4">メニュー表示や入力検証でよく使われるパターンです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // 数字の各桁の合計を計算
    int number = 9876;
    int sum = 0;
    int temp = number;

    do {
        sum += temp % 10;
        temp /= 10;
    } while (temp > 0);

    cout << number << "の各桁の合計: " << sum << endl;

    // 数値を逆順にする
    int original = 12345;
    int reversed = 0;
    temp = original;

    do {
        reversed = reversed * 10 + temp % 10;
        temp /= 10;
    } while (temp > 0);

    cout << original << "の逆順: " << reversed << endl;

    return 0;
}`}
          expectedOutput={`9876の各桁の合計: 30
12345の逆順: 54321`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="do-while" />
      </div>
      <LessonNav lessons={lessons} currentId="do-while" basePath="/learn/control" />
    </div>
  );
}
