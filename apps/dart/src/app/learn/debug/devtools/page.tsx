import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DevtoolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">Dart DevTools</h1>
        <p className="text-gray-400">Dart DevToolsを使ったプロファイリングとデバッグの基本を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Dart DevToolsとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Dart DevToolsはDartとFlutterアプリのデバッグ・パフォーマンス計測ツールです。
          ブラウザベースのGUIで様々な情報を可視化できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-orange-300">dart devtools</code> コマンドで起動</li>
          <li>• メモリ使用量・CPU使用率のリアルタイム表示</li>
          <li>• ネットワークリクエストの監視</li>
          <li>• FlutterのWidgetツリーの可視化</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">dart:developerでDevToolsと連携</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">dart:developer</code>ライブラリを使ってDevToolsと連携できます。
        </p>
        <DartEditor
          defaultCode={`// dart:developerの活用（概念コード）
// import 'dart:developer' as dev;

// DevToolsで確認できるタイムライン記録
void expensiveOperation(String name) {
  // dev.Timeline.startSync(name);
  // ... 処理 ...
  // dev.Timeline.finishSync();
  print('[Timeline] \$name: 完了');
}

// デバッガでの一時停止
void debugBreakpoint() {
  // dev.debugger(when: condition, message: 'ブレークポイント');
  print('[Debugger] ブレークポイント設定済み');
}

// オブジェクトをDevToolsに登録
void registerObject(String name, dynamic obj) {
  // dev.registerExtension('ext.myapp.inspect', ...);
  print('[DevTools] \$name を登録: \$obj');
}

void main() {
  print('=== Dart DevTools 連携 ===');

  expensiveOperation('データ処理');
  expensiveOperation('ネットワーク通信');

  debugBreakpoint();

  registerObject('config', {'debug': true, 'version': '1.0.0'});

  print('\\nDevTools起動方法:');
  print('  1. dart run --observe your_app.dart');
  print('  2. dart devtools でUIを開く');
  print('  3. VMサービスURLを接続');
}`}
          expectedOutput={`=== Dart DevTools 連携 ===\n[Timeline] データ処理: 完了\n[Timeline] ネットワーク通信: 完了\n[Debugger] ブレークポイント設定済み\n[DevTools] config を登録: {debug: true, version: 1.0.0}\n\nDevTools起動方法:\n  1. dart run --observe your_app.dart\n  2. dart devtools でUIを開く\n  3. VMサービスURLを接続`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">メモリリークの検出パターン</h2>
        <p className="text-gray-400 mb-4">
          メモリリークを防ぐためのコーディングパターンです。
        </p>
        <DartEditor
          defaultCode={`// リソース管理パターン
class Resource {
  final String name;
  bool _disposed = false;

  Resource(this.name) {
    print('[\$name] 生成');
  }

  void use() {
    if (_disposed) throw StateError('[\$name] 既に破棄済み');
    print('[\$name] 使用中');
  }

  void dispose() {
    _disposed = true;
    print('[\$name] 破棄');
  }
}

// Dart にはusing/withがないためtry-finallyを使う
void withResource(String name, void Function(Resource) action) {
  final resource = Resource(name);
  try {
    action(resource);
  } finally {
    resource.dispose();
  }
}

void main() {
  withResource('DB接続', (db) {
    db.use();
    db.use();
  });

  print('');

  withResource('ファイル', (file) {
    file.use();
    // エラーが発生してもdisposeが保証される
  });
}`}
          expectedOutput={`[DB接続] 生成\n[DB接続] 使用中\n[DB接続] 使用中\n[DB接続] 破棄\n\n[ファイル] 生成\n[ファイル] 使用中\n[ファイル] 破棄`}
        />
      </section>
      <LessonCompleteButton lessonId="devtools" categoryId="debug" />
      <LessonNav lessons={lessons} currentId="devtools" basePath="/learn/debug" />
    </div>
  );
}
