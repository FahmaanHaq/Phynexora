import { createElement } from "react";
import { getIcon, type IconName } from "@/lib/icons";

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return createElement(getIcon(name), { className, strokeWidth, "aria-hidden": true });
}
