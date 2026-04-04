import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("memory");

export default function AllocatorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">メモリ管理 レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アロケータ</h1>
        <p className="text-gray-400">STLコンテナのメモリ確保を制御するカスタムアロケータの基礎を学びます。</p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">デフォルトアロケータ</h2>
        <p className="text-gray-400 mb-4">
          STLコンテナはstd::allocatorをデフォルトで使用します。
          allocatorはメモリの確保（allocate）と解放（deallocate）を担当します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory>
using namespace std;

int main() {
    // std::allocatorを直接使う
    allocator<int> alloc;

    // 5要素分のメモリを確保
    int* p = alloc.allocate(5);

    // construct相当の処理（配置new）
    for (int i = 0; i < 5; i++) {
        new(p + i) int((i + 1) * 10);
    }

    cout << "アロケータで確保した値: ";
    for (int i = 0; i < 5; i++) {
        cout << p[i] << " ";
    }
    cout << endl;

    // メモリを解放
    alloc.deallocate(p, 5);
    cout << "アロケータでメモリ解放完了" << endl;

    return 0;
}`}
          expectedOutput={`アロケータで確保した値: 10 20 30 40 50
アロケータでメモリ解放完了`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">カスタムアロケータの概念</h2>
        <p className="text-gray-400 mb-4">
          カスタムアロケータを作ることで、メモリ確保の戦略をカスタマイズできます。
          デバッグ用のログ出力や、メモリプールの実装などに活用します。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <memory>
using namespace std;

template <typename T>
struct LogAllocator {
    using value_type = T;

    LogAllocator() = default;
    template <class U>
    LogAllocator(const LogAllocator<U>&) {}

    T* allocate(size_t n) {
        cout << "[alloc] " << n << " 要素 (" << n * sizeof(T) << " bytes)" << endl;
        return static_cast<T*>(::operator new(n * sizeof(T)));
    }

    void deallocate(T* p, size_t n) {
        cout << "[dealloc] " << n << " 要素" << endl;
        ::operator delete(p);
    }
};

template <class T, class U>
bool operator==(const LogAllocator<T>&, const LogAllocator<U>&) { return true; }
template <class T, class U>
bool operator!=(const LogAllocator<T>&, const LogAllocator<U>&) { return false; }

int main() {
    cout << "=== カスタムアロケータ ===" << endl;
    vector<int, LogAllocator<int>> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);

    cout << "要素: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    return 0;
}`}
          expectedOutput={`=== カスタムアロケータ ===
[alloc] 1 要素 (4 bytes)
[alloc] 2 要素 (8 bytes)
[dealloc] 1 要素
[alloc] 4 要素 (16 bytes)
[dealloc] 2 要素
要素: 10 20 30
[dealloc] 4 要素`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">pmr::memory_resource</h2>
        <p className="text-gray-400 mb-4">
          C++17のpmr（Polymorphic Memory Resources）は、実行時にメモリリソースを切り替えられる仕組みです。
          monotonic_buffer_resourceを使ったアリーナ割り当ての例を見てみましょう。
        </p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <memory_resource>
#include <vector>
using namespace std;

int main() {
    // バッファ上のアリーナアロケータ
    char buffer[256];
    pmr::monotonic_buffer_resource pool(buffer, sizeof(buffer));

    pmr::vector<int> v(&pool);
    for (int i = 1; i <= 5; i++) {
        v.push_back(i * 100);
    }

    cout << "pmr::vector: ";
    for (int x : v) cout << x << " ";
    cout << endl;
    cout << "バッファサイズ: " << sizeof(buffer) << " bytes" << endl;
    cout << "要素数: " << v.size() << endl;

    return 0;
}`}
          expectedOutput={`pmr::vector: 100 200 300 400 500
バッファサイズ: 256 bytes
要素数: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="memory" lessonId="allocators" />
      </div>
      <LessonNav lessons={lessons} currentId="allocators" basePath="/learn/memory" />
    </div>
  );
}
