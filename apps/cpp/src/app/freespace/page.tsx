import { CppEditor } from "@/components/cpp-editor";

const DEFAULT_CODE = `// C++ FizzBuzz & ベクター・アルゴリズム操作
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

int main() {
    // FizzBuzz
    std::cout << "=== FizzBuzz (1-20) ===" << std::endl;
    for (int i = 1; i <= 20; i++) {
        if (i % 15 == 0) std::cout << "FizzBuzz ";
        else if (i % 3 == 0) std::cout << "Fizz ";
        else if (i % 5 == 0) std::cout << "Buzz ";
        else std::cout << i << " ";
    }
    std::cout << std::endl;

    // vector + algorithm
    std::cout << "\\n=== ベクター操作 ===" << std::endl;
    std::vector<int> numbers(10);
    std::iota(numbers.begin(), numbers.end(), 1); // 1〜10

    std::vector<int> evens;
    std::copy_if(numbers.begin(), numbers.end(),
                 std::back_inserter(evens),
                 [](int n) { return n % 2 == 0; });

    std::cout << "偶数とその二乗:" << std::endl;
    for (int n : evens) {
        std::cout << "  " << n << " -> " << n * n << std::endl;
    }

    // map (std::map)
    std::cout << "\\n=== std::map ===" << std::endl;
    #include <map>
    std::map<std::string, int> scores = {
        {"太郎", 85}, {"花子", 92}, {"次郎", 78}
    };

    auto top = std::max_element(scores.begin(), scores.end(),
        [](const auto& a, const auto& b) { return a.second < b.second; });
    std::cout << "最高得点: " << top->first
              << " (" << top->second << "点)" << std::endl;

    double avg = 0;
    for (const auto& [name, score] : scores) avg += score;
    avg /= scores.size();
    std::cout << "平均点: " << avg << std::endl;

    return 0;
}
`;

export default function FreespacePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🚀</span>
            <h1 className="text-3xl font-bold text-gray-100">C++フリースペース</h1>
          </div>
          <p className="text-gray-400 text-lg">
            C++コードを自由に書いて実行できるフリースペースです
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ブラウザ上で動作（インストール不要）
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ctrl+Enter で実行
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Tabキーでインデント
            </div>
          </div>
        </div>

        {/* Editor */}
        <CppEditor defaultCode={DEFAULT_CODE} height="480px" />

        {/* Tips */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">基本構文</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              変数宣言、制御構文、関数定義、クラスなどC++の基本的な構文を自由に試せます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">STL・アルゴリズム</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              vector, map, algorithm, rangesなどのSTL機能をブラウザ上で確認できます。
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">注意事項</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              ファイルシステムへのアクセスやネットワーク通信はブラウザのセキュリティ制限により一部制限があります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
