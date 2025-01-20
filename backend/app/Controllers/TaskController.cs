using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly AppDbContext _context;

    public TaskController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetTasks()
    {
        var username = User.Identity.Name;
        var user = _context.Users.FirstOrDefault(u => u.Username == username);

        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var tasks = _context.TaskItems.Where(t => t.UserId == user.Id).ToList();
        return Ok(tasks);
    }

    [HttpPost]
    public IActionResult CreateTask(TaskItem task)
    {
        var username = User.Identity.Name;
        var user = _context.Users.FirstOrDefault(u => u.Username == username);

        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        task.UserId = user.Id;
        _context.TaskItems.Add(task);
        _context.SaveChanges();

        return Ok("Task created successfully.");
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTask(int id, TaskItem updatedTask)
    {
        var task = _context.TaskItems.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return NotFound("Task not found.");
        }

        task.Title = updatedTask.Title;
        task.Description = updatedTask.Description;
        task.Priority = updatedTask.Priority;
        task.Status = updatedTask.Status;
        task.DueDate = updatedTask.DueDate;

        _context.SaveChanges();

        return Ok("Task updated successfully.");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = _context.TaskItems.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return NotFound("Task not found.");
        }

        _context.TaskItems.Remove(task);
        _context.SaveChanges();

        return Ok("Task deleted successfully.");
    }
}
