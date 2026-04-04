import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "error-handling")!.lessons;

export default function DoCatchPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">エラーハンドリング レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">do-catch</h1>
        <p className="text-gray-400">do-catch構文でエラーをキャッチして適切に処理します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">do-catch の構文</h2>
        <p className="text-gray-300 mb-3">
          <code className="text-orange-300">do {"{ try ... }"} catch {"{ ... }"}</code> でエラーをハンドリングします。
          複数の catch ブロックでエラーの種類ごとに処理を分岐できます。
          最後の catch には具体的なパターンなしで「その他すべて」を受け取れます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-orange-300">catch MyError.case</code> — 特定のエラーケース</li>
          <li><code className="text-orange-300">catch let e as MyError</code> — 型でキャッチ</li>
          <li><code className="text-orange-300">catch</code> — すべてのエラー（error 変数に格納）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: 複数のcatchパターン</h2>
        <SwiftEditor
          defaultCode={`enum FileError: Error {
    case notFound(path: String)
    case permissionDenied
    case corrupted
}

func readFile(path: String) throws -> String {
    switch path {
    case "/missing": throw FileError.notFound(path: path)
    case "/secret": throw FileError.permissionDenied
    case "/bad": throw FileError.corrupted
    default: return "ファイルの内容: \\(path)"
    }
}

let paths = ["/valid", "/missing", "/secret", "/bad"]

for path in paths {
    do {
        let content = try readFile(path: path)
        print(content)
    } catch FileError.notFound(let p) {
        print("ファイルなし: \\(p)")
    } catch FileError.permissionDenied {
        print("アクセス拒否")
    } catch FileError.corrupted {
        print("ファイル破損")
    } catch {
        print("不明なエラー: \\(error)")
    }
}`}
          expectedOutput={`ファイルの内容: /valid
ファイルなし: /missing
アクセス拒否
ファイル破損`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: catchでwhere句を使う</h2>
        <SwiftEditor
          defaultCode={`enum NetworkError: Error {
    case statusCode(Int)
    case timeout
    case noConnection
}

func fetch(statusCode: Int) throws -> String {
    switch statusCode {
    case 200: return "OK"
    case 404: throw NetworkError.statusCode(404)
    case 500: throw NetworkError.statusCode(500)
    case 503: throw NetworkError.statusCode(503)
    default: throw NetworkError.statusCode(statusCode)
    }
}

let codes = [200, 404, 500, 503]

for code in codes {
    do {
        let result = try fetch(statusCode: code)
        print("成功: \\(result)")
    } catch NetworkError.statusCode(let c) where c >= 500 {
        print("サーバーエラー: \\(c)")
    } catch NetworkError.statusCode(404) {
        print("ページが見つかりません")
    } catch {
        print("エラー: \\(error)")
    }
}`}
          expectedOutput={`成功: OK
ページが見つかりません
サーバーエラー: 500
サーバーエラー: 503`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="error-handling" lessonId="do-catch" />
      </div>
      <LessonNav lessons={lessons} currentId="do-catch" basePath="/learn/error-handling" />
    </div>
  );
}
