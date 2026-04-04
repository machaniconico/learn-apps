import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function FactoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">設計パターン レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ファクトリ</h1>
        <p className="text-gray-400">インターフェースとコンストラクタ関数を使ったファクトリパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          ファクトリパターンはオブジェクトの生成ロジックをカプセル化し、
          <code className="text-cyan-300">インターフェース</code>を返すことで具体的な型を隠蔽します。
          Goでは<code className="text-cyan-300">New関数</code>がファクトリの役割を果たします。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なファクトリパターン</h2>
        <p className="text-gray-400 mb-4">
          データベース接続のファクトリを作成し、種類に応じた実装を返します。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Database interface {
    Connect() string
    Query(sql string) string
}

type PostgreSQL struct{ host string }
func (p *PostgreSQL) Connect() string { return fmt.Sprintf("PostgreSQL接続: %s", p.host) }
func (p *PostgreSQL) Query(sql string) string { return fmt.Sprintf("PG実行: %s", sql) }

type MySQL struct{ host string }
func (m *MySQL) Connect() string { return fmt.Sprintf("MySQL接続: %s", m.host) }
func (m *MySQL) Query(sql string) string { return fmt.Sprintf("MySQL実行: %s", sql) }

// ファクトリ関数
func NewDatabase(dbType, host string) Database {
    switch dbType {
    case "postgres":
        return &PostgreSQL{host: host}
    case "mysql":
        return &MySQL{host: host}
    default:
        return nil
    }
}

func main() {
    db1 := NewDatabase("postgres", "localhost:5432")
    db2 := NewDatabase("mysql", "localhost:3306")

    fmt.Println(db1.Connect())
    fmt.Println(db1.Query("SELECT * FROM users"))

    fmt.Println(db2.Connect())
    fmt.Println(db2.Query("SELECT * FROM posts"))
}`}
          expectedOutput={`PostgreSQL接続: localhost:5432
PG実行: SELECT * FROM users
MySQL接続: localhost:3306
MySQL実行: SELECT * FROM posts`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリレジストリ</h2>
        <p className="text-gray-400 mb-4">
          ファクトリ関数をマップに登録して、動的に生成する拡張可能なパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Notifier interface {
    Send(message string) string
}

type EmailNotifier struct{}
func (e *EmailNotifier) Send(msg string) string { return "メール送信: " + msg }

type SlackNotifier struct{}
func (s *SlackNotifier) Send(msg string) string { return "Slack送信: " + msg }

type SMSNotifier struct{}
func (s *SMSNotifier) Send(msg string) string { return "SMS送信: " + msg }

// ファクトリレジストリ
var notifierFactory = map[string]func() Notifier{
    "email": func() Notifier { return &EmailNotifier{} },
    "slack": func() Notifier { return &SlackNotifier{} },
    "sms":   func() Notifier { return &SMSNotifier{} },
}

func CreateNotifier(nType string) (Notifier, error) {
    factory, ok := notifierFactory[nType]
    if !ok {
        return nil, fmt.Errorf("未知の通知タイプ: %s", nType)
    }
    return factory(), nil
}

func main() {
    types := []string{"email", "slack", "sms"}
    for _, t := range types {
        notifier, err := CreateNotifier(t)
        if err != nil {
            fmt.Println(err)
            continue
        }
        fmt.Println(notifier.Send("サーバーが起動しました"))
    }
}`}
          expectedOutput={`メール送信: サーバーが起動しました
Slack送信: サーバーが起動しました
SMS送信: サーバーが起動しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">オプションパターンとの組み合わせ</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">Functional Options</code>パターンと組み合わせて柔軟なファクトリを作ります。
        </p>
        <GoEditor
          defaultCode={`package main

import "fmt"

type Server struct {
    host    string
    port    int
    timeout int
}

type Option func(*Server)

func WithHost(host string) Option {
    return func(s *Server) { s.host = host }
}

func WithPort(port int) Option {
    return func(s *Server) { s.port = port }
}

func WithTimeout(timeout int) Option {
    return func(s *Server) { s.timeout = timeout }
}

// ファクトリ関数 + Functional Options
func NewServer(opts ...Option) *Server {
    s := &Server{
        host:    "0.0.0.0",
        port:    8080,
        timeout: 30,
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}

func main() {
    // デフォルト設定
    s1 := NewServer()
    fmt.Printf("s1: %s:%d (timeout: %ds)\\n", s1.host, s1.port, s1.timeout)

    // カスタム設定
    s2 := NewServer(
        WithHost("localhost"),
        WithPort(9090),
        WithTimeout(60),
    )
    fmt.Printf("s2: %s:%d (timeout: %ds)\\n", s2.host, s2.port, s2.timeout)

    // 一部だけカスタム
    s3 := NewServer(WithPort(3000))
    fmt.Printf("s3: %s:%d (timeout: %ds)\\n", s3.host, s3.port, s3.timeout)
}`}
          expectedOutput={`s1: 0.0.0.0:8080 (timeout: 30s)
s2: localhost:9090 (timeout: 60s)
s3: 0.0.0.0:3000 (timeout: 30s)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="factory" />
      </div>
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/design" />
    </div>
  );
}
