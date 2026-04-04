import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dicts");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">辞書・集合 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">辞書・集合演習</h1>
        <p className="text-gray-400">辞書と集合を使ったデータ処理の実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1：単語出現回数のカウント</h2>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-cyan-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            文章の単語出現回数を辞書でカウントし、上位3単語を表示してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習1：単語カウント
text = "python is great python is easy python and python is fun"
words = text.split()

# 辞書で単語をカウント
count = {}
for word in words:
    count[word] = count.get(word, 0) + 1

print("単語カウント:", count)

# 出現回数上位3つ
top3 = sorted(count.items(), key=lambda x: x[1], reverse=True)[:3]
print("\n上位3単語:")
for word, freq in top3:
    print(f"  '{word}': {freq}回")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2：グループ管理</h2>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-cyan-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            生徒をグループに割り当てるデータを辞書で管理し、各グループの人数と全生徒のリストを表示してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習2：グループ管理
groups = {
    "Aグループ": ["田中", "鈴木", "佐藤"],
    "Bグループ": ["山田", "中村"],
    "Cグループ": ["小林", "加藤", "木村", "林"],
}

# 各グループの人数
for group, members in groups.items():
    print(f"{group}: {len(members)}名 - {', '.join(members)}")

# 全生徒リスト（集合を使って重複チェック）
all_students = []
for members in groups.values():
    all_students.extend(members)

print(f"\n総生徒数: {len(all_students)}名")
print(f"ユニーク数: {len(set(all_students))}名")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3：共通・差異の分析</h2>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-cyan-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            2人のユーザーが閲覧したページの集合を比較し、共通ページと各ユーザーのみが見たページを表示してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習3：閲覧ページの比較
user_a = {"ホーム", "製品A", "製品B", "ブログ", "お問い合わせ"}
user_b = {"ホーム", "製品B", "製品C", "価格表", "ブログ"}

# 両方が見たページ
common = user_a & user_b
print("共通ページ:", common)

# Aだけが見たページ
only_a = user_a - user_b
print("Aのみ:", only_a)

# Bだけが見たページ
only_b = user_b - user_a
print("Bのみ:", only_b)

# 少なくとも一方が見たページ
all_pages = user_a | user_b
print("全ページ数:", len(all_pages))`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習4：在庫管理システム</h2>
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-cyan-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            商品の在庫辞書を作成し、在庫切れ商品の検出と在庫補充処理を実装してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習4：在庫管理
inventory = {
    "りんご": 50,
    "バナナ": 0,
    "みかん": 30,
    "ぶどう": 0,
    "いちご": 15,
    "メロン": 5,
}

# 在庫切れの商品
out_of_stock = {item for item, qty in inventory.items() if qty == 0}
print("在庫切れ:", out_of_stock)

# 在庫少ない商品（10個未満）
low_stock = {item: qty for item, qty in inventory.items() if 0 < qty < 10}
print("在庫少:", low_stock)

# 補充（在庫切れ商品に100個追加）
for item in out_of_stock:
    inventory[item] = 100

print("\n補充後の在庫:")
for item, qty in sorted(inventory.items()):
    status = "✓" if qty > 0 else "✗"
    print(f"  {status} {item}: {qty}個")`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="dicts" lessonId="dicts-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="dicts-exercise" basePath="/learn/dicts" />
    </div>
  );
}
