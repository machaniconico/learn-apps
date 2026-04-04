import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("idioms");

export default function CodingStylePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">イディオム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コーディングスタイル</h1>
        <p className="text-gray-400">命名規則・インデント・K&RスタイルとAllmanスタイルの違いを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主要なコーディングスタイル</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C言語には複数のコーディングスタイルがあります。プロジェクト内で一貫したスタイルを使うことが重要です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><strong className="text-white">K&Rスタイル</strong>: 開き波括弧を行末に置く（Linuxカーネル採用）</li>
          <li><strong className="text-white">Allmanスタイル</strong>: 開き波括弧を新行に置く（BSD採用）</li>
          <li><strong className="text-white">snake_case</strong>: 変数・関数名（C標準ライブラリのスタイル）</li>
          <li><strong className="text-white">UPPER_CASE</strong>: マクロ・定数</li>
          <li><strong className="text-white">PascalCase</strong>: 型名・構造体（一部プロジェクト）</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">K&RスタイルとAllmanスタイル</h2>
        <p className="text-gray-400 mb-4">
          どちらのスタイルも正しく、重要なのは一貫性です。
          オープンソースプロジェクトではK&Rが多く採用されています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* K&Rスタイル: 開き括弧を行末に */
int factorial_kr(int n) {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial_kr(n - 1);
    }
}

/* Allmanスタイル: 開き括弧を新行に
int factorial_allman(int n)
{
    if (n <= 1)
    {
        return 1;
    }
    else
    {
        return n * factorial_allman(n - 1);
    }
}
*/

int main(void) {
    for (int i = 1; i <= 6; i++) {
        printf("%d! = %d\\n", i, factorial_kr(i));
    }
    return 0;
}`}
          expectedOutput={`1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">命名規則のベストプラクティス</h2>
        <p className="text-gray-400 mb-4">
          C標準ライブラリに倣い、snake_caseを使います。
          型名にはtypedefを組み合わせることが多いです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>

/* 型名: PascalCase または snake_case + _t */
typedef struct {
    char first_name[32];  /* snake_case: 変数 */
    char last_name[32];
    int age;
} PersonRecord;            /* PascalCase: 型名 */

/* 関数名: モジュール名_動詞_名詞 */
void person_record_init(PersonRecord *p,
                        const char *first,
                        const char *last,
                        int age) {
    strncpy(p->first_name, first, 31);
    strncpy(p->last_name, last, 31);
    p->age = age;
}

void person_record_print(const PersonRecord *p) {
    printf("%s %s (%d歳)\\n", p->first_name, p->last_name, p->age);
}

/* 定数: UPPER_CASE */
#define MAX_RECORDS 10
#define DEFAULT_AGE 20

int main(void) {
    PersonRecord records[MAX_RECORDS];
    int count = 0;

    person_record_init(&records[count++], "太郎", "田中", 30);
    person_record_init(&records[count++], "花子", "鈴木", DEFAULT_AGE);

    for (int i = 0; i < count; i++) {
        person_record_print(&records[i]);
    }

    return 0;
}`}
          expectedOutput={`太郎 田中 (30歳)
花子 鈴木 (20歳)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コメントのスタイル</h2>
        <p className="text-gray-400 mb-4">
          良いコメントは「何をするか」ではなく「なぜそうするか」を説明します。
          コードを見ればわかることはコメントしません。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* ファイルの先頭コメント: モジュールの説明 */

/**
 * バイナリサーチ: ソート済み配列 arr から val を探す
 * @param arr ソート済み配列
 * @param n   配列の要素数
 * @param val 探す値
 * @return    見つかった場合はインデックス、なければ -1
 */
int binary_search(const int *arr, int n, int val) {
    int lo = 0, hi = n - 1;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;  /* オーバーフロー防止 */

        if (arr[mid] == val) return mid;
        if (arr[mid] < val)  lo = mid + 1;
        else                 hi = mid - 1;
    }

    return -1;  /* 見つからなかった */
}

int main(void) {
    int arr[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int n = 8;

    printf("7の位置: %d\\n", binary_search(arr, n, 7));
    printf("11の位置: %d\\n", binary_search(arr, n, 11));
    printf("6の位置: %d\\n", binary_search(arr, n, 6));

    return 0;
}`}
          expectedOutput={`7の位置: 3
11の位置: 5
6の位置: -1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="idioms" lessonId="coding-style" />
      </div>
      <LessonNav lessons={lessons} currentId="coding-style" basePath="/learn/idioms" />
    </div>
  );
}
