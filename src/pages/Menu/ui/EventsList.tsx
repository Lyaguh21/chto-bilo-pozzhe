import { allHistoryEvents } from "@/entities/game";
import { Button } from "@/shared/ui/button";
import { GameEventCard } from "@/widgets/game-events-card";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function ViewEvents() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        className="fixed z-90 aspect-square p-3! left-10 top-10"
        onClick={() => navigate("/")}
        iconLeft={<IconChevronLeft size={32} color="white" />}
      />

      <div className="grid grid-cols-6 gap-6">
        {allHistoryEvents.map((el) => (
          <GameEventCard key={el.id} event={el} />
        ))}
      </div>
    </>
  );
}
