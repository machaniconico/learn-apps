import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

const quizQuestions: QuizQuestion[] = [
  {
    question: "スタックとヒープの違いとして正しいものはどれですか？",
    options: [
      "スタックは自動管理され、ヒープは手動で確保・解放する",
      "ヒープの方がスタックより高速にアクセスできる",
      "スタックのサイズは無制限である",
      "ヒープに確保した変数は関数終了時に自動解放される",
    ],
    answer: 0,
    explanation:
      "スタック変数は関数のスコープを抜けると自動的に解放されますが、ヒープはnew/deleteやスマートポインタで明示的に管理する必要があります。",
  },
  {
    question: "RAIIの原則として正しいものはどれですか？",
    options: [
      "リソースの取得をオブジェクトの初期化時に行い、解放をデストラクタで行う",
      "リソースは常にグローバル変数で管理する",
      "new で確保したメモリは明示的に delete しなくてよい",
      "RAIIはC++20で初めて導入された機能である",
    ],
    answer: 0,
    explanation:
      "RAII (Resource Acquisition Is Initialization) は、コンストラクタでリソースを取得し、デストラクタで確実に解放するC++の重要な設計原則です。",
  },
  {
    question: "メモリリークが発生する原因として正しいものはどれですか？",
    options: [
      "newで確保したメモリをdeleteせずに参照を失う",
      "スタック変数を関数内で使用する",
      "constポインタを使用する",
      "std::vectorを使用する",
    ],
    answer: 0,
    explanation:
      "newで確保したメモリへのポインタを失うと、そのメモリを解放する手段がなくなりメモリリークが発生します。",
  },
  {
    question: "alignas指定子について正しいものはどれですか？",
    options: [
      "変数や型のメモリアライメントを指定できる",
      "メモリの確保サイズを制限する",
      "ポインタのサイズを変更する",
      "ヒープメモリの確保を禁止する",
    ],
    answer: 0,
    explanation:
      "alignasを使うと変数や構造体のアライメント要件を指定でき、SIMD命令やキャッシュライン最適化に活用できます。",
  },
];

export default function MemoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2">メモリ管理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のメモリ管理を学びましょう。スタックとヒープの違い、new/deleteによる動的メモリ管理、メモリリークの検出と対策、
          RAIIパターン、アライメント、カスタムアロケータなど、メモリを正しく扱うための知識を習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="memory" totalLessons={6} color="orange" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/memory" color="orange" categoryId="memory" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックとヒープの概要</h2>
        <p className="text-gray-400 mb-4">
          C++ではメモリ領域がスタックとヒープに分かれています。スタックは高速で自動管理、ヒープは柔軟だが手動管理が必要です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    // スタック: 自動管理
    int stackVar = 42;
    cout << "スタック変数: " << stackVar << endl;

    // ヒープ: 手動管理
    int* heapVar = new int(100);
    cout << "ヒープ変数: " << *heapVar << endl;

    delete heapVar; // 手動で解放
    cout << "メモリ解放完了" << endl;

    return 0;
}`}
          expectedOutput={`スタック変数: 42
ヒープ変数: 100
メモリ解放完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RAIIの基本</h2>
        <p className="text-gray-400 mb-4">
          RAIIパターンを使えば、オブジェクトのライフタイムに合わせてリソースを自動管理できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

int main() {
    // unique_ptrによるRAII
    unique_ptr<int> ptr = make_unique<int>(42);
    cout << "値: " << *ptr << endl;

    // スコープを抜けると自動的にdelete
    {
        unique_ptr<int[]> arr = make_unique<int[]>(3);
        arr[0] = 10; arr[1] = 20; arr[2] = 30;
        cout << "配列: " << arr[0] << ", " << arr[1] << ", " << arr[2] << endl;
    }
    cout << "スコープ内の配列は自動解放済み" << endl;

    return 0;
}`}
          expectedOutput={`値: 42
配列: 10, 20, 30
スコープ内の配列は自動解放済み`}
        />
      </section>

      <Quiz questions={quizQuestions} color="orange" />
    </div>
  );
}
