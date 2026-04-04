import { RubyEditor } from "@/components/ruby-editor";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2">実践プロジェクト</h1>
        <p className="text-gray-400">学んだ知識を組み合わせて、ミニプロジェクトに挑戦しましょう。</p>
      </div>

      {/* プロジェクト1: レシピブック管理 */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト1: レシピブック管理</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-900 text-green-300">初級</span>
        </div>
        <p className="text-gray-400 mb-4">クラスと配列を使ってレシピを管理するプログラムを作成しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>Recipe クラスを定義する（名前・材料・調理時間）</li>
          <li>レシピを配列に追加・一覧表示する</li>
          <li>調理時間でソートして短い順に表示する</li>
          <li>特定の材料を含むレシピを検索する</li>
        </ul>
        <RubyEditor
          defaultCode={`# TODO: Recipe クラスを定義する
# 属性: name (名前), ingredients (材料の配列), time (調理時間・分)
class Recipe
  # TODO: attr_accessor で属性を定義する

  # TODO: initialize メソッドを実装する

  # TODO: to_s メソッドで整形した文字列を返す
end

# TODO: レシピを管理する RecipeBook クラスを定義する
class RecipeBook
  def initialize
    @recipes = []
  end

  # TODO: レシピを追加するメソッドを実装する
  # def add(recipe)

  # TODO: 調理時間でソートして返すメソッドを実装する
  # def sorted_by_time

  # TODO: 材料名でレシピを検索するメソッドを実装する
  # def search_by_ingredient(ingredient)
end

# 動作確認
book = RecipeBook.new
# TODO: レシピを追加して動作を確認する`}
          expectedOutput={`=== 調理時間順 ===
オムライス (15分) - 材料: 卵, ご飯, ケチャップ
カレー (45分) - 材料: 肉, じゃがいも, カレールー
ラーメン (60分) - 材料: 麺, スープ, チャーシュー

=== 卵を使うレシピ ===
オムライス (15分)`}
        />
      </div>

      {/* プロジェクト2: テキストアドベンチャーゲーム */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト2: テキストアドベンチャーゲーム</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">ハッシュと条件分岐を使ってシンプルなテキストアドベンチャーゲームを作りましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>部屋データをハッシュで管理する（説明・選択肢・移動先）</li>
          <li>現在の部屋を記録してプレイヤーを移動させる</li>
          <li>各部屋の説明と選択肢を表示する</li>
          <li>ゴール部屋に到達したらクリアメッセージを表示する</li>
        </ul>
        <RubyEditor
          defaultCode={`# TODO: 部屋データをハッシュで定義する
# 各部屋: { description: "...", choices: { "コマンド" => :次の部屋ID } }
ROOMS = {
  # :start => { description: "...", choices: { "北へ" => :hall } },
  # :hall  => { ... },
  # :goal  => { description: "宝箱を発見！クリア！", choices: {} }
}

# TODO: ゲームを進行する関数を実装する
def play_game(start_room)
  current = start_room

  loop do
    room = ROOMS[current]
    puts room[:description]

    # TODO: 選択肢がなければ終了する
    break if room[:choices].empty?

    # TODO: 選択肢を表示して最初のコマンドを自動選択（デモ用）
    command, next_room = room[:choices].first
    puts "選択: #{command}"
    current = next_room
  end
end

play_game(:start)`}
          expectedOutput={`暗い洞窟の入口に立っています。
選択: 北へ
広い広間に出ました。松明が壁を照らしています。
選択: 東へ
古い宝箱が置かれた小部屋です。クリア！`}
        />
      </div>

      {/* プロジェクト3: CSVレポート生成 */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト3: CSVレポート生成</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-900 text-yellow-300">中級</span>
        </div>
        <p className="text-gray-400 mb-4">ファイル I/O と文字列操作を使って売上データを CSV 形式でレポートにしましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>売上データを配列で用意する</li>
          <li>合計・平均・最大・最小を計算する</li>
          <li>CSV 形式の文字列を生成する</li>
          <li>集計サマリーをヘッダーとして先頭に付加する</li>
        </ul>
        <RubyEditor
          defaultCode={`# 売上データ（商品名, 数量, 単価）
sales_data = [
  ["リンゴ",  100, 150],
  ["バナナ",   80, 120],
  ["オレンジ", 60, 200],
  ["ぶどう",   40, 350],
]

# TODO: 各行の売上金額（数量 × 単価）を計算する

# TODO: 合計・平均・最大・最小の売上金額を計算する

# TODO: CSV 形式のレポートを生成する
# ヘッダー行: "商品名,数量,単価,売上金額"
# データ行: 各商品のデータ
# フッター: 合計・平均・最大・最小

# TODO: レポートを puts で出力する`}
          expectedOutput={`=== 売上レポート ===
合計: 57,500円 / 平均: 14,375円 / 最大: 21,000円 / 最小: 9,600円

商品名,数量,単価,売上金額
リンゴ,100,150,15000
バナナ,80,120,9600
オレンジ,60,200,12000
ぶどう,40,350,14000`}
        />
      </div>

      {/* プロジェクト4: 簡易Webスクレイパー */}
      <div className="mb-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">プロジェクト4: 簡易Webスクレイパー</h2>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-900 text-red-300">上級</span>
        </div>
        <p className="text-gray-400 mb-4">正規表現とメソッドチェーンを使って HTML テキストからデータを抽出しましょう。</p>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-6">
          <li>正規表現で HTML タグからリンクを抽出する</li>
          <li>テキストノードから見出しを取り出す</li>
          <li>メソッドチェーンで結果をフィルタリング・変換する</li>
          <li>重複を除去して整形して出力する</li>
        </ul>
        <RubyEditor
          defaultCode={`# サンプル HTML テキスト（実際のネットワークアクセスなし）
html = <<~HTML
  <html>
    <h1>Ruby プログラミング入門</h1>
    <h2>第1章: 基礎</h2>
    <a href="https://ruby-lang.org">Ruby 公式サイト</a>
    <a href="https://rubygems.org">RubyGems</a>
    <h2>第2章: クラス</h2>
    <a href="https://ruby-doc.org">Ruby ドキュメント</a>
    <a href="https://rubygems.org">RubyGems</a>
  </html>
HTML

# TODO: 正規表現で href の URL をすべて抽出する（重複除去）
# ヒント: scan(/href="([^"]+)"/).flatten.uniq

# TODO: 正規表現で h1・h2 タグのテキストを抽出する
# ヒント: scan(/<h[12]>([^<]+)<\/h[12]>/).flatten

# TODO: 結果を整形して出力する
puts "=== 見出し ==="`}
          expectedOutput={`=== 見出し ===
Ruby プログラミング入門
第1章: 基礎
第2章: クラス

=== リンク（重複除去） ===
https://ruby-lang.org
https://rubygems.org
https://ruby-doc.org`}
        />
      </div>
    </div>
  );
}
