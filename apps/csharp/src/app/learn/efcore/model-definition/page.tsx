import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("efcore");

export default function EfcoreModelDefinitionPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-green-400 text-sm font-semibold">EF Core レッスン3</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">モデル定義</h1>
        <p className="text-gray-400">エンティティクラス、Fluent API、Data Annotations、リレーションシップの設定を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">モデル定義の2つの方法</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          EF Coreでモデルを設定する方法は2つあります。<strong className="text-white">Data Annotations</strong>はエンティティクラスに属性を付ける方法で、シンプルな設定に向いています。
          <strong className="text-white">Fluent API</strong>はDbContextのOnModelCreatingメソッドで設定する方法で、より詳細な制御が可能です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Data Annotationsによる設定</h2>
        <p className="text-gray-400 mb-4">属性をクラスやプロパティに付けてスキーマを定義します。</p>
        <CSharpEditor
          defaultCode={`using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("products")]
public class Product
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    [Column("product_name")]
    public string Name { get; set; } = "";

    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }

    // 外部キー
    public int CategoryId { get; set; }
}

Console.WriteLine("Data Annotations の主要属性:");
Console.WriteLine("[Key]            - 主キー");
Console.WriteLine("[Required]       - NOT NULL制約");
Console.WriteLine("[MaxLength(n)]   - 最大文字数");
Console.WriteLine("[Column(...)]    - 列名・型の指定");
Console.WriteLine("[Table(...)]     - テーブル名の指定");
Console.WriteLine("[ForeignKey]     - 外部キーの指定");`}
          expectedOutput={`Data Annotations の主要属性:
[Key]            - 主キー
[Required]       - NOT NULL制約
[MaxLength(n)]   - 最大文字数
[Column(...)]    - 列名・型の指定
[Table(...)]     - テーブル名の指定
[ForeignKey]     - 外部キーの指定`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Fluent APIによる設定</h2>
        <p className="text-gray-400 mb-4">OnModelCreatingメソッドでより柔軟に設定できます。</p>
        <CSharpEditor
          defaultCode={`using Microsoft.EntityFrameworkCore;

// エンティティクラス（属性なし）
public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = "";
    public decimal TotalAmount { get; set; }
    public DateTime OrderDate { get; set; }
}

// DbContext でのFluent API設定
public class ShopContext : DbContext
{
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("orders");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CustomerName)
                  .IsRequired()
                  .HasMaxLength(100)
                  .HasColumnName("customer_name");
            entity.Property(e => e.TotalAmount)
                  .HasColumnType("decimal(10,2)");
            entity.Property(e => e.OrderDate)
                  .HasDefaultValueSql("GETDATE()");
        });
    }
}

Console.WriteLine("Fluent API の利点:");
Console.WriteLine("- エンティティクラスをクリーンに保てる");
Console.WriteLine("- 複雑な設定も対応可能");
Console.WriteLine("- Data Annotationsより優先される");`}
          expectedOutput={`Fluent API の利点:
- エンティティクラスをクリーンに保てる
- 複雑な設定も対応可能
- Data Annotationsより優先される`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="efcore" lessonId="model-definition" />
      </div>
      <LessonNav lessons={lessons} currentId="model-definition" basePath="/learn/efcore" />
    </div>
  );
}
