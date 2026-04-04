import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("move");

const quizQuestions: QuizQuestion[] = [
  {
    question: "左辺値（lvalue）と右辺値（rvalue）の違いとして正しいものはどれですか？",
    options: [
      "左辺値はアドレスを取得でき、右辺値は一時的な値でアドレスを取得できない",
      "左辺値は定数で、右辺値は変数である",
      "左辺値はヒープに、右辺値はスタックに配置される",
      "左辺値と右辺値に違いはない",
    ],
    answer: 0,
    explanation:
      "左辺値は名前を持ちアドレスを取得できる式（変数など）で、右辺値は一時的な値（リテラルや式の結果）でアドレスを取得できません。",
  },
  {
    question: "std::moveの役割として正しいものはどれですか？",
    options: [
      "左辺値を右辺値参照にキャストする",
      "オブジェクトのメモリを物理的に移動する",
      "オブジェクトを自動的に削除する",
      "コピーコンストラクタを呼び出す",
    ],
    answer: 0,
    explanation:
      "std::moveは実際にはデータの移動を行わず、左辺値を右辺値参照にキャスト（static_cast<T&&>）するだけです。ムーブコンストラクタやムーブ代入が呼ばれるきっかけを作ります。",
  },
  {
    question: "5の規則（Rule of Five）に含まれる特殊メンバ関数はどれですか？",
    options: [
      "デストラクタ、コピーコンストラクタ、コピー代入、ムーブコンストラクタ、ムーブ代入",
      "デストラクタ、コンストラクタ、コピーコンストラクタ、演算子オーバーロード、friend関数",
      "デストラクタ、コピーコンストラクタ、ムーブコンストラクタ、swap関数、clone関数",
      "コンストラクタ、デストラクタ、new演算子、delete演算子、コピーコンストラクタ",
    ],
    answer: 0,
    explanation:
      "5の規則は、デストラクタ・コピーコンストラクタ・コピー代入演算子・ムーブコンストラクタ・ムーブ代入演算子の5つを指します。1つを定義したら残りも定義すべきです。",
  },
  {
    question: "ムーブコンストラクタにnoexceptを付ける理由として正しいものはどれですか？",
    options: [
      "STLコンテナがムーブを安全に使用するためにnoexcept保証が必要だから",
      "noexceptがないとコンパイルエラーになるから",
      "noexceptを付けるとムーブ操作が高速化されるから",
      "noexceptはC++のコーディング規約で必須とされているから",
    ],
    answer: 0,
    explanation:
      "std::vectorなどのSTLコンテナは、リサイズ時にnoexceptなムーブコンストラクタがある場合のみムーブを使います。noexceptがないとコピーにフォールバックし効率が下がります。",
  },
];

export default function MovePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">ムーブセマンティクス</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のムーブセマンティクスを学びましょう。左辺値・右辺値の概念、ムーブコンストラクタ・ムーブ代入演算子の実装、
          std::moveの使い方、5の規則、noexceptの重要性など、効率的なリソース管理の仕組みを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="move" totalLessons={6} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/move" color="blue" categoryId="move" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブの概要</h2>
        <p className="text-gray-400 mb-4">
          ムーブセマンティクスにより、不要なコピーを避けてリソースの所有権を効率的に移転できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
#include <utility>
using namespace std;

int main() {
    string s1 = "Hello, Move Semantics!";
    cout << "s1: " << s1 << endl;
    cout << "s1のサイズ: " << s1.size() << endl;

    // std::moveで所有権を移転
    string s2 = std::move(s1);
    cout << "ムーブ後:" << endl;
    cout << "s1: \"" << s1 << "\" (空になった)" << endl;
    cout << "s2: " << s2 << endl;

    return 0;
}`}
          expectedOutput={`s1: Hello, Move Semantics!
s1のサイズ: 21
ムーブ後:
s1: "" (空になった)
s2: Hello, Move Semantics!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ムーブコンストラクタの例</h2>
        <p className="text-gray-400 mb-4">
          自前のクラスでムーブコンストラクタを実装すると、リソースの所有権移転を制御できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <utility>
using namespace std;

class Buffer {
    int* data;
    int size;
public:
    Buffer(int n) : data(new int[n]), size(n) {
        for (int i = 0; i < n; i++) data[i] = i;
        cout << "構築: サイズ " << size << endl;
    }
    // ムーブコンストラクタ
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
        cout << "ムーブ構築: サイズ " << size << endl;
    }
    ~Buffer() {
        delete[] data;
        cout << "破棄: サイズ " << size << endl;
    }
    int getSize() const { return size; }
};

int main() {
    Buffer b1(5);
    cout << "b1サイズ: " << b1.getSize() << endl;

    Buffer b2 = std::move(b1);
    cout << "b1サイズ: " << b1.getSize() << " (ムーブ済み)" << endl;
    cout << "b2サイズ: " << b2.getSize() << endl;

    return 0;
}`}
          expectedOutput={`構築: サイズ 5
b1サイズ: 5
ムーブ構築: サイズ 5
b1サイズ: 0 (ムーブ済み)
b2サイズ: 5
破棄: サイズ 5
破棄: サイズ 0`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
