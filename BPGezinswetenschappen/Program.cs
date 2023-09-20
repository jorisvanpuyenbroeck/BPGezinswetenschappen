using BPGezinswetenschappen.API.Helpers;
using BPGezinswetenschappen.API.Services;
using BPGezinswetenschappen.DAL.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

builder.Services.AddDbContext<BPContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddControllers();

// avoid circular references in json output while still keeping simple format unlike the solution provided by Koen

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
{new OpenApiSecurityScheme {Reference = new OpenApiReference {Type = ReferenceType.SecurityScheme, Id = "Bearer" } }, new string[] {}}
});
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BPGezinswetenschappen.API", Version = "v1" });
});

var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

// configure jwt authentication
var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    // app.AddEfDiagrams<BPContext>();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var myContext = scope.ServiceProvider.GetRequiredService<BPContext>();
    DBInitializer.Initialize(myContext);
}


app.Run();
