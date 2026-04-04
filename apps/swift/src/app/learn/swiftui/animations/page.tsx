import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "swiftui")!.lessons;

export default function AnimationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">SwiftUI入門 レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">アニメーション</h1>
        <p className="text-gray-400">withAnimation・transition・matchedGeometryEffect を使って滑らかな UI アニメーションを実装します。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">SwiftUI のアニメーション</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwiftUI のアニメーションは状態変化に対して自動的に補間を行います。
          <code className="text-blue-300">withAnimation {"{ }"}</code> で状態変更をラップするか、
          <code className="text-blue-300">.animation(_:value:)</code> モディファイアを使います。
          <code className="text-blue-300">.transition(_:)</code> はビューの追加・削除時のアニメーション、
          <code className="text-blue-300">matchedGeometryEffect</code> はビュー間のシームレスな遷移を実現します。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-blue-300">withAnimation(.spring())</code> — スプリングアニメーション</li>
          <li><code className="text-blue-300">.easeInOut(duration:)</code> — イーズイン・アウト</li>
          <li><code className="text-blue-300">.transition(.slide)</code> — スライドトランジション</li>
          <li><code className="text-blue-300">matchedGeometryEffect(id:in:)</code> — ヒーロートランジション</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: withAnimation の基本</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct AnimationBasicView: View {
    @State private var isExpanded = false
    @State private var rotation: Double = 0
    @State private var scale: CGFloat = 1.0

    var body: some View {
        VStack(spacing: 32) {
            // スケールとローテーション
            Image(systemName: "star.fill")
                .font(.system(size: 60))
                .foregroundColor(.yellow)
                .scaleEffect(scale)
                .rotationEffect(.degrees(rotation))
                .onTapGesture {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.5)) {
                        rotation += 360
                        scale = scale == 1.0 ? 1.5 : 1.0
                    }
                }

            // サイズ変化
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.blue.gradient)
                .frame(width: isExpanded ? 280 : 120, height: 60)
                .onTapGesture {
                    withAnimation(.easeInOut(duration: 0.4)) {
                        isExpanded.toggle()
                    }
                }

            Text("タップしてアニメーション")
                .foregroundColor(.secondary)
        }
        .padding()
    }
}`}
          expectedOutput={`// 星をタップ: スプリングアニメーションで360度回転 + スケール変化
// 四角形をタップ: イーズイン・アウトで横幅が 120pt ↔ 280pt に変化`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: transition でビューの出現・消滅</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct TransitionDemoView: View {
    @State private var showCard = false
    @State private var showBanner = false

    var body: some View {
        VStack(spacing: 24) {
            // スライドトランジション
            Button("カードを表示/非表示") {
                withAnimation(.spring()) {
                    showCard.toggle()
                }
            }
            .buttonStyle(.borderedProminent)

            if showCard {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.indigo.gradient)
                    .frame(height: 120)
                    .overlay(Text("スライドで登場").foregroundColor(.white).bold())
                    .transition(.asymmetric(
                        insertion: .slide,
                        removal: .opacity.combined(with: .scale)
                    ))
            }

            // バナートランジション
            Button("バナーを表示") {
                withAnimation(.easeOut(duration: 0.3)) {
                    showBanner = true
                }
                // 2秒後に非表示
                DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                    withAnimation { showBanner = false }
                }
            }
            .buttonStyle(.bordered)

            if showBanner {
                Text("保存しました")
                    .padding()
                    .background(Color.green.opacity(0.2))
                    .cornerRadius(8)
                    .transition(.move(edge: .top).combined(with: .opacity))
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// カードボタンタップ: スライドで出現、スケール+フェードで消滅（非対称トランジション）
// バナーボタンタップ: 上からスライド+フェードで出現し、2秒後に自動消滅`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: matchedGeometryEffect によるヒーロー遷移</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct MatchedGeometryDemoView: View {
    @Namespace private var animation
    @State private var selectedItem: Int? = nil
    let items = [1, 2, 3]

    var body: some View {
        VStack {
            if let selected = selectedItem {
                // 詳細ビュー
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color(hue: Double(selected) / 5, saturation: 0.7, brightness: 0.9))
                    .matchedGeometryEffect(id: selected, in: animation)
                    .frame(width: 300, height: 300)
                    .overlay(
                        Text("アイテム \\(selected)")
                            .font(.title.bold())
                            .foregroundColor(.white)
                    )
                    .onTapGesture {
                        withAnimation(.spring(response: 0.5, dampingFraction: 0.75)) {
                            selectedItem = nil
                        }
                    }
            } else {
                // グリッドビュー
                HStack(spacing: 16) {
                    ForEach(items, id: \\.self) { item in
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color(hue: Double(item) / 5, saturation: 0.7, brightness: 0.9))
                            .matchedGeometryEffect(id: item, in: animation)
                            .frame(width: 80, height: 80)
                            .onTapGesture {
                                withAnimation(.spring(response: 0.5, dampingFraction: 0.75)) {
                                    selectedItem = item
                                }
                            }
                    }
                }
            }
        }
        .padding()
    }
}`}
          expectedOutput={`// グリッドのカードをタップ: そのカードが拡大してシームレスに詳細ビューへ遷移
// 詳細ビューをタップ: 元のサイズと位置に戻るヒーローアニメーション`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="swiftui" lessonId="animations" />
      </div>
      <LessonNav lessons={lessons} currentId="animations" basePath="/learn/swiftui" />
    </div>
  );
}
