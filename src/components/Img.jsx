import { useEffect, useState } from "react";

const imageCache = new Map();

export default function Img({ src, alt, ...props }) {
  const [loaded, setLoaded] = useState(imageCache.has(src));

  useEffect(() => {
    if (imageCache.has(src)) {
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageCache.set(src, true);
      setLoaded(true);
    };
  }, [src]);
  return loaded ? <img src={src} alt={alt} {...props} /> : <></>;
}
