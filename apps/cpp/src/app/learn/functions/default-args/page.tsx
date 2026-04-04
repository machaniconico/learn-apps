import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function DefaultArgsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">関数 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デフォルト引数</h1>
        <p className="text-gray-400">引数にデフォルト値を設定する方法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の引数にデフォルト値を指定すると、呼び出し時にその引数を省略できます。
          デフォルト引数は<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">右端のパラメータから連続して</code>設定する必要があります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          途中の引数だけスキップすることはできません。左側の引数にだけデフォルト値を設定することもできません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なデフォルト引数</h2>
        <p className="text-gray-400 mb-4">デフォルト値の設定と呼び出しパターンです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// デフォルト引数を持つ関数
void greet(const string& name, const string& greeting = "こんにちは") {
    cout << greeting << "、" << name << "さん！" << endl;
}

// 複数のデフォルト引数
void printBox(int width = 10, int height = 5, char fill = '*') {
    cout << width << "x" << height << " (" << fill << ")" << endl;
}

int main() {
    // デフォルト値を使用
    greet("太郎");

    // デフォルト値を上書き
    greet("花子", "おはよう");

    // すべてデフォルト
    printBox();

    // 一部だけ指定
    printBox(20);
    printBox(15, 8);
    printBox(12, 6, '#');

    return 0;
}`}
          expectedOutput={`こんにちは、太郎さん！
おはよう、花子さん！
10x5 (*)
20x5 (*)
15x8 (*)
12x6 (#)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数の実用例</h2>
        <p className="text-gray-400 mb-4">ログ出力や設定関数での活用例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

// ログ出力関数
void log(const string& message, const string& level = "INFO", bool timestamp = true) {
    if (timestamp)
        cout << "[2024-01-01] ";
    cout << "[" << level << "] " << message << endl;
}

// べき乗の計算（デフォルトは2乗）
double power(double base, int exponent = 2) {
    double result = 1.0;
    for (int i = 0; i < exponent; i++)
        result *= base;
    return result;
}

int main() {
    log("アプリ起動");
    log("接続エラー", "ERROR");
    log("デバッグ情報", "DEBUG", false);

    cout << "3^2 = " << power(3) << endl;
    cout << "2^10 = " << power(2, 10) << endl;
    cout << "5^3 = " << power(5, 3) << endl;

    return 0;
}`}
          expectedOutput={`[2024-01-01] [INFO] アプリ起動
[2024-01-01] [ERROR] 接続エラー
[DEBUG] デバッグ情報
3^2 = 9
2^10 = 1024
5^3 = 125`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="default-args" />
      </div>
      <LessonNav lessons={lessons} currentId="default-args" basePath="/learn/functions" />
    </div>
  );
}
