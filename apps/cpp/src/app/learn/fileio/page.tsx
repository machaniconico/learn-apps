import { CppEditor } from "@/components/cpp-editor";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { LessonList } from "@/components/lesson-list";
import { ProgressBar } from "@/components/progress-bar";
import { Quiz, type QuizQuestion } from "@/components/quiz";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

const quizQuestions: QuizQuestion[] = [
  {
    question: "ファイルからテキストを読み込むために使うクラスはどれですか？",
    options: [
      "std::ifstream",
      "std::ofstream",
      "std::fstream",
      "std::iostream",
    ],
    answer: 0,
    explanation: "std::ifstream（input file stream）はファイルからの読み込み専用のストリームクラスです。",
  },
  {
    question: "バイナリモードでファイルを開くために指定するフラグはどれですか？",
    options: [
      "ios::binary",
      "ios::raw",
      "ios::byte",
      "ios::bin",
    ],
    answer: 0,
    explanation: "ios::binaryフラグを指定すると、テキスト変換を行わずにバイナリモードでファイルを開けます。",
  },
  {
    question: "std::filesystem（C++17）でファイルが存在するか確認する関数はどれですか？",
    options: [
      "std::filesystem::exists()",
      "std::filesystem::is_file()",
      "std::filesystem::check()",
      "std::filesystem::find()",
    ],
    answer: 0,
    explanation: "std::filesystem::exists()はファイルやディレクトリの存在を確認するための関数です。",
  },
  {
    question: "stringstreamの用途として正しいものはどれですか？",
    options: [
      "文字列をストリームとして扱い、数値との変換や文字列の構築を行う",
      "ファイルの読み書きを行う",
      "ネットワーク通信を行う",
      "標準入出力をリダイレクトする",
    ],
    answer: 0,
    explanation: "stringstreamは文字列をストリームとして扱えるクラスで、文字列から数値への変換や文字列の構築に便利です。",
  },
];

export default function FileioPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-2">ファイルI/O</h1>
        <div className="flex items-center gap-3 mb-3">
          <DifficultyBadge difficulty="intermediate" />
          <span className="text-gray-500 text-sm">6レッスン</span>
        </div>
        <p className="text-gray-400 leading-relaxed">
          C++でのファイル入出力を学びましょう。ifstream・ofstreamによるテキストファイルの読み書き、
          バイナリI/O、C++17のfilesystemライブラリ、stringstreamの活用、エラーハンドリングまで扱います。
        </p>
      </div>

      <div className="mb-8">
        <ProgressBar categoryId="fileio" totalLessons={6} color="indigo" />
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">全6レッスン</h2>
        <LessonList lessons={lessons} basePath="/learn/fileio" color="indigo" categoryId="fileio" />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファイル読み書きの概要</h2>
        <p className="text-gray-400 mb-4">
          ofstreamでファイルに書き込み、ifstreamでファイルから読み込みます。ストリーム演算子（&lt;&lt;/&gt;&gt;）やgetlineを使います。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
using namespace std;

int main() {
    // stringstreamでファイルI/Oをシミュレーション
    stringstream file;

    // 書き込み
    file << "名前: 太郎" << endl;
    file << "年齢: 20" << endl;
    file << "趣味: プログラミング" << endl;

    // 読み込み
    string line;
    cout << "=== ファイル内容 ===" << endl;
    while (getline(file, line)) {
        cout << line << endl;
    }

    return 0;
}`}
          expectedOutput={`=== ファイル内容 ===
名前: 太郎
年齢: 20
趣味: プログラミング`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">文字列ストリームの活用</h2>
        <p className="text-gray-400 mb-4">
          stringstreamを使って文字列と数値の変換や、複雑な文字列の構築ができます。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    // 文字列から数値を抽出
    string data = "100 3.14 hello";
    istringstream iss(data);
    int n;
    double d;
    string s;
    iss >> n >> d >> s;
    cout << "整数: " << n << ", 小数: " << d << ", 文字列: " << s << endl;

    // 数値を文字列に変換
    ostringstream oss;
    oss << "結果: " << n * 2 << ", " << d * 2;
    cout << oss.str() << endl;

    return 0;
}`}
          expectedOutput={`整数: 100, 小数: 3.14, 文字列: hello
結果: 200, 6.28`}
        />
      </section>

      <Quiz questions={quizQuestions} color="indigo" />
    </div>
  );
}
