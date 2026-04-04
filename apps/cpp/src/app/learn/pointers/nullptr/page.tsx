import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("pointers");

export default function NullptrPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ポインタ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">nullptr</h1>
        <p className="text-gray-400">nullポインタの安全な扱い方</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">nullptrとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">nullptr</code> は C++11 で導入された型安全なヌルポインタリテラルです。
          C言語の <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">NULL</code>（通常 0 に定義）とは異なり、
          <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">std::nullptr_t</code> 型を持ち、
          整数型への暗黙変換が起きないため、オーバーロード解決で曖昧さが生じません。
        </p>
        <p className="text-gray-300 leading-relaxed">
          ポインタを初期化する際は常に <code className="text-blue-400 bg-gray-800 px-1.5 py-0.5 rounded">nullptr</code> を使い、
          デリファレンス前に null チェックを行うのが安全なプラクティスです。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">nullptrの基本的な使い方</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

int main() {
    int* ptr = nullptr;  // null で初期化

    // null チェック
    if (ptr == nullptr) {
        cout << "ptr は null です" << endl;
    }

    // if文での暗黙変換（nullptr は false）
    if (!ptr) {
        cout << "ptr は null です（!ptr）" << endl;
    }

    int x = 42;
    ptr = &x;  // 有効なアドレスを代入

    if (ptr != nullptr) {
        cout << "ptr は有効: *ptr = " << *ptr << endl;
    }

    // もう一度 null に戻す
    ptr = nullptr;
    cout << "ptr を null に戻しました" << endl;

    return 0;
}`}
          expectedOutput={`ptr は null です
ptr は null です（!ptr）
ptr は有効: *ptr = 42
ptr を null に戻しました`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">NULLとnullptrの違い</h2>
        <CppEditor
          defaultCode={`#include <iostream>
using namespace std;

void process(int value) {
    cout << "process(int): " << value << endl;
}

void process(int* ptr) {
    if (ptr) {
        cout << "process(int*): " << *ptr << endl;
    } else {
        cout << "process(int*): nullptr" << endl;
    }
}

int main() {
    // NULL は整数 0 としても解釈されうる
    // process(NULL);  // 曖昧でコンパイルエラーになる場合がある

    // nullptr は常にポインタ型
    process(nullptr);   // process(int*) が呼ばれる
    process(0);         // process(int) が呼ばれる

    int x = 10;
    process(&x);        // process(int*) が呼ばれる

    return 0;
}`}
          expectedOutput={`process(int*): nullptr
process(int): 0
process(int*): 10`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">安全なnullチェックパターン</h2>
        <CppEditor
          defaultCode={`#include <iostream>
#include <string>
using namespace std;

struct Node {
    string value;
    Node* next;
};

void printList(Node* head) {
    Node* current = head;
    while (current != nullptr) {
        cout << current->value;
        if (current->next != nullptr) {
            cout << " -> ";
        }
        current = current->next;
    }
    cout << endl;
}

int main() {
    Node c = {"C", nullptr};
    Node b = {"B", &c};
    Node a = {"A", &b};

    cout << "リスト: ";
    printList(&a);

    cout << "空リスト: ";
    printList(nullptr);  // null を渡しても安全
    cout << "(空)" << endl;

    return 0;
}`}
          expectedOutput={`リスト: A -> B -> C
空リスト:
(空)`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="pointers" lessonId="nullptr" />
      </div>
      <LessonNav lessons={lessons} currentId="nullptr" basePath="/learn/pointers" />
    </div>
  );
}
