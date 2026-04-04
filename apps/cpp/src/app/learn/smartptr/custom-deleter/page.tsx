import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("smartptr");

export default function CustomDeleterPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">スマートポインタ レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">カスタムデリータ</h1>
        <p className="text-gray-400">独自のリソース解放処理を指定する方法を学びます</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">カスタムデリータとは</h2>
        <p className="text-gray-300 leading-relaxed">
          スマートポインタのデフォルトのデリータは <code className="text-pink-400">delete</code> を呼びますが、
          ファイルハンドルやネットワーク接続など、delete以外の解放処理が必要な場合があります。
          カスタムデリータを指定することで、スマートポインタの破棄時に独自の解放処理を実行できます。
          ラムダ式、関数ポインタ、関数オブジェクトのいずれも使用可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ラムダ式によるカスタムデリータ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

struct FileHandle {
    string filename;
    FileHandle(const string& f) : filename(f) {
        cout << filename << " を開きました" << endl;
    }
};

// Cライブラリ風のリソース管理を模擬
struct CResource {
    int id;
};

CResource* createResource(int id) {
    cout << "リソース " << id << " を確保" << endl;
    auto r = new CResource{id};
    return r;
}

void destroyResource(CResource* r) {
    cout << "リソース " << r->id << " を解放" << endl;
    delete r;
}

int main() {
    // ラムダ式でカスタムデリータを指定
    auto fileDeleter = [](FileHandle* fh) {
        cout << fh->filename << " を閉じました" << endl;
        delete fh;
    };

    {
        unique_ptr<FileHandle, decltype(fileDeleter)> file(
            new FileHandle("data.txt"), fileDeleter
        );
        cout << "ファイルを使用中..." << endl;
    }

    cout << "---" << endl;

    // 関数ポインタでカスタムデリータ
    {
        unique_ptr<CResource, decltype(&destroyResource)> res(
            createResource(42), destroyResource
        );
        cout << "リソースを使用中..." << endl;
    }

    return 0;
}`}
          expectedOutput={`data.txt を開きました
ファイルを使用中...
data.txt を閉じました
---
リソース 42 を確保
リソースを使用中...
リソース 42 を解放`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">shared_ptrのカスタムデリータ</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

class Logger {
    string name;
public:
    Logger(const string& n) : name(n) {
        cout << "[" << name << "] ログ開始" << endl;
    }
    void log(const string& msg) const {
        cout << "[" << name << "] " << msg << endl;
    }
};

int main() {
    // shared_ptr はデリータを型に含めない
    shared_ptr<Logger> logger(
        new Logger("App"),
        [](Logger* l) {
            l->log("シャットダウン");
            delete l;
        }
    );

    logger->log("処理開始");
    logger->log("処理中...");

    // 配列を shared_ptr で管理
    shared_ptr<int[]> arr(new int[5], [](int* p) {
        cout << "配列を解放" << endl;
        delete[] p;
    });

    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 100;
    }
    cout << "arr[2] = " << arr[2] << endl;

    return 0;
}`}
          expectedOutput={`[App] ログ開始
[App] 処理開始
[App] 処理中...
arr[2] = 300
配列を解放
[App] シャットダウン`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="smartptr" lessonId="custom-deleter" />
      </div>
      <LessonNav lessons={lessons} currentId="custom-deleter" basePath="/learn/smartptr" />
    </div>
  );
}
