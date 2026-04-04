import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("containers");

export default function StackQueuePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンテナ レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">stack・queue</h1>
        <p className="text-gray-400">スタックとキューのコンテナアダプタの使い方を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">コンテナアダプタとは</h2>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-pink-400">std::stack</code> と <code className="text-pink-400">std::queue</code> は
          コンテナアダプタと呼ばれ、既存のコンテナ（デフォルトはdeque）をラップしてインターフェースを制限します。
          stackはLIFO（後入れ先出し）、queueはFIFO（先入れ先出し）のアクセスパターンを提供します。
          <code className="text-pink-400">std::priority_queue</code> は優先度付きキューです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">stackの使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    // 括弧の対応チェック
    string expr = "({[()]})";
    stack<char> stk;
    bool valid = true;

    for (char c : expr) {
        if (c == '(' || c == '{' || c == '[') {
            stk.push(c);
        } else {
            if (stk.empty()) { valid = false; break; }
            char top = stk.top();
            stk.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                valid = false;
                break;
            }
        }
    }
    valid = valid && stk.empty();

    cout << expr << " は" << (valid ? "有効" : "無効") << endl;

    // 数値の逆順表示
    stack<int> nums;
    for (int i = 1; i <= 5; i++) nums.push(i);

    cout << "逆順: ";
    while (!nums.empty()) {
        cout << nums.top() << " ";
        nums.pop();
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`({[()]}) は有効
逆順: 5 4 3 2 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">queueとpriority_queue</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    // queue: FIFO
    queue<string> taskQueue;
    taskQueue.push("タスクA");
    taskQueue.push("タスクB");
    taskQueue.push("タスクC");

    cout << "--- タスク処理 (FIFO) ---" << endl;
    while (!taskQueue.empty()) {
        cout << "処理: " << taskQueue.front() << endl;
        taskQueue.pop();
    }

    // priority_queue: 優先度付き（デフォルトは最大値が先頭）
    priority_queue<int> pq;
    pq.push(30);
    pq.push(10);
    pq.push(50);
    pq.push(20);

    cout << "--- 優先度順 (降順) ---" << endl;
    while (!pq.empty()) {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;

    // 最小値を先頭にする場合
    priority_queue<int, vector<int>, greater<int>> minPq;
    minPq.push(30);
    minPq.push(10);
    minPq.push(50);
    minPq.push(20);

    cout << "--- 優先度順 (昇順) ---" << endl;
    while (!minPq.empty()) {
        cout << minPq.top() << " ";
        minPq.pop();
    }
    cout << endl;

    return 0;
}`}
          expectedOutput={`--- タスク処理 (FIFO) ---
処理: タスクA
処理: タスクB
処理: タスクC
--- 優先度順 (降順) ---
50 30 20 10
--- 優先度順 (昇順) ---
10 20 30 50`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="containers" lessonId="stack-queue" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue" basePath="/learn/containers" />
    </div>
  );
}
