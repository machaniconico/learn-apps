import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JavaEditor } from "@/components/java-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("algo");

export default function StackQueueUsagePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">アルゴリズム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">スタック・キュー活用</h1>
        <p className="text-gray-400">括弧の対応チェック、BFS</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">スタックとキューの活用</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          スタック（LIFO）とキュー（FIFO）は多くのアルゴリズムの基盤となるデータ構造です。
          括弧の対応チェック、逆ポーランド記法の計算、BFS（幅優先探索）などに活用されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>スタック - <code>Deque&lt;E&gt;</code>（ArrayDeque推奨、Stackクラスは非推奨）</li>
          <li>キュー - <code>Queue&lt;E&gt;</code>（LinkedListまたはArrayDeque）</li>
          <li>スタック: 括弧チェック、DFS、Undo機能</li>
          <li>キュー: BFS、タスクスケジューリング</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">括弧の対応チェック</h2>
        <p className="text-gray-400 mb-4">
          スタックの代表的な応用例です。開き括弧をスタックにpushし、
          閉じ括弧が来たらpopして対応をチェックします。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;

public class Main {
    static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> pairs = Map.of(
            ')', '(', '}', '{', ']', '['
        );

        for (char c : s.toCharArray()) {
            if ("({[".indexOf(c) >= 0) {
                stack.push(c);
            } else if (")}]".indexOf(c) >= 0) {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] tests = {"()", "()[]{}", "(]", "([)]", "{[]}", "((("};

        for (String test : tests) {
            boolean valid = isValid(test);
            System.out.printf("%-10s → %s%n", test, valid ? "有効" : "無効");
        }
    }
}`}
          expectedOutput={`()         → 有効
()[]{}     → 有効
(]         → 無効
([)]       → 無効
{[]}       → 有効
(((        → 無効`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">逆ポーランド記法の計算</h2>
        <p className="text-gray-400 mb-4">
          スタックを使って逆ポーランド記法（後置記法）の式を評価する例です。
          数値をpushし、演算子が来たら2つpopして計算結果をpushします。
        </p>
        <JavaEditor
          defaultCode={`import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    static int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (String token : tokens) {
            switch (token) {
                case "+", "-", "*", "/" -> {
                    int b = stack.pop();
                    int a = stack.pop();
                    int result = switch (token) {
                        case "+" -> a + b;
                        case "-" -> a - b;
                        case "*" -> a * b;
                        case "/" -> a / b;
                        default -> 0;
                    };
                    stack.push(result);
                }
                default -> stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        // 2 + 3 = 5
        String[] expr1 = {"2", "3", "+"};
        System.out.println("2 3 + = " + evalRPN(expr1));

        // (3 + 4) * 2 = 14
        String[] expr2 = {"3", "4", "+", "2", "*"};
        System.out.println("3 4 + 2 * = " + evalRPN(expr2));

        // 5 + ((1 + 2) * 4) - 3 = 14
        String[] expr3 = {"5", "1", "2", "+", "4", "*", "+", "3", "-"};
        System.out.println("5 1 2 + 4 * + 3 - = " + evalRPN(expr3));
    }
}`}
          expectedOutput={`2 3 + = 5
3 4 + 2 * = 14
5 1 2 + 4 * + 3 - = 14`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">キューでBFS（幅優先探索）</h2>
        <p className="text-gray-400 mb-4">
          BFSはキューを使ってグラフやツリーを幅方向に探索するアルゴリズムです。
          最短経路の探索に適しています。
        </p>
        <JavaEditor
          defaultCode={`import java.util.*;

public class Main {
    static void bfs(Map<String, List<String>> graph, String start) {
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();

        queue.offer(start);
        visited.add(start);
        int level = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            System.out.print("レベル " + level + ": ");
            for (int i = 0; i < size; i++) {
                String node = queue.poll();
                System.out.print(node + " ");
                for (String neighbor : graph.getOrDefault(node, List.of())) {
                    if (!visited.contains(neighbor)) {
                        visited.add(neighbor);
                        queue.offer(neighbor);
                    }
                }
            }
            System.out.println();
            level++;
        }
    }

    public static void main(String[] args) {
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", List.of("B", "C"));
        graph.put("B", List.of("D", "E"));
        graph.put("C", List.of("F"));
        graph.put("D", List.of());
        graph.put("E", List.of("F"));
        graph.put("F", List.of());

        System.out.println("=== BFS（幅優先探索） ===");
        bfs(graph, "A");
    }
}`}
          expectedOutput={`=== BFS（幅優先探索） ===
レベル 0: A
レベル 1: B C
レベル 2: D E F `}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algo" lessonId="stack-queue-usage" />
      </div>
      <LessonNav lessons={lessons} currentId="stack-queue-usage" basePath="/learn/algo" />
    </div>
  );
}
