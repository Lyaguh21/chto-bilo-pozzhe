import {
  selectGameRoundStatus,
  selectGameFirstEvent,
  selectGameSecondEvent,
  type IGameEvent,
} from "@/entities/game";
import { useAppSelector } from "@/shared/lib";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import cn from "classnames";
import { CorrectedDate } from "@/shared/helpers";

export default function GameEventCard({
  event,
  firstEvent,
  secondEvent,
  ...props
}: {
  event: IGameEvent;
  firstEvent?: boolean;
  secondEvent?: boolean;
} & MotionProps &
  React.HTMLAttributes<HTMLDivElement>) {
  const roundStatus = useAppSelector(selectGameRoundStatus);
  const storeFirst = useAppSelector(selectGameFirstEvent);
  const storeSecond = useAppSelector(selectGameSecondEvent);

  const firstIsLater =
    storeFirst && storeSecond
      ? Number(storeFirst.date.slice(0, 4)) >
        Number(storeSecond.date.slice(0, 4))
      : false;
  const secondIsLater =
    storeFirst && storeSecond
      ? Number(storeSecond.date.slice(0, 4)) >
        Number(storeFirst.date.slice(0, 4))
      : false;

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl overflow-hidden lg:w-[520px] h-full col-span-6 lg:col-span-3 cursor-pointer flex flex-row lg:flex-col"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="overflow-hidden relative w-1/3 lg:w-full h-full lg:aspect-video lg:h-[320px]">
        <img
          className="w-full h-full object-cover"
          src={event.imageUrl}
          alt={event.name}
        />
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex justify-center items-center">
          <h2 className="text-2xl font-extrabold text-gray-600 text-center ">
            {event.name}
            {/* {event.date}
          </h2>
        </div>  */}
      </div>

      <div className="p-2 py-4 md:p-8 flex flex-col justify-between gap-2 md:gap-5 grow w-2/3 lg:w-full">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 ">
          {event.name}
        </h3>
        <p className={cn("text-gray-600 text-md md:text-lg ")}>
          {event.description}
        </p>

        <div className="min-h-23">
          <AnimatePresence>
            {roundStatus !== "idle" && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className=""
                >
                  <div
                    className={cn(
                      {
                        "bg-linear-to-r from-indigo-500 to-purple-500 border-2 border-white/30 shadow-xl shadow-indigo-600/60 text-white":
                          !firstEvent && !secondEvent,
                      },

                      firstEvent &&
                        (firstIsLater
                          ? "bg-emerald-500 border-emerald-300 shadow-emerald-600/40 text-white"
                          : "bg-red-500 border-red-300 shadow-red-600/40 text-white"),

                      secondEvent &&
                        (secondIsLater
                          ? "bg-emerald-500 border-emerald-300 shadow-emerald-600/40 text-white"
                          : "bg-red-500 border-red-300 shadow-red-600/40 text-white"),
                      "rounded-2xl p-4 text-center text-xl font-bold",
                    )}
                  >
                    {CorrectedDate(event.date)}
                  </div>
                </motion.div>

                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  href={event.linkOnWiki}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-2 text-md font-bold text-gray-800  text-center underline"
                >
                  Подробнее на вики
                </motion.a>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
