import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

const quizQuestions: QuizQuestion[] = [
  {
    question: "std::unique_ptrの特徴として正しいものはどれですか？",
    options: [
      "排他的所有権を持ち、コピーできない",
      "複数のポインタで共有できる",
      "循環参照を自動的に解決する",
      "生のポインタより遅い",
    ],
    answer: 0,
    explanation: "unique_ptrは排他的所有権を持つスマートポインタで、コピーはできずムーブのみ可能です。オーバーヘッドはほぼゼロです。",
  },
  {
    question: "std::shared_ptrが内部で使用している仕組みはどれですか？",
    options: [
      "参照カウント方式",
      "ガベージコレクション",
      "マークアンドスイープ",
      "世代別管理",
    ],
    answer: 0,
    explanation: "shared_ptrは参照カウント方式を使い、最後のshared_ptrが破棄されたときにリソースを解放します。",
  },
  {
    question: "std::weak_ptrの主な用途はどれですか？",
    options: [
      "shared_ptrの循環参照を防ぐ",
      "unique_ptrを共有する",
      "生のポインタを安全にラップする",
      "メモリリークを検出する",
    ],
    answer: 0,
    explanation: "weak_ptrはshared_ptrの参照カウントに影響を与えず、循環参照を防ぐために使われます。",
  },
  {
    question: "make_uniqueやmake_sharedを使う利点として正しいものはどれですか？",
    options: [
      "例外安全性が高くメモリ効率が良い",
      "コンパイル時間が短縮される",
      "実行時の型チェックが可能になる",
      "ポインタの無効化を自動検出する",
    ],
    answer: 0,
    explanation: "make_unique/make_sharedはnewの直接使用より例外安全で、make_sharedはメモリアロケーションを1回にまとめて効率的です。",
  },
];

export default function SmartptrPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">スマートポインタ</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のスマートポインタを学びましょう。unique_ptr・shared_ptr・weak_ptrの使い分け、make関数、
          カスタムデリータ、所有権パターンなど、安全なメモリ管理の手法を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="smartptr" totalLessons={6} color="teal" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/smartptr" color="teal" categoryId="smartptr" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スマートポインタの概要</h2>
        <p className="text-gray-400 mb-4">
          スマートポインタはRAII原則に基づき、スコープを抜けるときに自動的にメモリを解放します。生のnew/deleteを直接使う必要がなくなります。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Resource {
    string name;
public:
    Resource(const string& n) : name(n) {
        cout << name << " を作成" << endl;
    }
    ~Resource() {
        cout << name << " を破棄" << endl;
    }
    void greet() const {
        cout << name << " です！" << endl;
    }
};

int main() {
    // unique_ptr: 排他的所有権
    auto u = make_unique<Resource>("Unique");
    u->greet();

    // shared_ptr: 共有所有権
    auto s1 = make_shared<Resource>("Shared");
    {
        auto s2 = s1; // 参照カウント: 2
        cout << "参照カウント: " << s1.use_count() << endl;
    }
    cout << "参照カウント: " << s1.use_count() << endl;

    return 0;
}`}
          expectedOutput={`Unique を作成
Unique です！
Shared を作成
参照カウント: 2
参照カウント: 1
Shared を破棄
Unique を破棄`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">weak_ptrで循環参照を防ぐ</h2>
        <p className="text-gray-400 mb-4">
          shared_ptr同士が互いを参照すると循環参照が起き、メモリリークの原因になります。weak_ptrで片方の参照を弱くすることで解決できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

struct Node {
    string name;
    shared_ptr<Node> next;
    weak_ptr<Node> prev; // weak_ptrで循環参照を防ぐ

    Node(const string& n) : name(n) {
        cout << name << " 作成" << endl;
    }
    ~Node() {
        cout << name << " 破棄" << endl;
    }
};

int main() {
    auto a = make_shared<Node>("A");
    auto b = make_shared<Node>("B");

    a->next = b;
    b->prev = a; // weak_ptrなので循環参照にならない

    cout << "A ref count: " << a.use_count() << endl;
    cout << "B ref count: " << b.use_count() << endl;

    return 0;
}`}
          expectedOutput={`A 作成
B 作成
A ref count: 1
B ref count: 2
B 破棄
A 破棄`}
        />
      </section>

      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
