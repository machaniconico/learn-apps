import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InterfacesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">インターフェース</h1>
        <p className="text-gray-400">interface キーワードによる契約の定義、実装方法、IDisposable パターンの実例</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">インターフェースとは</h2>
        <p className="text-gray-400 mb-3">
          インターフェースは「このクラスはこれができる」という契約（コントラクト）を定義します。
          実装を持たないメソッド・プロパティ・イベントのシグネチャだけを宣言します（C# 8 以降はデフォルト実装も可）。
        </p>
        <p className="text-gray-400">
          インターフェースを実装するクラスはすべてのメンバーを実装しなければなりません。
          1つのクラスで複数のインターフェースを実装できるため、機能の組み合わせが柔軟に行えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">インターフェースの定義と実装</h2>
        <p className="text-gray-400 mb-4">
          インターフェース名は慣習的に <code className="text-indigo-400">I</code> で始めます（IComparable、IEnumerable など）。
          クラスと同様にコロン <code className="text-indigo-400">:</code> で実装を宣言します。
        </p>
        <CSharpEditor
          defaultCode={`using System;

interface IAnimal
{
    string Name { get; }
    void Speak();
    string GetDescription();
}

class Dog : IAnimal
{
    public string Name { get; }

    public Dog(string name)
    {
        Name = name;
    }

    public void Speak()
    {
        Console.WriteLine($"{Name}: ワン！");
    }

    public string GetDescription()
    {
        return $"犬の {Name}";
    }
}

class Program
{
    static void MakeSpeak(IAnimal animal)
    {
        Console.WriteLine(animal.GetDescription());
        animal.Speak();
    }

    static void Main()
    {
        IAnimal dog = new Dog("ポチ");
        MakeSpeak(dog);
    }
}`}
          expectedOutput={`犬の ポチ
ポチ: ワン！`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">IDisposable パターン</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-indigo-400">IDisposable</code> はリソース（ファイル・DB接続・ネットワーク等）を解放するための標準インターフェースです。
          <code className="text-indigo-400">using</code> ステートメントを使うと、スコープを抜けたときに自動的に <code className="text-indigo-400">Dispose()</code> が呼ばれます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class DatabaseConnection : IDisposable
{
    private bool _isOpen;
    private readonly string _connectionString;

    public DatabaseConnection(string connectionString)
    {
        _connectionString = connectionString;
        _isOpen = true;
        Console.WriteLine($"接続オープン: {connectionString}");
    }

    public void Query(string sql)
    {
        if (!_isOpen)
            throw new InvalidOperationException("接続がクローズされています");
        Console.WriteLine($"クエリ実行: {sql}");
    }

    public void Dispose()
    {
        if (_isOpen)
        {
            _isOpen = false;
            Console.WriteLine("接続クローズ");
        }
    }
}

class Program
{
    static void Main()
    {
        // using: スコープ終了時に Dispose() が自動呼び出し
        using (var conn = new DatabaseConnection("Server=localhost"))
        {
            conn.Query("SELECT * FROM Users");
        }
        // ここで自動的にクローズされる
        Console.WriteLine("処理完了");
    }
}`}
          expectedOutput={`接続オープン: Server=localhost
クエリ実行: SELECT * FROM Users
接続クローズ
処理完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="interfaces" />
      </div>
      <LessonNav lessons={lessons} currentId="interfaces" basePath="/learn/inheritance" />
    </div>
  );
}
