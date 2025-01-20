using System;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Priority { get; set; } // e.g., "High", "Medium", "Low"
    public DateTime DueDate { get; set; }
    public string Status { get; set; } // e.g., "Completed", "InProgress", "Pending"
    public int UserId { get; set; }
    public User User { get; set; }
}
