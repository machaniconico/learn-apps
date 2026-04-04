import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const category = CATEGORIES.find((c) => c.id === "hashes")!;
const lessons = category.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">ハッシュ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ネストしたハッシュ</h1>
        <p className="text-gray-400">ハッシュの中にハッシュを持つ複雑なデータ構造を学びます。</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたデータ構造</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          JSONのような階層的なデータをRubyのハッシュで表現できます。dig メソッドを使うと安全に深くアクセスでき、キーが存在しない場合は nil を返します。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>アクセス: <code className="text-red-400">hash[:a][:b][:c]</code></li>
          <li>安全アクセス: <code className="text-red-400">hash.dig(:a, :b, :c)</code></li>
          <li>存在しないキー: <code className="text-red-400">hash.dig(:x, :y)</code> は nil を返す</li>
          <li>配列との混在: <code className="text-red-400">hash.dig(:users, 0, :name)</code></li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたハッシュへのアクセス</h2>
        <RubyEditor
          defaultCode={`config = {
  database: {
    host: "localhost",
    port: 5432,
    credentials: {
      username: "admin",
      password: "secret"
    }
  },
  cache: {
    ttl: 3600
  }
}

# 通常アクセス
puts config[:database][:host]

# dig で安全アクセス
puts config.dig(:database, :credentials, :username)

# 存在しないキーは nil
puts config.dig(:missing, :key).inspect`}
          expectedOutput={`localhost
admin
nil`}
        />
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-3">ネストしたデータの操作</h2>
        <RubyEditor
          defaultCode={`users = {
  alice: { age: 30, scores: [90, 85, 92] },
  bob:   { age: 25, scores: [78, 82, 88] },
  carol: { age: 35, scores: [95, 91, 97] }
}

# 各ユーザーの平均スコアを表示
users.each do |name, data|
  avg = data[:scores].sum / data[:scores].size
  puts "#{name}: 平均 #{avg}点"
end

# 30歳以上のユーザーを抽出
seniors = users.select { |_, d| d[:age] >= 30 }
puts seniors.keys.inspect`}
          expectedOutput={`alice: 平均 89点
bob: 平均 82点
carol: 平均 94点
[:alice, :carol]`}
        />
      </div>

      <div className="mb-8">
        <LessonCompleteButton categoryId="hashes" lessonId="nested" />
      </div>
      <LessonNav lessons={lessons} currentId="nested" basePath="/learn/hashes" />
    </div>
  );
}
