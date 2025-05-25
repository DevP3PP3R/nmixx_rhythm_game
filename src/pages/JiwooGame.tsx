import GameLayout from '../components/GameLayout';
import styled from 'styled-components';

const GameTitle = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const GameDescription = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

function JiwooGame() {
  return (
    <GameLayout backgroundColor="#66bb6a">
      <GameTitle>지우의 편식 방어 🥦</GameTitle>
      <GameDescription>
        맛있는 음식은 먹고 지우가 싫어하는 채소가 날아오면 눈물을 터트려 편식에 성공하세요!
        리듬에 맞춰 음식을 피하고 먹어보세요.
      </GameDescription>
      {/* 게임 컨텐츠는 여기에 추가될 예정입니다 */}
    </GameLayout>
  );
}

export default JiwooGame; 