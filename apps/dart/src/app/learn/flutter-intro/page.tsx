import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

const quizQuestions: QuizQuestion[] = [
  {
    question: "FlutterのUIの基本構成単位は何ですか？",
    options: [
      "コンポーネント",
      "ウィジェット（Widget）",
      "ビュー（View）",
      "エレメント（Element）",
    ],
    answer: 1,
    explanation: "FlutterではすべてのUI要素がウィジェットです。ボタン・テキスト・レイアウト・アニメーションもすべてウィジェットです。",
  },
  {
    question: "StatelessWidgetとStatefulWidgetの違いは何ですか？",
    options: [
      "StatelessWidgetは速く、StatefulWidgetは遅い",
      "StatelessWidgetは状態を持たず、StatefulWidgetは状態を持ちUI更新できる",
      "StatelessWidgetはAndroid専用、StatefulWidgetはiOS専用",
      "違いはない",
    ],
    answer: 1,
    explanation: "StatelessWidgetは不変のUIを表示し、StatefulWidgetはStateオブジェクトで状態を管理してsetState()でUI更新できます。",
  },
  {
    question: "Flutterのホットリロードの説明として正しいものはどれですか？",
    options: [
      "アプリを完全に再起動する",
      "コードの変更を保持しながら素早くUIに反映する",
      "データベースを初期化する",
      "依存パッケージを再インストールする",
    ],
    answer: 1,
    explanation: "ホットリロードはアプリの状態を保持しながらコードの変更をミリ秒単位でUIに反映する機能です。",
  },
  {
    question: "Flutterが単一のコードベースで対応できるプラットフォームはどれですか？",
    options: [
      "iOSとAndroidのみ",
      "iOS・Android・Web・Desktop（Windows・macOS・Linux）",
      "WebとDesktopのみ",
      "Androidのみ",
    ],
    answer: 1,
    explanation: "Flutterは単一のDartコードからiOS・Android・Web・Windows・macOS・Linuxの6プラットフォームに対応しています。",
  },
];

export default function FlutterIntroPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">Flutter入門</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          DartとFlutterの関係を学びましょう。FlutterはDartで書かれたクロスプラットフォームUIフレームワークです。ウィジェットの概念・StatelessWidget・StatefulWidget・レイアウト・マテリアルデザインの基礎を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="flutter-intro" totalLessons={6} color="blue" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/flutter-intro" color="blue" categoryId="flutter-intro" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Flutterウィジェットツリーの概念</h2>
        <p className="text-gray-400 mb-4">
          Flutterアプリはウィジェットのツリー構造で構成されます。<code className="text-teal-300">StatelessWidget</code>の基本構造を確認しましょう。
        </p>
        <DartEditor
          defaultCode={`// Flutter環境が必要なコードの概念例
// 以下はDartの純粋なクラス構造で概念を示します

abstract class Widget {
  String build();
}

class Text extends Widget {
  final String text;
  Text(this.text);

  @override
  String build() => 'Text("\$text")';
}

class Column extends Widget {
  final List<Widget> children;
  Column({required this.children});

  @override
  String build() {
    final content = children.map((w) => '  \${w.build()}').join('\\n');
    return 'Column(\\n\$content\\n)';
  }
}

class MyApp extends Widget {
  @override
  String build() {
    return Column(children: [
      Text('Hello, Flutter!'),
      Text('Dartで作るクロスプラットフォームアプリ'),
      Text('iOS・Android・Web対応'),
    ]).build();
  }
}

void main() {
  print(MyApp().build());
}`}
          expectedOutput={`Column(\n  Text("Hello, Flutter!")\n  Text("Dartで作るクロスプラットフォームアプリ")\n  Text("iOS・Android・Web対応")\n)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">StatelessWidgetの構造</h2>
        <p className="text-gray-400 mb-4">
          実際の<code className="text-teal-300">StatelessWidget</code>のDartコード構造です（Flutter環境で動作します）。
        </p>
        <DartEditor
          defaultCode={`// Flutter StatelessWidgetの実際の構造（概念コード）
// import 'package:flutter/material.dart';

// class GreetingCard extends StatelessWidget {
//   final String name;
//   final int age;
//   const GreetingCard({super.key, required this.name, required this.age});
//
//   @override
//   Widget build(BuildContext context) {
//     return Card(
//       child: Padding(
//         padding: const EdgeInsets.all(16),
//         child: Column(
//           children: [
//             Text('こんにちは、\$nameさん！',
//               style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
//             Text('\$age歳',
//               style: const TextStyle(color: Colors.grey)),
//           ],
//         ),
//       ),
//     );
//   }
// }

// Dartで概念を表現
class GreetingCard {
  final String name;
  final int age;
  const GreetingCard({required this.name, required this.age});

  String describe() {
    return 'GreetingCard: こんにちは\${name}さん！(\${age}歳)';
  }
}

void main() {
  final card1 = GreetingCard(name: '田中', age: 25);
  final card2 = GreetingCard(name: '鈴木', age: 32);
  print(card1.describe());
  print(card2.describe());
  print('StatelessWidget: 状態なし、常に同じ入力→同じUI');
}`}
          expectedOutput={`GreetingCard: こんにちは田中さん！(25歳)\nGreetingCard: こんにちは鈴木さん！(32歳)\nStatelessWidget: 状態なし、常に同じ入力→同じUI`}
        />
      </section>
      <Quiz questions={quizQuestions} color="blue" />
    </div>
  );
}
