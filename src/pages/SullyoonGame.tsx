import React, { useState, useRef, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import styled from 'styled-components';
import sullyoonStart from '../games/sullyoon/설윤01.png';
import sullyoonDefault from '../games/sullyoon/설윤02.png';
import sullyoonGood from '../games/sullyoon/설윤03.png';
import sullyoonBad from '../games/sullyoon/설윤04.png';
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
`;

interface BeatTime {
  time: number;    // 밀리초 단위
  hit?: boolean;   // 이미 판정된 박자인지
  isTarget: boolean; // 실제 판정해야 할 타이밍인지
}

const BPM = 169;
const BEAT_INTERVAL = (60000 / BPM) / 4; // 16분음표 간격 (ms)
const JUDGE_OFFSET = 150; // 판정 범위 (±150ms)

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

const SullyoonGame: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentImage, setCurrentImage] = useState(sullyoonStart);
  const audioRef = useRef<HTMLAudioElement>(null);
  const missRef = useRef<HTMLAudioElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const gameStartTimeRef = useRef<number>(0);
  const beatTimesRef = useRef<BeatTime[]>([]);
  
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
      setIsGameStarted(false);
      setCurrentImage(sullyoonStart);
    };

    if (musicElement) {
      musicElement.addEventListener('ended', handleMusicEnd);
    }

    return () => {
      if (musicElement) {
        musicElement.removeEventListener('ended', handleMusicEnd);
      }
    };
  }, []);

  const startGame = () => {
    if (!isGameStarted) {
      setIsGameStarted(true);
      setCurrentImage(sullyoonDefault);
      gameStartTimeRef.current = Date.now();
      if (musicRef.current) {
        musicRef.current.currentTime = 0;
        const playPromise = musicRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("음악 재생 실패:", error);
          });
        }
      }
    }
  };

  const judgeClick = () => {
    const currentTime = Date.now() - gameStartTimeRef.current;
    const beats = beatTimesRef.current;
    
    // 가장 가까운 타겟 박자 찾기
    let closestBeat: BeatTime | null = null;
    let minDiff = Infinity;
    
    for (const beat of beats) {
      if (beat.hit || !beat.isTarget) continue; // 이미 판정됐거나 타겟 박자가 아니면 스킵
      
      const timeDiff = Math.abs(currentTime - beat.time);
      if (timeDiff < minDiff && timeDiff <= JUDGE_OFFSET) {
        minDiff = timeDiff;
        closestBeat = beat;
      }
    }

    // 판정
    if (closestBeat) {
      // 박자 성공 (±50ms 이내)
      closestBeat.hit = true;
      requestAnimationFrame(() => {
        setCurrentImage(sullyoonGood);
      });
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      // 박자 실패
      requestAnimationFrame(() => {
        setCurrentImage(sullyoonBad);
      });
      if (missRef.current) {
        missRef.current.currentTime = 0;
        missRef.current.play();
      }
    }

    // 이미지 복구
    setTimeout(() => {
      requestAnimationFrame(() => {
        setCurrentImage(sullyoonDefault);
      });
    }, 800);
  };

  const handleClick = () => {
    if (!isGameStarted) {
      startGame();
      return;
    }

    judgeClick();
  };

  return (
    <GameLayout backgroundColor="#64b5f6">
      <GameTitle>설윤의 애교요청 견디기 🥰</GameTitle>
      <GameDescription>
        {!isGameStarted ? "클릭하여 게임 시작하기!" : 
        "설윤이 고민한 박자에 맞춰 클릭해서 애교를 보여주세요!"}
      </GameDescription>
      <GameContainer 
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <GameImage 
          src={currentImage} 
          alt="Sullyoon"
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        />
        <audio ref={audioRef} src={clickSound} preload="auto" />
        <audio ref={missRef} src={missSound} preload="auto" />
        <audio ref={musicRef} src={backgroundMusic} preload="auto" />
      </GameContainer>
    </GameLayout>
  );
};

export default SullyoonGame; 