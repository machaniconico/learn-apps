import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function RegexFundamentalsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-yellow-400 text-sm font-semibold">正規表現 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">正規表現の基礎</h1>
        <p className="text-gray-400">正規表現の基本的な構文とメタ文字を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">正規表現とは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          正規表現はテキストのパターンを記述するための表記法です。文字列の検索・抽出・置換・検証に使われます。
          Dartでは<code className="text-yellow-300">RegExp</code>クラスを使って正規表現を扱います。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-yellow-300">.</code> 任意の1文字</li>
          <li>• <code className="text-yellow-300">*</code> 0回以上の繰り返し</li>
          <li>• <code className="text-yellow-300">+</code> 1回以上の繰り返し</li>
          <li>• <code className="text-yellow-300">?</code> 0回または1回</li>
          <li>• <code className="text-yellow-300">[abc]</code> a・b・cのいずれか</li>
          <li>• <code className="text-yellow-300">\d</code> 数字、<code className="text-yellow-300">\w</code> 単語文字、<code className="text-yellow-300">\s</code> 空白</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なメタ文字</h2>
        <p className="text-gray-400 mb-4">
          よく使う正規表現のメタ文字と使用例です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // \\d+ : 1文字以上の数字
  final digitReg = RegExp(r'\\d+');
  print(digitReg.hasMatch('abc123'));  // true
  print(digitReg.hasMatch('abcdef')); // false

  // \\w+ : 単語文字（英数字+アンダーバー）
  final wordReg = RegExp(r'^\\w+\$');
  print(wordReg.hasMatch('hello_123')); // true
  print(wordReg.hasMatch('hello world')); // false

  // [aeiou] : 母音
  final vowelReg = RegExp(r'[aeiou]');
  final text = 'Hello World';
  final vowels = vowelReg.allMatches(text).map((m) => m.group(0)).toList();
  print('母音: \$vowels');

  // ^ と \$ : 先頭と末尾
  final startEnd = RegExp(r'^Hello.*World\$');
  print(startEnd.hasMatch('Hello Beautiful World')); // true
  print(startEnd.hasMatch('World Hello'));            // false
}`}
          expectedOutput={`true\nfalse\ntrue\nfalse\n母音: [e, o, o]\ntrue\nfalse`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">量指定子と文字クラス</h2>
        <p className="text-gray-400 mb-4">
          繰り返し回数を指定する量指定子と文字クラスの使い方です。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // {n} : ちょうどn回
  final zipCode = RegExp(r'^\\d{3}-\\d{4}\$');
  print('郵便番号 123-4567: \${zipCode.hasMatch("123-4567")}');
  print('郵便番号 12-456: \${zipCode.hasMatch("12-456")}');

  // {n,m} : n回以上m回以下
  final password = RegExp(r'^[a-zA-Z0-9]{8,20}\$');
  print('パスワード "abcd1234": \${password.hasMatch("abcd1234")}');
  print('パスワード "abc": \${password.hasMatch("abc")}');

  // | : OR
  final yesNo = RegExp(r'^(yes|no|はい|いいえ)\$', caseSensitive: false);
  ['yes', 'No', 'はい', 'maybe'].forEach((s) {
    print('\$s: \${yesNo.hasMatch(s) ? "有効" : "無効"}');
  });
}`}
          expectedOutput={`郵便番号 123-4567: true\n郵便番号 12-456: false\nパスワード "abcd1234": true\nパスワード "abc": false\nyes: 有効\nNo: 有効\nはい: 有効\nmaybe: 無効`}
        />
      </section>
      <LessonCompleteButton lessonId="regex-fundamentals" categoryId="regex" />
      <LessonNav lessons={lessons} currentId="regex-fundamentals" basePath="/learn/regex" />
    </div>
  );
}
