import { CATEGORIES } from "@/lib/lessons-data";
import { RubyEditor } from "@/components/ruby-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";

const category = CATEGORIES.find((c) => c.id === "modules")!;
const lessonId = "mixins";

export default function MixinsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-cyan-400 text-sm font-medium mb-2">モジュール</p>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">ミックスイン</h1>
          <p className="text-gray-400">
            ミックスインはモジュールのメソッドをクラスに取り込む技術です。
            Ruby の単一継承の制限を補い、コードの再利用を実現します。
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">ミックスインの利点</h2>
          <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
            <li>複数のモジュールをインクルードして多重継承の代替ができる</li>
            <li>共通の振る舞いを複数のクラスで再利用できる</li>
            <li>継承の深いチェーンを避けて水平な構成にできる</li>
            <li>メソッド探索順序（MRO）は include した逆順</li>
          </ul>
        </div>

        <RubyEditor
          defaultCode={`module Serializable
  def to_json
    pairs = instance_variables.map do |var|
      key   = var.to_s.delete_prefix("@")
      value = instance_variable_get(var)
      "\"#{key}\": #{value.inspect}"
    end
    "{ #{pairs.join(', ')} }"
  end
end

module Validatable
  def valid?
    validate.empty?
  end

  def validate
    []  # サブクラスでオーバーライド
  end
end

module Loggable
  def log(msg)
    puts "[#{self.class}] #{msg}"
  end
end

class Article
  include Serializable
  include Validatable
  include Loggable

  attr_accessor :title, :body

  def initialize(title, body)
    @title = title
    @body  = body
  end

  def validate
    errors = []
    errors << "タイトルが空" if title.to_s.empty?
    errors << "本文が空"     if body.to_s.empty?
    errors
  end
end

a = Article.new("Ruby入門", "Rubyは楽しい言語です。")
puts a.to_json
puts a.valid?
a.log("記事を保存しました")
puts Article.ancestors.inspect`}
          expectedOutput={`{ "title": "Ruby入門", "body": "Rubyは楽しい言語です。" }
true
[Article] 記事を保存しました
[Article, Loggable, Validatable, Serializable, Object, Kernel, BasicObject]`}
        />

        <div className="bg-gray-900 rounded-xl p-6 my-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-gray-100 mb-3">メソッド探索順序（MRO）</h2>
          <p className="text-gray-400 text-sm">
            複数のモジュールが同名のメソッドを持つ場合、最後に include したモジュールが優先されます（先入れ後出し）。
          </p>
        </div>

        <RubyEditor
          defaultCode={`module A
  def hello = "A#hello"
end

module B
  def hello = "B#hello"
end

class C
  include A
  include B  # 後からincludeしたBが優先
end

puts C.new.hello         # => B#hello
puts C.ancestors.inspect # BがAより先に現れる`}
          expectedOutput={`B#hello
[C, B, A, Object, Kernel, BasicObject]`}
        />

        <div className="mt-10 flex items-center justify-between">
          <LessonCompleteButton categoryId="modules" lessonId={lessonId} />
        </div>
        <LessonNav lessons={category.lessons} currentId={lessonId} basePath="/learn/modules" />
      </div>
    </div>
  );
}
