import { useState, useRef, useEffect } from "react";
import api from "../api";
import "./AIAssistant.css";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm MediBot, your clinic assistant. How can I help you today? 🤖",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userMessage) => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        return "Please log in to use the AI assistant.";
      }

      const token = JSON.parse(userData)?.token;
      if (!token) {
        return "Authentication token not found. Please log in again.";
      }

      const response = await api.post("/ai/chat", { message: userMessage });

      if (!response.ok) {
        if (response.status === 401) {
          return "Authentication failed. Please log in again.";
        } else if (response.status === 500) {
          return "Server error. Please try again later.";
        } else {
          return `Connection error (${response.status}). Please check your internet connection.`;
        }
      }

      const data = await response.json();

      if (data.success) {
        return data.response;
      } else {
        console.error("AI API Response Error:", data);
        return "Sorry, I'm having trouble processing your request right now. Please try again later.";
      }
    } catch (error) {
      console.error("AI API Error:", error);

      // Check if it's a network error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return "Cannot connect to server. Please check if the server is running and try again.";
      }

      return `Connection error: ${error.message}. Please try again later.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage;
    const userMessage = {
      id: messages.length + 1,
      text: userMessageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Get bot response from API
    const botResponseText = await getBotResponse(userMessageText);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <div className="ai-floating-button" onClick={() => setIsOpen(!isOpen)}>
        <div className="ai-icon">🤖</div>
        <div className="ai-pulse"></div>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="ai-chat-modal">
          <div className="ai-chat-container">
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-bot-profile">
                <div className="ai-avatar">
                  <span className="ai-robot-icon">🤖</span>
                </div>
                <div className="ai-bot-info">
                  <h3>MediBot</h3>
                  <p>Clinic Assistant</p>
                  <div className="ai-status">
                    <span className="status-dot"></span>
                    Online
                  </div>
                </div>
              </div>
              <button
                className="ai-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="ai-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`ai-message ${msg.sender === "bot" ? "bot" : "user"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="ai-bot-avatar">
                      <span>🤖</span>
                    </div>
                  )}
                  <div className="ai-message-content">
                    <p>{msg.text}</p>
                    <span className="ai-message-time">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-message bot">
                  <div className="ai-bot-avatar">
                    <span>🤖</span>
                  </div>
                  <div className="ai-message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-input-area">
              <input
                type="text"
                placeholder="Ask me anything about our clinic..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="ai-input"
              />
              <button
                className="ai-send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <span>📤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
