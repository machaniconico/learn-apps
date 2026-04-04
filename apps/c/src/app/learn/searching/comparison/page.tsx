import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("searching");

export default function SearchingComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">探索アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">探索の比較</h1>
        <p className="text-gray-400">各探索アルゴリズムの計算量・特性を比較して最適な手法を選べるようになりましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">計算量比較表</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各探索アルゴリズムの特性を比較します。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 pr-4 text-gray-300">アルゴリズム</th>
                <th className="py-2 pr-4 text-gray-300">平均</th>
                <th className="py-2 pr-4 text-gray-300">最悪</th>
                <th className="py-2 pr-4 text-gray-300">前提条件</th>
                <th className="py-2 text-gray-300">空間</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">線形探索</td><td className="pr-4">O(n)</td><td className="pr-4">O(n)</td><td className="pr-4 text-green-400">なし</td><td>O(1)</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">二分探索</td><td className="pr-4 text-green-400">O(log n)</td><td className="pr-4 text-green-400">O(log n)</td><td className="pr-4 text-yellow-400">ソート済み</td><td>O(1)</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">ハッシュ探索</td><td className="pr-4 text-green-400">O(1)</td><td className="pr-4 text-yellow-400">O(n)</td><td className="pr-4 text-yellow-400">ハッシュ表</td><td>O(n)</td></tr>
              <tr><td className="py-1.5 pr-4">BST 探索</td><td className="pr-4 text-green-400">O(log n)</td><td className="pr-4 text-yellow-400">O(n)</td><td className="pr-4 text-yellow-400">BST 構築</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">線形探索 vs 二分探索</h2>
        <p className="text-gray-400 mb-4">
          同じデータに対して両手法を比較します。n が大きいほど二分探索の優位性が増します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int linearSearch(int arr[], int n, int t) {
    int steps = 0;
    for (int i = 0; i < n; i++) {
        steps++;
        if (arr[i] == t) { printf("linear:  found at %d (%d steps)\\n", i, steps); return i; }
    }
    printf("linear:  not found (%d steps)\\n", steps);
    return -1;
}

int binarySearch(int arr[], int n, int t) {
    int lo = 0, hi = n-1, steps = 0;
    while (lo <= hi) {
        steps++;
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == t) { printf("binary:  found at %d (%d steps)\\n", mid, steps); return mid; }
        if (arr[mid] < t) lo = mid+1; else hi = mid-1;
    }
    printf("binary:  not found (%d steps)\\n", steps);
    return -1;
}

int main() {
    int arr[16];
    for (int i = 0; i < 16; i++) arr[i] = i * 2;  /* 0,2,4,...,30 */

    printf("Search for 24 in 16 elements:\\n");
    linearSearch(arr, 16, 24);
    binarySearch(arr, 16, 24);
    return 0;
}`}
          expectedOutput={`Search for 24 in 16 elements:
linear:  found at 12 (13 steps)
binary:  found at 12 (3 steps)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">使い分けのガイドライン</h2>
        <p className="text-gray-400 mb-4">
          データの性質や用途によって最適な探索手法を選びましょう。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("=== 探索手法の選択ガイド ===\\n\\n");

    printf("小さいデータ・1回限りの探索:\\n");
    printf("  -> 線形探索\\n");
    printf("     実装が最もシンプル、前処理不要\\n\\n");

    printf("ソート済み配列への繰り返し探索:\\n");
    printf("  -> 二分探索\\n");
    printf("     O(log n) で高速、追加メモリ不要\\n\\n");

    printf("大量データへの頻繁な探索:\\n");
    printf("  -> ハッシュ表\\n");
    printf("     平均 O(1) で最速、メモリが必要\\n\\n");

    printf("順序付きデータの範囲探索:\\n");
    printf("  -> 二分探索木（BST）\\n");
    printf("     範囲クエリや昇順列挙に向いている\\n\\n");

    return 0;
}`}
          expectedOutput={`=== 探索手法の選択ガイド ===

小さいデータ・1回限りの探索:
  -> 線形探索
     実装が最もシンプル、前処理不要

ソート済み配列への繰り返し探索:
  -> 二分探索
     O(log n) で高速、追加メモリ不要

大量データへの頻繁な探索:
  -> ハッシュ表
     平均 O(1) で最速、メモリが必要

順序付きデータの範囲探索:
  -> 二分探索木（BST）
     範囲クエリや昇順列挙に向いている`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="searching" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/searching" />
    </div>
  );
}
