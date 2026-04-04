import { CEditor } from "@/components/c-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

const quizQuestions: QuizQuestion[] = [
  {
    question: "C99で追加された主な機能はどれですか？",
    options: [
      "クラスと継承",
      "可変長配列(VLA)、複合リテラル、//コメント、stdint.h",
      "ガベージコレクション",
      "例外処理（try/catch）",
    ],
    answer: 1,
    explanation: "C99ではVLA（可変長配列）、複合リテラル、//スタイルのコメント、stdint.h（固定幅整数型）、for文内での変数宣言などが追加されました。",
  },
  {
    question: "glibcとmuslの違いとして正しいのはどれですか？",
    options: [
      "glibcはWindowsのみ対応、muslはLinuxのみ",
      "muslはglibcより軽量でコンテナや組込みに向く",
      "musl はGNUのライセンスで配布される",
      "glibcはC99のみ対応",
    ],
    answer: 1,
    explanation: "muslはglibcより軽量・シンプルなlibc実装で、Alpine Linuxや組込みシステム、コンテナでよく使われます。glibcはGNU/Linuxの標準でより多機能です。",
  },
  {
    question: "Unityテストフレームワークの特徴はどれですか？",
    options: [
      "C++専用のテストフレームワーク",
      "Javaで書かれたCテストツール",
      "組込みシステム向けの軽量な純CテストフレームワークPure C",
      "ブラウザ上でテストを実行するフレームワーク",
    ],
    answer: 2,
    explanation: "UnityはThrowTheSwitch社が開発した純Cで書かれた軽量テストフレームワークです。組込みシステムや省リソース環境に適しており、マイコン上でも動作します。",
  },
  {
    question: "C23で追加された機能として正しいのはどれですか？",
    options: [
      "クラスとテンプレート",
      "nullptr、true/false組込みキーワード、typeof演算子、属性構文[[]]",
      "ガベージコレクター",
      "非同期/await構文",
    ],
    answer: 1,
    explanation: "C23ではnullptr（NULLの代替）、true/falseの組込みキーワード化、typeof演算子、[[nodiscard]]などの属性構文、constexpr変数などが追加されました。",
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">エコシステム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C言語のエコシステム全体を学びましょう。C89からC23までの標準の変遷、GCC・Clang・MSVCの比較、glibc・muslなどのライブラリ、テストフレームワーク、Cの将来を解説します。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="ecosystem" totalLessons={5} color="blue" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/ecosystem" color="blue" categoryId="ecosystem" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">C標準の機能確認</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">__STDC_VERSION__</code> マクロでコンパイル時のC標準を確認できます。
          各バージョンで追加された機能を活用しましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdbool.h>  /* C99: bool型 */
#include <stdint.h>   /* C99: 固定幅整数型 */

int main(void) {
    /* C99: //コメント、for内変数宣言 */
    for (int i = 0; i < 3; i++) {
        printf("i = %d\\n", i);
    }

    /* C99: bool型 */
    bool flag = true;
    printf("bool flag: %s\\n", flag ? "true" : "false");

    /* C99: 固定幅整数型 */
    int32_t x = 42;
    printf("int32_t x = %d\\n", x);

    /* C11: _Static_assert */
    _Static_assert(sizeof(int) >= 2, "int must be at least 2 bytes");
    printf("Static assert OK\\n");

    return 0;
}`}
          expectedOutput={`i = 0
i = 1
i = 2
bool flag: true
int32_t x = 42
Static assert OK`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Unityスタイルのテスト</h2>
        <p className="text-gray-400 mb-4">
          Unityフレームワークのスタイルを模倣したシンプルなテストパターンです。
          マクロでアサーションを簡潔に書けます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* Unity風の簡易テストマクロ */
static int tests_run = 0;
static int tests_passed = 0;

#define TEST_ASSERT_EQUAL(expected, actual) do { \
    tests_run++; \
    if ((expected) == (actual)) { \
        tests_passed++; \
        printf("  PASS: %s == %s\\n", #expected, #actual); \
    } else { \
        printf("  FAIL: expected %d but got %d\\n", (int)(expected), (int)(actual)); \
    } \
} while(0)

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main(void) {
    printf("Running tests...\\n");

    TEST_ASSERT_EQUAL(5,  add(2, 3));
    TEST_ASSERT_EQUAL(0,  add(0, 0));
    TEST_ASSERT_EQUAL(12, multiply(3, 4));
    TEST_ASSERT_EQUAL(0,  multiply(5, 0));

    printf("%d/%d tests passed\\n", tests_passed, tests_run);
    return (tests_passed == tests_run) ? 0 : 1;
}`}
          expectedOutput={`Running tests...
  PASS: 5 == add(2, 3)
  PASS: 0 == add(0, 0)
  PASS: 12 == multiply(3, 4)
  PASS: 0 == multiply(5, 0)
4/4 tests passed`}
        />
      </section>

      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
