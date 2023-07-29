import React from "react";
import styled from 'styled-components';
import { ISolanaChat } from "../interfaces/solana-chat.interface";
type Props = {
  chats: ISolanaChat[];
};

const ChatContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const ChatItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: left;
    box-shadow: 0 4px 8px grey;
    background-color: ${props => (props.className ? '#6e7a76' : '#32a87f')};
    text-align: ${props => (props.className ? 'left' : 'right')};;
`;

const ChatList: React.FC<Props> = ({ chats }) => {
  return (
    <ChatContainer className="mt-6">
        <h2 className="font-bold">Public chat</h2>
        {chats.map(chat => 
        <ChatItemContainer className={chat.isMine ?'':'user'} key={chat.text+chat.user}>
            <p className="text-xs text-neutral-600 font-bold">
                {chat.user}
            </p>
            <h3>{chat.text}</h3>
            
            </ChatItemContainer>)}
    </ChatContainer>
  );
};

export default ChatList;