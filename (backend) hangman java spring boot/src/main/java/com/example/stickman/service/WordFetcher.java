package com.example.stickman.service;

import java.util.Arrays;
import java.util.List;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestClientException;

@Component
public class WordFetcher {

	private final RestTemplate restTemplate;
	private static final String API_URL = "https://random-word-api.herokuapp.com/word?number=10";

	// Fallback words in case API fails
	private static final List<String> FALLBACK_WORDS = Arrays.asList(
			"Pasta", "Bread", "Soup", "Spaghetti",
			"Rice", "Fish", "Curry", "Mountain", "Belief",
			"Drive", "Drives", "Passion", "Service");

	public WordFetcher(RestTemplateBuilder builder) {
		this.restTemplate = builder.build();
	}

	public List<String> getWords() {
		List<String> words = fetchWordsFromApi();
		if (words == null || words.isEmpty()) {
			System.err.println("API call failed or returned empty result. Using fallback words.");
			return FALLBACK_WORDS;
		}
		return words;
	}

	/**
	 * Fetches words from the API. Returns null if API call fails.
	 */
	private List<String> fetchWordsFromApi() {
		try {
			System.out.println("Fetching fresh words from API: " + API_URL);
			String[] words = restTemplate.getForObject(API_URL, String[].class);
			if (words != null && words.length > 0) {
				System.out.println("Fetched " + words.length + " words from API");
			}
			return words != null ? Arrays.asList(words) : null;
		} catch (RestClientException e) {
			System.err.println("Failed to fetch words from API: " + e.getMessage());
			return null;
		}
	}
}