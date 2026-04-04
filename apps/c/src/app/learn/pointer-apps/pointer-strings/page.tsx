import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointer-apps");

export default function PointerStringsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ポインタの応用 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ポインタと文字列</h1>
        <p className="text-gray-400">char*による文字列リテラルとconst char*の使い方を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">char配列 vs char*</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          文字列を扱う2つの方法には重要な違いがあります。
        </p>
        <div className="space-y-2 text-sm">
          <div className="p-3 rounded bg-gray-800">
            <code className="text-teal-400">char str[] = &quot;hello&quot;;</code>
            <p className="text-gray-400 mt-1">スタック上にコピーを作成。変更可能。sizeof で配列サイズ取得可。</p>
          </div>
          <div className="p-3 rounded bg-gray-800">
            <code className="text-teal-400">const char *p = &quot;hello&quot;;</code>
            <p className="text-gray-400 mt-1">読み取り専用データ領域のリテラルを指す。変更すると未定義動作。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列リテラルとポインタ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">char *p = "hello"</code> はリテラルを指すため、
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">const char *p</code> と書くのが正しいです。
          ポインタ自体は別の文字列を指し直せます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    // char配列: 変更可能なコピー
    char arr[] = "hello";
    arr[0] = 'H';   // OK
    printf("arr: %s\\n", arr);

    // const char*: 読み取り専用リテラルを指す
    const char *p = "world";
    printf("p: %s\\n", p);

    // ポインタは別の文字列を指し直せる
    p = "C language";
    printf("p: %s\\n", p);

    // 文字列長の比較
    printf("strlen(arr) = %zu\\n", strlen(arr));
    printf("strlen(p)   = %zu\\n", strlen(p));

    return 0;
}`}
          expectedOutput={`arr: Hello
p: world
p: C language
strlen(arr) = 5
strlen(p)   = 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ポインタで文字列を走査する</h2>
        <p className="text-gray-400 mb-4">
          char*ポインタをインクリメントして文字列を1文字ずつ処理できます。
          ヌル文字 <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">{`\\0`}</code> を終了条件にします。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int my_strlen(const char *s) {
    const char *p = s;
    while (*p != '\\0') p++;
    return (int)(p - s);
}

void print_chars(const char *s) {
    while (*s) {
        printf("'%c' ", *s);
        s++;
    }
    printf("\\n");
}

int main() {
    const char *msg = "Hello";

    printf("長さ: %d\\n", my_strlen(msg));
    printf("文字: ");
    print_chars(msg);

    return 0;
}`}
          expectedOutput={`長さ: 5
文字: 'H' 'e' 'l' 'l' 'o'`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointer-apps" lessonId="pointer-strings" />
      </div>
      <LessonNav lessons={lessons} currentId="pointer-strings" basePath="/learn/pointer-apps" />
    </div>
  );
}
