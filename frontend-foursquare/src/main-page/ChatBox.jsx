import { useState, useEffect, useRef } from "react";
import { Mic, Send, Bot, User, MessageCircle, Sparkles } from "lucide-react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hi! I am your AI travel assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };

      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setTyping(true);
    
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        { type: "bot", text: `You said: "${userMessage}"` },
      ]);
    }, 1500);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      alert("Your browser does not support voice recognition.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="top-1 left-1 right-1 bottom-1 w-full max-w-sm md:max-w-md h-[700px] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 flex flex-col overflow-hidden z-50 relative">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-8 w-2 h-2 bg-orange-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-32 left-6 w-1 h-1 bg-red-300/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 right-4 w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Chat Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <div className="relative flex items-center justify-center gap-3">
          <div className="bg-white/20 p-2 rounded-full animate-bounce">
            <Bot className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg md:text-xl">AI Chat Assistant</h3>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm opacity-90">Online</span>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-br from-gray-50/50 to-orange-50/30 relative">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 animate-fade-in ${
              msg.type === "user" ? "flex-row-reverse" : "flex-row"
            }`}
            style={{
              animation: `fadeInSlide 0.5s ease-out ${idx * 0.1}s both`
            }}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              msg.type === "user" 
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" 
                : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
            }`}>
              {msg.type === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            {/* Message Bubble */}
            <div className={`group relative max-w-xs break-words ${
              msg.type === "user" ? "ml-auto" : "mr-auto"
            }`}>
              <div className={`px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                msg.type === "user"
                  ? "bg-gradient-to-r from-orange-100 to-red-100 text-gray-800 border border-orange-200"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              
              {/* Message Tail */}
              <div className={`absolute top-4 w-3 h-3 transform rotate-45 ${
                msg.type === "user" 
                  ? "right-[-6px] bg-gradient-to-r from-orange-100 to-red-100 border-r border-b border-orange-200" 
                  : "left-[-6px] bg-white border-l border-b border-gray-200"
              }`}></div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {typing && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl shadow-md border border-gray-200 relative">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <div className="absolute top-4 left-[-6px] w-3 h-3 bg-white border-l border-b border-gray-200 transform rotate-45"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className={`p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200/60 transition-all duration-300 ${
        isInputFocused ? 'bg-white shadow-lg' : ''
      }`}>
        <div className="flex items-center gap-3">
          {/* Voice Button */}
          <div className="relative">
            <button
              onClick={startListening}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-md ${
                listening 
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse shadow-red-300" 
                  : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300"
              }`}
            >
              <Mic className={`w-5 h-5 ${listening ? 'animate-pulse' : ''}`} />
            </button>
            
            {/* Listening Animation Ring */}
            {listening && (
              <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping"></div>
            )}
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Type your message..."
              className={`w-full px-4 py-3 border-2 rounded-full text-gray-700 placeholder-gray-400 transition-all duration-300 focus:outline-none bg-white/80 backdrop-blur-sm ${
                isInputFocused 
                  ? 'border-orange-400 shadow-lg shadow-orange-200/50 bg-white' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            />
            
            {/* Input Glow Effect */}
            {isInputFocused && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 animate-pulse pointer-events-none"></div>
            )}
          </div>

          {/* Send Button */}
          <div className="relative">
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-md ${
                input.trim()
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-orange-300"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className={`w-5 h-5 ${input.trim() ? 'animate-pulse' : ''}`} />
            </button>
            
            {/* Send Button Glow */}
            {input.trim() && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 animate-pulse blur-sm"></div>
            )}
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center justify-center mt-3 gap-2">
          <MessageCircle className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {listening ? "🎤 Listening..." : typing ? "AI is typing..." : "Ready to chat"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeInSlide 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}