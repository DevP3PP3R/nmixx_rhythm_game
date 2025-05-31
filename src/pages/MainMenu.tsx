import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mainBackground from '../assets/리듬세상.png';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  background: url(${mainBackground}) no-repeat center center fixed;
  background-size: cover;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);  // 어두운 오버레이
    z-index: 1;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 2;
`;

const GameButton = styled(Link)<{ $isInDevelopment?: boolean }>`
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 15px 30px;
  margin: 10px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: ${props => props.$isInDevelopment ? '3px solid #4CAF50' : '3px solid #ff6b6b'};
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 1);
  }
`;

const DevelopmentStatus = styled.span<{ $isInDevelopment?: boolean }>`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: ${props => props.$isInDevelopment ? '#4CAF50' : '#ff6b6b'};
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: bold;
  z-index: 3;
`;

function MainMenu() {
  return (
    <MenuContainer>
      <Title>NMIXX HEAVEN</Title>
      <GameButton to="/sullyoon" $isInDevelopment={true}>
        설윤의 애교디펜스 🥰
        <DevelopmentStatus $isInDevelopment={true}>[개발중]</DevelopmentStatus>
      </GameButton>
      <GameButton to="/lily">
        릴리의 음정 맞추기 🎤
        <DevelopmentStatus>[개발예정]</DevelopmentStatus>
      </GameButton>
      <GameButton to="/haewon">
        해원의 팬사인회 ✍️
        <DevelopmentStatus>[개발예정]</DevelopmentStatus>
      </GameButton>
      <GameButton to="/bae">
        배이의 쿠키 베이킹 🍪
        <DevelopmentStatus>[개발예정]</DevelopmentStatus>
      </GameButton>
      <GameButton to="/jiwoo">
        지우의 편식 방어 🥦
        <DevelopmentStatus>[개발예정]</DevelopmentStatus>
      </GameButton>
      <GameButton to="/kyujin">
        규진의 댄스 타임 💃
        <DevelopmentStatus>[개발예정]</DevelopmentStatus>
      </GameButton>
    </MenuContainer>
  );
}

export default MainMenu; 