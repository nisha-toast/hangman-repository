package com.example.stickman.service;

import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.stickman.beans.GameStatus;

@Service
public class StickmanService {

	private String word;
	private StringBuilder progress;

	@Autowired
	private WordFetcher wordFetcher;

	public StickmanService() {
		this.wordList = new ArrayList<>();
	}

	// added
	private int score;

	private HashSet<Character> guessedLetters;
	private int attemptsLeft;
	private GameStatus gameStatus = new GameStatus();

	//Mutable list of words for the game
	private List<String> wordList;
	
	private List<String> usedWords = new ArrayList<String>(); //
	
	public String getProgress() {
		return progress.toString();
	}

	public int getAttemptsLeft() {
		return attemptsLeft;
	}

//	public String getWord() {
//		if (word == null || wordList.isEmpty()) {
//			return "Error: No game started. Call the api for new game first.";
//		}
//		return "Current word: " + word;
//	}

	// method for starting new game
	public void startNewGame() {
		// Get words from API (cached after first call)
		List<String> fetchedWords = wordFetcher.getWords();
		wordList = new ArrayList<>(fetchedWords);
		Collections.shuffle(wordList);
		this.word = wordList.get(0).toUpperCase(); 
		System.out.println("the word: " + word);
		this.progress = new StringBuilder("*".repeat(word.length()));
		this.guessedLetters = new HashSet<>();
		this.attemptsLeft = 10;
		this.score = 0;

	}

	// indicate game over true or false
	public boolean isGameOver() {
		return attemptsLeft == 0;
	}

	public boolean isGameWon() {
		return score == 5 || wordList.isEmpty();
	}

public boolean isCorrectWord() {
	if (progress == null || word == null) {
		return false;
	}
	return progress.toString().equals(word);
}


	public String makeGuess(char guess) {
		if (guessedLetters.contains(guess)) {
			return "Letter has already been guessed!";
		}

		guessedLetters.add(guess);

		// indexOf() method returns -1 if the value is not found.
		if (word.indexOf(guess) != -1) {
			checkGuess(word, guess);
			if (progress.toString().equals(word)) {
				score += 1;
				usedWords.add(word); //
//				nextWord();
				System.out.println("score:" + score);
				return "The word has been guessed!";
			} else {
				return "Correct guess!";
			}
		} else {
			attemptsLeft--;
			if (attemptsLeft == 0) {
				return "Game over. The word was " + word;
			} else {
				return "Incorrect guess";
			}
		}
	}
	public void nextWord() {
		if (!wordList.isEmpty()) {
			wordList.remove(0); // Safely discard the used word
		}

		if (!wordList.isEmpty()) { // Double-check if a next word actually exists
			this.word = wordList.get(0).toUpperCase();
			this.progress = new StringBuilder("*".repeat(word.length()));
			this.guessedLetters = new HashSet<>();
			this.attemptsLeft = 10;
			System.out.println("The current word: " + word);
			System.out.println("Remaining words: " + wordList);
		} else {
			System.out.println("No more words left");
			this.word = null;
			this.progress = null;
		}
	}

	public void resetScore() {
		score = 0;
	}

	public void checkGuess(String str, char guessed) {
		CharacterIterator it = new StringCharacterIterator(str);

		// Iterate and print current character
		while (it.current() != CharacterIterator.DONE) {
			if (it.current() == guessed) {
				progress.setCharAt(it.getIndex(), guessed);
			}
			// Moving onto next element in the object
			// using next() method
			it.next();
		}

	}

	public String getHangmanFigureState() {
		String[] stages = { "nothing", // 0 incorrect guesses

				"ground", // 1 incorrect guess

				"stand", // 2 incorrect guesses

				"rope", // 3 incorrect guesses

				"hair", // 4 incorrect guesses

				"head", // 5 incorrect guesses

				"body", // 6 incorrect guesses

				"left arm", // 7 incorrect guesses

				"right arm", // 8 incorrect guesses

				"left leg", // 9 incorrect guesses

				"right leg" // 10 incorrect guesses;
		};
		int stageIndex = Math.min(10 - attemptsLeft, stages.length - 1);
//		System.out.println("the stage is: " + stages[stageIndex]);
		return stages[stageIndex];
	}

	public GameStatus resetGame() {
		gameStatus.resetGame();
		return gameStatus;
	}

	public GameStatus getGameState() {
		GameStatus gameStatus = new GameStatus();

		// Check if the game has actually been started yet
		if (this.progress == null) {
			gameStatus.setProgress("");
			gameStatus.setAttemptsLeft(10);
			gameStatus.setGameOver(false);
			gameStatus.setGameWon(false);
			gameStatus.setGuessedLetters(new HashSet<>());
			gameStatus.setWord("");
			gameStatus.setHangmanStateFigure("nothing");
			gameStatus.setScore(0);
			gameStatus.setCorrectWord(false);
			return gameStatus;
		}

		gameStatus.setProgress(progress.toString());
		gameStatus.setAttemptsLeft(attemptsLeft);
		gameStatus.setGameOver(isGameOver());
		gameStatus.setGameWon(isGameWon());
		gameStatus.setGuessedLetters(guessedLetters);
		gameStatus.setWord(word);
		gameStatus.setHangmanStateFigure(getHangmanFigureState());
		gameStatus.setScore(score);
		gameStatus.setCorrectWord(isCorrectWord());

		return gameStatus;
	}
}
