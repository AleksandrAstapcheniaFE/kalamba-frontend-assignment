/** Formats date with English ordinal suffix */
export const simpleFormatDate = (date: Date): string => {
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const s = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  const transformDate = day + (s[(v - 20) % 10] || s[v] || s[0]);
  return `${month} ${transformDate}`;
};
