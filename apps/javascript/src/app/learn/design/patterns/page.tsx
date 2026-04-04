import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DESIGN_LESSONS } from "@/lib/lessons-data";

export default function PatternsLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">設計パターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">よく使うデザインパターン</h1>
        <p className="text-gray-400">実務で頻出するGoFデザインパターンをTypeScriptで実装しよう</p>
      </div>

      {/* デザインパターンとは */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">デザインパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">デザインパターン</strong>は、GoF（Gang of Four）が1994年にまとめた
          ソフトウェア設計における再利用可能な解決策のカタログです。
          全23パターンが3つのカテゴリに分類されます。
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">生成パターン</h3>
            <p className="text-gray-400 text-sm">オブジェクトの生成方法に関するパターン</p>
            <p className="text-gray-500 text-xs mt-1">Singleton, Factory, Builder...</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">構造パターン</h3>
            <p className="text-gray-400 text-sm">クラスやオブジェクトの組み合わせ方</p>
            <p className="text-gray-500 text-xs mt-1">Adapter, Decorator, Facade...</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-violet-400 mb-2">振る舞いパターン</h3>
            <p className="text-gray-400 text-sm">オブジェクト間の責任分担と通信</p>
            <p className="text-gray-500 text-xs mt-1">Observer, Strategy, Command...</p>
          </div>
        </div>
      </section>

      {/* Singleton */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Singleton パターン（生成）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">Singleton</strong>は、クラスのインスタンスが一つだけであることを保証するパターンです。
          設定管理、ログ管理、データベース接続プールなど、
          アプリケーション全体で共有すべきリソースに使います。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Singletonパターン - 設定マネージャ
class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, string> = new Map();

  // コンストラクタをprivateにして外部からnewできなくする
  private constructor() {
    // デフォルト設定を読み込み
    this.config.set("apiUrl", "https://api.example.com");
    this.config.set("timeout", "5000");
  }

  // 唯一のインスタンスを取得するメソッド
  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  get(key: string): string | undefined {
    return this.config.get(key);
  }

  set(key: string, value: string): void {
    this.config.set(key, value);
  }
}

// 使い方: どこからアクセスしても同じインスタンス
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();
console.log(config1 === config2); // true

config1.set("apiUrl", "https://new-api.example.com");
console.log(config2.get("apiUrl")); // "https://new-api.example.com"

// モダンなTypeScriptではモジュールスコープの変数でもOK
// config.ts
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};
export default config; // モジュールは1回だけ評価される`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-400 font-semibold mb-1">使いどき</p>
          <p className="text-sm text-gray-300">
            設定管理、ロガー、DBコネクションプール。ただし、グローバル状態はテストしにくいため、
            DIと併用して依存を注入可能にするのがベストプラクティスです。
          </p>
        </div>
      </section>

      {/* Observer */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Observer パターン（振る舞い）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">Observer</strong>は、あるオブジェクトの状態変化を
          複数のオブジェクトに自動通知するパターンです。
          イベント駆動プログラミングの基礎であり、ReactのState管理やNode.jsのEventEmitterもこのパターンです。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Observer パターン - イベントシステム
type EventHandler<T = unknown> = (data: T) => void;

class EventEmitter {
  private listeners: Map<string, EventHandler[]> = new Map();

  // イベントリスナーを登録
  on<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler as EventHandler);
    this.listeners.set(event, handlers);
  }

  // リスナーを解除
  off<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(event) || [];
    this.listeners.set(
      event,
      handlers.filter((h) => h !== handler)
    );
  }

  // イベントを発火して全リスナーに通知
  emit<T>(event: string, data: T): void {
    const handlers = this.listeners.get(event) || [];
    handlers.forEach((handler) => handler(data));
  }
}

// 使い方: ショッピングカート
interface CartItem {
  name: string;
  price: number;
}

const cartEvents = new EventEmitter();

