import { useEffect, useState } from "react";

export const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-cyan-100 dark:from-purple-950 dark:via-blue-950 dark:to-cyan-950 animate-gradient-shift"
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3), transparent 50%)`,
          transition: "background 0.3s ease",
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTYtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYtMi42ODYgNi02IDYtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDZ6bTAgMzBjMC0zLjMxNCAyLjY4Ni02IDYtNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNi0yLjY4NiA2LTYgNiA2IDIuNjg2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
    </div>
  );
};
