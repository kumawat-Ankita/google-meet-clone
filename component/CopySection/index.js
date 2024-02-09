import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

import styles from "@/component/CopySection/index.module.css";

const CopySection = (props) => {
    const { roomId } = props;
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div className={styles.copyContainer}>
            <div className={styles.copyHeading}>Copy Room ID:</div>
            <hr />
            <div className={styles.copyDescription}>
                <span>{roomId}</span>
                <CopyToClipboard text={roomId} onCopy={handleCopy}>
                    <Copy className={`ml-3 cursor-pointer ${isCopied ? styles.hidden : ""}`} />
                </CopyToClipboard>
                {isCopied && (
                    <span className={`${styles.copiedMessage} ${styles.animateCopied}`}>
                        Room ID copied!
                    </span>
                )}
            </div>
        </div>
    );
};

export default CopySection;
