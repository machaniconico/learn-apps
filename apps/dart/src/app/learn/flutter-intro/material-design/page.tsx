import { DartEditor } from "@/components/dart-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("flutter-intro");

export default function MaterialDesignPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-blue-400 text-sm font-semibold">Flutter入門 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">マテリアルデザイン</h1>
        <p className="text-gray-400">MaterialAppとScaffoldを使ったマテリアルデザインの適用を学びます。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">Material Designとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          Material DesignはGoogleが提唱するデザインシステムです。FlutterはMaterial 3を標準でサポートし、
          一貫したUIを簡単に構築できます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <code className="text-blue-300">MaterialApp</code>: アプリのルートウィジェット</li>
          <li>• <code className="text-blue-300">Scaffold</code>: 画面の基本構造（AppBar・Body・FAB）</li>
          <li>• <code className="text-blue-300">ThemeData</code>: アプリ全体のテーマ設定</li>
          <li>• <code className="text-blue-300">ColorScheme</code>: カラーパレットの定義</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">MaterialAppの構造</h2>
        <p className="text-gray-400 mb-4">
          FlutterアプリのMaterialApp構造をDartコードで確認します。
        </p>
        <DartEditor
          defaultCode={`// MaterialApp の実際の構造（Flutter環境で動作）
// import 'package:flutter/material.dart';
//
// void main() => runApp(const MyApp());
//
// class MyApp extends StatelessWidget {
//   const MyApp({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Dart学習アプリ',
//       theme: ThemeData(
//         colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
//         useMaterial3: true,
//       ),
//       home: const HomeScreen(),
//     );
//   }
// }
//
// class HomeScreen extends StatelessWidget {
//   const HomeScreen({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text('ホーム')),
//       body: const Center(child: Text('Hello Flutter!')),
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {},
//         child: const Icon(Icons.add),
//       ),
//     );
//   }
// }

// Dartで概念を表現
class AppStructure {
  final String title;
  final String seedColor;
  final String homeTitle;

  const AppStructure({
    required this.title,
    required this.seedColor,
    required this.homeTitle,
  });

  void describe() {
    print('MaterialApp:');
    print('  title: \$title');
    print('  theme: seedColor=\$seedColor, Material3=true');
    print('  home: Scaffold(');
    print('    appBar: AppBar(title: "\$homeTitle")');
    print('    body: Center(child: Text("Hello Flutter!"))');
    print('    floatingActionButton: FAB(icon: add)');
    print('  )');
  }
}

void main() {
  final app = AppStructure(
    title: 'Dart学習アプリ',
    seedColor: 'teal',
    homeTitle: 'ホーム',
  );
  app.describe();
}`}
          expectedOutput={`MaterialApp:\n  title: Dart学習アプリ\n  theme: seedColor=teal, Material3=true\n  home: Scaffold(\n    appBar: AppBar(title: "ホーム")\n    body: Center(child: Text("Hello Flutter!"))\n    floatingActionButton: FAB(icon: add)\n  )`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ThemeDataの設定</h2>
        <p className="text-gray-400 mb-4">
          アプリ全体のテーマをThemeDataで一元管理する方法です。
        </p>
        <DartEditor
          defaultCode={`// Flutterテーマの概念コード

class ThemeConfig {
  final String seedColor;
  final bool useMaterial3;
  final String fontFamily;
  final double bodyFontSize;

  const ThemeConfig({
    required this.seedColor,
    this.useMaterial3 = true,
    this.fontFamily = 'NotoSansJP',
    this.bodyFontSize = 14.0,
  });

  Map<String, dynamic> toThemeData() => {
    'colorScheme': 'fromSeed(\$seedColor)',
    'useMaterial3': useMaterial3,
    'textTheme': {
      'bodyMedium': 'fontSize: \$bodyFontSize, fontFamily: \$fontFamily',
      'titleLarge': 'fontSize: \${bodyFontSize * 1.5}, bold',
    },
    'elevatedButtonTheme': 'rounded corners, \$seedColor',
    'appBarTheme': 'backgroundColor: \$seedColor surface',
  };
}

void main() {
  final theme = ThemeConfig(seedColor: 'teal');
  final themeData = theme.toThemeData();

  print('=== ThemeData 設定 ===');
  themeData.forEach((key, value) {
    if (value is Map) {
      print('\$key:');
      (value as Map).forEach((k, v) => print('  \$k: \$v'));
    } else {
      print('\$key: \$value');
    }
  });

  print('\\nMaterial 3のカラーロール:');
  const roles = ['primary', 'secondary', 'tertiary', 'error', 'surface', 'background'];
  for (final role in roles) {
    print('  \$role → \${role}Color / on\${role[0].toUpperCase()}\${role.substring(1)}Color');
  }
}`}
          expectedOutput={`=== ThemeData 設定 ===\ncolorScheme: fromSeed(teal)\nuseMaterial3: true\ntextTheme:\n  bodyMedium: fontSize: 14.0, fontFamily: NotoSansJP\n  titleLarge: fontSize: 21.0, bold\nelevatedButtonTheme: rounded corners, teal\nappBarTheme: backgroundColor: teal surface\n\nMaterial 3のカラーロール:\n  primary → primaryColor / onPrimaryColor\n  secondary → secondaryColor / onSecondaryColor\n  tertiary → tertiaryColor / onTertiaryColor\n  error → errorColor / onErrorColor\n  surface → surfaceColor / onSurfaceColor\n  background → backgroundColor / onBackgroundColor`}
        />
      </section>
      <LessonCompleteButton lessonId="material-design" categoryId="flutter-intro" />
      <LessonNav lessons={lessons} currentId="material-design" basePath="/learn/flutter-intro" />
    </div>
  );
}
