import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("strings");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">文字列操作 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列演習</h1>
        <p className="text-gray-400">文字列操作を駆使したテキスト処理の実践問題に挑戦しましょう。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1：テキストのクリーニング</h2>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 mb-4">
          <p className="text-pink-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            汚れたデータ（余分な空白、大文字小文字の混在）を整形してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習1：テキストクリーニング
raw_data = [
    "  田中 太郎  ",
    "SUZUKI HANAKO",
    "  sato   jiro  ",
    "YAMADA　taro",  # 全角スペースあり
]

def clean_name(name):
    # 全角スペースを半角に変換
    name = name.replace("　", " ")
    # 前後の空白を除去
    name = name.strip()
    # タイトルケースに変換
    name = name.title()
    # 連続空白を1つに
    name = " ".join(name.split())
    return name

print("クリーニング結果:")
for name in raw_data:
    cleaned = clean_name(name)
    print(f"  '{name}' → '{cleaned}'")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2：パスワードバリデーション</h2>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 mb-4">
          <p className="text-pink-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            パスワードが以下の条件を満たすか検証してください：8文字以上、大文字・小文字・数字を含む。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習2：パスワードバリデーション
def validate_password(password):
    errors = []
    if len(password) < 8:
        errors.append("8文字以上必要です")
    if not any(c.isupper() for c in password):
        errors.append("大文字が必要です")
    if not any(c.islower() for c in password):
        errors.append("小文字が必要です")
    if not any(c.isdigit() for c in password):
        errors.append("数字が必要です")
    return errors

test_passwords = ["abc", "password", "Password1", "P@ssw0rd!"]
for pwd in test_passwords:
    errors = validate_password(pwd)
    if errors:
        print(f"'{pwd}': NG - {', '.join(errors)}")
    else:
        print(f"'{pwd}': OK")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3：Markdown テキスト解析</h2>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 mb-4">
          <p className="text-pink-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            簡単な Markdown テキストを解析して、見出しと本文の行数を集計してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習3：Markdown 解析
markdown = """# Pythonとは
Pythonは汎用プログラミング言語です。

## 特徴
- シンプルな文法
- 豊富なライブラリ

## 用途
Webアプリ、データ分析など多岐にわたります。

# まとめ
初心者にも学びやすい言語です。
"""

lines = markdown.strip().splitlines()
stats = {"h1": 0, "h2": 0, "bullet": 0, "text": 0}

for line in lines:
    stripped = line.strip()
    if stripped.startswith("## "):
        stats["h2"] += 1
    elif stripped.startswith("# "):
        stats["h1"] += 1
    elif stripped.startswith("- "):
        stats["bullet"] += 1
    elif stripped:
        stats["text"] += 1

print("Markdown 統計:")
for key, count in stats.items():
    print(f"  {key}: {count}行")`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習4：テンプレートエンジン</h2>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4 mb-4">
          <p className="text-pink-300 text-sm font-semibold mb-1">課題</p>
          <p className="text-gray-300 text-sm">
            {"{{変数名}}"} 形式のテンプレートに辞書のデータを埋め込む簡易テンプレートエンジンを実装してください。
          </p>
        </div>
        <PythonPlayground
          defaultCode={`# 演習4：簡易テンプレートエンジン
import re

def render_template(template, context):
    def replace(match):
        key = match.group(1).strip()
        return str(context.get(key, f"{{{{ {key} }}}}"))
    return re.sub(r"\{\{(.+?)\}\}", replace, template)

template = """
こんにちは、{{ name }}さん！

アカウント情報:
  メール: {{ email }}
  登録日: {{ date }}

{{ name }}さんは{{ plan }}プランをご利用中です。
"""

user = {
    "name": "田中太郎",
    "email": "tanaka@example.com",
    "date": "2025-01-15",
    "plan": "プレミアム",
}

result = render_template(template, user)
print(result)`}
        />
      </section>

      <div className="mt-8 mb-4 flex items-center gap-4">
        <LessonCompleteButton categoryId="strings" lessonId="strings-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-exercise" basePath="/learn/strings" />
    </div>
  );
}
