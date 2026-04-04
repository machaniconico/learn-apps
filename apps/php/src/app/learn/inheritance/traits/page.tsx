import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceTraitsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">トレイト</h1>
        <p className="text-gray-400">traitを使ったコードの再利用と多重継承的な設計を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          トレイトはコードを再利用するための仕組みです。PHPは単一継承ですが、<code className="text-red-300">trait</code>を使うと複数のトレイトからメソッドを取り込め、多重継承的な設計が可能です。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>traitキーワードでトレイトを定義する</li>
          <li>クラス内でuse トレイト名でトレイトを組み込む</li>
          <li>複数のトレイトをカンマ区切りで同時に使える</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トレイトの基本</h2>
        <p className="text-gray-400 mb-4">共通機能をトレイトにまとめて複数のクラスで再利用します。</p>
        <PhpEditor
          defaultCode={`<?php
trait Timestampable {
    private string $createdAt;
    private string $updatedAt;

    public function initTimestamps(): void {
        $this->createdAt = date("Y-m-d H:i:s");
        $this->updatedAt = $this->createdAt;
    }

    public function touch(): void {
        $this->updatedAt = date("Y-m-d H:i:s");
    }

    public function getCreatedAt(): string {
        return $this->createdAt;
    }
}

trait SoftDeletable {
    private ?string $deletedAt = null;

    public function delete(): void {
        $this->deletedAt = date("Y-m-d H:i:s");
    }

    public function isDeleted(): bool {
        return $this->deletedAt !== null;
    }
}

class Article {
    use Timestampable, SoftDeletable;

    public function __construct(public string $title) {
        $this->initTimestamps();
    }
}

$article = new Article("PHPトレイト入門");
echo "{$article->title}\\n";
echo "作成: " . $article->getCreatedAt() . "\\n";
echo "削除済み: " . ($article->isDeleted() ? "はい" : "いいえ") . "\\n";
$article->delete();
echo "削除済み: " . ($article->isDeleted() ? "はい" : "いいえ") . "\\n";`}
          expectedOutput={`PHPトレイト入門
作成: 2024-01-01 00:00:00
削除済み: いいえ
削除済み: はい`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">トレイトとインターフェースの組み合わせ</h2>
        <p className="text-gray-400 mb-4">トレイトでインターフェースのデフォルト実装を提供できます。</p>
        <PhpEditor
          defaultCode={`<?php
interface Serializable {
    public function serialize(): string;
    public function toArray(): array;
}

trait JsonSerializable {
    public function serialize(): string {
        return json_encode($this->toArray(), JSON_UNESCAPED_UNICODE);
    }
}

class User implements Serializable {
    use JsonSerializable;

    public function __construct(
        private string $name,
        private string $email,
        private int $age
    ) {}

    public function toArray(): array {
        return [
            'name'  => $this->name,
            'email' => $this->email,
            'age'   => $this->age,
        ];
    }
}

class Product implements Serializable {
    use JsonSerializable;

    public function __construct(
        private string $name,
        private float $price
    ) {}

    public function toArray(): array {
        return ['name' => $this->name, 'price' => $this->price];
    }
}

$user = new User("田中太郎", "tanaka@example.com", 30);
$product = new Product("りんご", 150.0);

echo $user->serialize() . "\\n";
echo $product->serialize() . "\\n";`}
          expectedOutput={`{"name":"田中太郎","email":"tanaka@example.com","age":30}
{"name":"りんご","price":150}`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="traits" />
      </div>
      <LessonNav lessons={lessons} currentId="traits" basePath="/learn/inheritance" />
    </div>
  );
}
