import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "testing")!.lessons;

export default function AssertionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">テスト レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アサーション</h1>
        <p className="text-gray-400">XCTAssertEqual・XCTAssertTrue・XCTAssertNil・XCTAssertThrowsの使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">主なアサーション一覧</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 pr-6 text-gray-400">アサーション</th>
                <th className="text-left py-2 text-gray-400">用途</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["XCTAssertEqual(a, b)", "aとbが等しい"],
                ["XCTAssertNotEqual(a, b)", "aとbが等しくない"],
                ["XCTAssertTrue(expr)", "exprがtrue"],
                ["XCTAssertFalse(expr)", "exprがfalse"],
                ["XCTAssertNil(opt)", "optがnil"],
                ["XCTAssertNotNil(opt)", "optがnilでない"],
                ["XCTAssertThrowsError(try f())", "エラーを投げる"],
                ["XCTAssertNoThrow(try f())", "エラーを投げない"],
                ["XCTAssertGreaterThan(a, b)", "a > b"],
                ["XCTFail(message)", "強制的にテスト失敗"],
              ].map(([fn, desc]) => (
                <tr key={fn} className="border-b border-gray-800">
                  <td className="py-2 pr-6 font-mono text-indigo-300 text-xs">{fn}</td>
                  <td className="py-2 text-gray-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">等値・比較アサーション</h2>
        <p className="text-gray-400 mb-4">
          最もよく使われるXCTAssertEqualとその仲間を使ってテストを書きます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

struct Temperature {
    let celsius: Double

    var fahrenheit: Double { celsius * 9/5 + 32 }
    var kelvin: Double { celsius + 273.15 }

    init(celsius: Double) { self.celsius = celsius }
}

class TemperatureTests: XCTestCase {

    func testFahrenheit() {
        let temp = Temperature(celsius: 100)
        // 浮動小数点の比較はaccuracyを指定
        XCTAssertEqual(temp.fahrenheit, 212.0, accuracy: 0.001)
    }

    func testKelvin() {
        let temp = Temperature(celsius: 0)
        XCTAssertEqual(temp.kelvin, 273.15, accuracy: 0.001)
    }

    func testFreezing() {
        let temp = Temperature(celsius: 0)
        XCTAssertEqual(temp.fahrenheit, 32.0)
        XCTAssertGreaterThanOrEqual(temp.celsius, 0)
    }

    func testBoiling() {
        let temp = Temperature(celsius: 100)
        XCTAssertGreaterThan(temp.fahrenheit, 200)
        XCTAssertLessThan(temp.celsius, temp.fahrenheit)
    }
}

// 動作確認
let t1 = Temperature(celsius: 100)
print("摂氏100° =", t1.fahrenheit, "°F")
print("摂氏100° =", t1.kelvin, "K")

let t2 = Temperature(celsius: 0)
print("摂氏0° =", t2.fahrenheit, "°F")`}
          expectedOutput={`摂氏100° = 212.0 °F
摂氏100° = 373.15 K
摂氏0° = 32.0 °F`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">nil・throws アサーション</h2>
        <p className="text-gray-400 mb-4">
          オプショナル値のテストとエラーを投げる関数のテストを書きます。
        </p>
        <SwiftEditor
          defaultCode={`import XCTest

enum ParseError: Error {
    case invalidFormat
    case outOfRange
}

struct Parser {
    func parseAge(_ str: String) throws -> Int {
        guard let age = Int(str) else {
            throw ParseError.invalidFormat
        }
        guard (0...150).contains(age) else {
            throw ParseError.outOfRange
        }
        return age
    }

    func parseOptionalEmail(_ str: String) -> String? {
        guard str.contains("@") else { return nil }
        return str
    }
}

class ParserTests: XCTestCase {

    let parser = Parser()

    func testParseValidAge() throws {
        // throwsはXCTAssertNoThrowかtry?で確認
        let age = try parser.parseAge("25")
        XCTAssertEqual(age, 25)
    }

    func testParseInvalidFormat() {
        XCTAssertThrowsError(try parser.parseAge("abc")) { error in
            XCTAssertEqual(error as? ParseError, .invalidFormat)
        }
    }

    func testParseOutOfRange() {
        XCTAssertThrowsError(try parser.parseAge("200"))
    }

    func testEmailValid() {
        let result = parser.parseOptionalEmail("test@example.com")
        XCTAssertNotNil(result)
        XCTAssertEqual(result, "test@example.com")
    }

    func testEmailInvalid() {
        let result = parser.parseOptionalEmail("notanemail")
        XCTAssertNil(result)
    }
}

let p = Parser()
print("年齢:", (try? p.parseAge("25")) as Any)
print("メール:", p.parseOptionalEmail("user@example.com") as Any)
print("無効メール:", p.parseOptionalEmail("invalid") as Any)`}
          expectedOutput={`年齢: Optional(25)
メール: Optional("user@example.com")
無効メール: nil`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="testing" lessonId="assertions" />
      </div>
      <LessonNav lessons={lessons} currentId="assertions" basePath="/learn/testing" />
    </div>
  );
}
