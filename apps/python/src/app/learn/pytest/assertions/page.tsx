import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

export default function PytestAssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">pytest レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">assert文を使った期待値との比較と、pytestが生成するわかりやすいエラーメッセージを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">assertの基本</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          pytestは標準のPython <code className="bg-gray-800 px-1 rounded text-yellow-300">assert</code> 文を使います。
          ユニットテストフレームワークのように <code className="bg-gray-800 px-1 rounded text-yellow-300">assertEqual()</code> などの
          専用メソッドは不要です。テストが失敗した場合、pytestは変数の実際の値を含む詳細なエラーメッセージを自動生成します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">様々なアサーションパターン</h2>
        <PythonPlayground defaultCode={`# assertの様々な使い方

# 数値の比較
def test_numeric():
    x = 42
    assert x == 42          # 等値チェック
    assert x != 0           # 不等チェック
    assert x > 40           # 大小比較
    assert x >= 42          # 以上
    assert 40 < x < 50      # 範囲チェック

# 文字列の比較
def test_strings():
    name = "pytest"
    assert name == "pytest"
    assert name.startswith("py")
    assert "test" in name
    assert len(name) == 6

# リストと辞書
def test_collections():
    lst = [1, 2, 3, 4, 5]
    assert 3 in lst
    assert len(lst) == 5
    assert lst == [1, 2, 3, 4, 5]

    d = {'key': 'value', 'num': 42}
    assert 'key' in d
    assert d['num'] == 42

# 型のチェック
def test_types():
    assert isinstance(42, int)
    assert isinstance(3.14, float)
    assert isinstance("hello", str)
    assert isinstance([1, 2], list)

# 実行
tests = [test_numeric, test_strings, test_collections, test_types]
print("=== アサーションテスト ===")
for fn in tests:
    try:
        fn()
        print(f"PASSED: {fn.__name__}")
    except AssertionError as e:
        print(f"FAILED: {fn.__name__} - {e}")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">エラーメッセージの確認</h2>
        <p className="text-gray-400 mb-4">失敗したアサーションがどのようなメッセージを出力するか確認しましょう。pytestはassertの両辺の値を詳細に表示します。</p>
        <PythonPlayground defaultCode={`# 失敗するテストを意図的に作成してエラーメッセージを確認

def buggy_add(a, b):
    """バグがある（-1してしまう）"""
    return a + b - 1

def test_buggy_add():
    result = buggy_add(3, 4)
    expected = 7
    # 失敗するアサーション
    assert result == expected, f"期待値: {expected}, 実際: {result}"

def test_list_content():
    actual = [1, 2, 3, 4]
    expected = [1, 2, 3, 5]  # 4→5に意図的に間違える
    assert actual == expected, f"リストが一致しません\\n実際: {actual}\\n期待: {expected}"

# 失敗するテストを実行してメッセージを確認
print("=== 失敗するテストのエラーメッセージ ===\\n")
for fn in [test_buggy_add, test_list_content]:
    try:
        fn()
    except AssertionError as e:
        print(f"テスト: {fn.__name__}")
        print(f"エラー: {e}\\n")

print("pytestでは上記のような詳細なエラー情報が自動表示されます")`} />
      </section>

      <LessonCompleteButton categoryId="pytest" lessonId="assertions" />
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/pytest" />
    </div>
  );
}
