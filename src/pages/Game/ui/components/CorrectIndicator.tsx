import { selectGameRoundStatus } from "@/entities/game";
import { useAppSelector } from "@/shared/lib";
import { GlassMiniCard } from "@/shared/ui/glass-mini-card";
import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";
import cn from "classnames";

export default function CorrectIndicator() {
  const roundStatus = useAppSelector(selectGameRoundStatus);

  return (
    <GlassMiniCard
      className={cn(
        "aspect-square p-1! md:p-3! col-span-1  items-center justify-center z-10 hidden sm:flex border-4 border-white/45",
      )}
    >
      {(roundStatus === "succeeded" || roundStatus === "animating") && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0 }}
        >
          <IconCheck size={48} color="white" />
        </motion.div>
      )}
      {roundStatus === "failed" && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0 }}
        >
          <IconX size={48} color="white" />
        </motion.div>
      )}
      {roundStatus === "idle" && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="text-white text-3xl font-bold m-1.5"
        >
          VS
        </motion.span>
      )}
    </GlassMiniCard>
  );
}
