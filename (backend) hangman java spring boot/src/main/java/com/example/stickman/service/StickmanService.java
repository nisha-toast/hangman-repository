package com.example.stickman.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.stickman.beans.GameStatus;

@Service
public class StickmanService {

	@Autowired
	private WordFetcher wordFetcher;

	// Store sessions keyed by a generated UUID. This keeps state isolated per
	// game/session while the controller and service surface stateless APIs.
	private final Map<String, GameSession> sessions = new ConcurrentHashMap<>();

	public String createSession() {
		List<String> fetchedWords = wordFetcher.getWords();
		GameSession session = new GameSession();
		session.startNewGame(fetchedWords);
		String id = UUID.randomUUID().toString();
		sessions.put(id, session);
		return id;
	}

	public GameStatus getGameState(String sessionId) {
		GameSession session = sessions.get(sessionId);
		if (session == null) {
			// Return an empty/default status when session missing
			return new GameSession().toGameStatus();
		}
		return session.toGameStatus();
	}

	public String makeGuess(String sessionId, char guess) {
		GameSession session = sessions.get(sessionId);
		if (session == null) return "Invalid session";
		return session.makeGuess(guess);
	}

	public void nextWord(String sessionId) {
		GameSession session = sessions.get(sessionId);
		if (session == null) return;
		session.nextWord();
	}

	public void resetScore(String sessionId) {
		GameSession session = sessions.get(sessionId);
		if (session == null) return;
		// reset score by recreating the session words or resetting counter
		// For now start a new game to reset state
		session.startNewGame(wordFetcher.getWords());
	}

	public boolean isGameOver(String sessionId) {
		GameSession session = sessions.get(sessionId);
		return session == null ? true : session.isGameOver();
	}

	public boolean isCorrectWord(String sessionId) {
		GameSession session = sessions.get(sessionId);
		return session == null ? false : session.isCorrectWord();
	}
}
