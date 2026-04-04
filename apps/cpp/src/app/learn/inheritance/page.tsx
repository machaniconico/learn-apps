import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++の仮想関数（virtual）の目的は何ですか？",
    options: [
      "実行時に派生クラスのオーバーライドされた関数を呼び出す（ポリモーフィズム）",
      "関数をインライン化して高速にする",
      "関数をprivateにする",
      "メモリ使用量を削減する",
    ],
    answer: 0,
    explanation:
      "virtualキーワードにより、基底クラスのポインタ・参照を通じて派生クラスのオーバーライドされた関数が実行時に正しく呼び出されます。",
  },
  {
    question: "純粋仮想関数を持つクラスについて正しいものはどれですか？",
    options: [
      "インスタンスを直接生成できない抽象クラスになる",
      "派生クラスは実装しなくてもよい",
      "純粋仮想関数は実装を持てない",
      "1つのクラスに1つしか定義できない",
    ],
    answer: 0,
    explanation:
      "純粋仮想関数（= 0）を持つクラスは抽象クラスとなり、直接インスタンス化できません。派生クラスで必ず実装する必要があります。",
  },
  {
    question: "多重継承のダイヤモンド問題とは何ですか？",
    options: [
      "同じ基底クラスが複数の経路で継承され、メンバが重複する問題",
      "3つ以上のクラスを同時に継承できない問題",
      "コンストラクタが2回呼ばれる問題",
      "デストラクタが呼ばれない問題",
    ],
    answer: 0,
    explanation:
      "ダイヤモンド問題は、クラスAを継承するB,Cを共にDが継承する場合、Aのメンバが2つ存在してしまう問題です。仮想継承で解決します。",
  },
  {
    question: "override指定子の役割として正しいものはどれですか？",
    options: [
      "基底クラスの仮想関数を正しくオーバーライドしていることをコンパイラに確認させる",
      "関数を高速化する",
      "関数をprivateにする",
      "派生クラスでの再定義を禁止する",
    ],
    answer: 0,
    explanation:
      "overrideを付けると、基底クラスに対応する仮想関数がない場合にコンパイルエラーになり、タイプミスなどのバグを防げます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">継承・多態性</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++の継承とポリモーフィズムを学びましょう。基底クラスの継承・仮想関数・純粋仮想関数から、
          多重継承・仮想継承・RTTI・演算子オーバーロードまで、オブジェクト指向プログラミングの核心を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={8} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="violet" categoryId="inheritance" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承とポリモーフィズム</h2>
        <p className="text-gray-400 mb-4">
          継承により既存クラスの機能を引き継ぎ、仮想関数により同じインターフェースで異なる動作を実現します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;  // 純粋仮想関数
    virtual string name() const = 0;
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    string name() const override { return "円"; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    string name() const override { return "長方形"; }
};

int main() {
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Rectangle>(4.0, 6.0));

    for (const auto& s : shapes)
        cout << s->name() << "の面積: " << s->area() << endl;

    return 0;
}`}
          expectedOutput={`円の面積: 78.5398
長方形の面積: 24`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演算子オーバーロード</h2>
        <p className="text-gray-400 mb-4">
          クラスに対して演算子を定義することで、直感的な操作が可能になります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class Vector2D {
public:
    double x, y;
    Vector2D(double x, double y) : x(x), y(y) {}

    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }

    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};

int main() {
    Vector2D a(1.0, 2.0);
    Vector2D b(3.0, 4.0);
    Vector2D c = a + b;

    cout << a << " + " << b << " = " << c << endl;

    return 0;
}`}
          expectedOutput={`(1, 2) + (3, 4) = (4, 6)`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
