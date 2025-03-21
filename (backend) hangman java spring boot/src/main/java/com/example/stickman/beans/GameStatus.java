package com.example.stickman.beans;
import java.util.HashSet;

public class GameStatus {
	private String progress;
	private int attemptsLeft;
	private boolean gameOver;
	private String hangmanStateFigure;
	private String word;
	private HashSet<Character> guessedLetters;
	
	//added
	private boolean gameWon;
	private boolean correctWord;
	private int score;
	
	public boolean isGameWon() {
		return gameWon;
	}

	public void setGameWon(boolean gameWon) {
		this.gameWon = gameWon;
	}
	
	public void setProgress(String progress) {
		this.progress = progress;
	}

	public void setAttemptsLeft(int attemptsLeft) {
		this.attemptsLeft = attemptsLeft;
	}

	public void setGameOver(boolean gameOver) {
		this.gameOver = gameOver;
	}

	public void setHangmanStateFigure(String hangmanStateFigure) {
		this.hangmanStateFigure = hangmanStateFigure;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public void setGuessedLetters(HashSet<Character> guessedLetters) {
		this.guessedLetters = guessedLetters;
	}

	public HashSet<Character> getGuessedLetters() {
		return guessedLetters;
	}

	public String getWord() {
		return word;
	}

	public String getProgress() {
		return progress;
	}

	public int getAttemptsLeft() {
		return attemptsLeft;
	}

	public boolean isGameOver() {
		return gameOver;
	}

	public String getHangmanFigureState() {
		return hangmanStateFigure;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	
	public void resetGame() {
		guessedLetters.clear();
		progress = "";
		attemptsLeft = 10;
		gameOver = false;
		hangmanStateFigure = "nothing";
		score = 0;
	}

	public boolean isCorrectWord() {
		return correctWord;
	}

	public void setCorrectWord(boolean correctWord) {
		this.correctWord = correctWord;
	}
}