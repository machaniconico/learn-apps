import { CppEditor } from "@/components/cpp-editor";
import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function ErrorHandlingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">エラーハンドリング</h1>
      <p className="text-gray-400 mb-6 leading-relaxed">
        ファイルI/Oでは様々なエラーが発生する可能性があります。ストリームの状態フラグを確認して
        適切にエラーを処理する方法を学びます。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ストリームの状態フラグ</h2>
        <p className="text-gray-400 mb-4">
          good()、eof()、fail()、bad()でストリームの状態を確認できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    // 正常な読み込み
    istringstream iss("42 hello");
    int n;
    string s;
    iss >> n >> s;
    cout << "読み込み: " << n << ", " << s << endl;
    cout << "good: " << boolalpha << iss.good() << endl;
    cout << "eof: " << iss.eof() << endl;

    // 型の不一致でfailが発生
    istringstream iss2("abc");
    int val;
    iss2 >> val;
    cout << endl << "型不一致:" << endl;
    cout << "fail: " << iss2.fail() << endl;
    cout << "bad: " << iss2.bad() << endl;

    // clearでフラグをリセット
    iss2.clear();
    cout << "clear後 fail: " << iss2.fail() << endl;

    return 0;
}`}
          expectedOutput={`読み込み: 42, hello
good: false
eof: true

型不一致:
fail: true
bad: false
clear後 fail: false`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">例外を使ったエラー処理</h2>
        <p className="text-gray-400 mb-4">
          exceptions()メソッドでストリームのエラー時に例外を投げるように設定できます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    istringstream iss("10 20 abc 30");

    // failbitで例外を発生させる設定
    iss.exceptions(ios::failbit);

    try {
        int val;
        while (true) {
            iss >> val;
            cout << "読み込み: " << val << endl;
        }
    } catch (const ios_base::failure& e) {
        cout << "読み込みエラー発生" << endl;
        cout << "残りデータを処理できません" << endl;
    }

    return 0;
}`}
          expectedOutput={`読み込み: 10
読み込み: 20
読み込みエラー発生
残りデータを処理できません`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">堅牢なファイル読み込みパターン</h2>
        <p className="text-gray-400 mb-4">
          実際のアプリケーションでは、エラーチェックを組み込んだ堅牢なパターンを使います。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

struct ParseResult {
    bool success;
    vector<pair<string, int>> data;
    string error;
};

ParseResult parseData(const string& input) {
    ParseResult result;
    istringstream iss(input);
    string name;
    int score;
    int lineNum = 0;

    string line;
    while (getline(iss, line)) {
        lineNum++;
        istringstream lineStream(line);
        if (!(lineStream >> name >> score)) {
            result.success = false;
            result.error = "行" + to_string(lineNum) + "のパースに失敗";
            return result;
        }
        result.data.push_back({name, score});
    }

    result.success = true;
    return result;
}

int main() {
    // 正常データ
    auto r1 = parseData("太郎 90\\n花子 85\\n次郎 78");
    if (r1.success) {
        cout << "=== 正常 ===" << endl;
        for (const auto& [name, score] : r1.data)
            cout << name << ": " << score << endl;
    }

    // 不正データ
    auto r2 = parseData("太郎 90\\n不正データ\\n次郎 78");
    if (!r2.success) {
        cout << "=== エラー ===" << endl;
        cout << r2.error << endl;
    }

    return 0;
}`}
          expectedOutput={`=== 正常 ===
太郎: 90
花子: 85
次郎: 78
=== エラー ===
行2のパースに失敗`}
        />
      </section>

      <LessonCompleteButton categoryId="fileio" lessonId="error-handling" />
      <LessonNav lessons={lessons} currentId="error-handling" basePath="/learn/fileio" />
    </div>
  );
}
