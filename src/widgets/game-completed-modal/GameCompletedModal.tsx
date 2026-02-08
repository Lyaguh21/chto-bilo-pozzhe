import {
  selectGameScore,
  selectGameStreak,
  selectGameTopScore,
} from "@/entities/game";
import { selectVisibleGameCompletedModal } from "@/entities/view";

import { useAppSelector } from "@/shared/lib";
import {
  IconFlameFilled,
  IconLaurelWreathFilled,
  IconStarFilled,
  IconTrophyFilled,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

import { ButtonMenuControl } from "../buttons-menu-control";

export default function GameCompletedModal() {
  const isVisible = useAppSelector(selectVisibleGameCompletedModal);

  const topScore = useAppSelector(selectGameTopScore);
  const score = useAppSelector(selectGameScore);
  const streak = useAppSelector(selectGameStreak);
  const isNewRecord = Boolean(score > topScore);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.2 } }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 modal-overlay flex items-center justify-center z-50 bg-black/50 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 1.2 } }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.3 }}
            className="modal-content bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            <div className="bg-linear-to-r from-green-500 to-emerald-500 px-8 py-6 text-center">
              <IconLaurelWreathFilled
                color="white"
                size={64}
                className="mx-auto"
              />
              <h2 className="text-white text-3xl font-bold">Успешно</h2>
            </div>

            <p className="text-gray-600 text-md font-bold text-center">
              Событий больше не осталось, попробуйте новую сложность!
            </p>

            <div className="p-2 sm:p-8 text-center">
              {isNewRecord && (
                <div
                  id="new-record-badge"
                  className="record-badge bg-linear-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 mb-6"
                >
                  <IconTrophyFilled color="white" size={32} />
                  <span className="text-lg font-bold">НОВЫЙ РЕКОРД!</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
                  <IconStarFilled
                    color="#6366F1"
                    className="mx-auto"
                    size={32}
                  />
                  <div className="text-gray-600 text-sm font-medium mb-1">
                    Ваш счёт
                  </div>
                  <div
                    className="text-indigo-600 text-4xl font-bold"
                    id="final-score"
                  >
                    {score}
                  </div>
                  <div className="text-gray-500 text-xs">очков</div>
                </div>

                <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center">
                  <IconFlameFilled
                    color="#F97316"
                    className="mx-auto"
                    size={32}
                  />
                  <div className="text-gray-600 text-sm font-medium mb-1">
                    Ваша серия
                  </div>
                  <div
                    className="text-orange-600 text-4xl font-bold"
                    id="final-streak"
                  >
                    {streak}
                  </div>
                  <div className="text-gray-500 text-xs">подряд</div>
                </div>
              </div>

              <ButtonMenuControl />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
