import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function MultipleImplPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">複数インターフェース実装</h1>
        <p className="text-gray-400">複数のインターフェースを同時に実装する方法、明示的インターフェース実装による名前衝突解決</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">複数インターフェースの実装</h2>
        <p className="text-gray-400 mb-3">
          C# では1つのクラスが複数のインターフェースを実装できます。
          コンマ区切りで列挙するだけです。これにより「役割の組み合わせ」による柔軟な設計が可能になります。
        </p>
        <p className="text-gray-400">
          基底クラスと複数インターフェースを同時に指定する場合、基底クラスを最初に書きます：
          <code className="text-indigo-400"> class Derived : BaseClass, IFoo, IBar {"{ }"}</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">複数インターフェースの実装例</h2>
        <p className="text-gray-400 mb-4">
          異なる責務を持つインターフェースを組み合わせることで、柔軟なコンポーネント設計ができます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

interface ISaveable
{
    void Save();
}

interface ILoadable
{
    void Load();
}

interface IVersioned
{
    string Version { get; }
}

// 複数インターフェースを実装
class GameSave : ISaveable, ILoadable, IVersioned
{
    public string Version => "1.0.0";
    private int _level = 1;
    private int _score = 0;

    public void Save()
    {
        Console.WriteLine($"[{Version}] セーブ: レベル{_level}, スコア{_score}");
    }

    public void Load()
    {
        Console.WriteLine($"[{Version}] ロード完了");
        _level = 5;
        _score = 12500;
    }

    public void ShowStatus()
    {
        Console.WriteLine($"現在: レベル{_level}, スコア{_score}");
    }
}

class Program
{
    static void Main()
    {
        var save = new GameSave();
        save.ShowStatus();
        save.Load();
        save.ShowStatus();
        save.Save();
    }
}`}
          expectedOutput={`現在: レベル1, スコア0
[1.0.0] ロード完了
現在: レベル5, スコア12500
[1.0.0] セーブ: レベル5, スコア12500`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">明示的インターフェース実装</h2>
        <p className="text-gray-400 mb-4">
          2つのインターフェースに同名のメソッドがある場合、<code className="text-indigo-400">インターフェース名.メソッド名</code> の形式で
          明示的に実装を分けられます。この場合、インターフェース型を経由してのみ呼び出せます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

interface IEnglish
{
    void Greet();
}

interface IJapanese
{
    void Greet();
}

class Bilingual : IEnglish, IJapanese
{
    // 明示的実装: インターフェース名.メソッド名
    void IEnglish.Greet()
    {
        Console.WriteLine("Hello! Nice to meet you.");
    }

    void IJapanese.Greet()
    {
        Console.WriteLine("こんにちは！よろしくお願いします。");
    }
}

class Program
{
    static void Main()
    {
        var person = new Bilingual();

        // インターフェース型経由で呼び出す
        IEnglish eng = person;
        eng.Greet();

        IJapanese jpn = person;
        jpn.Greet();
    }
}`}
          expectedOutput={`Hello! Nice to meet you.
こんにちは！よろしくお願いします。`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="multiple-impl" />
      </div>
      <LessonNav lessons={lessons} currentId="multiple-impl" basePath="/learn/inheritance" />
    </div>
  );
}
