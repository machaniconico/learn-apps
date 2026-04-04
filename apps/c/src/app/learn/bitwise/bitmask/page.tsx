import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("bitwise");

export default function BitmaskPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ビット演算 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ビットマスク</h1>
        <p className="text-gray-400">ビットマスクの作成と適用を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビットマスクとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ビットマスクは特定のビットを選択・変更するために使うパターンです。
          ANDでビット抽出、ORでビット設定、AND NOTでビットクリアに使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>特定ビット抽出: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">value &amp; mask</code></li>
          <li>特定ビット設定: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">value | mask</code></li>
          <li>特定ビットクリア: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">value &amp; ~mask</code></li>
          <li>特定ビットトグル: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">value ^ mask</code></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マスクの作成と適用</h2>
        <p className="text-gray-400 mb-4">
          特定のビット位置・範囲に対するマスクを作成して使います。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

// n ビット幅のマスク（位置 pos から）
#define MASK(pos, width) (((1U << (width)) - 1U) << (pos))

int main() {
    unsigned int val = 0b11001010;  // 202

    // 下位4ビットを取り出す
    unsigned int lo4 = val & 0x0F;
    printf("下位4ビット: %u (0x%X)\\n", lo4, lo4);

    // 上位4ビットを取り出す
    unsigned int hi4 = (val >> 4) & 0x0F;
    printf("上位4ビット: %u (0x%X)\\n", hi4, hi4);

    // ビット2-4の3ビットを取り出す
    unsigned int bits24 = (val >> 2) & 0x7;
    printf("ビット2-4: %u\\n", bits24);

    // MACROを使ったマスク
    unsigned int m = MASK(2, 3);  // ビット2から3ビット
    printf("マスク: 0x%X\\n", m);
    printf("適用: %u\\n", (val & m) >> 2);

    return 0;
}`}
          expectedOutput={`下位4ビット: 10 (0xA)
上位4ビット: 12 (0xC)
ビット2-4: 2
マスク: 0x1C
適用: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バイト操作でのマスク活用</h2>
        <p className="text-gray-400 mb-4">
          ネットワークプログラミングなどでバイト単位の操作にマスクが使われます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    // IPアドレスの例: 192.168.1.100
    unsigned int ip = (192 << 24) | (168 << 16) | (1 << 8) | 100;

    // 各オクテットを取り出す
    unsigned char oct1 = (ip >> 24) & 0xFF;
    unsigned char oct2 = (ip >> 16) & 0xFF;
    unsigned char oct3 = (ip >> 8)  & 0xFF;
    unsigned char oct4 =  ip        & 0xFF;

    printf("IP: %u.%u.%u.%u\\n", oct1, oct2, oct3, oct4);

    // サブネットマスク /24 = 255.255.255.0
    unsigned int mask = 0xFFFFFF00;
    unsigned int network = ip & mask;
    printf("ネットワーク: %u.%u.%u.%u\\n",
        (network >> 24) & 0xFF,
        (network >> 16) & 0xFF,
        (network >> 8)  & 0xFF,
        network & 0xFF);

    return 0;
}`}
          expectedOutput={`IP: 192.168.1.100
ネットワーク: 192.168.1.0`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="bitwise" lessonId="bitmask" />
      </div>
      <LessonNav lessons={lessons} currentId="bitmask" basePath="/learn/bitwise" />
    </div>
  );
}
