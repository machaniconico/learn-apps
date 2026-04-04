import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PackagesExercisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ管理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パッケージ管理演習</h1>
        <p className="text-gray-400">
          pip・venv・requirements.txt・Poetry に関する知識を確認する実践的な問題に取り組みましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習1: requirements.txt をパースする</h2>
        <p className="text-gray-400 mb-4">
          requirements.txt の内容をパースして、パッケージ名とバージョン指定を辞書として返す関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`import re

requirements_txt = """
# 本番環境の依存
requests==2.31.0
flask>=2.3.0,<3.0.0
sqlalchemy~=2.0
python-dotenv>=1.0.0

# バージョン指定なし
pillow

# コメント行とバージョン指定なし
#pytest==7.4.0
"""

def parse_requirements(text: str) -> list[dict]:
    """requirements.txt をパースしてパッケージ情報のリストを返す"""
    result = []
    for line in text.strip().splitlines():
        line = line.strip()
        # コメント行と空行をスキップ
        if not line or line.startswith("#"):
            continue

        # TODO: パッケージ名とバージョン指定を分離して result に追加
        # ヒント: re.split(r'(==|>=|<=|~=|!=|>|<)', line, maxsplit=1) を使う

        # とりあえず全体を名前として追加（後で改善）
        result.append({"name": line, "version_spec": ""})

    return result

packages = parse_requirements(requirements_txt)
print(f"{len(packages)} パッケージを検出:")
for pkg in packages:
    print(f"  {pkg['name']!r:30s} {pkg['version_spec']}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習2: 依存関係の互換性チェック</h2>
        <p className="text-gray-400 mb-4">
          バージョン文字列を比較して、指定した条件を満たすかチェックする関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`def parse_version(version_str: str) -> tuple:
    """バージョン文字列をタプルに変換 ('1.2.3' → (1, 2, 3))"""
    try:
        return tuple(int(x) for x in version_str.split("."))
    except ValueError:
        return (0,)

def is_compatible(installed: str, required: str) -> bool:
    """インストール済みバージョンが要件を満たすかチェック"""
    installed_v = parse_version(installed)

    # 演算子とバージョンを分離
    import re
    match = re.match(r'([><=!~]+)([\d.]+)', required)
    if not match:
        return True  # バージョン指定なし

    op, ver_str = match.groups()
    required_v = parse_version(ver_str)

    if op == "==":
        return installed_v == required_v
    elif op == ">=":
        return installed_v >= required_v
    elif op == ">":
        return installed_v > required_v
    elif op == "<=":
        return installed_v <= required_v
    elif op == "<":
        return installed_v < required_v
    # TODO: ~= (互換バージョン) の実装
    return True

# テスト
test_cases = [
    ("2.31.0", "==2.31.0", True),
    ("2.32.0", "==2.31.0", False),
    ("2.31.0", ">=2.28.0", True),
    ("2.27.0", ">=2.28.0", False),
    ("3.0.0", "<3.0.0", False),
    ("2.9.9", "<3.0.0", True),
]

print("互換性チェック:")
for installed, req, expected in test_cases:
    result = is_compatible(installed, req)
    status = "OK" if result == expected else "NG"
    print(f"  [{status}] {installed} {req}: {result}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">演習3: プロジェクト設定の生成</h2>
        <p className="text-gray-400 mb-4">
          プロジェクト名・バージョン・依存パッケージのリストを受け取り、
          pyproject.toml の内容を文字列として生成する関数を実装してください。
        </p>
        <PythonPlayground
          defaultCode={`def generate_pyproject(
    name: str,
    version: str,
    description: str,
    author: str,
    dependencies: dict[str, str],
    dev_dependencies: dict[str, str] | None = None
) -> str:
    """pyproject.toml の内容を生成する"""
    lines = [
        "[tool.poetry]",
        f'name = "{name}"',
        f'version = "{version}"',
        f'description = "{description}"',
        f'authors = ["{author}"]',
        "",
        "[tool.poetry.dependencies]",
        'python = "^3.11"',
    ]

    for pkg, ver in dependencies.items():
        lines.append(f'{pkg} = "{ver}"')

    if dev_dependencies:
        lines.extend(["", "[tool.poetry.group.dev.dependencies]"])
        for pkg, ver in dev_dependencies.items():
            lines.append(f'{pkg} = "{ver}"')

    lines.extend([
        "",
        "[build-system]",
        'requires = ["poetry-core"]',
        'build-backend = "poetry.core.masonry.api"',
    ])

    return "\\n".join(lines)

# テスト
result = generate_pyproject(
    name="my-web-app",
    version="0.1.0",
    description="FlaskベースのWebアプリ",
    author="田中太郎 <tanaka@example.com>",
    dependencies={"flask": "^3.0.0", "sqlalchemy": "^2.0.0"},
    dev_dependencies={"pytest": "^7.4.0", "black": "^23.0.0"},
)
print(result)
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="packages" lessonId="packages-exercise" />
      </div>
      <LessonNav lessons={lessons} currentId="packages-exercise" basePath="/learn/packages" />
    </div>
  );
}
