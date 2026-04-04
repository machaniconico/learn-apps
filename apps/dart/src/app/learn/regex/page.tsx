import { DartEditor } from "@/components/dart-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

const quizQuestions: QuizQuestion[] = [
  {
    question: "DartでRegExpオブジェクトを作成する正しい方法はどれですか？",
    options: [
      "new Regex('pattern')",
      "RegExp('pattern')",
      "/pattern/",
      "Pattern('pattern')",
    ],
    answer: 1,
    explanation: "DartではRegExp('pattern')でコンストラクタを呼び出して正規表現オブジェクトを作成します。",
  },
  {
    question: "文字列が正規表現にマッチするか確認するメソッドはどれですか？",
    options: [
      "match()",
      "test()",
      "hasMatch()",
      "contains()",
    ],
    answer: 2,
    explanation: "RegExpのhasMatch()メソッドは文字列が正規表現にマッチするかどうかをboolで返します。",
  },
  {
    question: "正規表現で\\dが表すものは何ですか？",
    options: [
      "任意の文字",
      "数字（0-9）",
      "空白文字",
      "単語の境界",
    ],
    answer: 1,
    explanation: "\\dは数字（0-9）にマッチするメタ文字です。[0-9]と同等です。",
  },
  {
    question: "replaceAllMapped()の特徴は何ですか？",
    options: [
      "最初のマッチのみ置換する",
      "マッチした部分を関数の戻り値で置換できる",
      "大文字小文字を無視して置換する",
      "正規表現を使わずに置換する",
    ],
    answer: 1,
    explanation: "replaceAllMapped()はマッチした各部分をコールバック関数の戻り値で置換でき、動的な置換が可能です。",
  },
];

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-2">正規表現</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">5レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          DartのRegExpクラスを使った正規表現を学びましょう。パターンマッチング・文字列検索・置換など、テキスト処理の強力な手段である正規表現を習得します。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="regex" totalLessons={5} color="yellow" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/regex" color="yellow" categoryId="regex" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">RegExpの基本</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">RegExp</code>クラスを使った基本的なパターンマッチングです。
        </p>
        <DartEditor
          defaultCode={`void main() {
  final emailRegex = RegExp(r'^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}\$');
  final emails = [
    'user@example.com',
    'invalid-email',
    'test.user@domain.co.jp',
  ];

  for (final email in emails) {
    final valid = emailRegex.hasMatch(email);
    print('\$email: \${valid ? "有効" : "無効"}');
  }

  // グループキャプチャ
  final dateRegex = RegExp(r'(\\d{4})-(\\d{2})-(\\d{2})');
  final match = dateRegex.firstMatch('今日は2024-03-15です');
  if (match != null) {
    print('年: \${match.group(1)}, 月: \${match.group(2)}, 日: \${match.group(3)}');
  }
}`}
          expectedOutput={`user@example.com: 有効\ninvalid-email: 無効\ntest.user@domain.co.jp: 有効\n年: 2024, 月: 03, 日: 15`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パターンマッチングと置換</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">allMatches</code>と<code className="text-teal-300">replaceAllMapped</code>を使った高度なテキスト処理です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  const text = '価格は1500円、税込1650円です。割引後は1200円になります。';

  // 全マッチを検索
  final priceRegex = RegExp(r'\\d+円');
  final matches = priceRegex.allMatches(text);
  print('価格の数: \${matches.length}件');

  // マッチ部分を強調表示
  final highlighted = text.replaceAllMapped(
    RegExp(r'(\\d+)円'),
    (m) => '【\${m.group(1)}円】',
  );
  print(highlighted);
}`}
          expectedOutput={`価格の数: 3件\n価格は【1500円】、税込【1650円】です。割引後は【1200円】になります。`}
        />
      </section>
      <Quiz questions={quizQuestions} color="yellow" />
    </div>
  );
}
