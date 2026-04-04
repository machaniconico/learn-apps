import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

export default function PytestExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">pytest レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">pytest演習</h1>
        <p className="text-gray-400">pytestの総合的な知識を使った実践的なテスト設計問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">演習の目標</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          テスト基本・アサーション・フィクスチャ・パラメータ化・モックのすべてを組み合わせた
          実践的なテストスイートを設計します。銀行口座クラスのテストコードを完成させましょう。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題1: 銀行口座のテスト</h2>
        <p className="text-gray-400 mb-4">BankAccountクラスの各機能をテストしましょう。</p>
        <PythonPlayground defaultCode={`# テスト対象: 銀行口座クラス
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance
        self._transactions = []

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError(f"入金額は正の数でなければなりません: {amount}")
        self._balance += amount
        self._transactions.append(('入金', amount))
        return self._balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError(f"出金額は正の数でなければなりません: {amount}")
        if amount > self._balance:
            raise ValueError(f"残高不足: 残高={self._balance}, 出金要求={amount}")
        self._balance -= amount
        self._transactions.append(('出金', amount))
        return self._balance

    def get_history(self):
        return list(self._transactions)

# フィクスチャ相当の関数
def make_account(owner="テスト太郎", balance=10000):
    return BankAccount(owner, balance)

# テスト1: 基本操作
def test_initial_balance():
    acc = make_account(balance=5000)
    assert acc.balance == 5000

def test_deposit():
    acc = make_account(balance=1000)
    new_balance = acc.deposit(500)
    assert new_balance == 1500
    assert acc.balance == 1500

def test_withdraw():
    acc = make_account(balance=5000)
    new_balance = acc.withdraw(2000)
    assert new_balance == 3000

# テスト2: エラーケース
def test_deposit_negative():
    acc = make_account()
    try:
        acc.deposit(-100)
        assert False, "例外が発生しなかった"
    except ValueError as e:
        assert "正の数" in str(e)

def test_overdraft():
    acc = make_account(balance=1000)
    try:
        acc.withdraw(5000)
        assert False, "例外が発生しなかった"
    except ValueError as e:
        assert "残高不足" in str(e)

# テスト3: 履歴
def test_transaction_history():
    acc = make_account(balance=10000)
    acc.deposit(2000)
    acc.withdraw(500)
    history = acc.get_history()
    assert len(history) == 2
    assert history[0] == ('入金', 2000)
    assert history[1] == ('出金', 500)

# 実行
tests = [test_initial_balance, test_deposit, test_withdraw,
         test_deposit_negative, test_overdraft, test_transaction_history]

print("=== BankAccount テストスイート ===")
passed = failed = 0
for fn in tests:
    try:
        fn()
        print(f"PASSED: {fn.__name__}")
        passed += 1
    except AssertionError as e:
        print(f"FAILED: {fn.__name__} - {e}")
        failed += 1
print(f"\\n結果: {passed}/{passed+failed} テスト合格")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">問題2: パラメータ化で境界値テスト</h2>
        <p className="text-gray-400 mb-4">入金・出金の境界値をパラメータ化テストパターンで網羅的にチェックしましょう。</p>
        <PythonPlayground defaultCode={`class BankAccount:
    def __init__(self, balance=10000):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("入金額は正の数でなければなりません")
        self._balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("出金額は正の数でなければなりません")
        if amount > self._balance:
            raise ValueError("残高不足")
        self._balance -= amount

# パラメータ化テストケース
deposit_cases = [
    (1, True, None),         # 最小正値: 成功
    (100, True, None),       # 通常値: 成功
    (0, False, "正の数"),    # 0: エラー
    (-1, False, "正の数"),   # 負値: エラー
    (-1000, False, "正の数"),
]

withdraw_cases = [
    (1, True, None),           # 最小正値: 成功
    (10000, True, None),       # 残高ぴったり: 成功
    (10001, False, "残高不足"), # 残高超過: エラー
    (0, False, "正の数"),      # 0: エラー
    (-1, False, "正の数"),     # 負値: エラー
]

def run_cases(operation_name, cases, initial_balance=10000):
    passed = failed = 0
    for amount, should_succeed, err_contains in cases:
        acc = BankAccount(initial_balance)
        try:
            if operation_name == 'deposit':
                acc.deposit(amount)
            else:
                acc.withdraw(amount)

            if should_succeed:
                passed += 1
                print(f"  OK: {operation_name}({amount}) 成功")
            else:
                failed += 1
                print(f"  NG: {operation_name}({amount}) 例外が発生すべきだった")
        except ValueError as e:
            if not should_succeed and (err_contains is None or err_contains in str(e)):
                passed += 1
                print(f"  OK: {operation_name}({amount}) 期待通りのエラー")
            else:
                failed += 1
                print(f"  NG: {operation_name}({amount}) 予期しないエラー: {e}")
    return passed, failed

print("=== deposit パラメータ化テスト ===")
p, f = run_cases('deposit', deposit_cases)
print(f"結果: {p}/{p+f}")

print("\\n=== withdraw パラメータ化テスト ===")
p, f = run_cases('withdraw', withdraw_cases)
print(f"結果: {p}/{p+f}")`} />
      </section>

      <LessonCompleteButton categoryId="pytest" lessonId="pytest-exercise" />
      <LessonNav lessons={lessons} currentId="pytest-exercise" basePath="/learn/pytest" />
    </div>
  );
}
