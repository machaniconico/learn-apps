import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("patterns");

export default function PatternsListPatternsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">パターンマッチング レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リストパターン</h1>
        <p className="text-gray-400">[first, .., last]、スライスパターン、C# 11のリストパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リストパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C# 11で導入されたリストパターンは、配列やリストの要素に対してパターンマッチングを行います。
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">[pattern1, pattern2, ..]</code>の形式でシーケンスの構造を検査できます。
        </p>
        <p className="text-gray-300 leading-relaxed">
          <code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">..</code>はスライスパターンで、0個以上の任意の要素にマッチします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">リストパターンの基本</h2>
        <p className="text-gray-400 mb-4">配列の要素数と内容でパターンマッチングします。</p>
        <CSharpEditor
          defaultCode={`// リストパターン（C# 11以降）
int[][] lists =
{
    [],
    [1],
    [1, 2],
    [1, 2, 3],
    [1, 2, 3, 4, 5],
    [0, 2, 4],
};

foreach (int[] list in lists)
{
    string desc = list switch
    {
        []          => "空のリスト",
        [var only]  => $"要素1個: {only}",
        [var first, var last] => $"要素2個: {first}...{last}",
        [1, 2, ..]  => $"1,2で始まる: [{string.Join(",", list)}]",
        [.., var last2] => $"最後の要素: {last2}",
    };
    Console.WriteLine(desc);
}`}
          expectedOutput={`空のリスト
要素1個: 1
要素2個: 1...2
1,2で始まる: [1,2,3]
1,2で始まる: [1,2,3,4,5]
最後の要素: 4`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">スライスパターンの活用</h2>
        <p className="text-gray-400 mb-4">先頭・末尾・中間の要素を抽出する実用例です。</p>
        <CSharpEditor
          defaultCode={`// スライスパターンの実用例

// パスのパース（URLやファイルパスの分割）
string[] AnalyzePath(string[] segments) =>
    segments switch
    {
        ["api", var version, .. var rest]
            => [.. new[] { $"API({version})" }, .. rest],
        ["static", .. var files]
            => [.. new[] { "静的ファイル" }, .. files],
        [var root, ..]
            => [.. new[] { $"ルート: {root}" }],
        []
            => ["空のパス"]
    };

// テスト
var paths = new[]
{
    new[] { "api", "v2", "users", "123" },
    new[] { "static", "css", "main.css" },
    new[] { "home", "about" },
    Array.Empty<string>(),
};

Console.WriteLine("パス解析:");
foreach (var path in paths)
{
    string input = "[" + string.Join("/", path) + "]";
    string[] result = AnalyzePath(path);
    Console.WriteLine($"  {input,-30} -> {string.Join(", ", result)}");
}

// 配列の先頭・末尾を取得
int[] numbers = [10, 20, 30, 40, 50];

if (numbers is [var head, .. var middle, var tail])
{
    Console.WriteLine($"\n先頭: {head}");
    Console.WriteLine($"中間: [{string.Join(", ", middle)}]");
    Console.WriteLine($"末尾: {tail}");
}`}
          expectedOutput={`パス解析:
  [api/v2/users/123]             -> API(v2), users, 123
  [static/css/main.css]          -> 静的ファイル, css, main.css
  [home/about]                   -> ルート: home
  []                             -> 空のパス

先頭: 10
中間: [20, 30, 40]
末尾: 50`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="patterns" lessonId="list-patterns" />
      </div>
      <LessonNav lessons={lessons} currentId="list-patterns" basePath="/learn/patterns" />
    </div>
  );
}
