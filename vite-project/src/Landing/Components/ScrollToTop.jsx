import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/landingStyled';

// 💡 버튼 스타일 정의 (위치, 디자인, 애니메이션)
const ScrollButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  box-shadow: 0 8px 24px rgba(46, 125, 50, 0.25);
  cursor: pointer;
  z-index: 999; /* 다른 요소들보다 항상 위에 오도록 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;

  /* 스크롤 상태($isVisible)에 따라 부드럽게 나타나고 사라짐 */
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s ease;

  &:hover {
    background-color: #236026;
    transform: translateY(-4px); /* 마우스 올리면 살짝 더 뜸 */
    box-shadow: 0 12px 28px rgba(46, 125, 50, 0.35);
  }

  /* 모바일 화면에서는 버튼 크기와 여백을 조금 줄임 */
  @media (max-width: 640px) {
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 💡 스크롤 위치를 감지하여 버튼 표시 여부를 결정하는 로직
  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤을 500px 이상 내렸을 때만 버튼이 보이게 합니다.
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거 (메모리 누수 방지)
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 💡 버튼 클릭 시 최상단으로 부드럽게 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton
      $isVisible={isVisible}
      onClick={scrollToTop}
      aria-label="맨 위로 가기"
    >
      ↑
    </ScrollButton>
  );
};

export default ScrollToTop;
