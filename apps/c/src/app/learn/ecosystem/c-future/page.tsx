import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function CFuturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">エコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Cの未来</h1>
        <p className="text-gray-400">C23の機能・C対C++・組込みシステム・システムプログラミングの将来を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C言語の現在地</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語は1972年の誕生から50年以上経った今も現役です。
          OSカーネル、組込みシステム、高性能コンピューティング、インタープリタ実装に広く使われています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>Linux/macOS/Windowsカーネルの中核はC言語で書かれている</li>
          <li>Python・Ruby・PHPのインタープリタはCで実装されている</li>
          <li>マイコン・組込みシステムでは今もCが第一選択</li>
          <li>SQLite・curl・zlibなど重要インフラはC言語製</li>
          <li>TIOBEインデックスで常にトップ3以内</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C23の主要な新機能</h2>
        <p className="text-gray-400 mb-4">
          C23（ISO/IEC 9899:2024）は現代的な機能を多数追加しました。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stddef.h>
#include <stdbool.h>

/* C23: true/false が組込みキーワードに (stdbool.h 不要) */
/* C23: nullptr キーワード */
/* C23: typeof 演算子 */
/* C23: constexpr 変数 */
/* C23: [[属性]] 構文 */

/* C23 以前でも動作するコード */
typedef int (*MathFunc)(int, int);

int apply(MathFunc fn, int a, int b) {
    return fn(a, b);
}

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
int max2(int a, int b) { return a > b ? a : b; }

/* C23: [[nodiscard]] 相当 */
int must_check_result(int x) {
    return x * 2 + 1;
}

int main(void) {
    /* 関数ポインタテーブル */
    MathFunc ops[] = {add, mul, max2};
    const char *names[] = {"add", "mul", "max"};

    for (int i = 0; i < 3; i++) {
        printf("%s(6, 4) = %d\\n", names[i], apply(ops[i], 6, 4));
    }

    /* C23: true/false キーワード (C23前はstdbool.hが必要) */
    bool c_is_alive = true;
    printf("C is alive: %s\\n", c_is_alive ? "true" : "false");

    /* C23: nullptr (C23前はNULLを使用) */
    int *p = NULL;
    printf("pointer: %s\\n", p == NULL ? "nullptr" : "non-null");

    int r = must_check_result(21);
    printf("result: %d\\n", r);

    return 0;
}`}
          expectedOutput={`add(6, 4) = 10
