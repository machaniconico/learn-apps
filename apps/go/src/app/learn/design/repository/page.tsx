import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { GoEditor } from "@/components/go-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("design");

export default function RepositoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-violet-400 text-sm font-semibold">設計パターン レッスン6</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">リポジトリ</h1>
        <p className="text-gray-400">データアクセスを抽象化するリポジトリパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">リポジトリパターン</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          リポジトリパターンはデータの永続化ロジックを<code className="text-cyan-300">インターフェース</code>で抽象化し、
          ビジネスロジックからデータアクセスの詳細を分離します。
          テスト時にモック実装に差し替えることが容易になります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">基本的なリポジトリ</h2>
        <p className="text-gray-400 mb-4">
          ユーザーデータの<code className="text-cyan-300">CRUD操作</code>をインターフェースで定義し、インメモリ実装を作成します。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type User struct {
    ID   int
    Name string
    Age  int
}

type UserRepository interface {
    FindByID(id int) (*User, error)
    FindAll() []*User
    Save(user *User) error
    Delete(id int) error
}

// インメモリ実装
type InMemoryUserRepo struct {
    users  map[int]*User
    nextID int
}

func NewInMemoryUserRepo() *InMemoryUserRepo {
    return &InMemoryUserRepo{users: make(map[int]*User), nextID: 1}
}

func (r *InMemoryUserRepo) FindByID(id int) (*User, error) {
    user, ok := r.users[id]
    if !ok {
        return nil, errors.New("ユーザーが見つかりません")
    }
    return user, nil
}

func (r *InMemoryUserRepo) FindAll() []*User {
    result := make([]*User, 0, len(r.users))
    for _, u := range r.users {
        result = append(result, u)
    }
    return result
}

func (r *InMemoryUserRepo) Save(user *User) error {
    if user.ID == 0 {
        user.ID = r.nextID
        r.nextID++
    }
    r.users[user.ID] = user
    return nil
}

func (r *InMemoryUserRepo) Delete(id int) error {
    delete(r.users, id)
    return nil
}

func main() {
    var repo UserRepository = NewInMemoryUserRepo()

    repo.Save(&User{Name: "田中", Age: 30})
    repo.Save(&User{Name: "佐藤", Age: 25})
    repo.Save(&User{Name: "鈴木", Age: 35})

    // 全件取得
    users := repo.FindAll()
    fmt.Printf("全ユーザー数: %d\\n", len(users))

    // ID検索
    user, err := repo.FindByID(1)
    if err == nil {
        fmt.Printf("ID=1: %s (%d歳)\\n", user.Name, user.Age)
    }

    // 削除
    repo.Delete(2)
    fmt.Printf("削除後のユーザー数: %d\\n", len(repo.FindAll()))
}`}
          expectedOutput={`全ユーザー数: 3
ID=1: 田中 (30歳)
削除後のユーザー数: 2`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">サービス層でのリポジトリ活用</h2>
        <p className="text-gray-400 mb-4">
          ビジネスロジックを含むサービス層がリポジトリを利用するパターンです。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type Product struct {
    ID    int
    Name  string
    Price float64
    Stock int
}

type ProductRepository interface {
    FindByID(id int) (*Product, error)
    Save(p *Product) error
}

type MemProductRepo struct {
    products map[int]*Product
}

func NewMemProductRepo() *MemProductRepo {
    return &MemProductRepo{
        products: map[int]*Product{
            1: {ID: 1, Name: "ノートPC", Price: 120000, Stock: 5},
            2: {ID: 2, Name: "マウス", Price: 3000, Stock: 20},
        },
    }
}

func (r *MemProductRepo) FindByID(id int) (*Product, error) {
    p, ok := r.products[id]
    if !ok {
        return nil, errors.New("商品が見つかりません")
    }
    return p, nil
}

func (r *MemProductRepo) Save(p *Product) error {
    r.products[p.ID] = p
    return nil
}

// サービス層（ビジネスロジック）
type OrderService struct {
    repo ProductRepository
}

func (s *OrderService) Purchase(productID, qty int) error {
    product, err := s.repo.FindByID(productID)
    if err != nil {
        return err
    }
    if product.Stock < qty {
        return fmt.Errorf("在庫不足: %s（残り%d個）", product.Name, product.Stock)
    }
    product.Stock -= qty
    s.repo.Save(product)
    fmt.Printf("購入完了: %s x %d = %.0f円\\n", product.Name, qty, product.Price*float64(qty))
    return nil
}

func main() {
    repo := NewMemProductRepo()
    service := &OrderService{repo: repo}

    service.Purchase(1, 2)
    service.Purchase(2, 3)

    err := service.Purchase(1, 10)
    if err != nil {
        fmt.Printf("エラー: %v\\n", err)
    }
}`}
          expectedOutput={`購入完了: ノートPC x 2 = 240000円
購入完了: マウス x 3 = 9000円
エラー: 在庫不足: ノートPC（残り3個）`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">テスト用モックリポジトリ</h2>
        <p className="text-gray-400 mb-4">
          リポジトリインターフェースを使えば、テスト用のモック実装を簡単に作成できます。
        </p>
        <GoEditor
          defaultCode={`package main

import (
    "errors"
    "fmt"
)

type Item struct {
    ID   int
    Name string
}

type ItemRepository interface {
    FindByID(id int) (*Item, error)
}

// 本番実装
type RealItemRepo struct{}
func (r *RealItemRepo) FindByID(id int) (*Item, error) {
    // 実際はDBクエリ
    return &Item{ID: id, Name: "本番データ"}, nil
}

// テスト用モック
type MockItemRepo struct {
    items map[int]*Item
    err   error // エラーをシミュレート
}
func (m *MockItemRepo) FindByID(id int) (*Item, error) {
    if m.err != nil {
        return nil, m.err
    }
    item, ok := m.items[id]
    if !ok {
        return nil, errors.New("not found")
    }
    return item, nil
}

func GetItemName(repo ItemRepository, id int) string {
    item, err := repo.FindByID(id)
    if err != nil {
        return "不明"
    }
    return item.Name
}

func main() {
    // 本番
    real := &RealItemRepo{}
    fmt.Printf("本番: %s\\n", GetItemName(real, 1))

    // モック（正常系）
    mock := &MockItemRepo{
        items: map[int]*Item{1: {ID: 1, Name: "テスト商品"}},
    }
    fmt.Printf("モック(正常): %s\\n", GetItemName(mock, 1))

    // モック（エラー系）
    mockErr := &MockItemRepo{err: errors.New("DB接続エラー")}
    fmt.Printf("モック(エラー): %s\\n", GetItemName(mockErr, 1))
}`}
          expectedOutput={`本番: 本番データ
モック(正常): テスト商品
モック(エラー): 不明`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="design" lessonId="repository" />
      </div>
      <LessonNav lessons={lessons} currentId="repository" basePath="/learn/design" />
    </div>
  );
}
