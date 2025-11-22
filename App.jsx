import React, { useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";
import {getRandomWord} from './utils.js'
export default function AssemblyEndgame() {

  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const alphabet = "qwertyuiopasdfghjklzxcvbnm";
  const [guessedLetters, setGuessedLetters] = useState([]);
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const numGuessesLeft = languages.length - 1;
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

  function startNewGame(){
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }
  return (
    <main>
      <header>
        Assembly: Endgame
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from assembly
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {isGameOver ? (
          <>
            {isGameWon ? (
              <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
              </>
            ) : (
              <>
                <h2>You lose!</h2>
                <p>Better start learning assembly! ☠️</p>
              </>
            )}
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
        {currentWord.split("").map((letter, index) => {
            const shouldRevealLetter = guessedLetters.includes(letter) || isGameLost
            const letterClassName=clsx(
                isGameLost && !guessedLetters.includes(letter) && "missed-letter"
            )
            return(
          <span key={index} className={letterClassName}>
            {shouldRevealLetter ? letter.toUpperCase() : ""}
          </span>
        )})}
      </section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank"
            )
            .join(" ")}
        </p>
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
              aria-label={`Letter ${letter}`}
              aria-disabled={guessedLetters.includes(letter)}
              disabled={isGameOver}
              key={letter}
              onClick={() => addGuessedLetter(letter)}
              className={className}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>
      {isGameOver && <button  onClick={()=>startNewGame()} className="new-game">New Game</button>}
    </main>
  );
}
