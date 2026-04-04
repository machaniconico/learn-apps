import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "ecosystem")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Rubyエコシステム レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CI/CD</h1>
        <p className="text-gray-400">GitHub ActionsでRubyのテスト自動化、マトリクステスト、キャッシュを設定する方法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CI/CDとは</h2>
        <p className="text-gray-300 mb-3">
          CI（継続的インテグレーション）とCD（継続的デプロイ）はコードの品質を自動的に保証する開発手法です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li><code className="bg-gray-800 px-1 rounded text-green-300">ruby/setup-ruby</code> — GitHub Actions公式アクション</li>
          <li>マトリクステスト — 複数Rubyバージョンで並行テスト</li>
          <li>Bundlerキャッシュで依存関係を高速インストール</li>
          <li>RuboCop・テスト・カバレッジを自動実行</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: GitHub Actionsワークフローの構造</h2>
        <RubyEditor
          defaultCode={`# GitHub Actionsのワークフロー設定をRubyで表現
workflow = {
  name: "Ruby CI",
  on: { push: { branches: ["main"] }, pull_request: { branches: ["main"] } },
  jobs: {
    test: {
      runs_on: "ubuntu-latest",
      strategy: {
        matrix: {
          ruby_version: ["3.1", "3.2", "3.3"]
        }
      },
      steps: [
        { uses: "actions/checkout@v4" },
        {
          uses: "ruby/setup-ruby@v1",
          with: { ruby_version: "$\{{ matrix.ruby-version }}", bundler_cache: true }
        },
        { name: "Run RuboCop", run: "bundle exec rubocop" },
        { name: "Run tests", run: "bundle exec rspec" },
        { name: "Upload coverage", uses: "codecov/codecov-action@v3" }
      ]
    }
  }
}

puts "ワークフロー: #{workflow[:name]}"
puts "トリガー: #{workflow[:on].keys.join(', ')}"
puts "\nテストマトリクス:"
workflow[:jobs][:test][:strategy][:matrix][:ruby_version].each do |v|
  puts "  Ruby #{v}"
end
puts "\nステップ数: #{workflow[:jobs][:test][:steps].length}"
workflow[:jobs][:test][:steps].each_with_index do |step, i|
  name = step[:name] || step[:uses]
  puts "  #{i + 1}. #{name}"
end`}
          expectedOutput={`ワークフロー: Ruby CI
トリガー: push, pull_request

テストマトリクス:
  Ruby 3.1
  Ruby 3.2
  Ruby 3.3

ステップ数: 5
  1. actions/checkout@v4
  2. ruby/setup-ruby@v1
  3. Run RuboCop
  4. Run tests
  5. Upload coverage`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: Rakeタスクとデプロイスクリプト</h2>
        <RubyEditor
          defaultCode={`# Rakeタスクの定義（Rakefileの概念）
# require 'rake'

tasks = {
  "test" => {
    desc: "全テストを実行",
    command: "bundle exec rspec spec/",
    deps: []
  },
  "rubocop" => {
    desc: "コードスタイルチェック",
    command: "bundle exec rubocop",
    deps: []
  },
  "coverage" => {
    desc: "カバレッジレポート生成",
    command: "COVERAGE=true bundle exec rspec",
    deps: ["test"]
  },
  "ci" => {
    desc: "CI全工程を実行",
    command: nil,
    deps: ["rubocop", "test", "coverage"]
  },
  "deploy" => {
    desc: "本番デプロイ",
    command: "git push heroku main",
    deps: ["ci"]
  }
}

puts "利用可能なRakeタスク:"
puts "-" * 50
tasks.each do |name, task|
  deps = task[:deps].empty? ? "" : " (依存: #{task[:deps].join(', ')})"
  puts "rake #{name.ljust(12)} # #{task[:desc]}#{deps}"
end

puts "\nrake ci の実行順序:"
def resolve_deps(tasks, name, visited = [], order = [])
  return if visited.include?(name)
  visited << name
  tasks[name][:deps].each { |dep| resolve_deps(tasks, dep, visited, order) }
  order << name
  order
end

order = resolve_deps(tasks, "deploy")
order.each_with_index { |t, i| puts "  #{i + 1}. rake #{t}" }`}
          expectedOutput={`利用可能なRakeタスク:
--------------------------------------------------
rake test         # 全テストを実行
rake rubocop      # コードスタイルチェック
rake coverage     # カバレッジレポート生成 (依存: test)
rake ci           # CI全工程を実行 (依存: rubocop, test, coverage)
rake deploy       # 本番デプロイ (依存: ci)

rake ci の実行順序:
  1. rake rubocop
  2. rake test
  3. rake coverage
  4. rake ci
  5. rake deploy`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="ci-cd" />
      </div>
      <LessonNav lessons={lessons} currentId="ci-cd" basePath="/learn/ecosystem" />
    </div>
  );
}
