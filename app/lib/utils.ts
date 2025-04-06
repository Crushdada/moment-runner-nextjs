

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