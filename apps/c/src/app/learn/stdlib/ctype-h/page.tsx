import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdlib");

export default function CtypeHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準ライブラリ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ctype.h</h1>
        <p className="text-gray-400">文字の分類と変換を行う isalpha・isdigit・toupper・tolower などを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ctype.h の関数一覧</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">&lt;ctype.h&gt;</code> の関数は int 型の文字コードを受け取り、
          分類関数は 0 以外（真）または 0（偽）を返します。変換関数は変換後の文字コードを返します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">isalpha(c)</code> - アルファベットか</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">isdigit(c)</code> - 数字か</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">isalnum(c)</code> - アルファベットまたは数字か</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">isspace(c)</code> - 空白文字か</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">isupper(c) / islower(c)</code> - 大文字・小文字か</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">toupper(c) / tolower(c)</code> - 大文字・小文字に変換</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字の分類</h2>
        <p className="text-gray-400 mb-4">
          各 is* 関数は条件を満たす場合に 0 以外の整数、満たさない場合に 0 を返します。
          if 文の条件として直接使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <ctype.h>

int main() {
    char chars[] = {'A', '3', ' ', 'z', '!'};
    int n = 5;

    for (int i = 0; i < n; i++) {
        char c = chars[i];
        printf("'%c': alpha=%d digit=%d space=%d alnum=%d\\n",
               c,
               isalpha(c) ? 1 : 0,
               isdigit(c) ? 1 : 0,
               isspace(c) ? 1 : 0,
               isalnum(c) ? 1 : 0);
    }
    return 0;
}`}
          expectedOutput={`'A': alpha=1 digit=0 space=0 alnum=1
'3': alpha=0 digit=1 space=0 alnum=1
' ': alpha=0 digit=0 space=1 alnum=0
'z': alpha=1 digit=0 space=0 alnum=1
'!': alpha=0 digit=0 space=0 alnum=0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">toupper() と tolower()</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">toupper()</code> と <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">tolower()</code> は
          1文字を変換します。非アルファベットはそのまま返ります。文字列全体を変換するにはループを使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <ctype.h>
#include <string.h>

void toUpperStr(char *s) {
    for (int i = 0; s[i]; i++)
        s[i] = (char)toupper((unsigned char)s[i]);
}

void toLowerStr(char *s) {
    for (int i = 0; s[i]; i++)
        s[i] = (char)tolower((unsigned char)s[i]);
}

int main() {
    char upper[] = "Hello, World!";
    char lower[] = "Hello, World!";

    toUpperStr(upper);
    toLowerStr(lower);

    printf("Upper: %s\\n", upper);
    printf("Lower: %s\\n", lower);
    return 0;
}`}
          expectedOutput={`Upper: HELLO, WORLD!
Lower: hello, world!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の検証</h2>
        <p className="text-gray-400 mb-4">
          ctype.h の関数を組み合わせて、文字列が数字のみか・アルファベットのみかを検証できます。
          入力バリデーションによく使われるパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <ctype.h>

int isAllDigits(const char *s) {
    for (int i = 0; s[i]; i++)
        if (!isdigit((unsigned char)s[i])) return 0;
    return 1;
}

int main() {
    printf("\"12345\" all digits: %d\\n", isAllDigits("12345"));
    printf("\"123a5\" all digits: %d\\n", isAllDigits("123a5"));
    printf("\"\"     all digits: %d\\n", isAllDigits(""));
    return 0;
}`}
          expectedOutput={`"12345" all digits: 1
"123a5" all digits: 0
""     all digits: 1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdlib" lessonId="ctype-h" />
      </div>
      <LessonNav lessons={lessons} currentId="ctype-h" basePath="/learn/stdlib" />
    </div>
  );
}
