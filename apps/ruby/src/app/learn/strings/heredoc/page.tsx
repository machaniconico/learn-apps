import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "strings")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">文字列操作 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ヒアドキュメント</h1>
        <p className="text-gray-400">複数行文字列をきれいに書くヒアドキュメント構文を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ヒアドキュメントとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ヒアドキュメントは複数行の文字列を可読性高く書くための構文です。{"<<~HEREDOC"} を使うとインデントを自動で除去できます。SQLやHTMLなど長い文字列に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-purple-400">{"<<HEREDOC"}</code>: 基本形（インデント保持）</li>
          <li><code className="text-purple-400">{"<<~HEREDOC"}</code>: インデント除去（Ruby 2.3+）</li>
          <li><code className="text-purple-400">{"<<-HEREDOC"}</code>: 終端のインデントを許可</li>
          <li>式展開は通常通り使える</li>
          <li>シングルクォートで式展開を無効化: <code className="text-purple-400">{"<<~'HEREDOC'"}</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ヒアドキュメントの基本</h2>
        <RubyEditor
          defaultCode={`name = "Alice"
age = 30

# <<~HEREDOC でインデント自動除去
message = <<~HEREDOC
  Dear #{name},

  Welcome to Ruby Learning!
  Your age is #{age}.

  Best regards,
  The Team
HEREDOC

puts message`}
          expectedOutput={`Dear Alice,

Welcome to Ruby Learning!
Your age is 30.

Best regards,
The Team
`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ヒアドキュメントの活用</h2>
        <RubyEditor
          defaultCode={`# SQLクエリなどの長い文字列
table = "users"
sql = <<~SQL
  SELECT id, name, email
  FROM #{table}
  WHERE active = true
  ORDER BY name ASC
SQL
puts sql

# 式展開なし（シングルクォート）
raw = <<~'TEXT'
  No #{interpolation} here
  Just literal text
TEXT
puts raw`}
          expectedOutput={`SELECT id, name, email
FROM users
WHERE active = true
ORDER BY name ASC

No #{interpolation} here
Just literal text
`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="strings" lessonId="heredoc" />
      </div>
      <LessonNav lessons={lessons} currentId="heredoc" basePath="/learn/strings" />
    </div>
  );
}
