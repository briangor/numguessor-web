import {
    useState,
    useRef,
    useEffect,
    useCallback,
    type KeyboardEvent,
} from "react";
import type { GameState } from "../types/game";
import { MAX_ATTEMPTS, MIN_NUMBER, MAX_NUMBER } from "../constants/game";
import styles from "../styles/GameScreen.module.css";

interface Props {
    state: GameState;
    onGuess: (n: number) => void;
    onPlayAgain: () => void;
    onReturnMenu: () => void;
}

export default function GameScreen({
    state,
    onGuess,
    onPlayAgain,
    onReturnMenu,
}: Props) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [shaking, setShaking] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    // Focus input while playing
    useEffect(() => {
        if (state.status === "playing") inputRef.current?.focus();
    }, [state.status, state.attemptsUsed]);

    // Clear input after each guess
    useEffect(() => {
        setInput("");
        setError("");
    }, [state.guessHistory.length]);

    // Auto-scroll history to bottom
    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [state.guessHistory.length]);

    const triggerShake = useCallback(() => {
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
    }, []);

    const handleSubmit = useCallback(() => {
        const trimmed = input.trim().toLowerCase();

        if (trimmed === "quit") {
            onReturnMenu();
            return;
        }

        const num = parseInt(trimmed, 10);

        if (isNaN(num)) {
            setError(`"${trimmed}" is not a valid number.`);
            triggerShake();
            return;
        }

        if (num < MIN_NUMBER || num > MAX_NUMBER) {
            setError(`Number must be between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
            triggerShake();
            return;
        }

        setError("");
        onGuess(num);
    }, [input, onGuess, onReturnMenu, triggerShake]);

    const handleKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSubmit();
    }, [handleSubmit]);

    const isPlaying = state.status === "playing";
    const isWon = state.status === "won";
    const isLost = state.status === "lost";
    const attLeft = MAX_ATTEMPTS - state.attemptsUsed;

    return (
        <div className={styles.container}>

            {/* Top bar */}
            <div className={styles.topBar}>
                <button className={styles.backBtn} onClick={onReturnMenu}>
                    ← MENU
                </button>
                <span className={styles.modeTag}>
                    {state.mode === "limited" ? "LIMITED MODE" : "UNLIMITED MODE"}
                    {state.mode === "unlimited" && (
                        <span> · ROUND {state.round}</span>
                    )}
                </span>
            </div>

            <hr className={styles.divider} />

            {/* Attempt dots */}
            <div className={styles.attempts}>
                <span className={styles.attemptsLabel}>ATTEMPTS</span>
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.dot} ${i < state.attemptsUsed ? styles.dotUsed : styles.dotEmpty}`}
                    >
                        {i < state.attemptsUsed ? "●" : "○"}
                    </span>
                ))}
                {isPlaying && (
                    <span className={`${styles.attemptsLeft} ${attLeft === 1 ? styles.lastChance : ""}`}>
                        {attLeft === 1 ? "⚠ LAST CHANCE" : `${attLeft} left`}
                    </span>
                )}
            </div>

            {/* Guess history */}
            {state.guessHistory.length > 0 && (
                <div className={styles.history} ref={historyRef}>
                    {state.guessHistory.map((g, i) => (
                        <div key={i} className={styles.historyRow}>
                            <span className={styles.historyIdx}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className={styles.historyValue}>{g.value}</span>
                            <span className={
                                g.hint === "correct" ? styles.hintCorrect :
                                    g.hint === "higher" ? styles.hintHigher :
                                        styles.hintLower
                            }>
                                {g.hint === "correct" ? "✓ CORRECT"
                                    : g.hint === "higher" ? "↑ HIGHER"
                                        : "↓ LOWER"}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Status message */}
            {state.message && (
                <p className={`${styles.message} ${isWon ? styles.messageWon : isLost ? styles.messageLost : ""}`}>
                    {isWon && "✓ "}
                    {isLost && "✗ "}
                    {state.message}
                </p>
            )}

            {/* Input — only while playing */}
            {isPlaying && (
                <div className={`${styles.inputWrapper} ${shaking ? styles.shaking : ""}`}>
                    <div className={styles.inputRow}>
                        <span className={styles.prompt}>›</span>
                        <input
                            ref={inputRef}
                            type="number"
                            className={styles.input}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            placeholder={`${MIN_NUMBER}–${MAX_NUMBER} or "quit"`}
                        />
                        <button className={styles.submitBtn} onClick={handleSubmit}>
                            ENTER
                        </button>
                    </div>

                    {error && <p className={styles.inputError}>{error}</p>}

                    <p className={styles.inputHint}>
                        Type <span>quit</span> to return to menu
                    </p>
                </div>
            )}

            {/* End-game actions */}
            {(isWon || isLost) && (
                <div className={styles.actions}>
                    <button
                        className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                        onClick={onPlayAgain}
                    >
                        PLAY AGAIN
                    </button>
                    <button
                        className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
                        onClick={onReturnMenu}
                    >
                        MAIN MENU
                    </button>
                </div>
            )}

        </div>
    );
}