import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function InputOutputPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">入出力</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの標準入出力には<strong className="text-blue-300">print()</strong>関数と<strong className="text-blue-300">dart:io</strong>ライブラリの
            <strong className="text-blue-300">stdout</strong>/<strong className="text-blue-300">stdin</strong>/<strong className="text-blue-300">stderr</strong>が使えます。
            コンソールアプリケーション開発の基礎を学びます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">print() による出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">print()</code>は最も基本的な出力関数です。任意のオブジェクトを文字列化して改行付きで出力します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 基本的な出力
  print('文字列の出力');
  print(42);
  print(3.14);
  print(true);
  print([1, 2, 3]);
  print({'key': 'value'});
  print(null);

  // 文字列補間での出力
  String name = 'Dart';
  int version = 3;
  print('$name $version');

  // 空行の出力
  print('---');
  print('');
  print('---');
}`}
          expectedOutput={`文字列の出力
42
3.14
true
[1, 2, 3]
{key: value}
null
Dart 3
---

---`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">stdout による詳細な出力制御</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">stdout.write()</code>は改行なしで出力します。<code className="text-blue-300">stdout.writeln()</code>は改行付きです。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

void main() {
  // 改行なし出力
  stdout.write('A');
  stdout.write('B');
  stdout.write('C');
  stdout.writeln(); // 改行のみ

  // writeln は print と同様
  stdout.writeln('Hello from stdout');

  // プログレスバー的な表示
  stdout.write('進捗: [');
  for (int i = 0; i < 10; i++) {
    stdout.write('#');
  }
  stdout.writeln(']');

  // 数値のフォーマット出力
  for (int i = 1; i <= 5; i++) {
    stdout.writeln('\$i: \${'*' * i}');
  }
}`}
          expectedOutput={`ABC
Hello from stdout
進捗: [##########]
1: *
2: **
3: ***
4: ****
5: *****`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">stderr とエラー出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">stderr</code>はエラーメッセージの出力に使います。標準出力と分離されているため、ログ処理で便利です。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

void processData(int value) {
  if (value < 0) {
    stderr.writeln('エラー: 負の値は処理できません: \$value');
    return;
  }
  stdout.writeln('処理成功: \${value * 2}');
}

void main() {
  List<int> data = [10, -5, 20, -3, 15];

  for (int val in data) {
    processData(val);
  }

  // 環境変数の取得
  String? path = Platform.environment['PATH'];
  stdout.writeln('PATH は設定されています: \${path != null}');

  // OS情報
  stdout.writeln('OS: \${Platform.operatingSystem}');
}`}
          expectedOutput={`処理成功: 20
エラー: 負の値は処理できません: -5
処理成功: 40
エラー: 負の値は処理できません: -3
処理成功: 30
PATH は設定されています: true
OS: linux`}
        />
      </section>

      <LessonCompleteButton lessonId="input-output" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="input-output" basePath="/learn/basics" />
    </div>
  );
}
