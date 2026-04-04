import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C++のクラスのデフォルトのアクセス修飾子は何ですか？",
    options: [
      "private",
      "public",
      "protected",
      "internal",
    ],
    answer: 0,
    explanation:
      "C++のclassではメンバのデフォルトのアクセス修飾子はprivateです。structではデフォルトがpublicになります。",
  },
  {
    question: "デストラクタについて正しいものはどれですか？",
    options: [
      "オブジェクトが破棄されるときに自動的に呼ばれる",
      "オブジェクトの生成時に呼ばれる",
      "引数を受け取ることができる",
      "複数定義できる",
    ],
    answer: 0,
    explanation:
      "デストラクタはオブジェクトのライフタイム終了時に自動的に呼び出され、リソースの解放などを行います。引数なし・戻り値なしで1つだけ定義できます。",
  },
  {
    question: "staticメンバ変数について正しいものはどれですか？",
    options: [
      "すべてのインスタンスで共有される",
      "インスタンスごとに独立した値を持つ",
      "constでなければならない",
      "メンバ関数からアクセスできない",
    ],
    answer: 0,
    explanation:
      "staticメンバ変数はクラスに1つだけ存在し、すべてのインスタンスで共有されます。クラス外で定義が必要です。",
  },
  {
    question: "enum classとenumの違いとして正しいものはどれですか？",
    options: [
      "enum classはスコープ付きで暗黙の型変換が行われない",
      "enum classは値を指定できない",
      "enumの方がC++11以降推奨されている",
      "enum classは文字列型のみ使える",
    ],
    answer: 0,
    explanation:
      "enum class（スコープ付き列挙型）はC++11で導入され、名前空間の汚染を防ぎ、暗黙の整数変換を禁止します。",
  },
];

export default function ClassesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-2">クラス基礎</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++のクラスの基礎を学びましょう。クラスの定義・コンストラクタ・デストラクタ・アクセス修飾子から、
          staticメンバ・structとの違い・enum classまで、オブジェクト指向の土台を築きます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="classes" totalLessons={8} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/classes" color="indigo" categoryId="classes" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの概要</h2>
        <p className="text-gray-400 mb-4">
          クラスはデータとそれに関連する操作をまとめた設計図です。コンストラクタでオブジェクトを初期化し、メンバ関数で操作を定義します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Dog {
private:
    string name;
    int age;

public:
    // コンストラクタ
    Dog(string n, int a) : name(n), age(a) {}

    // メンバ関数
    void bark() const {
        cout << name << "「ワン！」" << endl;
    }

    void info() const {
        cout << name << " (" << age << "歳)" << endl;
    }
};

int main() {
    Dog dog1("ポチ", 3);
    Dog dog2("ハチ", 5);

    dog1.bark();
    dog1.info();
    dog2.bark();
    dog2.info();

    return 0;
}`}
          expectedOutput={`ポチ「ワン！」
ポチ (3歳)
ハチ「ワン！」
ハチ (5歳)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">アクセス制御とカプセル化</h2>
        <p className="text-gray-400 mb-4">
          アクセス修飾子（public/private/protected）を使ってデータを保護し、安全なインターフェースを提供します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;  // 外部から直接アクセスできない

public:
    BankAccount(double initial) : balance(initial) {}

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << amount << "円 入金 → 残高: " << balance << "円" << endl;
        }
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << amount << "円 出金 → 残高: " << balance << "円" << endl;
            return true;
        }
        cout << "出金失敗" << endl;
        return false;
    }

    double getBalance() const { return balance; }
};

int main() {
    BankAccount account(1000);
    account.deposit(500);
    account.withdraw(300);
    cout << "最終残高: " << account.getBalance() << "円" << endl;
    return 0;
}`}
          expectedOutput={`500円 入金 → 残高: 1500円
300円 出金 → 残高: 1200円
最終残高: 1200円`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
