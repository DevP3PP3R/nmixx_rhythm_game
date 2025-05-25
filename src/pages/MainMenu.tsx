import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b6b, #6b66ff);
  padding: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const GameButton = styled(Link)`
  background-color: white;
  color: #333;
  padding: 15px 30px;
  margin: 10px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: transform 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

function MainMenu() {
  return (
    <MenuContainer>
      <Title>NMIXX HEAVEN</Title>
      <GameButton to="/lily">릴리의 음정 맞추기 🎤</GameButton>
      <GameButton to="/haewon">해원의 팬사인회 ✍️</GameButton>
      <GameButton to="/sullyoon">설윤의 버블 보내기 💬</GameButton>
      <GameButton to="/bae">배이의 쿠키 베이킹 🍪</GameButton>
      <GameButton to="/jiwoo">지우의 편식 방어 🥦</GameButton>
      <GameButton to="/kyujin">규진의 댄스 타임 💃</GameButton>
    </MenuContainer>
  );
}

export default MainMenu; 