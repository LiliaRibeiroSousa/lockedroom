import { useEffect } from "react";
import  useConversations  from "../store/useConversations";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext";


const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversations();
  const { messages, setMessages } = useConversations();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation, setMessages]);

  const fullName = selectedConversation?.fullName || "";

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='shadow-xl p-2 px-4 py-5 flex items-center justify-start'>
            <span className='text-blue-950 '>To:&nbsp;</span>
            <span className='text-black font-bold'>{fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};
