import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++のtry-catch文で、すべての例外をキャッチするには何を使いますか？",
    options: [
      "catch (...)",
      "catch (all)",
      "catch (exception)",
      "catch (*)",
    ],
    answer: 0,
    explanation: "catch(...)は省略記号（エリプシス）を使い、型に関係なくすべての例外をキャッチします。",
  },
  {
    question: "std::runtime_errorの基底クラスはどれですか？",
    options: [
      "std::exception",
      "std::error",
      "std::throwable",
      "std::base_exception",
    ],
    answer: 0,
    explanation: "std::runtime_errorはstd::exceptionを基底クラスとする標準例外クラスです。",
  },
  {
    question: "例外安全性の「強い保証」とはどういう意味ですか？",
    options: [
      "例外が発生しても操作前の状態に戻る",
      "例外が絶対に発生しない",
      "リソースリークが起きない",
      "プログラムが終了しない",
    ],
    answer: 0,
    explanation: "強い保証では、例外が発生した場合、操作が開始される前の状態に完全にロールバックされます。",
  },
  {
    question: "noexcept指定の効果として正しいものはどれですか？",
    options: [
      "関数が例外を投げないことをコンパイラに伝え、最適化を可能にする",
      "例外を自動的にキャッチする",
      "例外をログに記録する",
      "例外の型を制限する",
    ],
    answer: 0,
    explanation: "noexceptを指定すると、コンパイラは例外処理のオーバーヘッドを省略する最適化が可能になります。",
  },
];

export default function ExceptionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">例外処理</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++の例外処理メカニズムを学びましょう。try-catchによるエラーハンドリング、throwによる例外の送出、
          カスタム例外クラスの作成、例外安全性の概念、noexcept指定まで体系的に習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="exceptions" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/exceptions" color="red" categoryId="exceptions" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外処理の基本</h2>
        <p className="text-gray-400 mb-4">
          try-catch文を使って実行時エラーを安全に処理します。throwで例外を投げ、catchでキャッチします。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stdexcept>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("ゼロ除算エラー");
    }
    return a / b;
}

int main() {
    try {
        cout << "10 / 3 = " << divide(10, 3) << endl;
        cout << "10 / 0 = " << divide(10, 0) << endl;
    } catch (const runtime_error& e) {
        cout << "例外: " << e.what() << endl;
    }

    cout << "プログラムは継続します" << endl;
    return 0;
}`}
          expectedOutput={`10 / 3 = 3.33333
例外: ゼロ除算エラー
プログラムは継続します`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタム例外クラス</h2>
        <p className="text-gray-400 mb-4">
          std::exceptionを継承して、独自の例外クラスを作成できます。what()メソッドをオーバーライドしてエラーメッセージを返します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <exception>
#include <string>
using namespace std;

class ValidationError : public exception {
    string message;
public:
    ValidationError(const string& msg) : message(msg) {}
    const char* what() const noexcept override {
        return message.c_str();
    }
};

void setAge(int age) {
    if (age < 0 || age > 150) {
        throw ValidationError("年齢が不正です: " + to_string(age));
    }
    cout << "年齢を" << age << "に設定しました" << endl;
}

int main() {
    try {
        setAge(25);
        setAge(-5);
    } catch (const ValidationError& e) {
        cout << "バリデーションエラー: " << e.what() << endl;
    }
    return 0;
}`}
          expectedOutput={`年齢を25に設定しました
バリデーションエラー: 年齢が不正です: -5`}
        />
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