mul(6, 4) = 24
max(6, 4) = 6
C is alive: true
pointer: nullptr
result: 43`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C vs C++: いつCを選ぶか</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CとC++どちらを選ぶかはユースケースによります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">Cが適する場面</strong>: 組込みシステム、OSカーネル、他言語との連携（FFI）、最小限の依存</li>
          <li><strong className="text-white">C++が適する場面</strong>: 大規模アプリケーション、OOP、STL、テンプレートメタプログラミング</li>
          <li><strong className="text-white">Rustが台頭</strong>: メモリ安全性をコンパイル時に保証。Linuxカーネルにも採用開始</li>
          <li>CはABI安定性が高く、ほぼすべての言語からFFIで呼べる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">組込みシステムでのC</h2>
        <p className="text-gray-400 mb-4">
          マイコンプログラミングではCが標準言語です。
          メモリ制約・リアルタイム性・ハードウェアアクセスにCが最適です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>

/* 組込みシステムで典型的なパターン */

/* ハードウェアレジスタのビット操作 */
#define REG_BASE    0x40000000UL
#define BIT_ENABLE  (1U << 0)
#define BIT_MODE    (1U << 1)
#define BIT_IRQ     (1U << 4)

/* volatile: コンパイラに最適化させない（ハードウェアレジスタ） */
typedef volatile uint32_t reg32_t;

/* ビット操作マクロ */
#define SET_BIT(reg, bit)   ((reg) |= (bit))
#define CLEAR_BIT(reg, bit) ((reg) &= ~(bit))
#define TEST_BIT(reg, bit)  (((reg) & (bit)) != 0)

/* 組込みスタイルのリングバッファ */
#define RX_BUF_SIZE 8
typedef struct {
    uint8_t buf[RX_BUF_SIZE];
    uint8_t head, tail, count;
} RingBuffer;

void rb_init(RingBuffer *rb) {
    rb->head = rb->tail = rb->count = 0;
}

int rb_push(RingBuffer *rb, uint8_t byte) {
    if (rb->count >= RX_BUF_SIZE) return -1;
    rb->buf[rb->tail] = byte;
    rb->tail = (rb->tail + 1) % RX_BUF_SIZE;
    rb->count++;
    return 0;
}

int rb_pop(RingBuffer *rb, uint8_t *byte) {
    if (rb->count == 0) return -1;
    *byte = rb->buf[rb->head];
    rb->head = (rb->head + 1) % RX_BUF_SIZE;
    rb->count--;
    return 0;
}

int main(void) {
    /* ビット操作デモ */
    uint32_t reg = 0;
    SET_BIT(reg, BIT_ENABLE);
    SET_BIT(reg, BIT_MODE);
    printf("reg=0x%08X\\n", reg);
    printf("ENABLE=%d, MODE=%d, IRQ=%d\\n",
           TEST_BIT(reg, BIT_ENABLE),
           TEST_BIT(reg, BIT_MODE),
           TEST_BIT(reg, BIT_IRQ));
    CLEAR_BIT(reg, BIT_MODE);
    printf("MODE cleared: 0x%08X\\n", reg);

    /* リングバッファデモ */
    RingBuffer rb;
    rb_init(&rb);
    rb_push(&rb, 'H');
    rb_push(&rb, 'i');
    rb_push(&rb, '!');

    uint8_t b;
    while (rb_pop(&rb, &b) == 0) {
        printf("pop: '%c'\\n", b);
    }

    return 0;
}`}
          expectedOutput={`reg=0x00000003
ENABLE=1, MODE=1, IRQ=0
MODE cleared: 0x00000001
pop: 'H'
pop: 'i'
pop: '!'`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C言語でできることのまとめ</h2>
        <p className="text-gray-400 mb-4">
          C言語はシンプルながら強力です。学習を続けてあなたのスキルを磨いてください。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdint.h>
#include <string.h>

/* C言語の応用まとめ */

/* システムプログラミング */
#include <time.h>

/* 簡単なベンチマーク */
double measure_time(void (*fn)(void)) {
    clock_t start = clock();
    fn();
    clock_t end = clock();
    return (double)(end - start) / CLOCKS_PER_SEC;
}

void compute_pi(void) {
    /* ライプニッツ公式による円周率近似 */
    double pi = 0.0;
    int sign = 1;
    for (int i = 0; i < 1000000; i++) {
        pi += sign * (1.0 / (2 * i + 1));
        sign = -sign;
    }
    pi *= 4.0;
    printf("π ≈ %.10f\\n", pi);
}

int main(void) {
    printf("=== Cでできること ===\\n");
    printf("1. システムプログラミング\\n");
    printf("2. 組込みシステム開発\\n");
    printf("3. 高性能数値計算\\n");
    printf("4. インタープリタ・VM実装\\n");
    printf("5. OS・カーネル開発\\n");

    printf("\\n=== 円周率計算 ===\\n");
    compute_pi();

    printf("\\nC言語の旅はここから始まる！\\n");
    return 0;
}`}
          expectedOutput={`=== Cでできること ===
1. システムプログラミング
2. 組込みシステム開発
3. 高性能数値計算
4. インタープリタ・VM実装
5. OS・カーネル開発

=== 円周率計算 ===
π ≈ 3.1415916536

C言語の旅はここから始まる！`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="c-future" />
      </div>
      <LessonNav lessons={lessons} currentId="c-future" basePath="/learn/ecosystem" />
    </div>
  );
}
