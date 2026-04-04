import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { REACT_LESSONS } from "@/lib/lessons-data";

export default function ReactExerciseLesson() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">React レッスン10</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">React総合演習</h1>
        <p className="text-gray-400">天気予報アプリを作ろう &#8212; これまで学んだ知識の総まとめ</p>
      </div>

      {/* プロジェクト概要 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">プロジェクト概要</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この演習では、これまでに学んだReactの知識を総動員して<strong className="text-green-400">天気予報アプリ</strong>を
          コードウォークスルー形式で構築します。以下の機能を実装します。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-1 mb-4">
          <li>都市名を入力して天気を検索</li>
          <li>現在の天気情報を表示</li>
          <li>5日間の予報をリスト表示</li>
          <li>検索履歴の保存と表示</li>
          <li>ローディング・エラー状態の管理</li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          使用するReactの概念：<strong className="text-green-400">JSX</strong>、<strong className="text-green-400">コンポーネント</strong>、
          <strong className="text-green-400">Props</strong>、<strong className="text-green-400">useState</strong>、
          <strong className="text-green-400">useEffect</strong>、<strong className="text-green-400">イベント処理</strong>、
          <strong className="text-green-400">リスト表示</strong>、<strong className="text-green-400">カスタムHook</strong>
        </p>
      </section>

      {/* Step 1: カスタムHook */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 1: 天気データ取得のカスタムHook</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          まず、天気APIからデータを取得するロジックをカスタムHookに分離します。
          ローディング状態とエラーハンドリングも含めます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// hooks/useWeather.js
import { useState, useCallback } from "react";

// 天気データの型（TypeScriptの場合）
// interface WeatherData {
//   city: string;
//   temp: number;
//   description: string;
//   icon: string;
//   humidity: number;
//   wind: number;
//   forecast: ForecastDay[];
// }

const API_KEY = "YOUR_API_KEY"; // OpenWeatherMap API キー
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // 現在の天気を取得
      const weatherRes = await fetch(
        \`\${BASE_URL}/weather?q=\${city}&appid=\${API_KEY}&units=metric&lang=ja\`
      );
      if (!weatherRes.ok) {
        throw new Error(
          weatherRes.status === 404
            ? "都市が見つかりません"
            : "天気データの取得に失敗しました"
        );
      }
      const weatherData = await weatherRes.json();

      // 5日間予報を取得
      const forecastRes = await fetch(
        \`\${BASE_URL}/forecast?q=\${city}&appid=\${API_KEY}&units=metric&lang=ja\`
      );
      const forecastData = await forecastRes.json();

      // データを整形
      setWeather({
        city: weatherData.name,
        temp: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        humidity: weatherData.main.humidity,
        wind: Math.round(weatherData.wind.speed * 10) / 10,
      });

      // 1日1件に間引く（3時間ごとのデータ → 日次）
      const dailyForecast = forecastData.list
        .filter((_, index) => index % 8 === 0)
        .slice(0, 5)
        .map(item => ({
          date: new Date(item.dt * 1000).toLocaleDateString("ja-JP", {
            month: "short",
            day: "numeric",
            weekday: "short",
          }),
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, loading, error, fetchWeather };
}`}</code>
        </pre>
      </section>

      {/* Step 2: 検索コンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 2: 検索コンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          都市名を入力して検索するフォームコンポーネントです。
          <strong className="text-green-400">useState</strong>でフォームの入力値を管理し、
          <strong className="text-green-400">onSubmit</strong>で送信を処理します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// components/SearchForm.jsx
import { useState } from "react";

function SearchForm({ onSearch, loading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      gap: "8px",
      marginBottom: "24px",
    }}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="都市名を入力（例: Tokyo）"
        disabled={loading}
        style={{
          flex: 1,
          padding: "12px 16px",
          borderRadius: "8px",
          border: "2px solid #ddd",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        disabled={loading || !city.trim()}
        style={{
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          background: loading ? "#ccc" : "#10b981",
          color: "white",
          fontSize: "16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "検索中..." : "検索"}
      </button>
    </form>
  );
}

export default SearchForm;`}</code>
        </pre>
      </section>

      {/* Step 3: 天気表示コンポーネント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 3: 天気表示コンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          現在の天気と5日間予報を表示するコンポーネントです。
          <strong className="text-green-400">Props</strong>でデータを受け取り、
          <strong className="text-green-400">条件付きレンダリング</strong>で表示を切り替えます。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// components/WeatherDisplay.jsx

// 現在の天気
function CurrentWeather({ weather }) {
  if (!weather) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "16px",
      padding: "32px",
      color: "white",
      marginBottom: "24px",
    }}>
      <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
        {weather.city}
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <img
          src={\`https://openweathermap.org/img/wn/\${weather.icon}@2x.png\`}
          alt={weather.description}
          style={{ width: "80px", height: "80px" }}
        />
        <div>
          <p style={{ fontSize: "48px", fontWeight: "bold" }}>
            {weather.temp}&deg;C
          </p>
          <p style={{ fontSize: "18px" }}>{weather.description}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
        <span>湿度: {weather.humidity}%</span>
        <span>風速: {weather.wind} m/s</span>
      </div>
    </div>
  );
}

// 5日間予報（リスト表示 + Keyの活用）
function Forecast({ forecast }) {
  if (forecast.length === 0) return null;

  return (
    <div>
      <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>
        5日間の予報
      </h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "12px",
      }}>
        {forecast.map((day, index) => (
          <div
            key={day.date + index}
            style={{
              background: "#f3f4f6",
              borderRadius: "12px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {day.date}
            </p>
            <img
              src={\`https://openweathermap.org/img/wn/\${day.icon}.png\`}
              alt={day.description}
              style={{ width: "48px", height: "48px" }}
            />
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {day.temp}&deg;C
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              {day.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { CurrentWeather, Forecast };`}</code>
        </pre>
      </section>

      {/* Step 4: 検索履歴 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 4: 検索履歴コンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          検索した都市の履歴を表示し、クリックで再検索できるコンポーネントです。
          <strong className="text-green-400">イベント処理</strong>と<strong className="text-green-400">リスト表示</strong>の実践です。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// components/SearchHistory.jsx

function SearchHistory({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  return (
    <div style={{
      marginBottom: "24px",
      padding: "16px",
      background: "#f9fafb",
      borderRadius: "12px",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}>
        <h3 style={{ fontSize: "14px", color: "#666" }}>検索履歴</h3>
        <button
          onClick={onClear}
          style={{
            background: "none",
            border: "none",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          クリア
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {history.map((city, index) => (
          <button
            key={city + index}
            onClick={() => onSelect(city)}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              border: "1px solid #d1d5db",
              background: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;`}</code>
        </pre>
      </section>

      {/* Step 5: メインApp */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Step 5: メインAppコンポーネント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          すべてのコンポーネントを組み合わせて、完成したアプリを構築します。
          <strong className="text-green-400">コンポーネントの組み合わせ</strong>、
          <strong className="text-green-400">状態のリフトアップ</strong>、
          <strong className="text-green-400">useEffect</strong>を活用します。
        </p>
        <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-gray-300">{`// App.jsx
import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchForm from "./components/SearchForm";
import { CurrentWeather, Forecast } from "./components/WeatherDisplay";
import SearchHistory from "./components/SearchHistory";

function App() {
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  // 検索履歴（localStorageと同期）
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("weatherHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // 履歴をlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  // 検索実行
  const handleSearch = (city) => {
    fetchWeather(city);

    // 履歴に追加（重複を除外、最大10件）
    setHistory(prev => {
      const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 10);
    });
  };

  // 履歴クリア
  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "24px",
      fontFamily: "sans-serif",
    }}>
      <h1 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "24px",
        textAlign: "center",
      }}>
        天気予報アプリ
      </h1>

      <SearchForm onSearch={handleSearch} loading={loading} />

      <SearchHistory
        history={history}
        onSelect={handleSearch}
        onClear={handleClearHistory}
      />

      {/* エラー表示 */}
      {error && (
        <div style={{
          padding: "12px 16px",
          background: "#fef2f2",
          color: "#dc2626",
          borderRadius: "8px",
          marginBottom: "16px",
        }}>
          {error}
        </div>
      )}

      {/* ローディング表示 */}
      {loading && (
        <div style={{ textAlign: "center", padding: "32px", color: "#666" }}>
          <p>天気データを取得中...</p>
        </div>
      )}

      {/* 天気表示 */}
      {!loading && weather && (
        <>
          <CurrentWeather weather={weather} />
          <Forecast forecast={forecast} />
        </>
      )}

      {/* 初期状態 */}
      {!loading && !weather && !error && (
        <div style={{
          textAlign: "center",
          padding: "48px",
          color: "#9ca3af",
        }}>
          <p style={{ fontSize: "48px" }}>&#127326;</p>
          <p>都市名を入力して天気を検索してください</p>
        </div>
      )}
    </div>
  );
}

