import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function InputOutputPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン11</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">入出力</h1>
        <p className="text-gray-400">cin・coutを使った標準入出力を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++の入出力ストリーム</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;iostream&gt;</code> ヘッダを使って入出力を行います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">std::cout</code> - 標準出力（画面への出力）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">std::cin</code> - 標準入力（キーボードからの入力）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">std::cerr</code> - エラー出力</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&lt;&lt;</code> - 挿入演算子（出力用）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&gt;&gt;</code> - 抽出演算子（入力用）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">coutによる出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;&lt;</code> 演算子をチェーンして複数の値を連続出力できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 基本的な出力
    std::cout << "Hello, World!" << std::endl;

    // 複数の値をチェーン
    std::string name = "太郎";
    int age = 25;
    std::cout << name << "さんは" << age << "歳です。" << std::endl;

    // 数値のフォーマット
    double pi = 3.14159265;
    std::cout << "デフォルト: " << pi << std::endl;

    // 改行の方法
    std::cout << "行1" << std::endl;  // endl（フラッシュあり）
    std::cout << "行2\n";            // \\n（フラッシュなし）
    std::cout << "行3" << '\n';      // 文字リテラル

    return 0;
}`}
          expectedOutput={`Hello, World!
太郎さんは25歳です。
デフォルト: 3.14159
行1
行2
行3`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">cinによる入力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::cin &gt;&gt;</code> でキーボードから値を読み取ります。
          スペースまでの1単語を読み取ります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // cin による入力（ここではシミュレーション）
    // 実際のプログラムではユーザーが入力します

    // 整数の入力
    int age;
    std::cout << "年齢を入力: ";
    // std::cin >> age;  // 実行時にユーザーが入力
    age = 25;  // デモ用
    std::cout << age << std::endl;

    // 文字列の入力
    std::string name;
    std::cout << "名前を入力: ";
    // std::cin >> name;  // スペースまでの1単語を読む
    name = "Taro";  // デモ用
    std::cout << name << std::endl;

    // 複数の値を一度に読む
    int x, y;
    std::cout << "2つの数値を入力: ";
    // std::cin >> x >> y;
    x = 10; y = 20;  // デモ用
    std::cout << "合計: " << (x + y) << std::endl;

    return 0;
}`}
          expectedOutput={`年齢を入力: 25
名前を入力: Taro
2つの数値を入力: 合計: 30`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">getlineとフォーマット出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::getline()</code> はスペースを含む1行全体を読み取ります。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;iomanip&gt;</code> で出力のフォーマットを制御できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <iomanip>
#include <string>

int main() {
    // getline: 1行全体を読む
    // std::string line;
    // std::getline(std::cin, line);

    // 出力フォーマット
    double price = 1234.5;

    // 固定小数点表記
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "価格: " << price << "円" << std::endl;

    // 幅指定と右揃え
    std::cout << std::setw(10) << "商品A" << std::setw(10) << 1500 << std::endl;
    std::cout << std::setw(10) << "商品B" << std::setw(10) << 800 << std::endl;
    std::cout << std::setw(10) << "商品C" << std::setw(10) << 23500 << std::endl;

    // 0埋め
    std::cout << "\\n時刻: "
              << std::setfill('0') << std::setw(2) << 9 << ":"
              << std::setfill('0') << std::setw(2) << 5 << ":"
              << std::setfill('0') << std::setw(2) << 3 << std::endl;

    return 0;
}`}
          expectedOutput={`価格: 1234.50円
    商品A      1500
    商品B       800
    商品C     23500

時刻: 09:05:03`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="input-output" />
      </div>
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}
