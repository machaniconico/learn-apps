import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function GettersSettersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-orange-400 text-sm font-semibold uppercase tracking-wide">クラス基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ゲッター・セッター</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-orange-300">get</strong>キーワードでゲッター（読み取り専用プロパティ）、
            <strong className="text-orange-300">set</strong>キーワードでセッター（書き込み用プロパティ）を定義します。
            フィールドへのアクセスを制御し、バリデーションや計算を挟めます。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ゲッターの基本</h2>
        <p className="text-gray-400 mb-4">
          ゲッターはメソッドのように処理を持ちますが、プロパティとして呼び出せます（括弧不要）。
        </p>
        <DartEditor
          defaultCode={`class Circle {
  double _radius;

  Circle(this._radius);

  // ゲッター（計算プロパティ）
  double get radius => _radius;
  double get diameter => _radius * 2;
  double get area => 3.14159 * _radius * _radius;
  double get circumference => 2 * 3.14159 * _radius;
  bool get isUnit => _radius == 1.0;

  @override
  String toString() => 'Circle(r=\$_radius)';
}

void main() {
  var c = Circle(5.0);

  // プロパティとして呼び出す（括弧不要）
  print('半径: \${c.radius}');
  print('直径: \${c.diameter}');
  print('面積: \${c.area.toStringAsFixed(2)}');
  print('周長: \${c.circumference.toStringAsFixed(2)}');
  print('単位円: \${c.isUnit}');

  var unit = Circle(1.0);
  print('単位円: \${unit.isUnit}');
}`}
          expectedOutput={`半径: 5.0
直径: 10.0
面積: 78.54
周長: 31.42
単位円: false
単位円: true`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">セッターとバリデーション</h2>
        <p className="text-gray-400 mb-4">
          セッターで値の設定時にバリデーションや変換処理を行えます。
        </p>
        <DartEditor
          defaultCode={`class Person {
  String _name;
  int _age;

  Person(this._name, this._age);

  // ゲッター
  String get name => _name;
  int get age => _age;

  // セッター（バリデーション付き）
  set name(String value) {
    if (value.isEmpty) throw ArgumentError('名前は空にできません');
    _name = value.trim();
  }

  set age(int value) {
    if (value < 0 || value > 150) {
      throw ArgumentError('年齢は0〜150の範囲で入力してください');
    }
    _age = value;
  }

  String get ageGroup => switch (_age) {
    < 13  => '子ども',
    < 20  => '10代',
    < 30  => '20代',
    < 40  => '30代',
    _     => '40代以上',
  };

  @override
  String toString() => '\$_name (\$_age歳, \$ageGroup)';
}

void main() {
  var p = Person('Alice', 25);
  print(p);

  p.name = '  Bob  '; // トリムされる
  p.age = 17;
  print(p);

  try {
    p.age = -1; // エラー
  } catch (e) {
    print('エラー: \$e');
  }
}`}
          expectedOutput={`Alice (25歳, 20代)
Bob (17歳, 10代)
エラー: Invalid argument(s): 年齢は0〜150の範囲で入力してください`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ゲッターとセッターの応用</h2>
        <p className="text-gray-400 mb-4">
          ゲッターとセッターを使って、異なる単位や形式間の変換を透過的に行えます。
        </p>
        <DartEditor
          defaultCode={`class Angle {
  double _radians;

  Angle(this._radians);

  // 度数法のゲッター・セッター
  double get degrees => _radians * 180 / 3.14159;
  set degrees(double deg) => _radians = deg * 3.14159 / 180;

  // ラジアンのゲッター・セッター
  double get radians => _radians;
  set radians(double rad) => _radians = rad;

  // 正規化（0〜360度に収める）
  Angle get normalized {
    double d = degrees % 360;
    if (d < 0) d += 360;
    return Angle(d * 3.14159 / 180);
  }

  @override
  String toString() =>
    '\${degrees.toStringAsFixed(1)}° (\${_radians.toStringAsFixed(4)} rad)';
}

void main() {
  var a = Angle(3.14159 / 2); // π/2 ラジアン
  print('90度: \$a');

  a.degrees = 180;
  print('180度: \$a');

  a.degrees = 45;
  print('45度: \$a');

  var reflex = Angle(0);
  reflex.degrees = 270;
  print('270度: \$reflex');
}`}
          expectedOutput={`90度: 90.0° (1.5708 rad)
180度: 180.0° (3.1416 rad)
45度: 45.0° (0.7854 rad)
270度: 270.0° (4.7124 rad)`}
        />
      </section>

      <LessonCompleteButton lessonId="getters-setters" categoryId="classes" />
      <LessonNav lessons={lessons} currentId="getters-setters" basePath="/learn/classes" />
    </div>
  );
}
