import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Pencil, 
  Calculator, 
  Atom, 
  Globe, 
  Lightbulb,
  Binary,
  Shapes,
  FlaskConical,
  LucideIcon
} from 'lucide-react';

interface EducationIconProps {
  icon: LucideIcon;
  delay: number;
  initialX: number;
  initialY: number;
  size: number;
  opacity: number;
}

const EducationIcon: React.FC<EducationIconProps> = ({ 
  icon: Icon, 
  delay, 
  initialX, 
  initialY, 
  size, 
  opacity 
}) => (
  <motion.div
    initial={{ x: initialX, y: initialY, opacity: 0 }}
    animate={{ 
      y: [initialY - 20, initialY + 20, initialY - 20],
      opacity: opacity,
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 10 + Math.random() * 10, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: delay 
    }}
    className="absolute pointer-events-none text-slate-400/60"
    style={{ left: `${initialX}%`, top: `${initialY}%` }}
  >
    <Icon size={size} />
  </motion.div>
);

export const EducationBackground = () => {
  const icons = [
    { icon: BookOpen, x: 10, y: 15, size: 40, opacity: 0.5 },
    { icon: GraduationCap, x: 85, y: 10, size: 50, opacity: 0.4 },
    { icon: Pencil, x: 75, y: 80, size: 30, opacity: 0.45 },
    { icon: Calculator, x: 20, y: 70, size: 35, opacity: 0.5 },
    { icon: Atom, x: 50, y: 25, size: 60, opacity: 0.35 },
    { icon: Globe, x: 90, y: 60, size: 45, opacity: 0.4 },
    { icon: Lightbulb, x: 5, y: 85, size: 35, opacity: 0.45 },
    { icon: Binary, x: 40, y: 75, size: 50, opacity: 0.35 },
    { icon: Shapes, x: 65, y: 15, size: 40, opacity: 0.4 },
    { icon: FlaskConical, x: 30, y: 40, size: 45, opacity: 0.4 },
    // Repeat some icons for better coverage
    { icon: BookOpen, x: 80, y: 40, size: 30, opacity: 0.4 },
    { icon: Calculator, x: 60, y: 90, size: 40, opacity: 0.35 },
    { icon: Atom, x: 15, y: 30, size: 35, opacity: 0.4 },
    { icon: Lightbulb, x: 95, y: 25, size: 40, opacity: 0.35 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-slate-50">
      {/* Decorative Gradients for depth */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-khamoun-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-khamoun-accent/10 rounded-full blur-3xl" />
      
      {/* Education Icons */}
      {icons.map((item, index) => (
        <EducationIcon 
          key={index}
          icon={item.icon}
          initialX={item.x}
          initialY={item.y}
          size={item.size}
          opacity={item.opacity}
          delay={index * 0.5}
        />
      ))}
      
      {/* Subtle Math Formulas / Text Patterns */}
      <div className="absolute top-1/4 right-1/4 text-slate-400/40 font-mono text-sm rotate-12 select-none">
        E = mc²
      </div>
      <div className="absolute bottom-1/3 left-1/3 text-slate-400/40 font-mono text-xs -rotate-12 select-none">
        a² + b² = c²
      </div>
      <div className="absolute top-2/3 right-10 text-slate-400/40 font-mono text-xs select-none">
        H₂O
      </div>
    </div>
  );
};
