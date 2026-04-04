import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function MethodOverridingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">メソッドのオーバーライド</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">@override</strong>アノテーションを使って、親クラスのメソッドを子クラスで再定義できます。
            オーバーライドによって同じメソッド名で異なる動作を実装し、ポリモーフィズムの基盤を作ります。
            Dartでは<code className="text-red-300">@override</code>は必須ではありませんが、コードの意図を明確にするため推奨されます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">@override の基本</h2>
        <p className="text-gray-400 mb-4">
          親クラスのメソッドと同じ名前・シグネチャでメソッドを定義し、<code className="text-red-300">@override</code>を付けます。
        </p>
        <DartEditor
          defaultCode={`class Printer {
  void print(String message) {
    stdout.writeln('[デフォルト] \$message');
  }

  String format(String text) => text;
}

class UpperCasePrinter extends Printer {
  @override
  void print(String message) {
    stdout.writeln('[大文字] \${message.toUpperCase()}');
  }

  @override
  String format(String text) => text.toUpperCase();
}

class PrefixPrinter extends Printer {
  String prefix;
  PrefixPrinter(this.prefix);

  @override
  void print(String message) {
    stdout.writeln('[\$prefix] \$message');
  }
}

import 'dart:io';

void main() {
  final p1 = Printer();
  final p2 = UpperCasePrinter();
  final p3 = PrefixPrinter('INFO');

  p1.print('こんにちは');
  p2.print('こんにちは');
  p3.print('こんにちは');

  print(p2.format('hello world'));
}`}
          expectedOutput={`[デフォルト] こんにちは
[大文字] こんにちは
[INFO] こんにちは
HELLO WORLD`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">super でオーバーライド元を呼ぶ</h2>
        <p className="text-gray-400 mb-4">
          オーバーライドしたメソッド内で<code className="text-red-300">super.メソッド名()</code>を使って親クラスの実装を呼び出せます。
        </p>
        <DartEditor
          defaultCode={`class Logger {
  void log(String message) {
    print('LOG: \$message');
  }
}

class TimestampLogger extends Logger {
  @override
  void log(String message) {
    super.log('[2024-01-01] \$message');
  }
}

class PrefixedTimestampLogger extends TimestampLogger {
  String level;
  PrefixedTimestampLogger(this.level);

  @override
  void log(String message) {
    super.log('[\$level] \$message');
  }
}

void main() {
  final logger = Logger();
  final tsLogger = TimestampLogger();
  final fullLogger = PrefixedTimestampLogger('ERROR');

  logger.log('基本メッセージ');
  tsLogger.log('タイムスタンプ付き');
  fullLogger.log('完全なログ');
}`}
          expectedOutput={`LOG: 基本メッセージ
LOG: [2024-01-01] タイムスタンプ付き
LOG: [2024-01-01] [ERROR] 完全なログ`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ゲッター・セッターのオーバーライド</h2>
        <p className="text-gray-400 mb-4">
          プロパティの<code className="text-red-300">getter</code>・<code className="text-red-300">setter</code>もオーバーライドできます。
        </p>
        <DartEditor
          defaultCode={`class Temperature {
  double _celsius;

  Temperature(this._celsius);

  double get celsius => _celsius;
  set celsius(double value) => _celsius = value;

  double get fahrenheit => _celsius * 9 / 5 + 32;

  @override
  String toString() => '\${_celsius}°C';
}

class ClampedTemperature extends Temperature {
  double min;
  double max;

  ClampedTemperature(double celsius, this.min, this.max)
      : super(celsius);

  @override
  set celsius(double value) {
    if (value < min) {
      super.celsius = min;
    } else if (value > max) {
      super.celsius = max;
    } else {
      super.celsius = value;
    }
  }

  @override
  String toString() =>
      '\${super.toString()} (範囲: \$min～\$max)';
}

void main() {
  final t = ClampedTemperature(20.0, -10.0, 50.0);
  print(t);

  t.celsius = 60.0; // 上限を超える
  print(t);

  t.celsius = -20.0; // 下限を超える
  print(t);

  t.celsius = 30.0; // 範囲内
  print(t);
  print('華氏: \${t.fahrenheit}°F');
}`}
          expectedOutput={`20.0°C (範囲: -10.0～50.0)
50.0°C (範囲: -10.0～50.0)
-10.0°C (範囲: -10.0～50.0)
30.0°C (範囲: -10.0～50.0)
華氏: 86.0°F`}
        />
      </section>

      <LessonCompleteButton lessonId="method-overriding" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="method-overriding" basePath="/learn/inheritance" />
    </div>
  );
}
