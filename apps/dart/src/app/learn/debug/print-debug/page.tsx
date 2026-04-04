import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function PrintDebugPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">printデバッグ</h1>
        <p className="text-gray-400">print・debugPrintを使った基本的なデバッグ手法を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">printデバッグとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          printデバッグは変数の値やプログラムの実行フローをprint文で出力して確認する最もシンプルなデバッグ手法です。
          Dartでは<code className="text-orange-300">print()</code>が基本です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">print(object)</code> コンソールに出力（toString()を呼ぶ）</li>
          <li>• 文字列補間 <code className="text-orange-300">&apos;値: $variable&apos;</code> で変数埋め込み</li>
          <li>• <code className="text-orange-300">object.runtimeType</code> で型を確認</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">効果的なprint活用</h2>
        <p className="text-gray-400 mb-4">
          変数の状態・実行フロー・型情報を出力するテクニックです。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的なprint
  print('=== デバッグ開始 ===');

  // 変数の型と値を同時確認
  final value = 42;
  print('型: \${value.runtimeType}, 値: \$value');

  // コレクションの内容確認
  final items = {'名前': '田中', '年齢': 25, 'アクティブ': true};
  print('Map: \$items');
  items.forEach((key, val) => print('  \$key: \$val (\${val.runtimeType})'));

  // 実行フローの追跡
  int factorial(int n) {
    print('factorial(\$n) 呼び出し');
    if (n <= 1) return 1;
    final result = n * factorial(n - 1);
    print('factorial(\$n) = \$result');
    return result;
  }

  print('\\n=== 5! の計算 ===');
  final result = factorial(4);
  print('最終結果: \$result');
}`}
          expectedOutput={`=== デバッグ開始 ===\n型: int, 値: 42\nMap: {名前: 田中, 年齢: 25, アクティブ: true}\n  名前: 田中 (String)\n  年齢: 25 (int)\n  アクティブ: true (bool)\n\n=== 5! の計算 ===\nfactorial(4) 呼び出し\nfactorial(3) 呼び出し\nfactorial(2) 呼び出し\nfactorial(1) 呼び出し\nfactorial(2) = 2\nfactorial(3) = 6\nfactorial(4) = 24\n最終結果: 24`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">デバッグ用ヘルパー関数</h2>
        <p className="text-gray-400 mb-4">
          デバッグ出力を構造化するヘルパー関数のパターンです。
        </p>
        <DartEditor
          defaultCode={`// デバッグ用ユーティリティ
void debugPrint(String label, dynamic value) {
  print('[DEBUG] \$label: \$value');
}

T trace<T>(String label, T value) {
  print('[TRACE] \$label = \$value');
  return value;
}

void section(String title) {
  print('\\n--- \$title ---');
}

void main() {
  section('ユーザー処理');

  final name = trace('name', 'Alice');
  final age = trace('age', 25);
  final isAdmin = trace('isAdmin', age >= 18);

  debugPrint('ユーザー', '\$name, \$age歳');
  debugPrint('管理者権限', isAdmin);

  section('リスト処理');
  final numbers = [1, 2, 3, 4, 5];
  debugPrint('元のリスト', numbers);

  final doubled = numbers.map((n) => trace('doubled(\$n)', n * 2)).toList();
  debugPrint('2倍したリスト', doubled);
}`}
          expectedOutput={`\n--- ユーザー処理 ---\n[TRACE] name = Alice\n[TRACE] age = 25\n[TRACE] isAdmin = true\n[DEBUG] ユーザー: Alice, 25歳\n[DEBUG] 管理者権限: true\n\n--- リスト処理 ---\n[DEBUG] 元のリスト: [1, 2, 3, 4, 5]\n[TRACE] doubled(1) = 2\n[TRACE] doubled(2) = 4\n[TRACE] doubled(3) = 6\n[TRACE] doubled(4) = 8\n[TRACE] doubled(5) = 10\n[DEBUG] 2倍したリスト: [2, 4, 6, 8, 10]`}
        />
      </section>
      <LessonCompleteButton lessonId="print-debug" categoryId="debug" />
      <LessonNav lessons={lessons} currentId="print-debug" basePath="/learn/debug" />
    </div>
  );
}
