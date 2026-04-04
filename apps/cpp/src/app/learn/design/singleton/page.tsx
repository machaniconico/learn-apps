import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function SingletonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">デザインパターン レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Singletonパターン</h1>
        <p className="text-gray-400">インスタンスを1つに制限するSingletonの実装を学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Singletonパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Singletonパターンは、クラスのインスタンスが1つしか存在しないことを保証するデザインパターンです。
          ログ管理、設定管理、データベース接続プールなどで使われます。
          C++11以降では <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">static</code> ローカル変数の
          スレッドセーフな初期化が保証されるため、Meyer's Singletonが推奨されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Meyer's Singleton</h2>
        <p className="text-gray-400 mb-4">C++11以降の推奨実装パターンです。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

class Config {
private:
    string appName_;
    int version_;

    // コンストラクタをprivateに
    Config() : appName_("MyApp"), version_(1) {
        cout << "Config インスタンス作成" << endl;
    }

public:
    // コピー・ムーブを禁止
    Config(const Config&) = delete;
    Config& operator=(const Config&) = delete;

    // staticローカル変数で唯一のインスタンスを管理
    static Config& getInstance() {
        static Config instance;  // C++11以降スレッドセーフ
        return instance;
    }

    void setAppName(const string& name) { appName_ = name; }
    string getAppName() const { return appName_; }
    int getVersion() const { return version_; }
};

int main() {
    // 最初のアクセスでインスタンスが作成される
    Config& c1 = Config::getInstance();
    cout << "アプリ名: " << c1.getAppName() << endl;

    // 同じインスタンスを取得
    Config& c2 = Config::getInstance();
    c2.setAppName("SuperApp");

    // c1とc2は同じオブジェクト
    cout << "変更後: " << c1.getAppName() << endl;
    cout << "同一: " << (&c1 == &c2 ? "はい" : "いいえ") << endl;
    return 0;
}`}
          expectedOutput={`Config インスタンス作成
アプリ名: MyApp
変更後: SuperApp
同一: はい`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートSingleton</h2>
        <p className="text-gray-400 mb-4">テンプレートで汎用的なSingletonベースクラスを作る例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

template<typename T>
class Singleton {
public:
    static T& getInstance() {
        static T instance;
        return instance;
    }
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
protected:
    Singleton() = default;
    ~Singleton() = default;
};

class Logger : public Singleton<Logger> {
    friend class Singleton<Logger>;
    string log_;
    Logger() = default;
public:
    void write(const string& msg) { log_ += msg + "\\n"; }
    void print() const { cout << log_; }
};

class Counter : public Singleton<Counter> {
    friend class Singleton<Counter>;
    int count_ = 0;
    Counter() = default;
public:
    void increment() { count_++; }
    int get() const { return count_; }
};

int main() {
    Logger::getInstance().write("起動");
    Counter::getInstance().increment();
    Counter::getInstance().increment();
    Logger::getInstance().write("カウント: " + to_string(Counter::getInstance().get()));
    Logger::getInstance().print();
    return 0;
}`}
          expectedOutput={`起動
カウント: 2`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="singleton" />
      </div>
      <LessonNav lessons={lessons} currentId="singleton" basePath="/learn/design" />
    </div>
  );
}
