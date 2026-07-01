package com.example.stickman.service;

import java.text.CharacterIterator;
import java.text.StringCharacterIterator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

import com.example.stickman.beans.GameStatus;

public class GameSession {

    private String word;
    private StringBuilder progress;
    private Set<Character> guessedLetters;
    private int attemptsLeft;
    private int score;
    private List<String> wordList;
    private List<String> usedWords = new ArrayList<>();

    public GameSession() {
    }

    public void startNewGame(List<String> fetchedWords) {
        this.wordList = new ArrayList<>(fetchedWords);
        Collections.shuffle(this.wordList);
        this.word = this.wordList.get(0).toUpperCase();
        this.progress = new StringBuilder("*".repeat(word.length()));
        this.guessedLetters = new HashSet<>();
        this.attemptsLeft = 10;
        this.score = 0;
        System.out.println("[HANGMAN] New game started. Current word: " + this.word);
    }

    public boolean isGameOver() {
        return attemptsLeft == 0;
    }

    public boolean isCorrectWord() {
        if (progress == null || word == null) return false;
        return progress.toString().equals(word);
    }

    public boolean isGameWon() {
        return score == 5 || (wordList != null && wordList.isEmpty());
    }

    public String makeGuess(char guess) {
        if (guessedLetters.contains(guess)) {
            return "Letter has already been guessed!";
        }

        guessedLetters.add(guess);

        if (word.indexOf(guess) != -1) {
            checkGuess(word, guess);
            if (progress.toString().equals(word)) {
                score += 1;
                usedWords.add(word);
                return "The word has been guessed!";
            } else {
                return "Correct guess!";
            }
        } else {
            attemptsLeft--;
            if (attemptsLeft == 0) {
                System.out.println("[HANGMAN] Game over. The word was: " + word);
                return "Game over. The word was " + word;
            } else {
                return "Incorrect guess";
            }
        }
    }

    public void nextWord() {
        if (wordList != null && !wordList.isEmpty()) {
            wordList.remove(0);
        }

        if (wordList != null && !wordList.isEmpty()) {
            this.word = wordList.get(0).toUpperCase();
            this.progress = new StringBuilder("*".repeat(word.length()));
            this.guessedLetters = new HashSet<>();
            this.attemptsLeft = 10;
            System.out.println("[HANGMAN] Moving to next word: " + this.word);
        } else {
            this.word = null;
            this.progress = null;
        }
    }

    private void checkGuess(String str, char guessed) {
        CharacterIterator it = new StringCharacterIterator(str);
        while (it.current() != CharacterIterator.DONE) {
            if (it.current() == guessed) {
                progress.setCharAt(it.getIndex(), guessed);
            }
            it.next();
        }
    }

    public String getHangmanFigureState() {
        String[] stages = { "nothing", "ground", "stand", "rope", "hair", "head", "body", "left arm",
                "right arm", "left leg", "right leg" };
        int stageIndex = Math.min(10 - attemptsLeft, stages.length - 1);
        return stages[stageIndex];
    }

    public GameStatus toGameStatus() {
        GameStatus gameStatus = new GameStatus();
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

