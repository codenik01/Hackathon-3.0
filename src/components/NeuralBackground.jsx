
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NeuralBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationFrameId;

        // Configuration
        const particleCount = window.innerWidth < 768 ? 40 : 80;
        const connectDistance = window.innerWidth < 768 ? 120 : 180;
        const moveSpeed = 0.4;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * moveSpeed,
                    vy: (Math.random() - 0.5) * moveSpeed,
                    size: Math.random() * 2 + 1.5,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Colors based on theme - UPDATED to Premium Palette (Slate-950 + Indigo/Violet)
            const isDark = theme === 'dark';
            // Slate-950 (#020617) for dark, Slate-50 (#f8fafc) for light
            const bgColor = isDark ? '#020617' : '#f8fafc';

            // Indigo-500 (#6366f1) for particles
            const particleColor = isDark ? 'rgba(99, 102, 241, 0.6)' : 'rgba(79, 70, 229, 0.6)';

            // Connecting lines
            const lineColor = isDark ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ';

            // Fill Background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            // Update & Draw Particles
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Connect to others
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dx = p.x - p2.x;
                    let dy = p.y - p2.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectDistance) {
                        // Opacity based on distance (closer = more opaque)
                        const opacity = 1 - (distance / connectDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor + (opacity * 0.2) + ')'; // Low opacity lines
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw a subtle systematic grid overlay
            drawGrid(ctx, width, height, isDark);

            animationFrameId = requestAnimationFrame(draw);
        };

        const drawGrid = (ctx, w, h, isDark) => {
            const gridSize = 60;
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
            ctx.lineWidth = 1;

            for (let x = 0; x <= w; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = 0; y <= h; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
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
        />
    );
};

export default NeuralBackground;
