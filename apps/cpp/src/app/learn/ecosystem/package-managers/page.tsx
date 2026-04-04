import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("ecosystem");

export default function PackageManagersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">C++エコシステム レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">パッケージ管理</h1>
        <p className="text-gray-400">vcpkg・Conanによるライブラリ管理を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">C++のパッケージ管理</h2>
        <p className="text-gray-300 leading-relaxed">
          C++にはnpmやpipのような標準パッケージマネージャがありませんが、
          <strong>vcpkg</strong>（Microsoft製）と<strong>Conan</strong>（JFrog製）が
          事実上の標準として広く使われています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">vcpkg</h2>
        <p className="text-gray-400 mb-4">Microsoft製のC++パッケージマネージャの使い方です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== vcpkg ===" << endl;
    cout << "開発: Microsoft (オープンソース)" << endl;
    cout << endl;
    cout << "セットアップ:" << endl;
    cout << "  git clone https://github.com/microsoft/vcpkg" << endl;
    cout << "  cd vcpkg && ./bootstrap-vcpkg.sh" << endl;
    cout << endl;
    cout << "パッケージの検索:" << endl;
    cout << "  vcpkg search json" << endl;
    cout << endl;
    cout << "パッケージのインストール:" << endl;
    cout << "  vcpkg install nlohmann-json" << endl;
    cout << "  vcpkg install fmt" << endl;
    cout << "  vcpkg install boost" << endl;
    cout << endl;
    cout << "CMakeとの統合:" << endl;
    cout << "  cmake -B build -DCMAKE_TOOLCHAIN_FILE=" << endl;
    cout << "    [vcpkg root]/scripts/buildsystems/vcpkg.cmake" << endl;
    cout << endl;
    cout << "vcpkg.json (マニフェストモード):" << endl;
    cout << "  {" << endl;
    cout << "    \"dependencies\": [" << endl;
    cout << "      \"fmt\"," << endl;
    cout << "      \"nlohmann-json\"" << endl;
    cout << "    ]" << endl;
    cout << "  }" << endl;
    return 0;
}`}
          expectedOutput={`=== vcpkg ===
開発: Microsoft (オープンソース)

セットアップ:
  git clone https://github.com/microsoft/vcpkg
  cd vcpkg && ./bootstrap-vcpkg.sh

パッケージの検索:
  vcpkg search json

パッケージのインストール:
  vcpkg install nlohmann-json
  vcpkg install fmt
  vcpkg install boost

CMakeとの統合:
  cmake -B build -DCMAKE_TOOLCHAIN_FILE=
    [vcpkg root]/scripts/buildsystems/vcpkg.cmake

vcpkg.json (マニフェストモード):
  {
    "dependencies": [
      "fmt",
      "nlohmann-json"
    ]
  }`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Conan</h2>
        <p className="text-gray-400 mb-4">Python製のC++パッケージマネージャの使い方です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== Conan ===" << endl;
    cout << "開発: JFrog (オープンソース)" << endl;
    cout << endl;
    cout << "インストール:" << endl;
    cout << "  pip install conan" << endl;
    cout << endl;
    cout << "パッケージの検索:" << endl;
    cout << "  conan search '*' --remote=conancenter" << endl;
    cout << endl;
    cout << "conanfile.txt:" << endl;
    cout << "  [requires]" << endl;
    cout << "  fmt/10.1.1" << endl;
    cout << "  nlohmann_json/3.11.2" << endl;
    cout << "  [generators]" << endl;
    cout << "  CMakeDeps" << endl;
    cout << "  CMakeToolchain" << endl;
    cout << endl;
    cout << "ビルド:" << endl;
    cout << "  conan install . --build=missing" << endl;
    cout << "  cmake --preset conan-release" << endl;
    cout << "  cmake --build --preset conan-release" << endl;
    cout << endl;
    cout << "=== vcpkg vs Conan ===" << endl;
    cout << "vcpkg: CMakeとの統合が容易、Windowsに強い" << endl;
    cout << "Conan: バージョン管理が柔軟、CI/CDに強い" << endl;
    return 0;
}`}
          expectedOutput={`=== Conan ===
開発: JFrog (オープンソース)

インストール:
  pip install conan

パッケージの検索:
  conan search '*' --remote=conancenter

conanfile.txt:
  [requires]
  fmt/10.1.1
  nlohmann_json/3.11.2
  [generators]
  CMakeDeps
  CMakeToolchain

ビルド:
  conan install . --build=missing
  cmake --preset conan-release
  cmake --build --preset conan-release

=== vcpkg vs Conan ===
vcpkg: CMakeとの統合が容易、Windowsに強い
Conan: バージョン管理が柔軟、CI/CDに強い`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="ecosystem" lessonId="package-managers" />
      </div>
      <LessonNav lessons={lessons} currentId="package-managers" basePath="/learn/ecosystem" />
    </div>
  );
}
