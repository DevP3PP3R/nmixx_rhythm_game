import 'package:flutter/material.dart';
import 'src/game/game0_test.dart'; // Game 1 릴리 import

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NMIXX Rhythm Game',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const GameMenu(), // 메인 화면을 GameMenu로 설정
    );
  }
}

class GameMenu extends StatelessWidget {
  const GameMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('NMIXX Rhythm Game'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const Game0Test()),
                );
              },
              child: const Text('테스트게임'),
            ),
            // 다른 게임 버튼도 추가할 수 있음
          ],
        ),
      ),
    );
  }
}
