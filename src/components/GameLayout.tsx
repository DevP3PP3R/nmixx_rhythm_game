import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
`;

const HomeButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: white;
  color: #333;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

interface GameLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

function GameLayout({ children, backgroundColor = '#6b66ff' }: GameLayoutProps) {
  return (
    <GameContainer style={{ backgroundColor }}>
      <HomeButton to="/">메인으로 돌아가기</HomeButton>
      {children}
    </GameContainer>
  );
}

export default GameLayout; 