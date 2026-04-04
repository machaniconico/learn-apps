import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functional");

export default function FunctionCompositionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wide">関数型プログラミング</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">関数合成</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-purple-300">関数合成（Function Composition）</strong>は複数の関数を組み合わせて新しい関数を作る手法です。
            <code className="text-purple-300">f(g(x))</code>のように関数をパイプラインで繋げます。
            各関数が単一の責務を持つ小さな関数として設計できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数合成の基本</h2>
        <p className="text-gray-400 mb-4">
          2つの関数を合成するcomposeヘルパーを作り、処理パイプラインを構築します。
        </p>
        <DartEditor
          defaultCode={`// 関数合成ヘルパー
T Function(A) compose<A, T, B>(
  T Function(B) f,
  B Function(A) g,
) => (A x) => f(g(x));

// 複数の同型関数を合成
String Function(String) pipeline(List<String Function(String)> fns) {
  return (String s) => fns.fold(s, (acc, fn) => fn(acc));
}

void main() {
  // 単純な関数合成
  String trim(String s) => s.trim();
  String upper(String s) => s.toUpperCase();
  String addBang(String s) => '\$s!';

  final shout = compose(addBang, compose(upper, trim));
  print(shout('  hello world  '));

  print('---');

  // パイプラインで複数合成
  final processText = pipeline([
    (s) => s.trim(),
    (s) => s.toLowerCase(),
    (s) => s.replaceAll(' ', '_'),
    (s) => 'prefix_\$s',
  ]);

  final inputs = ['  Hello World  ', 'DART LANGUAGE', ' Null Safety '];
  for (final input in inputs) {
    print(processText(input));
  }
}`}
          expectedOutput={`HELLO WORLD!
---
prefix_hello_world
prefix_dart_language
prefix_null_safety`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">データ変換パイプライン</h2>
        <p className="text-gray-400 mb-4">
          関数合成でデータ変換の各ステップを独立した関数として定義し、組み合わせます。
        </p>
        <DartEditor
          defaultCode={`List<T> Function(List<T>) filter<T>(bool Function(T) pred) =>
    (list) => list.where(pred).toList();

List<R> Function(List<T>) transform<T, R>(R Function(T) fn) =>
    (list) => list.map(fn).toList();

List<T> Function(List<T>) sortBy<T>(int Function(T, T) compare) =>
    (list) => [...list]..sort(compare);

void main() {
  final data = [
    {'name': '田中', 'score': 72, 'active': true},
    {'name': '鈴木', 'score': 88, 'active': false},
    {'name': '佐藤', 'score': 65, 'active': true},
    {'name': '山田', 'score': 95, 'active': true},
    {'name': '中村', 'score': 58, 'active': false},
  ];

  // パイプラインで処理
  final activeFilter = filter<Map<String, dynamic>>((d) => d['active'] as bool);
  final scoreSort = sortBy<Map<String, dynamic>>(
      (a, b) => (b['score'] as int).compareTo(a['score'] as int));
  final nameMapper = transform<Map<String, dynamic>, String>(
      (d) => '\${d['name']}: \${d['score']}点');

  // 合成して実行
  final process = (List<Map<String, dynamic>> list) =>
      nameMapper(scoreSort(activeFilter(list)));

  final result = process(data);
  print('アクティブユーザー（スコア順）:');
  result.forEach(print);
}`}
          expectedOutput={`アクティブユーザー（スコア順）:
山田: 95点
田中: 72点
佐藤: 65点`}
        />
      </section>

      <LessonCompleteButton lessonId="function-composition" categoryId="functional" />
      <LessonNav lessons={lessons} currentId="function-composition" basePath="/learn/functional" />
    </div>
  );
}
