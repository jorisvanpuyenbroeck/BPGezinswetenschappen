using BPGezinswetenschappen.API.Helpers;
using BPGezinswetenschappen.API.Services;
using BPGezinswetenschappen.DAL.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());

builder.Services.AddDbContext<BPContext>(options => options.UseSqlServer(connectionString));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

// configure jwt authentication
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.Authority = configuration["Authentication:Schemes:Bearer:Authority"];
        options.Audience = configuration["Authentication:Schemes:Bearer:ValidAudiences:0"];
    });



// add authorization

builder.Services.AddAuthorization();

// avoid circular references in json output while still keeping simple format unlike the solution provided by Koen

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


builder.Services.AddSwaggerService();


// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddCors();

///////////////////////////////////////////
// builder services added, now build the app
///////////////////////////////////////////

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
    builder.AllowAnyMethod()
           .AllowAnyHeader()
           .WithOrigins("http://localhost:4200", "https://localhost:4200");

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
