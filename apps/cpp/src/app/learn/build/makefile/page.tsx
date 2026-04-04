import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("build");

export default function MakefilePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">コンパイル・ビルド レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Makefile</h1>
        <p className="text-gray-400">Makeによるビルドの自動化を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Makefileとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Makefileはビルドルールを定義するファイルです。
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">make</code> コマンドで実行すると、
          変更されたファイルだけを自動的に再コンパイルします。
          ターゲット、依存関係、コマンドの3要素で構成されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Makefileの基本構造</h2>
        <p className="text-gray-400 mb-4">Makefileの構文とプロジェクト構成の例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== 基本的なMakefile ===" << endl;
    cout << endl;
    cout << "# コンパイラとフラグの定義" << endl;
    cout << "CXX = g++" << endl;
    cout << "CXXFLAGS = -std=c++17 -Wall -Wextra" << endl;
    cout << "TARGET = myapp" << endl;
    cout << "SRCS = main.cpp utils.cpp math.cpp" << endl;
    cout << "OBJS = $(SRCS:.cpp=.o)" << endl;
    cout << endl;
    cout << "# デフォルトターゲット" << endl;
    cout << "all: $(TARGET)" << endl;
    cout << endl;
    cout << "# リンク" << endl;
    cout << "$(TARGET): $(OBJS)" << endl;
    cout << "\\t$(CXX) $(OBJS) -o $(TARGET)" << endl;
    cout << endl;
    cout << "# コンパイルルール" << endl;
    cout << "%.o: %.cpp" << endl;
    cout << "\\t$(CXX) $(CXXFLAGS) -c $< -o $@" << endl;
    cout << endl;
    cout << "# クリーン" << endl;
    cout << "clean:" << endl;
    cout << "\\trm -f $(OBJS) $(TARGET)" << endl;
    cout << endl;
    cout << ".PHONY: all clean" << endl;
    return 0;
}`}
          expectedOutput={`=== 基本的なMakefile ===

# コンパイラとフラグの定義
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET = myapp
SRCS = main.cpp utils.cpp math.cpp
OBJS = $(SRCS:.cpp=.o)

# デフォルトターゲット
all: $(TARGET)

# リンク
$(TARGET): $(OBJS)
	$(CXX) $(OBJS) -o $(TARGET)

# コンパイルルール
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# クリーン
clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: all clean`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Makeの自動変数</h2>
        <p className="text-gray-400 mb-4">Makefileでよく使われる自動変数の一覧です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    cout << "=== Make自動変数 ===" << endl;
    cout << "$@  : ターゲット名" << endl;
    cout << "$<  : 最初の依存ファイル" << endl;
    cout << "$^  : 全依存ファイル（重複なし）" << endl;
    cout << "$?  : ターゲットより新しい依存ファイル" << endl;
    cout << "$*  : パターンのステム部分" << endl;
    cout << endl;
    cout << "=== makeコマンド ===" << endl;
    cout << "make          : デフォルトターゲットをビルド" << endl;
    cout << "make clean    : cleanターゲットを実行" << endl;
    cout << "make -j4      : 4並列でビルド" << endl;
    cout << "make -B       : 全ファイルを強制リビルド" << endl;
    cout << "make -n       : 実行せずコマンドを表示" << endl;
    return 0;
}`}
          expectedOutput={`=== Make自動変数 ===
$@  : ターゲット名
$<  : 最初の依存ファイル
$^  : 全依存ファイル（重複なし）
$?  : ターゲットより新しい依存ファイル
$*  : パターンのステム部分

=== makeコマンド ===
make          : デフォルトターゲットをビルド
make clean    : cleanターゲットを実行
make -j4      : 4並列でビルド
make -B       : 全ファイルを強制リビルド
make -n       : 実行せずコマンドを表示`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="build" lessonId="makefile" />
      </div>
      <LessonNav lessons={lessons} currentId="makefile" basePath="/learn/build" />
    </div>
  );
}
