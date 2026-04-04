import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("basics");

export default function StringsBasicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-purple-400 text-sm font-semibold">C#基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">文字列の基本</h1>
        <p className="text-gray-400">文字列の作成・連結・エスケープシーケンスを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">文字列の基本</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          C#の <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">string</code> 型はダブルクォート <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">&quot;...&quot;</code> で文字列を表します。
          C#の文字列は<strong className="text-white">イミュータブル（変更不可）</strong>で、一度作成した文字列は変更できません。
          変更のように見える操作はすべて新しい文字列を生成します。
        </p>
        <p className="text-gray-300 leading-relaxed">
          1文字を表す <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">char</code> 型はシングルクォート <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">&apos;...&apos;</code> で表します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列の作成と連結</h2>
        <p className="text-gray-400 mb-4">文字列はいくつかの方法で連結・構築できます。</p>
        <CSharpEditor
          defaultCode={`// 文字列の宣言
string greeting = "こんにちは";
string name = "鈴木";

// + 演算子で連結
string message1 = greeting + "、" + name + "さん！";
Console.WriteLine(message1);

// 文字列補間（推奨）
string message2 = $"{greeting}、{name}さん！";
Console.WriteLine(message2);

// string.Format（古い書き方）
string message3 = string.Format("{0}、{1}さん！", greeting, name);
Console.WriteLine(message3);

// 文字列の長さ
Console.WriteLine($"長さ: {name.Length}文字");`}
          expectedOutput={`こんにちは、鈴木さん！
こんにちは、鈴木さん！
こんにちは、鈴木さん！
長さ: 2文字`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">エスケープシーケンス</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          特殊な文字を文字列に含めるには<strong className="text-white">エスケープシーケンス</strong>を使います。
          バックスラッシュ <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">\</code> で始まります。
        </p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { code: "\\n", desc: "改行" },
            { code: "\\t", desc: "タブ" },
            { code: '\\"', desc: 'ダブルクォート"' },
            { code: "\\'", desc: "シングルクォート'" },
            { code: "\\\\", desc: "バックスラッシュ" },
            { code: "\\r\\n", desc: "Windows改行（CRLF）" },
          ].map(({ code, desc }) => (
            <div key={code} className="flex items-center gap-2 p-2 bg-gray-900 rounded">
              <code className="text-purple-400 font-mono w-16">{code}</code>
              <span className="text-gray-400">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エスケープとVerbatim文字列</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-purple-400 bg-gray-800 px-1.5 py-0.5 rounded">@&quot;...&quot;</code> はVerbatim文字列で、エスケープが不要です。ファイルパスなどに便利です。
        </p>
        <CSharpEditor
          defaultCode={`// エスケープシーケンス
Console.WriteLine("1行目\n2行目\n3行目");
Console.WriteLine("タブ:\tA\tB\tC");
Console.WriteLine("引用: \"Hello, World!\"");

// Verbatim文字列（@プレフィックス）
string path = @"C:\Users\山田\Documents\report.txt";
Console.WriteLine(path);

// 複数行のVerbatim文字列
string multiline = @"1行目
2行目
3行目";
Console.WriteLine(multiline);`}
          expectedOutput={`1行目
2行目
3行目
タブ:	A	B	C
引用: "Hello, World!"
C:\Users\山田\Documents\report.txt
1行目
2行目
3行目`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="basics" lessonId="strings-basics" />
      </div>
      <LessonNav lessons={lessons} currentId="strings-basics" basePath="/learn/basics" />
    </div>
  );
}
