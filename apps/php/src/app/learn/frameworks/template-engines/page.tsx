import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("frameworks");

export default function LessonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-indigo-400 text-sm font-semibold">フレームワーク入門 レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">テンプレートエンジン</h1>
        <p className="text-gray-400">Blade、Twigなどテンプレートエンジンの概念と基本構文を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">テンプレートエンジンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          テンプレートエンジンはPHPコードとHTMLを分離し、ビューのロジックを簡潔に書ける仕組みです。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-pink-300">Blade</code>（Laravel） - <code>@if</code>、<code>@foreach</code>、<code>@extends</code></li>
          <li><code className="text-pink-300">Twig</code>（Symfony） - <code>{"{{ }}"}</code>、<code>{"{% %}"}</code>構文</li>
          <li>テンプレートの継承（レイアウト）</li>
          <li>自動エスケープによるXSS対策</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">シンプルなテンプレートエンジンの実装</h2>
        <p className="text-gray-400 mb-4">Twigライクな変数展開と制御構文を持つシンプルなテンプレートエンジンを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class TemplateEngine {
    public function render(string $template, array $vars = []): string {
        // 変数の展開: {{ var }} または {{ var|escape }}
        $output = preg_replace_callback('/\{\{\s*(\w+)(?:\|(\w+))?\s*\}\}/', function($m) use ($vars) {
            $value = (string)($vars[$m[1]] ?? '');
            return match($m[2] ?? '') {
                'upper' => strtoupper($value),
                'lower' => strtolower($value),
                'escape', '' => htmlspecialchars($value, ENT_QUOTES),
                default => $value,
            };
        }, $template);

        // {% if condition %}...{% endif %}
        $output = preg_replace_callback('/\{%\s*if\s+(\w+)\s*%\}(.*?)\{%\s*endif\s*%\}/s',
            function($m) use ($vars) {
                return !empty($vars[$m[1]]) ? trim($m[2]) : '';
            }, $output);

        // {% for item in items %}...{% endfor %}
        $output = preg_replace_callback('/\{%\s*for\s+(\w+)\s+in\s+(\w+)\s*%\}(.*?)\{%\s*endfor\s*%\}/s',
            function($m) use ($vars) {
                $items = $vars[$m[2]] ?? [];
                $result = '';
                foreach ($items as $item) {
                    $result .= preg_replace('/\{\{\s*' . $m[1] . '\s*\}\}/', htmlspecialchars((string)$item), $m[3]);
                }
                return trim($result);
            }, $output);

        return $output;
    }
}

$engine = new TemplateEngine();

$template = <<<'TPL'
ユーザー: {{ name|upper }}
<script>{{ xss }}</script>
{% if isAdmin %}
管理者権限あり
{% endif %}
スキル:
{% for skill in skills %}
- {{ skill }}
{% endfor %}
TPL;

echo $engine->render($template, [
    'name' => 'tanaka',
    'xss' => '<script>alert("xss")</script>',
    'isAdmin' => true,
    'skills' => ['PHP', 'JavaScript', 'SQL'],
]);`}
          expectedOutput={`ユーザー: TANAKA
&lt;script&gt;&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;&lt;/script&gt;
管理者権限あり
スキル:
- PHP
- JavaScript
- SQL`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テンプレート継承パターン</h2>
        <p className="text-gray-400 mb-4">Bladeの@extends/@sectionのようなテンプレート継承でレイアウトを共有するパターンを実装します。</p>
        <PhpEditor
          defaultCode={`<?php
class Layout {
    private array $sections = [];
    private ?string $layout = null;

    public function extend(string $layout): void {
        $this->layout = $layout;
    }

    public function section(string $name, string $content): void {
        $this->sections[$name] = $content;
    }

    public function yield(string $name, string $default = ''): string {
        return $this->sections[$name] ?? $default;
    }
}

// ベースレイアウト
function baseLayout(Layout $l): string {
    $title = $l->yield('title', 'PHPアプリ');
    $content = $l->yield('content');
    $footer = $l->yield('footer', 'Copyright 2024');
    return <<<HTML
    <!DOCTYPE html>
    <title>$title</title>
    <body>
    <nav>ナビゲーション</nav>
    <main>$content</main>
    <footer>$footer</footer>
    </body>
    HTML;
}

// 子テンプレート
$layout = new Layout();
$layout->extend('base');
$layout->section('title', 'ユーザー一覧 | PHPアプリ');
$layout->section('content', '<h1>ユーザー一覧</h1><p>3名のユーザーがいます</p>');
$layout->section('footer', 'PHP Learn App &copy; 2024');

echo baseLayout($layout);`}
          expectedOutput={`<!DOCTYPE html>
    <title>ユーザー一覧 | PHPアプリ</title>
    <body>
    <nav>ナビゲーション</nav>
    <main><h1>ユーザー一覧</h1><p>3名のユーザーがいます</p></main>
    <footer>PHP Learn App &copy; 2024</footer>
    </body>`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="frameworks" lessonId="template-engines" />
      </div>
      <LessonNav lessons={lessons} currentId="template-engines" basePath="/learn/frameworks" />
    </div>
  );
}
