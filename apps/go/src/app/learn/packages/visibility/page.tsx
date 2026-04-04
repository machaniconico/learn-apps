import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("packages");

export default function VisibilityPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">パッケージ・モジュール レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">可視性</h1>
        <p className="text-gray-400">大文字=エクスポート、小文字=非公開というGoのシンプルなアクセス制御を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エクスポートルール</h2>
        <p className="text-gray-400 mb-4">
          Goには <code className="text-cyan-300">public</code> や <code className="text-cyan-300">private</code> キーワードがありません。
          先頭が大文字なら他のパッケージからアクセスでき（エクスポート）、
          小文字なら同じパッケージ内でのみアクセスできます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// User は大文字 → エクスポートされる
type User struct {
    Name  string // 大文字 → エクスポート
    Email string // 大文字 → エクスポート
    age   int    // 小文字 → 非公開
}

// NewUser はエクスポートされるコンストラクタ
func NewUser(name, email string, age int) User {
    return User{Name: name, Email: email, age: age}
}

// getAge は小文字 → パッケージ内のみ
func (u User) getAge() int {
    return u.age
}

// String はエクスポートされるメソッド
func (u User) String() string {
    return fmt.Sprintf("%s (%s)", u.Name, u.Email)
}

func main() {
    user := NewUser("太郎", "taro@example.com", 30)
    fmt.Println("名前:", user.Name)
    fmt.Println("メール:", user.Email)
    fmt.Println("年齢:", user.getAge()) // 同パッケージ内なのでOK
    fmt.Println("表示:", user.String())
}`}
          expectedOutput={`名前: 太郎
メール: taro@example.com
年齢: 30
表示: 太郎 (taro@example.com)`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">構造体フィールドの可視性</h2>
        <p className="text-gray-400 mb-4">
          構造体のフィールドも同じルールに従います。JSONタグと組み合わせて、
          内部状態を隠蔽しつつ必要なフィールドだけ公開する設計が可能です。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
)

type Config struct {
    Host     string \`json:"host"\`     // エクスポート
    Port     int    \`json:"port"\`     // エクスポート
    password string                     // 非公開（JSONにも含まれない）
}

func NewConfig(host string, port int, pass string) *Config {
    return &Config{Host: host, Port: port, password: pass}
}

func (c *Config) HasPassword() bool {
    return c.password != ""
}

func main() {
    config := NewConfig("localhost", 8080, "secret123")

    // JSON出力（passwordは含まれない）
    data, _ := json.MarshalIndent(config, "", "  ")
    fmt.Println("JSON出力:")
    fmt.Println(string(data))

    fmt.Printf("\\nパスワードあり: %t\\n", config.HasPassword())
}`}
          expectedOutput={`JSON出力:
{
  "host": "localhost",
  "port": 8080
}

パスワードあり: true`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">定数・変数の可視性</h2>
        <p className="text-gray-400 mb-4">
          関数、型、定数、変数のすべてに同じルールが適用されます。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

// エクスポートされる定数
const MaxRetries = 3
const Version = "1.0.0"

// 非公開の定数
const defaultTimeout = 30

// エクスポートされる変数
var AppName = "MyApp"

// 非公開の変数
var debugMode = false

func main() {
    fmt.Println("=== 可視性のまとめ ===")
    fmt.Printf("AppName (公開): %s\\n", AppName)
    fmt.Printf("Version (公開): %s\\n", Version)
    fmt.Printf("MaxRetries (公開): %d\\n", MaxRetries)
    fmt.Printf("defaultTimeout (非公開): %d\\n", defaultTimeout)
    fmt.Printf("debugMode (非公開): %t\\n", debugMode)
    fmt.Println()
    fmt.Println("大文字で始まる → 他パッケージからアクセス可能")
    fmt.Println("小文字で始まる → 同パッケージ内のみ")
}`}
          expectedOutput={`=== 可視性のまとめ ===
AppName (公開): MyApp
Version (公開): 1.0.0
MaxRetries (公開): 3
defaultTimeout (非公開): 30
debugMode (非公開): false

大文字で始まる → 他パッケージからアクセス可能
小文字で始まる → 同パッケージ内のみ`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="packages" lessonId="visibility" />
      </div>
      <LessonNav lessons={lessons} currentId="visibility" basePath="/learn/packages" />
    </div>
  );
}
