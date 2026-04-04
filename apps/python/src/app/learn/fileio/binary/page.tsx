import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("fileio");

export default function BinaryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">ファイルI/O レッスン4</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">バイナリファイル</h1>
        <p className="text-gray-400">
          画像・音声・動画などのバイナリデータの読み書き方法を学びます。
          バイナリモード（<code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">'rb'</code>・
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">'wb'</code>）と
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">bytes</code> オブジェクトを理解しましょう。
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">テキストとバイナリの違い</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">テキストモード（デフォルト）</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• <code className="text-orange-400 bg-gray-900 px-1 rounded">str</code> オブジェクトで読み書き</li>
              <li>• エンコーディングの変換を行う</li>
              <li>• 改行コードの変換あり（\n ↔ \r\n）</li>
              <li>• .txt, .py, .csv, .json など</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-semibold mb-2">バイナリモード</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• <code className="text-orange-400 bg-gray-900 px-1 rounded">bytes</code> オブジェクトで読み書き</li>
              <li>• エンコーディングの変換なし</li>
              <li>• データをそのままコピー</li>
              <li>• .png, .mp3, .pdf, .zip など</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">bytes オブジェクトの操作</h2>
        <PythonPlayground
          defaultCode={`import io
import struct

# bytes リテラル
b1 = b"Hello"
b2 = bytes([72, 101, 108, 108, 111])  # ASCII コードで作成
print(f"b'Hello': {b1}")
print(f"bytes([...]): {b2}")
print(f"等しい: {b1 == b2}")

print()
# 文字列 ↔ bytes の変換
text = "こんにちは"
encoded = text.encode("utf-8")
print(f"UTF-8 エンコード: {encoded}")
print(f"バイト数: {len(encoded)}")

decoded = encoded.decode("utf-8")
print(f"デコード: {decoded}")

print()
# struct モジュールで数値をバイナリにパック
print("=== struct でバイナリデータを操作 ===")
# "!HI" = ネットワークバイトオーダーで uint16 + uint32
packed = struct.pack("!HI", 1024, 123456789)
print(f"パック: {packed.hex()}")
print(f"サイズ: {len(packed)} bytes")

width, height = struct.unpack("!HI", packed)
print(f"アンパック: width={width}, height={height}")
`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">PNG ファイルヘッダーの解析例</h2>
        <PythonPlayground
          defaultCode={`import io
import struct

# 最小限の PNG ファイルデータをシミュレート
# 実際の PNG ファイルの先頭8バイトはシグネチャ
PNG_SIGNATURE = b'\\x89PNG\\r\\n\\x1a\\n'

# PNG シグネチャを確認する関数
def is_png(data: bytes) -> bool:
    return data[:8] == PNG_SIGNATURE

# バイナリデータをダンプする関数
def hex_dump(data: bytes, width: int = 16) -> str:
    lines = []
    for i in range(0, len(data), width):
        chunk = data[i:i+width]
        hex_part = " ".join(f"{b:02X}" for b in chunk)
        ascii_part = "".join(chr(b) if 32 <= b < 127 else "." for b in chunk)
        lines.append(f"{i:04X}: {hex_part:<{width*3}} {ascii_part}")
    return "\\n".join(lines)

# PNG シグネチャのダンプ
print("PNG シグネチャ (8 bytes):")
print(hex_dump(PNG_SIGNATURE))
print(f"\\nIs PNG: {is_png(PNG_SIGNATURE)}")
print(f"Is PNG (wrong): {is_png(b'JPEG\\xff\\xd8\\xff')}")

print()
# バイナリデータの書き込みと読み込みのシミュレート
buf = io.BytesIO()
buf.write(PNG_SIGNATURE)
buf.write(struct.pack(">I", 13))  # チャンク長
buf.write(b"IHDR")               # チャンクタイプ

buf.seek(0)
header = buf.read(8)
print(f"読み込み: {header}")
`}
        />
      </section>

      <div className="mt-8 mb-6">
        <LessonCompleteButton categoryId="fileio" lessonId="binary" />
      </div>
      <LessonNav lessons={lessons} currentId="binary" basePath="/learn/fileio" />
    </div>
  );
}
