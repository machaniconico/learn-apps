import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("exceptions");

export default function CustomExceptionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">カスタム例外</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        std::exceptionやその派生クラスを継承して、アプリケーション固有の例外クラスを作成できます。
        what()をオーバーライドしてエラーメッセージを提供します。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なカスタム例外</h2>
        <p className="text-gray-400 mb-4">
          std::exceptionを継承し、what()メソッドをオーバーライドします。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <exception>
#include <string>
using namespace std;

class AppError : public exception {
    string msg;
public:
    AppError(const string& message) : msg(message) {}
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

class NetworkError : public AppError {
public:
    NetworkError(const string& url)
        : AppError("ネットワークエラー: " + url) {}
};

class AuthError : public AppError {
public:
    AuthError(const string& user)
        : AppError("認証失敗: " + user) {}
};

int main() {
    try {
        throw NetworkError("https://example.com");
    } catch (const AppError& e) {
        cout << e.what() << endl;
    }

    try {
        throw AuthError("太郎");
    } catch (const AppError& e) {
        cout << e.what() << endl;
    }

    return 0;
}`}
          expectedOutput={`ネットワークエラー: https://example.com
認証失敗: 太郎`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エラーコード付きカスタム例外</h2>
        <p className="text-gray-400 mb-4">
          エラーコードやその他の情報を持たせることで、より詳細なエラー情報を提供できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <exception>
#include <string>
using namespace std;

class HttpError : public exception {
    int statusCode;
    string message;
    string fullMsg;
public:
    HttpError(int code, const string& msg)
        : statusCode(code), message(msg) {
        fullMsg = "HTTP " + to_string(code) + ": " + msg;
    }
    const char* what() const noexcept override { return fullMsg.c_str(); }
    int getStatusCode() const { return statusCode; }
    const string& getMessage() const { return message; }
};

void fetchData(int code) {
    if (code == 404) throw HttpError(404, "Not Found");
    if (code == 500) throw HttpError(500, "Internal Server Error");
    cout << "成功 (200 OK)" << endl;
}

int main() {
    int codes[] = {200, 404, 500};
    for (int code : codes) {
        try {
            fetchData(code);
        } catch (const HttpError& e) {
            cout << e.what() << " [code=" << e.getStatusCode() << "]" << endl;
        }
    }
    return 0;
}`}
          expectedOutput={`成功 (200 OK)
HTTP 404: Not Found [code=404]
HTTP 500: Internal Server Error [code=500]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外階層の設計</h2>
        <p className="text-gray-400 mb-4">
          例外クラスの階層を設計すると、粒度を変えてキャッチできます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <exception>
#include <string>
using namespace std;

class FileError : public runtime_error {
public:
    FileError(const string& msg) : runtime_error(msg) {}
};

class FileNotFoundError : public FileError {
public:
    FileNotFoundError(const string& path)
        : FileError("ファイルが見つかりません: " + path) {}
};

class PermissionError : public FileError {
public:
    PermissionError(const string& path)
        : FileError("権限がありません: " + path) {}
};

int main() {
    // 個別にキャッチ
    try {
        throw FileNotFoundError("/tmp/data.txt");
    } catch (const FileNotFoundError& e) {
        cout << "[NotFound] " << e.what() << endl;
    }

    // まとめてキャッチ
    try {
        throw PermissionError("/etc/secret");
    } catch (const FileError& e) {
        cout << "[FileError] " << e.what() << endl;
    }

    return 0;
}`}
          expectedOutput={`[NotFound] ファイルが見つかりません: /tmp/data.txt
[FileError] 権限がありません: /etc/secret`}
        />
      </section>

      <LessonCompleteButton categoryId="exceptions" lessonId="custom-exceptions" />
      <LessonNav lessons={lessons} currentId="custom-exceptions" basePath="/learn/exceptions" />
    </div>
  );
}
