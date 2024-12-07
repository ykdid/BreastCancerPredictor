using BreastCancerAPI.Entities;

namespace BreastCancerAPI.Repositories.Database;
using Microsoft.EntityFrameworkCore;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; } 
    public DbSet<PredictionResult> PredictionRequests { get; set; } 
        
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>()
            .ToTable("User", schema: "Users");
            
        modelBuilder.Entity<PredictionResult>()
            .ToTable("PredictResult", schema: "PredictResults");
        
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<PredictionResult>()
            .HasKey(p => p.Id);
        
       
    }
}
    