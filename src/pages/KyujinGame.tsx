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

function KyujinGame() {
  return (
    <GameLayout backgroundColor="#ec407a">
      <GameTitle>규진의 댄스 타임 💃</GameTitle>
      <GameDescription>
        규진이 춤을 추면, 여러분은 규진의 춤을 따라하는 게임입니다!
        규진이 선보이는 멋진 춤을 잘 따라 해 보세요.
      </GameDescription>
      {/* 게임 컨텐츠는 여기에 추가될 예정입니다 */}
    </GameLayout>
  );
}

export default KyujinGame; 