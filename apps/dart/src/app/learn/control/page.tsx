import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartのswitch式（Dart 3以降）で各ケースを区切る記号はどれですか？",
    options: [":", "=>", ",", ";"],
    answer: 2,
    explanation: "Dart 3のswitch式では、各ケースをカンマ（,）で区切ります。従来のswitch文のコロン（:）とは異なります。",
  },
  {
    question: "for-inループで使うキーワードの組み合わせはどれですか？",
    options: ["for...of", "foreach...in", "for...in", "loop...in"],
    answer: 2,
    explanation: "Dartではfor (var item in collection)という構文でコレクションを反復処理します。",
  },
  {
    question: "ループを途中で終了するキーワードはどれですか？",
    options: ["stop", "exit", "return", "break"],
    answer: 3,
    explanation: "breakキーワードはループを即座に終了します。continueは現在の反復をスキップして次へ進みます。",
  },
  {
    question: "三項演算子の正しい構文はどれですか？",
    options: ["条件 ? 真の値 : 偽の値", "条件 :: 真の値 | 偽の値", "条件 if 真の値 else 偽の値", "if(条件) 真の値 else 偽の値"],
    answer: 0,
    explanation: "三項演算子は「条件 ? 真の場合の値 : 偽の場合の値」という構文です。シンプルな条件分岐を一行で書けます。",
  },
];

export default function ControlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">制御構文</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="beginner" />
          <span className="text-gray-500 text-sm">10レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartの制御構文を学びましょう。if-else、switch、forループ、whileループなど、プログラムの流れを制御する構文をマスターします。Dart 3で強化されたswitch式など最新の構文も含みます。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="control" totalLessons={10} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全10レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/control" color="green" categoryId="control" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">条件分岐とループの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">if-else</code>文で条件分岐、<code className="text-green-300">for</code>ループで繰り返し処理を行います。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // if-else の基本
  int score = 75;
  if (score >= 90) {
    print('優秀');
  } else if (score >= 70) {
    print('良好');
  } else {
    print('要努力');
  }

  // forループ
  int sum = 0;
  for (int i = 1; i <= 5; i++) {
    sum += i;
  }
  print('1〜5の合計: \$sum');

  // for-in ループ
  List<String> fruits = ['りんご', 'バナナ', 'みかん'];
  for (var fruit in fruits) {
    print('- \$fruit');
  }
}`}
          expectedOutput={`良好
1〜5の合計: 15
- りんご
- バナナ
- みかん`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">switch式（Dart 3）</h2>
        <p className="text-gray-400 mb-4">
          Dart 3で導入された<code className="text-green-300">switch式</code>はより簡潔で表現力豊かな条件分岐を実現します。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // switch式（Dart 3）
  for (int day = 1; day <= 7; day++) {
    String dayName = switch (day) {
      1 => '月曜日',
      2 => '火曜日',
      3 => '水曜日',
      4 => '木曜日',
      5 => '金曜日',
      6 => '土曜日',
      7 => '日曜日',
      _ => '不明',
    };
    bool isWeekend = day >= 6;
    print('\$dayName \${isWeekend ? "(休日)" : ""}');
  }
}`}
          expectedOutput={`月曜日
火曜日
水曜日
木曜日
金曜日
土曜日 (休日)
日曜日 (休日)`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
