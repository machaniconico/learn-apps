import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { DESIGN_LESSONS } from "@/lib/lessons-data";

export default function DesignExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-400 mb-4">設計パターン レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">設計パターン総合演習</h1>
        <p className="text-gray-400">悪い設計のコードをリファクタリングして、学んだ原則・パターンを実践しよう</p>
      </div>

      {/* 演習の概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">演習の概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、設計上の問題を多数含む<strong className="text-violet-400">「タスク管理システム」</strong>のコードを
          段階的にリファクタリングします。コードスメルを特定し、SOLID原則やデザインパターンを適用して改善しましょう。
        </p>
        <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <p className="text-sm text-violet-400 font-semibold mb-2">演習の進め方</p>
          <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
            <li>まず「問題のあるコード」を読んで、コードスメルを見つける</li>
            <li>どの原則・パターンが適用できるかを考える</li>
            <li>段階的にリファクタリングを行う</li>
            <li>最終的な改善版と比較して理解を深める</li>
          </ol>
        </div>
      </section>

      {/* 問題のあるコード */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 1: 問題のあるコード</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          以下のコードには多くの設計上の問題があります。どんなコードスメルが見つかるか考えてみましょう。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 問題だらけのタスク管理システム
class TaskManager {
  tasks: any[] = [];
  nextId = 1;

  // タスクの作成・保存・通知・ログを全部やっている（SRP違反）
  addTask(title: string, assignee: string, type: string) {
    // マジックナンバー
    if (title.length > 100) {
      throw new Error("Too long");
    }

    const task: any = {
      id: this.nextId++,
      title,
      assignee,
      type,
      status: "todo",
      createdAt: new Date(),
    };

    this.tasks.push(task);

    // 通知ロジックが直接埋め込み（高結合）
    if (type === "bug") {
      console.log(\`[EMAIL] \${assignee}さん: 緊急バグ「\${title}」\`);
      console.log(\`[SLACK] #bugs: 新しいバグ「\${title}」\`);
    } else if (type === "feature") {
      console.log(\`[EMAIL] \${assignee}さん: 新機能「\${title}」\`);
    } else if (type === "chore") {
      console.log(\`[SLACK] #general: タスク「\${title}」\`);
    }

    // ログも直接書いている
    console.log(
      \`[LOG] \${new Date().toISOString()} - Task created: \${title}\`
    );

    return task;
  }

  // タスク完了処理もif/elseの嵐（OCP違反）
  completeTask(id: number) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error("Not found");

    task.status = "done";
    task.completedAt = new Date();

    // ポイント計算がべた書き
    let points = 0;
    if (task.type === "bug") {
      points = 3;
    } else if (task.type === "feature") {
      points = 5;
    } else if (task.type === "chore") {
      points = 1;
    }

    console.log(\`\${task.assignee}に\${points}ポイント付与\`);

    // レポート生成も混在
    const report = \`完了: \${task.title} (\${task.type}) - \${points}pt\`;
    console.log(report);

    return task;
  }

  // CSVエクスポート（関心の分離ができていない）
  exportToCSV(): string {
    let csv = "id,title,assignee,type,status\\n";
    for (const t of this.tasks) {
      csv += \`\${t.id},\${t.title},\${t.assignee},\${t.type},\${t.status}\\n\`;
    }
    return csv;
  }

  // 検索機能（DRYの問題）
  findByAssignee(assignee: string) {
    const result = [];
    for (const t of this.tasks) {
      if (t.assignee === assignee) result.push(t);
    }
    return result;
  }

  findByType(type: string) {
    const result = [];
    for (const t of this.tasks) {
      if (t.type === type) result.push(t);
    }
    return result;
  }

  findByStatus(status: string) {
    const result = [];
    for (const t of this.tasks) {
      if (t.status === status) result.push(t);
    }
    return result;
  }
}`}</code>
        </pre>
      </section>

      {/* コードスメルの特定 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 2: コードスメルを特定する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          上のコードに含まれる設計上の問題点をリストアップしましょう。
        </p>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 font-semibold text-sm">SRP違反（単一責任の原則）</p>
            <p className="text-gray-400 text-sm">TaskManagerがタスク管理、通知、ログ、CSV出力、ポイント計算など全てを担当している</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 font-semibold text-sm">OCP違反（開放閉鎖の原則）</p>
            <p className="text-gray-400 text-sm">新しいタスクタイプを追加するたびにif/elseを修正する必要がある</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 font-semibold text-sm">DIP違反（依存性逆転の原則）</p>
            <p className="text-gray-400 text-sm">通知やログの具体的な実装（console.log）に直接依存している</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 font-semibold text-sm">マジックナンバー / any型の多用</p>
            <p className="text-gray-400 text-sm">100、3、5、1などの数値リテラル。any型で型安全性がない</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 font-semibold text-sm">DRY違反</p>
            <p className="text-gray-400 text-sm">findByAssignee / findByType / findByStatus がほぼ同じロジック</p>
          </div>
        </div>
      </section>

      {/* リファクタリング Step 1 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 3: 型を定義してドメインモデルを整理する</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、<code className="text-violet-400 bg-gray-800 px-1.5 py-0.5 rounded">any</code>を排除し、
          適切な型を定義します。これが全てのリファクタリングの土台になります。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 型定義 - ドメインモデル
type TaskType = "bug" | "feature" | "chore";
type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  readonly id: number;
  readonly title: string;
  readonly assignee: string;
  readonly type: TaskType;
  status: TaskStatus;
  readonly createdAt: Date;
  completedAt?: Date;
}

// バリデーション用の定数（マジックナンバー排除）
const TASK_TITLE_MAX_LENGTH = 100;

// ポイント設定もオブジェクトで管理（OCP対応の準備）
const POINTS_BY_TYPE: Record<TaskType, number> = {
  bug: 3,
  feature: 5,
  chore: 1,
};`}</code>
        </pre>
      </section>

      {/* リファクタリング Step 2 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 4: 責務を分離する（SRP + DIP）</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          通知、ログ、エクスポートなどの責務をインターフェースで抽象化し、個別のクラスに分離します。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// 通知サービス - Strategyパターンで種類を切り替え可能
interface NotificationChannel {
  send(recipient: string, message: string): void;
}

class EmailChannel implements NotificationChannel {
  send(recipient: string, message: string): void {
    console.log(\`[EMAIL] \${recipient}: \${message}\`);
  }
}

class SlackChannel implements NotificationChannel {
  constructor(private defaultChannel: string = "general") {}
  send(recipient: string, message: string): void {
    console.log(\`[SLACK] #\${recipient || this.defaultChannel}: \${message}\`);
  }
}

// 通知ルールをタスクタイプごとに定義（OCP対応）
interface NotificationRule {
  shouldNotify(task: Task): boolean;
  getChannels(): NotificationChannel[];
  formatMessage(task: Task): string;
}

class BugNotificationRule implements NotificationRule {
  private email = new EmailChannel();
  private slack = new SlackChannel("bugs");

  shouldNotify(task: Task): boolean {
    return task.type === "bug";
  }
  getChannels(): NotificationChannel[] {
    return [this.email, this.slack];
  }
  formatMessage(task: Task): string {
    return \`緊急バグ「\${task.title}」が報告されました\`;
  }
}

class FeatureNotificationRule implements NotificationRule {
  private email = new EmailChannel();

  shouldNotify(task: Task): boolean {
    return task.type === "feature";
  }
  getChannels(): NotificationChannel[] {
    return [this.email];
  }
  formatMessage(task: Task): string {
    return \`新機能「\${task.title}」が追加されました\`;
  }
}

// 通知サービス（ルールをまとめて管理）
class NotificationService {
  constructor(private rules: NotificationRule[]) {}

  notify(task: Task): void {
    for (const rule of this.rules) {
      if (rule.shouldNotify(task)) {
        const message = rule.formatMessage(task);
        for (const channel of rule.getChannels()) {
          channel.send(task.assignee, message);
        }
      }
    }
  }
}

// ロガー - インターフェースで抽象化
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(\`[LOG] \${new Date().toISOString()} - \${message}\`);
  }
}

// エクスポーター - Strategyパターン
interface TaskExporter {
  export(tasks: Task[]): string;
}

class CSVExporter implements TaskExporter {
  export(tasks: Task[]): string {
    const header = "id,title,assignee,type,status";
    const rows = tasks.map(
      (t) => \`\${t.id},\${t.title},\${t.assignee},\${t.type},\${t.status}\`
    );
    return [header, ...rows].join("\\n");
  }
}

class JSONExporter implements TaskExporter {
  export(tasks: Task[]): string {
    return JSON.stringify(tasks, null, 2);
  }
}`}</code>
        </pre>
      </section>

      {/* リファクタリング完成 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 5: リファクタリング完成版</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてを組み合わせた完成版です。TaskManagerは「タスクの管理」という単一責任だけを持ち、
          通知・ログ・エクスポートは外部から注入されます。
        </p>
        <pre className="bg-gray-950 rounded-lg p-4 text-sm overflow-x-auto border border-gray-700">
          <code className="text-gray-300 font-mono">{`// リファクタリング後のTaskManager
class TaskManager {
  private tasks: Task[] = [];
  private nextId = 1;

  constructor(
    private notifier: NotificationService,
    private logger: Logger
  ) {}

  addTask(title: string, assignee: string, type: TaskType): Task {
    if (title.length > TASK_TITLE_MAX_LENGTH) {
      throw new Error(
        \`タイトルは\${TASK_TITLE_MAX_LENGTH}文字以内です\`
      );
    }

    const task: Task = {
      id: this.nextId++,
      title,
      assignee,
      type,
      status: "todo",
      createdAt: new Date(),
    };

    this.tasks.push(task);
    this.logger.log(\`Task created: \${title}\`);
    this.notifier.notify(task);

    return task;
  }

  completeTask(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new Error("タスクが見つかりません");

    task.status = "done";
    task.completedAt = new Date();

    const points = POINTS_BY_TYPE[task.type];
    this.logger.log(
      \`Task completed: \${task.title} (\${points}pt → \${task.assignee})\`
    );

    return task;
  }

  // DRY: 汎用フィルタメソッド
  findTasks(predicate: (task: Task) => boolean): Task[] {
    return this.tasks.filter(predicate);
  }

  // 便利メソッドは汎用フィルタを使って実装
  findByAssignee(assignee: string): Task[] {
    return this.findTasks((t) => t.assignee === assignee);
  }

  findByType(type: TaskType): Task[] {
    return this.findTasks((t) => t.type === type);
  }

  findByStatus(status: TaskStatus): Task[] {
    return this.findTasks((t) => t.status === status);
  }

  getAllTasks(): Task[] {
    return [...this.tasks];
  }
}

// 組み立て（Dependency Injection）
const notificationService = new NotificationService([
  new BugNotificationRule(),
  new FeatureNotificationRule(),
]);

const logger = new ConsoleLogger();
const manager = new TaskManager(notificationService, logger);

// 使い方
manager.addTask("ログイン画面が表示されない", "田中", "bug");
manager.addTask("ダッシュボード機能", "佐藤", "feature");
manager.completeTask(1);

// エクスポートは別のサービスとして使う
const csvExporter = new CSVExporter();
console.log(csvExporter.export(manager.getAllTasks()));

const jsonExporter = new JSONExporter();
console.log(jsonExporter.export(manager.findByStatus("done")));`}</code>
        </pre>
      </section>

      {/* 改善のまとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Step 6: 改善のまとめ</h2>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 font-semibold text-sm">SRP: 責務の分離</p>
            <p className="text-gray-400 text-sm">TaskManager、NotificationService、Logger、Exporterがそれぞれ単一の責務を持つ</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 font-semibold text-sm">OCP: 拡張に開いている</p>
            <p className="text-gray-400 text-sm">新しいタスクタイプ・通知ルール・エクスポート形式を既存コード修正なしで追加可能</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 font-semibold text-sm">DIP: 抽象への依存</p>
            <p className="text-gray-400 text-sm">TaskManagerはNotificationServiceやLoggerのインターフェースに依存。実装の差し替えが容易</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 font-semibold text-sm">DRY: 重複の排除</p>
            <p className="text-gray-400 text-sm">汎用フィルタメソッドでfindBy系の重複を解消</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 font-semibold text-sm">型安全性の向上</p>
            <p className="text-gray-400 text-sm">any型を排除し、TaskType、TaskStatus等の型でコンパイル時エラーを検出</p>
          </div>
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
            <p className="text-green-400 font-semibold text-sm">テスト容易性</p>
            <p className="text-gray-400 text-sm">依存性注入により、モックを使ったユニットテストが簡単に書ける</p>
          </div>
        </div>
      </section>

      {/* まとめ */}
      <section className="p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">まとめ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>リファクタリングは<strong className="text-violet-400">小さなステップ</strong>で段階的に行う</li>
          <li>まず<strong className="text-violet-400">コードスメル</strong>を特定し、どの原則に違反しているか判断する</li>
          <li><strong className="text-violet-400">型を定義</strong>してドメインモデルを明確にすることが第一歩</li>
          <li><strong className="text-violet-400">インターフェース</strong>で抽象化し、依存性注入で結合度を下げる</li>
          <li><strong className="text-violet-400">Strategy/Observer</strong>パターンでif/else地獄を解消する</li>
          <li>完璧な設計はない。プロジェクトの規模に応じた「適切な」設計を選ぶことが大切</li>
        </ul>
      </section>
      <LessonCompleteButton categoryId="design" lessonId="design-exercise" color="violet" />
      <LessonNav lessons={DESIGN_LESSONS} currentId="design-exercise" basePath="/learn/design" color="violet" />
    </div>
  );
}
