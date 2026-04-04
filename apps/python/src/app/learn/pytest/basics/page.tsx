import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

export default function PytestBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">pytest レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">pytestの基本</h1>
        <p className="text-gray-400">テスト関数の書き方・pytestの実行方法・テストの構造を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">pytestとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          pytestはPythonの定番テストフレームワークです。標準ライブラリのunittestより
          シンプルに書け、豊富なプラグインと分かりやすいエラーメッセージが特徴です。
          <code className="bg-gray-800 px-1 rounded text-yellow-300">pip install pytest</code> でインストールできます。
        </p>
        <div className="bg-gray-900 border border-yellow-500/20 rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-300 font-semibold mb-2">pytestが認識するテストの命名規則：</p>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li>ファイル名が <code className="bg-gray-800 px-1 rounded">test_*.py</code> または <code className="bg-gray-800 px-1 rounded">*_test.py</code></li>
            <li>関数名が <code className="bg-gray-800 px-1 rounded">test_</code> で始まる</li>
            <li>クラス名が <code className="bg-gray-800 px-1 rounded">Test</code> で始まり、メソッド名が <code className="bg-gray-800 px-1 rounded">test_</code> で始まる</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">最初のテストを書こう</h2>
        <p className="text-gray-400 mb-4">
          pytestはブラウザ環境では直接実行できないため、テスト関数を手動で実行してみましょう。
          実際のプロジェクトでは <code className="bg-gray-800 px-1 rounded text-yellow-300">pytest test_sample.py</code> と実行します。
        </p>
        <PythonPlayground defaultCode={`# テスト対象のコード（通常は別ファイル）
def add(a, b):
    """2つの数値の和を返す"""
    return a + b

def subtract(a, b):
    """2つの数値の差を返す"""
    return a - b

def is_palindrome(s):
    """文字列が回文かどうか判定する"""
    s = s.lower().replace(' ', '')
    return s == s[::-1]

# テスト関数（test_XXX の命名規則）
def test_add_positive():
    assert add(1, 2) == 3

def test_add_negative():
    assert add(-1, -2) == -3

def test_add_zero():
    assert add(0, 5) == 5

def test_subtract():
    assert subtract(10, 4) == 6

def test_is_palindrome():
    assert is_palindrome("racecar") == True
    assert is_palindrome("hello") == False
    assert is_palindrome("A man a plan a canal Panama") == True

# テストを手動実行
test_functions = [test_add_positive, test_add_negative, test_add_zero,
                  test_subtract, test_is_palindrome]

print("=== テスト実行 ===")
passed = 0
for fn in test_functions:
    try:
        fn()
        print(f"  PASSED: {fn.__name__}")
        passed += 1
    except AssertionError as e:
        print(f"  FAILED: {fn.__name__} - {e}")

print(f"\\n結果: {passed}/{len(test_functions)} テスト合格")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">例外のテスト</h2>
        <p className="text-gray-400 mb-4">例外が発生することを確認するテストパターンです。pytestでは <code className="bg-gray-800 px-1 rounded text-yellow-300">pytest.raises()</code> を使います。</p>
        <PythonPlayground defaultCode={`# 例外が発生することをテストする

def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("0で割ることはできません")
    return a / b

def get_item(lst, index):
    if index < 0 or index >= len(lst):
        raise IndexError(f"インデックス {index} は範囲外です")
    return lst[index]

# 例外テストのパターン
def test_divide_by_zero():
    """ZeroDivisionErrorが発生することを確認"""
    try:
        divide(10, 0)
        assert False, "例外が発生しなかった"
    except ZeroDivisionError as e:
        assert "0で割ること" in str(e)

def test_index_out_of_range():
    """IndexErrorが発生することを確認"""
    try:
        get_item([1, 2, 3], 5)
        assert False, "例外が発生しなかった"
    except IndexError as e:
        assert "範囲外" in str(e)

# 実行
print("=== 例外テスト ===")
for fn in [test_divide_by_zero, test_index_out_of_range]:
    try:
        fn()
        print(f"PASSED: {fn.__name__}")
    except AssertionError as e:
        print(f"FAILED: {fn.__name__} - {e}")`} />
      </section>

      <LessonCompleteButton categoryId="pytest" lessonId="basics" />
      <LessonNav lessons={lessons} currentId="basics" basePath="/learn/pytest" />
    </div>
  );
}
