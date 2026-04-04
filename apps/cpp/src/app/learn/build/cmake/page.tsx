import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function CMakePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンパイル・ビルド レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">CMake</h1>
        <p className="text-gray-400">CMakeによるクロスプラットフォームビルドを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">CMakeとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          CMakeはメタビルドシステムです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">CMakeLists.txt</code> にビルド設定を記述し、
          各プラットフォーム用のビルドファイル（Makefile、Visual Studioプロジェクトなど）を自動生成します。
          現在のC++プロジェクトの事実上の標準ビルドシステムです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なCMakeLists.txt</h2>
        <p className="text-gray-400 mb-4">シンプルなCMakeプロジェクトの構成です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== 基本的なCMakeLists.txt ===" << endl;
    cout << endl;
    cout << "cmake_minimum_required(VERSION 3.16)" << endl;
    cout << "project(MyApp VERSION 1.0 LANGUAGES CXX)" << endl;
    cout << endl;
    cout << "# C++17を使用" << endl;
    cout << "set(CMAKE_CXX_STANDARD 17)" << endl;
    cout << "set(CMAKE_CXX_STANDARD_REQUIRED ON)" << endl;
    cout << endl;
    cout << "# 実行ファイルの作成" << endl;
    cout << "add_executable(myapp" << endl;
    cout << "    src/main.cpp" << endl;
    cout << "    src/utils.cpp" << endl;
    cout << "    src/math.cpp" << endl;
    cout << ")" << endl;
    cout << endl;
    cout << "# インクルードディレクトリの追加" << endl;
    cout << "target_include_directories(myapp PRIVATE include)" << endl;
    cout << endl;
    cout << "=== ビルド手順 ===" << endl;
    cout << "mkdir build && cd build" << endl;
    cout << "cmake .." << endl;
    cout << "cmake --build ." << endl;
    return 0;
}`}
          expectedOutput={`=== 基本的なCMakeLists.txt ===

cmake_minimum_required(VERSION 3.16)
project(MyApp VERSION 1.0 LANGUAGES CXX)

# C++17を使用
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 実行ファイルの作成
add_executable(myapp
    src/main.cpp
    src/utils.cpp
    src/math.cpp
)

# インクルードディレクトリの追加
target_include_directories(myapp PRIVATE include)

=== ビルド手順 ===
mkdir build && cd build
cmake ..
cmake --build .`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ライブラリとfind_package</h2>
        <p className="text-gray-400 mb-4">ライブラリの作成と外部ライブラリの利用方法です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== ライブラリの作成 ===" << endl;
    cout << endl;
    cout << "# 静的ライブラリ" << endl;
    cout << "add_library(mylib STATIC" << endl;
    cout << "    src/mylib.cpp" << endl;
    cout << ")" << endl;
    cout << endl;
    cout << "# 共有ライブラリ" << endl;
    cout << "add_library(mylib SHARED" << endl;
    cout << "    src/mylib.cpp" << endl;
    cout << ")" << endl;
    cout << endl;
    cout << "# ライブラリをリンク" << endl;
    cout << "target_link_libraries(myapp PRIVATE mylib)" << endl;
    cout << endl;
    cout << "=== 外部ライブラリ ===" << endl;
    cout << endl;
    cout << "# find_packageでライブラリを検索" << endl;
    cout << "find_package(Threads REQUIRED)" << endl;
    cout << "target_link_libraries(myapp" << endl;
    cout << "    PRIVATE Threads::Threads" << endl;
    cout << ")" << endl;
    cout << endl;
    cout << "# FetchContentで自動ダウンロード" << endl;
    cout << "include(FetchContent)" << endl;
    cout << "FetchContent_Declare(googletest" << endl;
    cout << "    GIT_REPOSITORY https://github.com/..." << endl;
    cout << "    GIT_TAG v1.14.0" << endl;
    cout << ")" << endl;
    cout << "FetchContent_MakeAvailable(googletest)" << endl;
    return 0;
}`}
          expectedOutput={`=== ライブラリの作成 ===

# 静的ライブラリ
add_library(mylib STATIC
    src/mylib.cpp
)

# 共有ライブラリ
add_library(mylib SHARED
    src/mylib.cpp
)

# ライブラリをリンク
target_link_libraries(myapp PRIVATE mylib)

=== 外部ライブラリ ===

# find_packageでライブラリを検索
find_package(Threads REQUIRED)
target_link_libraries(myapp
    PRIVATE Threads::Threads
)

# FetchContentで自動ダウンロード
include(FetchContent)
FetchContent_Declare(googletest
    GIT_REPOSITORY https://github.com/...
    GIT_TAG v1.14.0
)
FetchContent_MakeAvailable(googletest)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="cmake" />
      </div>
      <LessonNav lessons={lessons} currentId="cmake" basePath="/learn/build" />
    </div>
  );
}
