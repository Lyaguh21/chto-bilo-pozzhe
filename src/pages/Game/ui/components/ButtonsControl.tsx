import { setRoundStatus } from "@/entities/game";
import {
  selectVisibleNextRoundButton,
  setVisibleNextRoundButton,
} from "@/entities/view";

import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { IconChevronRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

export default function ButtonsControl() {
  const dispatch = useAppDispatch();

  const visibleNextButton = useAppSelector(selectVisibleNextRoundButton);

  return (
    <>
      <AnimatePresence>
        {visibleNextButton && (
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.6 }}
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3"
          >
            {/* //* Кнопка далее */}

            <Button
              text={"Далее"}
              iconRight={<IconChevronRight size={32} />}
              onClick={() => {
                //* Запускает анимацию, она в свою очередь диспачит начало следующего раунда
                dispatch(setRoundStatus("animating"));
                dispatch(setVisibleNextRoundButton(false));
              }}
              disabled={!visibleNextButton}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
