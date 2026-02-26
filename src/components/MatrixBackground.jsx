
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MatrixBackground = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Configuration
        const fontSize = 16;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]@#$%=+";

        let drops = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-initialize drops
            const columns = canvas.width / fontSize;
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100; // Start above screen
            }
        };

        const draw = () => {
            // Semi-transparent background for trail effect
            // In dark mode: dark background with green/cyan text
            // In light mode: very light background with matrix-like grey text (subtle)

            if (theme === 'dark') {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Slate-900 with low opacity
            } else {
                ctx.fillStyle = 'rgba(248, 250, 252, 0.05)'; // Slate-50 with low opacity
            }

            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Text color configuration
            if (theme === 'dark') {
                // Classic Matrix Green/Blue Cyan gradient feel
                ctx.fillStyle = '#0F0';
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = '#94a3b8'; // Slate-400
                ctx.shadowBlur = 0;
            }

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                // Varied colors for "advanced" look in dark mode
                if (theme === 'dark' && Math.random() > 0.98) {
                    ctx.fillStyle = '#FFF'; // white flashes
                } else if (theme === 'dark') {
                    ctx.fillStyle = `hsl(${120 + Math.random() * 60}, 100%, 50%)`; // Green to Cyan range
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Different fall speeds
                drops[i] += 0.5 + Math.random() * 0.5;
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
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20 dark:opacity-30"
        />
    );
};

export default MatrixBackground;
