import { create } from 'zustand';
import {type Dot, type IColumnStore} from '../types';

// фабрика сторов
export const createColumnStore = (initialItems: Dot[], columnIndex: number) =>
    create<IColumnStore>((set, get) => ({
        items: initialItems,
        isHovered: false,
        nextFreeIndex: 5,

        setHovered: (hovered: boolean) => set({ isHovered: hovered }),

        handleClick: (
            globalField,
            players,
            currentPlayerIndex,
            updateGlobalField,
            changePlayer,
            updatePlayer,
            updateState
        ) => {
            const { items, nextFreeIndex } = get();
            if (nextFreeIndex < 0) return;

            const player = players[currentPlayerIndex];
            const dotId = items[nextFreeIndex].id;

            // Обновляем глобальное поле
            const newGlobalField = updateFieldAtIndex(globalField, dotId, {
                ownerId: player.id,
                color: player.color,
            });

            updateGlobalField(newGlobalField);

            // Проверка победы
            const lastDot = newGlobalField[dotId];
            const newGameState = validate(newGlobalField, lastDot);

            if (newGameState !== "IN_PROGRESS") {
                const winnerId = newGameState === "FIRST_PLAYER_WIN" ? 0 : 1;
                updatePlayer(winnerId, { winsCount: players[winnerId].winsCount + 1 });
                updateState(newGameState);
                return;
            }

            changePlayer();
            // Локально обновляем nextFreeIndex
            set({ nextFreeIndex: nextFreeIndex - 1 });
        },
    }));