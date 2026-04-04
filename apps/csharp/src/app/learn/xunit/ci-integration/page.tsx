import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("xunit");

export default function XunitCiIntegrationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">xUnit レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CI統合</h1>
        <p className="text-gray-400">dotnet test、GitHub Actions、coverletによるコードカバレッジ計測を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CI/CDとテスト自動化</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CI（継続的インテグレーション）では、コードのプッシュのたびに自動でテストを実行します。GitHub Actionsを使えば.NETテストを簡単に自動化できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">dotnet test コマンド</h2>
        <p className="text-gray-400 mb-4">テスト実行のオプションを確認します。</p>
        <CSharpEditor
          defaultCode={`// dotnet test コマンドのオプション
Console.WriteLine("=== dotnet test コマンド ===");
Console.WriteLine();
Console.WriteLine("# 基本実行");
Console.WriteLine("dotnet test");
Console.WriteLine();
Console.WriteLine("# 詳細出力");
Console.WriteLine("dotnet test --verbosity normal");
Console.WriteLine();
Console.WriteLine("# 特定フィルターでテスト実行");
Console.WriteLine("dotnet test --filter \"FullyQualifiedName~Calculator\"");
Console.WriteLine("dotnet test --filter \"Category=Integration\"");
Console.WriteLine();
Console.WriteLine("# コードカバレッジ（coverlet使用）");
Console.WriteLine("dotnet test --collect:\"XPlat Code Coverage\"");
Console.WriteLine();
Console.WriteLine("# 結果をTRX形式で出力（CI向け）");
Console.WriteLine("dotnet test --logger \"trx;LogFileName=TestResults.trx\"");
Console.WriteLine();
Console.WriteLine("# リリースビルドでテスト");
Console.WriteLine("dotnet test -c Release");`}
          expectedOutput={`=== dotnet test コマンド ===

# 基本実行
dotnet test

# 詳細出力
dotnet test --verbosity normal

# 特定フィルターでテスト実行
dotnet test --filter "FullyQualifiedName~Calculator"
dotnet test --filter "Category=Integration"

# コードカバレッジ（coverlet使用）
dotnet test --collect:"XPlat Code Coverage"

# 結果をTRX形式で出力（CI向け）
dotnet test --logger "trx;LogFileName=TestResults.trx"

# リリースビルドでテスト
dotnet test -c Release`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">GitHub Actions ワークフロー</h2>
        <p className="text-gray-400 mb-4">プッシュ時に自動テストを実行するワークフローを設定します。</p>
        <CSharpEditor
          defaultCode={`// GitHub Actions ワークフロー例
// .github/workflows/dotnet.yml

string workflow = @"
name: .NET CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: 8.0.x

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore

    - name: Test with coverage
      run: dotnet test --no-build
             --collect:'XPlat Code Coverage'
             --logger 'trx;LogFileName=TestResults.trx'

    - name: Upload coverage
      uses: codecov/codecov-action@v4
";

Console.WriteLine(workflow.Trim());`}
          expectedOutput={`name: .NET CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: 8.0.x

    - name: Restore dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --no-restore

    - name: Test with coverage
      run: dotnet test --no-build
             --collect:'XPlat Code Coverage'
             --logger 'trx;LogFileName=TestResults.trx'

    - name: Upload coverage
      uses: codecov/codecov-action@v4`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="xunit" lessonId="ci-integration" />
      </div>
      <LessonNav lessons={lessons} currentId="ci-integration" basePath="/learn/xunit" />
    </div>
  );
}
