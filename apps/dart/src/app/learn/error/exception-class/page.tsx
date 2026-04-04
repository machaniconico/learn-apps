import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("error");

export default function ExceptionClassPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">エラー処理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">例外クラス</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartには多くの組み込み例外クラスがあります。<strong className="text-red-300">Exception</strong>インターフェースとその実装クラス、
            <strong className="text-red-300">Error</strong>クラスのサブクラスをそれぞれ適切な場面で使います。
            どの例外がどの状況で発生するかを理解することが重要です。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">主要な組み込み例外</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">FormatException</code>・<code className="text-red-300">ArgumentError</code>・<code className="text-red-300">StateError</code>など主要な例外を確認します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // FormatException: 不正なフォーマット
  try {
    int.parse('abc');
  } on FormatException catch (e) {
    print('FormatException: \${e.message}');
  }

  // RangeError: インデックスが範囲外
  try {
    final list = [1, 2, 3];
    print(list[10]);
  } on RangeError catch (e) {
    print('RangeError: \${e.message}');
  }

  // ArgumentError: 無効な引数
  try {
    throw ArgumentError.notNull('name');
  } on ArgumentError catch (e) {
    print('ArgumentError: \${e.message}');
  }

  // StateError: 無効な状態
  try {
    final list = <int>[];
    list.first; // 空リストのfirst
  } on StateError catch (e) {
    print('StateError: \${e.message}');
  }

  // UnsupportedError: 未実装の操作
  try {
    throw UnsupportedError('この操作は未対応です');
  } on UnsupportedError catch (e) {
    print('UnsupportedError: \${e.message}');
  }
}`}
          expectedOutput={`FormatException: Invalid radix-10 number (at character 1)
RangeError: RangeError (index): Index out of range: index should be less than 3: 10
ArgumentError: Invalid argument (name): Must not be null.
StateError: No element
UnsupportedError: この操作は未対応です`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型変換関連の例外</h2>
        <p className="text-gray-400 mb-4">
          型変換に関係する例外と安全な変換方法を理解しましょう。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // int.tryParse: 失敗してもnullを返す（例外なし）
  final values = ['42', '3.14', 'abc', '0', ''];
  for (final v in values) {
    final n = int.tryParse(v);
    print('\$v -> \${n ?? "変換失敗"}');
  }

  print('---');

  // double.parse: 失敗するとFormatException
  for (final v in ['3.14', 'not-a-number']) {
    try {
      final d = double.parse(v);
      print('\$v -> \$d');
    } on FormatException {
      print('\$v -> フォーマットエラー');
    }
  }

  // num.parse: intとdoubleを両方扱う
  print(num.parse('42'));   // int
  print(num.parse('3.14')); // double
}`}
          expectedOutput={`42 -> 42
3.14 -> 変換失敗
abc -> 変換失敗
0 -> 0
 -> 変換失敗
---
3.14 -> 3.14
not-a-number -> フォーマットエラー
42
3.14`}
        />
      </section>

      <LessonCompleteButton lessonId="exception-class" categoryId="error" />
      <LessonNav lessons={lessons} currentId="exception-class" basePath="/learn/error" />
    </div>
  );
}
