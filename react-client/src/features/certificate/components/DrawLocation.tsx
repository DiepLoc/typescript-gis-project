import React, { useEffect, useMemo, useState } from "react";
import { Location } from "../certificate.interface";

interface props {
  locations: Location[];
  certificateId: number;
}

const getCoorWithCanvas = (
  coor: number,
  minValue: number,
  maxValue: number,
  canvasSize: number
): number => {
  return Math.floor(((coor - minValue) / (maxValue - minValue)) * canvasSize);
};

const DrawLocation = ({ locations, certificateId }: props) => {
  const canvasId = useMemo(
    () => `location-canvas-${certificateId}`,
    [certificateId]
  );
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const c = document.getElementById(canvasId) as HTMLCanvasElement;
    setCanvas(c);
    setCtx(c.getContext("2d"));
  }, []);

  useEffect(() => {
    draw();
  }, [ctx, locations]);

  const draw = () => {
    if (!canvas || !ctx || locations.length < 3) return;

    const minX = locations.reduce(
      (a, b) => Math.min(a, b.longitudeX),
      500000000
    );
    const minY = locations.reduce(
      (a, b) => Math.min(a, b.latitudeY),
      500000000
    );
    const maxX = locations.reduce((a, b) => Math.max(a, b.longitudeX), 0);
    const maxY = locations.reduce((a, b) => Math.max(a, b.latitudeY), 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let firstCoors = {x: 0, y: 0};
    locations.forEach((l, index) => {
      const x = getCoorWithCanvas(l.longitudeX, minX, maxX, canvas.width - 20);
      const y = getCoorWithCanvas(l.latitudeY, minY, maxY, canvas.height - 20);
      if (index === 0) {
        firstCoors = {x, y};
        ctx.moveTo(x + 10, y + 10);
      } 
      else ctx.lineTo(x + 10, y + 10);
    });
    ctx.lineTo(firstCoors.x + 10, firstCoors.y + 10);
    ctx.strokeStyle = "red";
    ctx.stroke();
  };

  return (
    <div>
      <canvas id={canvasId}></canvas>
    </div>
  );
};

export default DrawLocation;
