import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("methods");

export default function MethodsParametersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">メソッド レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">引数</h1>
        <p className="text-gray-400">値型・参照型のパラメータ、デフォルト引数、params キーワードを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">引数（パラメータ）とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          引数（パラメータ）はメソッドに渡す入力値です。
          C# では<strong className="text-white">値型</strong>（int, double など）と
          <strong className="text-white">参照型</strong>（string, class など）があり、
          渡し方に違いがあります。値型は値のコピーが渡され、参照型はオブジェクトへの参照が渡されます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-teal-400 font-semibold text-sm mb-2">値型（コピーが渡る）</p>
            <p className="text-gray-400 text-xs">int, double, float, bool, char, struct</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-teal-400 font-semibold text-sm mb-2">参照型（参照が渡る）</p>
            <p className="text-gray-400 text-xs">string, class, interface, array</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">値型パラメータと参照型パラメータ</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // 値型パラメータ：コピーが渡る
    static void DoubleValue(int x)
    {
        x = x * 2;  // 呼び出し元の変数には影響しない
        Console.WriteLine($"メソッド内: x = {x}");
    }

    // 参照型パラメータ：参照が渡る
    static void AppendExclamation(string[] arr)
    {
        arr[0] = arr[0] + "!";  // 呼び出し元の配列が変わる
    }

    static void Main()
    {
        int num = 10;
        DoubleValue(num);
        Console.WriteLine($"呼び出し後: num = {num}");  // 変わらない

        string[] words = { "こんにちは", "世界" };
        AppendExclamation(words);
        Console.WriteLine($"配列の最初の要素: {words[0]}");  // 変わる
    }
}`}
          expectedOutput={`メソッド内: x = 20
呼び出し後: num = 10
配列の最初の要素: こんにちは!`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数と名前付き引数</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          パラメータにデフォルト値を設定すると、引数を省略できます。
          また、呼び出し時にパラメータ名を指定して渡す「名前付き引数」も使えます。
          これにより、引数の順序を変えて渡すことが可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルト引数と名前付き引数の例</h2>
        <CSharpEditor
          defaultCode={`using System;

class Program
{
    // デフォルト引数
    static void Greet(string name, string greeting = "こんにちは")
    {
        Console.WriteLine($"{greeting}、{name}さん！");
    }

    // params キーワード：可変長引数
    static int Sum(params int[] numbers)
    {
        int total = 0;
        foreach (int n in numbers)
            total += n;
        return total;
    }

    static void Main()
    {
        Greet("太郎");               // デフォルト greeting 使用
        Greet("花子", "おはよう");    // greeting を上書き
        Greet(greeting: "さようなら", name: "次郎");  // 名前付き引数

        Console.WriteLine($"合計: {Sum(1, 2, 3)}");
        Console.WriteLine($"合計: {Sum(10, 20, 30, 40, 50)}");
    }
}`}
          expectedOutput={`こんにちは、太郎さん！
おはよう、花子さん！
さようなら、次郎さん！
合計: 6
合計: 150`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="methods" lessonId="parameters" />
      </div>
      <LessonNav lessons={lessons} currentId="parameters" basePath="/learn/methods" />
    </div>
  );
}
