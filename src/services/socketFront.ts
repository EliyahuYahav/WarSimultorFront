import { useState } from "react";
import { io, Socket } from "socket.io-client";
let socketOn: boolean = false;
let socket: Socket | null = null;


export const StartSocket = () => {
  const [amountFromServer, setAmountFromServer] = useState<number>()

  if (!socketOn) {
    socket = io("http://localhost:3000");
    socket?.on("hello", () => {
      console.log("hello");
      socketOn = true;
    });
  }

  function StartAttack(missile: string, organization: string) {
    socket!.emit("StartAttack", { missile, organization });
    socket!.on("amount-left", async (amount)=>{
      setAmountFromServer(amount)
    })

  }
  console.log(amountFromServer)
  return {
     StartAttack ,
     amountFromServer
  };
};
