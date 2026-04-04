import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("namespaces");

export default function NamespaceBasicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-teal-400 text-sm font-semibold">名前空間・Composer レッスン1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">名前空間基礎</h1>
        <p className="text-gray-400">namespaceキーワードを使った名前空間の定義と活用を学び、クラス名の衝突を防ぐ方法を習得します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前空間とは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          名前空間はクラス・関数・定数の名前が衝突しないようにするための仕組みです。
          大規模なプロジェクトやライブラリを組み合わせる際に必須の概念です。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• PHPファイルの先頭（<code className="text-teal-300">&lt;?php</code>直後）に<code className="text-teal-300">namespace</code>を宣言</li>
          <li>• バックスラッシュ<code className="text-teal-300">\</code>で階層を区切る</li>
          <li>• <code className="text-teal-300">__NAMESPACE__</code>定数で現在の名前空間を取得できる</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前空間の宣言と使用</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-teal-300">namespace</code>キーワードで名前空間を宣言し、完全修飾名でクラスにアクセスします。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace App\\Models;

class User {
    public function __construct(
        public readonly int $id,
        public readonly string $name
    ) {}

    public function __toString(): string {
        return "User(#{$this->id}: {$this->name})";
    }
}

class Post {
    public function __construct(
        public readonly string $title,
        public readonly User $author
    ) {}

    public function __toString(): string {
        return "Post({$this->title} by {$this->author->name})";
    }
}

// 現在の名前空間を確認
echo "名前空間: " . __NAMESPACE__ . "\\n";

// 同じ名前空間内では短縮名でアクセスできる
$user = new User(1, "田中太郎");
$post = new Post("PHPデザインパターン入門", $user);

echo $user . "\\n";
echo $post . "\\n";`}
          expectedOutput={`名前空間: App\\Models\nUser(#1: 田中太郎)\nPost(PHPデザインパターン入門 by 田中太郎)`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">完全修飾名とグローバル名前空間</h2>
        <p className="text-gray-400 mb-4">
          バックスラッシュから始まる完全修飾名でどこからでもクラスにアクセスできます。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace MyApp;

// グローバル名前空間の関数・クラスはバックスラッシュで参照
$date = new \\DateTime('2024-01-15');
echo $date->format('Y年m月d日') . "\\n";

// グローバル関数
$arr = [3, 1, 4, 1, 5];
\\sort($arr);
echo implode(", ", $arr) . "\\n";

// サブ名前空間
namespace MyApp\\Utils;

function formatPrice(int $price): string {
    return number_format($price) . "円";
}

echo formatPrice(12345) . "\\n";
echo "現在: " . __NAMESPACE__ . "\\n";`}
          expectedOutput={`2024年01月15日\n1, 1, 3, 4, 5\n12,345円\n現在: MyApp\\Utils`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">名前空間と定数・関数</h2>
        <p className="text-gray-400 mb-4">
          名前空間はクラスだけでなく、関数と定数にも適用されます。
        </p>
        <PhpEditor
          defaultCode={`<?php
namespace Config;

const VERSION = '2.0.0';
const DEBUG = true;
const APP_NAME = 'MyPHPApp';

function getConfig(string $key): mixed {
    $configs = [
        'version' => VERSION,
        'debug'   => DEBUG,
        'app'     => APP_NAME,
    ];
    return $configs[$key] ?? null;
}

echo "アプリ: " . APP_NAME . "\\n";
echo "バージョン: " . VERSION . "\\n";
echo "デバッグ: " . (DEBUG ? "有効" : "無効") . "\\n";
echo "設定取得: " . getConfig('version') . "\\n";`}
          expectedOutput={`アプリ: MyPHPApp\nバージョン: 2.0.0\nデバッグ: 有効\n設定取得: 2.0.0`}
        />
      </section>
      <LessonCompleteButton lessonId="namespace-basics" categoryId="namespaces" />
      <LessonNav lessons={lessons} currentId="namespace-basics" basePath="/learn/namespaces" />
    </div>
  );
}
