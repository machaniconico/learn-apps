import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("structs");

export default function BitFieldsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">構造体 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビットフィールド</h1>
        <p className="text-gray-400">struct内でのビットフィールド定義と活用法を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビットフィールドとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビットフィールドを使うと、構造体のメンバに使用するビット数を指定できます。
          メモリを節約したい場合や、ハードウェアレジスタのビット操作に使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{"type name : bits;"}</code> でビット数を指定</li>
          <li>通常 <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">unsigned int</code> か <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int</code> を使う</li>
          <li>アドレスが取得できない制限がある</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なビットフィールド</h2>
        <p className="text-gray-400 mb-4">
          フラグ管理にビットフィールドを使うとメモリを節約できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Flags {
    unsigned int read    : 1;
    unsigned int write   : 1;
    unsigned int execute : 1;
    unsigned int hidden  : 1;
};

int main() {
    struct Flags f = {1, 1, 0, 0};

    printf("read:    %d\\n", f.read);
    printf("write:   %d\\n", f.write);
    printf("execute: %d\\n", f.execute);
    printf("hidden:  %d\\n", f.hidden);
    printf("sizeof:  %zu bytes\\n", sizeof(f));

    f.execute = 1;
    printf("execute変更後: %d\\n", f.execute);

    return 0;
}`}
          expectedOutput={`read:    1
write:   1
execute: 0
hidden:  0
sizeof:  4 bytes
execute変更後: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数ビットのフィールド</h2>
        <p className="text-gray-400 mb-4">
          1ビット以上のフィールドで小さな整数値をコンパクトに格納できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct Date {
    unsigned int day   : 5;  // 1-31 (5ビット)
    unsigned int month : 4;  // 1-12 (4ビット)
    unsigned int year  : 12; // 0-4095 (12ビット)
};

int main() {
    struct Date d = {3, 4, 2026};

    printf("%04d-%02d-%02d\\n", d.year, d.month, d.day);
    printf("sizeof: %zu bytes\\n", sizeof(d));
    printf("(int単体: %zu bytes)\\n", 3 * sizeof(int));

    return 0;
}`}
          expectedOutput={`2026-04-03
sizeof: 4 bytes
(int単体: 12 bytes)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハードウェアレジスタの例</h2>
        <p className="text-gray-400 mb-4">
          組み込み開発ではハードウェアレジスタのビット操作にビットフィールドが使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct ControlReg {
    unsigned int enable    : 1;
    unsigned int mode      : 2;  // 0-3
    unsigned int prescaler : 4;  // 0-15
    unsigned int reserved  : 25;
};

int main() {
    struct ControlReg reg = {0};

    reg.enable = 1;
    reg.mode = 2;
    reg.prescaler = 8;

    printf("enable:    %d\\n", reg.enable);
    printf("mode:      %d\\n", reg.mode);
    printf("prescaler: %d\\n", reg.prescaler);

    return 0;
}`}
          expectedOutput={`enable:    1
mode:      2
prescaler: 8`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="structs" lessonId="bit-fields" />
      </div>
      <LessonNav lessons={lessons} currentId="bit-fields" basePath="/learn/structs" />
    </div>
  );
}
