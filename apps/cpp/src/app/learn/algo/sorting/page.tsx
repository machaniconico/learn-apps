import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function SortingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">アルゴリズム レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ソートアルゴリズム</h1>
        <p className="text-gray-400">バブル・マージ・クイックソートの仕組みと実装を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ソートアルゴリズムの比較</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          バブルソートはO(n^2)で遅いですが理解しやすく、マージソートとクイックソートは
          平均O(n log n)で高速です。実用的には <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::sort</code>
          （イントロソート）を使うのが最善です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">バブルソート</h2>
        <p className="text-gray-400 mb-4">隣接要素を比較して交換する最もシンプルなソートです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;  // 交換がなければ完了
    }
}

int main() {
    vector<int> data = {64, 34, 25, 12, 22, 11, 90};
    cout << "ソート前: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    bubbleSort(data);

    cout << "ソート後: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    cout << "計算量: O(n^2)" << endl;
    return 0;
}`}
          expectedOutput={`ソート前: 64 34 25 12 22 11 90
ソート後: 11 12 22 25 34 64 90
計算量: O(n^2)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クイックソート</h2>
        <p className="text-gray-400 mb-4">ピボットを基準に分割統治法で高速にソートします。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> data = {38, 27, 43, 3, 9, 82, 10};
    cout << "ソート前: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    quickSort(data, 0, data.size() - 1);

    cout << "ソート後: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    cout << "平均計算量: O(n log n)" << endl;
    return 0;
}`}
          expectedOutput={`ソート前: 38 27 43 3 9 82 10
ソート後: 3 9 10 27 38 43 82
平均計算量: O(n log n)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">マージソート</h2>
        <p className="text-gray-400 mb-4">配列を半分に分割し、マージしながらソートする安定ソートです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> L(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);

    int i = 0, j = 0, k = left;
    while (i < (int)L.size() && j < (int)R.size()) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < (int)L.size()) arr[k++] = L[i++];
    while (j < (int)R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<int> data = {12, 11, 13, 5, 6, 7};
    cout << "ソート前: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    mergeSort(data, 0, data.size() - 1);

    cout << "ソート後: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    cout << "計算量: O(n log n), 安定ソート" << endl;
    return 0;
}`}
          expectedOutput={`ソート前: 12 11 13 5 6 7
ソート後: 5 6 7 11 12 13
計算量: O(n log n), 安定ソート`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="sorting" />
      </div>
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/algo" />
    </div>
  );
}
