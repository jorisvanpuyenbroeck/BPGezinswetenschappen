using BPGezinswetenschappen.API.Helpers;
using BPGezinswetenschappen.API.Services;
using BPGezinswetenschappen.DAL.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Text.Json.Serialization;


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

// this next bit was adapted from the documentation in angular full stack security
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

builder.Services.AddAuthorization(options =>
{
    //We create different policies where each policy contains the permissions required to fulfill them
    // Policies for Topics
    options.AddPolicy("GetAllTopics", policy => policy.RequireClaim("permissions", "getall:topics"));
    options.AddPolicy("GetTopic", policy => policy.RequireClaim("permissions", "get:topic"));
    options.AddPolicy("UpdateTopic", policy => policy.RequireClaim("permissions", "update:topic"));
    options.AddPolicy("CreateTopic", policy => policy.RequireClaim("permissions", "create:topic"));
    options.AddPolicy("DeleteTopic", policy => policy.RequireClaim("permissions", "delete:topic"));

    // Policies for Proposals
    options.AddPolicy("GetAllProposals", policy => policy.RequireClaim("permissions", "getall:proposals"));
    options.AddPolicy("GetProposal", policy => policy.RequireClaim("permissions", "get:proposal"));
    options.AddPolicy("UpdateProposal", policy => policy.RequireClaim("permissions", "update:proposal"));
    options.AddPolicy("CreateProposal", policy => policy.RequireClaim("permissions", "create:proposal"));
    options.AddPolicy("DeleteProposal", policy => policy.RequireClaim("permissions", "delete:proposal"));

    // Policies for Organisations
    options.AddPolicy("GetAllOrganisations", policy => policy.RequireClaim("permissions", "getall:organisations"));
    options.AddPolicy("GetOrganisation", policy => policy.RequireClaim("permissions", "get:organisation"));
    options.AddPolicy("UpdateOrganisation", policy => policy.RequireClaim("permissions", "update:organisation"));
    options.AddPolicy("CreateOrganisation", policy => policy.RequireClaim("permissions", "create:organisation"));
    options.AddPolicy("DeleteOrganisation", policy => policy.RequireClaim("permissions", "delete:organisation"));

    // Policies for Projects
    options.AddPolicy("GetAllProjects", policy => policy.RequireClaim("permissions", "getall:projects"));
    options.AddPolicy("GetProject", policy => policy.RequireClaim("permissions", "get:project"));
    options.AddPolicy("UpdateProject", policy => policy.RequireClaim("permissions", "update:project"));
    options.AddPolicy("CreateProject", policy => policy.RequireClaim("permissions", "create:project"));
    options.AddPolicy("DeleteProject", policy => policy.RequireClaim("permissions", "delete:project"));

    // Policies for Users
    options.AddPolicy("GetAllUsers", policy => policy.RequireClaim("permissions", "getall:users"));
    options.AddPolicy("GetUser", policy => policy.RequireClaim("permissions", "get:user"));
    options.AddPolicy("UpdateUser", policy => policy.RequireClaim("permissions", "update:user"));
    options.AddPolicy("CreateUser", policy => policy.RequireClaim("permissions", "create:user"));
    options.AddPolicy("DeleteUser", policy => policy.RequireClaim("permissions", "delete:user"));

});

// avoid circular references in json output while still keeping simple format unlike the solution provided by Koen

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


builder.Services.AddSwaggerService();


// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();

//Cors

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

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

app.UseCors("AllowSpecificOrigin");


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
