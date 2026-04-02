import { useRef, useEffect, useState } from 'react';

export const useScrollFadeIn = () => {
  const dom = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // 화면에 요소가 나타나면 isVisible을 true로 변경
          if (entry.isIntersecting) {
            setIsVisible(true);
            // 한 번만 애니메이션을 실행하려면 아래 주석을 해제하세요.
            // observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }, // 요소가 10% 보일 때 실행
      );
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, []);

  return {
    ref: dom,
    className: isVisible ? 'animate' : '',
  };
};
