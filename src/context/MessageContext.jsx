import React, {createContext } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Message = createContext();

const MessageProvider = ({children}) => {

const Value = {
    toast,
    ToastContainer,
};
    return (
        <Message.Provider value={Value}>
            {children}
        </Message.Provider>
    );
};

export default MessageProvider;