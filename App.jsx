import React from "react";

/**
 * Project planning:
 *
 * Questions to ask yourself before writing any code:
 *
 * - What are the main containers of elements I need
 *   in this app?
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 * - How will the user interact with the app? What
 *   events do I need to handle?
 */

export default function AssemblyEndgame() {
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
    </main>
  );
}
