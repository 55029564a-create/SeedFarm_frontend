import styled from 'styled-components';

// ---------------------------------------------------------
// 1. 디자인 토큰 (우리만의 약속된 수치)
// ---------------------------------------------------------
const theme = {
  colors: {
    primary: '#1e293b', // 메인 네이비
    point: '#4caf50', // 포인트 그린
    teal: '#00c2a8', // 강조 티알
    danger: '#e63946', // 경고 레드
    gray: '#94a3b8', // 기본 가이드 회색
    bg: '#f8fafc', // 전체 배경색
  },
  spacing: {
    xs: '0.5em',
    sm: '1em',
    md: '1.5em',
    lg: '2em',
  },
};

// ---------------------------------------------------------
// 2. 최상위 래퍼 (Fluid Layout & Global Vars)
// ---------------------------------------------------------
export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: calc(100vw * (16 / 1920));
  @media (min-width: 1920px) {
    font-size: 16px;
  }
  display: flex;
  background-color: ${theme.colors.bg};
  overflow: hidden;
`;

// ---------------------------------------------------------
// 3. 레이아웃 컴포넌트 (Flex & Grid의 표준)
// ---------------------------------------------------------

/** * Flex: 배치를 위한 만능 도구 (이것만 쓰면 display:flex 칠 필요 없음) */
export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ dir = 'row' }) => dir};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'stretch' }) => align};
  gap: ${({ gap = '0' }) => gap};
  flex: ${({ flex }) => flex || 'none'};
  width: ${({ width }) => width || 'auto'};
  padding: ${({ p = '0' }) => p};
  margin: ${({ m = '0' }) => m};
`;

/** * MainWrapper: 우측 컨텐츠 영역의 표준 규격 */
export const MainWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.lg};
  gap: ${theme.spacing.md};
  overflow-y: auto;
`;

// ---------------------------------------------------------
// 4. 데이터 컴포넌트 (Card & Text의 표준)
// ---------------------------------------------------------

/** * BaseCard: 모든 정보 박스의 표준.
 * 프롭스로 배경색, 패딩, 그림자를 즉시 변경 가능 */
export const BaseCard = styled.div`
  background: ${({ bg = 'white' }) => bg};
  border-radius: ${({ radius = '1.2em' }) => radius};
  padding: ${({ p = '1.5em' }) => p};
  box-shadow: ${({ shadow = '0 0.2em 0.8em rgba(0, 0, 0, 0.04)' }) => shadow};
  border: ${({ border = 'none' }) => border};
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: ${({ flex }) => flex || 'none'};
`;

/** * Text: 모든 글자의 표준.
 * <Text size="1.5em" weight="800"> 처럼 사용 */
export const Text = styled.span`
  font-size: ${({ size = '1em' }) => size};
  font-weight: ${({ weight = '500' }) => weight};
  color: ${({ color = theme.colors.primary }) => color};
  line-height: ${({ lh = '1.5' }) => lh};
  text-align: ${({ align = 'left' }) => align};
  margin: ${({ m = '0' }) => m};
  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'normal')};
`;

/** * CardTitle: 카드 제목의 표준 규격 */
export const CardTitle = styled.h3`
  font-size: 1.2em;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: ${({ mb = '1em' }) => mb};
`;

// ---------------------------------------------------------
// 5. 사이드바 및 헤더 (기존 유지)
// ---------------------------------------------------------
export const SidebarWrapper = styled.nav`
  width: 16em;
  height: 100%;
  background-color: ${theme.colors.primary};
  color: white;
  display: flex;
  flex-direction: column;
  padding: 2em 1.5em;
  box-sizing: border-box;
`;

export const TopHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-title {
    font-size: 1.8em;
    font-weight: 800;
    color: ${theme.colors.primary};
  }
  .header-actions {
    display: flex;
    gap: 1em;
  }
`;

export const HeaderBtn = styled.button`
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.6em;
  transition: 0.2s;
  border: 1px solid #cbd5e1;
  background: white;
  &:hover {
    background-color: #f1f5f9;
  }
  &.alert {
    color: ${theme.colors.danger};
    background-color: rgba(230, 57, 70, 0.05);
  }
`;
