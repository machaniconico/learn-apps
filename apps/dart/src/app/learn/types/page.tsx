import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("types");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartで実行時に型を確認する演算子は何ですか？",
    options: ["typeof", "instanceof", "is", "checkType"],
    answer: 2,
    explanation: "is演算子を使って実行時に型を確認します。is!は型が一致しない場合にtrueを返します。",
  },
  {
    question: "Dartで明示的な型キャストに使う演算子は何ですか？",
    options: ["cast", "as", "to", "(Type)"],
    answer: 1,
    explanation: "as演算子を使って明示的に型キャストします。キャストに失敗するとTypeErrorが発生します。",
  },
  {
    question: "関数型や複雑な型に別名を付けるキーワードは何ですか？",
    options: ["alias", "type", "typedef", "define"],
    answer: 2,
    explanation: "typedefキーワードを使って型に別名を付けます。関数型やジェネリクス型を簡潔に表現できます。",
  },
  {
    question: "Dartのジェネリクスで型パラメータを表す一般的な文字は何ですか？",
    options: ["G", "Type", "T", "Any"],
    answer: 2,
    explanation: "Tが最も一般的な型パラメータ名です。複数ある場合はT, S, U, Kなどが使われます。",
  },
];

export default function TypesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-teal-400 mb-2">型システム</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">7レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartの強力な静的型システムを深く理解しましょう。ジェネリクス、typedef、is/as演算子による型チェックと型キャスト、Null Safety型、Dart 3で導入されたパターンマッチングまで幅広くカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="types" totalLessons={7} color="teal" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全7レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/types" color="teal" categoryId="types" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型宣言とジェネリクス</h2>
        <p className="text-gray-400 mb-4">
          Dartの静的型システムでは明示的な型宣言と<code className="text-teal-300">型推論</code>が組み合わさり、安全で読みやすいコードを書けます。
        </p>
        <DartEditor
          defaultCode={`// 型宣言の基本
int count = 0;
String name = 'Dart';
double pi = 3.14;
bool isActive = true;

// var による型推論
var message = 'Hello'; // String と推論
var number = 42;       // int と推論

// ジェネリクス
List<String> fruits = ['りんご', 'バナナ', 'みかん'];
Map<String, int> scores = {'Alice': 95, 'Bob': 87};

// ジェネリクス関数
T first<T>(List<T> list) => list.first;
T last<T>(List<T> list) => list.last;

void main() {
  print('型: \${count.runtimeType}');
  print('型: \${name.runtimeType}');

  print('fruits: \$fruits');
  print('最初: \${first(fruits)}');
  print('最後: \${last(scores.values.toList())}');

  // dynamic型
  dynamic anything = 42;
  print('dynamic: \$anything');
  anything = 'now a string';
  print('dynamic: \$anything');
}`}
          expectedOutput={`型: int
型: String
fruits: [りんご, バナナ, みかん]
最初: りんご
最後: 87
dynamic: 42
dynamic: now a string`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型チェックと型キャスト</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">is</code>演算子で型を確認し、<code className="text-teal-300">as</code>演算子で明示的にキャストできます。
        </p>
        <DartEditor
          defaultCode={`void printType(Object obj) {
  if (obj is int) {
    print('整数: \${obj * 2}');
  } else if (obj is String) {
    print('文字列: \${obj.toUpperCase()}');
  } else if (obj is List) {
    print('リスト: 長さ\${obj.length}');
  } else {
    print('その他: \$obj');
  }
}

void main() {
  printType(42);
  printType('hello');
  printType([1, 2, 3]);
  printType(3.14);

  // as によるキャスト
  Object value = 'Dart言語';
  String str = value as String;
  print('キャスト後: \${str.length}文字');

  // is! で否定
  print(42 is! String);   // true
  print('abc' is! int);   // true
}`}
          expectedOutput={`整数: 84
文字列: HELLO
リスト: 長さ3
その他: 3.14
キャスト後: 5文字
true
true`}
        />
      </section>
      <Quiz questions={quizQuestions} color="teal" />
    </div>
  );
}
