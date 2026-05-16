import { UploadHistoryItem } from './types';

const HISTORY_KEY = 'snaphost_history';
const MAX_HISTORY = 6;

export const getHistory = (): UploadHistoryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read history:', e);
    return [];
  }
};

export const addToHistory = (item: UploadHistoryItem): void => {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const newHistory = [item, ...history.filter(h => h.id !== item.id)].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
};
