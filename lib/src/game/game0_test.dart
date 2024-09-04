import 'package:flutter/material.dart';
import 'dart:async'; // Timer를 사용하기 위한 패키지
import 'dart:html'; // 웹 전용 API

class Game0Test extends StatefulWidget {
  const Game0Test({super.key});

  @override
  Game0TestState createState() => Game0TestState();
}

class Game0TestState extends State<Game0Test> {
  String currentImage = 'assets/img/test01.jpg'; // 기본 이미지
  Timer? _longPressTimer;
  bool _isLongPress = false; // 길게 눌렀는지 여부를 체크
  final int longPressThreshold = 80; // 길게 누르기 임계값 (80ms)

  // 짧게 누를 때 이미지 변경 및 사운드 재생 (80ms 미만)
  void handleShortPress() {
    setState(() {
      currentImage = 'assets/img/test02.jpg'; // 짧게 터치한 경우 이미지 변경
    });

    playSound('assets/sfx/test01.wav'); // 짧게 눌렀을 때 사운드 재생

    Future.delayed(const Duration(milliseconds: 200), () {
      // 200ms 후 원래 이미지로 복구
      if (!_isLongPress) {
        setState(() {
          currentImage = 'assets/img/test01.jpg';
        });
      }
    });
  }

  // 길게 누를 때 이미지 변경 및 사운드 재생 (길게 누르기 시작)
  void handleLongPressStart() {
    setState(() {
      currentImage = 'assets/img/test03.jpg'; // 길게 눌렀을 때 이미지 변경
    });
    playSound('assets/sfx/test02.wav'); // 길게 눌렀을 때 사운드 재생
    _isLongPress = true;
  }

  // 길게 누르기 후 손을 뗄 때 이벤트 처리
  void handleLongPressEnd() {
    setState(() {
      currentImage = 'assets/img/test01.jpg'; // 손을 떼면 원래 이미지로 복귀
    });
    _isLongPress = false;
  }

  // 터치가 시작될 때
  void handleTouchDown() {
    _isLongPress = false; // 길게 누르기 여부 초기화

    // 80ms 이상이면 길게 누른 것으로 간주
    _longPressTimer = Timer(Duration(milliseconds: longPressThreshold), () {
      if (!_isLongPress) {
        handleLongPressStart(); // 80ms 후 길게 눌렀으면 이미지 변경
      }
    });
  }

  // 터치가 끝날 때 (짧게 눌렀을 때 or 길게 눌렀을 때)
  void handleTouchUp() {
    if (_longPressTimer != null) {
      _longPressTimer!.cancel(); // 타이머 취소
    }

    if (_isLongPress) {
      // 길게 눌렀다면 길게 누르기 종료 처리
      handleLongPressEnd();
    } else {
      // 짧게 눌렀다면 짧은 터치로 간주
      handleShortPress();
    }
  }

  void playSound(String filePath) {
    final AudioElement audio = AudioElement(filePath);
    audio.play();
  }

  @override
  void dispose() {
    _longPressTimer?.cancel(); // 타이머를 안전하게 취소
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('터치 테스트'),
      ),
      body: GestureDetector(
        onTapDown: (details) {
          handleTouchDown(); // 터치 시작 시 이벤트
        },
        onTapUp: (details) {
          handleTouchUp(); // 터치 종료 시 이벤트
        },
        onTapCancel: () {
          handleTouchUp(); // 터치 취소 시에도 처리
        },
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                '박자를 맞춰서 구현 예정',
                style: TextStyle(fontSize: 24),
              ),
              const SizedBox(height: 20),
              Image.asset(currentImage, width: 300, height: 300), // 이미지
              const SizedBox(height: 20),
              const Text(
                '화면을 터치하세요',
                style: TextStyle(fontSize: 18),
              )
            ],
          ),
        ),
      ),
    );
  }
}
