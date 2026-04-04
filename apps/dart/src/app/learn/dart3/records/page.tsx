import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dart3");

export default function RecordsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold">Dart 3新機能 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">レコード型</h1>
        <p className="text-gray-400">Dart 3で追加された不変データ構造のレコード型を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">レコード型とは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          レコード型はDart 3で追加された不変（イミュータブル）な匿名の複合型です。
          クラスを定義せずに複数の値をまとめて扱えます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-violet-300">(Type, Type)</code> で位置フィールドのレコード</li>
          <li>• <code className="text-violet-300">{"({String name, int age})"}</code> で名前付きフィールドのレコード</li>
          <li>• 関数から複数値を返すのに最適</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">レコードの基本構文</h2>
        <p className="text-gray-400 mb-4">
          位置フィールドと名前付きフィールドの使い方です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 位置フィールド
  (int, String) point = (42, 'hello');
  print('\${point.\$1}, \${point.\$2}');

  // 名前付きフィールド
  ({String name, int age}) person = (name: '田中', age: 28);
  print('\${person.name}は\${person.age}歳');

  // 混合フィールド
  (String, {int score}) result = ('Alice', score: 95);
  print('\${result.\$1}: \${result.score}点');

  // レコードの等価性
  final r1 = (1, 2);
  final r2 = (1, 2);
  print('r1 == r2: \${r1 == r2}');
}`}
          expectedOutput={`42, hello\n田中は28歳\nAlice: 95点\nr1 == r2: true`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数からの複数戻り値</h2>
        <p className="text-gray-400 mb-4">
          レコード型を使って関数から複数の値を返す実用的なパターンです。
        </p>
        <DartEditor
          defaultCode={`// レコードで複数値を返す
({int min, int max, double avg}) stats(List<int> values) {
  values.sort();
  final avg = values.reduce((a, b) => a + b) / values.length;
  return (min: values.first, max: values.last, avg: avg);
}

// エラーも含めた結果を返す
(bool success, String message) validateAge(int age) {
  if (age < 0) return (false, '年齢は0以上である必要があります');
  if (age > 150) return (false, '年齢が異常です');
  return (true, '有効な年齢です');
}

void main() {
  final data = [5, 2, 8, 1, 9, 3, 7];
  final result = stats(data);
  print('最小: \${result.min}, 最大: \${result.max}, 平均: \${result.avg.toStringAsFixed(1)}');

  final (ok1, msg1) = validateAge(25);
  print('\$msg1: \$ok1');

  final (ok2, msg2) = validateAge(-5);
  print('\$msg2: \$ok2');
}`}
          expectedOutput={`最小: 1, 最大: 9, 平均: 5.0\n有効な年齢です: true\n年齢は0以上である必要があります: false`}
        />
      </section>
      <LessonCompleteButton lessonId="records" categoryId="dart3" />
      <LessonNav lessons={lessons} currentId="records" basePath="/learn/dart3" />
    </div>
  );
}
