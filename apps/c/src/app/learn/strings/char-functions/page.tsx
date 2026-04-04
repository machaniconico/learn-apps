import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function CharFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">文字列 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字関数 (ctype.h)</h1>
        <p className="text-gray-400">isalpha・isdigit・toupper・tolowerなどctype.hの文字分類・変換関数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ctype.h の関数一覧</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#include &lt;ctype.h&gt;</code> で
          文字の分類と変換を行う関数群を使えます。引数は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int</code>（charをキャスト）です。
        </p>
        <div className="grid grid-cols-1 gap-1.5 text-xs">
          {[
            { fn: "isalpha(c)", desc: "アルファベットかどうか (a-z, A-Z)" },
            { fn: "isdigit(c)", desc: "数字かどうか (0-9)" },
            { fn: "isalnum(c)", desc: "アルファベットまたは数字" },
            { fn: "isspace(c)", desc: "空白文字かどうか (スペース、タブ、改行)" },
            { fn: "isupper(c)", desc: "大文字かどうか (A-Z)" },
            { fn: "islower(c)", desc: "小文字かどうか (a-z)" },
            { fn: "toupper(c)", desc: "小文字を大文字に変換" },
            { fn: "tolower(c)", desc: "大文字を小文字に変換" },
          ].map(({ fn, desc }) => (
            <div key={fn} className="flex gap-3 p-2 bg-gray-800 rounded">
              <code className="text-teal-400 shrink-0 w-32">{fn}</code>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字の分類</h2>
        <p className="text-gray-400 mb-4">
          is系関数は条件を満たせば非0（真）、満たさなければ0（偽）を返します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <ctype.h>

int main() {
    char chars[] = "Hello, World! 123";
    int alpha = 0, digit = 0, space = 0, other = 0;

    for (int i = 0; chars[i] != '\\0'; i++) {
        char c = chars[i];
        if (isalpha(c))      alpha++;
        else if (isdigit(c)) digit++;
        else if (isspace(c)) space++;
        else                 other++;
    }

    printf("文字列: \"%s\"\\n", chars);
    printf("アルファベット: %d\\n", alpha);
    printf("数字:           %d\\n", digit);
    printf("空白:           %d\\n", space);
    printf("その他:         %d\\n", other);

    return 0;
}`}
          expectedOutput={`文字列: "Hello, World! 123"
アルファベット: 10
数字:           3
空白:           2
その他:         2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">toupper・tolower による変換</h2>
        <p className="text-gray-400 mb-4">
          文字列全体を大文字・小文字に変換するには、各文字に <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">toupper()</code> または
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">tolower()</code> を適用します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <ctype.h>
#include <string.h>

void to_upper_str(char *s) {
    for (int i = 0; s[i]; i++) s[i] = (char)toupper(s[i]);
}

void to_lower_str(char *s) {
    for (int i = 0; s[i]; i++) s[i] = (char)tolower(s[i]);
}

int main() {
    char text[] = "Hello, World!";
    printf("元の文字列: %s\\n", text);

    char upper[50], lower[50];
    strcpy(upper, text);
    strcpy(lower, text);

    to_upper_str(upper);
    to_lower_str(lower);

    printf("大文字: %s\\n", upper);
    printf("小文字: %s\\n", lower);

    return 0;
}`}
          expectedOutput={`元の文字列: Hello, World!
大文字: HELLO, WORLD!
小文字: hello, world!`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="char-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="char-functions" basePath="/learn/strings" />
    </div>
  );
}
