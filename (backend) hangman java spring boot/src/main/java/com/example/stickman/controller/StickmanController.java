package com.example.stickman.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.stickman.beans.GameStatus;
import com.example.stickman.service.StickmanService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/hangman")
public class StickmanController {

	@Autowired
	private StickmanService stickmanService;
//	private GameStatus gameStatus;
	
	//Inject service
	public StickmanController(StickmanService stickmanService) {
		this.stickmanService = stickmanService;
	}

	//Game current state
	@GetMapping("/status")
	public ResponseEntity<GameStatus> getStatus(){
		GameStatus gameStatus = stickmanService.getGameState();
		return ResponseEntity.ok(gameStatus);
	}

	@PostMapping("/guess")
	public ResponseEntity<String> guessLetter(@RequestParam char guess){
		String response = stickmanService.makeGuess(guess);
		
		if (stickmanService.isGameOver()) {
			return ResponseEntity.ok(response);
		}
		System.out.println(response);
		
//		GameStatus gameStatus = stickmanService.getGameState();
//		return ResponseEntity.ok(response + "Current status: " + gameStatus.getProgress());
		return ResponseEntity.ok(response);
	}

	@PostMapping("/start")
	public ResponseEntity<String> startNewGame() {
		stickmanService.startNewGame();
		return ResponseEntity.ok("New game started!");
	}
	
	@GetMapping("/guessed-letters")
	public Set<Character> getGuessedLetters(){
		return stickmanService.getGameState().getGuessedLetters();
	}
	
//	@PostMapping("/reset")
//	public GameStatus resetGame() {
//		return stickmanService.resetGame();
//	}
	
	@PostMapping("/reset-game")
	public ResponseEntity<String> resetGame() {
		stickmanService.resetScore();
		stickmanService.startNewGame();
		return ResponseEntity.ok("New game has started!");
	}
	
	//Next word
	@PostMapping("/next")
	public ResponseEntity<GameStatus> nextWord(){
		stickmanService.nextWord();
		stickmanService.isCorrectWord();
		System.out.println("in next word mapping");
		GameStatus gameStatus = stickmanService.getGameState();
		return ResponseEntity.ok(gameStatus);
	}
}


/* 
 * POSTMAN

//starting a new game
POST -- http://localhost:8091/api/hangman/start

//getting the game status
GET -- http://localhost:8091/api/hangman/status

//making a guess
POST -- http://localhost:8091/api/hangman/guess?guess=a
#you type guess as KEY and a as VALUE
 * 
 * 
 * 
 * */
