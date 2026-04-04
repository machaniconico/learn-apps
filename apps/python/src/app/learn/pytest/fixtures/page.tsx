import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

export default function PytestFixturesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">pytest レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フィクスチャ</h1>
        <p className="text-gray-400">テストの前準備・後処理をfixtureで共有・再利用する仕組みを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">フィクスチャとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <strong className="text-white">フィクスチャ</strong>はテストの前準備（セットアップ）と後処理（ティアダウン）を
          定義する仕組みです。<code className="bg-gray-800 px-1 rounded text-yellow-300">@pytest.fixture</code> デコレータで
          定義し、テスト関数の引数に書くだけで自動的に注入されます。
          複数のテストで共通の初期データやオブジェクトを再利用できます。
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-mono text-xs">
            @pytest.fixture<br />
            def db_connection():<br />
            {"    "}conn = create_connection()  # セットアップ<br />
            {"    "}yield conn                   # テストに渡す<br />
            {"    "}conn.close()                 # ティアダウン
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">フィクスチャのコンセプトを理解しよう</h2>
        <p className="text-gray-400 mb-4">フィクスチャはPython的には「テスト用のファクトリ関数」です。手動で同様のパターンを実装して理解しましょう。</p>
        <PythonPlayground defaultCode={`# フィクスチャのコンセプト：テスト用のセットアップ関数

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, name, price, qty=1):
        self.items.append({'name': name, 'price': price, 'qty': qty})

    def total(self):
        return sum(item['price'] * item['qty'] for item in self.items)

    def item_count(self):
        return sum(item['qty'] for item in self.items)

    def clear(self):
        self.items = []

# フィクスチャ相当の関数（pytestでは @pytest.fixture で定義）
def make_cart_with_items():
    """テスト用の買い物カートを準備する"""
    cart = ShoppingCart()
    cart.add_item('りんご', 150, 3)
    cart.add_item('バナナ', 100, 2)
    cart.add_item('みかん', 80, 5)
    return cart

# テスト関数（pytestでは引数にfixture名を書くだけ）
def test_cart_total():
    cart = make_cart_with_items()  # フィクスチャを使用
    # 150*3 + 100*2 + 80*5 = 450 + 200 + 400 = 1050
    assert cart.total() == 1050, f"合計金額が正しくない: {cart.total()}"

def test_cart_item_count():
    cart = make_cart_with_items()
    assert cart.item_count() == 10  # 3+2+5

def test_cart_add_item():
    cart = make_cart_with_items()
    cart.add_item('ぶどう', 300)
    assert cart.item_count() == 11

# 実行
tests = [test_cart_total, test_cart_item_count, test_cart_add_item]
print("=== フィクスチャパターンのテスト ===")
for fn in tests:
    try:
        fn()
        print(f"PASSED: {fn.__name__}")
    except AssertionError as e:
        print(f"FAILED: {fn.__name__} - {e}")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">スコープとティアダウン</h2>
        <p className="text-gray-400 mb-4">フィクスチャのyieldを使ったセットアップ・ティアダウンパターンと、スコープの概念を理解しましょう。</p>
        <PythonPlayground defaultCode={`# yield を使ったセットアップ・ティアダウンのパターン
# (pytestの @pytest.fixture + yield に対応するコンセプト)

from contextlib import contextmanager

@contextmanager
def temp_file_fixture(content):
    """一時ファイルを作成して、テスト後に削除する（コンセプト）"""
    import tempfile, os
    # セットアップ
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt',
                                      delete=False, encoding='utf-8') as f:
        f.write(content)
        temp_path = f.name

    print(f"  [セットアップ] 一時ファイル作成: {temp_path}")
    try:
        yield temp_path  # テスト関数にパスを渡す
    finally:
        # ティアダウン（テスト後に必ず実行）
        os.unlink(temp_path)
        print(f"  [ティアダウン] 一時ファイル削除: {temp_path}")

# テスト実行
def test_file_content():
    with temp_file_fixture("Hello, pytest!") as path:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        assert content == "Hello, pytest!", f"内容が違う: {content}"
        print(f"  ファイル内容: {content}")
        return True

print("=== ティアダウンパターン ===")
result = test_file_content()
print(f"PASSED: test_file_content")`} />
      </section>

      <LessonCompleteButton categoryId="pytest" lessonId="fixtures" />
      <LessonNav lessons={lessons} currentId="fixtures" basePath="/learn/pytest" />
    </div>
  );
}
