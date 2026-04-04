import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("null-safety");

export default function AssertionOperatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-indigo-400 text-sm font-semibold uppercase tracking-wide">Nullセーフティ</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">アサーション演算子</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300">!演算子</strong>（nullアサーション演算子）は、nullable型の値がnullでないとプログラマが保証する際に使います。
            値が実際にnullだった場合は<code className="text-indigo-300">Null check operator used on a null value</code>という実行時エラーが発生します。
            使用には注意が必要で、確実にnullでないと分かる場合のみ使うべきです。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">! 演算子の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">value!</code>はvalueがnullでないことを宣言します。nullの場合は実行時エラーになります。
        </p>
        <DartEditor
          defaultCode={`String? findName(Map<String, String> map, String key) {
  return map[key];
}

void main() {
  final data = {'name': '太郎', 'city': '東京'};

  // ! を使ってnullable -> non-nullableに変換
  // データが確実に存在すると分かっている場合
  final name = findName(data, 'name')!;
  print('名前: \$name');
  print('名前の長さ: \${name.length}文字');

  // 安全な書き方との比較
  final city = findName(data, 'city');
  if (city != null) {
    print('都市（安全）: \${city.length}文字');
  }

  // int.tryParse は int? を返す
  final numStr = '42';
  final num1 = int.tryParse(numStr)!; // 確実に数値なので!OK
  print('数値: \$num1');
}`}
          expectedOutput={`名前: 太郎
名前の長さ: 2文字
都市（安全）: 2文字
数値: 42`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">! の危険性と代替手段</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-300">!</code>の乱用は危険です。可能な限り<code className="text-indigo-300">??</code>や<code className="text-indigo-300">if</code>チェックを使いましょう。
        </p>
        <DartEditor
          defaultCode={`// 安全な代替手段の比較
String processInput(String? input) {
  // 危険: ! を使う（nullなら実行時エラー）
  // return input!.toUpperCase();

  // 安全1: nullチェック
  if (input == null) return '（入力なし）';
  return input.toUpperCase();
}

String processInputSafe2(String? input) {
  // 安全2: ?? でデフォルト値
  return (input ?? '').toUpperCase();
}

String processInputSafe3(String? input) {
  // 安全3: ?. でnull安全アクセス + ??
  return input?.toUpperCase() ?? '（入力なし）';
}

void main() {
  final inputs = ['hello', null, 'dart'];

  for (final input in inputs) {
    print('v1: \${processInput(input)}');
    print('v2: \${processInputSafe2(input)}');
    print('v3: \${processInputSafe3(input)}');
    print('---');
  }
}`}
          expectedOutput={`v1: HELLO
v2: HELLO
v3: HELLO
---
v1: （入力なし）
v2:
v3: （入力なし）
---
v1: DART
v2: DART
v3: DART
---`}
        />
      </section>

      <LessonCompleteButton lessonId="assertion-operator" categoryId="null-safety" />
      <LessonNav lessons={lessons} currentId="assertion-operator" basePath="/learn/null-safety" />
    </div>
  );
}
