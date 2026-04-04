import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function CArrayPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">配列・ベクター レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">C配列</h1>
        <p className="text-gray-400">C言語スタイルの配列の宣言と操作</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C配列とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C配列はC言語から受け継がれた最も基本的な配列です。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">型 名前[サイズ]</code> の形式で宣言し、
          コンパイル時にサイズが決まる固定長配列です。メモリ上に連続して配置されます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C配列はサイズ情報を持たず、境界チェックも行いません。
          現代のC++では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::array</code> や
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::vector</code> が推奨されますが、
          既存コードの理解のために知っておく必要があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C配列の宣言と初期化</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // サイズ指定で宣言
    int a[5];
    a[0] = 10; a[1] = 20; a[2] = 30; a[3] = 40; a[4] = 50;

    // 初期化リストで宣言（サイズ自動推論）
    int b[] = {1, 2, 3, 4};

    // 部分初期化（残りは0）
    int c[5] = {100, 200};

    cout << "a: ";
    for (int i = 0; i < 5; i++) cout << a[i] << " ";
    cout << endl;

    cout << "b: ";
    for (int i = 0; i < 4; i++) cout << b[i] << " ";
    cout << endl;

    cout << "c: ";
    for (int i = 0; i < 5; i++) cout << c[i] << " ";
    cout << endl;

    // サイズの取得
    cout << "bの要素数: " << sizeof(b) / sizeof(b[0]) << endl;

    return 0;
}`}
          expectedOutput={`a: 10 20 30 40 50
b: 1 2 3 4
c: 100 200 0 0 0
bの要素数: 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の操作と範囲for</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int scores[] = {85, 92, 78, 96, 88};
    int size = sizeof(scores) / sizeof(scores[0]);

    // 範囲forで走査
    cout << "点数: ";
    for (int s : scores) {
        cout << s << " ";
    }
    cout << endl;

    // 合計と平均
    int sum = 0;
    for (int s : scores) sum += s;
    cout << "合計: " << sum << endl;
    cout << "平均: " << (double)sum / size << endl;

    // 最大値を探す
    int max = scores[0];
    for (int i = 1; i < size; i++) {
        if (scores[i] > max) max = scores[i];
    }
    cout << "最高点: " << max << endl;

    // 配列の要素を変更
    for (int& s : scores) {
        s += 5;  // 全員に5点加算
    }
    cout << "加算後: ";
    for (int s : scores) cout << s << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`点数: 85 92 78 96 88
合計: 439
平均: 87.8
最高点: 96
加算後: 90 97 83 101 93`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="c-array" />
      </div>
      <LessonNav lessons={lessons} currentId="c-array" basePath="/learn/arrays" />
    </div>
  );
}
