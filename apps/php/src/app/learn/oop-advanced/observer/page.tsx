import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("oop-advanced");

export default function ObserverPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-pink-400 text-sm font-semibold">OOP応用 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">オブザーバー</h1>
        <p className="text-gray-400">イベント通知を実現するオブザーバーパターンを学び、疎結合なイベント駆動設計を習得します。</p>
      </div>
      <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 mb-8">
        <h2 className="text-xl font-bold text-white mb-3">オブザーバーパターンとは？</h2>
        <p className="text-gray-400 leading-relaxed mb-4">
          オブザーバーパターンは、オブジェクトの状態変化を複数の依存オブジェクト（オブザーバー）に自動通知するパターンです。
          Subject（通知元）とObserver（購読者）を分離して疎結合を実現します。
        </p>
        <ul className="text-gray-400 space-y-1">
          <li>• <span className="text-pink-300">Subject：</span>オブザーバーを登録・削除し、通知を送る</li>
          <li>• <span className="text-pink-300">Observer：</span>通知を受け取り処理するインターフェース</li>
          <li>• PHPのSPLには<code className="text-pink-300">SplSubject</code>/<code className="text-pink-300">SplObserver</code>インターフェースが組み込みで用意されています</li>
        </ul>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">注文システムのオブザーバー</h2>
        <p className="text-gray-400 mb-4">
          注文が確定したときにメール送信・在庫更新・ログ記録を自動実行するパターンです。
        </p>
        <PhpEditor
          defaultCode={`<?php
interface Observer {
    public function update(string $event, mixed $data): void;
}

interface Subject {
    public function attach(Observer $observer): void;
    public function detach(Observer $observer): void;
    public function notify(string $event, mixed $data): void;
}

class Order implements Subject {
    private array $observers = [];
    private string $status = 'pending';

    public function attach(Observer $observer): void {
        $this->observers[] = $observer;
    }

    public function detach(Observer $observer): void {
        $this->observers = array_filter(
            $this->observers,
            fn($o) => $o !== $observer
        );
    }

    public function notify(string $event, mixed $data): void {
        foreach ($this->observers as $observer) {
            $observer->update($event, $data);
        }
    }

    public function confirm(string $orderId): void {
        $this->status = 'confirmed';
        $this->notify('order.confirmed', ['id' => $orderId, 'status' => $this->status]);
    }
}

class EmailNotifier implements Observer {
    public function update(string $event, mixed $data): void {
        if ($event === 'order.confirmed') {
            echo "メール送信: 注文#{$data['id']}が確定しました\\n";
        }
    }
}

class InventoryManager implements Observer {
    public function update(string $event, mixed $data): void {
        if ($event === 'order.confirmed') {
            echo "在庫更新: 注文#{$data['id']}の商品を引当\\n";
        }
    }
}

class AuditLogger implements Observer {
    public function update(string $event, mixed $data): void {
        echo "ログ記録: イベント[{$event}] ID={$data['id']}\\n";
    }
}

$order = new Order();
$order->attach(new EmailNotifier());
$order->attach(new InventoryManager());
$order->attach(new AuditLogger());

$order->confirm("ORD-2024-001");`}
          expectedOutput={`メール送信: 注文#ORD-2024-001が確定しました\n在庫更新: 注文#ORD-2024-001の商品を引当\nログ記録: イベント[order.confirmed] ID=ORD-2024-001`}
        />
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">SPLのSplSubject/SplObserverを使う</h2>
        <p className="text-gray-400 mb-4">
          PHPのSPL（Standard PHP Library）には組み込みのオブザーバーインターフェースがあります。
        </p>
        <PhpEditor
          defaultCode={`<?php
class StockPrice implements SplSubject {
    private SplObjectStorage $observers;
    private float $price;
    private string $symbol;

    public function __construct(string $symbol, float $price) {
        $this->observers = new SplObjectStorage();
        $this->symbol = $symbol;
        $this->price = $price;
    }

    public function attach(SplObserver $observer): void {
        $this->observers->attach($observer);
    }

    public function detach(SplObserver $observer): void {
        $this->observers->detach($observer);
    }

    public function notify(): void {
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }

    public function setPrice(float $price): void {
        $this->price = $price;
        $this->notify();
    }

    public function getInfo(): string {
        return "{$this->symbol}: {$this->price}円";
    }
}

class PriceAlert implements SplObserver {
    public function __construct(private string $name) {}

    public function update(SplSubject $subject): void {
        echo "{$this->name}: " . $subject->getInfo() . "\\n";
    }
}

$stock = new StockPrice("PHP株", 1000);
$stock->attach(new PriceAlert("アラート1"));
$stock->attach(new PriceAlert("アラート2"));

$stock->setPrice(1200);`}
          expectedOutput={`アラート1: PHP株: 1200円\nアラート2: PHP株: 1200円`}
        />
      </section>
      <LessonCompleteButton lessonId="observer" categoryId="oop-advanced" />
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/oop-advanced" />
    </div>
  );
}
