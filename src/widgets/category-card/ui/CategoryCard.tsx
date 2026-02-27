import {
  selectCategory,
  setCategory,
  type ICategoryCard,
} from "@/entities/settings";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { IconLock } from "@tabler/icons-react";
import cn from "classnames";

export default function CategoryCard({
  category,
}: {
  category: ICategoryCard;
}) {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectCategory);

  return (
    <button
      disabled={category.soon}
      className={cn(
        "relative col-an-2 lg:col-span-1 category-btn bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 border-2 border-transparent hover:border-white/40 hover:scale-105  disabled:hover:scale-100 disabled:border-0",
        {
          "scale-[106%] md:scale-110 border-white/50 shadow-md shadow-white/20":
            selectedCategory === category.key,
        },
      )}
      onClick={() => dispatch(setCategory(category.key))}
    >
      <div className="*:size-13 *:stroke-white flex justify-center">
        {category.icon}
      </div>
      <div className="text-white font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">
        {category.name}
      </div>

      {category.soon && (
        <div className="transition-all duration-300 hover:scale-105 shadow-xl absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 rounded-2xl text-white font-semibold pointer-events-none">
          <IconLock size={32} />
          <span>Скоро</span>
        </div>
      )}
    </button>
  );
}
