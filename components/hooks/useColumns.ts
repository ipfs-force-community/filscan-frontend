import { useEffect } from 'react';

const useColumnAlign = (containerSelector: string, itemSelector: string, className: string) => {
  useEffect(() => {
    const alignColumns = () => {
      // 获取所有的.item元素
      const items = document.querySelectorAll(itemSelector);
      // 计算出有多少列
      const cols = Math.floor(document.querySelector(containerSelector)!.clientHeight / (items[0] as HTMLElement).offsetHeight);
      // 为每一列的第一个元素添加新的类名
      for (let i = 0; i < items.length; i += cols) {
        (items[i] as HTMLElement).classList.add(className);
      }
    };
    
    window.addEventListener('load', alignColumns);
    
    // 清理函数，在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('load', alignColumns);
    };
  }, [containerSelector, itemSelector, className]); // 依赖列表，当这些值变化时重新运行effect
};

export default useColumnAlign;
