import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { JS_LESSONS } from "@/lib/lessons-data";
import { CodePlayground } from "@/components/code-playground";

export default function ClassesLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-yellow-400 text-sm font-semibold">JavaScript レッスン9</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">クラスとOOP</h1>
        <p className="text-gray-400">クラス構文を使ったオブジェクト指向プログラミングを学ぼう</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">クラスとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          クラスは「設計図」のようなものです。同じ構造を持つオブジェクトを効率的に作成できます。
          ES6で導入されたクラス構文は、プロトタイプベースの継承をわかりやすく記述できます。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1">
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">class</code> — クラスの宣言</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">constructor</code> — コンストラクタ（初期化処理）</li>
          <li>メソッド — クラスに属する関数</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">extends</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">super</code> — 継承</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">static</code> — 静的メソッド・プロパティ</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">get</code> / <code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">set</code> — ゲッター・セッター</li>
          <li><code className="text-yellow-400 bg-gray-800 px-1.5 py-0.5 rounded">instanceof</code> — 型チェック</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">クラスの基本と継承</h2>
        <p className="text-gray-400 mb-4">クラスの定義、コンストラクタ、継承を学びましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

// クラスの定義
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return this.name + "は「" + this.sound + "」と鳴きます";
  }

  toString() {
    return "[Animal: " + this.name + "]";
  }
}

// 継承
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "ワンワン"); // 親のconstructorを呼ぶ
    this.breed = breed;
  }

  fetch(item) {
    return this.name + "は" + item + "を取ってきました！";
  }

  // メソッドのオーバーライド
  speak() {
    return super.speak() + "（犬種: " + this.breed + "）";
  }
}

class Cat extends Animal {
  constructor(name, isIndoor) {
    super(name, "ニャー");
    this.isIndoor = isIndoor;
  }

  purr() {
    return this.name + "はゴロゴロ言っています";
  }
}

const dog = new Dog("ポチ", "柴犬");
const cat = new Cat("たま", true);

