import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import idl from '../idl.json';
import { ISolanaChat, ISolanaChatPda } from '../interfaces/solana-chat.interface';
import { Observable, Observer } from 'rxjs';
import { use } from 'chai';

export class SolanaTransactionService {
    wallet: AnchorWallet;
    program: Program;
    connection: Connection;
    profilePda!: PublicKey;
    chatPdaList: { username: string; publicKey: PublicKey }[] = [];
    username!: string;
    constructor(wallet: AnchorWallet, connection: Connection) {
        this.wallet = wallet;
        this.connection = connection;
        const provider = this.getProvider();
        const idlObject = JSON.parse(JSON.stringify(idl));
        this.program = new Program(idlObject, idlObject.metadata.address, provider);
    }

    private getProvider() {
        if (!this.wallet) throw new Error('wallet is null');
        const provider = new AnchorProvider(this.connection, this.wallet, {
            preflightCommitment: 'confirmed',
            commitment: 'confirmed',
        });
        if (!provider) throw new Error('provider is null');
        return provider;
    }

    fetchProfilePda(): PublicKey {
        const [profilePda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from('chatapp'), this.wallet.publicKey.toBuffer()],
            this.program.programId
        );
        return profilePda;
    }

    async fetchChatProfile(profile: PublicKey): Promise<any> {
        return await this.program.account.chatProfile.fetch(profile);
    }

    async getProfileAccount(): Promise<any> {
        this.profilePda = this.fetchProfilePda();
        console.log(this.profilePda);
        return this.fetchChatProfile(this.profilePda);
    }

    setUserName(username: string) {
        this.username = username;
    }

    getChats(): Observable<ISolanaChat> {
        const chats = this.program.account.solanaChat.all();

        return new Observable((observer: Observer<ISolanaChat>) => {
            chats.then((fecthedChats: any) => {
                let size = fecthedChats.length;
                fecthedChats.forEach(async (c: any) => {
                    const account: ISolanaChatPda = c.account;
                    console.log('account ', account);
                    const userProfile = this.chatPdaList.find((c) => c.publicKey === account.profilePubkey);
                    if (account && account.profilePubkey.equals(this.profilePda)) {
                        observer.next({
                            text: account.chat,
                            user: this.username,
                            isMine: true,
                        });
                    } else if (this.chatPdaList.length > 0 && userProfile) {
                        observer.next({
                            text: account.chat,
                            user: userProfile.username,
                            isMine: false,
                        });
                    } else {
                        console.log('Searching for profile');
                        const profileAccount: any = await this.fetchChatProfile(account.profilePubkey);
                        this.chatPdaList.push({
                            username: profileAccount.displayName,
                            publicKey: profileAccount.authority,
                        });
                        observer.next({
                            text: account.chat,
                            user: profileAccount.displayName,
                            isMine: false,
                        });
                    }
                    if (--size === 0) {
                        observer.complete();
                    }
                });
            });
        });
    }

    async createProfile(newUser: string) {
        this.profilePda = this.fetchProfilePda();
        console.log('createProfile', newUser, this.profilePda);
        await this.program.methods
            .createProfile(newUser)
            .accounts({
                authority: this.wallet?.publicKey,
                systemProgram: web3.SystemProgram.programId,
                profile: this.profilePda,
            })
            .rpc();
    }

    async sendChat(newChat: string) {
        this.profilePda = this.fetchProfilePda();
        const [chatPda] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from('chat'), this.profilePda.toBuffer()],
            this.program.programId
        );
        console.log('createChat', newChat, this.profilePda, chatPda);
        await this.program.methods
            .chat(newChat)
            .accounts({
                profile: this.profilePda,
                authority: this.wallet?.publicKey,
                chat: chatPda,
            })
            .rpc();
    }
}
