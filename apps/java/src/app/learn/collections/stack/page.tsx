import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function StackPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">コレクション レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">{"Stack・ArrayDeque"}</h1>
        <p className="text-gray-400">スタック操作とArrayDequeでの実装</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタックは後入れ先出し（LIFO）のデータ構造です。
          Java には <code className="text-orange-300">Stack</code> クラスがありますが、
          レガシーなため、現在は <code className="text-orange-300">ArrayDeque</code> を
          スタックとして使うことが推奨されています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code>push()</code> で先頭に追加（積む）</li>
          <li><code>pop()</code> で先頭から取り出し（取る）</li>
          <li><code>peek()</code> で先頭を確認（取らない）</li>
          <li>ArrayDeque は Stack より高速で推奨される</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">レガシーなStackクラス</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">java.util.Stack</code> の基本操作です。
          動作を理解した上で、実際のコードでは ArrayDeque を使いましょう。
        </p>
        <JavaEditor
          defaultCode={`import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Stack<String> stack = new Stack<>();

        // push: 要素を積む
        stack.push("本1");
        stack.push("本2");
        stack.push("本3");
        System.out.println("スタック: " + stack);

        // peek: 一番上を確認
        System.out.println("peek: " + stack.peek());

        // pop: 一番上を取り出す
        System.out.println("pop: " + stack.pop());
        System.out.println("pop: " + stack.pop());
        System.out.println("残り: " + stack);

        // 空チェック
        System.out.println("空? " + stack.empty());
        stack.pop();
        System.out.println("全部取り出し後 空? " + stack.empty());

        // search: 要素の位置（1始まり、top=1）
        stack.push("A");
        stack.push("B");
        stack.push("C");
        System.out.println("Bの位置: " + stack.search("B"));
    }
}`}
          expectedOutput={`スタック: [本1, 本2, 本3]
peek: 本3
pop: 本3
pop: 本2
残り: [本1]
空? false
全部取り出し後 空? true
Bの位置: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ArrayDequeによるスタック</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">ArrayDeque</code> の <code className="text-orange-300">push()</code> と
          <code className="text-orange-300">pop()</code> を使ってスタックを実装します。
          こちらが推奨されるモダンな方法です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        // ArrayDequeをスタックとして使用
        Deque<String> stack = new ArrayDeque<>();

        // push: 先頭に積む
        stack.push("ページ1: ホーム");
        stack.push("ページ2: 商品一覧");
        stack.push("ページ3: 商品詳細");
        System.out.println("履歴: " + stack);

        // 戻る操作
        System.out.println("戻る: " + stack.pop());
        System.out.println("現在: " + stack.peek());
        System.out.println("戻る: " + stack.pop());
        System.out.println("現在: " + stack.peek());

        // 別のページへ
        stack.push("ページ4: カート");
        System.out.println("履歴: " + stack);
        System.out.println("サイズ: " + stack.size());
    }
}`}
          expectedOutput={`履歴: [ページ3: 商品詳細, ページ2: 商品一覧, ページ1: ホーム]
戻る: ページ3: 商品詳細
現在: ページ2: 商品一覧
戻る: ページ2: 商品一覧
現在: ページ1: ホーム
履歴: [ページ4: カート, ページ1: ホーム]
サイズ: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スタックの実践例：括弧チェック</h2>
        <p className="text-gray-400 mb-4">
          スタックを使って括弧の対応をチェックする、典型的なアルゴリズム問題です。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("'(){}[]' = " + isValid("(){}[]"));
        System.out.println("'({[]})' = " + isValid("({[]})"));
        System.out.println("'(]' = " + isValid("(]"));
        System.out.println("'([)]' = " + isValid("([)]"));
        System.out.println("'' = " + isValid(""));
    }
}`}
          expectedOutput={`'(){}[]' = true
'({[]})' = true
'(]' = false
'([)]' = false
'' = true`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="stack" />
      </div>
      <LessonNav lessons={lessons} currentId="stack" basePath="/learn/collections" />
    </div>
  );
}
