# Hangman with ReactJS and Java SpringBoot

This is a work in progress. A simple Hangman game with a backend built using Java Spring Boot and a frontend using ReactJS.

## Steps to Run Locally

1. **Download the Project Folders:**
   - Download or clone the two folders:
     - `backend` (Java Spring Boot)
     - `frontend` (ReactJS)
   
2. **Set Up the Backend (Spring Boot):**
   - Import the `backend` folder as a Maven project into your preferred Java IDE (e.g., Eclipse, IntelliJ IDEA).
   - In the Java IDE, run the project with Maven build, using the goal: 
     ```bash
     mvn spring-boot:run
     ```

3. **Set Up the Frontend (ReactJS):**
   - Import the `frontend` folder into an IDE compatible with React (e.g., Visual Studio Code).
   - Open the terminal in the frontend directory and run:
     ```bash
     npm install
     npm run dev
     ```

4. **Run the Game:**
   - Once both the backend and frontend are running, the game should be accessible at:
     - `http://localhost:5714`

## Features
- A simple Hangman game with a reactive UI built with ReactJS.
- A Spring Boot backend to manage game state and logic.


## Screenshot

![Hangman Game Screenshot](./images/hangman-screenshot.png)


## Suggestions for Future Work
- Add more features like word submission.
- Instead of a simple array of words, use an API to take words from elsewhere, or allow users to submit words and add to a database instead.
- Improve UI with animations or visual effects for the Hangman figure.
- Expand game functionality (e.g., multiple difficulty levels, more word categories).

