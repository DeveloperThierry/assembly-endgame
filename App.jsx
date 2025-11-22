import React, {useState} from "react";
import { languages } from "./languages";
import clsx from 'clsx'
export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('protein')
  const alphabet = "qwertyuiopasdfghjklzxcvbnm"
  const [guessedLetters, setGuessedLetters] = useState([])

  function addGuessedLetter(letter){
    setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter])
    console.log(guessedLetters)
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
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">
        {languages.map((lang) => {
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color,
          };
          return (
            <span className="chip" style={styles} key={lang.name}>
              {lang.name}
            </span>
          );
        })}
      </section>
      <section className="word">
        {currentWord.split('').map((letter, index)=>
            <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ''}</span>
        )}
      </section>
      <section className="keyboard">
        {alphabet.split('').map((letter)=> {
            const isGuessed = guessedLetters.includes(letter)
            const isCorrect = isGuessed &&currentWord.includes(letter)
            const isWrong = isGuessed &&!currentWord.includes(letter)
            const className = clsx({
                correct: isCorrect,
                wrong: isWrong,
            })
            return (<button key={letter}
        onClick={() => addGuessedLetter(letter)}
        className={className}
        >{letter.toUpperCase()}</button>)})}
      </section>
      <button className="new-game">New Game</button>
    </main>
  );
}
