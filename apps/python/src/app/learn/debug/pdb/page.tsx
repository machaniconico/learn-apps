import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugPdbPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">pdb デバッガ</h1>
        <p className="text-gray-400">Pythonの組み込みデバッガpdbの使い方とコマンドを学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">pdbとは</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          <code className="bg-gray-800 px-1 rounded text-orange-300">pdb</code>（Python Debugger）は
          Pythonの組み込みインタラクティブデバッガです。
          コードの任意の箇所で実行を一時停止し、変数を確認・変更したり、1行ずつステップ実行できます。
          printデバッグより強力で、複雑なバグの調査に適しています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">主要なpdbコマンド</h2>
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left px-4 py-2 text-gray-300">コマンド</th>
                <th className="text-left px-4 py-2 text-gray-300">省略形</th>
                <th className="text-left px-4 py-2 text-gray-300">説明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                ["next", "n", "次の行に進む（関数の中には入らない）"],
                ["step", "s", "次の行に進む（関数の中に入る）"],
                ["continue", "c", "次のブレークポイントまで実行"],
                ["print", "p", "式や変数の値を表示: p variable"],
                ["list", "l", "現在位置周辺のソースコードを表示"],
                ["where", "w", "現在のコールスタックを表示"],
                ["quit", "q", "デバッガを終了"],
              ].map(([cmd, abbr, desc]) => (
                <tr key={cmd}>
                  <td className="px-4 py-2 text-orange-300 font-mono">{cmd}</td>
                  <td className="px-4 py-2 text-yellow-300 font-mono">{abbr}</td>
                  <td className="px-4 py-2 text-gray-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">pdbの使い方パターン</h2>
        <p className="text-gray-400 mb-4">
          ブラウザ環境ではpdbのインタラクティブモードは動きません。代わりに
          <code className="bg-gray-800 px-1 rounded text-orange-300">pdb.run_trace()</code> の
          代わりになるトレース技術を確認しましょう。
        </p>
        <PythonPlayground defaultCode={`# pdbのブレークポイント設定パターン
# 実際のターミナルでは: python -m pdb script.py
# コード中では: import pdb; pdb.set_trace()  または  breakpoint()（Python 3.7+）

# pdbコマンドのシミュレーション（ターミナルでの挙動を確認）
import sys

def binary_search(arr, target):
    """二分探索（バグあり）"""
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        # pdb.set_trace() ← ここにブレークポイントを置く

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1  # バグ: mid - 1 が正しい

    return -1

# トレース出力を模擬するデバッグ版
def binary_search_debug(arr, target):
    """デバッグ出力付き二分探索"""
    left, right = 0, len(arr) - 1
    step = 0

    while left <= right:
        step += 1
        mid = (left + right) // 2
        # pdb の p コマンドに相当
        print(f"ステップ{step}: left={left}, right={right}, mid={mid}, arr[mid]={arr[mid]}")

        if arr[mid] == target:
            print(f"  → 発見: インデックス {mid}")
            return mid
        elif arr[mid] < target:
            print(f"  → {arr[mid]} < {target}: 右半分を探索")
            left = mid + 1
        else:
            print(f"  → {arr[mid]} > {target}: 左半分を探索")
            right = mid - 1

    print("  → 見つかりません")
    return -1

arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
print(f"配列: {arr}")
print(f"\\n7を探す:")
result = binary_search_debug(arr, 7)
print(f"結果: インデックス {result}")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">VS Codeでのデバッグ設定</h2>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-3">
            実際の開発では <strong className="text-white">VS Code</strong> などのIDE組み込みデバッガが便利です。
            以下の <code className="bg-gray-800 px-1 rounded text-orange-300">.vscode/launch.json</code> を設定することでGUIデバッグが可能になります。
          </p>
          <pre className="text-xs text-gray-300 font-mono overflow-auto">{`{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Current File",
      "type": "debugpy",
      "request": "launch",
      "program": "\${file}",
      "console": "integratedTerminal"
    }
  ]
}`}</pre>
        </div>
      </section>

      <LessonCompleteButton categoryId="debug" lessonId="pdb" />
      <LessonNav lessons={lessons} currentId="pdb" basePath="/learn/debug" />
    </div>
  );
}
