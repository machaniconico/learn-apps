import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("classes");

export default function ClassesPropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">クラス基礎 レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">プロパティ</h1>
        <p className="text-gray-400">クラスのプロパティ宣言とコンストラクタプロモーションを学びます。</p>
      </div>
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          プロパティはクラスが持つデータです。型宣言付きプロパティ、デフォルト値、<code className="text-orange-300">readonly</code>修飾子など、PHPの強力なプロパティ機能を学びます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li>プロパティには型宣言とデフォルト値を設定できる</li>
          <li>readonlyプロパティは一度だけ代入でき、変更不可</li>
          <li>$thisでインスタンス自身のプロパティやメソッドにアクセスする</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">型宣言付きプロパティ</h2>
        <p className="text-gray-400 mb-4">プロパティに型を付けることで誤った代入を防げます。</p>
        <PhpEditor
          defaultCode={`<?php
class Temperature {
    public float $celsius;
    private string $unit = "℃";

    public function __construct(float $celsius) {
        $this->celsius = $celsius;
    }

    public function toFahrenheit(): float {
        return $this->celsius * 9 / 5 + 32;
    }

    public function toKelvin(): float {
        return $this->celsius + 273.15;
    }

    public function describe(): string {
        if ($this->celsius < 0) return "氷点下";
        if ($this->celsius < 15) return "寒い";
        if ($this->celsius < 25) return "快適";
        if ($this->celsius < 35) return "暑い";
        return "猛暑";
    }

    public function show(): void {
        echo "{$this->celsius}{$this->unit} = {$this->toFahrenheit()}°F ({$this->describe()})\\n";
    }
}

$temps = [new Temperature(-10), new Temperature(20), new Temperature(37)];
foreach ($temps as $t) {
    $t->show();
}`}
          expectedOutput={`-10℃ = 14°F (氷点下)
20℃ = 68°F (快適)
37℃ = 98.6°F (猛暑)`}
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">readonlyプロパティ（PHP 8.1+）</h2>
        <p className="text-gray-400 mb-4">readonlyを付けると初期化後に変更できない不変プロパティになります。</p>
        <PhpEditor
          defaultCode={`<?php
class Color {
    public readonly int $r;
    public readonly int $g;
    public readonly int $b;

    public function __construct(int $r, int $g, int $b) {
        $this->r = max(0, min(255, $r));
        $this->g = max(0, min(255, $g));
        $this->b = max(0, min(255, $b));
    }

    public function toHex(): string {
        return sprintf("#%02X%02X%02X", $this->r, $this->g, $this->b);
    }

    public function mix(Color $other): Color {
        return new Color(
            intval(($this->r + $other->r) / 2),
            intval(($this->g + $other->g) / 2),
            intval(($this->b + $other->b) / 2)
        );
    }
}

$red = new Color(255, 0, 0);
$blue = new Color(0, 0, 255);
$purple = $red->mix($blue);

echo "赤: " . $red->toHex() . "\\n";
echo "青: " . $blue->toHex() . "\\n";
echo "混合: " . $purple->toHex() . "\\n";`}
          expectedOutput={`赤: #FF0000
青: #0000FF
混合: #7F007F`}
        />
      </section>
      <div className="mb-8">
        <LessonCompleteButton categoryId="classes" lessonId="properties" />
      </div>
      <LessonNav lessons={lessons} currentId="properties" basePath="/learn/classes" />
    </div>
  );
}
