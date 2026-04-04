import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stdio");

export default function LineIoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">標準入出力 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">行入出力</h1>
        <p className="text-gray-400">fgets()・puts()・gets()の危険性を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">行単位の入出力</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          行単位で入出力する関数群です。テキストファイルの処理や行入力に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fgets(buf, n, fp)</code>: 最大n-1文字の1行を安全に読む</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">puts(s)</code>: 文字列を出力して改行を追加</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">fputs(s, fp)</code>: 改行なしで文字列をファイルに出力</li>
          <li><strong className="text-red-400">gets() は危険</strong>: バッファサイズ制限なし、C11で廃止。絶対に使わない</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">fgets で安全な行読み込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fgets</code> はバッファサイズを指定するので安全です。改行文字も含まれることに注意します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

// fgets の改行を除去するユーティリティ
void trimNewline(char *s) {
    size_t len = strlen(s);
    if (len > 0 && s[len - 1] == '\\n') {
        s[len - 1] = '\\0';
    }
}

int main() {
    // 文字列からの行読み込みをシミュレート
    char *lines[] = {
        "Hello, World!\\n",
        "C言語プログラミング\\n",
        "fgets は安全です\\n",
    };

    for (int i = 0; i < 3; i++) {
        char buf[64];
        // 実際の使用: fgets(buf, sizeof(buf), stdin);
        strncpy(buf, lines[i], sizeof(buf) - 1);
        buf[sizeof(buf) - 1] = '\\0';

        trimNewline(buf);
        printf("[%d] '%s' (長さ: %zu)\\n", i + 1, buf, strlen(buf));
    }

    return 0;
}`}
          expectedOutput={`[1] 'Hello, World!' (長さ: 13)
[2] 'C言語プログラミング' (長さ: 27)
[3] 'fgets は安全です' (長さ: 16)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">puts と fputs</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">puts</code> は自動改行あり、<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">fputs</code> は改行なしです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // puts: 自動的に改行を追加
    puts("puts は改行を追加します");
    puts("2行目");

    // fputs: 改行なし
    fputs("fputs: ", stdout);
    fputs("改行しません", stdout);
    fputs("\\n", stdout);

    // 複数行を puts で出力
    const char *lines[] = {
        "Line 1",
        "Line 2",
        "Line 3",
    };

    for (int i = 0; i < 3; i++) {
        puts(lines[i]);
    }

    return 0;
}`}
          expectedOutput={`puts は改行を追加します
2行目
fputs: 改行しません
Line 1
Line 2
Line 3`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stdio" lessonId="line-io" />
      </div>
      <LessonNav lessons={lessons} currentId="line-io" basePath="/learn/stdio" />
    </div>
  );
}
