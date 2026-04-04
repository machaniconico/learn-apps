import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function PartDirectivePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">パッケージ管理</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">partディレクティブ</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">part</strong>と<strong className="text-orange-300">part of</strong>ディレクティブを使うと、1つのライブラリを複数のファイルに分割できます。
            主に<code className="text-orange-300">json_serializable</code>や<code className="text-orange-300">freezed</code>などのコード生成ツールで自動的に使われます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">part / part of の仕組み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">part</code>でファイルを分割し、<code className="text-orange-300">part of</code>でどのライブラリに属するかを宣言します。
        </p>
        <DartEditor
          defaultCode={`// part/part of の使い方（コメントで説明）

/*
=== ファイル構成 ===

// lib/models.dart（メインファイル）
library models;

part 'src/user.dart';
part 'src/product.dart';

// lib/src/user.dart（パートファイル）
part of 'models.dart';

class User {
  final String name;
  User(this.name);
}

// lib/src/product.dart（パートファイル）
part of 'models.dart';

class Product {
  final String title;
  Product(this.title);
}
*/

// コード生成との関係（json_serializableの例）
/*
// user.dart
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';  // ← dart run build_runner build が生成

@JsonSerializable()
class User {
  final String name;
  final int age;

  User(this.name, this.age);

  factory User.fromJson(Map<String, dynamic> json) =>
      _\$UserFromJson(json);

  Map<String, dynamic> toJson() => _\$UserToJson(this);
}
*/

// 手動で同等の実装を示す
class User {
  final String name;
  final int age;

  User(this.name, this.age);

  factory User.fromJson(Map<String, dynamic> json) =>
      User(json['name'] as String, json['age'] as int);

  Map<String, dynamic> toJson() => {'name': name, 'age': age};

  @override
  String toString() => 'User(name: \$name, age: \$age)';
}

void main() {
  final user = User.fromJson({'name': '太郎', 'age': 25});
  print(user);
  print(user.toJson());

  print('\\npart ディレクティブの主な用途:');
  print('1. コード生成（json_serializable, freezed等）');
  print('2. 大きなライブラリのファイル分割');
  print('3. テストヘルパーのアクセス制御');
}`}
          expectedOutput={`User(name: 太郎, age: 25)
{name: 太郎, age: 25}

part ディレクティブの主な用途:
1. コード生成（json_serializable, freezed等）
2. 大きなライブラリのファイル分割
3. テストヘルパーのアクセス制御`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">export vs part の使い分け</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-orange-300">export</code>と<code className="text-orange-300">part</code>の違いと使い分けを理解しましょう。
        </p>
        <DartEditor
          defaultCode={`// export vs part の比較

void compareExportAndPart() {
  print('=== export vs part ===\\n');

  print('export:');
  print('  - 別の独立したライブラリとして定義');
  print('  - 各ファイルに独立したimportが必要');
  print('  - 推奨: ほとんどのケースで使用');
  print('  例: export "src/user.dart";');
  print('');

  print('part:');
  print('  - 同じライブラリの一部として扱われる');
  print('  - プライベートな識別子を共有できる');
  print('  - 主にコード生成ツールで使用');
  print('  例: part "user.g.dart";');
  print('');

  print('推奨: 通常はexportを使い、');
  print('  コード生成が必要な場合のみpartを使う');
}

void main() {
  compareExportAndPart();
}`}
          expectedOutput={`=== export vs part ===

export:
  - 別の独立したライブラリとして定義
  - 各ファイルに独立したimportが必要
  - 推奨: ほとんどのケースで使用
  例: export "src/user.dart";

part:
  - 同じライブラリの一部として扱われる
  - プライベートな識別子を共有できる
  - 主にコード生成ツールで使用
  例: part "user.g.dart";

推奨: 通常はexportを使い、
  コード生成が必要な場合のみpartを使う`}
        />
      </section>

      <LessonCompleteButton lessonId="part-directive" categoryId="packages" />
      <LessonNav lessons={lessons} currentId="part-directive" basePath="/learn/packages" />
    </div>
  );
}
