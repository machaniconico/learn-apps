import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Singletonパターンの目的は何ですか？",
    options: [
      "クラスのインスタンスを1つだけに制限し、グローバルアクセスを提供する",
      "オブジェクトの生成を抽象化する",
      "アルゴリズムの切り替えを可能にする",
      "オブジェクトに機能を動的に追加する",
    ],
    answer: 0,
    explanation: "Singletonパターンはインスタンスが1つしか存在しないことを保証し、そのインスタンスへのグローバルなアクセスポイントを提供します。",
  },
  {
    question: "Factoryパターンの利点として正しいものはどれですか？",
    options: [
      "オブジェクト生成のロジックをクライアントコードから分離できる",
      "メモリ使用量が必ず削減される",
      "実行速度が向上する",
      "継承が不要になる",
    ],
    answer: 0,
    explanation: "Factoryパターンはオブジェクト生成を専用のファクトリに委譲することで、クライアントコードが具体的なクラスに依存しなくなります。",
  },
  {
    question: "Observerパターンはどのような場面で使いますか？",
    options: [
      "あるオブジェクトの状態変化を複数のオブジェクトに通知したいとき",
      "オブジェクトを1つだけに制限したいとき",
      "アルゴリズムを動的に切り替えたいとき",
      "機能を段階的に追加したいとき",
    ],
    answer: 0,
    explanation: "Observerパターンは1対多の依存関係を定義し、あるオブジェクト(Subject)の状態が変わると、依存するすべてのオブジェクト(Observer)に自動的に通知されます。",
  },
  {
    question: "Pimplイディオムの主な利点は何ですか？",
    options: [
      "実装の詳細を隠蔽し、ヘッダ変更時の再コンパイルを減らせる",
      "実行速度が向上する",
      "メモリリークを防止できる",
      "マルチスレッド安全性を保証する",
    ],
    answer: 0,
    explanation: "Pimplイディオムは実装をポインタ経由で別クラスに持たせることで、ヘッダからprivateメンバを隠し、実装変更時の再コンパイルの連鎖を防ぎます。",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">デザインパターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++で使われる代表的なデザインパターンを学びましょう。Singleton、Factory、Observer、Strategy、Decorator、
          そしてC++特有のPimplイディオムまで、再利用性と保守性の高い設計手法を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={6} color="violet" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="violet" categoryId="design" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターンの例</h2>
        <p className="text-gray-400 mb-4">
          インスタンスを1つに制限するSingletonの基本実装です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Logger {
private:
    string log;
    Logger() = default;
public:
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;

    static Logger& getInstance() {
        static Logger instance;
        return instance;
    }

    void write(const string& msg) {
        log += msg + "\\n";
    }

    void print() const {
        cout << log;
    }
};

int main() {
    Logger::getInstance().write("アプリ起動");
    Logger::getInstance().write("処理実行");
    Logger::getInstance().write("アプリ終了");
    Logger::getInstance().print();
    return 0;
}`}
          expectedOutput={`アプリ起動
処理実行
アプリ終了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Strategyパターンの例</h2>
        <p className="text-gray-400 mb-4">
          アルゴリズムを動的に切り替えるStrategyパターンです。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

// 戦略のインターフェース
class SortStrategy {
public:
    virtual ~SortStrategy() = default;
    virtual string name() const = 0;
};

class QuickSort : public SortStrategy {
public:
    string name() const override { return "クイックソート"; }
};

class MergeSort : public SortStrategy {
public:
    string name() const override { return "マージソート"; }
};

class Sorter {
    unique_ptr<SortStrategy> strategy;
public:
    void setStrategy(unique_ptr<SortStrategy> s) {
        strategy = move(s);
    }
    void sort() {
        cout << strategy->name() << "で並べ替え" << endl;
    }
};

int main() {
    Sorter sorter;
    sorter.setStrategy(make_unique<QuickSort>());
    sorter.sort();

    sorter.setStrategy(make_unique<MergeSort>());
    sorter.sort();
    return 0;
}`}
          expectedOutput={`クイックソートで並べ替え
マージソートで並べ替え`}
        />
      </section>

      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
