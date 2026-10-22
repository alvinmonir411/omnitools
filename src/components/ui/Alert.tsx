import * as React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
}

export function Alert({
  className,
  variant = 'info',
  title,
  children,
  ...props
}: AlertProps) {
  const icons = {
    info: <Info className="h-5 w-5 text-primary flex-shrink-0" />,
    success: <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />,
    danger: <AlertOctagon className="h-5 w-5 text-danger flex-shrink-0" />,
  };

  const variants = {
    info: 'bg-primary-subtle border-primary/20 text-body',
    success: 'bg-success-subtle border-success/20 text-body',
    warning: 'bg-warning-subtle border-warning/20 text-body',
    danger: 'bg-danger-subtle border-danger/20 text-body',
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed',
        variants[variant],
        className,
      )}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
