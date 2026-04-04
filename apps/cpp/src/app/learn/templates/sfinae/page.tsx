import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("templates");

export default function SfinaePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">テンプレート レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">SFINAE</h1>
        <p className="text-gray-400">置換失敗はエラーではない（SFINAE）の原則と活用方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SFINAEとは</h2>
        <p className="text-gray-300 leading-relaxed">
          SFINAE（Substitution Failure Is Not An Error）は、テンプレート引数の置換に失敗しても
          コンパイルエラーにせず、その候補をオーバーロード解決の対象から除外する仕組みです。
          <code className="text-pink-400">std::enable_if</code> と組み合わせることで、
          型の特性に基づいてテンプレートの有効/無効を切り替えられます。C++20以降はコンセプトで代替可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">enable_ifによるSFINAE</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <type_traits>
using namespace std;

// 整数型の場合のみ有効
template <typename T>
enable_if_t<is_integral_v<T>, void>
printType(T value) {
    cout << value << " は整数型です" << endl;
}

// 浮動小数点型の場合のみ有効
template <typename T>
enable_if_t<is_floating_point_v<T>, void>
printType(T value) {
    cout << value << " は浮動小数点型です" << endl;
}

int main() {
    printType(42);
    printType(3.14);
    printType(100L);
    printType(2.5f);

    return 0;
}`}
          expectedOutput={`42 は整数型です
3.14 は浮動小数点型です
100 は整数型です
2.5 は浮動小数点型です`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型特性とSFINAE</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <type_traits>
#include <string>
using namespace std;

// メンバ関数 size() の有無を検出
template <typename T, typename = void>
struct has_size : false_type {};

template <typename T>
struct has_size<T, void_t<decltype(declval<T>().size())>> : true_type {};

// has_size を使って分岐
template <typename T>
void printInfo(const T& val) {
    if constexpr (has_size<T>::value) {
        cout << "サイズ: " << val.size() << endl;
    } else {
        cout << "サイズ不明の型" << endl;
    }
}

int main() {
    string s = "Hello";
    printInfo(s);

    int n = 42;
    printInfo(n);

    cout << boolalpha;
    cout << "string has size: " << has_size<string>::value << endl;
    cout << "int has size: " << has_size<int>::value << endl;

    return 0;
}`}
          expectedOutput={`サイズ: 5
サイズ不明の型
string has size: true
int has size: false`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="templates" lessonId="sfinae" />
      </div>
      <LessonNav lessons={lessons} currentId="sfinae" basePath="/learn/templates" />
    </div>
  );
}
