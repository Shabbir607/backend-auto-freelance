import { r as reactExports, j as jsxRuntimeExports } from "./vendor-oSjIcCqY.js";
import "stream";
import "util";
const Starfield = () => {
  const canvasRef = reactExports.useRef(null);
  const mouseRef = reactExports.useRef({ x: 0, y: 0 });
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    const isMobile = width < 768;
    const starCount = isMobile ? 50 : 150;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.1,
      baseX: Math.random() * width,
      baseY: Math.random() * height
    }));
    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const depth = star.z;
        const factor = window.innerWidth < 768 ? 0.02 : 0.05;
        const dx = (mouseRef.current.x - width / 2) * factor * depth;
        const dy = (mouseRef.current.y - height / 2) * factor * depth;
        star.x += (star.baseX - dx - star.x) * 0.1;
        star.y += (star.baseY - dy - star.y) * 0.1;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * depth, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "fixed inset-0 z-0 pointer-events-none opacity-50" });
};
export {
  Starfield
};
