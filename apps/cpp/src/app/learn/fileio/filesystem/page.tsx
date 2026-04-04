import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function FilesystemPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">std::filesystem</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        C++17で導入されたstd::filesystemライブラリは、ファイルやディレクトリの操作を
        ポータブルに行うための機能を提供します。パスの操作、存在確認、ディレクトリ走査などが可能です。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pathクラスの基本</h2>
        <p className="text-gray-400 mb-4">
          filesystem::pathはファイルパスを表すクラスで、パスの分解・結合が簡単にできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <filesystem>
using namespace std;
namespace fs = filesystem;

int main() {
    fs::path p("/home/user/documents/report.txt");

    cout << "パス: " << p << endl;
    cout << "ファイル名: " << p.filename() << endl;
    cout << "拡張子: " << p.extension() << endl;
    cout << "stem: " << p.stem() << endl;
    cout << "親: " << p.parent_path() << endl;

    // パスの結合
    fs::path dir("/home/user");
    fs::path file = dir / "projects" / "main.cpp";
    cout << "結合: " << file << endl;

    // 拡張子の変更
    fs::path newPath = p;
    newPath.replace_extension(".pdf");
    cout << "拡張子変更: " << newPath << endl;

    return 0;
}`}
          expectedOutput={`パス: "/home/user/documents/report.txt"
ファイル名: "report.txt"
拡張子: ".txt"
stem: "report"
親: "/home/user/documents"
結合: "/home/user/projects/main.cpp"
拡張子変更: "/home/user/documents/report.pdf"`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイル情報の取得</h2>
        <p className="text-gray-400 mb-4">
          exists、is_regular_file、file_sizeなどでファイルの情報を取得できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <filesystem>
using namespace std;
namespace fs = filesystem;

int main() {
    // 存在確認のシミュレーション
    fs::path p1("/usr/bin");
    fs::path p2("/nonexistent/path");

    cout << p1 << " exists: " << boolalpha << fs::exists(p1) << endl;
    cout << p2 << " exists: " << boolalpha << fs::exists(p2) << endl;

    // パスの種類を確認
    if (fs::exists(p1)) {
        cout << p1 << " is_directory: " << fs::is_directory(p1) << endl;
    }

    // カレントディレクトリ
    cout << "カレント: " << fs::current_path() << endl;

    return 0;
}`}
          expectedOutput={`"/usr/bin" exists: true
"/nonexistent/path" exists: false
"/usr/bin" is_directory: true
カレント: "/home/user"`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">パスの反復処理</h2>
        <p className="text-gray-400 mb-4">
          pathの各コンポーネントをイテレータで走査できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <filesystem>
using namespace std;
namespace fs = filesystem;

int main() {
    fs::path p("/home/user/projects/main.cpp");

    // パスのコンポーネントを列挙
    cout << "コンポーネント:" << endl;
    for (const auto& part : p) {
        cout << "  " << part << endl;
    }

    // 相対パスの解決
    fs::path base("/home/user");
    fs::path rel("projects/main.cpp");
    cout << "結合: " << (base / rel) << endl;

    // 正規化
    fs::path messy("/home/user/../user/./projects//main.cpp");
    cout << "正規化前: " << messy << endl;
    cout << "正規化後: " << messy.lexically_normal() << endl;

    return 0;
}`}
          expectedOutput={`コンポーネント:
  "/"
  "home"
  "user"
  "projects"
  "main.cpp"
結合: "/home/user/projects/main.cpp"
正規化前: "/home/user/../user/./projects//main.cpp"
正規化後: "/home/user/projects/main.cpp"`}
        />
      </section>

      <LessonCompleteButton categoryId="fileio" lessonId="filesystem" />
      <LessonNav lessons={lessons} currentId="filesystem" basePath="/learn/fileio" />
    </div>
  );
}