out.innerHTML = \`
<div class="section">
  <h3>クラスのインスタンス化</h3>
  <div class="result">dog.name → "\${dog.name}"
dog.breed → "\${dog.breed}"
cat.name → "\${cat.name}"
cat.isIndoor → \${cat.isIndoor}</div>
</div>
<div class="section">
  <h3>メソッド呼び出し</h3>
  <div class="result">dog.speak() → "\${dog.speak()}"
cat.speak() → "\${cat.speak()}"
dog.fetch("ボール") → "\${dog.fetch("ボール")}"
cat.purr() → "\${cat.purr()}"</div>
</div>
<div class="section">
  <h3>instanceof</h3>
  <div class="result">dog instanceof Dog → \${dog instanceof Dog}
dog instanceof Animal → \${dog instanceof Animal}
cat instanceof Dog → \${cat instanceof Dog}
cat instanceof Cat → \${cat instanceof Cat}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">static・getter/setter</h2>
        <p className="text-gray-400 mb-4">静的メソッドとアクセサを使いこなしましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="output"></div>`}
          defaultCss={`body { font-family: sans-serif; }
.section { margin-bottom: 16px; }
.section h3 { color: #f59e0b; margin-bottom: 4px; }
.result { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 4px 0; font-family: monospace; font-size: 14px; white-space: pre-wrap; }`}
          defaultJs={`const out = document.getElementById("output");

class Temperature {
  // プライベート風のプロパティ（慣習的に_で始める）
  constructor(celsius) {
    this._celsius = celsius;
  }

  // ゲッター
  get fahrenheit() {
    return this._celsius * 9 / 5 + 32;
  }

  // セッター
  set fahrenheit(f) {
    this._celsius = (f - 32) * 5 / 9;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(c) {
    if (c < -273.15) throw new Error("絶対零度以下は不可");
    this._celsius = c;
  }

  // 静的メソッド
  static fromFahrenheit(f) {
    return new Temperature((f - 32) * 5 / 9);
  }

  static boilingPoint() {
    return new Temperature(100);
  }
}

const temp = new Temperature(25);
const fromF = Temperature.fromFahrenheit(212);
const boiling = Temperature.boilingPoint();

// getter/setterはプロパティのようにアクセス
temp.fahrenheit = 100;

class IdGenerator {
  static nextId = 1;
  static generate() {
    return "ID-" + String(IdGenerator.nextId++).padStart(4, "0");
  }
}

out.innerHTML = \`
<div class="section">
  <h3>getter — プロパティのように値を取得</h3>
  <div class="result">new Temperature(25)
temp.fahrenheit → \${new Temperature(25).fahrenheit}°F
temp.celsius → \${new Temperature(25).celsius}°C</div>
</div>
<div class="section">
  <h3>setter — プロパティのように値を設定</h3>
  <div class="result">temp.fahrenheit = 100 → 摂氏\${temp.celsius.toFixed(1)}°C</div>
</div>
<div class="section">
  <h3>静的メソッド — インスタンス不要</h3>
  <div class="result">Temperature.fromFahrenheit(212) → \${fromF.celsius}°C
Temperature.boilingPoint() → \${boiling.celsius}°C</div>
</div>
<div class="section">
  <h3>静的プロパティ</h3>
  <div class="result">\${IdGenerator.generate()}
\${IdGenerator.generate()}
\${IdGenerator.generate()}</div>
</div>
\`;`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">自由に試してみよう</h2>
        <p className="text-gray-400 mb-4">クラスを使ってキャラクター管理システムを作ってみましょう。</p>
        <CodePlayground
          mode="all"
          defaultHtml={`<div id="app">
  <h2>キャラクター管理</h2>
  <div id="characters"></div>
  <button onclick="battle()">バトル！</button>
  <div id="log"></div>
</div>`}
          defaultCss={`#app { max-width: 500px; margin: 0 auto; }
h2 { color: #f59e0b; }
#characters { display: flex; gap: 12px; margin-bottom: 16px; }
.char { flex: 1; background: #f5f5f5; padding: 16px; border-radius: 8px; text-align: center; }
.char h3 { color: #f59e0b; margin: 0 0 8px; }
.hp-bar { background: #ddd; height: 12px; border-radius: 6px; overflow: hidden; }
.hp-fill { background: #22c55e; height: 100%; transition: width 0.3s; }
button { background: #f59e0b; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; display: block; margin: 0 auto; }
#log { margin-top: 16px; font-family: monospace; font-size: 13px; max-height: 200px; overflow-y: auto; }
.log-entry { padding: 4px 8px; border-bottom: 1px solid #eee; }`}
          defaultJs={`class Character {
  constructor(name, hp, attack) {
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.attack = attack;
  }

  hit(target) {
    const dmg = Math.floor(this.attack * (0.8 + Math.random() * 0.4));
    target.hp = Math.max(0, target.hp - dmg);
    return this.name + "の攻撃！" + target.name + "に" + dmg + "ダメージ！";
  }

  get isAlive() { return this.hp > 0; }
  get hpPercent() { return (this.hp / this.maxHp * 100).toFixed(0); }
}

const hero = new Character("勇者", 100, 20);
const monster = new Character("ドラゴン", 120, 15);

function render() {
  document.getElementById("characters").innerHTML =
    [hero, monster].map(c =>
      '<div class="char"><h3>' + c.name + '</h3>' +
      '<div>HP: ' + c.hp + '/' + c.maxHp + '</div>' +
      '<div class="hp-bar"><div class="hp-fill" style="width:' + c.hpPercent + '%"></div></div></div>'
    ).join("");
}

function battle() {
  if (!hero.isAlive || !monster.isAlive) {
    hero.hp = hero.maxHp;
    monster.hp = monster.maxHp;
    document.getElementById("log").innerHTML = "";
  }
  const log = document.getElementById("log");
  log.innerHTML += '<div class="log-entry">' + hero.hit(monster) + '</div>';
  if (monster.isAlive) {
    log.innerHTML += '<div class="log-entry">' + monster.hit(hero) + '</div>';
  }
  if (!hero.isAlive) log.innerHTML += '<div class="log-entry" style="color:red">勇者は倒れた...</div>';
  if (!monster.isAlive) log.innerHTML += '<div class="log-entry" style="color:green">ドラゴンを倒した！</div>';
  render();
  log.scrollTop = log.scrollHeight;
}

render();`}
        />
      </section>
      <LessonCompleteButton categoryId="javascript" lessonId="classes" color="yellow" />
      <LessonNav lessons={JS_LESSONS} currentId="classes" basePath="/learn/javascript" color="yellow" />
    </div>
  );
}
