export const getInitialText = (initial = 'Hello World', queryKey = 'text') => {
  if (typeof window === 'undefined') return initial;
  let query = new URLSearchParams(window.location.search);
  let text = query.get(queryKey);
  if (!text) return initial;
  return decodeURIComponent(text);
};

export const getInitialColors = (
  initial = ['red', 'blue', 'fuchsia'],
  queryKey = 'colors',
) => {
  if (typeof window === 'undefined') return initial;
  let query = new URLSearchParams(window.location.search);
  let colors = query.get(queryKey);
  if (!colors) return initial;
  return decodeURIComponent(colors).split(',');
};

export const getStopPoints = (colors: string[]) => {
  const increment = 100 / (colors.length - 1);
  let stopPoints = [];
  for (let i = 0; i < colors.length; i++) {
    stopPoints.push(`${i * increment}%`);
  }
  return stopPoints;
};
