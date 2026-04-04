import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function HelloWorldPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold uppercase tracking-wide">Dart基礎 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Hello, World!</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-blue-300">main()</strong>関数はDartプログラムのエントリーポイントです。
            プログラムが実行されると最初にmain()が呼ばれます。
            <strong className="text-blue-300">print()</strong>関数でコンソールに文字列を出力できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">最初のDartプログラム</h2>
        <p className="text-gray-400 mb-4">
          全てのDartプログラムは<code className="text-blue-300">main()</code>関数から始まります。<code className="text-blue-300">void</code>は戻り値がないことを意味します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  print('Hello, World!');
  print('Dartプログラミングへようこそ！');
}`}
          expectedOutput={`Hello, World!
Dartプログラミングへようこそ！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">文字列補間</h2>
        <p className="text-gray-400 mb-4">
          Dartでは<code className="text-blue-300">$変数名</code>や<code className="text-blue-300">{"$"}{"{式}"}</code>で文字列の中に変数や式を埋め込めます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  String name = 'Dart';
  int year = 2011;
  double version = 3.0;

  print('言語名: \$name');
  print('誕生年: \$year');
  print('現在のバージョン: \$version');
  print('\${name}は\${year}年に誕生しました');
  print('2 + 3 = \${2 + 3}');
}`}
          expectedOutput={`言語名: Dart
誕生年: 2011
現在のバージョン: 3.0
Dartは2011年に誕生しました
2 + 3 = 5`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">複数行の出力</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-blue-300">print()</code>は呼ばれるたびに改行します。複数行出力したい場合は複数回呼び出します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  print('=== Dartの特徴 ===');
  print('1. 型安全');
  print('2. Null Safety');
  print('3. AOT/JITコンパイル');
  print('4. Flutterで使用');
  print('================');
}`}
          expectedOutput={`=== Dartの特徴 ===
1. 型安全
2. Null Safety
3. AOT/JITコンパイル
4. Flutterで使用
================`}
        />
      </section>

      <LessonCompleteButton lessonId="hello-world" categoryId="basics" />
      <LessonNav lessons={lessons} currentId="hello-world" basePath="/learn/basics" />
    </div>
  );
}
