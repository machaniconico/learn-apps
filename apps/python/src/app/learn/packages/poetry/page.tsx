import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PoetryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ管理 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Poetry</h1>
        <p className="text-gray-400">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">Poetry</code> は依存関係管理・仮想環境管理・パッケージ公開を
          一つのツールで行える現代的なPythonパッケージマネージャです。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">pip + venv と Poetry の比較</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3 text-gray-400">機能</th>
                <th className="text-left p-3 text-gray-400">pip + venv</th>
                <th className="text-left p-3 text-gray-400">Poetry</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["仮想環境管理", "手動（venv）", "自動"],
                ["依存関係ファイル", "requirements.txt", "pyproject.toml"],
                ["ロックファイル", "なし", "poetry.lock"],
                ["パッケージ公開", "twine が別途必要", "poetry publish"],
                ["依存グループ", "複数ファイルで対応", "dev/test グループ対応"],
              ].map(([feat, pip, poetry]) => (
                <tr key={feat} className="border-b border-gray-800">
                  <td className="p-3 text-gray-300">{feat}</td>
                  <td className="p-3 text-gray-400">{pip}</td>
                  <td className="p-3 text-green-400">{poetry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Poetry の基本コマンド</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">ターミナル</div>
          <div className="p-4 font-mono text-sm space-y-3">
            {[
              ["pip install poetry", "# Poetry をインストール"],
              ["poetry new my-project", "# 新プロジェクト作成（ディレクトリ込み）"],
              ["poetry init", "# 既存ディレクトリに pyproject.toml を追加"],
              ["poetry add requests", "# パッケージを追加"],
              ["poetry add pytest --group dev", "# 開発用パッケージを追加"],
              ["poetry install", "# pyproject.toml からインストール"],
              ["poetry run python main.py", "# 仮想環境内でスクリプトを実行"],
              ["poetry shell", "# 仮想環境のシェルを起動"],
              ["poetry update", "# すべての依存を最新に更新"],
              ["poetry show", "# インストール済みパッケージ一覧"],
            ].map(([cmd, comment]) => (
              <div key={cmd} className="flex flex-wrap gap-2">
                <code className="text-green-400">{cmd}</code>
                <span className="text-gray-500">{comment}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">pyproject.toml の構造</h2>
        <PythonPlayground
          defaultCode={`# pyproject.toml の内容を Python で表現する
import json

pyproject = {
    "tool": {
        "poetry": {
            "name": "my-project",
            "version": "0.1.0",
            "description": "Pythonプロジェクトのサンプル",
            "authors": ["田中太郎 <tanaka@example.com>"],
            "readme": "README.md",
            "dependencies": {
                "python": "^3.11",
                "requests": "^2.31.0",
                "flask": ">=2.3.0,<3.0.0",
            },
            "group": {
                "dev": {
                    "dependencies": {
                        "pytest": "^7.4.0",
                        "black": "^23.0.0",
                        "ruff": "^0.1.0",
                    }
                }
            }
        }
    },
    "build-system": {
        "requires": ["poetry-core"],
        "build-backend": "poetry.core.masonry.api"
    }
}

print("pyproject.toml の構造:")
for section, content in pyproject.items():
    print(f"\\n[{section}]")
    if isinstance(content, dict):
        for key, val in content.items():
            if isinstance(val, dict):
                print(f"  [{section}.{key}]")
                for k2, v2 in val.items():
                    print(f"    {k2}: {json.dumps(v2, ensure_ascii=False)}")
            else:
                print(f"  {key}: {json.dumps(val, ensure_ascii=False)}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="packages" lessonId="poetry" />
      </div>
      <LessonNav lessons={lessons} currentId="poetry" basePath="/learn/packages" />
    </div>
  );
}
