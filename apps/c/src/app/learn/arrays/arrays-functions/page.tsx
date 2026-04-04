import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("arrays");

export default function ArraysFunctionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">配列 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">配列と関数</h1>
        <p className="text-gray-400">関数への配列の渡し方とサイズパラメータの必要性を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">配列を関数に渡す際の注意点</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          配列を関数に渡すと、先頭要素へのポインタが渡されます（配列の減衰）。
          関数内では <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">sizeof</code> で元の配列サイズを取得できないため、
          サイズを別パラメータで渡す必要があります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>引数の書き方: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int *arr</code> または <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int arr[]</code>（同義）</li>
          <li>サイズは別引数で渡す: <code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">int size</code></li>
          <li>関数内で要素を変更すると呼び出し元の配列も変わる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列を受け取る関数</h2>
        <p className="text-gray-400 mb-4">
          配列の合計・平均・最大値を求める関数を実装します。
          サイズを引数で渡すことで任意サイズの配列に対応できます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

int sum(int *arr, int n) {
    int total = 0;
    for (int i = 0; i < n; i++) total += arr[i];
    return total;
}

double average(int arr[], int n) {
    return (double)sum(arr, n) / n;
}

int max_element(int arr[], int n) {
    int m = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > m) m = arr[i];
    return m;
}

int main() {
    int data[] = {42, 17, 83, 55, 29, 71, 38};
    int n = (int)(sizeof(data) / sizeof(data[0]));

    printf("合計: %d\\n", sum(data, n));
    printf("平均: %.1f\\n", average(data, n));
    printf("最大: %d\\n", max_element(data, n));

    return 0;
}`}
          expectedOutput={`合計: 335
平均: 47.9
最大: 83`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">配列の要素を関数内で変更する</h2>
        <p className="text-gray-400 mb-4">
          配列はポインタとして渡されるため、関数内での変更は元の配列に反映されます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>

void fill(int arr[], int n, int value) {
    for (int i = 0; i < n; i++) arr[i] = value;
}

void scale(int arr[], int n, int factor) {
    for (int i = 0; i < n; i++) arr[i] *= factor;
}

void print_array(const int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[5];

    fill(arr, 5, 3);
    printf("fill(3): ");
    print_array(arr, 5);

    scale(arr, 5, 4);
    printf("scale(4): ");
    print_array(arr, 5);

    return 0;
}`}
          expectedOutput={`fill(3): 3 3 3 3 3
scale(4): 12 12 12 12 12`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="arrays" lessonId="arrays-functions" />
      </div>
      <LessonNav lessons={lessons} currentId="arrays-functions" basePath="/learn/arrays" />
    </div>
  );
}
