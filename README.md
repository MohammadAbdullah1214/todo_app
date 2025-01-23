git clone -b main https://github.com/MohammadAbdullah1214/todo_app.git
cd todo_app


# **For Backend**


1. Update the ConnectionString in appsettings.json

```csharp
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=Your_Server_Name;Database=TodoAppDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;"
  },
  ...
}

2. In the terminal run,
```csharp
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run


# **For frontend**
1) Replace the baseURL in api.ts file in the src/services folder to the localhost the backend is running. 
   
2) In the terminal run,
npm install
npm start
