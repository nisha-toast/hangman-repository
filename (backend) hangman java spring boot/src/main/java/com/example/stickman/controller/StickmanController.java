package com.example.stickman.controller;


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
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/api/hangman")
public class StickmanController {

	@Autowired
	private StickmanService stickmanService;

	// Create a new per-link game/session and return its id
	@PostMapping("/games")
	public ResponseEntity<String> createGame() {
		String id = stickmanService.createSession();
		return ResponseEntity.ok(id);
	}

	// Game current state for a particular session id
	@GetMapping("/games/{id}/status")
	public ResponseEntity<GameStatus> getStatus(@org.springframework.web.bind.annotation.PathVariable String id){
		GameStatus gameStatus = stickmanService.getGameState(id);
		return ResponseEntity.ok(gameStatus);
	}

	@PostMapping("/games/{id}/guess")
	public ResponseEntity<String> guessLetter(@org.springframework.web.bind.annotation.PathVariable String id, @RequestParam char guess){
		String response = stickmanService.makeGuess(id, guess);
		if (stickmanService.isGameOver(id)) {
			return ResponseEntity.ok(response);
		}
		System.out.println(response);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/games/{id}/reset")
	public ResponseEntity<String> resetGame(@org.springframework.web.bind.annotation.PathVariable String id) {
		stickmanService.resetScore(id);
		return ResponseEntity.ok("New game has started!");
	}

	//Next word for a session id
	@PostMapping("/games/{id}/next")
	public ResponseEntity<GameStatus> nextWord(@org.springframework.web.bind.annotation.PathVariable String id){
		stickmanService.nextWord(id);
		GameStatus gameStatus = stickmanService.getGameState(id);
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
