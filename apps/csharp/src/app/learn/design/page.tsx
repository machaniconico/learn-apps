import { CSharpEditor } from "@/components/csharp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400 mb-2">デザインパターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          GoFデザインパターンをC#で学びましょう。Singleton・Factory・Observer・Strategy・Decorator・DIパターンを通じて、再利用性と保守性の高い設計を身につけます。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={6} color="pink" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="pink" categoryId="design" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デザインパターンとは</h2>
        <p className="text-gray-400 mb-4">
          デザインパターンはソフトウェア設計における再利用可能な解決策のカタログです。GoF（Gang of Four）が提唱した23のパターンのうち、C#開発でよく使われる6つを学びます。
        </p>
        <CSharpEditor
          defaultCode={`// デザインパターンの目的を示す例
Console.WriteLine("デザインパターンの目的");
Console.WriteLine();
Console.WriteLine("生成パターン (Creational):");
Console.WriteLine("  Singleton: インスタンスを1つに制限");
Console.WriteLine("  Factory:   オブジェクト生成を抽象化");
Console.WriteLine();
Console.WriteLine("構造パターン (Structural):");
Console.WriteLine("  Decorator: 機能を動的に追加");
Console.WriteLine();
Console.WriteLine("振る舞いパターン (Behavioral):");
Console.WriteLine("  Observer:  イベント通知の仕組み");
Console.WriteLine("  Strategy:  アルゴリズムの切り替え");
Console.WriteLine("  DI:        依存性の注入");`}
          expectedOutput={`デザインパターンの目的

生成パターン (Creational):
  Singleton: インスタンスを1つに制限
  Factory:   オブジェクト生成を抽象化

構造パターン (Structural):
  Decorator: 機能を動的に追加

振る舞いパターン (Behavioral):
  Observer:  イベント通知の仕組み
  Strategy:  アルゴリズムの切り替え
  DI:        依存性の注入`}
        />
      </section>
    </div>
  );
}
