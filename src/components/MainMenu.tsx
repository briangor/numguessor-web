import type { GameMode } from "../types/game";
import { MAX_ATTEMPTS } from "../constants/game";
import styles from "../styles/MainMenu.module.css";

interface Props {
    onSelect: (mode: GameMode) => void;
}

export default function MainMenu({ onSelect }: Props) {
    return (
        <div className={styles.container}>

            {/* ASCII header */}
            <div className={styles.ascii}>
                <pre className={styles.asciiPre}>
                    {`███╗   ██╗██╗   ██╗███╗   ███╗
████╗  ██║██║   ██║████╗ ████║
██╔██╗ ██║██║   ██║██╔████╔██║
██║╚██╗██║██║   ██║██║╚██╔╝██║
██║ ╚████║╚██████╔╝██║ ╚═╝ ██║
╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝
 ██████╗ ██╗   ██╗███████╗███████╗███████╗ ██████╗ ██████╗ 
██╔════╝ ██║   ██║██╔════╝██╔════╝██╔════╝██╔═══██╗██╔══██╗
██║  ███╗██║   ██║█████╗  ███████╗███████╗██║   ██║██████╔╝
██║   ██║██║   ██║██╔══╝  ╚════██║╚════██║██║   ██║██╔══██╗
╚██████╔╝╚██████╔╝███████╗███████║███████║╚██████╔╝██║  ██║
 ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝`}
                </pre>
            </div>

            <hr className={styles.divider} />

            {/* Intro */}
            <p className={styles.intro}>
                The Elder Gods have chosen a number between{" "}
                <span>1</span> and <span>100</span>.{" "}
                Your task is to find it before your attempts run out.
            </p>

            {/* Mode selection */}
            <div>
                <p className={styles.modeLabel}>SELECT GAME MODE</p>
                <div className={styles.modes}>
                    <ModeButton
                        label="01  LIMITED"
                        description={`One round of ${MAX_ATTEMPTS} attempts. Guess it or face the Elder Gods' wrath.`}
                        onClick={() => onSelect("limited")}
                    />
                    <ModeButton
                        label="02  UNLIMITED"
                        description={`Unlimited rounds of ${MAX_ATTEMPTS} attempts each. Keep going until you find it.`}
                        onClick={() => onSelect("unlimited")}
                    />
                </div>
            </div>

            {/* Footer */}
            <p className={styles.footer}>
                Type <span>quit</span> at any time to return here
            </p>

        </div>
    );
}

// ----------------------------------------------------------------------------
interface ModeButtonProps {
    label: string;
    description: string;
    onClick: () => void;
}

function ModeButton({ label, description, onClick }: ModeButtonProps) {
    return (
        <button className={styles.modeBtn} onClick={onClick}>
            <span className={styles.modeBtnLabel}>{label}</span>
            <p className={styles.modeBtnDesc}>{description}</p>
        </button>
    );
}