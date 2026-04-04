import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("idioms");

export default function PortabilityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">イディオム レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">移植性</h1>
        <p className="text-gray-400">stdint.h・エンディアン・プラットフォーム差異・#ifdefを使った移植性の高いコードを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">移植性の問題点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CはOS・CPU・コンパイラによって動作が異なる場合があります。
          移植性の高いコードを書くにはこれらの差異を意識する必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">整数型サイズ</strong>: intは16〜64ビットになりうる</li>
          <li><strong className="text-white">エンディアン</strong>: x86はリトルエンディアン、一部ARMはビッグエンディアン</li>
          <li><strong className="text-white">構造体パディング</strong>: アライメントでメンバ間に隙間が入る</li>
          <li><strong className="text-white">プリプロセッサマクロ</strong>: OSやCPUで条件分岐</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stdint.hで固定幅整数型</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">stdint.h</code> の型はプラットフォームによらずサイズが確定します。
          通信プロトコルやファイル形式の処理に必須です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>  /* PRId32 などの書式マクロ */

int main(void) {
    /* 固定幅型 */
    int8_t   i8  = 127;
    uint8_t  u8  = 255;
    int16_t  i16 = 32767;
    uint16_t u16 = 65535;
    int32_t  i32 = 2147483647;
    uint32_t u32 = 4294967295U;
    int64_t  i64 = 9223372036854775807LL;

    printf("int8_t   max: %" PRId8  "\\n", i8);
    printf("uint8_t  max: %" PRIu8  "\\n", u8);
    printf("int16_t  max: %" PRId16 "\\n", i16);
    printf("uint16_t max: %" PRIu16 "\\n", u16);
    printf("int32_t  max: %" PRId32 "\\n", i32);
    printf("uint32_t max: %" PRIu32 "\\n", u32);
    printf("int64_t  max: %" PRId64 "\\n", i64);

    return 0;
}`}
          expectedOutput={`int8_t   max: 127
uint8_t  max: 255
int16_t  max: 32767
uint16_t max: 65535
int32_t  max: 2147483647
uint32_t max: 4294967295
int64_t  max: 9223372036854775807`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エンディアン検出と変換</h2>
        <p className="text-gray-400 mb-4">
          エンディアンはバイト順のことです。
          ネットワーク通信やバイナリファイルではエンディアン変換が必要な場合があります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

/* エンディアン検出 */
int is_little_endian(void) {
    uint16_t x = 0x0001;
    return *(uint8_t *)&x == 0x01;
}

/* バイトスワップ */
uint32_t swap32(uint32_t x) {
    return ((x & 0xFF000000) >> 24) |
           ((x & 0x00FF0000) >>  8) |
           ((x & 0x0000FF00) <<  8) |
           ((x & 0x000000FF) << 24);
}

uint16_t swap16(uint16_t x) {
    return (uint16_t)((x >> 8) | (x << 8));
}

int main(void) {
    if (is_little_endian()) {
        printf("エンディアン: リトルエンディアン\\n");
    } else {
        printf("エンディアン: ビッグエンディアン\\n");
    }

    uint32_t val = 0x12345678;
    printf("元の値:   0x%08X\\n", val);
    printf("swap後:   0x%08X\\n", swap32(val));

    uint16_t v16 = 0xABCD;
    printf("16bit元:  0x%04X\\n", v16);
    printf("16bit後:  0x%04X\\n", swap16(v16));

    return 0;
}`}
          expectedOutput={`エンディアン: リトルエンディアン
元の値:   0x12345678
swap後:   0x78563412
16bit元:  0xABCD
16bit後:  0xCDAB`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">#ifdefでプラットフォーム分岐</h2>
        <p className="text-gray-400 mb-4">
          OSやコンパイラに依存するコードは <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">#ifdef</code> で分岐します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* プラットフォーム検出 */
#if defined(_WIN32) || defined(_WIN64)
  #define PLATFORM "Windows"
  #define PATH_SEP '\\\\'
#elif defined(__APPLE__)
  #define PLATFORM "macOS"
  #define PATH_SEP '/'
#elif defined(__linux__)
  #define PLATFORM "Linux"
  #define PATH_SEP '/'
#else
  #define PLATFORM "Unknown"
  #define PATH_SEP '/'
#endif

/* コンパイラ検出 */
#if defined(__GNUC__)
  #define COMPILER "GCC"
#elif defined(__clang__)
  #define COMPILER "Clang"
#elif defined(_MSC_VER)
  #define COMPILER "MSVC"
#else
  #define COMPILER "Unknown"
#endif

int main(void) {
    printf("プラットフォーム: %s\\n", PLATFORM);
    printf("パス区切り: '%c'\\n", PATH_SEP);
    printf("コンパイラ: %s\\n", COMPILER);
    printf("sizeof(int) = %zu\\n", sizeof(int));
    printf("sizeof(long) = %zu\\n", sizeof(long));
    printf("sizeof(void*) = %zu\\n", sizeof(void *));
    return 0;
}`}
          expectedOutput={`プラットフォーム: macOS
パス区切り: '/'
コンパイラ: Clang
sizeof(int) = 4
sizeof(long) = 8
sizeof(void*) = 8`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="idioms" lessonId="portability" />
      </div>
      <LessonNav lessons={lessons} currentId="portability" basePath="/learn/idioms" />
    </div>
  );
}
