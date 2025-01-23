using Microsoft.EntityFrameworkCore;

namespace app.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public  DbSet<User> User { get; set; }
        public  DbSet<Task> Task { get; set; }
    }
}