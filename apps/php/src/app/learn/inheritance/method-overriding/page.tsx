import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("inheritance");

export default function InheritanceMethodOverridingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">継承・インターフェース レッスン2</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">メソッドのオーバーライド</h1>
        <p className="text-gray-400">親クラスのメソッドを子クラスで上書きする方法を学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          オーバーライドは親クラスのメソッドを子クラスで再定義することです。<code className="text-red-300">parent::</code>で親クラスの元の実装を呼び出すこともできます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>子クラスで同名メソッドを定義するとオーバーライドになる</li>
          <li>parent::メソッド名()で親の実装を呼び出せる</li>
          <li>オーバーライドするメソッドのシグネチャは互換性が必要</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">メソッドのオーバーライド</h2>
        <p className="text-gray-400 mb-4">子クラスで親クラスのメソッドを上書きする例です。</p>
        <PhpEditor
          defaultCode={`<?php
class Shape {
    public function area(): float {
        return 0.0;
    }

    public function describe(): string {
        return "図形（面積: " . $this->area() . "）";
    }
}

class Rectangle extends Shape {
    public function __construct(
        private float $width,
        private float $height
    ) {}

    public function area(): float {
        return $this->width * $this->height;
    }

    public function describe(): string {
        return "長方形 {$this->width}×{$this->height}（面積: " . $this->area() . "）";
    }
}

class Circle extends Shape {
    public function __construct(private float $radius) {}

    public function area(): float {
        return M_PI * $this->radius ** 2;
    }

    public function describe(): string {
        return "円（半径{$this->radius}、面積: " . round($this->area(), 2) . "）";
    }
}

$shapes = [new Rectangle(4, 6), new Circle(5), new Rectangle(3, 3)];
foreach ($shapes as $shape) {
    echo $shape->describe() . "\\n";
}`}
          expectedOutput={`長方形 4×6（面積: 24）
円（半径5、面積: 78.54）
長方形 3×3（面積: 9）`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">parent::で親メソッドを活用</h2>
        <p className="text-gray-400 mb-4">parent::で親の処理を再利用しながら機能を追加できます。</p>
        <PhpEditor
          defaultCode={`<?php
class Logger {
    protected array $logs = [];

    public function log(string $message): void {
        $this->logs[] = $message;
        echo "[LOG] {$message}\\n";
    }

    public function getLogs(): array {
        return $this->logs;
    }
}

class TimestampLogger extends Logger {
    public function log(string $message): void {
        $timestamp = date("H:i:s");
        parent::log("[{$timestamp}] {$message}");
    }
}

class PrefixLogger extends Logger {
    public function __construct(private string $prefix) {}

    public function log(string $message): void {
        parent::log("{$this->prefix}: {$message}");
    }
}

$plain = new Logger();
$plain->log("シンプルなログ");

$prefix = new PrefixLogger("APP");
$prefix->log("起動しました");
$prefix->log("処理完了");

echo "記録数: " . count($prefix->getLogs()) . "\\n";`}
          expectedOutput={`[LOG] シンプルなログ
[LOG] APP: 起動しました
[LOG] APP: 処理完了
記録数: 2`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="inheritance" lessonId="method-overriding" />
      </div>
      <LessonNav lessons={lessons} currentId="method-overriding" basePath="/learn/inheritance" />
    </div>
  );
}
