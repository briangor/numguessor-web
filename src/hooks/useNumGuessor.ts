import { useState, useCallback } from "react";
import { MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS } from "../constants/game";
import type { GameMode, GameState, GuessRecord } from "../types/game";

// ============================================================================
// HELPERS
// ============================================================================
function randomNumber(): number {
    return MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1));
}

const INITIAL_STATE: GameState = {
    mode: null,
    status: "idle",
    secretNumber: randomNumber(),
    attemptsUsed: 0,
    totalAttempts: 0,
    round: 1,
    guessHistory: [],
    message: "",
};

// ============================================================================
// HOOK
// ============================================================================
export function useNumGuessor() {

    const [state, setState] = useState<GameState>(INITIAL_STATE);

    // --------------------------------------------------------------------------
    // Start a game in a given mode
    // --------------------------------------------------------------------------
    const startGame = useCallback((mode: GameMode) => {
        setState({
            mode,
            status: "playing",
            secretNumber: randomNumber(),
            attemptsUsed: 0,
            totalAttempts: 0,
            round: 1,
            guessHistory: [],
            message: "",
        });
    }, []);

    // --------------------------------------------------------------------------
    // Submit a guess
    // --------------------------------------------------------------------------
    const submitGuess = useCallback((guess: number) => {
        setState(prev => {
            if (prev.status !== "playing") return prev;

            const newAttempts = prev.attemptsUsed + 1;
            const totalAttempts = prev.totalAttempts + 1;
            const isLastAttempt = newAttempts === MAX_ATTEMPTS;

            // Correct guess — win regardless of mode
            if (guess === prev.secretNumber) {
                return {
                    ...prev,
                    status: "won",
                    attemptsUsed: newAttempts,
                    totalAttempts,
                    guessHistory: [
                        ...prev.guessHistory,
                        { value: guess, hint: "correct" } as GuessRecord,
                    ],
                    message: `You guessed it in ${totalAttempts} attempt${totalAttempts === 1 ? "" : "s"}!`,
                };
            }

            const hint: GuessRecord["hint"] = guess < prev.secretNumber ? "higher" : "lower";
            const newHistory: GuessRecord[] = [...prev.guessHistory, { value: guess, hint }];

            // Last attempt — depends on mode
            if (isLastAttempt) {

                // Limited → loss
                if (prev.mode === "limited") {
                    return {
                        ...prev,
                        status: "lost",
                        attemptsUsed: newAttempts,
                        totalAttempts,
                        guessHistory: newHistory,
                        message: `Out of attempts! The number was ${prev.secretNumber}.`,
                    };
                }

                // Unlimited → new round, keep playing
                return {
                    ...prev,
                    attemptsUsed: 0,
                    totalAttempts,
                    round: prev.round + 1,
                    guessHistory: newHistory,
                    message: `Round ${prev.round} over — ${MAX_ATTEMPTS} more attempts!`,
                };
            }

            // Normal in-progress guess
            const remaining = MAX_ATTEMPTS - newAttempts;
            const hintMsg =
                hint === "higher"
                    ? `Higher than ${guess} — ${remaining} attempt${remaining === 1 ? "" : "s"} left.`
                    : `Lower than ${guess} — ${remaining} attempt${remaining === 1 ? "" : "s"} left.`;

            return {
                ...prev,
                attemptsUsed: newAttempts,
                totalAttempts,
                guessHistory: newHistory,
                message: hintMsg,
            };
        });
    }, []);

    // --------------------------------------------------------------------------
    // Play again — reset but keep mode
    // --------------------------------------------------------------------------
    const playAgain = useCallback(() => {
        setState(prev => ({
            mode: prev.mode,
            status: "playing",
            secretNumber: randomNumber(),
            attemptsUsed: 0,
            totalAttempts: 0,
            round: 1,
            guessHistory: [],
            message: "",
        }));
    }, []);

    // --------------------------------------------------------------------------
    // Return to main menu
    // --------------------------------------------------------------------------
    const returnToMenu = useCallback(() => {
        setState(prev => ({ ...prev, mode: null, status: "idle" }));
    }, []);

    return { state, startGame, submitGuess, playAgain, returnToMenu };
}