import {
  selectVisibleDifficultyModal,
  setVisibleDifficultyModal,
} from "@/entities/view";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { AnimatePresence, motion } from "motion/react";
import {
  IconClock,
  IconMessageFilled,
  IconTarget,
  IconTrophyFilled,
  IconX,
} from "@tabler/icons-react";
import { selectDifficulty } from "@/entities/settings";
import { DifficultyInfo } from "../model/constants";
import cn from "classnames";

export default function DifficultyInfoModal() {
  const dispatch = useAppDispatch();

  const difficulty = useAppSelector(selectDifficulty);
  const difficultyInfo = DifficultyInfo.find((el) => el.key === difficulty);

  const isVisible = useAppSelector(selectVisibleDifficultyModal);

  const handleCloseModal = () => {
    dispatch(setVisibleDifficultyModal(false));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div
                className={cn(
                  "p-4 sm:p-8 relative flex flex-col md:flex-row items-start md:items-center gap-4 ",
                  difficultyInfo?.color,
                )}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                >
                  <IconX color="white" />
                </button>

                <div className="flex items-start md:items-center gap-4 mb-0 w-full">
                  <div className="text-5xl md:text-6xl shrink-0">
                    {" "}
                    {difficultyInfo?.icon}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {difficultyInfo?.difficultyName}
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mt-2">
                      {difficultyInfo?.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Особенности уровня
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 bg-gray-50 p-2 sm:p-4 rounded-xl">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                          difficultyInfo?.color,
                        )}
                      >
                        <IconClock color="white" />
                      </div>
                      <p className="text-gray-700  ">
                        Разница между событиями: {difficultyInfo?.windowStart} -{" "}
                        {difficultyInfo?.windowEnd} лет
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 sm:p-4 rounded-xl">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                          difficultyInfo?.color,
                        )}
                      >
                        <IconTarget color="white" />
                      </div>
                      <p className="text-gray-700">
                        {difficultyInfo?.difficultyEventTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 sm:p-4 rounded-xl">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                          difficultyInfo?.color,
                        )}
                      >
                        <IconMessageFilled color="white" />
                      </div>
                      <p className="text-gray-700 ">
                        {difficultyInfo?.recommendationTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 p-2 sm:p-4 rounded-xl">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                          difficultyInfo?.color,
                        )}
                      >
                        <IconTrophyFilled color="white" />
                      </div>
                      <p className="text-gray-700 ">
                        Количество очков за ответ: {difficultyInfo?.scoreAdd}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Примеры пар событий
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-linear-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-gray-300">
                      <p className="text-gray-700 font-medium">
                        {difficultyInfo?.firstCoupleEvents}
                      </p>
                    </div>
                    <div className="bg-linear-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-l-4 border-gray-300">
                      <p className="text-gray-700 font-medium">
                        {difficultyInfo?.secondCoupleEvents}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className={cn(
                    "w-full mt-8  text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105",
                    difficultyInfo?.color,
                  )}
                >
                  Понятно
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
