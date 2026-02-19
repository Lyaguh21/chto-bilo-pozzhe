import { setCategory, setDifficulty, setGameMode } from "@/entities/settings";
import { startAppListening } from "../listenerMiddleware";
import { isAnyOf } from "@reduxjs/toolkit";

export function settingsListeners() {
  startAppListening({
    matcher: isAnyOf(setGameMode),
    effect: async (_action, listenerApi) => {
      localStorage.setItem(
        "gameMode",
        listenerApi.getState().settings.selectGameMode ?? "",
      );
    },
  });

  startAppListening({
    matcher: isAnyOf(setCategory),
    effect: async (_action, listenerApi) => {
      localStorage.setItem(
        "category",
        listenerApi.getState().settings.selectCategory ?? "",
      );
    },
  });

  startAppListening({
    matcher: isAnyOf(setDifficulty),
    effect: async (_action, listenerApi) => {
      localStorage.setItem(
        "difficulty",
        listenerApi.getState().settings.selectDifficulty ?? "",
      );
    },
  });
}
