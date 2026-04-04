import { PythonPlayground } from "@/components/python-playground";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

const quizQuestions: QuizQuestion[] = [
  {
    question: "re.match() と re.search() の違いはどれですか？",
    options: [
      "match() は文字列の先頭、search() は文字列全体を検索する",
      "match() は全体一致、search() は部分一致",
      "match() は大文字小文字を区別しない",
      "違いはなく同じ動作をする",
    ],
    answer: 0,
    explanation: "re.match() は文字列の先頭からのみマッチを試みます。re.search() は文字列内の任意の位置でマッチを探します。",
  },
  {
    question: "正規表現 r'\\d+' はどのような文字列にマッチしますか？",
    options: [
      "1文字以上の数字",
      "1文字以上の英字",
      "任意の1文字",
      "スペースを含む文字列",
    ],
    answer: 0,
    explanation: "\\d は数字（0-9）にマッチします。+ は1文字以上を意味するので、\\d+ は1文字以上の連続した数字にマッチします。",
  },
  {
    question: "re.findall(r'[a-z]+', 'Hello World') の結果はどれですか？",
    options: [
      "['ello', 'orld']",
      "['Hello', 'World']",
      "['h', 'e', 'l', 'l', 'o']",
      "['Hello World']",
    ],
    answer: 0,
    explanation: "[a-z] は小文字のみにマッチします。'Hello' の 'H' と 'World' の 'W' は大文字なので除外され、'ello' と 'orld' が返されます。",
  },
  {
    question: "文字列を置換する関数はどれですか？",
    options: ["re.sub()", "re.replace()", "re.swap()", "re.change()"],
    answer: 0,
    explanation: "re.sub(pattern, repl, string) でパターンにマッチした部分を repl で置換します。マッチ数を制限するには count 引数を使います。",
  },
];

export default function RegexPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">正規表現</h1>
        <div className="mb-3">
          <DifficultyBadge difficulty="intermediate" />
        </div>
        <p className="text-gray-400">
          正規表現はテキストの検索・抽出・置換を強力に行うための仕組みです。
          メールアドレスの検証、ログ解析、テキスト処理など様々な場面で活躍します。
          Pythonの <code className="text-red-400 bg-gray-800 px-1.5 py-0.5 rounded">re</code> モジュールをマスターしましょう。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="regex" totalLessons={5} color="red" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全5レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/regex" color="red" categoryId="regex" />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">よく使うメタ文字一覧</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            { pattern: ".", desc: "任意の1文字（改行以外）" },
            { pattern: "\\d", desc: "数字（0-9）" },
            { pattern: "\\w", desc: "英数字とアンダースコア" },
            { pattern: "\\s", desc: "空白文字（スペース、タブ、改行）" },
            { pattern: "*", desc: "直前の要素が0回以上" },
            { pattern: "+", desc: "直前の要素が1回以上" },
            { pattern: "?", desc: "直前の要素が0回または1回" },
            { pattern: "^", desc: "文字列の先頭" },
            { pattern: "$", desc: "文字列の末尾" },
            { pattern: "[abc]", desc: "a・b・c のどれか1文字" },
            { pattern: "(abc)", desc: "グループ化・キャプチャ" },
            { pattern: "a|b", desc: "a または b" },
          ].map((item) => (
            <div key={item.pattern} className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <code className="text-red-400 bg-gray-900 px-2 py-1 rounded font-mono text-sm shrink-0 min-w-[80px] text-center">
                {item.pattern}
              </code>
              <span className="text-gray-300 text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">正規表現を実際に試してみよう</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">基本的なパターンマッチング</h3>
          <PythonPlayground
            defaultCode={`import re

text = "田中太郎（28歳）の電話番号は090-1234-5678です。メール: tanaka@example.com"

# 数字を検索
numbers = re.findall(r'\\d+', text)
print(f"数字: {numbers}")

# 電話番号を検索
phone = re.search(r'\\d{3}-\\d{4}-\\d{4}', text)
if phone:
    print(f"電話番号: {phone.group()}")

# メールアドレスを検索
email = re.search(r'[\\w.]+@[\\w.]+', text)
if email:
    print(f"メール: {email.group()}")

# 複数マッチ
words = re.findall(r'[ぁ-んァ-ン一-龥]+', text)
print(f"日本語ワード: {words}")
`}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">置換とグループキャプチャ</h3>
          <PythonPlayground
            defaultCode={`import re

# 日付形式の変換（YYYY-MM-DD → YYYY年MM月DD日）
date_str = "今日は2024-03-15です。締め切りは2024-04-30。"
converted = re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\1年\\2月\\3日', date_str)
print(f"変換前: {date_str}")
print(f"変換後: {converted}")

print()

# 電話番号のマスク処理
log = "ユーザー: 090-1234-5678、緊急連絡: 080-9876-5432"
masked = re.sub(r'\\d{3}-\\d{4}-(\\d{4})', r'***-****-\\1', log)
print(f"マスク前: {log}")
print(f"マスク後: {masked}")

print()

# 文字列の分割
data = "りんご  バナナ\\t\\tみかん   ぶどう"
fruits = re.split(r'\\s+', data.strip())
print(f"分割結果: {fruits}")
`}
          />
        </div>
      </section>

      <Quiz questions={quizQuestions} color="red" />
    </div>
  );
}
