import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function StackQueueUsagePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタック・キュー活用</h1>
        <p className="text-gray-400">スタックとキューを使ったアルゴリズムを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとキュー</h2>
        <p className="text-gray-300 leading-relaxed">
          <strong>スタック</strong>（LIFO: Last In, First Out）は括弧の対応チェックや逆ポーランド記法で使います。
          <strong>キュー</strong>（FIFO: First In, First Out）は幅優先探索やタスクスケジューリングで使います。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">括弧の対応チェック</h2>
        <p className="text-gray-400 mb-4">スタックを使って括弧の対応が正しいかチェックします。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top == '(') ||
                (c == '}' && top == '{') ||
                (c == ']' && top == '[')) {
                st.pop();
            } else {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    string tests[] = {"(())", "{[()]}", "((]", "({)}", ""};
    for (const auto& s : tests) {
        string display = s.empty() ? "(空)" : s;
        cout << display << " -> "
             << (isValid(s) ? "有効" : "無効") << endl;
    }
    return 0;
}`}
          expectedOutput={`(()) -> 有効
{[()]} -> 有効
((] -> 無効
({)} -> 無効
(空) -> 有効`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">逆ポーランド記法の計算</h2>
        <p className="text-gray-400 mb-4">スタックを使って後置記法の数式を計算します。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <stack>
#include <string>
#include <sstream>
using namespace std;

int evalRPN(const string& expr) {
    stack<int> st;
    istringstream iss(expr);
    string token;

    while (iss >> token) {
        if (token == "+" || token == "-" || token == "*" || token == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (token == "+") st.push(a + b);
            else if (token == "-") st.push(a - b);
            else if (token == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoi(token));
        }
    }
    return st.top();
}

int main() {
    // 3 + 4 = 7
    cout << "3 4 + = " << evalRPN("3 4 +") << endl;
    // (2 + 3) * 4 = 20
    cout << "2 3 + 4 * = " << evalRPN("2 3 + 4 *") << endl;
    // 5 + ((1 + 2) * 4) - 3 = 14
    cout << "5 1 2 + 4 * + 3 - = " << evalRPN("5 1 2 + 4 * + 3 -") << endl;
    return 0;
}`}
          expectedOutput={`3 4 + = 7
2 3 + 4 * = 20
5 1 2 + 4 * + 3 - = 14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="stack-queue-usage" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue-usage" basePath="/learn/algo" />
    </div>
  );
}
