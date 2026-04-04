import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C言語で構造体を定義する正しいキーワードはどれですか？",
    options: ["class", "struct", "object", "record"],
    answer: 1,
    explanation: "C言語では struct キーワードを使って構造体を定義します。classはC++で使われます。",
  },
  {
    question: "構造体メンバにアクセスするための演算子はどれですか？",
    options: ["->", "::", ".", "@"],
    answer: 2,
    explanation: "構造体変数から直接メンバにアクセスするにはドット演算子(.)を使います。->はポインタ経由のアクセスに使います。",
  },
  {
    question: "union（共用体）の特徴として正しいのはどれですか？",
    options: [
      "全メンバが個別のメモリ領域を持つ",
      "全メンバが同じメモリ領域を共有する",
      "メンバの数に制限がある",
      "必ずtypedefと一緒に使う必要がある",
    ],
    answer: 1,
    explanation: "unionでは全メンバが同じメモリ領域を共有します。サイズは最も大きいメンバのサイズになります。",
  },
  {
    question: "構造体ポインタからメンバにアクセスする正しい方法はどれですか？",
    options: ["ptr.member", "ptr::member", "ptr->member", "*ptr.member"],
    answer: 2,
    explanation: "構造体ポインタからメンバにアクセスするには -> 演算子を使います。(*ptr).member と同等です。",
  },
];

export default function StructsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">構造体</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">8レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の構造体（struct）を使って複数のデータをまとめる方法を学びます。メンバアクセス、配列、ポインタ、共用体、ビットフィールドまで幅広くカバーします。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="structs" totalLessons={8} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全8レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/structs" color="indigo" categoryId="structs" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">struct</code> キーワードで複数のデータをひとまとめにした型を定義できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

struct Person {
    char name[50];
    int age;
    float height;
};

int main() {
    struct Person p;
    strcpy(p.name, "Alice");
    p.age = 30;
    p.height = 165.5f;

    printf("名前: %s\\n", p.name);
    printf("年齢: %d\\n", p.age);
    printf("身長: %.1f cm\\n", p.height);

    return 0;
}`}
          expectedOutput={`名前: Alice
年齢: 30
身長: 165.5 cm`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体ポインタと-&gt;演算子</h2>
        <p className="text-gray-400 mb-4">
          ポインタ経由で構造体メンバにアクセスするには <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">-&gt;</code> 演算子を使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

struct Point {
    int x;
    int y;
};

void printPoint(struct Point *p) {
    printf("(%d, %d)\\n", p->x, p->y);
}

int main() {
    struct Point pt = {10, 20};
    printPoint(&pt);

    pt.x = 100;
    pt.y = 200;
    printPoint(&pt);

    return 0;
}`}
          expectedOutput={`(10, 20)
(100, 200)`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
