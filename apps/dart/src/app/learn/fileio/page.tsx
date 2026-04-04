import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Dartでファイル操作を行うためのライブラリはどれですか？",
    options: ["dart:file", "dart:io", "dart:fs", "dart:os"],
    answer: 1,
    explanation: "dart:ioライブラリにFile、Directory、HttpClientなどのI/O操作クラスが含まれています。",
  },
  {
    question: "ファイルの内容を文字列として非同期に読み込むメソッドは？",
    options: ["file.read()", "file.readAsString()", "file.getText()", "file.load()"],
    answer: 1,
    explanation: "readAsString()はファイルの内容全体を文字列としてFutureで返します。大きなファイルにはopenRead()でストリームを使います。",
  },
  {
    question: "dart:convertでJSONをDartオブジェクトに変換するメソッドは？",
    options: ["JSON.decode()", "jsonDecode()", "JSON.parse()", "fromJSON()"],
    answer: 1,
    explanation: "jsonDecode()関数はJSON文字列をMap/Listに変換します。jsonEncode()はその逆でDartオブジェクトをJSON文字列に変換します。",
  },
  {
    question: "ファイルに内容を追記（上書きでなく）するメソッドは？",
    options: ["file.append()", "file.writeAsString()にmode指定", "file.addContent()", "file.push()"],
    answer: 1,
    explanation: "writeAsString()のmodeパラメータにFileMode.appendを指定すると追記になります。デフォルトはFileMode.writeで上書きです。",
  },
];

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-green-400 mb-2">ファイル・IO</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Dartのファイル操作、JSON処理、HTTP通信など実践的なI/O処理を学びましょう。dart:ioとdart:convertを使ってデータの読み書き、ネットワーク通信、プロセス実行まで幅広く習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="green" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="green" categoryId="fileio" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイルの読み書き</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">dart:io</code>の<code className="text-green-300">File</code>クラスを使ってファイルを非同期に読み書きします。
        </p>
        <DartEditor
          defaultCode={`import 'dart:io';

Future<void> main() async {
  final file = File('sample.txt');

  // ファイル書き込み
  await file.writeAsString('Dartでファイル操作\\n');
  await file.writeAsString('2行目のデータ\\n', mode: FileMode.append);
  await file.writeAsString('3行目のデータ\\n', mode: FileMode.append);

  // ファイル読み込み
  final content = await file.readAsString();
  print('--- ファイル内容 ---');
  print(content);

  // 行ごとに読み込み
  final lines = await file.readAsLines();
  print('行数: \${lines.length}');

  // ファイル削除
  await file.delete();
  print('ファイルを削除しました');
}`}
          expectedOutput={`--- ファイル内容 ---
Dartでファイル操作
2行目のデータ
3行目のデータ

行数: 3
ファイルを削除しました`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">JSON処理</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">dart:convert</code>の<code className="text-green-300">jsonDecode</code>・<code className="text-green-300">jsonEncode</code>でJSONを簡単に処理できます。
        </p>
        <DartEditor
          defaultCode={`import 'dart:convert';

void main() {
  // DartオブジェクトをJSONに変換
  final user = {
    'id': 1,
    'name': '田中太郎',
    'email': 'tanaka@example.com',
    'tags': ['Dart', 'Flutter'],
  };

  final jsonStr = jsonEncode(user);
  print('JSON文字列:');
  print(jsonStr);

  // JSONをDartオブジェクトに変換
  final decoded = jsonDecode(jsonStr) as Map<String, dynamic>;
  print('\\n名前: \${decoded['name']}');
  print('タグ: \${(decoded['tags'] as List).join(', ')}');

  // JSONの配列
  final jsonArray = '[{"id":1,"val":"A"},{"id":2,"val":"B"}]';
  final list = jsonDecode(jsonArray) as List;
  for (final item in list) {
    print('id=\${item['id']}, val=\${item['val']}');
  }
}`}
          expectedOutput={`JSON文字列:
{"id":1,"name":"田中太郎","email":"tanaka@example.com","tags":["Dart","Flutter"]}

名前: 田中太郎
タグ: Dart, Flutter
id=1, val=A
id=2, val=B`}
        />
      </section>
      <Quiz questions={quizQuestions} color="green" />
    </div>
  );
}
