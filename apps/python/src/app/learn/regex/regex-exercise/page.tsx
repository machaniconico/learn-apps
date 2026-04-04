import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("regex");

export default function RegexExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-red-400 text-sm font-semibold">正規表現 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">正規表現演習</h1>
        <p className="text-gray-400">
          正規表現を使ったテキスト処理の実践的な問題に取り組みましょう。
          バリデーション・抽出・変換の各パターンを練習します。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1: 入力値のバリデーション</h2>
        <p className="text-gray-400 mb-4">
          メールアドレス・電話番号・郵便番号を正規表現でバリデートする関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import re

def validate_email(email: str) -> bool:
    """メールアドレスの形式を検証する"""
    # TODO: 適切なパターンを実装してください
    # ヒント: [\\w.+-]+@[\\w-]+\\.[\\w.]+
    pattern = r''
    return bool(re.fullmatch(pattern, email)) if pattern else False

def validate_phone_jp(phone: str) -> bool:
    """日本の電話番号（携帯・固定）を検証する"""
    # TODO: 090-1234-5678 や 03-1234-5678 にマッチするパターン
    # ヒント: \\d{2,3}-\\d{3,4}-\\d{4}
    pattern = r''
    return bool(re.fullmatch(pattern, phone)) if pattern else False

def validate_postal_code(code: str) -> bool:
    """日本の郵便番号（123-4567）を検証する"""
    # TODO: 実装
    pattern = r''
    return bool(re.fullmatch(pattern, code)) if pattern else False

# テストケース
print("=== メールアドレス ===")
emails = [
    ("tanaka@example.com", True),
    ("test.user+label@domain.co.jp", True),
    ("invalid-email", False),
    ("@nodomain.com", False),
]
for email, expected in emails:
    result = validate_email(email)
    status = "OK" if result == expected else "NG"
    print(f"  [{status}] {email!r}: {result}")

print("\\n=== 電話番号 ===")
phones = [
    ("090-1234-5678", True),
    ("03-1234-5678", True),
    ("0120-111-222", True),
    ("123-456", False),
]
for phone, expected in phones:
    result = validate_phone_jp(phone)
    status = "OK" if result == expected else "NG"
    print(f"  [{status}] {phone!r}: {result}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2: テキストからの情報抽出</h2>
        <p className="text-gray-400 mb-4">
          テキストからURLを抽出し、ドメイン名・パス・クエリパラメータを分解する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import re

def extract_urls(text: str) -> list[str]:
    """テキストから URL を抽出する"""
    pattern = r'https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+'
    return re.findall(pattern, text)

def parse_url(url: str) -> dict:
    """URL をパースして各部分を返す"""
    pattern = r'(https?)://([\\w.-]+)((?:/[^?]*)?)((?:\\?.*)?)'
    m = re.match(pattern, url)
    if not m:
        return {}
    scheme, domain, path, query = m.groups()

    params = {}
    if query:
        # クエリパラメータを解析
        for pair in re.findall(r'([\\w]+)=([^&]+)', query):
            params[pair[0]] = pair[1]

    return {
        "scheme": scheme,
        "domain": domain,
        "path": path or "/",
        "query": params,
    }

# テスト
text = """
公式サイト: https://python.org
ドキュメント: https://docs.python.org/ja/3/library/re.html
検索: https://google.com/search?q=python+regex&lang=ja
"""

urls = extract_urls(text)
print("抽出したURL:")
for url in urls:
    print(f"  {url}")
    parsed = parse_url(url)
    print(f"    ドメイン: {parsed.get('domain')}")
    print(f"    パス: {parsed.get('path')}")
    if parsed.get('query'):
        print(f"    クエリ: {parsed.get('query')}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3: テキストの正規化</h2>
        <p className="text-gray-400 mb-4">
          全角英数字・スペースの正規化・不要な記号の除去など、テキストを正規化する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import re
import unicodedata

def normalize_text(text: str) -> str:
    """テキストを正規化する"""
    # 全角英数字を半角に変換
    text = unicodedata.normalize('NFKC', text)

    # 連続する空白を1つに
    text = re.sub(r'\\s+', ' ', text)

    # 前後の空白を除去
    text = text.strip()

    return text

def extract_hashtags(text: str) -> list[str]:
    """ハッシュタグを抽出する"""
    return re.findall(r'#([\\w\\u3040-\\u9fff]+)', text)

def mask_sensitive_info(text: str) -> str:
    """個人情報をマスキングする"""
    # 電話番号
    text = re.sub(r'\\d{3}-\\d{4}-\\d{4}', '***-****-****', text)
    # メールアドレス
    text = re.sub(r'[\\w.+-]+@[\\w.-]+', '****@****.***', text)
    # クレジットカード番号（簡易）
    text = re.sub(r'\\d{4}[- ]\\d{4}[- ]\\d{4}[- ]\\d{4}', '****-****-****-****', text)
    return text

# テスト
print("=== テキスト正規化 ===")
texts = [
    "Ｐｙｔｈｏｎ　プログラミング",
    "  複数の    スペース   ",
    "python3   version　3.12",
]
for t in texts:
    print(f"  {t!r}")
    print(f"  → {normalize_text(t)!r}")

print("\\n=== ハッシュタグ抽出 ===")
post = "今日は #Python の #正規表現 を勉強しました！ #プログラミング学習"
tags = extract_hashtags(post)
print(f"  投稿: {post}")
print(f"  タグ: {tags}")

print("\\n=== 個人情報マスク ===")
sensitive = "連絡先: 090-1234-5678 / tanaka@example.com"
print(f"  元: {sensitive}")
print(f"  マスク: {mask_sensitive_info(sensitive)}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="regex" lessonId="regex-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="regex-exercise" basePath="/learn/regex" />
    </div>
  );
}