export default App;`}</code>
        </pre>
      </section>

      {/* 学習のポイント */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">学習のポイント</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          この天気予報アプリで使用したReactの概念を振り返りましょう。
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">JSX</h3>
            <p className="text-sm text-gray-400">条件付きレンダリング、式の埋め込み、フラグメントの活用</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">コンポーネント設計</h3>
            <p className="text-sm text-gray-400">SearchForm、WeatherDisplay、SearchHistoryへの分割</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">Props</h3>
            <p className="text-sm text-gray-400">親から子へのデータ渡し、コールバック関数の受け渡し</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">State管理</h3>
            <p className="text-sm text-gray-400">useState、関数型初期化、配列のイミュータブル更新</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">useEffect</h3>
            <p className="text-sm text-gray-400">localStorageとの同期、依存配列の正しい指定</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">カスタムHook</h3>
            <p className="text-sm text-gray-400">useWeatherでAPI通信ロジックを再利用可能に</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">イベント処理</h3>
            <p className="text-sm text-gray-400">onSubmit、onChange、onClick、preventDefaultの活用</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <h3 className="font-semibold text-green-400 mb-2">リスト表示</h3>
            <p className="text-sm text-gray-400">予報データのmap表示、検索履歴のkey指定</p>
          </div>
        </div>
      </section>

      {/* 発展課題 */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">発展課題</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          さらにスキルアップしたい場合は、以下の機能を追加してみましょう。
        </p>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li>位置情報APIを使って現在地の天気を自動表示</li>
          <li>テーマ切り替え（ライト / ダーク モード）</li>
          <li>天気に応じた背景色やアニメーションの変更</li>
          <li>React Routerで都市ごとの詳細ページを追加</li>
          <li>お気に入り都市の登録・管理機能</li>
          <li>グラフライブラリ（Recharts等）で気温推移をチャート表示</li>
        </ul>
      </section>

      {/* まとめ */}
      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">React入門コース完了！</h2>

        <p className="text-gray-300 leading-relaxed mb-4">
          おめでとうございます！ React入門コースの全10レッスンを修了しました。
          JSXの基本からコンポーネント設計、状態管理、副作用処理、ルーティングまで、
          Reactの基礎をしっかりと学びました。
        </p>
        <p className="text-gray-300 leading-relaxed">
          次のステップとしては、<strong className="text-green-400">TypeScript</strong>との組み合わせ、
          <strong className="text-green-400">Next.js</strong>でのフルスタック開発、
          状態管理ライブラリ（<strong className="text-green-400">Zustand</strong>、
          <strong className="text-green-400">Redux</strong>）の学習がおすすめです。
          実際のプロジェクトを作りながら、スキルを磨いていきましょう！
        </p>
      </section>
      <LessonCompleteButton categoryId="react" lessonId="react-exercise" color="green" />
      <LessonNav lessons={REACT_LESSONS} currentId="react-exercise" basePath="/learn/react" color="green" />
    </div>
  );
}
