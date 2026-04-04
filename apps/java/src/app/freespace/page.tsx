import { JavaEditor } from "@/components/java-editor";

const DEFAULT_CODE = `// Java FizzBuzz & コレクション操作
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        // FizzBuzz
        System.out.println("=== FizzBuzz (1-20) ===");
        for (int i = 1; i <= 20; i++) {
            if (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3 == 0) System.out.print("Fizz ");
            else if (i % 5 == 0) System.out.print("Buzz ");
            else System.out.print(i + " ");
        }
        System.out.println();

        // ArrayList + Stream
        System.out.println("\\n=== ArrayList + Stream ===");
        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) numbers.add(i);

        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());

        System.out.println("偶数とその二乗:");
        for (int n : evens) {
            System.out.println("  " + n + " -> " + (n * n));
        }

        // HashMap
        System.out.println("\\n=== HashMap ===");
        Map<String, Integer> scores = new HashMap<>();
        scores.put("太郎", 85);
        scores.put("花子", 92);
        scores.put("次郎", 78);

        String topName = "";
        int topScore = 0;
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (entry.getValue() > topScore) {
                topName = entry.getKey();
                topScore = entry.getValue();
            }
        }
        System.out.println("最高得点: " + topName + " (" + topScore + "点)");

        double avg = scores.values().stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0);
        System.out.println("平均点: " + avg);
    }
}
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">Javaフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Javaコードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <JavaEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数宣言、制御構文、メソッド定義、クラスなどJavaの基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Collections・Stream</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ArrayList, HashMap, Stream API, Optionalなどのコレクション機能をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ファイルシステムへのアクセスやネットワーク通信はブラウザのセキュリティ制限により一部制限があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
