import { LessonNav } from "@/components/lesson-nav";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { CSharpEditor } from "@/components/csharp-editor";
import { getAllLessons } from "@/lib/lessons-data";

const lessons = getAllLessons("webapi");

export default function SwaggerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-cyan-400 text-sm font-semibold">Web API レッスン8</span>
        <h1 className="text-3xl font-extrabold text-white mb-2">Swagger</h1>
        <p className="text-gray-400">AddSwaggerGen・UseSwagger・XMLコメント・SwashbuckleによるAPI仕様書自動生成を学びます。</p>
      </div>

      <section className="mb-10 p-6 rounded-xl bg-gray-900 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-3">Swagger / OpenAPI とは</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          SwaggerはOpenAPI仕様に基づくAPI文書生成ツールです。
          <strong className="text-white">Swashbuckle.AspNetCore</strong> パッケージで自動生成できます。
          <code className="text-cyan-400 bg-gray-800 px-1.5 py-0.5 rounded">/swagger</code> にブラウザでアクセスするとインタラクティブなAPIドキュメントが表示されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Swagger のセットアップ</h2>
        <p className="text-gray-400 mb-4">
          Program.csでのSwagger設定です。
        </p>
        <CSharpEditor
          defaultCode={`using System;

Console.WriteLine("=== Swagger 設定（Program.cs）===");
Console.WriteLine();
Console.WriteLine(@"// NuGetパッケージ: Swashbuckle.AspNetCore

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(""v1"", new OpenApiInfo
    {
        Title = ""My API"",
        Version = ""v1"",
        Description = ""C# Web API のサンプル"",
    });

    // XMLコメントを有効化
    var xmlFile = $""{Assembly.GetExecutingAssembly().GetName().Name}.xml"";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

    // JWT認証をSwaggerに追加
    c.AddSecurityDefinition(""Bearer"", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = ""bearer"",
    });
});

// 開発環境でのみSwaggerを有効化
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint(""/swagger/v1/swagger.json"", ""My API v1"");
    });
}");`}
          expectedOutput={`=== Swagger 設定（Program.cs）===

// NuGetパッケージ: Swashbuckle.AspNetCore

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "C# Web API のサンプル",
    });

    // XMLコメントを有効化
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

    // JWT認証をSwaggerに追加
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
    });
});

// 開発環境でのみSwaggerを有効化
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
    });
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-3">XMLドキュメントコメント</h2>
        <p className="text-gray-400 mb-4">
          コントローラーにXMLコメントを書くと、Swaggerドキュメントに説明が追加されます。
        </p>
        <CSharpEditor
          defaultCode={`using System;

// XMLコメントをSwaggerに反映させる例
Console.WriteLine("XMLコメントでSwaggerドキュメントを充実させる:");
Console.WriteLine();
Console.WriteLine(@"/// <summary>
/// 指定したIDの商品を取得します
/// </summary>
/// <param name=""id"">商品ID（1以上の整数）</param>
/// <returns>商品情報</returns>
/// <response code=""200"">商品が見つかりました</response>
/// <response code=""404"">商品が見つかりません</response>
[HttpGet(""{id:int}"")]
[ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetById(int id)
{
    var product = await _service.GetByIdAsync(id);
    return product == null ? NotFound() : Ok(product);
}");

Console.WriteLine();
Console.WriteLine("上記のコメントはSwagger UIで:");
Console.WriteLine("  - エンドポイントの説明として表示");
Console.WriteLine("  - パラメーターの説明として表示");
Console.WriteLine("  - レスポンスコードの説明として表示");`}
          expectedOutput={`XMLコメントでSwaggerドキュメントを充実させる:

/// <summary>
/// 指定したIDの商品を取得します
/// </summary>
/// <param name="id">商品ID（1以上の整数）</param>
/// <returns>商品情報</returns>
/// <response code="200">商品が見つかりました</response>
/// <response code="404">商品が見つかりません</response>
[HttpGet("{id:int}")]
[ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetById(int id)
{
    var product = await _service.GetByIdAsync(id);
    return product == null ? NotFound() : Ok(product);
}

上記のコメントはSwagger UIで:
  - エンドポイントの説明として表示
  - パラメーターの説明として表示
  - レスポンスコードの説明として表示`}
        />
      </section>

      <div className="mb-8">
        <LessonCompleteButton categoryId="webapi" lessonId="swagger" />
      </div>
      <LessonNav lessons={lessons} currentId="swagger" basePath="/learn/webapi" />
    </div>
  );
}
