import React, { useState, useRef, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import styled, { keyframes } from 'styled-components';
import sullyoonStart from '../games/sullyoon/설윤01.png';
import sullyoonDefault from '../games/sullyoon/설윤02.png';
import sullyoonGood from '../games/sullyoon/설윤03.png';
import sullyoonBad from '../games/sullyoon/설윤04_1.png';
import sullyoonEnd from '../games/sullyoon/설윤05.png';
import clickSound from '../games/sullyoon/sullyoonOK.mp3';
import missSound from '../games/sullyoon/sullyoonNO.mp3';
import backgroundMusic from '../games/sullyoon/sullyoonMUSIC.mp3';

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

const GameContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  will-change: transform;
  transform: translateZ(0);
`;

interface BeatTime {
  time: number;    // 밀리초 단위
  hit?: boolean;   // 이미 판정된 박자인지
  isTarget: boolean; // 실제 판정해야 할 타이밍인지
}

const BPM = 169;
const BEAT_INTERVAL = (60000 / BPM) / 4; // 16분음표 간격 (ms)
const JUDGE_OFFSET = 150; // 판정 범위 (±150ms)
const IMAGE_CHANGE_INTERVAL = 1200; // 이미지 변경 간격 (ms)

// 실제 판정할 타이밍 (밀리초)
const TARGET_BEATS = [
  6080,  // 6.08초
  6430,  // 6.43초
  6790,  // 6.79초
  8920,  // 8.92초
  9275,  // 9.275초
  9630,  // 9.63초
  11760, // 11.76초
  12293, // 12.293초
  12470, // 12.47초
  14600, // 14.6초
  14955, // 14.955초
  15310, // 15.31초
  15666, // 15.666초
  17440, // 17.44초
  17800, // 17.8초
  18155, // 18.155초
  20282, // 20.282초
  20635, // 20.635초
  20992, // 20.992초
  23121, // 23.121초
  23650, // 23.65초
  23830, // 23.83초
  25960, // 25.96초
  26316, // 26.316초
  26670, // 26.67초
  27027, // 27.027초
  28802, // 28.802초
  29512, // 29.512초
  29689, // 29.689초
  31642, // 31.642초
  32352, // 32.352초
  32530, // 32.53초
  34482, // 34.482초
  35015, // 35.015초
  35547, // 35.547초
  37323, // 37.323초
  37676, // 37.676초
  38033, // 38.033초
  38387  // 38.387초
];

const generateBeats = (duration: number): BeatTime[] => {
  const beats: BeatTime[] = [];
  let currentTime = 0;
  
  while (currentTime < duration) {
    beats.push({ 
      time: currentTime,
      isTarget: TARGET_BEATS.includes(currentTime)
    });
    currentTime += BEAT_INTERVAL;
  }
  
  // TARGET_BEATS에 있는 정확한 타이밍도 추가
  TARGET_BEATS.forEach(targetTime => {
    if (!beats.some(beat => Math.abs(beat.time - targetTime) < 1)) {
      beats.push({
        time: targetTime,
        isTarget: true
      });
    }
  });
  
  // 시간 순으로 정렬
  beats.sort((a, b) => a.time - b.time);
  
  return beats;
};

// 콤보 애니메이션
const popIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

interface ComboPositionProps {
  offsetX?: number;  // 가로 오프셋 (px)
  offsetY?: number;  // 세로 오프셋 (px)
  isVisible: boolean;
}

const ComboContainer = styled.div<ComboPositionProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(
    calc(-50% + ${props => props.offsetX ? `${props.offsetX}vw` : '0vw'}),
    calc(-50% + ${props => props.offsetY ? `${props.offsetY}vh` : '0vh'})
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;

  /* 768px 이상의 화면에서는 다른 위치 적용 */
  @media (min-width: 768px) {
    transform: translate(
      calc(-50% + ${props => props.offsetX ? '6.5vw' : '0vw'}),
      calc(-50% + ${props => props.offsetY ? '-14vh' : '0vh'})
    );
  }
`;

const ComboCount = styled.div<{ isIncreasing: boolean }>`
  font-size: clamp(2rem, 5vw, 3.5rem);  // 최소 2rem, 최대 3.5rem, 기본적으로 뷰포트 너비의 5%
  font-weight: bold;
  color: #ff69b4;
  text-shadow: 0.2vw 0.2vw 0.4vw rgba(0, 0, 0, 0.4);
  animation: ${props => props.isIncreasing ? popIn : 'none'} 0.3s ease-out;
`;

const ComboText = styled.div`
  font-size: clamp(1rem, 2.5vw, 1.5rem);  // 최소 1rem, 최대 1.5rem, 기본적으로 뷰포트 너비의 2.5%
  color: rgb(68, 50, 35);
  text-shadow: 0.1vw 0.1vw 0.2vw rgba(0, 0, 0, 0.5);
`;

const SullyoonGame: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentImage, setCurrentImage] = useState(sullyoonStart);
  const [combo, setCombo] = useState(0);
  const [isComboIncreasing, setIsComboIncreasing] = useState(false);
  const [isGameEnding, setIsGameEnding] = useState(false);
  const [canRestart, setCanRestart] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const missRef = useRef<HTMLAudioElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const gameStartTimeRef = useRef<number>(0);
  const beatTimesRef = useRef<BeatTime[]>([]);
  
  // 모바일 기준 위치 (768px 미만에서 적용)
  const comboOffset = { x: 20, y: -10 };  // vw, vh 단위로 변경
  
  // 오디오 객체들 미리 로드
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = 1.0;
    }
    if (missRef.current) {
      missRef.current.load();
      missRef.current.volume = 1.0;
    }
    if (musicRef.current) {
      musicRef.current.load();
      musicRef.current.volume = 0.6;
    }
  }, []);

  // 음악 길이 가져오기 및 박자 생성
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.addEventListener('loadedmetadata', () => {
        const duration = musicRef.current?.duration || 0;
        beatTimesRef.current = generateBeats(duration * 1000); // 밀리초 단위로 변환
      });
    }
  }, []);

  // 배경음악 종료 감지
  useEffect(() => {
    const musicElement = musicRef.current;
    
    const handleMusicEnd = () => {
      // 음악이 끝나도 게임 상태는 유지
      if (!isGameEnding) {
        setIsGameStarted(false);
        setCurrentImage(sullyoonStart);
      }
    };

    if (musicElement) {
      musicElement.addEventListener('ended', handleMusicEnd);
    }

    return () => {
      if (musicElement) {
        musicElement.removeEventListener('ended', handleMusicEnd);
      }
    };
  }, [isGameEnding]);

  // 콤보 증가 애니메이션 효과
  useEffect(() => {
    if (combo > 0) {
      setIsComboIncreasing(true);
      const timer = setTimeout(() => setIsComboIncreasing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [combo]);

  // 게임 종료 체크
  useEffect(() => {
    if (isGameStarted && musicRef.current) {
      const endTimer = setTimeout(() => {
        // 게임 종료 상태로 설정
        setIsGameEnding(true);
        setCanRestart(false);
        setCurrentImage(sullyoonEnd);

        
        // 2초 후 재시작 가능하도록 설정
        setTimeout(() => {
          setCanRestart(true);
          // 여기서도 이미지는 변경하지 않음
        }, 2000);
      }, 39000);

      return () => {
        clearTimeout(endTimer);
      };
    }
  }, [isGameStarted]);

  // 이미지 표시 로직을 분리
  const displayImage = () => {
    if (isGameEnding) {
      return sullyoonEnd;  // 게임 종료 상태면 무조건 설윤05
    }
    return currentImage;  // 그 외에는 현재 이미지
  };

  const startGame = () => {
    if (!isGameStarted && !isGameEnding) {
      setIsGameStarted(true);
      setIsGameEnding(false);
      setCurrentImage(sullyoonDefault);
      setCombo(0);
      gameStartTimeRef.current = Date.now();
      
      // 박자 데이터 초기화
      if (musicRef.current) {
        musicRef.current.currentTime = 0;
        // 박자 데이터 재생성
        beatTimesRef.current = generateBeats(musicRef.current.duration * 1000);
        
        const playPromise = musicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("음악 재생 실패:", error);
            setIsGameStarted(false);
            setCurrentImage(sullyoonStart);
          });
        }
      }
    }
  };

  const handleClick = () => {
    // 게임이 시작되지 않은 상태에서 클릭
    if (!isGameStarted && !isGameEnding) {
      startGame();
      return;
    }

    // 게임 종료 후 재시작 가능한 상태에서 클릭
    if (isGameEnding) {
      if (!canRestart) return; // 2초 동안 재시작 불가
      
      // 게임 종료 상태에서 클릭하면 대기 화면으로
      setCurrentImage(sullyoonStart);  // 먼저 설윤01로 변경
      setIsGameEnding(false);  // 게임 종료 상태 해제
      setIsGameStarted(false); // 게임 시작 상태 해제
      setCombo(0);            // 콤보 초기화
      
      // 음악 초기화
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
      
      return;
    }

    judgeClick();
  };

  const judgeClick = () => {
    // 게임이 종료된 상태면 판정하지 않음
    if (isGameEnding) return;

    const currentTime = Date.now() - gameStartTimeRef.current;
    const beats = beatTimesRef.current;
    
    let closestBeat: BeatTime | null = null;
    let minDiff = Infinity;
    
    for (const beat of beats) {
      if (beat.hit || !beat.isTarget) continue;
      
      const timeDiff = Math.abs(currentTime - beat.time);
      if (timeDiff < minDiff && timeDiff <= JUDGE_OFFSET) {
        minDiff = timeDiff;
        closestBeat = beat;
      }
    }

    if (closestBeat) {
      closestBeat.hit = true;
      setCombo(prev => prev + 1);
      setCurrentImage(sullyoonGood);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      setCombo(0);
      setCurrentImage(sullyoonBad);
      if (missRef.current) {
        missRef.current.currentTime = 0;
        missRef.current.play();
      }
    }

    // 게임이 진행 중이고 종료되지 않은 상태일 때만 기본 이미지로 복귀
    if (!isGameEnding) {
      const timerRef = setTimeout(() => {
        // 타이머 실행 시점에서 게임 종료 상태를 다시 체크
        if (!isGameEnding) {
          setCurrentImage(sullyoonDefault);
        }
      }, IMAGE_CHANGE_INTERVAL);

      // 게임 종료 시점에 실행 중인 타이머 취소를 위한 cleanup
      return () => clearTimeout(timerRef);
    }
  };

  return (
    <GameLayout backgroundColor="#64b5f6">
      <GameTitle>설윤의 애교디펜스 🥰</GameTitle>
      <GameDescription>
        {!isGameStarted ? "클릭하여 게임 시작하기!" : 
        "설윤이 고민한 박자에 맞춰 클릭해서 애교를 보여주세요!"}
      </GameDescription>
      <GameContainer onClick={handleClick}>
        <GameImage 
          src={displayImage()} 
          alt="Sullyoon"
        />
        <ComboContainer 
          isVisible={isGameStarted && !isGameEnding}
          offsetX={comboOffset.x}
          offsetY={comboOffset.y}
        >
          <ComboCount isIncreasing={isComboIncreasing}>
            {combo}
          </ComboCount>
          <ComboText>COMBO!</ComboText>
        </ComboContainer>
        <audio ref={audioRef} src={clickSound} preload="auto" />
        <audio ref={missRef} src={missSound} preload="auto" />
        <audio ref={musicRef} src={backgroundMusic} preload="auto" />
      </GameContainer>
    </GameLayout>
  );
};

export default SullyoonGame; 