// UIの更新（Observer 1）
cartEvents.on<CartItem>("itemAdded", (item) => {
  console.log(\`UIを更新: \${item.name} をカートに追加\`);
});

// 合計金額の再計算（Observer 2）
cartEvents.on<CartItem>("itemAdded", (item) => {
  console.log(\`合計金額を再計算: +\${item.price}円\`);
});

// アナリティクス送信（Observer 3）
cartEvents.on<CartItem>("itemAdded", (item) => {
  console.log(\`分析データ送信: \${item.name}\`);
});

// イベント発火 → 全Observerに通知される
cartEvents.emit("itemAdded", { name: "TypeScript入門", price: 2980 });`}</code>
        </pre>
      </section>

      {/* Factory */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Factory パターン（生成）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">Factory</strong>は、オブジェクトの生成ロジックをカプセル化するパターンです。
          呼び出し側は具体的なクラスを知らなくても、適切なオブジェクトを取得できます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Factory パターン - 通知システム
interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  constructor(private to: string) {}
  send(message: string): void {
    console.log(\`メール送信 → \${this.to}: \${message}\`);
  }
}

class SlackNotification implements Notification {
  constructor(private channel: string) {}
  send(message: string): void {
    console.log(\`Slack送信 → #\${this.channel}: \${message}\`);
  }
}

class SMSNotification implements Notification {
  constructor(private phoneNumber: string) {}
  send(message: string): void {
    console.log(\`SMS送信 → \${this.phoneNumber}: \${message}\`);
  }
}

// ファクトリクラス
type NotificationType = "email" | "slack" | "sms";

interface NotificationConfig {
  type: NotificationType;
  to?: string;
  channel?: string;
  phoneNumber?: string;
}

class NotificationFactory {
  static create(config: NotificationConfig): Notification {
    switch (config.type) {
      case "email":
        return new EmailNotification(config.to || "");
      case "slack":
        return new SlackNotification(config.channel || "general");
      case "sms":
        return new SMSNotification(config.phoneNumber || "");
      default:
        throw new Error(\`Unknown notification type: \${config.type}\`);
    }
  }
}

// 使い方: 具体的なクラスを意識せずに使える
const notification = NotificationFactory.create({
  type: "slack",
  channel: "dev-alerts",
});
notification.send("デプロイが完了しました");

// 設定で切り替え可能
const configs: NotificationConfig[] = [
  { type: "email", to: "admin@example.com" },
  { type: "slack", channel: "alerts" },
  { type: "sms", phoneNumber: "090-1234-5678" },
];
configs.forEach((c) => NotificationFactory.create(c).send("緊急通知"));`}</code>
        </pre>
      </section>

      {/* Strategy */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Strategy パターン（振る舞い）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">Strategy</strong>は、アルゴリズムをカプセル化して実行時に切り替え可能にするパターンです。
          if/elseの連鎖を避け、新しいアルゴリズムを追加しやすくなります（OCPの実現）。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Strategy パターン - 料金計算
interface PricingStrategy {
  calculate(basePrice: number): number;
  getName(): string;
}

class RegularPricing implements PricingStrategy {
  calculate(basePrice: number): number {
    return basePrice;
  }
  getName(): string { return "通常価格"; }
}

class MemberPricing implements PricingStrategy {
  calculate(basePrice: number): number {
    return basePrice * 0.9;  // 10%割引
  }
  getName(): string { return "会員価格（10%OFF）"; }
}

class PremiumPricing implements PricingStrategy {
  calculate(basePrice: number): number {
    return basePrice * 0.75; // 25%割引
  }
  getName(): string { return "プレミアム価格（25%OFF）"; }
}

class SalePricing implements PricingStrategy {
  constructor(private discountRate: number) {}
  calculate(basePrice: number): number {
    return basePrice * (1 - this.discountRate);
  }
  getName(): string {
    return \`セール価格（\${this.discountRate * 100}%OFF）\`;
  }
}

// コンテキストクラス
class ShoppingCart {
  private items: { name: string; price: number }[] = [];
  private strategy: PricingStrategy = new RegularPricing();

  setPricingStrategy(strategy: PricingStrategy) {
    this.strategy = strategy;
  }

  addItem(name: string, price: number) {
    this.items.push({ name, price });
  }

  getTotal(): number {
    const subtotal = this.items.reduce((sum, item) => sum + item.price, 0);
    return this.strategy.calculate(subtotal);
  }

  printReceipt() {
    console.log(\`適用: \${this.strategy.getName()}\`);
    console.log(\`合計: \${this.getTotal()}円\`);
  }
}

// 使い方
const cart = new ShoppingCart();
cart.addItem("TypeScript本", 3000);
cart.addItem("Reactコース", 5000);

cart.setPricingStrategy(new RegularPricing());
cart.printReceipt(); // 合計: 8000円

cart.setPricingStrategy(new MemberPricing());
cart.printReceipt(); // 合計: 7200円

cart.setPricingStrategy(new SalePricing(0.3));
cart.printReceipt(); // 合計: 5600円`}</code>
        </pre>
      </section>

      {/* Adapter */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Adapter パターン（構造）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <strong className="text-violet-400">Adapter</strong>は、互換性のないインターフェースを持つクラス同士を
          つなぐ変換器の役割を果たすパターンです。
          既存のコードを変更せずに、新しいインターフェースに適合させることができます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// Adapter パターン - 外部API連携

// 自分たちのアプリが期待するインターフェース
interface PaymentProcessor {
  charge(amount: number, currency: string): Promise<{
    success: boolean;
    transactionId: string;
  }>;
}

// 外部の決済サービスA（独自のインターフェース）
class StripeAPI {
  async createCharge(params: {
    amount_cents: number;
    currency_code: string;
    source: string;
  }) {
    console.log("Stripe API called");
    return { id: "ch_stripe_123", status: "succeeded" };
  }
}

// 外部の決済サービスB（全く異なるインターフェース）
class PayPalSDK {
  async executePayment(
    total: string,
    currencyType: string
  ) {
    console.log("PayPal SDK called");
    return { paymentId: "PP-456", state: "approved" };
  }
}

// Adapter A: StripeをPaymentProcessorに適合させる
class StripeAdapter implements PaymentProcessor {
  private stripe = new StripeAPI();

  async charge(amount: number, currency: string) {
    const result = await this.stripe.createCharge({
      amount_cents: amount * 100,
      currency_code: currency.toLowerCase(),
      source: "default",
    });
    return {
      success: result.status === "succeeded",
      transactionId: result.id,
    };
  }
}

// Adapter B: PayPalをPaymentProcessorに適合させる
class PayPalAdapter implements PaymentProcessor {
  private paypal = new PayPalSDK();

  async charge(amount: number, currency: string) {
    const result = await this.paypal.executePayment(
      amount.toString(),
      currency
    );
    return {
      success: result.state === "approved",
      transactionId: result.paymentId,
    };
  }
}

// 使い方: どの決済サービスでも同じインターフェースで扱える
async function processOrder(
  payment: PaymentProcessor,
  amount: number
) {
  const result = await payment.charge(amount, "JPY");
  if (result.success) {
    console.log(\`決済成功: \${result.transactionId}\`);
  }
}

// 設定で切り替え可能
const processor: PaymentProcessor = new StripeAdapter();
processOrder(processor, 5000);`}</code>
        </pre>
        <div className="mt-4 p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-sm text-violet-400 font-semibold mb-1">使いどき</p>
          <p className="text-sm text-gray-300">
            外部ライブラリやAPIの統合、レガシーコードとの互換、
            テスト時のモック作成など。インターフェースの不一致を解消するときに使います。
          </p>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong className="text-violet-400">Singleton</strong> - インスタンスを一つに制限。設定・ログ・DB接続に</li>
          <li><strong className="text-violet-400">Observer</strong> - 状態変化を複数オブジェクトに通知。イベント駆動に</li>
          <li><strong className="text-violet-400">Factory</strong> - 生成ロジックをカプセル化。種類が増えても柔軟に対応</li>
          <li><strong className="text-violet-400">Strategy</strong> - アルゴリズムを実行時に切り替え。if/else地獄を解消</li>
          <li><strong className="text-violet-400">Adapter</strong> - 互換性のないインターフェースを変換。外部API連携に</li>
          <li>パターンは「目的」を持って使うこと。むやみに適用すると過度な複雑性を招く</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="design" lessonId="patterns" color="violet" />
      <LessonNav lessons={DESIGN_LESSONS} currentId="patterns" basePath="/learn/design" color="violet" />
    </div>
  );
}
