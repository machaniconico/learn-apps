import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function CreatingPackagesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">パッケージ管理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パッケージの作成</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            自分のコードをパッケージとして公開することで、コミュニティと共有できます。
            <code className="text-orange-300">dart create --template=package my_package</code>でパッケージテンプレートを作成し、
            <code className="text-orange-300">dart pub publish</code>でpub.devに公開します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パッケージの構造</h2>
        <p className="text-gray-400 mb-4">
          Dartパッケージの標準的なディレクトリ構造を理解しましょう。
        </p>
        <DartEditor
          defaultCode={`// Dartパッケージの標準構造
/*
my_package/
├── lib/
│   ├── my_package.dart      ← パブリックAPI（エントリポイント）
│   └── src/
│       ├── utils.dart       ← 内部実装
│       └── models.dart      ← 内部実装
├── test/
│   └── my_package_test.dart ← テスト
├── example/
│   └── main.dart            ← 使用例
├── pubspec.yaml             ← 設定
├── README.md                ← ドキュメント
├── CHANGELOG.md             ← 変更履歴
└── LICENSE                  ← ライセンス
*/

// lib/my_package.dart の例
// library my_package;
// export 'src/utils.dart';
// export 'src/models.dart' show PublicClass;

// 自作パッケージの模擬実装
class StringUtils {
  // 文字列の最初の文字を大文字にする
  static String capitalize(String s) {
    if (s.isEmpty) return s;
    return s[0].toUpperCase() + s.substring(1);
  }

  // キャメルケースをスネークケースに変換
  static String toSnakeCase(String s) {
    return s.replaceAllMapped(
      RegExp(r'[A-Z]'),
      (m) => '_\${m.group(0)!.toLowerCase()}',
    ).replaceFirst(RegExp(r'^_'), '');
  }
}

void main() {
  print(StringUtils.capitalize('hello world'));
  print(StringUtils.capitalize(''));
  print(StringUtils.toSnakeCase('helloWorld'));
  print(StringUtils.toSnakeCase('myFunctionName'));
  print(StringUtils.toSnakeCase('HTTPSClient'));
}`}
          expectedOutput={`Hello world

hello_world
my_function_name
h_t_t_p_s_client`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">パッケージの公開チェックリスト</h2>
        <p className="text-gray-400 mb-4">
          pub.devへ公開する前に確認すべき項目です。
        </p>
        <DartEditor
          defaultCode={`// 公開前チェックリストの確認
void checkPublishReadiness() {
  final checklist = [
    ('pubspec.yaml に name, description, version', true),
    ('README.md に使い方を記載', true),
    ('CHANGELOG.md に変更履歴', true),
    ('LICENSE ファイルが存在', true),
    ('dart analyze でエラーなし', true),
    ('dart test で全テスト通過', true),
    ('dart pub publish --dry-run で確認', true),
    ('pub.dev アカウントにログイン', true),
  ];

  print('=== 公開前チェックリスト ===');
  for (final (item, done) in checklist) {
    print('\${done ? "✓" : "✗"} \$item');
  }

  final ready = checklist.every((c) => c.\$2);
  print('\\n公開準備: \${ready ? "完了！" : "未完了"}');
  if (ready) {
    print('dart pub publish を実行してください');
  }
}

void main() {
  checkPublishReadiness();
}`}
          expectedOutput={`=== 公開前チェックリスト ===
✓ pubspec.yaml に name, description, version
✓ README.md に使い方を記載
✓ CHANGELOG.md に変更履歴
✓ LICENSE ファイルが存在
✓ dart analyze でエラーなし
✓ dart test で全テスト通過
✓ dart pub publish --dry-run で確認
✓ pub.dev アカウントにログイン

公開準備: 完了！
dart pub publish を実行してください`}
        />
      </section>

      <LessonCompleteButton lessonId="creating-packages" categoryId="packages" />
      <LessonNav lessons={lessons} currentId="creating-packages" basePath="/learn/packages" />
    </div>
  );
}
