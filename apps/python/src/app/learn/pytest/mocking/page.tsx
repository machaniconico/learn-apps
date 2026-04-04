import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pytest");

export default function PytestMockingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">pytest レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モック・パッチ</h1>
        <p className="text-gray-400">unittest.mockを使って外部依存をモックに置き換えるテスト手法を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">モックとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <strong className="text-white">モック</strong>は外部依存（API・データベース・ファイルシステムなど）を
          偽物のオブジェクトに置き換えることで、テストを高速・安定・独立したものにする技術です。
          Pythonでは <code className="bg-gray-800 px-1 rounded text-yellow-300">unittest.mock</code> モジュールを使います。
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">MagicMock</h3>
            <p className="text-gray-400 text-sm">汎用のモックオブジェクト。呼び出し回数・引数・戻り値などを記録・設定できる。</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">patch()</h3>
            <p className="text-gray-400 text-sm">対象のモジュールや関数を一時的に置き換える。テスト終了後に自動で元に戻る。</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">MagicMockの基本</h2>
        <PythonPlayground defaultCode={`from unittest.mock import MagicMock, patch, call

# MagicMockの基本的な使い方
mock_func = MagicMock()

# 戻り値の設定
mock_func.return_value = 42
result = mock_func(1, 2, 3)
print("戻り値:", result)

# 呼び出し確認
print("呼び出された?", mock_func.called)
print("呼び出し回数:", mock_func.call_count)
print("引数:", mock_func.call_args)

# 複数回呼び出し
mock_func("a", "b")
mock_func("c")
print("\\n呼び出し履歴:")
for c in mock_func.call_args_list:
    print(f"  {c}")

# assert_called_with で検証
mock_func.assert_called_with("c")  # 最後の呼び出し
print("\\nassert_called_with('c'): OK")

# side_effect で例外を発生させる
mock_err = MagicMock(side_effect=ValueError("エラー！"))
try:
    mock_err()
except ValueError as e:
    print(f"\\nside_effect: {e}")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">patchを使ったテストパターン</h2>
        <p className="text-gray-400 mb-4">外部APIや時刻依存のコードをpatchで置き換えてテストするパターンを見ましょう。</p>
        <PythonPlayground defaultCode={`from unittest.mock import patch, MagicMock
from datetime import datetime

# テスト対象のコード（外部依存あり）
def get_current_greeting():
    """現在時刻に応じた挨拶を返す"""
    now = datetime.now()
    hour = now.hour
    if 5 <= hour < 12:
        return "おはようございます"
    elif 12 <= hour < 18:
        return "こんにちは"
    else:
        return "こんばんは"

def fetch_user_name(user_id):
    """外部APIからユーザー名を取得（模擬）"""
    # 実際はrequests.get()などを呼ぶ
    raise NotImplementedError("実際のAPI呼び出しをモックで置き換える")

# patchを使ったテスト
print("=== patch を使ったテスト ===")

# datetime.now() をモックして時刻を固定
with patch('__main__.datetime') as mock_dt:
    # 朝7時のシナリオ
    mock_dt.now.return_value = MagicMock(hour=7)
    result = get_current_greeting()
    print(f"朝7時の挨拶: {result}")
    assert result == "おはようございます", f"失敗: {result}"

    # 昼14時のシナリオ
    mock_dt.now.return_value = MagicMock(hour=14)
    result = get_current_greeting()
    print(f"昼14時の挨拶: {result}")
    assert result == "こんにちは"

    # 夜21時のシナリオ
    mock_dt.now.return_value = MagicMock(hour=21)
    result = get_current_greeting()
    print(f"夜21時の挨拶: {result}")
    assert result == "こんばんは"

print("\\nすべてのテストに合格！")`} />
      </section>

      <LessonCompleteButton categoryId="pytest" lessonId="mocking" />
      <LessonNav lessons={lessons} currentId="mocking" basePath="/learn/pytest" />
    </div>
  );
}
