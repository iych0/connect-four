import { create } from 'zustand';
import type {IMultiplayerStore, WsMessage} from "../types.ts";
import {useGameStore} from "./gameStore.ts";

let socket: WebSocket | null = null;

export const useMultiplayerStore = create<IMultiplayerStore>((set, get) => ({
    serverUrl: 'wss://iycho.online/ws/',
    roomId: null,
    isConnected: false,
    isClientTurn: false,
    isOpponentConnected: false,

    connect(roomId: string, isHost: boolean) {
        if (socket && get().roomId === roomId) return;

        // разрыв старого соединения, если disconnect() не отработал штатно
        if (socket) socket.close();

        const ws = new WebSocket(get().serverUrl)
        socket = ws;

        ws.onopen = () => {
            console.log('Connected to ' + get().serverUrl);
            set(() => ({
                isConnected: true,
                isClientTurn: isHost,
                roomId: roomId,
            }))
            ws.send(JSON.stringify({type: "JOIN_ROOM", payload: { roomId: roomId }}))
        }

        ws.onclose = () => {
            console.log('Connection closed (onclose event)');
            set(() => ({
                isConnected: false,
                roomId: null,
            }))
            socket = null;
        }

        ws.onmessage = (ev) => {
            const msg: WsMessage = JSON.parse(ev.data);

            switch (msg.type) {
                case "PLAYER_JOINED": {
                    console.log('Opponent joined room');
                    set(() => ({
                        isOpponentConnected: true,
                    }))
                    break;
                }

                case "OPPONENT_MOVE": {
                    // todo: deal with either bug or desync (i don't think it's possible, but nobody guarantees that)
                    if (!msg.payload.columnIndex) {
                        console.log("unexpected payload on OPPONENT_MOVE");
                        return;
                    }
                    console.log('Processing opponent move');
                    useGameStore.getState().handlePlayerAction(msg.payload.columnIndex)
                    set(() => ({
                        isClientTurn: true,
                    }))
                    break;
                }

                case "PLAYER_LEFT": {
                    console.log("Player left");
                    break;
                }
            }
        }
    },

    disconnect() {
        const wasConnectionActive = !!socket;
        if (socket) socket.close();
        socket = null;
        set(() => ({
            isConnected: false,
            roomId: null,
            isClientTurn: false,
        }))
        console.log(`Disconnected manually. ${wasConnectionActive? "Connection was establised" : "Connection was not established"}`);
    },

    makeMove(columnIndex: number) {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;

        set(() => ({
          isClientTurn: false,
        }))

        socket.send(JSON.stringify({
            type: "MAKE_MOVE",
            payload: { columnIndex: columnIndex },
        }))
    },

}))