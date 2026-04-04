import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function ObserverPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">オブザーバーパターン</h1>
        <p className="text-gray-400">イベント駆動設計に使うオブザーバーパターンをDartで実装します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">オブザーバーパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          オブザーバーパターンは、あるオブジェクト（Subject）の状態変化を複数のオブジェクト（Observer）に通知する仕組みです。
          UIの更新・イベント処理・リアクティブプログラミングの基盤になっています。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-pink-300">Subject</code>（発行者）がObserverのリストを管理</li>
          <li>• 状態変化時に全Observerの<code className="text-pink-300">update()</code>を呼び出す</li>
          <li>• ObserverはSubjectの内部実装を知らなくてよい</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なオブザーバーの実装</h2>
        <p className="text-gray-400 mb-4">
          在庫管理システムでのオブザーバーパターンの実装例です。
        </p>
        <DartEditor
          defaultCode={`abstract class Observer {
  void update(String event, dynamic data);
}

class EventEmitter {
  final Map<String, List<Observer>> _listeners = {};

  void on(String event, Observer observer) {
    _listeners.putIfAbsent(event, () => []).add(observer);
  }

  void emit(String event, dynamic data) {
    _listeners[event]?.forEach((o) => o.update(event, data));
  }
}

class StockNotifier implements Observer {
  final String name;
  StockNotifier(this.name);

  @override
  void update(String event, dynamic data) {
    print('\$name: [\$event] \$data');
  }
}

void main() {
  final store = EventEmitter();
  final emailAlert = StockNotifier('メール通知');
  final smsAlert = StockNotifier('SMS通知');

  store.on('stock_low', emailAlert);
  store.on('stock_low', smsAlert);
  store.on('order_placed', emailAlert);

  store.emit('stock_low', '商品A: 残り3個');
  store.emit('order_placed', '注文#1234 受付');
}`}
          expectedOutput={`メール通知: [stock_low] 商品A: 残り3個\nSMS通知: [stock_low] 商品A: 残り3個\nメール通知: [order_placed] 注文#1234 受付`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">関数ベースのオブザーバー</h2>
        <p className="text-gray-400 mb-4">
          Dartではクロージャを使ってよりシンプルにオブザーバーを実装できます。
        </p>
        <DartEditor
          defaultCode={`class ValueNotifier<T> {
  T _value;
  final List<void Function(T)> _listeners = [];

  ValueNotifier(this._value);

  T get value => _value;

  set value(T newValue) {
    if (_value != newValue) {
      _value = newValue;
      for (final listener in _listeners) {
        listener(newValue);
      }
    }
  }

  void addListener(void Function(T) listener) {
    _listeners.add(listener);
  }
}

void main() {
  final counter = ValueNotifier<int>(0);

  counter.addListener((v) => print('カウンター変更: \$v'));
  counter.addListener((v) {
    if (v >= 3) print('  ⚠️ 3以上になりました！');
  });

  counter.value = 1;
  counter.value = 2;
  counter.value = 3;
  counter.value = 3; // 同じ値は通知しない
}`}
          expectedOutput={`カウンター変更: 1\nカウンター変更: 2\nカウンター変更: 3\n  ⚠️ 3以上になりました！`}
        />
      </section>
      <LessonCompleteButton lessonId="observer" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/oop-advanced" />
    </div>
  );
}
