import { useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

export const Sidebar = () => {
  const { newChat, recentPrompt } = useContext(Context);

  const handleNewChat = () => {
    newChat();
  };

  const truncateText = (text, maxLength = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="sidebar sidebar-open">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={assets.gemini_icon} alt="Gemini" />
          <span>Gemini</span>
        </div>
      </div>

        {/* New Chat Button */}
        <div className="sidebar-actions">
          <button className="new-chat-sidebar-btn" onClick={handleNewChat}>
            <img src={assets.plus_icon} alt="New Chat" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Recent Chats */}
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Recent</h3>
            <div className="chat-history">
              {recentPrompt ? (
                <div className="chat-item current-chat">
                  <img src={assets.message_icon} alt="Chat" />
                  <div className="chat-info">
                    <span className="chat-title">{truncateText(recentPrompt)}</span>
                    <span className="chat-timestamp">Now</span>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p className="empty-message">No recent chats</p>
                  <p className="empty-description">Start a conversation to see your chat history here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};
