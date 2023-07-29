import { PublicKey } from '@solana/web3.js';

export interface ISolanaChatPda {
    walletPubkey: PublicKey;
    profilePubkey: PublicKey;
    chat: string;
}

export interface IChatProfile {
    displayName: string;
    authority: PublicKey;
}

export interface ISolanaChat {
    text: string;
    user: string;
    isMine: boolean;
}
