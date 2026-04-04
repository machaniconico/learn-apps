import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function PracticalPatternsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold uppercase tracking-wide">ジェネリクス</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">実践的パターン</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            ジェネリクスを活用した実践的なデザインパターンを学びます。
            Result型、Option型、型安全なEventBusなど、実際のプロジェクトで役立つパターンを習得します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックなResult型</h2>
        <p className="text-gray-400 mb-4">
          成功・失敗を型安全に表現する<code className="text-teal-300">Result&lt;T, E&gt;</code>パターンです。
        </p>
        <DartEditor
          defaultCode={`sealed class Result<T, E> {
  const Result();

  bool get isOk => this is Ok<T, E>;
  bool get isErr => this is Err<T, E>;

  R when<R>({
    required R Function(T value) ok,
    required R Function(E error) err,
  }) => switch (this) {
    Ok(value: var v) => ok(v),
    Err(error: var e) => err(e),
  };
}

class Ok<T, E> extends Result<T, E> {
  final T value;
  const Ok(this.value);
}

class Err<T, E> extends Result<T, E> {
  final E error;
  const Err(this.error);
}

Result<int, String> divide(int a, int b) {
  if (b == 0) return Err('ゼロ除算エラー');
  return Ok(a ~/ b);
}

void main() {
  final cases = [(10, 2), (5, 0), (15, 3), (7, 0)];

  for (final (a, b) in cases) {
    final result = divide(a, b);
    final msg = result.when(
      ok: (v) => '\$a / \$b = \$v',
      err: (e) => '\$a / \$b: \$e',
    );
    print(msg);
  }
}`}
          expectedOutput={`10 / 2 = 5
5 / 0: ゼロ除算エラー
15 / 3 = 5
7 / 0: ゼロ除算エラー`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">型安全なイベントバス</h2>
        <p className="text-gray-400 mb-4">
          ジェネリクスを使った型安全なEventBusパターンです。
        </p>
        <DartEditor
          defaultCode={`class EventBus {
  final Map<Type, List<Function>> _handlers = {};

  void on<T>(void Function(T) handler) {
    (_handlers[T] ??= []).add(handler);
  }

  void emit<T>(T event) {
    final handlers = _handlers[T] ?? [];
    for (final handler in handlers) {
      (handler as void Function(T))(event);
    }
  }
}

class UserLoginEvent {
  final String username;
  UserLoginEvent(this.username);
}

class DataLoadedEvent {
  final int count;
  DataLoadedEvent(this.count);
}

void main() {
  final bus = EventBus();

  // イベントハンドラの登録
  bus.on<UserLoginEvent>((e) => print('ログイン: \${e.username}'));
  bus.on<UserLoginEvent>((e) => print('監査ログ: \${e.username}がログイン'));
  bus.on<DataLoadedEvent>((e) => print('データ読込: \${e.count}件'));

  // イベントの発行
  bus.emit(UserLoginEvent('太郎'));
  bus.emit(DataLoadedEvent(42));
  bus.emit(UserLoginEvent('花子'));
}`}
          expectedOutput={`ログイン: 太郎
監査ログ: 太郎がログイン
データ読込: 42件
ログイン: 花子
監査ログ: 花子がログイン`}
        />
      </section>

      <LessonCompleteButton lessonId="practical-patterns" categoryId="generics" />
      <LessonNav lessons={lessons} currentId="practical-patterns" basePath="/learn/generics" />
    </div>
  );
}
