import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PhpEditor } from "@/components/php-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function PaginationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6">
        <span className="text-violet-400 text-sm font-semibold uppercase tracking-wide">データベース</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-3">ページネーション</h1>
        <div className="bg-gray-900 rounded-lg p-4 text-gray-300 leading-relaxed">
          <p>
            <strong className="text-violet-300">ページネーション</strong>は大量のデータを複数ページに分けて表示する技術です。
            SQLのLIMITとOFFSETを使って特定範囲のデータを取得し、
            合計件数からページ数を計算してナビゲーションを生成します。
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">LIMIT と OFFSET</h2>
        <p className="text-gray-400 mb-4">
          LIMIT n OFFSET mで、m件スキップしてn件取得します。ページ番号からOFFSETを計算します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nfunction calculatePagination(int $page, int $perPage, int $total): array {\n    $page       = max(1, $page);\n    $totalPages = (int)ceil($total / $perPage);\n    $page       = min($page, $totalPages);\n    $offset     = ($page - 1) * $perPage;\n\n    return [\n        'page'        => $page,\n        'per_page'    => $perPage,\n        'total'       => $total,\n        'total_pages' => $totalPages,\n        'offset'      => $offset,\n        'has_prev'    => $page > 1,\n        'has_next'    => $page < $totalPages,\n    ];\n}\n\n$total   = 95;\n$perPage = 10;\n\nforeach ([1, 5, 10] as $page) {\n    $p = calculatePagination($page, $perPage, $total);\n    echo "ページ {$p['page']}/{$p['total_pages']}:\\n";\n    echo "  SQL: SELECT * FROM items LIMIT {$p['per_page']} OFFSET {$p['offset']}\\n";\n    echo "  前: " . ($p['has_prev'] ? "あり" : "なし") . " / 次: " . ($p['has_next'] ? "あり" : "なし") . "\\n";\n}`}
          expectedOutput={`ページ 1/10:\n  SQL: SELECT * FROM items LIMIT 10 OFFSET 0\n  前: なし / 次: あり\nページ 5/10:\n  SQL: SELECT * FROM items LIMIT 10 OFFSET 40\n  前: あり / 次: あり\nページ 10/10:\n  SQL: SELECT * FROM items LIMIT 10 OFFSET 90\n  前: あり / 次: なし`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ページネーションクラス</h2>
        <p className="text-gray-400 mb-4">
          再利用可能なPaginatorクラスを作成してページネーションロジックをカプセル化します。
        </p>
        <PhpEditor
          defaultCode={`<?php\nclass Paginator {\n    private int $page;\n    private int $perPage;\n    private int $total;\n\n    public function __construct(int $page, int $perPage, int $total) {\n        $this->perPage = max(1, $perPage);\n        $this->total   = max(0, $total);\n        $this->page    = max(1, min($page, $this->totalPages()));\n    }\n\n    public function totalPages(): int {\n        return (int)ceil($this->total / $this->perPage);\n    }\n\n    public function offset(): int {\n        return ($this->page - 1) * $this->perPage;\n    }\n\n    public function hasPrev(): bool { return $this->page > 1; }\n    public function hasNext(): bool { return $this->page < $this->totalPages(); }\n\n    public function pageNumbers(int $range = 2): array {\n        $start = max(1, $this->page - $range);\n        $end   = min($this->totalPages(), $this->page + $range);\n        return range($start, $end);\n    }\n\n    public function info(): string {\n        $start = $this->offset() + 1;\n        $end   = min($this->offset() + $this->perPage, $this->total);\n        return "{$start}-{$end} / {$this->total}件";\n    }\n}\n\n$paginator = new Paginator(page: 5, perPage: 10, total: 95);\necho "現在: " . $paginator->info() . "\\n";\necho "ページ番号: " . implode(", ", $paginator->pageNumbers()) . "\\n";\necho "OFFSET: " . $paginator->offset() . "\\n";\necho "前ページ: " . ($paginator->hasPrev() ? "あり" : "なし") . "\\n";\necho "次ページ: " . ($paginator->hasNext() ? "あり" : "なし");`}
          expectedOutput={`現在: 41-50 / 95件\nページ番号: 3, 4, 5, 6, 7\nOFFSET: 40\n前ページ: あり\n次ページ: あり`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">カーソルベースのページネーション</h2>
        <p className="text-gray-400 mb-4">
          大量データの場合、OFFSETは遅くなります。カーソル（最後のID）を使う方法は高速で安定しています。
        </p>
        <PhpEditor
          defaultCode={`<?php\n// カーソルベースページネーションのシミュレーション\n$allItems = array_map(fn($i) => ['id' => $i, 'name' => "商品{$i}"], range(1, 50));\n\nfunction fetchPage(array $items, ?int $cursor, int $limit): array {\n    $filtered = $cursor\n        ? array_filter($items, fn($item) => $item['id'] > $cursor)\n        : $items;\n\n    $page = array_slice(array_values($filtered), 0, $limit);\n\n    return [\n        'items'      => $page,\n        'next_cursor' => count($page) === $limit ? end($page)['id'] : null,\n        'has_more'   => count($page) === $limit,\n    ];\n}\n\n/*\nSQLで書くと:\nSELECT * FROM items WHERE id > :cursor ORDER BY id LIMIT :limit\n*/\n\n$result = fetchPage($allItems, null, 5);\necho "最初のページ:\\n";\nforeach ($result['items'] as $item) {\n    echo "  {$item['name']}\\n";\n}\necho "次カーソル: " . $result['next_cursor'] . "\\n\\n";\n\n$result2 = fetchPage($allItems, $result['next_cursor'], 5);\necho "2ページ目:\\n";\nforeach ($result2['items'] as $item) {\n    echo "  {$item['name']}\\n";\n}`}
          expectedOutput={`最初のページ:\n  商品1\n  商品2\n  商品3\n  商品4\n  商品5\n次カーソル: 5\n\n2ページ目:\n  商品6\n  商品7\n  商品8\n  商品9\n  商品10`}
        />
      </section>

      <LessonCompleteButton lessonId="pagination" categoryId="database" />
      <LessonNav lessons={lessons} currentId="pagination" basePath="/learn/database" />
    </div>
  );
}
