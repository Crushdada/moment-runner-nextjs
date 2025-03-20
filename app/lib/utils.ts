import { Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export const getCodeFromRawString = (usecase: string) => {
  const regex = /(moment|dayjs)\(\)\.\w+\((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)/g;
  const matches = usecase.match(regex);
  const newCode = matches ? matches.map(str => {
    return `console.log(${str});`
  }).join('\n') : '';
  return newCode
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function replaceLangParam(url: string, newLang: string) {
  // 使用 URL 和 URLSearchParams 对象解析和修改 URL
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);

  // 设置或替换 lang 参数
  searchParams.set('lang', newLang);

  // 更新 URL 对象的查询字符串
  urlObj.search = searchParams.toString();

  // 返回更新后的 URL
  return urlObj.toString();
}


// 存储数据到localStorage
export function setCache(key:string, value: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

// 从localStorage获取数据
export function getCache(key: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}



// eventBus
type Listener = (data: any) => void;
class EventBus {
  private listeners: { [event: string]: Listener[] } = {};

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  off(event: string, callback: Listener) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
}
export const eventBus = new EventBus();

// 辅助函数：根据路径获取嵌套对象的值
export const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => {
    return current?.[key]
  }, obj)
}