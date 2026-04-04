import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function CharTypePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C言語基礎 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字型</h1>
        <p className="text-gray-400">char型とASCII値・文字操作の基礎を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">char型とASCII</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">char</code> 型は1バイトの整数で、
          <strong className="text-blue-400">ASCIIコード</strong>という規格で文字と数値が対応しています。
          文字リテラルはシングルクォートで囲みます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&apos;A&apos;</code> = 65、<code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&apos;a&apos;</code> = 97</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">&apos;0&apos;</code> = 48（文字のゼロ、数値の0とは異なる）</li>
          <li>char型は整数として扱えるため算術演算が可能</li>
          <li><code className="text-blue-400 bg-gray-800 px-1 py-0.5 rounded">ctype.h</code> に文字判定・変換関数がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字とASCIIコードの関係</h2>
        <p className="text-gray-400 mb-4">
          charは整数として扱えるため、<code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">%c</code> で文字として、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">%d</code> で数値として出力できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    char c = 'A';

    printf("文字: %c\\n", c);
    printf("ASCII値: %d\\n", c);

    // 文字の算術演算
    printf("'A' + 1 = %c (%d)\\n", c + 1, c + 1);
    printf("'A' + 25 = %c (%d)\\n", c + 25, c + 25);

    // アルファベットの出力
    printf("\\nアルファベット: ");
    for (char ch = 'A'; ch <= 'Z'; ch++) {
        printf("%c", ch);
    }
    printf("\\n");

    // 大文字→小文字変換（ASCII差は32）
    char upper = 'H';
    char lower = upper + 32;
    printf("\\n%c -> %c\\n", upper, lower);

    return 0;
}`}
          expectedOutput={`文字: A
ASCII値: 65
'A' + 1 = B (66)
'A' + 25 = Z (90)

アルファベット: ABCDEFGHIJKLMNOPQRSTUVWXYZ

H -> h`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ctype.hの文字判定関数</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">ctype.h</code> には文字の種類を判定する便利な関数があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <ctype.h>

int main() {
    char chars[] = {'A', 'z', '5', ' ', '!'};
    int n = 5;

    for (int i = 0; i < n; i++) {
        char c = chars[i];
        printf("'%c': ", c);
        if (isalpha(c)) printf("英字 ");
        if (isdigit(c)) printf("数字 ");
        if (isspace(c)) printf("空白 ");
        if (isupper(c)) printf("大文字 ");
        if (islower(c)) printf("小文字 ");
        printf("\\n");
    }

    // 大文字・小文字変換
    printf("\\ntoupper('a') = %c\\n", toupper('a'));
    printf("tolower('Z') = %c\\n", tolower('Z'));

    return 0;
}`}
          expectedOutput={`'A': 英字 大文字
'z': 英字 小文字
'5': 数字
' ': 空白
'!':
toupper('a') = A
tolower('Z') = z`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="char-type" />
      </div>
      <LessonNav lessons={lessons} currentId="char-type" basePath="/learn/basics" />
    </div>
  );
}
