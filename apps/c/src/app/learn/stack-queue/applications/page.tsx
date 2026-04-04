import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stack-queue");

export default function StackQueueApplicationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">スタック・キュー レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">応用例</h1>
        <p className="text-gray-400">括弧の対応チェック・後置記法の評価・BFS など実用的な応用例を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタック・キューの主な応用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタックとキューは多くのアルゴリズムの基盤となります。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>スタック：括弧の対応チェック、後置記法の評価、DFS、関数呼び出し管理</li>
          <li>キュー：BFS（幅優先探索）、印刷スプーラ、プロセススケジューリング</li>
          <li>後置記法（逆ポーランド記法）：コンパイラの式評価に使われる</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">括弧の対応チェック</h2>
        <p className="text-gray-400 mb-4">
          スタックを使って括弧の対応を確認します。
          開き括弧を push し、閉じ括弧を見たら pop して対応する開き括弧か確認します。
          最後にスタックが空なら正しく対応しています。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop()        { return top >= 0 ? stack[top--] : 0; }
int  isEmpty()    { return top == -1; }

int isBalanced(const char *s) {
    top = -1;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{')
            push(s[i]);
        else if (s[i] == ')' || s[i] == ']' || s[i] == '}') {
            if (isEmpty()) return 0;
            char c = pop();
            if ((s[i] == ')' && c != '(') ||
                (s[i] == ']' && c != '[') ||
                (s[i] == '}' && c != '{')) return 0;
        }
    }
    return isEmpty();
}

int main() {
    printf("{[()]} -> %s\\n", isBalanced("{[()]}") ? "OK" : "NG");
    printf("([)]   -> %s\\n", isBalanced("([)]")   ? "OK" : "NG");
    printf("((())  -> %s\\n", isBalanced("((())")  ? "OK" : "NG");
    return 0;
}`}
          expectedOutput={`{[()]} -> OK
([)]   -> NG
((())  -> NG`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">後置記法（逆ポーランド記法）の評価</h2>
        <p className="text-gray-400 mb-4">
          後置記法では演算子がオペランドの後ろに来ます（例：<code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">3 4 +</code> は 3+4）。
          スタックを使って数値を push し、演算子を見たら2つ pop して計算し、結果を push します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX 20

double stack[MAX];
int top = -1;

void pushD(double v)  { stack[++top] = v; }
double popD()         { return stack[top--]; }

double evalRPN(const char *tokens[], int n) {
    top = -1;
    for (int i = 0; i < n; i++) {
        if (strcmp(tokens[i], "+") == 0 ||
            strcmp(tokens[i], "-") == 0 ||
            strcmp(tokens[i], "*") == 0) {
            double b = popD(), a = popD();
            if      (tokens[i][0] == '+') pushD(a + b);
            else if (tokens[i][0] == '-') pushD(a - b);
            else                           pushD(a * b);
        } else {
            pushD(atof(tokens[i]));
        }
    }
    return popD();
}

int main() {
    /* 3 4 + 2 * = (3+4)*2 = 14 */
    const char *expr[] = {"3", "4", "+", "2", "*"};
    printf("3 4 + 2 * = %.0f\\n", evalRPN(expr, 5));

    /* 5 1 2 + 4 * + 3 - = 5+(1+2)*4-3 = 14 */
    const char *expr2[] = {"5","1","2","+","4","*","+","3","-"};
    printf("5 1 2 + 4 * + 3 - = %.0f\\n", evalRPN(expr2, 9));
    return 0;
}`}
          expectedOutput={`3 4 + 2 * = 14
5 1 2 + 4 * + 3 - = 14`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stack-queue" lessonId="applications" />
      </div>
      <LessonNav lessons={lessons} currentId="applications" basePath="/learn/stack-queue" />
    </div>
  );
}
