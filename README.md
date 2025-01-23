Clone the repository
```git
git clone -b main https://github.com/MohammadAbdullah1214/todo_app.git
cd todo_app
```


# **For Backend**
1. Open the solution file and update the ConnectionStrings in appsettings.json

```csharp
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=Your_Server_Name;Database=TodoAppDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;"
  },
  ...
}
```

2. In the terminal run,
```csharp
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```


# **For frontend**
1) Replace the baseURL in api.ts file in the src/services folder to the localhost the backend is running.
```npm
const api = axios.create({
    baseURL: 'your_backend_api_url',
});
```
   
2) In the terminal run,
```npm
npm install
npm start
```
