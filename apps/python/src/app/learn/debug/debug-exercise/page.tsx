import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">デバッグ演習</h1>
        <p className="text-gray-400">バグを含むコードを発見・修正するデバッグ実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">演習の目標</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          printデバッグ・logging・プロファイリングを組み合わせてバグを発見し修正する実践演習です。
          各問題のコードにはバグが仕込まれています。コードを実行して出力を観察し、問題を特定してください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題1: バグを含む計算関数を直そう</h2>
        <p className="text-gray-400 mb-4">以下の関数には複数のバグがあります。printデバッグを追加して発見してください。</p>
        <PythonPlayground defaultCode={`# バグのあるコード（修正してください）

def calculate_discount(price, discount_percent):
    """割引後の価格を計算する"""
    # バグ1: 割引率の計算が間違っている
    discount = price * discount_percent  # 正しくは / 100 が必要
    final_price = price - discount
    return final_price

def average_of_positives(numbers):
    """正の数の平均を計算する"""
    positives = [n for n in numbers if n > 0]
    # バグ2: 空リストのチェックがない
    return sum(positives) / len(positives)

def reverse_words(sentence):
    """文の単語順を逆にする"""
    words = sentence.split(' ')
    # バグ3: reverseはin-placeで変更しNoneを返す
    return words.reverse()  # 正しくは words[::-1] または reversed(words)

# テストケース
print("=== デバッグ前のテスト ===")

# テスト1
result = calculate_discount(1000, 20)
print(f"1000円の20%引き: {result}円 (期待値: 800円)")
if result != 800:
    print(f"  ⚠ バグ発見！discount_percent={20}で割り算を確認")

# テスト2
try:
    avg = average_of_positives([-1, -2, -3])
    print(f"空リストの平均: {avg}")
except ZeroDivisionError as e:
    print(f"  ⚠ ZeroDivisionError: {e} - 空リストチェックが必要")

# テスト3
result = reverse_words("Hello World Python")
print(f"逆順: {result} (期待値: ['Python', 'World', 'Hello'])")
if result is None:
    print("  ⚠ Noneが返っている！reverse()はin-placeです")

print("\\n=== 修正後 ===")

def calculate_discount_fixed(price, discount_percent):
    discount = price * (discount_percent / 100)  # /100 を追加
    return price - discount

def average_of_positives_fixed(numbers):
    positives = [n for n in numbers if n > 0]
    if not positives:
        return 0  # 空の場合は0を返す
    return sum(positives) / len(positives)

def reverse_words_fixed(sentence):
    words = sentence.split(' ')
    return words[::-1]  # スライスで新しいリストを返す

print(f"1000円の20%引き: {calculate_discount_fixed(1000, 20)}円")
print(f"空リストの平均: {average_of_positives_fixed([-1, -2, -3])}")
print(f"逆順: {reverse_words_fixed('Hello World Python')}")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題2: パフォーマンスのボトルネックを修正しよう</h2>
        <p className="text-gray-400 mb-4">遅いアルゴリズムを特定して、高速なものに置き換えましょう。</p>
        <PythonPlayground defaultCode={`import timeit

# 遅いバージョン（O(n²)）
def find_duplicates_slow(lst):
    """リスト内の重複要素を見つける（遅い版）"""
    duplicates = []
    for i in range(len(lst)):
        for j in range(i + 1, len(lst)):
            if lst[i] == lst[j] and lst[i] not in duplicates:
                duplicates.append(lst[i])
    return sorted(duplicates)

# 高速バージョン（O(n)）
def find_duplicates_fast(lst):
    """リスト内の重複要素を見つける（高速版）"""
    seen = set()
    duplicates = set()
    for item in lst:
        if item in seen:
            duplicates.add(item)
        seen.add(item)
    return sorted(duplicates)

# テストデータ
import random
random.seed(42)
data_small = random.choices(range(50), k=100)
data_large = random.choices(range(500), k=1000)

# 正しさの確認
print("=== 正確さの確認 ===")
slow_result = find_duplicates_slow(data_small)
fast_result = find_duplicates_fast(data_small)
print(f"結果一致: {slow_result == fast_result}")
print(f"重複数: {len(slow_result)}件")

# パフォーマンス計測
print("\\n=== パフォーマンス比較 ===")
t_slow = timeit.timeit(lambda: find_duplicates_slow(data_large), number=10)
t_fast = timeit.timeit(lambda: find_duplicates_fast(data_large), number=10)

print(f"遅い版 (O(n²)):  {t_slow:.4f}秒 (10回)")
print(f"高速版 (O(n)):   {t_fast:.4f}秒 (10回)")
print(f"速度改善: {t_slow/t_fast:.1f}倍高速化")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題3: loggingでデバッグ情報を記録する</h2>
        <p className="text-gray-400 mb-4">loggingモジュールを使って、どこでエラーが起きているか追跡しましょう。</p>
        <PythonPlayground defaultCode={`import logging

logging.basicConfig(level=logging.DEBUG, format='%(levelname)-8s: %(message)s')
logger = logging.getLogger('exercise')

def parse_age(value):
    """文字列を年齢（整数）に変換する"""
    logger.debug(f"parse_age呼び出し: value={repr(value)}")
    try:
        age = int(value)
        if age < 0 or age > 150:
            logger.warning(f"年齢が範囲外: {age}")
            return None
        logger.info(f"年齢変換成功: {age}")
        return age
    except ValueError:
        logger.error(f"数値変換失敗: {repr(value)}")
        return None

def process_users(user_data):
    """ユーザーデータを処理する"""
    logger.info(f"ユーザー処理開始: {len(user_data)}件")
    results = []

    for i, user in enumerate(user_data):
        logger.debug(f"処理中 [{i}]: {user}")
        age = parse_age(user.get('age', ''))
        if age is not None:
            results.append({'name': user['name'], 'age': age})
        else:
            logger.warning(f"スキップ: {user['name']}（年齢データ不正）")

    logger.info(f"処理完了: {len(results)}/{len(user_data)}件成功")
    return results

# テストデータ（不正データを含む）
users = [
    {'name': '田中', 'age': '25'},
    {'name': '鈴木', 'age': 'abc'},   # 不正
    {'name': '佐藤', 'age': '-5'},    # 負の値
    {'name': '山田', 'age': '30'},
    {'name': '伊藤', 'age': ''},      # 空文字
]

print("=== ユーザー処理（loggingで追跡） ===\\n")
valid_users = process_users(users)
print(f"\\n有効ユーザー:")
for u in valid_users:
    print(f"  {u['name']}: {u['age']}歳")`} />
      </section>

      <LessonCompleteButton categoryId="debug" lessonId="debug-exercise" />
      <LessonNav lessons={lessons} currentId="debug-exercise" basePath="/learn/debug" />
    </div>
  );
}
