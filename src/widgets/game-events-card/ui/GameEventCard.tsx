import { selectGameRoundStatus, type IGameEvent } from "@/entities/game";
import { useAppSelector } from "@/shared/lib";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import cn from "classnames";
import { CorrectedDate } from "@/shared/helpers";

export default function GameEventCard({
  event,
  ...props
}: { event: IGameEvent } & MotionProps & React.HTMLAttributes<HTMLDivElement>) {
  const roundStatus = useAppSelector(selectGameRoundStatus);

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl overflow-hidden lg:w-[520px] h-full col-span-3 cursor-pointer flex flex-col "
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="aspect-video lg:h-[320px] overflow-hidden relative">
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

      <div className="p-2 py-4 md:p-8 flex flex-col justify-between gap-2 md:gap-5 grow">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 ">
          {event.name}
        </h3>
        <p className={cn("text-gray-600 text-md md:text-lg ")}>
          {event.description}
        </p>

        <div className="min-h-15">
          <AnimatePresence>
            {roundStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className=""
              >
                <div className="bg-linear-to-r from-indigo-500 to-purple-500 border-2 border-white/30 shadow-xl shadow-indigo-600/60 rounded-2xl p-4 text-center text-white text-xl font-bold">
                  {CorrectedDate(event.date)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
