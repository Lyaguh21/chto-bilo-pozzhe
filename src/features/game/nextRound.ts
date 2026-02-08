import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  allHistoryEvents,
  delNotUsedId,
  pushUsedId,
  setFirstEvent,
} from "@/entities/game";
import { pickNextEvent } from "./pickNextEvent";
import { setVisibleGameCompletedModal } from "@/entities/view";

export const nextRound = createAsyncThunk<void, void, { state: RootState }>(
  "game/nextRound",
  async (_, { getState, dispatch }) => {
    const state = getState();

    //todo Добавить проверку на категорию событий
    const historyEvents = allHistoryEvents;
    const notUsedIds = state.game.notUsedIds;

    //* создаем новое событие из тех которых еще не было
    const first =
      historyEvents[notUsedIds[Math.floor(Math.random() * notUsedIds.length)]];

    if (!first || !state.game.notUsedIds) {
      dispatch(setVisibleGameCompletedModal(true));
      return undefined;
    }

    dispatch(setFirstEvent(first));
    dispatch(pushUsedId(first.id));
    dispatch(delNotUsedId(first.id));

    await dispatch(pickNextEvent({ firstEventId: first.id }));
  },
);
