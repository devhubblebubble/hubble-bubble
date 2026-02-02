import { useMotionValueEvent, transform, MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

interface DeviceConfig {
  width: number;
  height: number;
}

interface IconConfig {
  size: number;
  margin: number;
}

interface UseIconTransformProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  xOffset: number;
  yOffset: number;
  device: DeviceConfig;
  icon: IconConfig;
}

export function useIconTransform({
  x,
  y,
  scale,
  planeX,
  planeY,
  xOffset,
  yOffset,
  device,
  icon
}: UseIconTransformProps) {
  const xScale = useRef(1);
  const yScale = useRef(1);

  const scaleRange = [0, 1, 1, 0];
  
  const transformers = useMemo(() => {
    const createScreenRange = (axis: "width" | "height") => [
        -60,
        80,
        device[axis] - (icon.size + icon.margin) / 2 - 80,
        device[axis] - (icon.size + icon.margin) / 2 + 60
    ];

    const xRange = createScreenRange("width");
    const yRange = createScreenRange("height");

    return {
      mapScreenToXOffset: transform(xRange, [50, 0, 0, -50]),
      mapScreenToYOffset: transform(yRange, [50, 0, 0, -50]),
      mapScreenXToScale: transform(xRange, scaleRange),
      mapScreenYToScale: transform(yRange, scaleRange),
    };
  }, [device.width, device.height, icon.size, icon.margin]);

  const updateX = (v: number) => {
    const screenOffset = v + xOffset + 20;
    xScale.current = transformers.mapScreenXToScale(screenOffset);
    const newScale = Math.min(xScale.current, yScale.current);
    scale.set(newScale);
    x.set(transformers.mapScreenToXOffset(screenOffset));
  };

  const updateY = (v: number) => {
    const screenOffset = v + yOffset + 20;
    yScale.current = transformers.mapScreenYToScale(screenOffset);
    const newScale = Math.min(xScale.current, yScale.current);
    scale.set(newScale);
    y.set(transformers.mapScreenToYOffset(screenOffset));
  };

  useMotionValueEvent(planeX, "change", updateX);
  useMotionValueEvent(planeY, "change", updateY);
}
