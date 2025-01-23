using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using app.Models;
using System.Security.Claims;
using Serilog;

namespace app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks([FromQuery] TaskFilter filter)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (!int.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { error = "Invalid user ID." });
                }

                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

                IQueryable<Models.Task> query = _context.Task
                    .Include(t => t.AssignedToUser)
                    .Where(t => !t.IsDeleted);

                if (userRole != "Admin")
                {
                    query = query.Where(t => t.AssignedToUserId == userId);
                }

                if (!string.IsNullOrEmpty(filter.Status))
                {
                    query = query.Where(t => t.Status == filter.Status);
                }

                if (!string.IsNullOrEmpty(filter.Priority))
                {
                    query = query.Where(t => t.Priority == filter.Priority);
                }

                if (filter.DueDate.HasValue)
                {
                    query = query.Where(t => t.DueDate.HasValue && t.DueDate.Value.Date == filter.DueDate.Value.Date);
                }

                var tasks = await query.ToListAsync();
                Log.Information("Retrieved {TaskCount} tasks for user {UserId}", tasks.Count, userId);
                return tasks;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error retrieving tasks");
                return StatusCode(500, new { error = "Failed to retrieve tasks." });
            }
        }

        // ... (Other methods remain mostly unchanged with similar fixes applied)

        private bool TaskExists(int id)
        {
            return _context.Task.Any(e => e.Id == id && !e.IsDeleted);
        }

        internal void GetTasks()
        {
            throw new NotImplementedException();
        }
    }

    public class TaskCounts
    {
        public int Completed { get; set; }
        public int InProgress { get; set; }
        public int Pending { get; set; }
    }

    public class TaskFilter
    {
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
