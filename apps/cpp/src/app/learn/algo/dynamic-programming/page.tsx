import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function DynamicProgrammingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">アルゴリズム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">動的計画法</h1>
        <p className="text-gray-400">メモ化と表を使った動的計画法の基礎を学���ましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">動的計画法（DP）とは</h2>
        <p className="text-gray-300 leading-relaxed">
          動的計画法は「重複する部分問題」の結果を保存して再計算を避ける手法です。
          <strong>トップダウン</strong>（メモ化再帰）と<strong>ボトムアップ</strong>（表の埋め上げ）の2つのアプローチがあります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フィボナッチ数列のDP</h2>
        <p className="text-gray-400 mb-4">素朴な再帰とDPの比較です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <map>
using namespace std;

// 素朴な再帰: O(2^n) - 遅い
int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);
}

// メモ化再帰（トップダウン）: O(n)
map<int, long long> memo;
long long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
}

// ボトムアップDP: O(n)
long long fibDP(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n + 1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

int main() {
    cout << "素朴な再帰 fib(10) = " << fibNaive(10) << endl;
    cout << "メモ化    fib(50) = " << fibMemo(50) << endl;
    cout << "ボトムアップ fib(50) = " << fibDP(50) << endl;
    return 0;
}`}
          expectedOutput={`素朴な再帰 fib(10) = 55
メモ化    fib(50) = 12586269025
ボトムアップ fib(50) = 12586269025`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ナップサック問題</h2>
        <p className="text-gray-400 mb-4">DPの代表的な問題であるナップサック問題です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
using namespace std;

int knapsack(int capacity, const vector<int>& weights,
             const vector<int>& values) {
    int n = weights.size();
    // dp[i][w] = i個目までの品物で容量wの最大価値
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];  // 品物iを入れない
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][capacity];
}

int main() {
    vector<int> weights = {2, 3, 4, 5};
    vector<int> values  = {3, 4, 5, 6};
    int capacity = 8;

    cout << "品物:" << endl;
    for (int i = 0; i < (int)weights.size(); i++) {
        cout << "  重さ" << weights[i] << " 価値" << values[i] << endl;
    }
    cout << "容量: " << capacity << endl;
    cout << "最大価値: " << knapsack(capacity, weights, values) << endl;
    return 0;
}`}
          expectedOutput={`品物:
  重さ2 価値3
  重さ3 価値4
  重さ4 価値5
  重さ5 価値6
容量: 8
最大価値: 10`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="dynamic-programming" />
      </div>
      <LessonNav lessons={lessons} currentId="dynamic-programming" basePath="/learn/algo" />
    </div>
  );
}
