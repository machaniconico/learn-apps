import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Djangoセットアップ</h1>
        <p className="text-gray-400">Djangoプロジェクトとアプリの作成、開発サーバーの起動方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">インストールとプロジェクト作成</h2>
        <p className="text-gray-400 mb-4">
          Djangoはpipでインストールし、<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">django-admin startproject</code>でプロジェクトのひな形を生成します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# インストール
pip install django

# バージョン確認
python -m django --version

# プロジェクト作成
django-admin startproject mysite

# アプリケーション作成
cd mysite
python manage.py startapp blog

# 開発サーバー起動
python manage.py runserver
# → http://127.0.0.1:8000/ でアクセス可能`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">プロジェクトの構造</h2>
        <p className="text-gray-400 mb-4">
          Djangoは<strong className="text-white">プロジェクト</strong>（全体の設定）と
          <strong className="text-white">アプリ</strong>（機能単位のモジュール）に分かれています。
          一つのプロジェクトに複数のアプリを持つことができます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-300 whitespace-pre">{`mysite/
├── manage.py           # コマンドラインツール
├── mysite/
│   ├── __init__.py
│   ├── settings.py     # プロジェクト設定
│   ├── urls.py         # URLディスパッチャー
│   ├── asgi.py
│   └── wsgi.py
└── blog/               # アプリケーション
    ├── migrations/     # DBマイグレーション
    ├── admin.py        # 管理画面の設定
    ├── apps.py
    ├── models.py       # データモデル
    ├── tests.py
    ├── urls.py
    └── views.py        # ビュー関数`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">settings.pyの主要設定</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">settings.py</code>でデータベース・インストールアプリ・タイムゾーンなどを設定します。
          作成したアプリは<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">INSTALLED_APPS</code>に追加する必要があります。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`# mysite/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',  # 作成したアプリを追加
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LANGUAGE_CODE = 'ja'
TIME_ZONE = 'Asia/Tokyo'`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Djangoプロジェクトの構造を理解する</h2>
        <p className="text-gray-400 mb-4">
          Djangoの設定システムと各コンポーネントの関係をPythonで確認してみましょう。
        </p>
        <PythonPlayground defaultCode={`# Djangoの設定システムをシミュレート

class Settings:
    """settings.py の簡易版"""
    def __init__(self):
        self.DEBUG = True
        self.INSTALLED_APPS = [
            "django.contrib.admin",
            "django.contrib.auth",
            "blog",
        ]
        self.DATABASES = {
            "default": {
                "ENGINE": "sqlite3",
                "NAME": "db.sqlite3",
            }
        }
        self.LANGUAGE_CODE = "ja"
        self.TIME_ZONE = "Asia/Tokyo"

    def validate(self):
        errors = []
        if not self.INSTALLED_APPS:
            errors.append("INSTALLED_APPSが空です")
        if "default" not in self.DATABASES:
            errors.append("defaultデータベースが設定されていません")
        return errors

class DjangoApp:
    """アプリケーションの設定"""
    def __init__(self, name, label=None):
        self.name = name
        self.label = label or name.split(".")[-1]

    def __repr__(self):
        return f"<App: {self.name}>"

settings = Settings()

# 設定の検証
errors = settings.validate()
if errors:
    print("設定エラー:", errors)
else:
    print("設定: 正常")

# インストール済みアプリの表示
print(f"\\nインストール済みアプリ ({len(settings.INSTALLED_APPS)}個):")
for app_path in settings.INSTALLED_APPS:
    app = DjangoApp(app_path)
    print(f"  {app}")

print(f"\\nデータベース: {settings.DATABASES['default']['ENGINE']}")
print(f"タイムゾーン: {settings.TIME_ZONE}")
print(f"言語: {settings.LANGUAGE_CODE}")

# manage.pyのコマンドをシミュレート
commands = {
    "runserver": "開発サーバーを起動",
    "makemigrations": "マイグレーションファイルを生成",
    "migrate": "データベースにマイグレーションを適用",
    "createsuperuser": "スーパーユーザーを作成",
    "shell": "Pythonシェルを起動",
    "test": "テストを実行",
}

print("\\npython manage.py で使えるコマンド:")
for cmd, desc in commands.items():
    print(f"  {cmd:<20} {desc}")`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="setup" />
      <LessonNav lessons={lessons} currentId="setup" basePath="/learn/django" />
    </div>
  );
}
