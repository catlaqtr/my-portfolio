import type { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { pixelButtonClass, type sizes, type variants } from "./pixelButtonClass";

type Props = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** A chunky, pixel-styled link button matching the village's art. */
function PixelButton({ variant, size, className = "", ...props }: Props) {
  return <Link {...props} className={`${pixelButtonClass(variant, size)} ${className}`} />;
}

export default PixelButton;
