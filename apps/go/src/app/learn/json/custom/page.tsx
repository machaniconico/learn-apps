import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("json");

export default function CustomPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">JSON処理 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタム処理</h1>
        <p className="text-gray-400">MarshalJSONとUnmarshalJSONインターフェースの実装を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムJSON変換</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">json.Marshaler</code> と <code className="text-cyan-300">json.Unmarshaler</code>
          インターフェースを実装することで、JSON変換の動作をカスタマイズできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">MarshalJSON() ([]byte, error)</code> — カスタムシリアライズ</li>
          <li><code className="text-cyan-300">UnmarshalJSON([]byte) error</code> — カスタムデシリアライズ</li>
          <li>日付フォーマットの変換、列挙型の文字列化などに有用</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">MarshalJSON の実装</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">MarshalJSON</code> メソッドを実装して、カスタムJSON出力を定義します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Status int

const (
    Active  Status = 1
    Inactive Status = 2
)

func (s Status) MarshalJSON() ([]byte, error) {
    var str string
    switch s {
    case Active:
        str = "active"
    case Inactive:
        str = "inactive"
    default:
        str = "unknown"
    }
    return json.Marshal(str)
}

type User struct {
    Name   string \`json:"name"\`
    Status Status \`json:"status"\`
}

func main() {
    user := User{Name: "太郎", Status: Active}
    data, _ := json.MarshalIndent(user, "", "  ")
    fmt.Println(string(data))
}`}
          expectedOutput={`{
  "name": "太郎",
  "status": "active"
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">UnmarshalJSON の実装</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">UnmarshalJSON</code> でJSONから独自の型へ変換します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Color struct {
    R, G, B int
}

func (c *Color) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    // "#RRGGBB" 形式をパース
    if len(s) == 7 && s[0] == '#' {
        fmt.Sscanf(s[1:], "%02x%02x%02x", &c.R, &c.G, &c.B)
    }
    return nil
}

func (c Color) MarshalJSON() ([]byte, error) {
    hex := fmt.Sprintf("#%02x%02x%02x", c.R, c.G, c.B)
    return json.Marshal(hex)
}

type Theme struct {
    Name       string \`json:"name"\`
    Primary    Color  \`json:"primary"\`
    Background Color  \`json:"background"\`
}

func main() {
    jsonStr := \`{"name":"ダーク","primary":"#3b82f6","background":"#1f2937"}\`

    var theme Theme
    json.Unmarshal([]byte(jsonStr), &theme)

    fmt.Printf("テーマ: %s\\n", theme.Name)
    fmt.Printf("Primary: R=%d, G=%d, B=%d\\n", theme.Primary.R, theme.Primary.G, theme.Primary.B)
    fmt.Printf("Background: R=%d, G=%d, B=%d\\n", theme.Background.R, theme.Background.G, theme.Background.B)

    // 再マーシャル
    fmt.Println("\\n再変換:")
    out, _ := json.MarshalIndent(theme, "", "  ")
    _ = strings.Contains(string(out), "primary")
    fmt.Println(string(out))
}`}
          expectedOutput={`テーマ: ダーク
Primary: R=59, G=130, B=246
Background: R=31, G=41, B=55

再変換:
{
  "name": "ダーク",
  "primary": "#3b82f6",
  "background": "#1f2937"
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">日付のカスタムフォーマット</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">time.Time</code> のJSON表現をカスタマイズする典型的なパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "time"
)

type JapaneseDate struct {
    time.Time
}

func (d JapaneseDate) MarshalJSON() ([]byte, error) {
    formatted := d.Format("2006年01月02日")
    return json.Marshal(formatted)
}

func (d *JapaneseDate) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    t, err := time.Parse("2006年01月02日", s)
    if err != nil {
        return err
    }
    d.Time = t
    return nil
}

type Event struct {
    Title string       \`json:"title"\`
    Date  JapaneseDate \`json:"date"\`
}

func main() {
    event := Event{
        Title: "Go勉強会",
        Date:  JapaneseDate{time.Date(2024, 6, 15, 0, 0, 0, 0, time.UTC)},
    }

    data, _ := json.MarshalIndent(event, "", "  ")
    fmt.Println(string(data))
}`}
          expectedOutput={`{
  "title": "Go勉強会",
  "date": "2024年06月15日"
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="json" lessonId="custom" />
      </div>
      <LessonNav lessons={lessons} currentId="custom" basePath="/learn/json" />
    </div>
  );
}
