import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("delegates");

export default function ObserverPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-orange-400 text-sm font-semibold">デリゲート・イベント レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Observerパターン</h1>
        <p className="text-gray-400">IObservable&lt;T&gt;・IObserver&lt;T&gt;・Subscribeを使ったリアクティブな監視パターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">IObservable / IObserver パターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          .NETのObserverパターンは <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">IObservable&lt;T&gt;</code>（データソース）と
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">IObserver&lt;T&gt;</code>（購読者）で構成されます。
          <code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">event</code> より強力で、完了・エラー通知も扱えます。
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">OnNext(T)</code>: 新しいデータが来た</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">OnCompleted()</code>: ストリームが正常に完了</li>
          <li><code className="text-orange-400 bg-gray-800 px-1.5 py-0.5 rounded">OnError(Exception)</code>: エラーが発生した</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">IObservable の実装</h2>
        <p className="text-gray-400 mb-4">
          温度センサーを例に実装します。
        </p>
        <CSharpEditor
          defaultCode={`using System;
using System.Collections.Generic;

class TemperatureSensor : IObservable<float>
{
    private readonly List<IObserver<float>> _observers = new();

    public IDisposable Subscribe(IObserver<float> observer)
    {
        _observers.Add(observer);
        return new Unsubscriber(_observers, observer);
    }

    public void Measure(float temp)
    {
        foreach (var obs in _observers)
            obs.OnNext(temp);
    }

    public void Complete()
    {
        foreach (var obs in _observers)
            obs.OnCompleted();
    }

    private class Unsubscriber : IDisposable
    {
        private readonly List<IObserver<float>> _list;
        private readonly IObserver<float> _observer;

        public Unsubscriber(List<IObserver<float>> list, IObserver<float> observer)
        {
            _list = list;
            _observer = observer;
        }

        public void Dispose() => _list.Remove(_observer);
    }
}

class TemperatureDisplay : IObserver<float>
{
    private readonly string _name;
    public TemperatureDisplay(string name) => _name = name;

    public void OnNext(float temp) => Console.WriteLine($"[{_name}] {temp:F1}°C");
    public void OnCompleted() => Console.WriteLine($"[{_name}] 計測完了");
    public void OnError(Exception e) => Console.WriteLine($"[{_name}] エラー: {e.Message}");
}

class Program
{
    static void Main()
    {
        var sensor = new TemperatureSensor();
        var display1 = new TemperatureDisplay("モニター1");
        var display2 = new TemperatureDisplay("モニター2");

        using var sub1 = sensor.Subscribe(display1);
        using var sub2 = sensor.Subscribe(display2);

        sensor.Measure(22.5f);
        sensor.Measure(23.1f);
        sub2.Dispose(); // display2 の購読解除
        sensor.Measure(24.0f);
        sensor.Complete();
    }
}`}
          expectedOutput={`[モニター1] 22.5°C
[モニター2] 22.5°C
[モニター1] 23.1°C
[モニター2] 23.1°C
[モニター1] 24.0°C
[モニター1] 計測完了`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="delegates" lessonId="observer" />
      </div>
      <LessonNav lessons={lessons} currentId="observer" basePath="/learn/delegates" />
    </div>
  );
}
