//This component formats and displays a date string in a human-readable format.
import { parseISO, format } from 'date-fns';
 
// dateString is a date in ISO 8601 format, e.g. '2020-01-01'
export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}