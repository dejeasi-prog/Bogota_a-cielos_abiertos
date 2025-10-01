import React from 'react';
import type { ChatMessage } from '../types';
import { MessageSender } from '../types';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === MessageSender.BOT;

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isBot ? 'bg-gray-700' : 'bg-amber-500'}`}>
        {isBot ? <BotIcon className="w-6 h-6 text-white" /> : <UserIcon className="w-6 h-6 text-white" />}
      </div>
      <div className={`max-w-lg p-4 rounded-xl ${isBot ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-amber-500 text-white rounded-tr-none'}`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessageComponent;