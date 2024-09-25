"use client";

import { CategoryProps } from "@/types";
import { Progress } from "@/components/ui/progress";
import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

function Category({ category }: CategoryProps) {
  const badgeCategory = category.name.split(",");
  const {
    bg,
    circleBg,
    icon,
    progress: topProgress,
    text,
  } = topCategoryStyles[badgeCategory[0] as keyof typeof topCategoryStyles] ||
  topCategoryStyles.default;

  return (
    <div className={cn("flex w-full gap-2 rounded-lg p-2", bg)}>
      <div className={cn("rounded-full p-2", circleBg)}>
        <Image src={icon} width={20} height={20} alt={badgeCategory[0]} />
      </div>
      <div className="flex flex-col w-full gap-2 justify-center">
        <div className="flex justify-between">
          <h2 className={cn("text-sm", text.main)}>{badgeCategory[0]}</h2>
          <p className={cn("text-sm", text.count)}>{category.count}</p>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          className={cn("h-2 w-full", topProgress.bg)}
          max={category.totalCount}
          indicatorClassName={cn("h2 w-full", topProgress.indicator)}
        />
      </div>
    </div>
  );
}

export default Category;
