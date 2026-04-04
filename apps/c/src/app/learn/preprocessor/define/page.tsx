import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("preprocessor");

export default function DefinePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">プリプロセッサ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">#define</h1>
        <p className="text-gray-400">#define PI 3.14 とオブジェクト形式マクロを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">#define とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#define</code> はプリプロセッサディレクティブで、識別子をテキスト置換するマクロを定義します。
          コンパイル前に全ての出現箇所が置換されます。型チェックは行われません。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>オブジェクト形式: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#define 名前 値</code></li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">#undef 名前</code> でマクロを取り消せる</li>
          <li>定数には <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">const</code> や <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">enum</code> を使う方が型安全</li>
          <li>行末にセミコロン不要（置換されるため）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">定数マクロの定義</h2>
        <p className="text-gray-400 mb-4">
          数値・文字列などをマクロ定数として定義します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define PI          3.14159265
#define MAX_SIZE    100
#define GREETING    "Hello, World!"
#define VERSION     "1.0.0"

int main() {
    printf("PI = %.8f\\n", PI);
    printf("MAX_SIZE = %d\\n", MAX_SIZE);
    printf("%s\\n", GREETING);
    printf("Version: %s\\n", VERSION);

    double r = 5.0;
    printf("面積: %.2f\\n", PI * r * r);

    int arr[MAX_SIZE];
    arr[0] = 42;
    printf("arr[0] = %d\\n", arr[0]);

    return 0;
}`}
          expectedOutput={`PI = 3.14159265
MAX_SIZE = 100
Hello, World!
Version: 1.0.0
面積: 78.54
arr[0] = 42`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#undef でマクロを取り消す</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#undef</code> でマクロを無効化し、再定義することができます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

#define BUFFER_SIZE 64

int main() {
    printf("BUFFER_SIZE = %d\\n", BUFFER_SIZE);

    #undef BUFFER_SIZE
    #define BUFFER_SIZE 256

    printf("再定義後: %d\\n", BUFFER_SIZE);

    // 複数行マクロ（バックスラッシュで継続）
    #define PRINT_INFO(name, val) \\
        printf("%-15s = %d\\n", name, val)

    PRINT_INFO("BUFFER_SIZE", BUFFER_SIZE);
    PRINT_INFO("MAX_PATH", 4096);

    return 0;
}`}
          expectedOutput={`BUFFER_SIZE = 64
再定義後: 256
BUFFER_SIZE     = 256
MAX_PATH        = 4096`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="preprocessor" lessonId="define" />
      </div>
      <LessonNav lessons={lessons} currentId="define" basePath="/learn/preprocessor" />
    </div>
  );
}
