import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("json");

export default function StreamingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-pink-400 text-sm font-semibold">JSON処理 レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">ストリーミング</h1>
        <p className="text-gray-400">json.NewEncoderとjson.NewDecoderによるストリーミング処理を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Encoder と Decoder</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-cyan-300">json.NewEncoder</code> は <code className="text-cyan-300">io.Writer</code> に直接書き込み、
          <code className="text-cyan-300">json.NewDecoder</code> は <code className="text-cyan-300">io.Reader</code> から直接読み取ります。
          中間バッファが不要で、大量データの処理に適しています。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-cyan-300">json.NewEncoder(w).Encode(v)</code> — 書き込み</li>
          <li><code className="text-cyan-300">json.NewDecoder(r).Decode(&amp;v)</code> — 読み取り</li>
          <li>HTTPハンドラとの相性が良い</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Encoder で書き込み</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.NewEncoder</code> で
          <code className="text-cyan-300">io.Writer</code> に直接JSONを書き込みます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "os"
)

type LogEntry struct {
    Level   string \`json:"level"\`
    Message string \`json:"message"\`
}

func main() {
    encoder := json.NewEncoder(os.Stdout)

    logs := []LogEntry{
        {Level: "INFO", Message: "サーバー起動"},
        {Level: "WARN", Message: "メモリ使用率80%"},
        {Level: "ERROR", Message: "DB接続失敗"},
    }

    for _, log := range logs {
        encoder.Encode(log) // 各行にJSONを出力
    }
}`}
          expectedOutput={`{"level":"INFO","message":"サーバー起動"}
{"level":"WARN","message":"メモリ使用率80%"}
{"level":"ERROR","message":"DB接続失敗"}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Decoder で読み取り</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">json.NewDecoder</code> で
          <code className="text-cyan-300">io.Reader</code> からJSONを読み取ります。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "fmt"
    "strings"
)

type Event struct {
    Type string \`json:"type"\`
    Data string \`json:"data"\`
}

func main() {
    // 複数のJSONオブジェクトが連続したストリーム
    stream := strings.NewReader(
        "{\"type\":\"click\",\"data\":\"button1\"}\n" +
        "{\"type\":\"scroll\",\"data\":\"page\"}\n" +
        "{\"type\":\"submit\",\"data\":\"form1\"}\n",
    )

    decoder := json.NewDecoder(stream)
    count := 0

    for decoder.More() {
        var event Event
        if err := decoder.Decode(&event); err != nil {
            break
        }
        count++
        fmt.Printf("イベント%d: type=%s, data=%s\n", count, event.Type, event.Data)
    }
    fmt.Printf("合計: %d件のイベント\n", count)
}`}
          expectedOutput={`イベント1: type=click, data=button1
イベント2: type=scroll, data=page
イベント3: type=submit, data=form1
合計: 3件のイベント`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Encoder のオプション</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-cyan-300">SetIndent</code> でインデントを設定し、
          <code className="text-cyan-300">SetEscapeHTML</code> でHTMLエスケープを制御できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "encoding/json"
    "os"
)

type Response struct {
    Status  string \`json:"status"\`
    Message string \`json:"message"\`
    URL     string \`json:"url"\`
}

func main() {
    resp := Response{
        Status:  "ok",
        Message: "取得成功",
        URL:     "https://example.com/api?q=test&page=1",
    }

    // インデント付きエンコーダー
    encoder := json.NewEncoder(os.Stdout)
    encoder.SetIndent("", "  ")
    encoder.SetEscapeHTML(false) // & をエスケープしない
    encoder.Encode(resp)
}`}
          expectedOutput={`{
  "status": "ok",
  "message": "取得成功",
  "url": "https://example.com/api?q=test&page=1"
}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="json" lessonId="streaming" />
      </div>
      <LessonNav lessons={lessons} currentId="streaming" basePath="/learn/json" />
    </div>
  );
}
