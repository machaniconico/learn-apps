import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

export default function BitfieldsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビット演算 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビットフィールド</h1>
        <p className="text-gray-400">コンパクトなデータのためのstruct bit fieldsを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">struct ビットフィールド</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          構造体のビットフィールドを使うと、メンバが使用するビット数を指定できます。
          ビット演算より読みやすく、コンパクトなデータ表現が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>構文: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">{"type name : bits;"}</code></li>
          <li>メンバアクセスは通常の構造体と同じ（ドット演算子）</li>
          <li>アドレスを取得できない（&演算子不可）</li>
          <li>移植性に注意（ビット順序は実装依存）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ビットフィールドでの状態管理</h2>
        <p className="text-gray-400 mb-4">
          ビットフィールドを使うとビット演算より直感的に状態フラグを管理できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

struct PlayerState {
    unsigned int alive    : 1;
    unsigned int moving   : 1;
    unsigned int jumping  : 1;
    unsigned int crouching: 1;
    unsigned int attacking: 1;
    unsigned int health   : 8;  // 0-255
    unsigned int level    : 7;  // 0-127
};

int main() {
    struct PlayerState p = {0};

    p.alive   = 1;
    p.health  = 100;
    p.level   = 5;

    printf("alive=%d health=%d level=%d\\n",
        p.alive, p.health, p.level);
    printf("sizeof: %zu bytes\\n", sizeof(p));

    p.moving  = 1;
    p.jumping = 1;
    printf("moving=%d jumping=%d\\n", p.moving, p.jumping);

    p.jumping = 0;
    p.attacking = 1;
    printf("attacking=%d jumping=%d\\n", p.attacking, p.jumping);

    return 0;
}`}
          expectedOutput={`alive=1 health=100 level=5
sizeof: 4 bytes
moving=1 jumping=1
attacking=1 jumping=0`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ハードウェアレジスタマッピング</h2>
        <p className="text-gray-400 mb-4">
          組み込みでのハードウェアレジスタのビット操作にビットフィールドが使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// UART制御レジスタのシミュレート
struct UARTControl {
    unsigned int enable    : 1;   // bit0
    unsigned int rx_enable : 1;   // bit1
    unsigned int tx_enable : 1;   // bit2
    unsigned int parity    : 2;   // bit3-4 (0=none,1=odd,2=even)
    unsigned int stop_bits : 1;   // bit5 (0=1bit,1=2bit)
    unsigned int baud_div  : 10;  // bit6-15
    unsigned int reserved  : 16;
};

int main() {
    struct UARTControl uart = {0};

    uart.enable    = 1;
    uart.rx_enable = 1;
    uart.tx_enable = 1;
    uart.parity    = 2;   // even parity
    uart.stop_bits = 0;   // 1 stop bit
    uart.baud_div  = 104; // 115200 baud @ 12MHz

    printf("enable:    %d\\n", uart.enable);
    printf("rx:        %d\\n", uart.rx_enable);
    printf("tx:        %d\\n", uart.tx_enable);
    printf("parity:    %d\\n", uart.parity);
    printf("baud_div:  %d\\n", uart.baud_div);
    printf("sizeof:    %zu bytes\\n", sizeof(uart));

    return 0;
}`}
          expectedOutput={`enable:    1
rx:        1
tx:        1
parity:    2
baud_div:  104
sizeof:    4 bytes`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="bitwise" lessonId="bitfields" />
      </div>
      <LessonNav lessons={lessons} currentId="bitfields" basePath="/learn/bitwise" />
    </div>
  );
}
