import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("references");

const quizQuestions: QuizQuestion[] = [
  {
    question: "参照変数の宣言に使う記号はどれですか？",
    options: [
      "*（アスタリスク）",
      "&（アンパサンド）",
      "->（アロー演算子）",
      "::（スコープ解決演算子）",
    ],
    answer: 1,
    explanation: "参照変数は & を使って宣言します。例: int& ref = x; は x への参照を作成します。",
  },
  {
    question: "const参照（const int& ref）の特徴として正しいものはどれですか？",
    options: [
      "参照先の値を変更できる",
      "参照先の値を変更できず、右辺値（リテラル等）もバインドできる",
      "宣言後に別の変数を再バインドできる",
      "ポインタと同じくnullptrを代入できる",
    ],
    answer: 1,
    explanation: "const参照は参照先を変更できず、リテラルや一時オブジェクトもバインドできます。関数の引数でコピーを避けつつ安全に値を受け取るのに最適です。",
  },
  {
    question: "右辺値参照（&&）の主な用途はどれですか？",
    options: [
      "左辺値をコピーするため",
      "一時オブジェクトのリソースを効率的に移動（ムーブ）するため",
      "ポインタの代わりに使うため",
      "constを外すため",
    ],
    answer: 1,
    explanation: "右辺値参照はムーブセマンティクスの基盤です。一時オブジェクトのリソース（メモリ等）を新しいオブジェクトに移動し、不要なコピーを回避します。",
  },
  {
    question: "参照とポインタの違いとして正しいものはどれですか？",
    options: [
      "参照は宣言後に別のオブジェクトを指せるが、ポインタは指せない",
      "参照はnullにできないが、ポインタはnullにできる",
      "参照はメモリを消費するが、ポインタは消費しない",
      "参照はヒープ上にのみ存在する",
    ],
    answer: 1,
    explanation: "参照は初期化時に必ず有効なオブジェクトをバインドし、その後再バインドできません。ポインタはnullptrを持てますし、後から別のオブジェクトを指すこともできます。",
  },
];

export default function ReferencesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">参照</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++の参照は変数のエイリアス（別名）を作る仕組みです。
          基本的な参照・const参照・ポインタとの比較・右辺値参照・完全転送まで、
          効率的で安全なコードを書くための参照の使い方を学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="references" totalLessons={5} color="yellow" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/references" color="yellow" categoryId="references" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照の概要</h2>
        <p className="text-gray-400 mb-4">
          参照は既存の変数に別名を付ける機能です。
          <code className="text-yellow-400">int&amp; ref = x;</code> とすると ref は x と同じオブジェクトを指します。
          ポインタと違い、null にはできず、宣言時に必ず初期化が必要です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10, y = 20;
    cout << "交換前: x=" << x << ", y=" << y << endl;

    swap(x, y);  // 参照渡しなので実体が変わる
    cout << "交換後: x=" << x << ", y=" << y << endl;

    int& ref = x;
    ref = 99;
    cout << "ref経由で変更後: x=" << x << endl;

    return 0;
}`}
          expectedOutput={`交換前: x=10, y=20
交換後: x=20, y=10
ref経由で変更後: x=99`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">const参照と右辺値参照</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-yellow-400">const int&amp;</code> は変更不可な参照で、リテラルもバインドできます。
          <code className="text-yellow-400">int&amp;&amp;</code> は右辺値参照で、ムーブセマンティクスの基盤です。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

void print(const string& s) {
    cout << "const参照: " << s << endl;
}

void process(string&& s) {
    cout << "右辺値参照: " << s << endl;
}

int main() {
    string name = "C++";
    print(name);        // 左辺値 → const参照OK
    print("Hello");     // 右辺値 → const参照OK

    process("World");        // 右辺値 → 右辺値参照OK
    process(std::move(name)); // moveで右辺値に変換
    cout << "move後のname: \"" << name << "\"" << endl;

    return 0;
}`}
          expectedOutput={`const参照: C++
const参照: Hello
右辺値参照: World
右辺値参照: C++
move後のname: ""`}
        />
      </section>

      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
