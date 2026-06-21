import React from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string | null;
  alt: string;
  placeholderClassName?: string;
}

export function SafeImage({ src, alt, className, placeholderClassName, ...props }: SafeImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-secondary/50 text-muted-foreground",
          className,
          placeholderClassName,
        )}
        aria-label={alt}
        role="img"
      >
        <span className="text-xs opacity-50">No image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={props.loading || "lazy"}
      decoding={props.decoding || "async"}
      {...props}
    />
  );
}
