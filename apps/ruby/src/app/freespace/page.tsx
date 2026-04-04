import { RubyEditor } from "@/components/ruby-editor";

const DEFAULT_CODE = `# Ruby FizzBuzz & コレクション操作
# FizzBuzz
puts "=== FizzBuzz (1-20) ==="
(1..20).each do |i|
  if i % 15 == 0
    print "FizzBuzz "
  elsif i % 3 == 0
    print "Fizz "
  elsif i % 5 == 0
    print "Buzz "
  else
    print "#{i} "
  end
end
puts

# 配列操作
puts "\\n=== 配列操作 ==="
numbers = (1..10).to_a
evens = numbers.select { |n| n.even? }
puts "偶数とその二乗:"
evens.each { |n| puts "  #{n} -> #{n ** 2}" }

# ハッシュ操作
puts "\\n=== ハッシュ操作 ==="
scores = { "太郎" => 85, "花子" => 92, "次郎" => 78 }
top = scores.max_by { |_, v| v }
puts "最高得点: #{top[0]} (#{top[1]}点)"
avg = scores.values.sum.to_f / scores.size
puts "平均点: #{avg.round(1)}"

# 文字列操作
puts "\\n=== 文字列操作 ==="
words = ["Ruby", "is", "elegant", "and", "powerful"]
puts words.sort.join(" ")
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">Rubyフリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Rubyコードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <RubyEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数宣言、制御構文、メソッド定義、クラスなどRubyの基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">コレクション操作</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              配列、ハッシュ、Enumerableメソッド（map、select、reduceなど）Rubyならではの機能をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ファイルシステムへのアクセスやネットワーク通信はブラウザのセキュリティ制限により一部制限があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
