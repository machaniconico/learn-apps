import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function TernaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">制御構文 レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">三項演算子</h1>
        <p className="text-gray-400">条件式を使った簡潔な分岐の書き方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">条件 ? 真の値 : 偽の値</code> の形式で、
          if-elseを1行で書ける演算子です。変数の初期化や簡単な分岐に便利です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          複雑な条件やネストが深くなる場合は、可読性のためif-elseを使いましょう。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な三項演算子</h2>
        <p className="text-gray-400 mb-4">if-elseと三項演算子の比較です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 20;

    // if-elseで書く場合
    string status1;
    if (age >= 18)
        status1 = "成人";
    else
        status1 = "未成年";

    // 三項演算子で書く場合
    string status2 = (age >= 18) ? "成人" : "未成年";

    cout << "if-else: " << status1 << endl;
    cout << "三項演算子: " << status2 << endl;

    // 数値の判定
    int x = -5;
    int absValue = (x >= 0) ? x : -x;
    cout << x << "の絶対値: " << absValue << endl;

    // 偶数・奇数の判定
    int num = 7;
    cout << num << "は" << ((num % 2 == 0) ? "偶数" : "奇数") << "です" << endl;

    return 0;
}`}
          expectedOutput={`if-else: 成人
三項演算子: 成人
-5の絶対値: 5
7は奇数です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">三項演算子の応用</h2>
        <p className="text-gray-400 mb-4">関数引数やネストでの使い方です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

int main() {
    // 最大値を求める
    int a = 15, b = 23;
    int maxVal = (a > b) ? a : b;
    cout << a << "と" << b << "の最大値: " << maxVal << endl;

    // 三項演算子のネスト（あまり推奨されない）
    int score = 75;
    string grade = (score >= 90) ? "A"
                 : (score >= 80) ? "B"
                 : (score >= 70) ? "C"
                 : "F";
    cout << "スコア" << score << "の成績: " << grade << endl;

    // 出力に直接使う
    bool isLoggedIn = true;
    cout << "状態: " << (isLoggedIn ? "ログイン中" : "未ログイン") << endl;

    // 3つの数の最大値
    int x = 10, y = 25, z = 18;
    int maxOfThree = (x > y) ? ((x > z) ? x : z) : ((y > z) ? y : z);
    cout << "最大値: " << maxOfThree << endl;

    return 0;
}`}
          expectedOutput={`15と23の最大値: 23
スコア75の成績: C
状態: ログイン中
最大値: 25`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="control" lessonId="ternary" />
      </div>
      <LessonNav lessons={lessons} currentId="ternary" basePath="/learn/control" />
    </div>
  );
}
