import { create } from 'zustand';
import type {IMultiplayerStore, WsMessage} from "../types.ts";
import {useGameStore} from "./gameStore.ts";

let socket: WebSocket | null = null;

export const useMultiplayerStore = create<IMultiplayerStore>((set, get) => ({
    serverUrl: 'wss://iycho.online/ws/',

    roomId: null,

    isPaused: false,
    isConnected: false,
    isClientTurn: false,
    isOpponentConnected: false,
    isRestartRequested: false,

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
                isOpponentConnected: !isHost,
            }))

            // очистка поля
            useGameStore.getState().restartGame();
            ws.send(JSON.stringify({type: "JOIN_ROOM", payload: { roomId: roomId }}))
        }

        ws.onclose = (ev) => {
            console.error('WebSocket disconnected:', {
                code: ev.code,
                reason: ev.reason,
                wasClean: ev.wasClean,
                timestamp: new Date().toLocaleTimeString()
            });
            set(() => ({
                isConnected: false,
                isOpponentConnected: false,
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
                    if (typeof msg.payload.columnIndex != "number") {
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
                    console.log("Opponent left");
                    set(() => ({
                        isOpponentConnected: false,
                    }))
                    break;
                }

                case "RESTART_REQUESTED": {
                    console.log("Opponent requested restart")
                    set(() => ({
                        isPaused: true,
                        isRestartRequested: true,
                    }))
                    break
                }

                case "RESTART_ACCEPTED": {
                    console.log("Opponent accepted our restart request")
                    set(() => ({
                        isPaused: false,
                    }))
                    useGameStore.getState().restartGame();
                    break;
                }

                case "RESTART_DENIED": {
                    console.log("Opponent rejected our restart request")
                    set(() => ({
                        isPaused: false,
                    }))
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
        // соединение живет?
        if (!socket || socket.readyState !== WebSocket.OPEN) return;

        const isOpponentConnected = get().isOpponentConnected;
        const isClientTurn = get().isClientTurn;
        // ход клиента?
        if (!isClientTurn) {
            console.log("Not our turn bud")
            return;
        }

        // оппонент подключен к игре?
        if (!isOpponentConnected) {
            console.log("Opponent isn't connected yet")
            return;
        }

        // ход переходит оппоненту
        set(() => ({
          isClientTurn: false,
        }))

        // вызов обработчика ходов для локальной игры
        useGameStore.getState().handlePlayerAction(columnIndex);

        // отправка сообщения
        socket.send(JSON.stringify({
            type: "MAKE_MOVE",
            payload: { columnIndex: columnIndex },
        }))
    },

    requestRestart() {
        // соединение живет?
        if (!socket || socket.readyState !== WebSocket.OPEN) return;

        // ставим игру на паузу
        set(() => ({
            isPaused: true,
        }))

        socket.send(JSON.stringify({
            type: "REQUEST_RESTART"
        }))
    },

    answerOnRestartRequest(isAccepted: boolean) {
        // соединение живет?
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        const answerType = isAccepted ? "ACCEPT_RESTART_REQUEST" : "REJECT_RESTART_REQUEST";

        set(() => ({
            isPaused: false,
            isRestartRequested: false,
        }))

        socket.send(JSON.stringify({
            type: answerType,
        }))
    }

}))