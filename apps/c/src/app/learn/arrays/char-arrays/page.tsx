import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function CharArraysPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字配列</h1>
        <p className="text-gray-400">char配列と文字列、ヌルターミネータ\0の仕組みを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C言語の文字列 = char配列 + \0</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には組み込みの文字列型がありません。文字列は
          <strong className="text-teal-400">char配列にヌル文字(\0)を末尾に付けたもの</strong>として表現されます。
          文字列関数はこのヌル文字を文字列の終端として認識します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{`char s[] = "Hi"`}</code> → <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{`'H','i','\\0'`}</code> の3要素</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">strlen(s)</code> は <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">\0</code> を含まない長さを返す</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof(s)</code> は \0 を含むバイト数を返す</li>
          <li>バッファには文字数+1のサイズが必要（\0の分）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">char配列と文字列の操作</h2>
        <p className="text-gray-400 mb-4">
          char配列は個々の文字を操作でき、文字列全体をprintf/scanfで扱えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char greeting[] = "Hello";

    printf("文字列: %s\\n", greeting);
    printf("strlen: %zu\\n", strlen(greeting));
    printf("sizeof: %zu\\n", sizeof(greeting));

    // 文字ごとにアクセス
    printf("文字: ");
    for (int i = 0; greeting[i] != '\\0'; i++) {
        printf("[%c]", greeting[i]);
    }
    printf("\\n");

    // 文字を変更
    greeting[0] = 'J';
    printf("変更後: %s\\n", greeting);

    return 0;
}`}
          expectedOutput={`文字列: Hello
strlen: 5
sizeof: 6
文字: [H][e][l][l][o]
変更後: Jello`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字配列の手動構築</h2>
        <p className="text-gray-400 mb-4">
          char配列を手動で構築する場合、必ず末尾に <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">{`\\0`}</code> を置く必要があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // 手動でchar配列を構築
    char word[6];
    word[0] = 'W';
    word[1] = 'o';
    word[2] = 'r';
    word[3] = 'l';
    word[4] = 'd';
    word[5] = '\\0';  // ヌルターミネータ必須！

    printf("word: %s\\n", word);

    // 文字コードで確認
    printf("文字コード: ");
    for (int i = 0; i <= 5; i++) {
        printf("%d ", (int)word[i]);
    }
    printf("\\n");  // 最後が0（ヌル文字）

    return 0;
}`}
          expectedOutput={`word: World
文字コード: 87 111 114 108 100 0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="char-arrays" />
      </div>
      <LessonNav lessons={lessons} currentId="char-arrays" basePath="/learn/arrays" />
    </div>
  );
}
