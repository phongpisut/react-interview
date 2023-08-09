import React, { ImgHTMLAttributes, useState } from "react";

interface Props extends ImgHTMLAttributes<any> {
  fallback: string;
  fallbackClassName?: string;
}

export default function ImgFallBack({
  fallback,
  fallbackClassName,
  src,
  className,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [newClassName, setNewClassName] = useState<string | undefined>(
    className
  );
  const onError = () => {
    setImgSrc(fallback);
    setNewClassName(fallbackClassName);
  };

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={imgSrc ? imgSrc : fallback}
      className={newClassName ? newClassName : fallbackClassName}
      onError={onError}
      {...props}
    />
  );
}
