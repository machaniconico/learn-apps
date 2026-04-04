import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function SearchSplitPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">文字列 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">検索・分割</h1>
        <p className="text-gray-400">strstr・strchr・strtokによる文字列の検索と分割を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">検索・分割関数の概要</h2>
        <div className="space-y-2 text-sm">
          {[
            { fn: "strchr(s, c)", desc: "文字cが最初に現れる位置へのポインタ（なければNULL）" },
            { fn: "strrchr(s, c)", desc: "文字cが最後に現れる位置へのポインタ" },
            { fn: "strstr(s, sub)", desc: "部分文字列subが最初に現れる位置へのポインタ" },
            { fn: "strtok(s, delim)", desc: "区切り文字delimで文字列を分割（元の文字列を変更）" },
          ].map(({ fn, desc }) => (
            <div key={fn} className="flex gap-3 p-2 bg-gray-800 rounded">
              <code className="text-teal-400 shrink-0 text-xs">{fn}</code>
              <span className="text-gray-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strchr と strstr</h2>
        <p className="text-gray-400 mb-4">
          見つかればその位置へのポインタを返し、見つからなければNULLを返します。
          ポインタ演算でインデックスを求めることもできます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    const char *text = "Hello, World! Hello, C!";

    // strchr: 最初の'o'を探す
    const char *pos = strchr(text, 'o');
    if (pos) {
        printf("最初の'o': インデックス %td\\n", pos - text);
    }

    // strrchr: 最後の'o'を探す
    pos = strrchr(text, 'o');
    if (pos) {
        printf("最後の'o': インデックス %td\\n", pos - text);
    }

    // strstr: 部分文字列を検索
    pos = strstr(text, "Hello");
    if (pos) {
        printf("最初の\\"Hello\\": インデックス %td\\n", pos - text);
    }

    pos = strstr(text, "Python");
    printf("\"Python\": %s\\n", pos ? "見つかった" : "見つからない");

    return 0;
}`}
          expectedOutput={`最初の'o': インデックス 4
最後の'o': インデックス 20
最初の"Hello": インデックス 0
"Python": 見つからない`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">strtok による文字列分割</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">strtok()</code> は元の文字列を変更しながらトークンへのポインタを返します。
          2回目以降の呼び出しでは第1引数にNULLを渡します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

int main() {
    char csv[] = "Alice,30,Tokyo,Engineer";

    printf("CSV分割:\\n");
    char *token = strtok(csv, ",");
    int col = 0;
    while (token != NULL) {
        printf("  [%d] %s\\n", col++, token);
        token = strtok(NULL, ",");  // 続きを処理
    }

    // スペース区切りの分割
    char sentence[] = "The quick brown fox";
    printf("\\n単語分割:\\n");
    token = strtok(sentence, " ");
    while (token != NULL) {
        printf("  %s\\n", token);
        token = strtok(NULL, " ");
    }

    return 0;
}`}
          expectedOutput={`CSV分割:
  [0] Alice
  [1] 30
  [2] Tokyo
  [3] Engineer

単語分割:
  The
  quick
  brown
  fox`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="search-split" />
      </div>
      <LessonNav lessons={lessons} currentId="search-split" basePath="/learn/strings" />
    </div>
  );
}
