import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { ConnectionContext, useAnchorWallet } from '@solana/wallet-adapter-react';
import ChatForm from '../components/chatForm';
import ContentContainer from '../components/contentContainer';
import UserForm from '../components/userForm';
import { ISolanaChat } from '../interfaces/solana-chat.interface';
import ChatList from '../components/chatList';
import {SolanaTransactionService} from '../util/solana-transaction.service';
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

const Home: NextPage = () => {

    const {connection} = useContext(ConnectionContext);
    const [username, setUsername] = useState('');
    const [ showProfileCreation, setShowProfileCreation ] = useState(false);
    const [ showChat, setShowChat ] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let solanaTrasactionService!:SolanaTransactionService;
    const wallet= useAnchorWallet();
    const [chats,setChats] = useState<ISolanaChat[]>([]);

    useEffect(() => {

        console.log("wallet effect",wallet?.publicKey)
        setShowProfileCreation(wallet ? true : false);
        setShowChat(false);
        setShowProfileCreation(false);
        setChats([]);
        setUsername('');
       if(wallet) {
            initSolanaChat();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[wallet]);

    

    function initSolanaTransactionService() {
        if (!wallet) throw new Error('wallet is null');
        console.log("initSolanaTransactionService",wallet.publicKey?.toBase58())
        solanaTrasactionService=(new SolanaTransactionService(wallet,connection));
        //solanaTrasactionService?.fetchProfilePda();
    }

    async function initSolanaChat() {

        initSolanaTransactionService();
        try{
            const profileAccount:any=await solanaTrasactionService!.getProfileAccount();
            setShowChat(true);
            setUsername(profileAccount.displayName);
            solanaTrasactionService!.setUserName(profileAccount.displayName);
            showChats();
        } catch(e:any) {
            console.log("Account does not exist");
            setShowProfileCreation(true);
        }
 
    }

    function showChats() {
        setChats([]);
        setLoading(true);
        solanaTrasactionService!.getChats()
        .forEach((chat:ISolanaChat) => {
            console.log(chat);
            setChats(chats=>[...chats,chat]);
        }).finally(()=>{
            console.log("chats loaded");
            setLoading(false);
        });
    }

    async function createProfile(newUser:string) {
        setLoading(true);
        try {
            if (!solanaTrasactionService){
                initSolanaTransactionService();
            }
            await solanaTrasactionService!.createProfile(newUser);
            setShowProfileCreation(false);
            setShowChat(true);
            setUsername(newUser);
            showChats();
            solanaTrasactionService!.setUserName(newUser);
        } catch(e:any) {
            if(e.errorLogs) {
                setError(JSON.stringify(e.errorLogs[0]))
            } else if(!JSON.stringify(e).indexOf("Account does not exist")){
                setError("An error occur while trying to execute the transaction: "+JSON.stringify(e));
            }else {
                console.error(e);
            }
        }
        setLoading(false);

    }

    async function sendChat(chat:string)  {
        setLoading(true);
        try {
            if (!solanaTrasactionService){
                initSolanaTransactionService();
            }
            await solanaTrasactionService!.sendChat(chat).then(()=>{
                setChats(chats=>[...chats,{user:username,text:chat,isMine:true}]);
                });
        } catch(e:any) {
            if(e.errorLogs) {
                setError(JSON.stringify(e.errorLogs[0]))
            } else if(!JSON.stringify(e).indexOf("Account does not exist")){
                setError("An error occur while trying to execute the transaction: "+JSON.stringify(e));
            }else {
                console.error(e);
            }
        }
        setLoading(false);
    }

    return (
        <div >
            <Head>
                <title>Doge Capital Chat app</title>
                <meta name="chat app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ContentContainer loading={loading}>
                    <h2 className="text-2xl font-bold mb-4">Doge Capital Chat app <br/>(devnet)</h2>
                    <div className="mt-4 grid grid-cols-2 gap-1  mb-4">
                        <WalletMultiButtonDynamic />
                    </div>
                    { error && 
                    <p className="text-red-300 mt-2 max-w-xs">{error}</p>}


                   { showProfileCreation && !showChat &&
                   <UserForm createUser={(user)=>createProfile(user)} />}

                    { showChat &&
                    <ChatForm displayName={username}  
                    createChat={(text)=>sendChat(text)} />}

                    { chats.length>0 &&
                        <ChatList chats={chats} />
                    }



            </ContentContainer>
        </div>
    );
};

export default Home;
