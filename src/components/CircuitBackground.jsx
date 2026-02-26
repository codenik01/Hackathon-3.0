
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CircuitBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let circuitPaths = [];
        let pulses = [];
        let animationFrameId;

        // Configuration
        const gridSize = 40; // Size of the grid cells
        const pathCount = 30; // Number of distinct circuit paths
        const pulseChance = 0.02; // Chance to spawn a pulse per frame

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initCircuits();
        };

        const initCircuits = () => {
            circuitPaths = [];
            pulses = [];

            // Create random systematic paths (Manhattan style: horizontal/vertical only)
            for (let i = 0; i < pathCount; i++) {
                let path = [];
                let x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
                let y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
                let length = Math.floor(Math.random() * 10) + 5; // Path segments

                path.push({ x, y });

                for (let j = 0; j < length; j++) {
                    const direction = Math.floor(Math.random() * 4); // 0: up, 1: right, 2: down, 3: left
                    switch (direction) {
                        case 0: y -= gridSize; break;
                        case 1: x += gridSize; break;
                        case 2: y += gridSize; break;
                        case 3: x -= gridSize; break;
                    }
                    // Keep within bounds
                    if (x < 0) x = 0; if (x > width) x = width;
                    if (y < 0) y = 0; if (y > height) y = height;

                    path.push({ x, y });
                }
                circuitPaths.push(path);
            }
        };

        const draw = () => {
            // Clear with trail effect for "glow" persistence
            ctx.fillStyle = theme === 'dark' ? 'rgba(15, 23, 42, 0.1)' : 'rgba(241, 245, 249, 0.2)';
            ctx.fillRect(0, 0, width, height);

            // Config Colors
            const traceColor = theme === 'dark' ? 'rgba(56, 189, 248, 0.05)' : 'rgba(100, 116, 139, 0.05)'; // Very subtle lines
            const pulseColor = theme === 'dark' ? '#38bdf8' : '#6366f1'; // Cyan (dark) or Indigo (light) glow

            // Draw Static Circuits (Background)
            ctx.strokeStyle = traceColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            circuitPaths.forEach(path => {
                ctx.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    ctx.lineTo(path[i].x, path[i].y);
                }
            });
            ctx.stroke();

            // Spawn Pulses
            if (Math.random() < pulseChance) {
                const randomPathIndex = Math.floor(Math.random() * circuitPaths.length);
                pulses.push({
                    pathIndex: randomPathIndex,
                    segment: 0, // current segment index of the path
                    progress: 0, // 0 to 1 along current segment
                    speed: 0.1 + Math.random() * 0.1 // random speed
                });
            }

            // Update & Draw Pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                let p = pulses[i];
                const path = circuitPaths[p.pathIndex];

                if (p.segment >= path.length - 1) {
                    pulses.splice(i, 1); // Remove finished pulses
                    continue;
                }

                // Calculate current position
                const start = path[p.segment];
                const end = path[p.segment + 1];

                const curX = start.x + (end.x - start.x) * p.progress;
                const curY = start.y + (end.y - start.y) * p.progress;

                // Draw Head
                ctx.shadowBlur = 10;
                ctx.shadowColor = pulseColor;
                ctx.fillStyle = pulseColor;
                ctx.beginPath();
                ctx.arc(curX, curY, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Advance
                p.progress += p.speed;
                if (p.progress >= 1) {
                    p.progress = 0;
                    p.segment++;
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{
                background: theme === 'dark'
                    ? '#0f172a' // Slate 900
                    : '#f8fafc' // Slate 50
            }}
        />
    );
};

export default CircuitBackground;
