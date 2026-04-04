import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("searching");

export default function LinearPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">探索アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">線形探索</h1>
        <p className="text-gray-400">配列を先頭から順に調べる O(n) の線形探索アルゴリズムを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">線形探索とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          線形探索（逐次探索）は配列の先頭から末尾に向かって1つずつ要素を調べます。
          最もシンプルな探索手法で、ソートされていない配列にも使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>時間計算量：O(n)（最悪・平均）、O(1)（最良：先頭に存在）</li>
          <li>前提条件なし（ソート不要）</li>
          <li>実装が最もシンプル</li>
          <li>小さいデータや1回限りの探索に向いている</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的な線形探索</h2>
        <p className="text-gray-400 mb-4">
          見つかった場合はインデックス、見つからない場合は -1 を返すのが一般的なパターンです。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}

int main() {
    int arr[] = {4, 2, 7, 1, 9, 5, 8, 3};
    int n = 8;

    int idx = linearSearch(arr, n, 9);
    if (idx != -1)
        printf("Found 9 at index %d\\n", idx);
    else
        printf("Not found\\n");

    idx = linearSearch(arr, n, 6);
    if (idx != -1)
        printf("Found 6 at index %d\\n", idx);
    else
        printf("6 not found\\n");

    return 0;
}`}
          expectedOutput={`Found 9 at index 4
6 not found`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">すべての一致を見つける</h2>
        <p className="text-gray-400 mb-4">
          最初の一致だけでなく、すべての一致箇所を見つけるには
          見つかっても探索を続けます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int linearSearchAll(int arr[], int n, int target) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            printf("Found at index %d\\n", i);
            count++;
        }
    }
    return count;
}

int main() {
    int arr[] = {3, 1, 4, 1, 5, 9, 2, 6, 1, 3};
    int n = 10;

    int cnt = linearSearchAll(arr, n, 1);
    printf("Total: %d occurrences\\n", cnt);
    return 0;
}`}
          expectedOutput={`Found at index 1
Found at index 3
Found at index 8
Total: 3 occurrences`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">番兵（sentinel）を使った最適化</h2>
        <p className="text-gray-400 mb-4">
          配列の末尾に目標値を番兵として配置することで、ループ内の範囲チェック
          （<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">i &lt; n</code>）を省略できます。
          比較回数が半分になり定数係数を改善できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

/* arr の末尾（arr[n]）に番兵を置くため n+1 のサイズが必要 */
int sentinelSearch(int arr[], int n, int target) {
    arr[n] = target;  /* 番兵 */
    int i = 0;
    while (arr[i] != target) i++;
    return (i < n) ? i : -1;
}

int main() {
    int arr[11] = {5, 3, 8, 1, 9, 2, 7, 4, 6, 0};
    int n = 10;

    printf("Search 7: index %d\\n", sentinelSearch(arr, n, 7));
    printf("Search 9: index %d\\n", sentinelSearch(arr, n, 9));
    printf("Search 99: index %d\\n", sentinelSearch(arr, n, 99));
    return 0;
}`}
          expectedOutput={`Search 7: index 6
Search 9: index 4
Search 99: index -1`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="searching" lessonId="linear" />
      </div>
      <LessonNav lessons={lessons} currentId="linear" basePath="/learn/searching" />
    </div>
  );
}
