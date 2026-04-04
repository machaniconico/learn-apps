import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function DesignDecoratorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">デザインパターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Decoratorパターン</h1>
        <p className="text-gray-400">オブジェクトのラッピング、機能の動的追加、ストリームデコレーターを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Decoratorパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Decoratorパターンは既存のオブジェクトをラップして機能を追加します。継承ではなく合成を使い、実行時に動的に機能を追加・削除できます。.NETのStreamクラスはDecoratorパターンの好例です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">コーヒーショップでのDecorator例</h2>
        <p className="text-gray-400 mb-4">飲み物に追加オプションを動的に加える古典的な例です。</p>
        <CSharpEditor
          defaultCode={`// Decoratorパターン: コーヒーのカスタマイズ
public interface IBeverage
{
    string Description { get; }
    decimal Cost { get; }
}

// 基本クラス
public class Espresso : IBeverage
{
    public string Description => "エスプレッソ";
    public decimal Cost => 300;
}

public class Drip : IBeverage
{
    public string Description => "ドリップコーヒー";
    public decimal Cost => 200;
}

// デコレーター基底クラス
public abstract class CondimentDecorator : IBeverage
{
    protected readonly IBeverage _beverage;
    protected CondimentDecorator(IBeverage beverage) => _beverage = beverage;
}

// 具体的なデコレーター
public class Milk : CondimentDecorator
{
    public Milk(IBeverage b) : base(b) {}
    public override string Description => _beverage.Description + " + ミルク";
    public override decimal Cost => _beverage.Cost + 80;
}

public class Caramel : CondimentDecorator
{
    public Caramel(IBeverage b) : base(b) {}
    public override string Description => _beverage.Description + " + キャラメル";
    public override decimal Cost => _beverage.Cost + 100;
}

public class WhippedCream : CondimentDecorator
{
    public WhippedCream(IBeverage b) : base(b) {}
    public override string Description => _beverage.Description + " + ホイップ";
    public override decimal Cost => _beverage.Cost + 120;
}

// 注文を構築
IBeverage order1 = new Espresso();
Console.WriteLine($"{order1.Description}: ¥{order1.Cost}");

IBeverage order2 = new Milk(new Caramel(new Espresso()));
Console.WriteLine($"{order2.Description}: ¥{order2.Cost}");

IBeverage order3 = new WhippedCream(new Milk(new Drip()));
Console.WriteLine($"{order3.Description}: ¥{order3.Cost}");`}
          expectedOutput={`エスプレッソ: ¥300
エスプレッソ + キャラメル + ミルク: ¥480
ドリップコーヒー + ミルク + ホイップ: ¥400`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">.NETのStreamデコレーター</h2>
        <p className="text-gray-400 mb-4">.NETのStreamはDecoratorパターンの実用例です。</p>
        <CSharpEditor
          defaultCode={`using System.IO;
using System.IO.Compression;
using System.Security.Cryptography;

// .NETのStreamはDecoratorパターンの実例
Console.WriteLine("StreamのDecoratorパターン:");
Console.WriteLine();
Console.WriteLine("// ファイルストリームを圧縮ストリームでラップ");
Console.WriteLine("using var fileStream = new FileStream(\"data.gz\", FileMode.Create);");
Console.WriteLine("using var gzipStream = new GZipStream(fileStream, CompressionMode.Compress);");
Console.WriteLine("// fileStreamをgzipStreamがデコレート");
Console.WriteLine("// 書き込みデータが自動的に圧縮される");
Console.WriteLine();

Console.WriteLine("// さらにBufferedStreamでラップ（3層のデコレーター）");
Console.WriteLine("using var buffered = new BufferedStream(gzipStream, 4096);");
Console.WriteLine("// buffered -> gzip -> file の順でデータが流れる");
Console.WriteLine();

// 実際に動作するデモ
string text = "Decoratorパターンのテストデータです。";
byte[] originalBytes = System.Text.Encoding.UTF8.GetBytes(text);

using var ms = new MemoryStream();
using (var gz = new GZipStream(ms, CompressionMode.Compress, leaveOpen: true))
{
    gz.Write(originalBytes, 0, originalBytes.Length);
}

Console.WriteLine($"元のサイズ: {originalBytes.Length} bytes");
Console.WriteLine($"圧縮後: {ms.Length} bytes");
Console.WriteLine($"圧縮率: {(1 - (double)ms.Length / originalBytes.Length) * 100:F1}%");`}
          expectedOutput={`StreamのDecoratorパターン:

// ファイルストリームを圧縮ストリームでラップ
using var fileStream = new FileStream("data.gz", FileMode.Create);
using var gzipStream = new GZipStream(fileStream, CompressionMode.Compress);
// fileStreamをgzipStreamがデコレート
// 書き込みデータが自動的に圧縮される

// さらにBufferedStreamでラップ（3層のデコレーター）
using var buffered = new BufferedStream(gzipStream, 4096);
// buffered -> gzip -> file の順でデータが流れる

元のサイズ: 47 bytes
圧縮後: 65 bytes
圧縮率: -38.3%`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="decorator" />
      </div>
      <LessonNav lessons={lessons} currentId="decorator" basePath="/learn/design" />
    </div>
  );
}
