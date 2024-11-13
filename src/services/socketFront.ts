import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

type CallbackResponse = { status: string };
type Message = string | Record<string, any>;

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>('');
  const [id, setID] = useState<string>(''); 

  useEffect(() => {
    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected:', socketInstance.id);
      setConnected(true);
    });

    socketInstance.on('disconnect', (reason: string) => {
      console.log('Disconnected:', reason);
      setConnected(false);
    });

    socketInstance.on('room-message', (message: Message) => {
      console.log('Room message received:', message);
      setMessages((prev) => [...prev, message]);
    });

    socketInstance.on('heartbeat', (data: { time: string }) => {
      console.log('Heartbeat received:', data);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  function joinRoom(room: string) {
    if (socket) {
      socket.emit('join', room);
      setRoom(room);  // Update the current room state
      console.log(`Joining room: ${room}`);
    }
  }

  function leaveRoom(room: string) {
    if (socket) {
      socket.emit('leave', room);
      setRoom('');  // Reset room state when leaving
      console.log(`Leaving room: ${room}`);
    }
  }

  function sendMessageToRoom(id: string, message: Message) {
    if (socket && room) {
      socket.emit('change-status', room, id, message);
      console.log(`Sending message to room ${room}:`, message);
    }
  }

  function broadcastMessage(message: Message) {
    if (socket) {
      socket.emit('broadcast', message);  // Emit broadcast message to all clients except sender
      console.log(`Broadcasting message:`, message);
      setMessages((prev) => [...prev, "Me Broadcasting: "+message]); // When broadcast everyone recieves it but the one who sent it don't
    }
  }

  function sendRequest(data: Message, callback: (response: CallbackResponse) => void) {
    if (socket) {
      socket.emit('request', data, (response: CallbackResponse) => {
        console.log('Request response:', response);
        callback(response);
      });
    }
  }

  return {
    connected,
    messages,
    room,
    joinRoom,
    leaveRoom,
    sendMessageToRoom,
    broadcastMessage,
    sendRequest,
  };
}