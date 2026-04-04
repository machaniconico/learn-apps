import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("control");

export default function SwitchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">制御構文 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">switch文</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-green-300">switch</strong>文は値による多分岐処理に使います。
            各<strong className="text-green-300">case</strong>で値を比較し、一致したブロックを実行します。
            Dartのswitch文はfall-throughが起きないため、各caseに<code>break</code>が不要です（空のcaseを除く）。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch文の基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">switch</code>文では整数、文字列、enum値などを比較できます。<code className="text-green-300">default</code>はどのcaseにも一致しない場合に実行されます。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 文字列のswitch
  String day = 'Wednesday';
  switch (day) {
    case 'Monday':
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
    case 'Friday':
      print('\$dayは平日です');
      break;
    case 'Saturday':
    case 'Sunday':
      print('\$dayは週末です');
      break;
    default:
      print('無効な曜日: \$day');
  }

  // 整数のswitch
  int month = 3;
  switch (month) {
    case 3:
    case 4:
    case 5:
      print('\$month月は春');
      break;
    case 6:
    case 7:
    case 8:
      print('\$month月は夏');
      break;
    default:
      print('\$month月は秋か冬');
  }
}`}
          expectedOutput={`Wednesdayは平日です
3月は春`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">enum と switch</h2>
        <p className="text-gray-400 mb-4">
          enumとswitch文を組み合わせると、全てのケースを網羅しているかコンパイラがチェックしてくれます。
        </p>
        <DartEditor
          defaultCode={`enum Direction { north, south, east, west }

String describeDirection(Direction dir) {
  switch (dir) {
    case Direction.north:
      return '北に進みます';
    case Direction.south:
      return '南に進みます';
    case Direction.east:
      return '東に進みます';
    case Direction.west:
      return '西に進みます';
  }
}

void main() {
  for (var dir in Direction.values) {
    print(describeDirection(dir));
  }
}`}
          expectedOutput={`北に進みます
南に進みます
東に進みます
西に進みます`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">switch文でのローカル変数</h2>
        <p className="text-gray-400 mb-4">
          各caseブロック内でローカル変数を使う場合は、ブロックを波括弧で囲みます。
        </p>
        <DartEditor
          defaultCode={`void processCommand(String command) {
  switch (command.toLowerCase()) {
    case 'help':
      {
        String message = '使用可能なコマンド: help, version, quit';
        print(message);
        break;
      }
    case 'version':
      {
        String version = '1.0.0';
        print('バージョン: \$version');
        break;
      }
    case 'quit':
      print('終了します');
      break;
    default:
      print('不明なコマンド: \$command');
  }
}

void main() {
  List<String> commands = ['help', 'VERSION', 'quit', 'unknown'];
  for (String cmd in commands) {
    processCommand(cmd);
  }
}`}
          expectedOutput={`使用可能なコマンド: help, version, quit
バージョン: 1.0.0
終了します
不明なコマンド: unknown`}
        />
      </section>

      <LessonCompleteButton lessonId="switch" categoryId="control" />
      <LessonNav lessons={lessons} currentId="switch" basePath="/learn/control" />
    </div>
  );
}
