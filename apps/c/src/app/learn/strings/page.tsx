import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

const quizQuestions: QuizQuestion[] = [
  {
    question: "char str[] = \"hello\"; において sizeof(str) の値はいくつですか？",
    options: [
      "5",
      "6",
      "8",
      "4",
    ],
    answer: 1,
    explanation: "文字列\"hello\"は5文字ですが、末尾にヌル文字\\0が自動で追加されるためsizeof(str)は6になります。strlen(str)は5を返します。",
  },
  {
    question: "strcpy(dst, src) と strncpy(dst, src, n) の主な違いはどれですか？",
    options: [
      "strcpyは高速で、strncpyは低速である",
      "strncpyはコピーする最大バイト数を指定でき、バッファオーバーフローを防げる",
      "strncpyは大文字小文字を無視してコピーする",
      "strncpyはsrcがdstより長い場合コンパイルエラーになる",
    ],
    answer: 1,
    explanation: "strncpy(dst, src, n)は最大n文字しかコピーしないため、バッファオーバーフローを防げます。ただしsrcがn文字以上の場合ヌル終端されないことに注意が必要です。",
  },
  {
    question: "strtok(str, delim) の動作として正しい説明はどれですか？",
    options: [
      "strを分割した新しい文字列を返す",
      "元の文字列を変更しながらトークンへのポインタを返す",
      "strの中でdelimを検索してインデックスを返す",
      "strをdelimで結合する",
    ],
    answer: 1,
    explanation: "strtokは元の文字列内の区切り文字をヌル文字に置き換えてトークンのポインタを返します。元の文字列を破壊的に変更するため、文字列リテラルには使えません。",
  },
  {
    question: "snprintf(buf, size, fmt, ...) においてsize引数の意味はどれですか？",
    options: [
      "出力する最大文字数（ヌル終端を含む）",
      "バッファの最小サイズ",
      "フォーマット文字列の長さ",
      "出力する引数の数",
    ],
    answer: 0,
    explanation: "snprintfのsize引数はヌル終端文字を含む最大書き込みバイト数を指定します。これによりバッファオーバーフローを防ぎます。sprintfより安全なため積極的に使うべきです。",
  },
];

export default function StringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">文字列</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語の文字列はchar配列で表現されます。ヌルターミネータの仕組みから、string.hの標準関数・安全な文字列操作・書式付き文字列処理まで、文字列操作の全体を学びます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="strings" totalLessons={6} color="purple" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/strings" color="purple" categoryId="strings" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列とヌルターミネータ</h2>
        <p className="text-gray-400 mb-4">
          C言語の文字列はchar配列で、末尾に
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">{`\\0`}</code>（ヌル文字）が付きます。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strlen()</code> はこの文字までの長さを返します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Hello, C!";

    printf("文字列: %s\\n", str);
    printf("長さ(strlen): %zu\\n", strlen(str));
    printf("サイズ(sizeof): %zu\\n", sizeof(str));

    // 文字ごとにアクセス
    printf("先頭文字: %c\\n", str[0]);
    printf("末尾のヌル文字: %d (0)\\n", str[strlen(str)]);

    return 0;
}`}
          expectedOutput={`文字列: Hello, C!
長さ(strlen): 9
サイズ(sizeof): 10
先頭文字: H
末尾のヌル文字: 0 (0)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">string.hの主要関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#include &lt;string.h&gt;</code> で
          文字列操作の便利な関数群を使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello";
    char dst[20];

    // strcpy: コピー
    strcpy(dst, src);
    printf("strcpy: %s\\n", dst);

    // strcat: 結合
    strcat(dst, ", World!");
    printf("strcat: %s\\n", dst);

    // strcmp: 比較（0なら等しい）
    printf("strcmp: %d\\n", strcmp("abc", "abc"));
    printf("strcmp: %d\\n", strcmp("abc", "abd"));

    return 0;
}`}
          expectedOutput={`strcpy: Hello
strcat: Hello, World!
strcmp: 0
strcmp: -1`}
        />
      </section>

      <Quiz questions={quizQuestions} color="purple" />
    </div>
  );
}
