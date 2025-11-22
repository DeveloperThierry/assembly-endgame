import React, {useState} from "react";
import { languages } from "./languages";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('Protein')
  const alphabet = "qwertyuiopasdfghjklzxcvbnm"
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
            <span key={index}>{letter.toUpperCase()}</span>
        )}
      </section>
      <section className="keyboard">
        {alphabet.split('').map((letter)=> <button key={letter}>{letter.toUpperCase()}</button>)}
      </section>
      <button className="new-game">New Game</button>
    </main>
  );
}
