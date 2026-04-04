import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("functions");

export default function FunctionsExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">関数 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">関数演習</h1>
        <p className="text-gray-400">関数を使ったプログラム設計の実践問題</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">演習の目標</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          関数の定義・引数・戻り値・デフォルト引数・*args/**kwargs・ラムダ・デコレータを総合的に使います。
          適切に関数を設計することで、再利用性が高く読みやすいコードを書く練習をしましょう。
        </p>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start gap-2"><span className="text-yellow-400">1.</span><span>計算ユーティリティ関数</span></li>
          <li className="flex items-start gap-2"><span className="text-yellow-400">2.</span><span>テキスト処理関数</span></li>
          <li className="flex items-start gap-2"><span className="text-yellow-400">3.</span><span>高階関数の活用</span></li>
          <li className="flex items-start gap-2"><span className="text-yellow-400">4.</span><span>関数を使ったゲームロジック</span></li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習1: 計算ユーティリティ</h2>
        <p className="text-gray-400 mb-4">様々な計算を行う関数群を作りましょう。</p>
        <PythonPlayground defaultCode={`# 計算ユーティリティ関数集

def factorial(n: int) -> int:
    """n!（階乗）を計算する"""
    if n < 0:
        raise ValueError("負の数の階乗は定義されていません")
    if n == 0:
        return 1
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def fibonacci(n: int) -> list[int]:
    """フィボナッチ数列のn項目までのリストを返す"""
    if n <= 0:
        return []
    if n == 1:
        return [0]
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

def gcd(a: int, b: int) -> int:
    """最大公約数を返す（ユークリッドの互除法）"""
    while b:
        a, b = b, a % b
    return a

def lcm(a: int, b: int) -> int:
    """最小公倍数を返す"""
    return a * b // gcd(a, b)

# テスト
print("=== 階乗 ===")
for n in range(8):
    print(f"{n}! = {factorial(n)}")

print("\\n=== フィボナッチ数列（15項）===")
print(fibonacci(15))

print("\\n=== 最大公約数・最小公倍数 ===")
pairs = [(12, 18), (100, 75), (7, 13)]
for a, b in pairs:
    print(f"gcd({a}, {b}) = {gcd(a, b)}, lcm({a}, {b}) = {lcm(a, b)}")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習2: テキスト処理</h2>
        <p className="text-gray-400 mb-4">文字列を操作するユーティリティ関数を作りましょう。</p>
        <PythonPlayground defaultCode={`# テキスト処理関数集

def count_vowels(text: str) -> dict[str, int]:
    """テキスト中の母音（英語）の出現回数を返す"""
    vowels = "aeiouAEIOU"
    return {v: text.count(v) for v in vowels if text.count(v) > 0}

def is_palindrome(text: str) -> bool:
    """回文かどうか判定する"""
    cleaned = "".join(c.lower() for c in text if c.isalnum())
    return cleaned == cleaned[::-1]

def word_frequency(text: str, top_n: int = 5) -> list[tuple[str, int]]:
    """単語の出現頻度を上位n件返す"""
    words = text.lower().split()
    freq: dict[str, int] = {}
    for word in words:
        word = word.strip(".,!?;:")
        freq[word] = freq.get(word, 0) + 1
    return sorted(freq.items(), key=lambda x: x[1], reverse=True)[:top_n]

# テスト
print("=== 母音カウント ===")
print(count_vowels("Hello, Python World!"))

print("\\n=== 回文判定 ===")
tests = ["racecar", "hello", "A man a plan a canal Panama", "Python"]
for t in tests:
    print(f"'{t}': {is_palindrome(t)}")

print("\\n=== 単語頻度 ===")
text = "the quick brown fox jumps over the lazy dog the fox"
top = word_frequency(text)
for word, count in top:
    print(f"  '{word}': {count}回")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習3: 高階関数とラムダ</h2>
        <p className="text-gray-400 mb-4">map・filter・reduce と lambda を使ったデータ処理です。</p>
        <PythonPlayground defaultCode={`from functools import reduce

# サンプルデータ
products = [
    {"name": "ノートPC", "price": 85000, "category": "電子機器", "stock": 5},
    {"name": "マウス", "price": 2500, "category": "電子機器", "stock": 15},
    {"name": "デスク", "price": 35000, "category": "家具", "stock": 3},
    {"name": "チェア", "price": 28000, "category": "家具", "stock": 8},
    {"name": "モニター", "price": 45000, "category": "電子機器", "stock": 4},
]

# フィルタリング（電子機器のみ）
electronics = list(filter(lambda p: p["category"] == "電子機器", products))
print("電子機器:", [p["name"] for p in electronics])

# マッピング（税込価格を計算）
with_tax = list(map(lambda p: {**p, "price_with_tax": int(p["price"] * 1.1)}, products))
for p in with_tax:
    print(f"  {p['name']}: {p['price']:,}円 → {p['price_with_tax']:,}円（税込）")

# 合計計算
total = reduce(lambda acc, p: acc + p["price"], products, 0)
print(f"\\n全商品合計: {total:,}円")

# ソートとフィルタの組み合わせ
expensive_in_stock = sorted(
    filter(lambda p: p["stock"] >= 5, products),
    key=lambda p: p["price"],
    reverse=True
)
print("\\n在庫5以上・価格降順:")
for p in expensive_in_stock:
    print(f"  {p['name']}: {p['price']:,}円（在庫{p['stock']}）")`} />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">演習4: 関数型ミニゲーム</h2>
        <p className="text-gray-400 mb-4">関数を組み合わせてじゃんけんゲームのロジックを実装しましょう。</p>
        <PythonPlayground defaultCode={`import random

# じゃんけんゲームのロジック
MOVES = ["グー", "チョキ", "パー"]

def get_computer_move() -> str:
    """コンピュータのランダムな手を返す"""
    return random.choice(MOVES)

def determine_winner(player: str, computer: str) -> str:
    """勝敗を判定して結果を返す"""
    if player == computer:
        return "引き分け"
    wins = {"グー": "チョキ", "チョキ": "パー", "パー": "グー"}
    if wins[player] == computer:
        return "あなたの勝ち！"
    return "コンピュータの勝ち"

def play_round(player_move: str) -> dict[str, str]:
    """1ラウンドを実行して結果を返す"""
    if player_move not in MOVES:
        raise ValueError(f"無効な手: {player_move}")
    computer_move = get_computer_move()
    result = determine_winner(player_move, computer_move)
    return {"player": player_move, "computer": computer_move, "result": result}

def play_game(rounds: int = 5) -> dict[str, int]:
    """指定ラウンド数ゲームを行い成績を返す"""
    wins = losses = draws = 0
    for i in range(1, rounds + 1):
        player_move = random.choice(MOVES)  # プレイヤーもランダム（シミュレーション）
        round_result = play_round(player_move)
        print(f"ラウンド{i}: {round_result['player']} vs {round_result['computer']} → {round_result['result']}")
        if "あなた" in round_result["result"]:
            wins += 1
        elif "コンピュータ" in round_result["result"]:
            losses += 1
        else:
            draws += 1
    return {"wins": wins, "losses": losses, "draws": draws}

# ゲーム実行
print("=== じゃんけん5ラウンド ===")
result = play_game(5)
print(f"\\n結果: {result['wins']}勝 {result['losses']}敗 {result['draws']}引き分け")`} />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="functions" lessonId="functions-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="functions-exercise" basePath="/learn/functions" />
    </div>
  );
}
