import React, { useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";
export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("protein");
  const alphabet = "qwertyuiopasdfghjklzxcvbnm";
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
  });
  return (
    <main>
      <header>
        Assembly: Endgame
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from assembly
        </p>
      </header>
      <section className={gameStatusClass}>
        {isGameOver ? (
          <>
            {isGameWon ?
           ( <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>):
            (<>
              <h2>You lose!</h2>
              <p>Better start learning assembly! ☠️</p>
            </>)}
          </>
        ) : null}
      </section>
      <section className="language-chips">
        {languages.map((lang, index) => {
          const isLanguageLost = index < wrongGuessCount;
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color,
          };
          const className = clsx("chip", isLanguageLost ? "lost" : "");
          return (
            <span className={className} style={styles} key={lang.name}>
              {lang.name}
            </span>
          );
        })}
      </section>
      <section className="word">
        {currentWord.split("").map((letter, index) => (
          <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
          </span>
        ))}
      </section>
      <section className="keyboard">
        {alphabet.split("").map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          const isWrong = isGuessed && !currentWord.includes(letter);
          const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
          });
          return (
            <button
              key={letter}
              onClick={() => addGuessedLetter(letter)}
              className={className}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
