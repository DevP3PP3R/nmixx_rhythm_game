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

function SullyoonGame() {
  return (
    <GameLayout backgroundColor="#64b5f6">
      <GameTitle>설윤의 버블 보내기 💬</GameTitle>
      <GameDescription>
        설윤과의 메시지 대화를 리듬에 맞춰 이어가세요!
        설윤이 보낸 메시지 버블에 맞춰 답장을 보내는 미니게임입니다.
      </GameDescription>
      {/* 게임 컨텐츠는 여기에 추가될 예정입니다 */}
    </GameLayout>
  );
}

export default SullyoonGame; 