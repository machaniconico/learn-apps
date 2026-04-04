import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("sorting");

export default function SortingComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">ソートアルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートの比較</h1>
        <p className="text-gray-400">各ソートアルゴリズムの計算量・特性を比較して使い分けを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">計算量比較表</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          各ソートアルゴリズムの時間計算量・空間計算量・安定性の比較です。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 pr-4 text-gray-300">アルゴリズム</th>
                <th className="py-2 pr-4 text-gray-300">最良</th>
                <th className="py-2 pr-4 text-gray-300">平均</th>
                <th className="py-2 pr-4 text-gray-300">最悪</th>
                <th className="py-2 pr-4 text-gray-300">空間</th>
                <th className="py-2 text-gray-300">安定</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">バブル</td><td className="pr-4 text-green-400">O(n)</td><td className="pr-4">O(n²)</td><td className="pr-4">O(n²)</td><td className="pr-4">O(1)</td><td className="text-green-400">安定</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">選択</td><td className="pr-4">O(n²)</td><td className="pr-4">O(n²)</td><td className="pr-4">O(n²)</td><td className="pr-4">O(1)</td><td className="text-red-400">不安定</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">挿入</td><td className="pr-4 text-green-400">O(n)</td><td className="pr-4">O(n²)</td><td className="pr-4">O(n²)</td><td className="pr-4">O(1)</td><td className="text-green-400">安定</td></tr>
              <tr className="border-b border-gray-800"><td className="py-1.5 pr-4">クイック</td><td className="pr-4 text-green-400">O(n log n)</td><td className="pr-4 text-green-400">O(n log n)</td><td className="pr-4 text-yellow-400">O(n²)</td><td className="pr-4">O(log n)</td><td className="text-red-400">不安定</td></tr>
              <tr><td className="py-1.5 pr-4">マージ</td><td className="pr-4 text-green-400">O(n log n)</td><td className="pr-4 text-green-400">O(n log n)</td><td className="pr-4 text-green-400">O(n log n)</td><td className="pr-4 text-yellow-400">O(n)</td><td className="text-green-400">安定</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">同じデータを各ソートで実行</h2>
        <p className="text-gray-400 mb-4">
          同じ配列を各ソートで処理して出力を確認します。どのアルゴリズムも同じ結果を返します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#define N 8

void bubbleSort(int a[], int n) {
    for (int i=0;i<n-1;i++) for (int j=0;j<n-i-1;j++)
        if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;}
}
void selectionSort(int a[], int n) {
    for(int i=0;i<n-1;i++){int m=i;
        for(int j=i+1;j<n;j++) if(a[j]<a[m]) m=j;
        int t=a[i];a[i]=a[m];a[m]=t;}
}
void insertionSort(int a[], int n) {
    for(int i=1;i<n;i++){int k=a[i],j=i-1;
        while(j>=0&&a[j]>k){a[j+1]=a[j];j--;} a[j+1]=k;}
}

void print(const char *name, int a[], int n) {
    printf("%-12s: ", name);
    for(int i=0;i<n;i++) printf("%d ",a[i]);
    printf("\\n");
}

int main() {
    int orig[] = {5, 2, 8, 1, 9, 3, 7, 4};
    int a[N], b[N], c[N];

    memcpy(a, orig, sizeof(orig));
    memcpy(b, orig, sizeof(orig));
    memcpy(c, orig, sizeof(orig));

    bubbleSort(a, N);    print("bubble", a, N);
    selectionSort(b, N); print("selection", b, N);
    insertionSort(c, N); print("insertion", c, N);
    return 0;
}`}
          expectedOutput={`bubble      : 1 2 3 4 5 7 8 9
selection   : 1 2 3 4 5 7 8 9
insertion   : 1 2 3 4 5 7 8 9 `}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">使い分けのガイドライン</h2>
        <p className="text-gray-400 mb-4">
          状況に応じた適切なソートアルゴリズムの選択が重要です。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int main() {
    printf("=== ソート選択ガイド ===\\n\\n");

    printf("小さいデータ (n < 20):\\n");
    printf("  -> 挿入ソート\\n");
    printf("     定数係数が小さく、ほぼソート済みに強い\\n\\n");

    printf("一般的な用途 (n が大きい):\\n");
    printf("  -> クイックソート\\n");
    printf("     平均 O(n log n) で実用最速\\n\\n");

    printf("安定性が必要 (同じ値の順序を保持):\\n");
    printf("  -> マージソート\\n");
    printf("     常に O(n log n) を保証\\n\\n");

    printf("書き込み回数を最小化したい:\\n");
    printf("  -> 選択ソート\\n");
    printf("     交換が最大 n-1 回\\n\\n");

    return 0;
}`}
          expectedOutput={`=== ソート選択ガイド ===

小さいデータ (n < 20):
  -> 挿入ソート
     定数係数が小さく、ほぼソート済みに強い

一般的な用途 (n が大きい):
  -> クイックソート
     平均 O(n log n) で実用最速

安定性が必要 (同じ値の順序を保持):
  -> マージソート
     常に O(n log n) を保証

書き込み回数を最小化したい:
  -> 選択ソート
     交換が最大 n-1 回`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="sorting" lessonId="comparison" />
      </div>
      <LessonNav lessons={lessons} currentId="comparison" basePath="/learn/sorting" />
    </div>
  );
}
