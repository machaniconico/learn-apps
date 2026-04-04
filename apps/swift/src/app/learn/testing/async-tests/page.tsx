import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function AsyncTestsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">非同期テスト</h1>
        <p className="text-gray-400">async/awaitを使った非同期コードのテスト手法を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">非同期テストの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Swift Concurrencyのasync/awaitを使った非同期テストはXCTest5.5以降でサポートされています。
          テストメソッドに<code className="text-indigo-300">async</code>を付けるだけで非同期テストが書けます。
          古い方法のXCTestExpectationも引き続き使えます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-indigo-300">func testXxx() async throws</code>で非同期テスト</li>
          <li><code className="text-indigo-300">await</code>で非同期処理を待つ</li>
          <li>古い方法: XCTestExpectation + waitForExpectations</li>
          <li>タイムアウト設定でテストが無限待ちにならないようにする</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">async/awaitを使ったテスト</h2>
        <p className="text-gray-400 mb-4">
          テストメソッドをasync throwsにするだけで非同期テストが書けます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

// テスト対象のサービス
struct WeatherData {
    let city: String
    let temperature: Double
    let condition: String
}

class WeatherService {
    func fetchWeather(for city: String) async throws -> WeatherData {
        // 実際はAPIを呼ぶが、ここではモック
        try await Task.sleep(nanoseconds: 100_000_000) // 0.1秒待つ

        switch city {
        case "Tokyo":
            return WeatherData(city: "Tokyo", temperature: 22.5, condition: "晴れ")
        case "Osaka":
            return WeatherData(city: "Osaka", temperature: 24.0, condition: "曇り")
        default:
            throw URLError(.badURL)
        }
    }
}

// 非同期テスト
class WeatherServiceTests: XCTestCase {
    let service = WeatherService()

    // async throwsテストメソッド
    func testFetchTokyoWeather() async throws {
        let weather = try await service.fetchWeather(for: "Tokyo")
        XCTAssertEqual(weather.city, "Tokyo")
        XCTAssertGreaterThan(weather.temperature, 0)
        XCTAssertFalse(weather.condition.isEmpty)
    }

    func testFetchUnknownCityThrows() async {
        do {
            _ = try await service.fetchWeather(for: "UnknownCity")
            XCTFail("エラーが発生するはずでした")
        } catch {
            XCTAssertTrue(error is URLError)
        }
    }
}

// 動作確認
Task {
    let service = WeatherService()
    let weather = try await service.fetchWeather(for: "Tokyo")
    print("\\(weather.city): \\(weather.temperature)°C \\(weather.condition)")
}`}
          expectedOutput={`Tokyo: 22.5°C 晴れ`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XCTestExpectationを使う方法</h2>
        <p className="text-gray-400 mb-4">
          コールバックベースの非同期コードには<code className="text-indigo-300">XCTestExpectation</code>を使います。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest
import Foundation

class DataFetcher {
    func fetchData(url: String, completion: @escaping (Result<String, Error>) -> Void) {
        // 非同期処理のシミュレーション
        DispatchQueue.global().asyncAfter(deadline: .now() + 0.1) {
            if url.starts(with: "https://") {
                completion(.success("レスポンスデータ from \\(url)"))
            } else {
                completion(.failure(URLError(.badURL)))
            }
        }
    }
}

class DataFetcherTests: XCTestCase {

    func testFetchSuccess() {
        // expectationを作成
        let expectation = XCTestExpectation(description: "データ取得成功")
        let fetcher = DataFetcher()

        fetcher.fetchData(url: "https://api.example.com/data") { result in
            switch result {
            case .success(let data):
                XCTAssertFalse(data.isEmpty)
                expectation.fulfill()  // 期待を満たす
            case .failure(let error):
                XCTFail("予期しないエラー: \\(error)")
            }
        }

        // タイムアウト付きで待機
        wait(for: [expectation], timeout: 2.0)
    }
}

// 動作確認
let fetcher = DataFetcher()
fetcher.fetchData(url: "https://api.example.com") { result in
    switch result {
    case .success(let data): print("成功:", data)
    case .failure(let err): print("失敗:", err)
    }
}
Thread.sleep(forTimeInterval: 0.5)`}
          expectedOutput={`成功: レスポンスデータ from https://api.example.com`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="async-tests" />
      </div>
      <LessonNav lessons={lessons} currentId="async-tests" basePath="/learn/testing" />
    </div>
  );
}
