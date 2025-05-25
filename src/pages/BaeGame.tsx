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

function BaeGame() {
  return (
    <GameLayout backgroundColor="#ffa726">
      <GameTitle>배이의 쿠키 베이킹 🍪</GameTitle>
      <GameDescription>
        배이와 함께 쿠키를 만들어보세요! 반죽을 섞고, 오븐에 넣고,
        완성된 쿠키에 장식을 하는 다양한 과정이 리듬에 맞춰 진행됩니다.
      </GameDescription>
      {/* 게임 컨텐츠는 여기에 추가될 예정입니다 */}
    </GameLayout>
  );
}

export default BaeGame; 