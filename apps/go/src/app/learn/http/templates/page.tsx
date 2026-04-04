import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("http");

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">HTTP・Web レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テンプレート</h1>
        <p className="text-gray-400">html/templateパッケージでHTML生成を行いましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">html/template の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">html/template</code> はHTMLを安全に生成するテンプレートエンジンです。
          自動的にHTMLエスケープを行い、XSS攻撃を防ぎます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">{'{{'}. {'}}'}</code> — データの出力</li>
          <li><code className="text-cyan-300">{'{{'}range .Items{'}}'}</code> — ループ</li>
          <li><code className="text-cyan-300">{'{{'}if .Condition{'}}'}</code> — 条件分岐</li>
          <li><code className="text-cyan-300">{'{{'}template &quot;name&quot; .{'}}'}</code> — テンプレート呼び出し</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なテンプレート</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">template.New</code> でテンプレートを作成し、
          <code className="text-cyan-300">Execute</code> でデータをバインドして出力します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := template.Must(template.New("hello").Parse(
        "こんにちは、{{.Name}}さん！\\n年齢: {{.Age}}歳\\n",
    ))

    data := struct {
        Name string
        Age  int
    }{
        Name: "太郎",
        Age:  25,
    }

    tmpl.Execute(os.Stdout, data)
}`}
          expectedOutput={`こんにちは、太郎さん！
年齢: 25歳`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ループと条件分岐</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">{'{{'}range{'}}'}</code> でスライスをループし、
          <code className="text-cyan-300">{'{{'}if{'}}'}</code> で条件分岐できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "html/template"
    "os"
)

func main() {
    tmpl := template.Must(template.New("list").Parse(
        "=== 商品リスト ===\\n" +
        "{{range .Items}}" +
        "- {{.Name}}: ¥{{.Price}}" +
        "{{if .OnSale}} (セール中!){{end}}\\n" +
        "{{end}}" +
        "合計: {{len .Items}}件\\n",
    ))

    data := struct {
        Items []struct {
            Name   string
            Price  int
            OnSale bool
        }
    }{
        Items: []struct {
            Name   string
            Price  int
            OnSale bool
        }{
            {"Go入門書", 2800, false},
            {"キーボード", 15000, true},
            {"モニター", 45000, true},
        },
    }

    tmpl.Execute(os.Stdout, data)
}`}
          expectedOutput={`=== 商品リスト ===
- Go入門書: ¥2800
- キーボード: ¥15000 (セール中!)
- モニター: ¥45000 (セール中!)
合計: 3件`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">HTMLエスケープの安全性</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">html/template</code> は自動的にHTMLエスケープを行い、
          XSS攻撃を防ぎます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "html/template"
    "strings"
)

func main() {
    tmpl := template.Must(template.New("safe").Parse(
        "入力: {{.}}\\n",
    ))

    // 危険な入力がエスケープされる
    dangerous := "<script>alert('XSS')</script>"

    var buf strings.Builder
    tmpl.Execute(&buf, dangerous)
    fmt.Print("html/template: ", buf.String())
    fmt.Println("↑ <script>タグがエスケープされて安全")
}`}
          expectedOutput={`html/template: 入力: &lt;script&gt;alert(&#39;XSS&#39;)&lt;/script&gt;
↑ <script>タグがエスケープされて安全`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="http" lessonId="templates" />
      </div>
      <LessonNav lessons={lessons} currentId="templates" basePath="/learn/http" />
    </div>
  );
}
