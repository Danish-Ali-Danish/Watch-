import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './Icons';
import type { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initial bot message when chat opens for the first time
            setTimeout(() => {
                setMessages([{
                    id: Date.now(),
                    text: 'Hello! Welcome to Chronovault. How can I assist you today?',
                    sender: 'bot',
                    timestamp: new Date().toLocaleTimeString()
                }]);
            }, 500);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const getBotResponse = (userMessage: string): string => {
        const msg = userMessage.toLowerCase();
        if (msg.includes('order') || msg.includes('status')) {
            return 'You can check your order status on your user dashboard, under the "My Orders" tab.';
        }
        if (msg.includes('shipping') || msg.includes('return')) {
            return 'We offer free express shipping on all orders. You can find our full shipping and return policies in the footer of our website.';
        }
        if (msg.includes('hello') || msg.includes('hi')) {
            return 'Hello again! How can I help you?';
        }
        if (msg.includes('warranty')) {
            return 'All our timepieces come with a comprehensive international warranty. The duration varies by model, but you can find specifics on the product detail page.';
        }
        return "I'm sorry, I'm a demo bot with limited responses. For more complex questions, please visit our Contact Us page to get in touch with a human representative.";
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        setTimeout(() => {
             const botMessage: ChatMessage = {
                id: Date.now() + 1,
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="w-80 h-[28rem] bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-t-xl flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Customer Support</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white"><CloseIcon className="w-5 h-5"/></button>
                    </div>
                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-yellow-500 text-black rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                                <span className="text-xs text-gray-400 mt-1">{msg.timestamp}</span>
                            </div>
                        ))}
                         <div ref={messagesEndRef} />
                    </div>
                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-transparent"
                        />
                        <button type="submit" className="bg-yellow-500 text-black rounded-full p-2 hover:bg-yellow-600 transition-colors">
                            <SendIcon className="w-5 h-5"/>
                        </button>
                    </form>
                </div>
            </div>
            {/* FAB */}
             <button 
                onClick={() => setIsOpen(prev => !prev)}
                className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-yellow-600 to-amber-400 text-black rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
             >
                <ChatBubbleIcon className="w-8 h-8"/>
            </button>
        </div>
    );
};

export default ChatWidget;
