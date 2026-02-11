import GameEventCard from "@/widgets/game-events-card/ui/GameEventCard";
import {
  addOneToStreak,
  selectGameFirstEvent,
  selectGameRoundStatus,
  selectGameSecondEvent,
  setRoundStatus,
  type IGameEvent,
} from "@/entities/game";

import { useAppSelector, useAppDispatch } from "@/shared/lib";
import { useEffect, useRef } from "react";

import CorrectIndicator from "./CorrectIndicator";
import {
  setVisibleGameOverModal,
  setVisibleNextRoundButton,
} from "@/entities/view";

import cn from "classnames";
import { CalculatedAddScore, nextRound } from "@/features/game";

export default function GameEventCardSection() {
  const roundStatus = useAppSelector(selectGameRoundStatus);
  const firstEvent = useAppSelector(selectGameFirstEvent);
  const secondEvent = useAppSelector(selectGameSecondEvent);

  const dispatch = useAppDispatch();

  const outTimerRef = useRef<number | null>(null);

  const isAnimatingOut = roundStatus === "animating";

  useEffect(() => {
    if (!isAnimatingOut) return;

    outTimerRef.current = window.setTimeout(() => {
      // после exit-анимации
      dispatch(nextRound());
      dispatch(setRoundStatus("idle"));
      outTimerRef.current = null;
    }, 800);

    return () => {
      if (outTimerRef.current) {
        clearTimeout(outTimerRef.current);
        outTimerRef.current = null;
      }
    };
  }, [isAnimatingOut, dispatch]);

  const handleSelectEvent = (
    selectEvent: IGameEvent,
    notSelectEvent: IGameEvent,
  ) => {
    if (roundStatus !== "idle") return;

    if (
      Number(selectEvent.date.slice(0, 4)) >
      Number(notSelectEvent.date.slice(0, 4))
    ) {
      dispatch(setRoundStatus("succeeded"));
      dispatch(CalculatedAddScore());
      dispatch(addOneToStreak());
      dispatch(setVisibleNextRoundButton(true));
    } else {
      dispatch(setRoundStatus("failed"));
      dispatch(setVisibleGameOverModal(true));
    }
  };

  return (
    <>
      {firstEvent && secondEvent && (
        <div
          className={cn(
            "grid grid-cols-6 gap-2 sm:grid-cols-7 w-full items-center justify-items-center",
          )}
        >
          <GameEventCard
            initial={{ x: -200, opacity: 0 }}
            animate={
              isAnimatingOut
                ? {
                    x: -500,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }
                : {
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }
            }
            event={firstEvent}
            firstEvent
            onClick={() => handleSelectEvent(firstEvent, secondEvent)}
          />

          <CorrectIndicator />

          <GameEventCard
            initial={{ x: 200, opacity: 0 }}
            animate={
              isAnimatingOut
                ? {
                    x: 500,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }
                : {
                    x: 0,
                    opacity: 1,
                    transition: { duration: 0.5, ease: "easeOut" },
                  }
            }
            event={secondEvent}
            secondEvent
            onClick={() => handleSelectEvent(secondEvent, firstEvent)}
          />
        </div>
      )}
    </>
  );
}
