// 접속한 디바이스의 화면 크기 감지 훅
// PC의 접속에 경우 AdminPage로
// 태블릿, 모바일의 접속에 경우 FieldPage로 이동됨.
import { useState, useEffect } from 'react';

export const useDevice = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isDesktop };
};
