import { useNumGuessor } from "./hooks/useNumGuessor";
import MainMenu from "./components/MainMenu";
import GameScreen from "./components/GameScreen";

export default function App() {
  const { state, startGame, submitGuess, playAgain, returnToMenu } = useNumGuessor();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {state.mode === null ? (
        <MainMenu onSelect={startGame} />
      ) : (
        <GameScreen
          state={state}
          onGuess={submitGuess}
          onPlayAgain={playAgain}
          onReturnMenu={returnToMenu}
        />
      )}
    </main>
  );
}