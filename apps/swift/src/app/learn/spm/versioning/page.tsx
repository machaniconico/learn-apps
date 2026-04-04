import { SwiftEditor } from "@/components/swift-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "spm")!.lessons;

export default function VersioningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Swift Package Manager レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バージョニング</h1>
        <p className="text-gray-400">Semantic Versioningとバージョン解決ルールを理解します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Semantic Versioning（SemVer）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SPMは<code className="text-green-300">Semantic Versioning（セマンティックバージョニング）</code>に従ってバージョンを管理します。
          バージョン番号は<code className="text-green-300">MAJOR.MINOR.PATCH</code>の形式で、それぞれの数字が変わる意味が明確に定義されています。
          SPMはこのルールを使って互換性のあるバージョンを自動的に選択します。
        </p>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 font-semibold mb-1">MAJOR (破壊的変更)</p>
            <p className="text-gray-400 text-xs">後方互換性のないAPI変更。利用側のコード修正が必要。例: 1.0.0 → 2.0.0</p>
          </div>
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 font-semibold mb-1">MINOR (機能追加)</p>
            <p className="text-gray-400 text-xs">後方互換性のある新機能追加。既存コードは影響なし。例: 1.0.0 → 1.1.0</p>
          </div>
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-semibold mb-1">PATCH (バグ修正)</p>
            <p className="text-gray-400 text-xs">後方互換性のあるバグ修正のみ。例: 1.0.0 → 1.0.1</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例1: バージョン番号の意味と比較</h2>
        <SwiftEditor
          defaultCode={`import Foundation

// Semantic Versioningの実装と比較

struct Version: Comparable, CustomStringConvertible {
    let major: Int
    let minor: Int
    let patch: Int

    var description: String { "\\(major).\\(minor).\\(patch)" }

    init?(_ string: String) {
        let parts = string.split(separator: ".").compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        major = parts[0]; minor = parts[1]; patch = parts[2]
    }

    static func < (lhs: Version, rhs: Version) -> Bool {
        if lhs.major != rhs.major { return lhs.major < rhs.major }
        if lhs.minor != rhs.minor { return lhs.minor < rhs.minor }
        return lhs.patch < rhs.patch
    }

    // 後方互換性があるかチェック（MAJORが同じ）
    func isCompatible(with other: Version) -> Bool {
        return self.major == other.major && self >= other
    }

    func isBreaking(from other: Version) -> Bool {
        return self.major > other.major
    }
}

let v100 = Version("1.0.0")!
let v110 = Version("1.1.0")!
let v101 = Version("1.0.1")!
let v200 = Version("2.0.0")!

print("バージョン比較:")
print("  1.0.0 < 1.1.0:", v100 < v110)
print("  1.1.0 > 1.0.1:", v110 > v101)
print("  2.0.0 > 1.1.0:", v200 > v110)

print("\\n互換性チェック:")
print("  1.1.0 is compatible with 1.0.0:", v110.isCompatible(with: v100))
print("  2.0.0 is breaking from 1.1.0:", v200.isBreaking(from: v110))
print("  1.0.1 is compatible with 1.0.0:", v101.isCompatible(with: v100))

// バージョン履歴シミュレーション
let history: [(Version, String)] = [
    (Version("1.0.0")!, "初回リリース"),
    (Version("1.0.1")!, "クラッシュバグを修正"),
    (Version("1.1.0")!, "ダークモード対応を追加"),
    (Version("1.2.0")!, "新しいAPIを追加"),
    (Version("2.0.0")!, "APIを刷新（破壊的変更）"),
]
print("\\nバージョン履歴:")
for (v, note) in history {
    let breaking = v.major > 1 || (v == Version("1.0.0")!) ? "" : ""
    print("  v\\(v): \\(note)")`}
          expectedOutput={`バージョン比較:
  1.0.0 < 1.1.0: true
  1.1.0 > 1.0.1: true
  2.0.0 > 1.1.0: true

互換性チェック:
  1.1.0 is compatible with 1.0.0: true
  2.0.0 is breaking from 1.1.0: true
  1.0.1 is compatible with 1.0.0: true

バージョン履歴:
  v1.0.0: 初回リリース
  v1.0.1: クラッシュバグを修正
  v1.1.0: ダークモード対応を追加
  v1.2.0: 新しいAPIを追加
  v2.0.0: APIを刷新（破壊的変更）`}
        />
      </section>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Package.resolvedとバージョン解決</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SPMは依存パッケージのバージョンを<code className="text-green-300">Package.resolved</code>ファイルに記録します。
          このファイルをGitで管理することで、チーム全員が同じバージョンを使用できます。
          <code className="text-green-300">swift package update</code>で解決バージョンを更新できます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">Package.resolved</code> — 解決済みバージョンのロックファイル</li>
          <li><code className="text-blue-300">swift package update</code> — すべての依存を最新の互換バージョンに更新</li>
          <li><code className="text-blue-300">swift package update PackageName</code> — 特定パッケージのみ更新</li>
          <li><code className="text-blue-300">swift package resolve</code> — Package.resolvedに従ってバージョンを固定</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">例2: バージョン解決ルールのシミュレーション</h2>
        <SwiftEditor
          defaultCode={`// SPMのバージョン解決ルールを理解する

struct VersionRange {
    let minimum: String
    let maximum: String?
    let type: String

    func contains(_ version: String) -> Bool {
        // 簡易シミュレーション
        let parts = version.split(separator: ".").compactMap { Int($0) }
        let minParts = minimum.split(separator: ".").compactMap { Int($0) }
        guard parts.count == 3, minParts.count == 3 else { return false }

        switch type {
        case "upToNextMajor":
            // MAJORが同じで、バージョンが以上
            return parts[0] == minParts[0] &&
                   (parts[1] > minParts[1] || (parts[1] == minParts[1] && parts[2] >= minParts[2]))
        case "upToNextMinor":
            // MAJORとMINORが同じで、PATCHが以上
            return parts[0] == minParts[0] && parts[1] == minParts[1] && parts[2] >= minParts[2]
        case "exact":
            return version == minimum
        default:
            return false
        }
    }
}

// バージョン指定ルールのテスト
let rules: [(String, VersionRange)] = [
    ("from: \"1.2.0\" (upToNextMajor)", VersionRange(minimum: "1.2.0", maximum: "2.0.0", type: "upToNextMajor")),
    (".upToNextMinor(from: \"1.2.0\")", VersionRange(minimum: "1.2.0", maximum: "1.3.0", type: "upToNextMinor")),
    ("exact: \"1.2.3\"", VersionRange(minimum: "1.2.3", maximum: "1.2.3", type: "exact")),
]

let testVersions = ["1.1.9", "1.2.0", "1.2.5", "1.3.0", "1.9.9", "2.0.0"]

for (ruleName, rule) in rules {
    print("\\n\\(ruleName):")
    for v in testVersions {
        let included = rule.contains(v)
        print("  v\\(v): \\(included ? "含む" : "除外")")
    }
}`}
          expectedOutput={`from: "1.2.0" (upToNextMajor):
  v1.1.9: 除外
  v1.2.0: 含む
  v1.2.5: 含む
  v1.3.0: 含む
  v1.9.9: 含む
  v2.0.0: 除外

.upToNextMinor(from: "1.2.0"):
  v1.1.9: 除外
  v1.2.0: 含む
  v1.2.5: 含む
  v1.3.0: 除外
  v1.9.9: 除外
  v2.0.0: 除外

exact: "1.2.3":
  v1.1.9: 除外
  v1.2.0: 除外
  v1.2.5: 除外
  v1.3.0: 除外
  v1.9.9: 除外
  v2.0.0: 除外`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="spm" lessonId="versioning" />
      </div>
      <LessonNav lessons={lessons} currentId="versioning" basePath="/learn/spm" />
    </div>
  );
}
