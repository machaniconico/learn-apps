import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesCloningPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン7</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">オブジェクトの複製</h1>
        <p className="text-gray-400">cloneキーワードと__cloneメソッドによるオブジェクト複製を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          PHPのオブジェクトは代入時に参照が渡されます。<code className="text-orange-300">clone</code>キーワードでオブジェクトを複製（コピー）できます。<code className="text-orange-300">__clone</code>メソッドで複製時の処理をカスタマイズできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>$copy = clone $original でシャローコピーを作成する</li>
          <li>__cloneメソッドでclone時に呼ばれる処理を定義できる</li>
          <li>ネストしたオブジェクトはシャローコピーでは共有されるため注意</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">参照とcloneの違い</h2>
        <p className="text-gray-400 mb-4">代入は参照のコピーなので、cloneで実体を複製する必要があります。</p>
        <PhpEditor
          defaultCode={`<?php
class ShoppingCart {
    private array $items = [];

    public function add(string $item, int $qty): void {
        $this->items[$item] = ($this->items[$item] ?? 0) + $qty;
    }

    public function remove(string $item): void {
        unset($this->items[$item]);
    }

    public function total(): int {
        return array_sum($this->items);
    }

    public function show(string $label): void {
        echo "{$label}: ";
        $parts = [];
        foreach ($this->items as $name => $qty) {
            $parts[] = "{$name}×{$qty}";
        }
        echo implode(", ", $parts) . " (合計{$this->total()}点)\\n";
    }
}

$cart1 = new ShoppingCart();
$cart1->add("りんご", 3);
$cart1->add("みかん", 2);

// cloneで独立したコピーを作成
$cart2 = clone $cart1;
$cart2->add("ぶどう", 1);
$cart2->remove("みかん");

$cart1->show("カート1");
$cart2->show("カート2");`}
          expectedOutput={`カート1: りんご×3, みかん×2 (合計5点)
カート2: りんご×3, ぶどう×1 (合計4点)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">__cloneメソッドのカスタマイズ</h2>
        <p className="text-gray-400 mb-4">__cloneで複製時に内部オブジェクトもディープコピーできます。</p>
        <PhpEditor
          defaultCode={`<?php
class Address {
    public function __construct(
        public string $city,
        public string $street
    ) {}
}

class Employee {
    public static int $nextId = 1;
    public int $id;

    public function __construct(
        public string $name,
        public Address $address
    ) {
        $this->id = self::$nextId++;
    }

    public function __clone() {
        // 新しいIDを割り当て
        $this->id = self::$nextId++;
        // Addressをディープコピー
        $this->address = clone $this->address;
    }

    public function show(): void {
        echo "ID:{$this->id} {$this->name} ({$this->address->city} {$this->address->street})\\n";
    }
}

$emp1 = new Employee("田中", new Address("東京", "渋谷区"));
$emp2 = clone $emp1;
$emp2->name = "鈴木";
$emp2->address->city = "大阪";

$emp1->show();
$emp2->show();`}
          expectedOutput={`ID:1 田中 (東京 渋谷区)
ID:2 鈴木 (大阪 渋谷区)`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="cloning" />
      </div>
      <LessonNav lessons={lessons} currentId="cloning" basePath="/learn/classes" />
    </div>
  );
}
