import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { PythonPlayground } from "@/components/python-playground";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("django");

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">Django レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">フォーム</h1>
        <p className="text-gray-400">Django Formsでユーザー入力を安全に扱う方法を学びます。</p>
      </div>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Djangoフォームの定義</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">forms.Form</code>を継承してフォームクラスを定義します。
          各フィールドは自動でHTMLの<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"<input>"}</code>要素に変換され、バリデーションも自動で行われます。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <p className="text-xs text-gray-500 mb-2">blog/forms.py</p>
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        label='お名前',
        widget=forms.TextInput(attrs={'placeholder': '田中太郎'}),
    )
    email = forms.EmailField(
        label='メールアドレス',
    )
    subject = forms.CharField(max_length=200, label='件名')
    message = forms.CharField(
        label='メッセージ',
        widget=forms.Textarea(attrs={'rows': 5}),
    )

    def clean_email(self):
        """メールアドレスのカスタムバリデーション"""
        email = self.cleaned_data['email']
        if '@example.com' in email:
            raise forms.ValidationError('サンプルメールアドレスは使用できません')
        return email`}</pre>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">ModelFormで効率化</h2>
        <p className="text-gray-400 mb-4">
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">forms.ModelForm</code>を使うとモデルのフィールドから自動的にフォームを生成できます。
          <code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">save()</code>メソッドでDBへの保存も簡単になります。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content', 'is_published']
        labels = {
            'title': 'タイトル',
            'content': '本文',
            'is_published': '公開する',
        }
        widgets = {
            'content': forms.Textarea(attrs={'rows': 10}),
        }

# ビューでの使い方
def article_create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)  # DB保存を遅らせる
            article.author = request.user
            article.save()
            return redirect('article_list')
    else:
        form = ArticleForm()
    return render(request, 'blog/article_form.html', {'form': form})`}</pre>
        </div>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">テンプレートでのフォームレンダリング</h2>
        <p className="text-gray-400 mb-4">
          フォームはテンプレートで自動的にHTMLにレンダリングされます。
          CSRFトークンは<code className="text-green-400 bg-gray-800 px-1.5 py-0.5 rounded">{"{% csrf_token %}"}</code>で必ず付与します。
        </p>
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-5">
          <pre className="text-sm font-mono text-gray-200 whitespace-pre">{`<form method="post">
  {% csrf_token %}

  {# フォーム全体を一括レンダリング #}
  {{ form.as_p }}

  {# または個別にレンダリング #}
  <div class="field">
    {{ form.title.label_tag }}
    {{ form.title }}
    {% if form.title.errors %}
      <ul class="errors">
        {% for error in form.title.errors %}
          <li>{{ error }}</li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>

  <button type="submit">送信</button>
</form>`}</pre>
        </div>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">フォームバリデーションを実装する</h2>
        <p className="text-gray-400 mb-4">
          Djangoのフォームバリデーションと同等の処理をPythonで実装してみましょう。
        </p>
        <PythonPlayground defaultCode={`import re
from typing import Any

class ValidationError(Exception):
    pass

class Field:
    def __init__(self, label, required=True, max_length=None, min_length=None):
        self.label = label
        self.required = required
        self.max_length = max_length
        self.min_length = min_length

    def clean(self, value):
        if self.required and not value:
            raise ValidationError(f"{self.label}は必須です")
        if value and self.max_length and len(value) > self.max_length:
            raise ValidationError(f"{self.label}は{self.max_length}文字以内にしてください")
        if value and self.min_length and len(value) < self.min_length:
            raise ValidationError(f"{self.label}は{self.min_length}文字以上必要です")
        return value

class EmailField(Field):
    def clean(self, value):
        value = super().clean(value)
        if value and not re.match(r'^[^@]+@[^@]+\.[^@]+$', value):
            raise ValidationError(f"{self.label}に有効なメールアドレスを入力してください")
        return value

class Form:
    """Django forms.Form の簡易版"""
    def __init__(self, data=None):
        self.data = data or {}
        self.errors = {}
        self.cleaned_data = {}
        self._is_bound = data is not None

    def is_valid(self):
        if not self._is_bound:
            return False
        self.errors = {}
        self.cleaned_data = {}

        for name, field in self._get_fields():
            value = self.data.get(name, "").strip()
            try:
                cleaned = field.clean(value)
                # カスタムバリデーター
                custom = getattr(self, f"clean_{name}", None)
                if custom:
                    cleaned = custom(cleaned)
                self.cleaned_data[name] = cleaned
            except ValidationError as e:
                self.errors[name] = str(e)

        return len(self.errors) == 0

    def _get_fields(self):
        for name, val in vars(self.__class__).items():
            if isinstance(val, Field):
                yield name, val

# コンタクトフォームの定義
class ContactForm(Form):
    name = Field("お名前", max_length=100)
    email = EmailField("メールアドレス")
    message = Field("メッセージ", min_length=10, max_length=1000)

    def clean_email(self, value):
        if value and "@example.com" in value:
            raise ValidationError("サンプルメールアドレスは使用できません")
        return value

# テスト
test_data = [
    {"name": "田中太郎", "email": "tanaka@mail.com", "message": "お問い合わせの内容です。よろしくお願いします。"},
    {"name": "", "email": "invalid-email", "message": "短い"},
    {"name": "山田花子", "email": "test@example.com", "message": "サンプルメールは使えない"},
]

for data in test_data:
    form = ContactForm(data)
    if form.is_valid():
        print(f"有効なフォーム: name={form.cleaned_data['name']}")
    else:
        print(f"エラー:")
        for field, msg in form.errors.items():
            print(f"  {field}: {msg}")
    print()`} />
      </section>

      <LessonCompleteButton categoryId="django" lessonId="forms" />
      <LessonNav lessons={lessons} currentId="forms" basePath="/learn/django" />
    </div>
  );
}
