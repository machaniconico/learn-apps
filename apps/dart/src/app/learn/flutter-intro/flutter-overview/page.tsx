import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

export default function FlutterOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold">Flutter入門 レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Flutterとは</h1>
        <p className="text-gray-400">FlutterとDartの関係、クロスプラットフォーム開発の概要を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">FlutterとDartの関係</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          FlutterはGoogleが開発したオープンソースのUIフレームワークです。
          DartはFlutterの公式プログラミング言語で、DartとFlutterは切り離せない関係にあります。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• Flutter = UIフレームワーク + レンダリングエンジン（Skia/Impeller）</li>
          <li>• Dart = Flutter専用に最適化されたプログラミング言語</li>
          <li>• <code className="text-blue-300">iOS・Android・Web・Desktop</code> 対応</li>
          <li>• ホットリロードで開発サイクルが高速</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Flutterの特徴</h2>
        <p className="text-gray-400 mb-4">
          Flutterが他のクロスプラットフォームフレームワークと異なる点を確認します。
        </p>
        <DartEditor
          defaultCode={`// Flutterの特徴を表すDartコード

class FlutterFeature {
  final String name;
  final String description;

  const FlutterFeature(this.name, this.description);

  @override
  String toString() => '\$name: \$description';
}

void main() {
  const features = [
    FlutterFeature(
      'クロスプラットフォーム',
      '1つのコードベースでiOS/Android/Web/Desktop対応',
    ),
    FlutterFeature(
      '独自レンダリング',
      'ネイティブUIではなく独自エンジン（Impeller）で描画',
    ),
    FlutterFeature(
      'ホットリロード',
      'コード変更を秒単位でUIに反映（状態保持）',
    ),
    FlutterFeature(
      'Dart言語',
      'AOTコンパイルで高パフォーマンス、JITで開発効率',
    ),
    FlutterFeature(
      'リッチなウィジェット',
      'Material Design・Cupertinoの豊富なUIコンポーネント',
    ),
  ];

  print('=== Flutter の主な特徴 ===');
  for (int i = 0; i < features.length; i++) {
    print('\${i + 1}. \${features[i]}');
  }

  print('\\n対応プラットフォーム: \${["iOS", "Android", "Web", "Windows", "macOS", "Linux"].join(" / ")}');
}`}
          expectedOutput={`=== Flutter の主な特徴 ===\n1. クロスプラットフォーム: 1つのコードベースでiOS/Android/Web/Desktop対応\n2. 独自レンダリング: ネイティブUIではなく独自エンジン（Impeller）で描画\n3. ホットリロード: コード変更を秒単位でUIに反映（状態保持）\n4. Dart言語: AOTコンパイルで高パフォーマンス、JITで開発効率\n5. リッチなウィジェット: Material Design・Cupertinoの豊富なUIコンポーネント\n\n対応プラットフォーム: iOS / Android / Web / Windows / macOS / Linux`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Flutter環境のセットアップ</h2>
        <p className="text-gray-400 mb-4">
          Flutter開発を始めるための基本的な手順です。
        </p>
        <DartEditor
          defaultCode={`// Flutter セットアップ手順（概念コード）

void printSetupSteps() {
  final steps = [
    ('1. Flutter SDKをインストール', 'https://flutter.dev からダウンロード'),
    ('2. flutter doctorを実行', '必要なツールの状態確認'),
    ('3. IDEを設定', 'VS Code または Android Studio'),
    ('4. Flutter拡張機能をインストール', 'Flutter + Dart拡張機能'),
    ('5. 最初のアプリを作成', 'flutter create my_app'),
    ('6. アプリを実行', 'flutter run'),
  ];

  print('=== Flutter セットアップ手順 ===');
  for (final (step, detail) in steps) {
    print('\$step');
    print('   ↳ \$detail');
  }
}

void printUsefulCommands() {
  final commands = {
    'flutter create <name>': '新しいプロジェクト作成',
    'flutter run': 'アプリの実行',
    'flutter build apk': 'Android APKビルド',
    'flutter build ios': 'iOSビルド',
    'flutter test': 'テスト実行',
    'flutter pub get': 'パッケージ取得',
  };

  print('\\n=== よく使うFlutterコマンド ===');
  commands.forEach((cmd, desc) {
    print('\${cmd.padRight(25)} # \$desc');
  });
}

void main() {
  printSetupSteps();
  printUsefulCommands();
}`}
          expectedOutput={`=== Flutter セットアップ手順 ===\n1. Flutter SDKをインストール\n   ↳ https://flutter.dev からダウンロード\n2. flutter doctorを実行\n   ↳ 必要なツールの状態確認\n3. IDEを設定\n   ↳ VS Code または Android Studio\n4. Flutter拡張機能をインストール\n   ↳ Flutter + Dart拡張機能\n5. 最初のアプリを作成\n   ↳ flutter create my_app\n6. アプリを実行\n   ↳ flutter run\n\n=== よく使うFlutterコマンド ===\nflutter create <name>      # 新しいプロジェクト作成\nflutter run                # アプリの実行\nflutter build apk          # Android APKビルド\nflutter build ios          # iOSビルド\nflutter test               # テスト実行\nflutter pub get            # パッケージ取得`}
        />
      </section>
      <LessonCompleteButton lessonId="flutter-overview" categoryId="flutter-intro" />
      <LessonNav lessons={lessons} currentId="flutter-overview" basePath="/learn/flutter-intro" />
    </div>
  );
}
