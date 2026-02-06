type Cursor = { date: string; time: string; id: number };

const formatCursorDate = (value: string | Date) => {
  if (value instanceof Date) {
    const yyyy = value.getFullYear();
    const mm = String(value.getMonth() + 1).padStart(2, '0');
    const dd = String(value.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return value; 
};

const formatCursorTime = (value: string | Date) => {
  if (value instanceof Date) {
    const hh = String(value.getHours()).padStart(2, '0');
    const mm = String(value.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }
  return value.slice(0, 5);
};

export const makeCursor = (row: { date: string | Date; start_time: string | Date; id: number }) =>
  `${formatCursorDate(row.date)}|${formatCursorTime(row.start_time)}|${row.id}`;


export const parseCursor = (cursor?: string): Cursor | null => {
  if (!cursor) return null;
  const [date, time, idStr] = cursor.split('|');
  const id = Number(idStr);
  if (!date || !time || !Number.isFinite(id)) return null;
  return { date, time, id };
};