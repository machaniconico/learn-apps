import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function DesignPatternsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">デザインパターン概要</h1>
        <p className="text-gray-400">GoFデザインパターンの分類と、Dartでの活用シーンを学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">デザインパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          デザインパターンは、ソフトウェア設計における繰り返し登場する問題に対する汎用的な解決策です。
          GoF（Gang of Four）が定義した23のパターンは生成・構造・振る舞いの3カテゴリに分類されます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-pink-300">生成パターン</code>: Singleton、Factory、Builder など</li>
          <li>• <code className="text-pink-300">構造パターン</code>: Adapter、Decorator、Facade など</li>
          <li>• <code className="text-pink-300">振る舞いパターン</code>: Observer、Strategy、Command など</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Builderパターン</h2>
        <p className="text-gray-400 mb-4">
          複雑なオブジェクトを段階的に構築するBuilderパターンです。
        </p>
        <DartEditor
          defaultCode={`class Pizza {
  final String size;
  final String crust;
  final List<String> toppings;

  Pizza._(this.size, this.crust, this.toppings);

  @override
  String toString() =>
      'Pizza[\$size/\$crust]: \${toppings.join(", ")}';
}

class PizzaBuilder {
  String _size = 'M';
  String _crust = 'thin';
  final List<String> _toppings = [];

  PizzaBuilder size(String s) { _size = s; return this; }
  PizzaBuilder crust(String c) { _crust = c; return this; }
  PizzaBuilder addTopping(String t) { _toppings.add(t); return this; }
  Pizza build() => Pizza._(_size, _crust, List.unmodifiable(_toppings));
}

void main() {
  final pizza = PizzaBuilder()
      .size('L')
      .crust('thick')
      .addTopping('チーズ')
      .addTopping('ペパロニ')
      .addTopping('マッシュルーム')
      .build();
  print(pizza);
}`}
          expectedOutput={`Pizza[L/thick]: チーズ, ペパロニ, マッシュルーム`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Adapterパターン</h2>
        <p className="text-gray-400 mb-4">
          互換性のないインターフェースを繋ぐAdapterパターンです。
        </p>
        <DartEditor
          defaultCode={`// 既存の古いAPI
class OldLogger {
  void writeLog(int level, String msg) {
    print('[level:\$level] \$msg');
  }
}

// 新しいインターフェース
abstract class Logger {
  void info(String msg);
  void error(String msg);
}

// Adapterで変換
class LoggerAdapter implements Logger {
  final OldLogger _old;
  LoggerAdapter(this._old);

  @override
  void info(String msg) => _old.writeLog(1, msg);

  @override
  void error(String msg) => _old.writeLog(3, msg);
}

void useLogger(Logger logger) {
  logger.info('アプリ起動');
  logger.error('接続失敗');
}

void main() {
  final adapter = LoggerAdapter(OldLogger());
  useLogger(adapter);
}`}
          expectedOutput={`[level:1] アプリ起動\n[level:3] 接続失敗`}
        />
      </section>
      <LessonCompleteButton lessonId="design-patterns" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="design-patterns" basePath="/learn/oop-advanced" />
    </div>
  );
}
