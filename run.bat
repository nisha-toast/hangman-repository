@echo off


REM Start Spring Boot Backend

echo Starting Spring Boot Backend...

start cmd /c "cd "(backend) hangman java spring boot" && mvnw.cmd spring-boot:run"


REM Wait a few seconds for backend to start

echo Please wait for the backend to fully start!

timeout /t 20 


REM Start React Frontend

echo Starting React Frontend...

start cmd /c "cd "(frontend) hangman react" && npm run dev"

echo both Frontend and Backend running! :)


REM Instructions to Shutdown Both Servers

echo 1. Press 'Ctrl' + 'C' in the backend terminal, then indicate 'y' or 'yes'.

echo 2. Press 'Ctr' + 'C' in the frontend terminal, then indicate 'y' or 'yes'. 
