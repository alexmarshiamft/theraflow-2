import { cn } from '@/lib/utils';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-brand-600',
  iconBg = 'bg-brand-50',
  className,
}: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground" data-private="true">{value}</p>
          {change && (
            <div
              className={cn(
                'mt-2 flex items-center gap-1 text-xs font-medium',
                changeType === 'up' && 'text-emerald-600',
                changeType === 'down' && 'text-red-500',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {changeType === 'up' && <TrendingUp className="h-3 w-3" />}
              {changeType === 'down' && <TrendingDown className="h-3 w-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className={cn('rounded-xl p-3', iconBg)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </div>
    </div>
  );
}
