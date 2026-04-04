import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function StringHPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">文字列 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">string.h 関数</h1>
        <p className="text-gray-400">strlen・strcpy・strcat・strcmpなどstring.hの主要関数を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">string.h の主要関数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#include &lt;string.h&gt;</code> で
          文字列操作の標準関数群を使えます。
        </p>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {[
            { fn: "strlen(s)", desc: "文字列の長さ（\\0を含まない）" },
            { fn: "strcpy(dst, src)", desc: "srcをdstにコピー" },
            { fn: "strcat(dst, src)", desc: "dstの末尾にsrcを結合" },
            { fn: "strcmp(s1, s2)", desc: "文字列比較（0=等しい、負=s1<s2、正=s1>s2）" },
            { fn: "strchr(s, c)", desc: "文字cが最初に現れる位置へのポインタ" },
            { fn: "strstr(s, sub)", desc: "部分文字列subが最初に現れる位置" },
          ].map(({ fn, desc }) => (
            <div key={fn} className="flex gap-3 p-2 bg-gray-800 rounded">
              <code className="text-teal-400 shrink-0 text-xs">{fn}</code>
              <span className="text-gray-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strlen・strcpy・strcat</h2>
        <p className="text-gray-400 mb-4">
          最も基本的な3つの文字列関数の使い方を確認します。
          strcpyとstrcatはコピー先のバッファが十分な大きさであることを確認してから使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello";
    char dst[50];

    // strcpy: コピー
    strcpy(dst, src);
    printf("strcpy: \"%s\"\\n", dst);

    // strcat: 結合
    strcat(dst, ", ");
    strcat(dst, "World!");
    printf("strcat: \"%s\"\\n", dst);

    // strlen: 長さ
    printf("strlen: %zu\\n", strlen(dst));

    return 0;
}`}
          expectedOutput={`strcpy: "Hello"
strcat: "Hello, World!"
strlen: 13`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strcmp による文字列比較</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strcmp(s1, s2)</code> は辞書順で比較します。
          等しければ0、s1がs2より小さければ負、大きければ正を返します。
          <strong className="text-red-400 text-sm"> == で文字列を比較してはいけません</strong>（アドレスを比較するため）。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    const char *words[] = {"banana", "apple", "cherry", "apple"};

    // 等値比較
    printf("strcmp(\\"apple\\", \\"apple\\"): %d\\n", strcmp("apple", "apple"));
    printf("strcmp(\\"apple\\", \\"banana\\"): %d\\n", strcmp("apple", "banana"));
    printf("strcmp(\\"cherry\\", \\"banana\\"): %d\\n", strcmp("cherry", "banana"));

    // 重複の検出
    printf("\\n重複チェック:\\n");
    int n = 4;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (strcmp(words[i], words[j]) == 0) {
                printf("  \"%s\" が重複\\n", words[i]);
            }
        }
    }

    return 0;
}`}
          expectedOutput={`strcmp("apple", "apple"): 0
strcmp("apple", "banana"): -1
strcmp("cherry", "banana"): 1

重複チェック:
  "apple" が重複`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="string-h" />
      </div>
      <LessonNav lessons={lessons} currentId="string-h" basePath="/learn/strings" />
    </div>
  );
}
