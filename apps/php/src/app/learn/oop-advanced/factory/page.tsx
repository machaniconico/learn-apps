import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function FactoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ファクトリー</h1>
        <p className="text-gray-400">オブジェクト生成をカプセル化するファクトリーパターンを学び、柔軟で拡張しやすいコードを書く方法を習得します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリーパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          ファクトリーパターンは、オブジェクトの生成ロジックを専用のファクトリークラス・メソッドに集約するパターンです。
          生成の詳細を隠蔽し、コードの結合度を下げます。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <span className="text-pink-300">Simple Factory：</span>静的メソッドでオブジェクトを生成</li>
          <li>• <span className="text-pink-300">Factory Method：</span>サブクラスで生成するオブジェクトを決定</li>
          <li>• <span className="text-pink-300">Abstract Factory：</span>関連するオブジェクト群を生成するインターフェース</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">シンプルファクトリーの実装</h2>
        <p className="text-gray-400 mb-4">
          静的メソッドで型に応じたオブジェクトを生成します。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface Shape {
    public function area(): float;
    public function name(): string;
}

class Circle implements Shape {
    public function __construct(private float $radius) {}
    public function area(): float { return M_PI * $this->radius ** 2; }
    public function name(): string { return "円"; }
}

class Rectangle implements Shape {
    public function __construct(private float $w, private float $h) {}
    public function area(): float { return $this->w * $this->h; }
    public function name(): string { return "長方形"; }
}

class Triangle implements Shape {
    public function __construct(private float $base, private float $height) {}
    public function area(): float { return 0.5 * $this->base * $this->height; }
    public function name(): string { return "三角形"; }
}

class ShapeFactory {
    public static function create(string $type, float ...$params): Shape {
        return match($type) {
            'circle'    => new Circle($params[0]),
            'rectangle' => new Rectangle($params[0], $params[1]),
            'triangle'  => new Triangle($params[0], $params[1]),
            default     => throw new InvalidArgumentException("不明な図形: {$type}"),
        };
    }
}

$shapes = [
    ShapeFactory::create('circle', 5),
    ShapeFactory::create('rectangle', 4, 6),
    ShapeFactory::create('triangle', 3, 8),
];

foreach ($shapes as $shape) {
    printf("%s の面積: %.2f\\n", $shape->name(), $shape->area());
}`}
          expectedOutput={`円 の面積: 78.54\n長方形 の面積: 24.00\n三角形 の面積: 12.00`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリーメソッドパターン</h2>
        <p className="text-gray-400 mb-4">
          抽象クラスでファクトリーメソッドを定義し、サブクラスで生成するオブジェクトを決定します。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        echo "[FILE] {$message}\\n";
    }
}

class DatabaseLogger implements Logger {
    public function log(string $message): void {
        echo "[DB] {$message}\\n";
    }
}

// ファクトリーメソッドを持つ抽象クラス
abstract class Application {
    abstract protected function createLogger(): Logger;

    public function run(string $action): void {
        $logger = $this->createLogger();
        $logger->log("アクション実行: {$action}");
    }
}

class FileApplication extends Application {
    protected function createLogger(): Logger {
        return new FileLogger();
    }
}

class DatabaseApplication extends Application {
    protected function createLogger(): Logger {
        return new DatabaseLogger();
    }
}

$app1 = new FileApplication();
$app1->run("ユーザー登録");

$app2 = new DatabaseApplication();
$app2->run("注文処理");`}
          expectedOutput={`[FILE] アクション実行: ユーザー登録\n[DB] アクション実行: 注文処理`}
        />
      </section>
      <LessonCompleteButton lessonId="factory" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="factory" basePath="/learn/oop-advanced" />
    </div>
  );
}
