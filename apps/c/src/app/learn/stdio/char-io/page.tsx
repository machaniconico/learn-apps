import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

export default function CharIoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準入出力 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字入出力</h1>
        <p className="text-gray-400">getchar()・putchar()・ungetc() を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字単位の入出力</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字単位で入出力する関数群です。シンプルなテキスト処理やパーサーの実装に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">getchar()</code>: 標準入力から1文字読む（int を返す）</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">putchar(c)</code>: 標準出力に1文字書く</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">getc(fp)</code> / <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">putc(c, fp)</code>: ファイルの文字入出力</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">ungetc(c, fp)</code>: 読んだ文字をストリームに戻す</li>
          <li>EOF（-1）で終端を検出</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">putchar で文字出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">putchar</code> で1文字ずつ出力します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

void printString(const char *s) {
    while (*s) {
        putchar(*s);
        s++;
    }
    putchar('\\n');
}

void printReverse(const char *s) {
    int len = strlen(s);
    for (int i = len - 1; i >= 0; i--) {
        putchar(s[i]);
    }
    putchar('\\n');
}

int main() {
    printString("Hello, World!");
    printReverse("Hello");

    // ROT13 変換
    const char *msg = "Hello";
    for (int i = 0; msg[i]; i++) {
        char c = msg[i];
        if (c >= 'a' && c <= 'z') c = (c - 'a' + 13) % 26 + 'a';
        else if (c >= 'A' && c <= 'Z') c = (c - 'A' + 13) % 26 + 'A';
        putchar(c);
    }
    putchar('\\n');

    return 0;
}`}
          expectedOutput={`Hello, World!
olleH
Uryyb`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">getc と ungetc</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">ungetc</code> で読んだ文字をストリームに戻し、次の読み取りでまた取得できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#include <ctype.h>

// 文字列から数字を読む（簡単なパーサー）
int readInt(const char **p) {
    while (**p && !isdigit(**p)) (*p)++;
    if (!**p) return -1;
    int n = 0;
    while (isdigit(**p)) {
        n = n * 10 + (**p - '0');
        (*p)++;
    }
    return n;
}

int main() {
    const char *input = "age: 25, score: 98";
    const char *p = input;

    int age = readInt(&p);
    int score = readInt(&p);

    printf("年齢: %d\\n", age);
    printf("スコア: %d\\n", score);

    return 0;
}`}
          expectedOutput={`年齢: 25
スコア: 98`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdio" lessonId="char-io" />
      </div>
      <LessonNav lessons={lessons} currentId="char-io" basePath="/learn/stdio" />
    </div>
  );
}
