import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("database");

export default function DatabaseRepositoryPatternPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-teal-400 text-sm font-semibold">データベース レッスン5</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Repositoryパターン</h1>
        <p className="text-gray-400">IRepository&lt;T&gt;、ジェネリックリポジトリ、Unit of Workパターンを学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Repositoryパターンとは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Repositoryパターンはデータアクセスロジックをビジネスロジックから分離するデザインパターンです。
          インターフェースを通じてデータ操作を抽象化することで、テスト時にモックと差し替えられます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">ジェネリックリポジトリ</h2>
        <p className="text-gray-400 mb-4">汎用的なCRUDインターフェースを定義します。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.EntityFrameworkCore;

// ジェネリックリポジトリインターフェース
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    void Update(T entity);
    void Remove(T entity);
    Task<int> SaveChangesAsync();
}

// EF Core を使ったジェネリックリポジトリ実装
public class Repository<T> : IRepository<T> where T : class
{
    protected readonly DbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(DbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(int id)
        => await _dbSet.FindAsync(id);

    public async Task<IEnumerable<T>> GetAllAsync()
        => await _dbSet.ToListAsync();

    public async Task AddAsync(T entity)
        => await _dbSet.AddAsync(entity);

    public void Update(T entity)
        => _dbSet.Update(entity);

    public void Remove(T entity)
        => _dbSet.Remove(entity);

    public async Task<int> SaveChangesAsync()
        => await _context.SaveChangesAsync();
}

Console.WriteLine("IRepository<T> の利点:");
Console.WriteLine("- DB実装への依存をなくせる");
Console.WriteLine("- テスト時にモックと差し替え可能");
Console.WriteLine("- ビジネスロジックが読みやすくなる");`}
          expectedOutput={`IRepository<T> の利点:
- DB実装への依存をなくせる
- テスト時にモックと差し替え可能
- ビジネスロジックが読みやすくなる`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">エンティティ専用リポジトリとUnit of Work</h2>
        <p className="text-gray-400 mb-4">エンティティ固有の操作を追加し、Unit of Workで複数リポジトリを調整します。</p>
        <CSharpEditor
          defaultCode={`// エンティティ専用リポジトリ（ジェネリックを継承）
public interface IProductRepository : IRepository<Product>
{
    Task<IEnumerable<Product>> GetByCategoryAsync(int categoryId);
    Task<IEnumerable<Product>> GetByPriceRangeAsync(decimal min, decimal max);
}

// Unit of Work パターン
public interface IUnitOfWork : IDisposable
{
    IProductRepository Products { get; }
    IOrderRepository Orders { get; }
    Task<int> CommitAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    public IProductRepository Products { get; }
    public IOrderRepository Orders { get; }

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Products = new ProductRepository(context);
        Orders = new OrderRepository(context);
    }

    public async Task<int> CommitAsync()
        => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();
}

// サービス層での使用例
Console.WriteLine("Unit of Work の使用例:");
Console.WriteLine("using var uow = new UnitOfWork(context);");
Console.WriteLine("await uow.Products.AddAsync(product);");
Console.WriteLine("await uow.Orders.AddAsync(order);");
Console.WriteLine("await uow.CommitAsync(); // 一括保存");`}
          expectedOutput={`Unit of Work の使用例:
using var uow = new UnitOfWork(context);
await uow.Products.AddAsync(product);
await uow.Orders.AddAsync(order);
await uow.CommitAsync(); // 一括保存`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="database" lessonId="repository-pattern" />
      </div>
      <LessonNav lessons={lessons} currentId="repository-pattern" basePath="/learn/database" />
    </div>
  );
}
