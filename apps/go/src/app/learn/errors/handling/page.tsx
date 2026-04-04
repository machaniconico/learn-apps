import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("errors");

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラー処理 レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">エラー処理</h1>
        <p className="text-gray-400">if err != nil パターンの基本と応用を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">if err != nil パターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Goでは関数がエラーを返す場合、呼び出し側で <code className="text-cyan-300">if err != nil</code> で即座にチェックします。
          このパターンはGoの最も特徴的なイディオムで、エラー処理を明示的かつ読みやすくします。
          エラーを無視するのはバグの原因になるため、必ずチェックしましょう。
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なエラー処理</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 正常なケース
    num, err := strconv.Atoi("42")
    if err != nil {
        fmt.Println("変換エラー:", err)
        return
    }
    fmt.Println("変換成功:", num)

    // エラーケース
    num2, err := strconv.Atoi("abc")
    if err != nil {
        fmt.Println("変換エラー:", err)
        // returnで早期リターンするのが一般的
    }
    _ = num2
}`}
          expectedOutput={`変換成功: 42
変換エラー: strconv.Atoi: parsing "abc": invalid syntax`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーの伝播</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func parseConfig(portStr string) (int, error) {
    port, err := strconv.Atoi(portStr)
    if err != nil {
        return 0, fmt.Errorf("ポートの解析に失敗: %s", err)
    }
    if port < 1 || port > 65535 {
        return 0, fmt.Errorf("ポート番号が範囲外: %d", port)
    }
    return port, nil
}

func startServer(portStr string) error {
    port, err := parseConfig(portStr)
    if err != nil {
        return fmt.Errorf("サーバー起動失敗: %s", err)
    }
    fmt.Printf("サーバー起動: ポート %d\\n", port)
    return nil
}

func main() {
    // 正常
    err := startServer("8080")
    if err != nil {
        fmt.Println("エラー:", err)
    }

    // 不正な値
    err = startServer("abc")
    if err != nil {
        fmt.Println("エラー:", err)
    }

    // 範囲外
    err = startServer("99999")
    if err != nil {
        fmt.Println("エラー:", err)
    }
}`}
          expectedOutput={`サーバー起動: ポート 8080
エラー: サーバー起動失敗: ポートの解析に失敗: strconv.Atoi: parsing "abc": invalid syntax
エラー: サーバー起動失敗: ポート番号が範囲外: 99999`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">複数のエラーを扱う</h2>
        <GoEditor
          defaultCode={`package main

import (
    "fmt"
    "strconv"
)

func parseNumbers(strs []string) ([]int, error) {
    results := make([]int, 0, len(strs))

    for i, s := range strs {
        n, err := strconv.Atoi(s)
        if err != nil {
            return nil, fmt.Errorf("インデックス%d (%q) の変換に失敗: %s", i, s, err)
        }
        results = append(results, n)
    }

    return results, nil
}

func main() {
    // 正常
    nums, err := parseNumbers([]string{"1", "2", "3"})
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Println("数値:", nums)
    }

    // エラー含む
    nums, err = parseNumbers([]string{"1", "abc", "3"})
    if err != nil {
        fmt.Println("エラー:", err)
    } else {
        fmt.Println("数値:", nums)
    }
}`}
          expectedOutput={`数値: [1 2 3]
エラー: インデックス1 ("abc") の変換に失敗: strconv.Atoi: parsing "abc": invalid syntax`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="errors" lessonId="handling" />
      </div>
      <LessonNav lessons={lessons} currentId="handling" basePath="/learn/errors" />
    </div>
  );
}
