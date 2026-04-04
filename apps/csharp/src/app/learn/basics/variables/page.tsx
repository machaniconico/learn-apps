import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function VariablesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">変数</h1>
        <p className="text-gray-400">変数の宣言・代入・命名規則（PascalCase/camelCase）を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">変数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          変数はデータを保存するための「名前付きの箱」です。C#では変数を使う前に必ず<strong className="text-white">型</strong>を宣言する必要があります。
          宣言の書き方は <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">型名 変数名;</code> または
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">型名 変数名 = 初期値;</code> です。
        </p>
        <p className="text-gray-300 leading-relaxed">
          C#は<strong className="text-white">静的型付け言語</strong>なので、一度宣言した変数の型は変更できません。
          これによりコンパイル時に型エラーを検出でき、バグを早期に発見できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">変数の宣言と代入</h2>
        <p className="text-gray-400 mb-4">主要な型を使った変数の宣言例です。</p>
        <CSharpEditor
          defaultCode={`// 変数の宣言と初期化
int age = 25;
double height = 170.5;
string name = "田中太郎";
bool isStudent = true;
char grade = 'A';

Console.WriteLine($"名前: {name}");
Console.WriteLine($"年齢: {age}");
Console.WriteLine($"身長: {height}cm");
Console.WriteLine($"学生: {isStudent}");
Console.WriteLine($"成績: {grade}");

// 宣言後に代入
int score;
score = 95;
Console.WriteLine($"スコア: {score}");`}
          expectedOutput={`名前: 田中太郎
年齢: 25
身長: 170.5cm
学生: True
成績: A
スコア: 95`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C#の命名規則</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C#には一般的に使われる命名規則があります。規則を守ることでコードの可読性が向上します。
        </p>
        <ul className="space-y-3 text-gray-300">
          <li>
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">PascalCase</code>
            <span className="ml-2">— クラス・メソッド・プロパティ名。例：<code className="text-purple-400 bg-gray-800 px-1 rounded">UserName</code>, <code className="text-purple-400 bg-gray-800 px-1 rounded">GetTotal()</code></span>
          </li>
          <li>
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">camelCase</code>
            <span className="ml-2">— ローカル変数・パラメータ名。例：<code className="text-purple-400 bg-gray-800 px-1 rounded">userName</code>, <code className="text-purple-400 bg-gray-800 px-1 rounded">totalCount</code></span>
          </li>
          <li>
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">_camelCase</code>
            <span className="ml-2">— プライベートフィールド。例：<code className="text-purple-400 bg-gray-800 px-1 rounded">_userName</code></span>
          </li>
          <li>
            <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">ALL_CAPS</code>
            <span className="ml-2">— C#では使わない（constもPascalCase）</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">命名規則の実例</h2>
        <p className="text-gray-400 mb-4">実際のコードでどのように命名するか確認しましょう。</p>
        <CSharpEditor
          defaultCode={`// ローカル変数はcamelCase
int studentAge = 20;
string firstName = "花子";
string lastName = "山田";
double averageScore = 85.5;

// 定数はPascalCase
const int MaxScore = 100;
const string DefaultName = "名無し";

// 出力
string fullName = $"{lastName} {firstName}";
Console.WriteLine($"氏名: {fullName}");
Console.WriteLine($"年齢: {studentAge}歳");
Console.WriteLine($"平均点: {averageScore} / {MaxScore}");`}
          expectedOutput={`氏名: 山田 花子
年齢: 20歳
平均点: 85.5 / 100`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="variables" />
      </div>
      <LessonNav lessons={lessons} currentId="variables" basePath="/learn/basics" />
    </div>
  );
}
