import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function StrategyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">設計パターン レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ストラテジー</h1>
        <p className="text-gray-400">インターフェースベースの戦略切り替えパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ストラテジーパターンはアルゴリズムをインターフェースで抽象化し、
          実行時に戦略を切り替えられるようにするパターンです。
          Goの<code className="text-cyan-300">インターフェース</code>は暗黙的実装なので、非常に自然に実現できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">圧縮ストラテジー</h2>
        <p className="text-gray-400 mb-4">
          データ圧縮の方式をストラテジーパターンで切り替える例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Compressor interface {
    Compress(data string) string
    Name() string
}

type GzipCompressor struct{}
func (g GzipCompressor) Compress(data string) string {
    return fmt.Sprintf("[gzip圧縮] %d文字 -> %d文字", len(data), len(data)/2)
}
func (g GzipCompressor) Name() string { return "gzip" }

type ZipCompressor struct{}
func (z ZipCompressor) Compress(data string) string {
    return fmt.Sprintf("[zip圧縮] %d文字 -> %d文字", len(data), len(data)*2/3)
}
func (z ZipCompressor) Name() string { return "zip" }

type NoCompressor struct{}
func (n NoCompressor) Compress(data string) string {
    return fmt.Sprintf("[無圧縮] %d文字 -> %d文字", len(data), len(data))
}
func (n NoCompressor) Name() string { return "none" }

type FileProcessor struct {
    compressor Compressor
}

func (fp *FileProcessor) SetCompressor(c Compressor) {
    fp.compressor = c
}

func (fp *FileProcessor) Process(data string) {
    fmt.Printf("戦略: %s\\n", fp.compressor.Name())
    fmt.Println(fp.compressor.Compress(data))
}

func main() {
    processor := &FileProcessor{}
    data := "Hello, Strategy Pattern in Go!"

    processor.SetCompressor(GzipCompressor{})
    processor.Process(data)

    processor.SetCompressor(ZipCompressor{})
    processor.Process(data)

    processor.SetCompressor(NoCompressor{})
    processor.Process(data)
}`}
          expectedOutput={`戦略: gzip
[gzip圧縮] 30文字 -> 15文字
戦略: zip
[zip圧縮] 30文字 -> 20文字
戦略: none
[無圧縮] 30文字 -> 30文字`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">料金計算ストラテジー</h2>
        <p className="text-gray-400 mb-4">
          ユーザーの会員種別に応じて料金計算を切り替える実践的な例です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type PricingStrategy interface {
    Calculate(basePrice float64) float64
    Label() string
}

type RegularPricing struct{}
func (r RegularPricing) Calculate(price float64) float64 { return price }
func (r RegularPricing) Label() string { return "通常価格" }

type MemberPricing struct{}
func (m MemberPricing) Calculate(price float64) float64 { return price * 0.9 }
func (m MemberPricing) Label() string { return "会員価格（10%OFF）" }

type PremiumPricing struct{}
func (p PremiumPricing) Calculate(price float64) float64 { return price * 0.75 }
func (p PremiumPricing) Label() string { return "プレミアム価格（25%OFF）" }

type Cart struct {
    pricing PricingStrategy
    items   []float64
}

func (c *Cart) Total() float64 {
    total := 0.0
    for _, item := range c.items {
        total += c.pricing.Calculate(item)
    }
    return total
}

func main() {
    items := []float64{1000, 2000, 500}
    strategies := []PricingStrategy{
        RegularPricing{},
        MemberPricing{},
        PremiumPricing{},
    }

    for _, strategy := range strategies {
        cart := &Cart{pricing: strategy, items: items}
        fmt.Printf("%s: %.0f円\\n", strategy.Label(), cart.Total())
    }
}`}
          expectedOutput={`通常価格: 3500円
会員価格（10%OFF）: 3150円
プレミアム価格（25%OFF）: 2625円`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">関数型ストラテジー</h2>
        <p className="text-gray-400 mb-4">
          関数型を使ってよりシンプルにストラテジーを実装するGoらしいアプローチです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strings"
)

// 関数型をストラテジーとして使用
type Formatter func(text string) string

func UpperCase(text string) string {
    return strings.ToUpper(text)
}

func LowerCase(text string) string {
    return strings.ToLower(text)
}

func TitleCase(text string) string {
    return strings.Title(strings.ToLower(text))
}

type TextProcessor struct {
    format Formatter
}

func (tp *TextProcessor) Process(texts []string) {
    for _, text := range texts {
        fmt.Println(tp.format(text))
    }
}

func main() {
    texts := []string{"hello world", "GO LANGUAGE", "Design Pattern"}

    fmt.Println("=== 大文字変換 ===")
    p := &TextProcessor{format: UpperCase}
    p.Process(texts)

    fmt.Println("\\n=== 小文字変換 ===")
    p.format = LowerCase
    p.Process(texts)

    fmt.Println("\\n=== タイトルケース ===")
    p.format = TitleCase
    p.Process(texts)
}`}
          expectedOutput={`=== 大文字変換 ===
HELLO WORLD
GO LANGUAGE
DESIGN PATTERN

=== 小文字変換 ===
hello world
go language
design pattern

=== タイトルケース ===
Hello World
Go Language
Design Pattern`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="strategy" />
      </div>
      <LessonNav lessons={lessons} currentId="strategy" basePath="/learn/design" />
    </div>
  );
}
