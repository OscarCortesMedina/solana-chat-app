import React, { useState } from "react";
import styled from 'styled-components';
type Props = {
  createUser: (string: string) => void;
};

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewUserInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewUserButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 40%;
    background-color: #512da8;
    margin-top: 8px;
    color: white;
`;

const UserForm: React.FC<Props> = ({ createUser }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const validateUser = (username:string) => {
        if(username.length<3){
            setError("Username must be at least 3 characters long")
        } else if(username.length>20){
            setError("Username must be less than 20 characters long")
        } else {
            setError('')
            createUser(username)
        }
    }
  return (
    <FormContainer>
            <NewUserInput
                type="text"
                placeholder="Username"
                value={inputValue}
                onChange={(e:any) => setInputValue(e.target.value)} />
                <br/>
            <NewUserButton
                onClick={() => validateUser(inputValue)}>
                Create User
            </NewUserButton>
            {error && <p className="text-red-300 mt-2 max-w-xs">{error}</p>}
        </FormContainer>
  );
};

export default UserForm;