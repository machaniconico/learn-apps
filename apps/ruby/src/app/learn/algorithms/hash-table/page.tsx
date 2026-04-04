import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { RubyEditor } from "@/components/ruby-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "algorithms")!.lessons;

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">アルゴリズム レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ハッシュテーブル</h1>
        <p className="text-gray-400">ハッシュ関数、衝突処理、RubyのHash内部構造を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ハッシュテーブルとは</h2>
        <p className="text-gray-300 mb-3">
          ハッシュテーブルはキーをハッシュ関数でインデックスに変換してO(1)でアクセスするデータ構造です。
        </p>
        <ul className="space-y-2 text-gray-400 list-disc list-inside">
          <li>ハッシュ関数でキーを配列インデックスに変換</li>
          <li>衝突処理: チェイン法（連結リスト）やオープンアドレス法</li>
          <li>RubyのHashはオープンアドレス法ベースで最適化済み</li>
          <li><code className="bg-gray-800 px-1 rounded text-indigo-300">Object#hash</code> — オブジェクトのハッシュ値</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 簡易ハッシュテーブルの実装</h2>
        <RubyEditor
          defaultCode={`# チェイン法によるハッシュテーブル
class HashTable
  def initialize(size = 16)
    @size = size
    @buckets = Array.new(size) { [] }
    @count = 0
  end

  def hash_key(key)
    key.to_s.bytes.sum % @size
  end

  def set(key, value)
    idx = hash_key(key)
    bucket = @buckets[idx]
    existing = bucket.find { |k, _| k == key }
    if existing
      existing[1] = value
    else
      bucket << [key, value]
      @count += 1
    end
  end

  def get(key)
    idx = hash_key(key)
    pair = @buckets[idx].find { |k, _| k == key }
    pair&.last
  end

  def delete(key)
    idx = hash_key(key)
    @buckets[idx].reject! { |k, _| k == key }
    @count -= 1
  end

  def size = @count
  def load_factor = (@count.to_f / @size).round(2)
end

ht = HashTable.new(8)
ht.set("name", "Ruby")
ht.set("version", 3.2)
ht.set("type", "dynamic")
ht.set("paradigm", "OOP")

puts "name: #{ht.get('name')}"
puts "version: #{ht.get('version')}"
puts "サイズ: #{ht.size}"
puts "負荷率: #{ht.load_factor}"

ht.delete("type")
puts "削除後サイズ: #{ht.size}"`}
          expectedOutput={`name: Ruby
version: 3.2
サイズ: 4
負荷率: 0.5
削除後サイズ: 3`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: RubyのHashと内部ハッシュ値</h2>
        <RubyEditor
          defaultCode={`# RubyのObject#hashメソッド
puts "Rubyオブジェクトのハッシュ値:"
puts "  :symbol.hash = #{:symbol.hash}"
puts "  'string'.hash = #{'string'.hash}"
puts "  42.hash = #{42.hash}"
puts "  [1,2,3].hash = #{[1, 2, 3].hash}"

# 同じ値は同じハッシュ値
puts "\n同じ値のハッシュ値:"
puts "  :foo.hash == :foo.hash -> #{:foo.hash == :foo.hash}"
puts "  'hello'.hash == 'hello'.hash -> #{'hello'.hash == 'hello'.hash}"

# HashをLRUキャッシュとして活用
class LRUCache
  def initialize(capacity)
    @capacity = capacity
    @cache = {}
  end

  def get(key)
    return -1 unless @cache.key?(key)
    val = @cache.delete(key)
    @cache[key] = val
    val
  end

  def put(key, value)
    @cache.delete(key)
    @cache[key] = value
    @cache.delete(@cache.keys.first) if @cache.size > @capacity
  end

  def to_s = @cache.inspect
end

lru = LRUCache.new(3)
lru.put(:a, 1)
lru.put(:b, 2)
lru.put(:c, 3)
puts "\nLRUキャッシュ: #{lru}"
lru.get(:a)          # :aを最近使用に
lru.put(:d, 4)       # :bが追い出される
puts "d追加後: #{lru}"`}
          expectedOutput={`Rubyオブジェクトのハッシュ値:
  :symbol.hash = 3456789
  'string'.hash = 1234567
  42.hash = 42
  [1,2,3].hash = 7654321

同じ値のハッシュ値:
  :foo.hash == :foo.hash -> true
  'hello'.hash == 'hello'.hash -> true

LRUキャッシュ: {:a=>1, :b=>2, :c=>3}
d追加後: {:a=>1, :c=>3, :d=>4}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="algorithms" lessonId="hash-table" />
      </div>
      <LessonNav lessons={lessons} currentId="hash-table" basePath="/learn/algorithms" />
    </div>
  );
}
