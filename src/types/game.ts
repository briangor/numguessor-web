export type GameMode = "limited" | "unlimited";
export type GameStatus = "idle" | "playing" | "won" | "lost";
export type GuessHint = "higher" | "lower" | "correct";

export interface GuessRecord {
    value: number;
    hint: GuessHint;
}

export interface GameState {
    mode: GameMode | null;
    status: GameStatus;
    secretNumber: number;
    attemptsUsed: number;
    totalAttempts: number;
    round: number;
    guessHistory: GuessRecord[];
    message: string;
}