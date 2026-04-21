using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
  public async Task JoinChat(UserConnection conn)
  {
    await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
  }


  public async Task JoinSpecificChatRoom(UserConnection conn)
  {
    await Groups.AddToGroupAsync(Context.ConnectionId, conn.Chatroom);
    await Clients.Group(conn.Chatroom).SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined {conn.Chatroom}");
  }



}
