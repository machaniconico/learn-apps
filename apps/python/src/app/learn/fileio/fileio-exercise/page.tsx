import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファイルI/O演習</h1>
        <p className="text-gray-400">
          ファイルの読み書き・with文・CSV処理を組み合わせた実践的な問題に取り組みましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1: ワードカウンター</h2>
        <p className="text-gray-400 mb-4">
          テキストファイルの内容を受け取り、単語数・行数・文字数を集計して返す関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import io

def count_text_stats(text: str) -> dict:
    """テキストの統計情報を返す"""
    lines = text.splitlines()
    words = text.split()
    chars = len(text)
    chars_no_space = len(text.replace(" ", "").replace("\\n", ""))

    return {
        "lines": len(lines),
        "words": len(words),
        "chars": chars,
        "chars_no_space": chars_no_space,
    }

# テスト用テキスト
text = """Python is a versatile programming language.
It is widely used in web development, data science,
automation, and many other fields.
Python has a simple, readable syntax that makes it
great for beginners and experts alike."""

stats = count_text_stats(text)
print("=== テキスト統計 ===")
for key, val in stats.items():
    label = {"lines": "行数", "words": "単語数", "chars": "文字数", "chars_no_space": "文字数（空白除く）"}
    print(f"{label.get(key, key)}: {val}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2: CSV フィルタリング</h2>
        <p className="text-gray-400 mb-4">
          CSVデータから条件に合う行だけを抽出して、新しいCSVとして出力する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import csv
import io

def filter_csv(csv_text: str, column: str, min_value: float) -> str:
    """指定カラムが min_value 以上の行だけを残す"""
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = [row for row in reader if float(row[column]) >= min_value]

    output = io.StringIO()
    if rows:
        fieldnames = list(rows[0].keys())
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    output.seek(0)
    return output.read()

# テスト
csv_data = """名前,年齢,スコア
田中太郎,28,92
鈴木花子,32,65
佐藤一郎,25,95
山田美咲,29,78
伊藤健太,35,45"""

print("元データ:")
print(csv_data)
print()

filtered = filter_csv(csv_data, "スコア", 80.0)
print("スコア 80 以上のみ:")
print(filtered)
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3: ログファイルの解析</h2>
        <p className="text-gray-400 mb-4">
          ログ形式のテキストからエラーレベルごとの件数を集計する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import io
import re
from collections import Counter

log_text = """[2024-03-15 10:00:01] [INFO] アプリケーション起動
[2024-03-15 10:00:02] [INFO] データベース接続成功
[2024-03-15 10:01:05] [WARNING] メモリ使用量が70%を超えました
[2024-03-15 10:02:10] [ERROR] 認証失敗: ユーザー 'admin'
[2024-03-15 10:02:11] [INFO] リトライ: 1/3
[2024-03-15 10:02:12] [ERROR] 認証失敗: ユーザー 'admin'
[2024-03-15 10:02:13] [INFO] リトライ: 2/3
[2024-03-15 10:02:14] [ERROR] 最大リトライ回数に達しました
[2024-03-15 10:05:00] [WARNING] 外部APIタイムアウト
[2024-03-15 10:10:00] [INFO] バックアップ完了"""

def analyze_log(log: str) -> dict:
    """ログを解析してレベル別の件数と ERROR ログを返す"""
    pattern = r'\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] \\[(\\w+)\\] (.+)'
    entries = re.findall(pattern, log)

    levels = Counter(level for _, level, _ in entries)
    errors = [(ts, msg) for ts, level, msg in entries if level == "ERROR"]

    return {"counts": dict(levels), "errors": errors}

result = analyze_log(log_text)
print("=== ログ解析結果 ===")
print("レベル別件数:")
for level, count in result["counts"].items():
    print(f"  {level}: {count}件")

print("\\nERROR ログ:")
for ts, msg in result["errors"]:
    print(f"  [{ts}] {msg}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習4: JSON設定ファイルの読み書き</h2>
        <p className="text-gray-400 mb-4">
          JSON形式の設定ファイルを読み込んでデフォルト値とマージし、保存する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import json
import io

DEFAULT_CONFIG = {
    "debug": False,
    "host": "localhost",
    "port": 8080,
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "mydb"
    },
    "log_level": "INFO"
}

def load_config(config_json: str | None = None) -> dict:
    """設定ファイルをデフォルト値とマージして返す"""
    config = DEFAULT_CONFIG.copy()
    config["database"] = DEFAULT_CONFIG["database"].copy()

    if config_json:
        user_config = json.loads(config_json)
        # トップレベルキーをマージ
        for key, val in user_config.items():
            if key == "database" and isinstance(val, dict):
                config["database"].update(val)
            else:
                config[key] = val

    return config

# テスト
user_json = '{"debug": true, "port": 3000, "database": {"name": "production_db"}}'
config = load_config(user_json)
print("最終設定:")
print(json.dumps(config, ensure_ascii=False, indent=2))
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="fileio" lessonId="fileio-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="fileio-exercise" basePath="/learn/fileio" />
    </div>
  );
}
