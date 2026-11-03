import { format, parseISO, subDays } from 'date-fns';
import { it } from 'date-fns/locale';

export const todayKey = () => format(new Date(), 'yyyy-MM-dd');

export const formatDay = (iso: string) => format(parseISO(iso), 'd MMM', { locale: it });

export const formatFullDate = (iso: string) => format(parseISO(iso), "d MMMM yyyy", { locale: it });

export function lastNDays(n: number) {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    days.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
  }
  return days;
}

export function minutesLabel(minutes: number) {
  if (minutes < 1) return 'meno di 1 min';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}
