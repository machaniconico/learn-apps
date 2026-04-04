import { GoEditor } from "@/components/go-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

const quizQuestions: QuizQuestion[] = [
  {
    question: "Goでスレッドセーフなシングルトンを実装するのに使うパッケージは？",
    options: ["sync.Mutex", "sync.Once", "sync.Map", "sync.Pool"],
    answer: 1,
    explanation: "sync.Once の Do() メソッドは一度だけ関数を実行するため、スレッドセーフなシングルトンの実装に最適です。",
  },
  {
    question: "ファクトリパターンの主な利点は？",
    options: ["メモリ効率の向上", "生成ロジックのカプセル化と柔軟性", "並行処理の簡素化", "テストの自動化"],
    answer: 1,
    explanation: "ファクトリパターンはインターフェースを返すコンストラクタ関数を使い、具体的な型を隠蔽して柔軟な生成を可能にします。",
  },
  {
    question: "Goでオブザーバーパターンを実装する際に最も適した仕組みは？",
    options: ["コールバック関数", "チャネル", "グローバル変数", "reflect"],
    answer: 1,
    explanation: "Goではチャネルを使ってイベントを送信することで、ゴルーチン安全なオブザーバーパターンを実現できます。",
  },
  {
    question: "リポジトリパターンの目的は？",
    options: ["UIの分離", "データアクセスの抽象化", "ログの統合", "認証の実装"],
    answer: 1,
    explanation: "リポジトリパターンはデータの永続化ロジックをインターフェースで抽象化し、ビジネスロジックから分離します。",
  },
];

export default function DesignPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-violet-400 mb-2">設計パターン</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="advanced" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Go言語でのデザインパターンの実装方法を学びます。シングルトン、ファクトリ、オブザーバー、
          ストラテジー、デコレータ、リポジトリの各パターンをGoらしく実装する手法をカバーします。
        </p>
      </div>
      <div className="mb-8">
        <ProgressBar categoryId="design" totalLessons={6} color="violet" />
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/design" color="violet" categoryId="design" />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シングルトンパターンの概要</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">sync.Once</code>を使って安全にシングルトンを実装します。
          一度だけ初期化されることが保証されます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "sync"
)

type Config struct {
    Host string
    Port int
}

var (
    instance *Config
    once     sync.Once
)

func GetConfig() *Config {
    once.Do(func() {
        instance = &Config{
            Host: "localhost",
            Port: 8080,
        }
        fmt.Println("Config初期化完了")
    })
    return instance
}

func main() {
    c1 := GetConfig()
    c2 := GetConfig()
    fmt.Printf("同一インスタンス: %v\\n", c1 == c2)
    fmt.Printf("Host: %s, Port: %d\\n", c1.Host, c1.Port)
}`}
          expectedOutput={`Config初期化完了
同一インスタンス: true
Host: localhost, Port: 8080`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ストラテジーパターンの概要</h2>
        <p className="text-gray-400 mb-4">
          インターフェースを使って処理戦略を切り替える<code className="text-cyan-300">ストラテジーパターン</code>です。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type SortStrategy interface {
    Sort(data []int) []int
}

type BubbleSort struct{}
func (b BubbleSort) Sort(data []int) []int {
    result := make([]int, len(data))
    copy(result, data)
    for i := 0; i < len(result)-1; i++ {
        for j := 0; j < len(result)-i-1; j++ {
            if result[j] > result[j+1] {
                result[j], result[j+1] = result[j+1], result[j]
            }
        }
    }
    return result
}

type Sorter struct {
    strategy SortStrategy
}

func (s *Sorter) SetStrategy(st SortStrategy) {
    s.strategy = st
}

func (s *Sorter) Sort(data []int) []int {
    return s.strategy.Sort(data)
}

func main() {
    sorter := &Sorter{strategy: BubbleSort{}}
    data := []int{5, 3, 8, 1, 9}
    result := sorter.Sort(data)
    fmt.Println("ソート結果:", result)
}`}
          expectedOutput={`ソート結果: [1 3 5 8 9]`}
        />
      </section>
      <Quiz questions={quizQuestions} color="violet" />
    </div>
  );
}
