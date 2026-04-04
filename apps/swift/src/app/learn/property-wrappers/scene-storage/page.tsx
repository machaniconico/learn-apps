import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { SwiftEditor } from "@/components/swift-editor";
import { CATEGORIES } from "@/lib/lessons-data";

const lessons = CATEGORIES.find((c) => c.id === "property-wrappers")!.lessons;

export default function SceneStoragePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">Property Wrapper レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">@SceneStorage</h1>
        <p className="text-gray-400">シーン単位で状態を自動保存・復元する @SceneStorage の使い方を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">@SceneStorage とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          <code className="text-violet-300">@SceneStorage</code> は SwiftUI のシーン（ウィンドウ）ごとに
          状態を自動的に保存・復元するプロパティラッパーです。
          アプリが強制終了・バックグラウンド移行したあと再起動しても、
          各シーンの UI 状態（スクロール位置・選択中タブ・テキスト入力など）を復元できます。
          <code className="text-violet-300">@AppStorage</code> がアプリ全体で共有されるのに対し、
          @SceneStorage はシーンごとに独立して管理されます。
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
          <li><code className="text-violet-300">@SceneStorage("key")</code> — キーで保存領域を識別</li>
          <li>対応型: <code className="text-violet-300">Bool・Int・Double・String・URL・Data</code></li>
          <li>シーンが閉じられると保存データも削除される</li>
          <li>iPad のマルチウィンドウで各ウィンドウが独立した状態を持てる</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例1: タブ選択状態の保存</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct MainTabView: View {
    // シーン単位でタブ選択を記憶する
    @SceneStorage("selectedTab") private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                Text("ホーム画面")
                    .navigationTitle("ホーム")
            }
            .tabItem {
                Label("ホーム", systemImage: "house.fill")
            }
            .tag(0)

            NavigationStack {
                Text("検索画面")
                    .navigationTitle("検索")
            }
            .tabItem {
                Label("検索", systemImage: "magnifyingglass")
            }
            .tag(1)

            NavigationStack {
                Text("設定画面")
                    .navigationTitle("設定")
            }
            .tabItem {
                Label("設定", systemImage: "gear")
            }
            .tag(2)
        }
        // アプリを終了・再起動しても selectedTab が復元される
    }
}`}
          expectedOutput={`// @SceneStorage("selectedTab") により選択中タブがシーン単位で自動保存される
// アプリ再起動後、最後に選択していたタブから再開される`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例2: テキストエディタの内容を保存</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct NoteEditorView: View {
    // 入力中のテキストをシーン単位で保存
    @SceneStorage("noteContent") private var noteContent = ""
    @SceneStorage("noteTitle") private var noteTitle = ""

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                TextField("タイトル", text: $noteTitle)
                    .font(.title2.bold())
                    .padding()
                    .background(Color.gray.opacity(0.05))

                Divider()

                TextEditor(text: $noteContent)
                    .padding()
            }
            .navigationTitle("メモ")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Text("\\(noteContent.count) 文字")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
        }
        // アプリが落ちても入力内容が保持される
    }
}`}
          expectedOutput={`// @SceneStorage("noteContent") と @SceneStorage("noteTitle") により
// 入力中のテキストとタイトルがシーンごとに自動保存される
// iPad でウィンドウを複数開くと、それぞれ独立したメモを編集できる`}
        />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">例3: @AppStorage との使い分け</h2>
        <SwiftEditor
          defaultCode={`import SwiftUI

struct SettingsComparisonView: View {
    // AppStorage: アプリ全体で共有（全シーン共通）
    @AppStorage("isDarkMode") private var isDarkMode = false
    @AppStorage("fontSize") private var fontSize: Double = 16

    // SceneStorage: このシーン（ウィンドウ）だけで保持
    @SceneStorage("scrollOffset") private var scrollOffset: Double = 0
    @SceneStorage("isFilterExpanded") private var isFilterExpanded = false

    var body: some View {
        List {
            Section("AppStorage（全シーン共通）") {
                Toggle("ダークモード", isOn: $isDarkMode)
                Stepper("フォントサイズ: \\(Int(fontSize))", value: $fontSize, in: 12...24)
            }

            Section("SceneStorage（このウィンドウのみ）") {
                Toggle("フィルターを展開", isOn: $isFilterExpanded)
                Text("スクロール位置: \\(Int(scrollOffset))")
            }
        }
        .preferredColorScheme(isDarkMode ? .dark : .light)
    }
}`}
          expectedOutput={`// isDarkMode・fontSize は AppStorage → 全シーンで同じ値を共有
// isFilterExpanded・scrollOffset は SceneStorage → ウィンドウごとに独立
// iPad マルチウィンドウで、ウィンドウAは展開、ウィンドウBは折りたたみが可能`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="property-wrappers" lessonId="scene-storage" />
      </div>
      <LessonNav lessons={lessons} currentId="scene-storage" basePath="/learn/property-wrappers" />
    </div>
  );
}
