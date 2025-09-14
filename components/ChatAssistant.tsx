import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getMenuRecommendations } from '../services/geminiService';
import { MENU_ITEMS } from '../constants';
import { CloseIcon, SendIcon, AiIcon } from './Icons';

interface ChatAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    onRecommendations: (ids: number[]) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ isOpen, onClose, onRecommendations }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: "Hello! I'm your personal food assistant for Vị Noodles & Matcha Latte. What are you in the mood for today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if(isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const { recommendedIds, aiMessage } = await getMenuRecommendations(inputValue, MENU_ITEMS);
            const aiResponseMessage: ChatMessage = { sender: 'ai', text: aiMessage };
            setMessages(prev => [...prev, aiResponseMessage]);

            if (recommendedIds.length > 0) {
                onRecommendations(recommendedIds);
            }
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'ai', text: "Sorry, I couldn't process that. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col transform-gpu transition-all duration-300 origin-bottom-right">
            <div className="p-4 bg-brand-primary text-white flex justify-between items-center rounded-t-2xl">
                <h3 className="font-bold text-lg">Menu Assistant</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto bg-gray-100">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0"><AiIcon className="w-5 h-5 text-white"/></div>}
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg shadow-sm'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0"><AiIcon className="w-5 h-5 text-white"/></div>
                            <div className="p-3 rounded-2xl bg-white text-gray-800 rounded-bl-lg shadow-sm">
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-2xl">
                <div className="flex items-center bg-gray-100 rounded-full">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g., 'something spicy'"
                        className="flex-grow bg-transparent px-4 py-2 text-sm focus:outline-none"
                        disabled={isLoading}
                    />
                    <button type="submit" className="p-2 rounded-full m-1 bg-brand-primary text-white disabled:bg-gray-300 hover:bg-brand-dark transition-colors" disabled={isLoading || !inputValue.trim()}>
                        <SendIcon className="w-5 h-5"/>
                    </button>
                </div>
            </form>
        </div>
    );
};