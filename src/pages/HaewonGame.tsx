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

function HaewonGame() {
  return (
    <GameLayout backgroundColor="#7c4dff">
      <GameTitle>해원의 팬사인회 ✍️</GameTitle>
      <GameDescription>
        팬사인회에서 해원이에게 날아오는 아이템을 잡고, 사인을 부탁하는 종이에 싸인을 해야 해요.
        리듬에 맞춰 터치해서 해원이의 팬사인회를 도와주세요!
      </GameDescription>
      {/* 게임 컨텐츠는 여기에 추가될 예정입니다 */}
    </GameLayout>
  );
}

export default HaewonGame; 