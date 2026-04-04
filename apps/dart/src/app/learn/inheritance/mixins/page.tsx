import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function MixinsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-red-400 text-sm font-semibold uppercase tracking-wide">継承・Mixin</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Mixin</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-red-300">Mixin</strong>はコードを再利用するための仕組みで、複数のクラスに横断的な機能を追加します。
            <code className="text-red-300">mixin</code>キーワードで定義し、<code className="text-red-300">with</code>キーワードで適用します。
            Dartは単一継承のみですが、Mixinを使うと多重継承に近い設計が実現できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">mixin の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">mixin</code>でメソッドや変数を定義し、<code className="text-red-300">with</code>で複数のクラスに適用できます。
        </p>
        <DartEditor
          defaultCode={`mixin Greetable {
  String get name;

  void greet() => print('こんにちは、\$name です！');
  void farewell() => print('さようなら、\$name でした！');
}

mixin Countable {
  int _count = 0;

  void increment() => _count++;
  void decrement() => _count--;
  int get count => _count;
  void showCount() => print('カウント: \$_count');
}

mixin Loggable {
  List<String> _logs = [];

  void addLog(String message) {
    _logs.add('[LOG] \$message');
  }

  void showLogs() {
    for (final log in _logs) {
      print(log);
    }
  }
}

class Player with Greetable, Countable, Loggable {
  @override
  final String name;

  Player(this.name);

  void score() {
    increment();
    addLog('\$name がスコア獲得（計\${count}点）');
  }
}

void main() {
  final player = Player('Alice');
  player.greet();
  player.score();
  player.score();
  player.score();
  player.showCount();
  player.showLogs();
  player.farewell();
}`}
          expectedOutput={`こんにちは、Alice です！
カウント: 3
[LOG] Alice がスコア獲得（計1点）
[LOG] Alice がスコア獲得（計2点）
[LOG] Alice がスコア獲得（計3点）
さようなら、Alice でした！`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">on キーワードによる制約</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">on</code>を使ってMixinを適用できるクラスを制限できます。
        </p>
        <DartEditor
          defaultCode={`class Animal {
  String name;
  Animal(this.name);
  void breathe() => print('\$name: 呼吸中');
}

// Animal またはそのサブクラスにのみ適用可能
mixin CanSwim on Animal {
  void swim() => print('\$name: 泳いでいます');
  void dive() => print('\$name: 潜水中');
}

mixin CanFly on Animal {
  void fly() => print('\$name: 飛んでいます');
  void land() => print('\$name: 着地');
}

class Fish extends Animal with CanSwim {
  Fish(String name) : super(name);
}

class Bird extends Animal with CanFly {
  Bird(String name) : super(name);
}

class Duck extends Animal with CanSwim, CanFly {
  Duck(String name) : super(name);
}

void main() {
  final fish = Fish('コイ');
  fish.breathe();
  fish.swim();
  fish.dive();

  print('');

  final duck = Duck('アヒル');
  duck.breathe();
  duck.swim();
  duck.fly();
}`}
          expectedOutput={`コイ: 呼吸中
コイ: 泳いでいます
コイ: 潜水中

アヒル: 呼吸中
アヒル: 泳いでいます
アヒル: 飛んでいます`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Mixin の優先順位</h2>
        <p className="text-gray-400 mb-4">
          複数のMixinに同じメソッドがある場合、<code className="text-red-300">with</code>の右側が優先されます（線形化）。
        </p>
        <DartEditor
          defaultCode={`mixin A {
  String greet() => 'A からこんにちは';
  void hello() => print('Mixin A');
}

mixin B {
  String greet() => 'B からこんにちは';
  void hello() => print('Mixin B');
}

mixin C {
  String greet() => 'C からこんにちは';
}

// B が A より後なので B が優先
class Test1 with A, B {
  // greet() は B のものが使われる
}

// A が B より後なので A が優先
class Test2 with B, A {
  // greet() は A のものが使われる
}

class Test3 with A, B, C {
  // greet() は C のものが使われる（最後）
}

void main() {
  print(Test1().greet()); // B
  Test1().hello();        // B

  print(Test2().greet()); // A
  Test2().hello();        // A

  print(Test3().greet()); // C
}`}
          expectedOutput={`B からこんにちは
Mixin B
A からこんにちは
Mixin A
C からこんにちは`}
        />
      </section>

      <LessonCompleteButton lessonId="mixins" categoryId="inheritance" />
      <LessonNav lessons={lessons} currentId="mixins" basePath="/learn/inheritance" />
    </div>
  );
}
