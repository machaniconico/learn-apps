import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PackageManagementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">パッケージ管理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">パッケージ管理</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartのパッケージ管理ツール<strong className="text-orange-300">pub</strong>を使ってパッケージを管理します。
            <code className="text-orange-300">dart pub get</code>でインストール、<code className="text-orange-300">dart pub upgrade</code>で更新、
            <code className="text-orange-300">dart pub outdated</code>で古くなったパッケージを確認できます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">pubコマンドの基本</h2>
        <p className="text-gray-400 mb-4">
          主要な<code className="text-orange-300">dart pub</code>コマンドを覚えましょう。
        </p>
        <DartEditor
          defaultCode={`// dart pub コマンドの使い方（コメントで解説）

/*
# パッケージのインストール
dart pub get

# 特定のパッケージを追加（pubspec.yamlに追記してからget）
dart pub add http
dart pub add --dev test

# パッケージの更新
dart pub upgrade           # 全パッケージを更新
dart pub upgrade http      # 特定パッケージのみ更新

# 古いパッケージの確認
dart pub outdated

# パッケージの削除
dart pub remove http

# キャッシュのクリア
dart pub cache clean
*/

// インストール済みパッケージの使用例
import 'dart:convert';
import 'dart:math';

void main() {
  // dart:convert (標準ライブラリ)
  final data = {'name': 'Dart', 'version': 3};
  final json = jsonEncode(data);
  print('JSON: \$json');

  // dart:math (標準ライブラリ)
  print('sqrt(144) = \${sqrt(144)}');
  print('pow(2, 8) = \${pow(2, 8)}');

  // パッケージのバージョン表記
  final constraints = {
    '^1.0.0': '1.0.0以上2.0.0未満',
    '>=1.0.0 <2.0.0': '範囲指定',
    '1.0.0': '完全一致',
  };
  constraints.forEach((k, v) => print('\$k → \$v'));
}`}
          expectedOutput={`JSON: {"name":"Dart","version":3}
sqrt(144) = 12.0
pow(2, 8) = 256.0
^1.0.0 → 1.0.0以上2.0.0未満
>=1.0.0 <2.0.0 → 範囲指定
1.0.0 → 完全一致`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">よく使うパッケージ</h2>
        <p className="text-gray-400 mb-4">
          Dartの人気パッケージとその用途を確認しましょう。
        </p>
        <DartEditor
          defaultCode={`// 人気パッケージの紹介（使用例コード）

// http: HTTPクライアント
// import 'package:http/http.dart' as http;
// final resp = await http.get(Uri.parse('https://api.example.com'));

// path: パス操作
// import 'package:path/path.dart' as p;
// final fullPath = p.join('/home', 'user', 'docs', 'file.txt');

// intl: 国際化・日付フォーマット
// import 'package:intl/intl.dart';
// final fmt = DateFormat('yyyy/MM/dd');
// print(fmt.format(DateTime.now()));

// json_annotation + json_serializable: JSONシリアライズ
// @JsonSerializable()
// class User { ... }

// 標準ライブラリで同等の処理を示す
void main() {
  // 日付フォーマット（intlなし）
  final now = DateTime.now();
  final formatted = '\${now.year}/\${now.month.toString().padLeft(2,'0')}/\${now.day.toString().padLeft(2,'0')}';
  print('日付: \$formatted');

  // パス結合（pathなし）
  final parts = ['/home', 'user', 'docs', 'file.txt'];
  final path = parts.join('/');
  print('パス: \$path');

  // よく使うパッケージ一覧
  final packages = [
    'http          - HTTPクライアント',
    'dio           - 高機能HTTPクライアント',
    'path          - パス操作',
    'intl          - 国際化',
    'logger        - ロギング',
    'equatable     - 値オブジェクト',
    'freezed       - イミュータブルクラス',
    'riverpod      - 状態管理（Flutter）',
  ];
  packages.forEach(print);
}`}
          expectedOutput={`日付: 2024/01/15
パス: /home/user/docs/file.txt
http          - HTTPクライアント
dio           - 高機能HTTPクライアント
path          - パス操作
intl          - 国際化
logger        - ロギング
equatable     - 値オブジェクト
freezed       - イミュータブルクラス
riverpod      - 状態管理（Flutter）`}
        />
      </section>

      <LessonCompleteButton lessonId="package-management" categoryId="packages" />
      <LessonNav lessons={lessons} currentId="package-management" basePath="/learn/packages" />
    </div>
  );
}
