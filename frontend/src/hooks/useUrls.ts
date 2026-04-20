import { useState, useEffect } from 'react';
import  type { UrlResponse } from '../types';

export const useUrls = () => {
  const [urls, setUrls] = useState<UrlResponse[]>(() => {
    const saved = localStorage.getItem('sniply_urls');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sniply_urls', JSON.stringify(urls));
  }, [urls]);

  const addUrl = (url: UrlResponse) => {
    setUrls((prev) => [url, ...prev]);
  };

  const removeUrl = (shortCode: string) => {
    setUrls((prev) => prev.filter((u) => u.shortCode !== shortCode));
  };

  return { urls, addUrl, removeUrl };
};
