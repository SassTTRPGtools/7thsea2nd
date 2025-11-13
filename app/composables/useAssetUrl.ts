/**
 * 獲取包含 baseURL 的完整資源路徑
 * 用於在 GitHub Pages 等部署環境中正確載入靜態資源
 */
export const getAssetUrl = (path: string): string => {
  // 確保路徑以 / 開頭
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 在開發環境中，直接返回路徑
  if (import.meta.dev) {
    return normalizedPath;
  }
  
  // 在生產環境中，添加 baseURL
  const baseURL = '/7thsea2nd';
  return `${baseURL}${normalizedPath}`;
};
