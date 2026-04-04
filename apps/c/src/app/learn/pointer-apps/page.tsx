import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

const quizQuestions: QuizQuestion[] = [
  {
    question: "関数ポインタ void (*fp)(int); の正しい呼び出し方はどれですか？",
    options: [
      "fp(42);",
      "*fp(42);",
      "&fp(42);",
      "fp->(42);",
    ],
    answer: 0,
    explanation: "関数ポインタはfp(42)または(*fp)(42)の両方で呼び出せます。fp(42)がより一般的な書き方です。",
  },
  {
    question: "char *s = \"hello\"; において s が指すメモリはどこにありますか？",
    options: [
      "スタック領域",
      "ヒープ領域",
      "読み取り専用データ領域（テキストセグメント）",
      "BSS領域",
    ],
    answer: 2,
    explanation: "文字列リテラルは読み取り専用のデータ領域に配置されます。そのため*s = 'H'のような書き換えは未定義動作となります。const char*で宣言すべきです。",
  },
  {
    question: "int *arr[5]; はどのような型を宣言していますか？",
    options: [
      "int型へのポインタ1つ（サイズ5）",
      "int型へのポインタを5つ格納する配列",
      "5要素のint配列へのポインタ",
      "int型の2次元配列",
    ],
    answer: 1,
    explanation: "int *arr[5]は「intへのポインタ」を5つ持つ配列です。各arr[i]はintへのポインタです。これと(*arr)[5]（配列へのポインタ）を混同しないよう注意が必要です。",
  },
  {
    question: "qsort()のコンパレータ関数の正しいシグネチャはどれですか？",
    options: [
      "int compare(int a, int b)",
      "int compare(const void *a, const void *b)",
      "void compare(const void *a, const void *b)",
      "bool compare(void *a, void *b)",
    ],
    answer: 1,
    explanation: "qsort()のコンパレータはint compare(const void *a, const void *b)のシグネチャが必要です。負・0・正の値を返し、aがbより小・等・大であることを示します。",
  },
];

export default function PointerAppsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">ポインタの応用</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          ポインタの応用テクニックを学びましょう。関数ポインタ・コールバック・文字列ポインタ・ポインタ配列など、実践的なCプログラミングで頻繁に使うパターンを習得します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="pointer-apps" totalLessons={6} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/pointer-apps" color="yellow" categoryId="pointer-apps" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数ポインタとコールバック</h2>
        <p className="text-gray-400 mb-4">
          関数もメモリ上のアドレスを持ちます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">void (*fp)(int)</code> のように宣言し、
          関数を引数として渡すコールバックパターンで柔軟な設計が可能です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void greet_en(const char *name) {
    printf("Hello, %s!\\n", name);
}

void greet_jp(const char *name) {
    printf("こんにちは、%sさん！\\n", name);
}

// 関数ポインタを引数に取る関数
void greet(void (*fn)(const char *), const char *name) {
    fn(name);
}

int main() {
    void (*fp)(const char *) = greet_en;
    fp("Alice");

    fp = greet_jp;
    fp("Bob");

    // コールバックとして渡す
    greet(greet_en, "Charlie");
    greet(greet_jp, "田中");

    return 0;
}`}
          expectedOutput={`Hello, Alice!
こんにちは、Bobさん！
Hello, Charlie!
こんにちは、田中さん！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の配列</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">char *names[]</code> は文字列リテラルへのポインタ配列です。
          各要素は異なる長さの文字列を指せるため、効率的な文字列配列として使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    const char *fruits[] = {
        "apple", "banana", "cherry", "date", "elderberry"
    };
    int n = 5;

    printf("フルーツ一覧:\\n");
    for (int i = 0; i < n; i++) {
        printf("  %d: %s\\n", i + 1, fruits[i]);
    }

    return 0;
}`}
          expectedOutput={`フルーツ一覧:
  1: apple
  2: banana
  3: cherry
  4: date
  5: elderberry`}
        />
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
