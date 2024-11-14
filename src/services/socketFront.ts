import { io, Socket } from "socket.io-client";
let socketOn: boolean = false;
let socket: Socket | null = null;


export const StartSocket = () => {

  if (!socketOn) {
    socket = io("http://localhost:3000");
    socket?.on("hello", () => {
      console.log("hello");
      socketOn = true;
    });
  }

  function StartAttack(missile: string, organization: string) {
    socket!.emit("StartAttack", { missile, organization });
    console.log(missile, organization);
  }
  return {
     StartAttack 
  };
};
