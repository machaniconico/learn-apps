import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesStaticMembersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">静的メンバー</h1>
        <p className="text-gray-400">staticキーワードを使ったクラスメソッドとプロパティを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          staticメンバーはインスタンスを生成せずにクラス名から直接アクセスできます。<code className="text-orange-300">static</code>キーワードで宣言し、<code className="text-orange-300">::</code>演算子でアクセスします。クラス内では<code className="text-orange-300">self::</code>を使います。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>staticプロパティはすべてのインスタンスで共有される</li>
          <li>staticメソッドはインスタンスなしでクラス名::メソッド名()で呼び出せる</li>
          <li>クラス内からはself::でstaticメンバーにアクセスする</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">staticプロパティとメソッド</h2>
        <p className="text-gray-400 mb-4">インスタンス数のカウントなど、クラス全体で共有するデータに使います。</p>
        <PhpEditor
          defaultCode={`<?php
class User {
    private static int $count = 0;
    private static array $all = [];

    public function __construct(
        public readonly string $name,
        public readonly string $email
    ) {
        self::$count++;
        self::$all[] = $this;
    }

    public static function getCount(): int {
        return self::$count;
    }

    public static function findByName(string $name): ?User {
        foreach (self::$all as $user) {
            if ($user->name === $name) return $user;
        }
        return null;
    }
}

new User("田中太郎", "tanaka@example.com");
new User("鈴木花子", "suzuki@example.com");
new User("佐藤次郎", "sato@example.com");

echo "登録ユーザー数: " . User::getCount() . "\\n";

$found = User::findByName("鈴木花子");
if ($found) {
    echo "見つかった: {$found->name} ({$found->email})\\n";
}`}
          expectedOutput={`登録ユーザー数: 3
見つかった: 鈴木花子 (suzuki@example.com)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ファクトリメソッドパターン</h2>
        <p className="text-gray-400 mb-4">staticメソッドをファクトリとして使い、インスタンス生成を制御できます。</p>
        <PhpEditor
          defaultCode={`<?php
class Color {
    private function __construct(
        public readonly int $r,
        public readonly int $g,
        public readonly int $b
    ) {}

    public static function fromRGB(int $r, int $g, int $b): self {
        return new self(
            max(0, min(255, $r)),
            max(0, min(255, $g)),
            max(0, min(255, $b))
        );
    }

    public static function fromHex(string $hex): self {
        $hex = ltrim($hex, '#');
        return new self(
            hexdec(substr($hex, 0, 2)),
            hexdec(substr($hex, 2, 2)),
            hexdec(substr($hex, 4, 2))
        );
    }

    public static function red(): self   { return new self(255, 0, 0); }
    public static function green(): self { return new self(0, 255, 0); }
    public static function blue(): self  { return new self(0, 0, 255); }

    public function toHex(): string {
        return sprintf("#%02X%02X%02X", $this->r, $this->g, $this->b);
    }
}

echo Color::red()->toHex() . "\\n";
echo Color::fromRGB(128, 64, 200)->toHex() . "\\n";
echo Color::fromHex("#FF8800")->toHex() . "\\n";`}
          expectedOutput={`#FF0000
#8040C8
#FF8800`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="static-members" />
      </div>
      <LessonNav lessons={lessons} currentId="static-members" basePath="/learn/classes" />
    </div>
  );
}
