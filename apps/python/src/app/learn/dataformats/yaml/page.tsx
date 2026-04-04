import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("dataformats");

export default function YamlPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">データ形式 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">YAML処理</h1>
        <p className="text-gray-400">
          YAMLは設定ファイルに広く使われるデータ形式です。JSONより読みやすく、コメントも書けます。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">PyYAML</code> ライブラリの使い方を学びましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">YAML の文法</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden mb-6">
          <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">config.yaml</div>
          <div className="p-4 font-mono text-sm text-gray-300 space-y-1">
            <p><span className="text-gray-500"># コメントが書けます</span></p>
            <p><span className="text-blue-400">app</span>:</p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">name</span>: <span className="text-green-400">MyWebApp</span></p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">version</span>: <span className="text-yellow-400">1.0.0</span></p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">debug</span>: <span className="text-orange-400">false</span></p>
            <p className="mt-1"><span className="text-blue-400">database</span>:</p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">host</span>: <span className="text-green-400">localhost</span></p>
            <p>&nbsp;&nbsp;<span className="text-blue-400">port</span>: <span className="text-yellow-400">5432</span></p>
            <p className="mt-1"><span className="text-blue-400">features</span>:</p>
            <p>&nbsp;&nbsp;- <span className="text-green-400">auth</span></p>
            <p>&nbsp;&nbsp;- <span className="text-green-400">cache</span></p>
            <p>&nbsp;&nbsp;- <span className="text-green-400">monitoring</span></p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">PyYAML の使い方（インストール: pip install pyyaml）</h2>
        <p className="text-gray-400 mb-4">
          このプレイグラウンドでは PyYAML が利用できないため、YAML をシミュレートするコードで学習します。
          実際のプロジェクトでは <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">import yaml</code> で使用します。
        </p>
        <PythonPlayground
          defaultCode={`# PyYAML の動作をシミュレート
import json

# YAML と JSON の対応を示す
yaml_example = """
# アプリケーション設定
app:
  name: MyWebApp
  version: 1.0.0
  debug: false

database:
  host: localhost
  port: 5432
  name: mydb
  credentials:
    user: admin
    password: secret123

features:
  - auth
  - cache
  - monitoring
  - rate_limiting

thresholds:
  max_connections: 100
  timeout_seconds: 30.5
"""

# JSON として同等のデータ構造
equivalent_dict = {
    "app": {
        "name": "MyWebApp",
        "version": "1.0.0",
        "debug": False,
    },
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "mydb",
        "credentials": {
            "user": "admin",
            "password": "secret123",
        },
    },
    "features": ["auth", "cache", "monitoring", "rate_limiting"],
    "thresholds": {
        "max_connections": 100,
        "timeout_seconds": 30.5,
    },
}

print("YAML の内容（テキスト）:")
print(yaml_example[:200])

print("\\nPython オブジェクトとして:")
print(f"アプリ名: {equivalent_dict['app']['name']}")
print(f"DBポート: {equivalent_dict['database']['port']}")
print(f"機能一覧: {equivalent_dict['features']}")
print(f"タイムアウト: {equivalent_dict['thresholds']['timeout_seconds']}秒")

print("\\n実際のコード（PyYAML を使う場合）:")
print("""import yaml

with open('config.yaml', 'r', encoding='utf-8') as f:
    config = yaml.safe_load(f)

with open('output.yaml', 'w', encoding='utf-8') as f:
    yaml.dump(config, f, allow_unicode=True)
""")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">YAML vs JSON の比較</h2>
        <PythonPlayground
          defaultCode={`import json

data = {
    "server": {
        "host": "0.0.0.0",
        "port": 8080,
        "debug": False,
    },
    "database": {
        "url": "postgresql://user:pass@localhost/mydb",
        "pool_size": 5,
    },
    "allowed_hosts": ["localhost", "example.com", "*.myapp.com"],
}

# JSON 形式
json_output = json.dumps(data, ensure_ascii=False, indent=2)
print("=== JSON ===")
print(json_output)

print()
# YAML 形式（手動でシミュレート）
yaml_output = """# サーバー設定
server:
  host: "0.0.0.0"
  port: 8080
  debug: false

# データベース設定
database:
  url: "postgresql://user:pass@localhost/mydb"
  pool_size: 5

# 許可ホスト
allowed_hosts:
  - localhost
  - example.com
  - "*.myapp.com"
"""
print("=== YAML ===")
print(yaml_output)

print("比較:")
print(f"  JSON 文字数: {len(json_output)}")
print(f"  YAML 文字数: {len(yaml_output)}")
print("  YAML はコメントが書けて、クォートが少ない")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="dataformats" lessonId="yaml" />
      </div>
      <LessonNav lessons={lessons} currentId="yaml" basePath="/learn/dataformats" />
    </div>
  );
}
