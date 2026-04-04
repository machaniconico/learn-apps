import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { KotlinEditor } from "@/components/kotlin-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("collections");

export default function CollectionBuildersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">コレクション レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">コレクションビルダー</h1>
        <p className="text-gray-400">buildList・buildSet・buildMapを使ったコレクション構築</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">ビルダー関数とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-green-300">buildList</code>・
          <code className="text-green-300">buildSet</code>・
          <code className="text-green-300">buildMap</code>はラムダ内でコレクションを動的に構築し、
          最終的にイミュータブルなコレクションを返す関数です。
          ロジックを含むコレクション初期化に便利です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>ラムダ内でMutableList/Set/Mapのメソッドが使える</li>
          <li>戻り値はイミュータブルなList/Set/Map</li>
          <li>条件分岐や繰り返しを含む初期化に最適</li>
          <li>Kotlin 1.6以降で安定版</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">buildListの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">buildList</code>ではラムダ内でaddなどを使い、
          条件付きでリストを構築できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val numbers = buildList {
        add(1)
        add(2)
        addAll(listOf(3, 4, 5))
        if (true) add(6)
    }
    println(numbers)

    val evens = buildList {
        for (i in 1..10) {
            if (i % 2 == 0) add(i)
        }
    }
    println(evens)
}`}
          expectedOutput={`[1, 2, 3, 4, 5, 6]
[2, 4, 6, 8, 10]`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">buildMapの使い方</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-300">buildMap</code>でロジックを含むMapを構築できます。
        </p>
        <KotlinEditor
          defaultCode={`fun main() {
    val wordLength = buildMap {
        val words = listOf("apple", "banana", "cherry")
        for (word in words) {
            put(word, word.length)
        }
    }
    println(wordLength)

    val config = buildMap<String, Any> {
        put("host", "localhost")
        put("port", 8080)
        put("debug", false)
    }
    println(config)
}`}
          expectedOutput={`{apple=5, banana=6, cherry=6}
{host=localhost, port=8080, debug=false}`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="collections" lessonId="collection-builders" />
      </div>
      <LessonNav lessons={lessons} currentId="collection-builders" basePath="/learn/collections" />
    </div>
  );
}
