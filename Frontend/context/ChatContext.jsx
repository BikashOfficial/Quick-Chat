import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const { socket, axios } = useContext(AuthContext)

    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    //function to get all users for side bar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users")

            if (data.success) {
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to get all messages from selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`)
            if (data.success) {
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData)

            if (data.success) {
                setMessages((previousMessages) => [...previousMessages, data.newMessage])
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }



    //function to subscribe to selected users
    const subscribeToMessage = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true
                setMessages((previousMessages) => [...previousMessages, newMessage])
                axios.put(`/api/messages/send/${newMessage._id}`)
            } else {
                setUnseenMessages((prevUnseenMsg) =>
                ({
                    ...prevUnseenMsg, [newMessage.senderId]:
                        prevUnseenMsg[newMessage.senderId] ? prevUnseenMsg[newMessage.senderId] + 1 : 1
                }))

            }
        })
    }


    //function to unsubscribe from messages
    const unsubscribeFromMessage = async () => {
        if (socket) {
            socket.off('newMessage')
        }
    }

    useEffect(() => {
        subscribeToMessage()
        return () => unsubscribeFromMessage()
    }, [socket, selectedUser])

    const value = {
        messages, users, selectedUser, getUsers, getMessages
        , sendMessage, setSelectedUser, unseenMessages, setUnseenMessages
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}