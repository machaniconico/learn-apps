import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("generics");

export default function GenericPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">ジェネリクス レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ジェネリックパターン</h1>
        <p className="text-gray-400">ジェネリクスを活用した実用設計パターン。リポジトリパターン、Result型、ジェネリック制約の組み合わせ</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">実用的なジェネリックパターン</h2>
        <p className="text-gray-400 mb-3">
          ジェネリクスは単なる型の抽象化にとどまらず、実用的なデザインパターンの実装にも欠かせません。
          よく使われるパターンを見ていきましょう。
        </p>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li><strong className="text-white">リポジトリパターン</strong>: データアクセスを型安全に抽象化</li>
          <li><strong className="text-white">Result 型</strong>: 成功・失敗を型で表現（エラー処理）</li>
          <li><strong className="text-white">ジェネリックキャッシュ</strong>: 任意の型の値をキャッシュ</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ジェネリックリポジトリパターン</h2>
        <p className="text-gray-400 mb-4">
          リポジトリパターンはデータアクセスを抽象化します。
          ジェネリクスを使うと、エンティティごとに同じコードを書く必要がなくなります。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;
using System.Linq;

interface IRepository<T> where T : class
{
    void Add(T item);
    T? GetById(int id);
    IEnumerable<T> GetAll();
}

class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}

class InMemoryRepository<T> : IRepository<T> where T : class
{
    private readonly List<T> _store = new();
    private readonly Func<T, int> _idSelector;

    public InMemoryRepository(Func<T, int> idSelector)
    {
        _idSelector = idSelector;
    }

    public void Add(T item) => _store.Add(item);

    public T? GetById(int id)
        => _store.FirstOrDefault(x => _idSelector(x) == id);

    public IEnumerable<T> GetAll() => _store.AsReadOnly();
}

class Program
{
    static void Main()
    {
        var repo = new InMemoryRepository<User>(u => u.Id);
        repo.Add(new User { Id = 1, Name = "田中" });
        repo.Add(new User { Id = 2, Name = "鈴木" });

        var user = repo.GetById(1);
        Console.WriteLine($"取得: {user?.Name}");

        foreach (var u in repo.GetAll())
            Console.WriteLine($"  ID:{u.Id} {u.Name}");
    }
}`}
          expectedOutput={`取得: 田中
  ID:1 田中
  ID:2 鈴木`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Result 型パターン</h2>
        <p className="text-gray-400 mb-4">
          Result 型は処理の成功・失敗を例外ではなく戻り値で表現するパターンです。
          ジェネリクスを使って成功時の値と失敗時のエラーメッセージを型安全に扱えます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

class Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? Error { get; }

    private Result(bool success, T? value, string? error)
    {
        IsSuccess = success;
        Value = value;
        Error = error;
    }

    public static Result<T> Ok(T value)
        => new(true, value, null);

    public static Result<T> Fail(string error)
        => new(false, default, error);
}

class UserService
{
    public Result<string> GetUserName(int id)
    {
        if (id <= 0)
            return Result<string>.Fail("IDは正の整数である必要があります");
        if (id == 999)
            return Result<string>.Fail("ユーザーが見つかりません");

        return Result<string>.Ok($"ユーザー{id}");
    }
}

class Program
{
    static void Main()
    {
        var service = new UserService();
        int[] ids = { 1, -5, 999 };

        foreach (int id in ids)
        {
            var result = service.GetUserName(id);
            if (result.IsSuccess)
                Console.WriteLine($"成功: {result.Value}");
            else
                Console.WriteLine($"失敗: {result.Error}");
        }
    }
}`}
          expectedOutput={`成功: ユーザー1
失敗: IDは正の整数である必要があります
失敗: ユーザーが見つかりません`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="generics" lessonId="patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="patterns" basePath="/learn/generics" />
    </div>
  );
}
