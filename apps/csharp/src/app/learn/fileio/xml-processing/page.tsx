import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FileioXmlProcessingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">ファイルI/O レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">XML処理</h1>
        <p className="text-gray-400">XDocument、XElement、LINQ to XML、Load/Saveを使ったXML操作を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">LINQ to XMLとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">System.Xml.Linq</code>の<code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">XDocument</code>・<code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded">XElement</code>はLINQを使ってXMLを操作できるモダンなAPIです。従来のXmlDocumentより直感的に使えます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XMLの作成と保存</h2>
        <p className="text-gray-400 mb-4">C#コードからXMLを生成します。</p>
        <CSharpEditor
          defaultCode={`using System.Xml.Linq;

// XMLの作成
var doc = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XElement("Catalog",
        new XElement("Book",
            new XAttribute("id", "1"),
            new XElement("Title", "C#入門"),
            new XElement("Author", "田中太郎"),
            new XElement("Price", "3000")
        ),
        new XElement("Book",
            new XAttribute("id", "2"),
            new XElement("Title", "Entity Framework Core"),
            new XElement("Author", "鈴木次郎"),
            new XElement("Price", "4500")
        )
    )
);

// 文字列として出力
Console.WriteLine("生成したXML:");
Console.WriteLine(doc.ToString());

// ファイルに保存
doc.Save("books.xml");
Console.WriteLine("books.xml に保存しました");`}
          expectedOutput={`生成したXML:
<Catalog>
  <Book id="1">
    <Title>C#入門</Title>
    <Author>田中太郎</Author>
    <Price>3000</Price>
  </Book>
  <Book id="2">
    <Title>Entity Framework Core</Title>
    <Author>鈴木次郎</Author>
    <Price>4500</Price>
  </Book>
</Catalog>
books.xml に保存しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XMLの読み込みとLINQクエリ</h2>
        <p className="text-gray-400 mb-4">LINQでXML要素をフィルタリング・変換します。</p>
        <CSharpEditor
          defaultCode={`using System.Xml.Linq;

// XMLを文字列から読み込み
string xmlText = @"
<Catalog>
  <Book id=""1"">
    <Title>C#入門</Title>
    <Author>田中太郎</Author>
    <Price>3000</Price>
  </Book>
  <Book id=""2"">
    <Title>EF Core</Title>
    <Author>鈴木次郎</Author>
    <Price>4500</Price>
  </Book>
  <Book id=""3"">
    <Title>ASP.NET Core</Title>
    <Author>高橋三郎</Author>
    <Price>3800</Price>
  </Book>
</Catalog>";

var catalog = XDocument.Parse(xmlText);

// LINQ to XML でクエリ
var expensiveBooks = catalog
    .Descendants("Book")
    .Where(b => (int)b.Element("Price")! > 3500)
    .Select(b => new
    {
        Id = (int)b.Attribute("id")!,
        Title = (string)b.Element("Title")!,
        Price = (int)b.Element("Price")!
    });

Console.WriteLine("3500円超の本:");
foreach (var book in expensiveBooks)
{
    Console.WriteLine($"  [{book.Id}] {book.Title} - ¥{book.Price}");
}

// 要素の追加
catalog.Root!.Add(
    new XElement("Book",
        new XAttribute("id", "4"),
        new XElement("Title", "Blazor"),
        new XElement("Author", "伊藤四郎"),
        new XElement("Price", "4000")
    )
);
Console.WriteLine($"本の総数: {catalog.Descendants("Book").Count()}冊");`}
          expectedOutput={`3500円超の本:
  [2] EF Core - ¥4500
  [3] ASP.NET Core - ¥3800
本の総数: 4冊`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="fileio" lessonId="xml-processing" />
      </div>
      <LessonNav lessons={lessons} currentId="xml-processing" basePath="/learn/fileio" />
    </div>
  );
}
