import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function SentinelErrorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">センチネルエラー</h1>
        <p className="text-gray-400">var ErrNotFound = errors.New(...) のようなパッケージレベルのエラー変数を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">センチネルエラーとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          センチネルエラーはパッケージレベルで定義されるエラー変数です。
          慣習として <code className="text-cyan-300">Err</code> プレフィックスを付けます（例: <code className="text-cyan-300">ErrNotFound</code>）。
          標準ライブラリでも <code className="text-cyan-300">io.EOF</code>、<code className="text-cyan-300">sql.ErrNoRows</code> など広く使われています。
          呼び出し側は <code className="text-cyan-300">errors.Is</code> でこれらのエラーを判定できます。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">センチネルエラーの定義</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

// センチネルエラーの定義
var (
    ErrNotFound     = errors.New("リソースが見つかりません")
    ErrUnauthorized = errors.New("認証が必要です")
    ErrForbidden    = errors.New("アクセスが禁止されています")
    ErrConflict     = errors.New("リソースが競合しています")
)

func getResource(id int, auth bool) (string, error) {
    if !auth {
        return "", ErrUnauthorized
    }
    if id == 0 {
        return "", ErrNotFound
    }
    if id < 0 {
        return "", ErrForbidden
    }
    return fmt.Sprintf("Resource-%d", id), nil
}

func main() {
    cases := []struct {
        id   int
        auth bool
    }{
        {1, true},
        {0, true},
        {1, false},
        {-1, true},
    }

    for _, c := range cases {
        res, err := getResource(c.id, c.auth)
        switch {
        case errors.Is(err, ErrNotFound):
            fmt.Printf("id=%d: 404 %s\\n", c.id, err)
        case errors.Is(err, ErrUnauthorized):
            fmt.Printf("id=%d: 401 %s\\n", c.id, err)
        case errors.Is(err, ErrForbidden):
            fmt.Printf("id=%d: 403 %s\\n", c.id, err)
        case err != nil:
            fmt.Printf("id=%d: 500 %s\\n", c.id, err)
        default:
            fmt.Printf("id=%d: 200 %s\\n", c.id, res)
        }
    }
}`}
          expectedOutput={`id=1: 200 Resource-1
id=0: 404 リソースが見つかりません
id=1: 401 認証が必要です
id=-1: 403 アクセスが禁止されています`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラップしたセンチネルエラー</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

var ErrDatabase = errors.New("データベースエラー")

func queryUser(id int) (string, error) {
    if id == 0 {
        // コンテキスト付きでラップ
        return "", fmt.Errorf("ユーザーID=%d: %w", id, ErrDatabase)
    }
    return fmt.Sprintf("User-%d", id), nil
}

func getUserProfile(id int) (string, error) {
    user, err := queryUser(id)
    if err != nil {
        return "", fmt.Errorf("プロフィール取得失敗: %w", err)
    }
    return "Profile of " + user, nil
}

func main() {
    _, err := getUserProfile(0)
    if err != nil {
        fmt.Println("エラー:", err)

        // 何段ラップされていてもIsで判定可能
        if errors.Is(err, ErrDatabase) {
            fmt.Println("→ データベースの問題です。リトライしてください。")
        }
    }

    // 正常ケース
    profile, err := getUserProfile(1)
    if err == nil {
        fmt.Println("成功:", profile)
    }
}`}
          expectedOutput={`エラー: プロフィール取得失敗: ユーザーID=0: データベースエラー
→ データベースの問題です。リトライしてください。
成功: Profile of User-1`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">標準ライブラリのセンチネルエラー</h2>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
    "io"
    "strings"
)

func main() {
    // io.EOF: 読み取り終端を示すセンチネルエラー
    reader := strings.NewReader("Hello")

    buf := make([]byte, 10)
    for {
        n, err := reader.Read(buf)
        if errors.Is(err, io.EOF) {
            if n > 0 {
                fmt.Printf("最後の読み取り: %q\\n", buf[:n])
            }
            fmt.Println("読み取り完了（EOF）")
            break
        }
        if err != nil {
            fmt.Println("予期しないエラー:", err)
            break
        }
        fmt.Printf("読み取り: %q\\n", buf[:n])
    }

    // io.ErrUnexpectedEOF との違い
    fmt.Println("io.EOF:", io.EOF)
    fmt.Println("io.ErrUnexpectedEOF:", io.ErrUnexpectedEOF)
}`}
          expectedOutput={`最後の読み取り: "Hello"
読み取り完了（EOF）
io.EOF: EOF
io.ErrUnexpectedEOF: unexpected EOF`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="sentinel" />
      </div>
      <LessonNav lessons={lessons} currentId="sentinel" basePath="/learn/errors" />
    </div>
  );
}
