import React, { useState } from "react";
import styled from 'styled-components';
type Props = {
  createChat: (string: string) => void;
  displayName: string;
};

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewChatInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewChatButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const ChatForm: React.FC<Props> = ({ createChat, displayName }) => {
    const [inputValue, setInputValue] = useState('');
  return (
    <FormContainer>
            <h2> Hi, {displayName}</h2>
            <h3> Ready to chat?</h3>
            <NewChatInput
                type="text"
                placeholder="Chat here..."
                value={inputValue}
                onChange={(e:any) => setInputValue(e.target.value)} />
            <NewChatButton
                onClick={() => createChat(inputValue)}>
                Send
            </NewChatButton>
        </FormContainer>
  );
};

export default ChatForm;