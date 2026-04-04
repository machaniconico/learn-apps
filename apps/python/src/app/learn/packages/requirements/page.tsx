import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function RequirementsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ管理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">requirements.txt</h1>
        <p className="text-gray-400">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">requirements.txt</code> はプロジェクトが依存するパッケージとバージョンを記述するファイルです。
          チームでの開発環境共有や本番デプロイに欠かせません。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">requirements.txt の書き方</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">requirements.txt</div>
          <div className="p-4 font-mono text-sm space-y-1 text-gray-300">
            <p><span className="text-gray-500"># バージョン完全一致（最も厳密）</span></p>
            <p><span className="text-green-400">requests==2.31.0</span></p>
            <p className="mt-2"><span className="text-gray-500"># 以上（最新を許容）</span></p>
            <p><span className="text-green-400">flask&gt;=2.3.0</span></p>
            <p className="mt-2"><span className="text-gray-500"># 範囲指定</span></p>
            <p><span className="text-green-400">sqlalchemy&gt;=1.4,&lt;2.0</span></p>
            <p className="mt-2"><span className="text-gray-500"># 互換バージョン（マイナーバージョンのみ更新を許容）</span></p>
            <p><span className="text-green-400">numpy~=1.24</span></p>
            <p className="mt-2"><span className="text-gray-500"># バージョン指定なし（最新）</span></p>
            <p><span className="text-green-400">pillow</span></p>
            <p className="mt-2"><span className="text-gray-500"># 別ファイルを読み込む</span></p>
            <p><span className="text-green-400">-r base.txt</span></p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { op: "==", name: "完全一致", desc: "指定バージョンのみ。最も再現性が高い。" },
            { op: ">=", name: "以上", desc: "指定バージョン以上の最新版を使用。" },
            { op: "~=", name: "互換", desc: "マイナーバージョンのみ更新を許容。" },
          ].map((item) => (
            <div key={item.op} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <code className="text-green-400 font-mono text-lg">{item.op}</code>
              <p className="text-gray-300 text-sm font-medium">{item.name}</p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">requirements.txt を生成・利用する</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">ターミナル</div>
          <div className="p-4 font-mono text-sm space-y-3">
            {[
              ["pip freeze > requirements.txt", "# 現在の環境を requirements.txt に書き出す"],
              ["pip install -r requirements.txt", "# requirements.txt からインストール"],
              ["pip install -r requirements.txt -r requirements-dev.txt", "# 複数ファイルを指定"],
            ].map(([cmd, comment]) => (
              <div key={cmd}>
                <code className="text-green-400">{cmd}</code>
                <br />
                <span className="text-gray-500 text-xs">{comment}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">ベストプラクティス：環境を分ける</h2>
        <PythonPlayground
          defaultCode={`# requirements ファイルの分割パターンをシミュレート

requirements = {
    "requirements.txt": [
        "requests==2.31.0",
        "flask==3.0.0",
        "sqlalchemy==2.0.23",
        "python-dotenv==1.0.0",
    ],
    "requirements-dev.txt": [
        "-r requirements.txt",  # 本番の依存も含む
        "pytest==7.4.3",
        "pytest-cov==4.1.0",
        "black==23.12.0",
        "ruff==0.1.9",
        "mypy==1.7.1",
    ],
    "requirements-prod.txt": [
        "-r requirements.txt",
        "gunicorn==21.2.0",
        "psycopg2-binary==2.9.9",
    ],
}

print("=== 環境別 requirements.txt ===")
for filename, packages in requirements.items():
    print(f"\\n{filename} ({len(packages)}件):")
    for pkg in packages:
        prefix = "  " if not pkg.startswith("-r") else ""
        print(f"{prefix}  {pkg}")

print("\\n=== インストールコマンド ===")
print("開発環境: pip install -r requirements-dev.txt")
print("本番環境: pip install -r requirements-prod.txt")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="packages" lessonId="requirements" />
      </div>
      <LessonNav lessons={lessons} currentId="requirements" basePath="/learn/packages" />
    </div>
  );
}
