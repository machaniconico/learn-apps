import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("debug");

export default function DebugLoggingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デバッグ レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">loggingモジュール</h1>
        <p className="text-gray-400">ログレベルとハンドラを使った本格的なロギングシステムの構築を学びます。</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">loggingがprintより優れている理由</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <h3 className="text-red-400 font-semibold mb-1 text-sm">print の問題点</h3>
            <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
              <li>本番環境に残ると情報漏洩の恐れ</li>
              <li>出力のオン・オフが難しい</li>
              <li>タイムスタンプや重要度が含まれない</li>
              <li>ファイルへの出力設定が面倒</li>
            </ul>
          </div>
          <div className="bg-gray-900 border border-orange-500/20 rounded-xl p-4">
            <h3 className="text-orange-400 font-semibold mb-1 text-sm">logging の利点</h3>
            <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
              <li>レベルで出力を制御できる</li>
              <li>タイムスタンプ・ファイル名・行番号を自動付与</li>
              <li>ファイル・コンソール同時出力が可能</li>
              <li>本番でWARNING以上のみ出力に切り替え可能</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">ログレベルを理解しよう</h2>
        <PythonPlayground defaultCode={`import logging

# basicConfigでロガーを設定
logging.basicConfig(
    level=logging.DEBUG,  # DEBUG以上を全て出力
    format='%(levelname)-8s %(name)s: %(message)s'
)

logger = logging.getLogger('myapp')

# 各ログレベルの使い分け
logger.debug("デバッグ情報: 詳細な変数の値や処理フロー")
logger.info("情報: 処理の開始・完了など通常のイベント")
logger.warning("警告: 問題ではないが注意が必要な状況")
logger.error("エラー: 処理が失敗したが続行可能")
logger.critical("クリティカル: システムが停止するような重大エラー")

print()

# レベルをWARNING以上に変更する例
logging.getLogger().setLevel(logging.WARNING)
print("=== WARNINGレベル以上のみ出力 ===")
logger.debug("これは表示されない")
logger.info("これも表示されない")
logger.warning("これは表示される")
logger.error("これも表示される")`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-3">実用的なロギング設定</h2>
        <p className="text-gray-400 mb-4">ファイルとコンソールに同時出力する本格的なロギング設定を見てみましょう。</p>
        <PythonPlayground defaultCode={`import logging
import sys
from datetime import datetime

def setup_logger(name, level=logging.DEBUG):
    """アプリケーション用ロガーを設定する"""
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.handlers.clear()  # 既存のハンドラをクリア

    # コンソールハンドラ（INFO以上）
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_fmt = logging.Formatter(
        '%(asctime)s [%(levelname)s] %(message)s',
        datefmt='%H:%M:%S'
    )
    console_handler.setFormatter(console_fmt)
    logger.addHandler(console_handler)

    return logger

# ロガーを使った実際のアプリケーションコード
logger = setup_logger('shopping')

def process_order(order_id, items):
    logger.info(f"注文処理開始: order_id={order_id}")

    if not items:
        logger.warning(f"注文 {order_id} のアイテムが空です")
        return None

    total = 0
    for item in items:
        price = item.get('price', 0)
        qty = item.get('qty', 0)
        if price <= 0:
            logger.error(f"不正な価格: {item}")
            continue
        subtotal = price * qty
        logger.debug(f"  {item['name']}: {price}円 × {qty} = {subtotal}円")
        total += subtotal

    logger.info(f"注文処理完了: order_id={order_id}, 合計={total}円")
    return total

# 実行
orders = [
    {'name': 'りんご', 'price': 150, 'qty': 3},
    {'name': 'バナナ', 'price': 0, 'qty': 2},   # 不正価格
    {'name': 'みかん', 'price': 80, 'qty': 5},
]

result = process_order('ORD-001', orders)
print(f"\\n最終合計: {result}円")`} />
      </section>

      <LessonCompleteButton categoryId="debug" lessonId="logging" />
      <LessonNav lessons={lessons} currentId="logging" basePath="/learn/debug" />
    </div>
  );
}
