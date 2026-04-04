import { DartEditor } from "@/components/dart-editor";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { LessonNav } from "@/components/lesson-nav";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function SortingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wide">コレクション</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ソート</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            Dartの<strong className="text-cyan-300">sort()</strong>メソッドはリストをインプレースでソートします。
            引数なしでは自然順序（Comparable）でソートし、
            <code className="text-cyan-300">Comparator</code>関数を渡すことでカスタムソートができます。
            元のリストを変更したくない場合は<code className="text-cyan-300">sorted()</code>拡張や事前コピーを使います。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">基本的なソート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sort()</code>は元のリストを変更します。<code className="text-cyan-300">compareTo</code>の結果でソート順が決まります。
        </p>
        <DartEditor
          defaultCode={`void main() {
  // 数値のソート
  final numbers = [5, 2, 8, 1, 9, 3, 7, 4, 6];
  numbers.sort();
  print('昇順: \$numbers');

  // 降順ソート
  numbers.sort((a, b) => b.compareTo(a));
  print('降順: \$numbers');

  // 文字列のソート
  final words = ['banana', 'apple', 'cherry', 'date', 'elderberry'];
  words.sort();
  print('アルファベット順: \$words');

  // 文字列の長さでソート
  words.sort((a, b) => a.length.compareTo(b.length));
  print('長さ順: \$words');

  // 元のリストを変更せずにソート
  final original = [3, 1, 4, 1, 5, 9];
  final sorted = [...original]..sort();
  print('元: \$original');
  print('ソート済み: \$sorted');

  // 日本語のソート
  final fruits = ['みかん', 'りんご', 'バナナ', 'ぶどう'];
  fruits.sort();
  print('日本語: \$fruits');
}`}
          expectedOutput={`昇順: [1, 2, 3, 4, 5, 6, 7, 8, 9]
降順: [9, 8, 7, 6, 5, 4, 3, 2, 1]
アルファベット順: [apple, banana, cherry, date, elderberry]
長さ順: [date, apple, banana, cherry, elderberry]
元: [3, 1, 4, 1, 5, 9]
ソート済み: [1, 1, 3, 4, 5, 9]
日本語: [バナナ, みかん, ぶどう, りんご]`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">オブジェクトのカスタムソート</h2>
        <p className="text-gray-400 mb-4">
          複数のフィールドを使った複合ソートや、<code className="text-cyan-300">Comparable</code>の実装でクラスにソート順を定義します。
        </p>
        <DartEditor
          defaultCode={`class Student {
  String name;
  int grade;
  double gpa;

  Student(this.name, this.grade, this.gpa);

  @override
  String toString() => '\$name(学年:\$grade, GPA:\$gpa)';
}

void main() {
  final students = [
    Student('Alice', 3, 3.8),
    Student('Bob', 1, 3.5),
    Student('Carol', 2, 3.9),
    Student('Dave', 1, 3.7),
    Student('Eve', 2, 3.5),
  ];

  // GPA 降順
  final byGpa = [...students]
    ..sort((a, b) => b.gpa.compareTo(a.gpa));
  print('GPA順:');
  byGpa.forEach(print);

  print('');

  // 学年昇順 → GPA降順（複合ソート）
  final byGradeGpa = [...students]
    ..sort((a, b) {
      final gradeComp = a.grade.compareTo(b.grade);
      if (gradeComp != 0) return gradeComp;
      return b.gpa.compareTo(a.gpa); // 同学年ならGPA降順
    });
  print('学年+GPA順:');
  byGradeGpa.forEach(print);
}`}
          expectedOutput={`GPA順:
Carol(学年:2, GPA:3.9)
Alice(学年:3, GPA:3.8)
Dave(学年:1, GPA:3.7)
Bob(学年:1, GPA:3.5)
Eve(学年:2, GPA:3.5)

学年+GPA順:
Dave(学年:1, GPA:3.7)
Bob(学年:1, GPA:3.5)
Carol(学年:2, GPA:3.9)
Eve(学年:2, GPA:3.5)
Alice(学年:3, GPA:3.8)`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">安定ソートと特殊なソート</h2>
        <p className="text-gray-400 mb-4">
          Dartの<code className="text-cyan-300">sort()</code>は安定ソートです。<code className="text-cyan-300">Comparable</code>インターフェースを実装したクラスは引数なしでソートできます。
        </p>
        <DartEditor
          defaultCode={`class Priority implements Comparable<Priority> {
  static const high = Priority._('高', 1);
  static const medium = Priority._('中', 2);
  static const low = Priority._('低', 3);

  final String label;
  final int value;
  const Priority._(this.label, this.value);

  @override
  int compareTo(Priority other) => value.compareTo(other.value);

  @override
  String toString() => label;
}

class Task {
  String title;
  Priority priority;

  Task(this.title, this.priority);

  @override
  String toString() => '[\$priority] \$title';
}

void main() {
  final tasks = [
    Task('メール返信', Priority.low),
    Task('バグ修正', Priority.high),
    Task('コードレビュー', Priority.medium),
    Task('デプロイ', Priority.high),
    Task('ドキュメント更新', Priority.low),
    Task('テスト実行', Priority.medium),
  ];

  tasks.sort((a, b) => a.priority.compareTo(b.priority));

  print('優先度順タスク:');
  for (final task in tasks) {
    print('  \$task');
  }
}`}
          expectedOutput={`優先度順タスク:
  [高] バグ修正
  [高] デプロイ
  [中] コードレビュー
  [中] テスト実行
  [低] メール返信
  [低] ドキュメント更新`}
        />
      </section>

      <LessonCompleteButton lessonId="sorting" categoryId="collections" />
      <LessonNav lessons={lessons} currentId="sorting" basePath="/learn/collections" />
    </div>
  );
}
