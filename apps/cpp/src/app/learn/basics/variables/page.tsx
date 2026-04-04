import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">変数の宣言・初期化・代入の基本を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを格納するための「名前付きの箱」です。C++では変数を使う前に必ず<strong className="text-white">型</strong>を指定して宣言する必要があります。
        </p>
        <p className="text-gray-300 leading-relaxed">
          変数の宣言は <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">型 変数名 = 初期値;</code> の形式で書きます。
          宣言と初期化を同時に行うことが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の宣言と初期化</h2>
        <p className="text-gray-400 mb-4">さまざまな型の変数を宣言して値を代入してみましょう。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>

int main() {
    // 変数の宣言と初期化
    int age = 25;
    double height = 175.5;
    char grade = 'A';
    std::string name = "太郎";
    bool isStudent = true;

    std::cout << "名前: " << name << std::endl;
    std::cout << "年齢: " << age << std::endl;
    std::cout << "身長: " << height << "cm" << std::endl;
    std::cout << "成績: " << grade << std::endl;
    std::cout << "学生: " << std::boolalpha << isStudent << std::endl;

    return 0;
}`}
          expectedOutput={`名前: 太郎
年齢: 25
身長: 175.5cm
成績: A
学生: true`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">初期化の方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C++には複数の初期化方法があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int x = 10;</code> - コピー初期化（伝統的な書き方）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int x(10);</code> - 直接初期化</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int x{"{10}"};</code> - 一様初期化（C++11以降、推奨）</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">int x{"{}"};</code> - 値初期化（ゼロで初期化）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の再代入と複数宣言</h2>
        <p className="text-gray-400 mb-4">変数の値は後から変更できます。また、同じ型の変数は一度に複数宣言できます。</p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // 変数の再代入
    int score = 80;
    std::cout << "初期スコア: " << score << std::endl;

    score = 95;  // 値を更新
    std::cout << "更新後スコア: " << score << std::endl;

    // 複数変数の同時宣言
    int x = 1, y = 2, z = 3;
    std::cout << "x=" << x << " y=" << y << " z=" << z << std::endl;

    // 一様初期化（C++11）
    int a{100};
    double b{3.14};
    std::cout << "a=" << a << " b=" << b << std::endl;

    return 0;
}`}
          expectedOutput={`初期スコア: 80
更新後スコア: 95
x=1 y=2 z=3
a=100 b=3.14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">未初期化変数の危険性</h2>
        <p className="text-gray-400 mb-4">
          C++では変数を初期化せずに使うと<strong className="text-white">未定義動作</strong>になります。
          必ず初期化してから使いましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>

int main() {
    // 良い例：初期化してから使う
    int initialized = 0;
    std::cout << "初期化済み: " << initialized << std::endl;

    // 一様初期化でゼロ初期化
    int safeValue{};  // 0 で初期化される
    double safeDouble{};  // 0.0 で初期化される
    bool safeBool{};  // false で初期化される

    std::cout << "int: " << safeValue << std::endl;
    std::cout << "double: " << safeDouble << std::endl;
    std::cout << "bool: " << std::boolalpha << safeBool << std::endl;

    return 0;
}`}
          expectedOutput={`初期化済み: 0
int: 0
double: 0
bool: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
