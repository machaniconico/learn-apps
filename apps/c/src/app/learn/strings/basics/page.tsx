import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">文字列 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">char配列と文字列、ヌルターミネータ\0の仕組みを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C言語の文字列の仕組み</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には専用の文字列型がなく、文字列は
          <strong className="text-teal-400">char型の配列</strong>として表現されます。
          文字列の末尾には必ず<strong className="text-teal-400">ヌル文字（\0、ASCII値0）</strong>が置かれ、
          文字列の終端を示します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{`"hello"`}</code> は内部で <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{`'h','e','l','l','o','\\0'`}</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strlen()</code> はヌル文字を含まない文字数を返す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof()</code> はヌル文字を含む全バイト数を返す</li>
          <li>バッファは「文字数 + 1」のサイズが必要</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の宣言と基本操作</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">char str[] = "..."</code> で文字列を宣言します。
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">%s</code> フォーマットで表示、<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strlen()</code> で長さを取得します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char msg[] = "Hello, C!";

    printf("文字列: %s\\n", msg);
    printf("strlen: %zu\\n", strlen(msg));   // \\0を含まない
    printf("sizeof: %zu\\n", sizeof(msg));   // \\0を含む

    // 文字ごとのアクセス
    printf("先頭: %c (ASCII: %d)\\n", msg[0], msg[0]);
    printf("末尾のヌル: %d\\n", msg[strlen(msg)]);  // 0

    // インデックスで変更
    msg[7] = 'C';
    printf("変更後: %s\\n", msg);

    return 0;
}`}
          expectedOutput={`文字列: Hello, C!
strlen: 9
sizeof: 10
先頭: H (ASCII: 72)
末尾のヌル: 0
変更後: Hello, C!`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の入力（scanf）</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">scanf("%s", str)</code> でキーボードから文字列を読み込みます。
          バッファサイズを超えないように注意が必要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    // デモ用: 固定の文字列を使用
    char name[50] = "Taro";
    char city[50] = "Tokyo";

    printf("名前: %s\\n", name);
    printf("都市: %s\\n", city);
    printf("名前の長さ: %zu文字\\n", strlen(name));

    // 文字列を結合して表示
    printf("%sさんは%sに住んでいます。\\n", name, city);

    return 0;
}`}
          expectedOutput={`名前: Taro
都市: Tokyo
名前の長さ: 4文字
TaroさんはTokyoに住んでいます。`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="basics" />
      </div>
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/strings" />
    </div>
  );
}
