import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CppEditor } from "@/components/cpp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-blue-400 text-sm font-semibold">デザインパターン レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Observerパターン</h1>
        <p className="text-gray-400">イベント通知のためのObserverパターンを学びましょう。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Observerパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Observerパターンは1対多の依存関係を定義し、あるオブジェクト（Subject）の状態が変化したとき、
          依存するすべてのオブジェクト（Observer）に自動的に通知するパターンです。
          GUIのイベントシステムやデータバインディングで広く使われます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なObserverパターン</h2>
        <p className="text-gray-400 mb-4">温度センサーの値を複数のディスプレイに通知する例です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(float temp) = 0;
};

class TemperatureSensor {
    vector<Observer*> observers_;
    float temperature_ = 0;
public:
    void addObserver(Observer* obs) {
        observers_.push_back(obs);
    }

    void removeObserver(Observer* obs) {
        observers_.erase(
            remove(observers_.begin(), observers_.end(), obs),
            observers_.end()
        );
    }

    void setTemperature(float temp) {
        temperature_ = temp;
        for (auto* obs : observers_) {
            obs->update(temperature_);
        }
    }
};

class Display : public Observer {
    string name_;
public:
    Display(const string& name) : name_(name) {}
    void update(float temp) override {
        cout << name_ << ": " << temp << "°C" << endl;
    }
};

class Alert : public Observer {
public:
    void update(float temp) override {
        if (temp > 30) cout << "[警告] 高温: " << temp << "°C" << endl;
    }
};

int main() {
    TemperatureSensor sensor;

    Display lcd("LCD");
    Display led("LED");
    Alert alert;

    sensor.addObserver(&lcd);
    sensor.addObserver(&led);
    sensor.addObserver(&alert);

    cout << "--- 25°Cに設定 ---" << endl;
    sensor.setTemperature(25);

    cout << "--- 35°Cに設定 ---" << endl;
    sensor.setTemperature(35);
    return 0;
}`}
          expectedOutput={`--- 25°Cに設定 ---
LCD: 25°C
LED: 25°C
--- 35°Cに設定 ---
LCD: 35°C
LED: 35°C
[警告] 高温: 35°C`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">std::functionを使ったモダンな実装</h2>
        <p className="text-gray-400 mb-4">ラムダ式とstd::functionを使ったより柔軟な実装です。</p>
        <CppEditor
          defaultCode={`#include <iostream>
#include <functional>
#include <vector>
#include <string>
using namespace std;

class EventEmitter {
    vector<pair<string, function<void(int)>>> listeners_;
public:
    void on(const string& event, function<void(int)> callback) {
        listeners_.emplace_back(event, move(callback));
    }

    void emit(const string& event, int value) {
        for (const auto& [name, cb] : listeners_) {
            if (name == event) cb(value);
        }
    }
};

int main() {
    EventEmitter emitter;

    emitter.on("score", [](int val) {
        cout << "スコア更新: " << val << endl;
    });

    emitter.on("score", [](int val) {
        if (val >= 100) cout << "ハイスコア達成!" << endl;
    });

    emitter.on("level", [](int val) {
        cout << "レベル: " << val << endl;
    });

    emitter.emit("score", 50);
    emitter.emit("score", 100);
    emitter.emit("level", 5);
    return 0;
}`}
          expectedOutput={`スコア更新: 50
スコア更新: 100
ハイスコア達成!
レベル: 5`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/design" />
    </div>
  );
}
