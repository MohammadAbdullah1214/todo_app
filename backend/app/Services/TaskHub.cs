using Microsoft.AspNetCore.SignalR;

namespace app.Services
{
    public class TaskHub : Hub
    {
        public async Task UpdateTaskStatus(int taskId, string newStatus)
        {
            await Clients.All.SendAsync("TaskUpdated", taskId, newStatus);
        }
    }
}