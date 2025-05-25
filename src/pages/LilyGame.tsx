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

function LilyGame() {
  return (
    <GameLayout backgroundColor="#ff6b6b">
      <GameTitle>릴리의 음정 맞추기 🎤</GameTitle>
      <GameDescription>
        릴리가 노래를 부르면, 여러분은 리듬에 맞춰 릴리의 목소리를 따라 부르게 됩니다!
        정확한 타이밍에 맞춰 터치하면 성공! 음정을 잘 맞춰야 높은 점수를 받을 수 있습니다.
      </GameDescription>
      {/* 게임 컨텐츠는 여기에 추가될 예정입니다 */}
    </GameLayout>
  );
}

export default LilyGame; 