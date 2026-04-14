import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, variant = 'primary', size = 'md', children, isLoading, ...props }) => {
  const { theme } = useTheme();

  const variants = {
    primary: theme === 'neubrutalism' ? 'brutalist-btn' : theme === 'neumorphism' ? 'neumorphic-btn' : 'btn-primary',
    secondary: theme === 'neubrutalism' ? 'brutalist-btn bg-cyan-400' : theme === 'neumorphism' ? 'neumorphic-btn' : 'btn-secondary',
    outline: theme === 'neubrutalism' ? 'brutalist-btn bg-white' : theme === 'neumorphism' ? 'neumorphic-btn border border-gray-100' : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:scale-95',
    ghost: 'hover:bg-indigo-50 text-gray-600 active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-lg shadow-red-500/20',
  };

  const sizes = {
    sm: theme === 'neubrutalism' ? 'px-4 py-2 text-sm' : 'px-4 py-2 text-sm rounded-xl',
    md: theme === 'neubrutalism' ? 'px-6 py-3' : 'px-6 py-3 rounded-2xl',
    lg: theme === 'neubrutalism' ? 'px-8 py-4 text-lg' : 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-bold transition-all disabled:opacity-50 disabled:pointer-events-none outline-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : children}
    </button>
  );
};

export const Card = ({ className, children, glass = true, ...props }) => {
  const { theme } = useTheme();

  return (
    <div 
      className={cn(
        theme === 'neubrutalism' ? 'brutalist-card p-8' : 
        theme === 'neumorphism' ? 'neumorphic-card p-8' : 
        glass ? 'glass-card p-8' : 'bg-white rounded-[32px] shadow-premium p-8',
        'transition-all duration-300',
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const Input = ({ label, error, className, icon: Icon, ...props }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-2 w-full">
      {label && <label className={cn("text-sm font-bold ml-1 block", theme === 'neubrutalism' ? "text-black" : "text-gray-700")}>{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
            {Icon}
          </div>
        )}
        <input
          className={cn(
            theme === 'neubrutalism' ? 'w-full bg-white border-4 border-black p-4 font-bold shadow-[4px_4px_0px_0px_#000000] focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_#000000] outline-none transition-all' :
            theme === 'neumorphism' ? 'neumorphic-input w-full p-4 outline-none' : 'input-premium',
            Icon && 'pl-12',
            error && 'border-red-500 focus:ring-red-500/10 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
};

export const Badge = ({ children, status = 'pending' }) => {
  const styles = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    completed: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
    available: 'bg-teal-100 text-teal-700 border-teal-200',
    booked: 'bg-violet-100 text-violet-700 border-violet-200',
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-xs font-bold capitalize border', styles[status])}>
      {children}
    </span>
  );
};

export const SectionHeader = ({ title, subtitle, centered = false }) => (
  <div className={cn("space-y-3 mb-12", centered && "text-center")}>
    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
    <div className={cn("h-1.5 w-20 bg-indigo-600 rounded-full", centered && "mx-auto")} />
  </div>
);
