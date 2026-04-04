import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartでクラスを継承するキーワードは何ですか？",
    options: ["implements", "extends", "with", "super"],
    answer: 1,
    explanation: "extendsキーワードを使って親クラスを継承します。Dartは単一継承のみサポートしています。",
  },
  {
    question: "親クラスのコンストラクタを呼び出すキーワードは何ですか？",
    options: ["base()", "parent()", "super()", "this()"],
    answer: 2,
    explanation: "super()を使って親クラスのコンストラクタを呼び出します。子クラスのコンストラクタ初期化リストに記述します。",
  },
  {
    question: "Dartでインターフェースを実装するキーワードは何ですか？",
    options: ["extends", "with", "implements", "interface"],
    answer: 2,
    explanation: "implementsキーワードを使ってインターフェースを実装します。Dartでは全てのクラスが暗黙的にインターフェースとして機能します。",
  },
  {
    question: "Mixinを適用するキーワードは何ですか？",
    options: ["extends", "implements", "include", "with"],
    answer: 3,
    explanation: "withキーワードを使ってMixinをクラスに適用します。複数のMixinをカンマ区切りで適用できます。",
  },
];

export default function InheritancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">継承・Mixin</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartのオブジェクト指向プログラミングの核心である継承・インターフェース・Mixinを学びましょう。extendsによるクラス継承、abstractクラス、implementsによるインターフェース実装、withキーワードを使ったMixinで柔軟な設計を実現します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="inheritance" totalLessons={7} color="red" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/inheritance" color="red" categoryId="inheritance" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">継承の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">extends</code>キーワードで親クラスを継承し、<code className="text-red-300">super</code>で親クラスのメンバーにアクセスします。
        </p>
        <DartEditor
          defaultCode={`class Animal {
  String name;
  int age;

  Animal(this.name, this.age);

  void speak() {
    print('\$name が鳴いています');
  }

  String get info => '\$name (\$age歳)';
}

class Dog extends Animal {
  String breed;

  Dog(String name, int age, this.breed) : super(name, age);

  @override
  void speak() {
    print('\$name: ワン！');
  }

  void fetch() {
    print('\$name がボールを取ってきました');
  }
}

class Cat extends Animal {
  Cat(String name, int age) : super(name, age);

  @override
  void speak() {
    print('\$name: ニャー');
  }
}

void main() {
  final dog = Dog('ポチ', 3, '柴犬');
  final cat = Cat('タマ', 5);

  print(dog.info);
  dog.speak();
  dog.fetch();

  print(cat.info);
  cat.speak();
}`}
          expectedOutput={`ポチ (3歳)
ポチ: ワン！
ポチ がボールを取ってきました
タマ (5歳)
タマ: ニャー`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Mixin による機能合成</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-red-300">mixin</code>と<code className="text-red-300">with</code>を使って、複数の機能を組み合わせてクラスを構成できます。
        </p>
        <DartEditor
          defaultCode={`mixin Swimmer {
  void swim() => print('\$runtimeType が泳いでいます');
}

mixin Flyer {
  void fly() => print('\$runtimeType が飛んでいます');
}

mixin Runner {
  void run() => print('\$runtimeType が走っています');
}

class Bird with Flyer, Runner {
  String name;
  Bird(this.name);
}

class Duck with Swimmer, Flyer, Runner {
  String name;
  Duck(this.name);
}

class Fish with Swimmer {
  String name;
  Fish(this.name);
}

void main() {
  final bird = Bird('スズメ');
  bird.fly();
  bird.run();

  print('---');

  final duck = Duck('アヒル');
  duck.swim();
  duck.fly();
  duck.run();
}`}
          expectedOutput={`Bird が飛んでいます
Bird が走っています
---
Duck が泳いでいます
Duck が飛んでいます
Duck が走っています`}
        />
      </section>
      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
