import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CEditor } from "@/components/c-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("stack-queue");

export default function StackImplPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">スタック・キュー レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタックの実装</h1>
        <p className="text-gray-400">配列ベースのスタックを push・pop・peek・isEmpty で実装しましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタックは LIFO（Last In First Out：後入れ先出し）のデータ構造です。
          皿を積み重ねるイメージで、最後に置いた皿を最初に取り出します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">push(val)</code> - スタックの頂上に値を追加</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">pop()</code> - 頂上の値を取り出して削除</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">peek()</code> - 頂上の値を削除せずに参照</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">isEmpty()</code> - スタックが空かどうか判定</li>
          <li><code className="text-teal-400 bg-gray-800 px-1 py-0.5 rounded">top</code> 変数で頂上のインデックスを管理</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なスタック実装</h2>
        <p className="text-gray-400 mb-4">
          配列と <code className="text-teal-400 bg-gray-800 px-1.5 py-0.5 rounded">top</code> 変数でスタックを実装します。
          top は -1 から始まり、push で増加、pop で減少します。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 10

int stack[MAX];
int top = -1;

int isEmpty() { return top == -1; }
int isFull()  { return top == MAX - 1; }

void push(int val) {
    if (isFull()) { printf("Stack overflow\\n"); return; }
    stack[++top] = val;
}

int pop() {
    if (isEmpty()) { printf("Stack underflow\\n"); return -1; }
    return stack[top--];
}

int peek() {
    if (isEmpty()) return -1;
    return stack[top];
}

int main() {
    push(10);
    push(20);
    push(30);
    printf("peek: %d\\n", peek());
    printf("pop:  %d\\n", pop());
    printf("pop:  %d\\n", pop());
    printf("peek: %d\\n", peek());
    printf("pop:  %d\\n", pop());
    printf("empty: %d\\n", isEmpty());
    return 0;
}`}
          expectedOutput={`peek: 30
pop:  30
pop:  20
peek: 10
pop:  10
empty: 1`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体でスタックをカプセル化</h2>
        <p className="text-gray-400 mb-4">
          グローバル変数を使う代わりに構造体にスタックの状態をまとめると、
          複数のスタックを独立して使えます。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#define MAX 8

typedef struct {
    int data[MAX];
    int top;
} Stack;

void initStack(Stack *s) { s->top = -1; }
int  isEmpty(Stack *s)   { return s->top == -1; }
void push(Stack *s, int v) {
    if (s->top < MAX - 1) s->data[++s->top] = v;
}
int pop(Stack *s) {
    return isEmpty(s) ? -1 : s->data[s->top--];
}

int main() {
    Stack s1, s2;
    initStack(&s1);
    initStack(&s2);

    push(&s1, 1); push(&s1, 2); push(&s1, 3);
    push(&s2, 10); push(&s2, 20);

    printf("s1 pop: %d\\n", pop(&s1));
    printf("s2 pop: %d\\n", pop(&s2));
    printf("s1 pop: %d\\n", pop(&s1));
    return 0;
}`}
          expectedOutput={`s1 pop: 3
s2 pop: 20
s1 pop: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックの応用：文字列の反転</h2>
        <p className="text-gray-400 mb-4">
          スタックの LIFO 特性を使うと文字列を簡単に反転できます。
          文字を1つずつ push し、すべて pop すると逆順になります。
        </p>
        <CEditor
          defaultCode={`#include <stdio.h>
#include <string.h>
#define MAX 100

char stack[MAX];
int top = -1;

void push(char c) { stack[++top] = c; }
char pop()        { return stack[top--]; }
int  isEmpty()    { return top == -1; }

int main() {
    const char *str = "Hello";
    int len = (int)strlen(str);

    for (int i = 0; i < len; i++) push(str[i]);

    printf("Reversed: ");
    while (!isEmpty()) printf("%c", pop());
    printf("\\n");
    return 0;
}`}
          expectedOutput={`Reversed: olleH`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="stack-queue" lessonId="stack-impl" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-impl" basePath="/learn/stack-queue" />
    </div>
  );
}
