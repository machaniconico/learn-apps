import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function ImportExportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">パッケージ管理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">import・export</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-orange-300">import</strong>文でライブラリを読み込み、<strong className="text-orange-300">export</strong>でパブリックAPIを公開します。
            <code className="text-orange-300">show</code>・<code className="text-orange-300">hide</code>・<code className="text-orange-300">as</code>を使ってインポートを制御できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">import の種類</h2>
        <p className="text-gray-400 mb-4">
          Dartには3種類のimportがあります：<code className="text-orange-300">dart:</code>（コアライブラリ）、<code className="text-orange-300">package:</code>（外部パッケージ）、相対パスインポートです。
        </p>
        <DartEditor
          defaultCode={`// コアライブラリのimport
import 'dart:math';
import 'dart:convert';
import 'dart:collection';

// show: 特定の名前だけをインポート
// import 'dart:math' show sqrt, pi, Random;

// hide: 特定の名前を除外
// import 'dart:math' hide Rectangle;

// as: エイリアスを付ける
// import 'dart:math' as math;

void main() {
  // dart:math の使用
  print('π = \${pi.toStringAsFixed(5)}');
  print('√2 = \${sqrt(2).toStringAsFixed(5)}');

  final rand = Random(42);
  print('乱数: \${rand.nextInt(100)}');

  // dart:convert の使用
  final encoded = base64.encode([72, 101, 108, 108, 111]);
  print('Base64: \$encoded');
  print('デコード: \${String.fromCharCodes(base64.decode(encoded))}');

  // dart:collection の使用
  final queue = Queue<int>()..addAll([1, 2, 3]);
  print('Queue: \$queue');
}`}
          expectedOutput={`π = 3.14159
√2 = 1.41421
乱数: 0
Base64: SGVsbG8=
デコード: Hello
Queue: {1, 2, 3}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前の衝突と as エイリアス</h2>
        <p className="text-gray-400 mb-4">
          同名の識別子が複数のライブラリにある場合、<code className="text-orange-300">as</code>でエイリアスを付けて解決します。
        </p>
        <DartEditor
          defaultCode={`import 'dart:math' as math;
import 'dart:core'; // 通常は自動インポート

void main() {
  // math プレフィックスで明示的にアクセス
  print('math.sqrt(16) = \${math.sqrt(16)}');
  print('math.pow(2, 10) = \${math.pow(2, 10)}');
  print('math.max(3, 7) = \${math.max(3, 7)}');
  print('math.min(3, 7) = \${math.min(3, 7)}');

  // math.Randomの使用
  final random = math.Random.secure();
  print('セキュア乱数: \${random.nextInt(1000)}');

  // 定数
  print('math.e = \${math.e.toStringAsFixed(5)}');
  print('math.pi = \${math.pi.toStringAsFixed(5)}');
  print('math.ln2 = \${math.log(2).toStringAsFixed(5)}');
}`}
          expectedOutput={`math.sqrt(16) = 4.0
math.pow(2, 10) = 1024.0
math.max(3, 7) = 7
math.min(3, 7) = 3
セキュア乱数: 427
math.e = 2.71828
math.pi = 3.14159
math.ln2 = 0.69315`}
        />
      </section>

      <LessonCompleteButton lessonId="import-export" categoryId="packages" />
      <LessonNav lessons={lessons} currentId="import-export" basePath="/learn/packages" />
    </div>
  );
}
