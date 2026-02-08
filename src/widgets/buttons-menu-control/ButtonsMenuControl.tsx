import {
  selectGameScore,
  selectGameStreak,
  setTopScore,
  setTopStreak,
  addCountGame,
  resetGame,
} from "@/entities/game";
import { startGame } from "@/features/game";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { IconHomeFilled, IconReload } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function ButtonMenuControl() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const score = useAppSelector(selectGameScore);
  const streak = useAppSelector(selectGameStreak);

  const handleRestartGame = () => {
    dispatch(setTopScore(score));
    dispatch(setTopStreak(streak));
    dispatch(addCountGame());
    dispatch(resetGame());
    dispatch(startGame());
  };

  const handleMenuNavigate = () => {
    dispatch(setTopScore(score));
    dispatch(setTopStreak(streak));
    navigation("/");
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleRestartGame}
        className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white px-4 sm:px-6 py-4 rounded-2xl font-bold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <IconReload />
        Повторить
      </button>
      <button
        onClick={handleMenuNavigate}
        className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
      >
        <IconHomeFilled color="#374151" />В меню
      </button>
    </div>
  );
}
