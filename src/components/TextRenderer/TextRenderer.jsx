import PropTypes from 'prop-types';
import './TextRenderer.css';

/**
 * TextRenderer component that safely renders formatted text
 * Converts basic markdown-like formatting to React elements
 * This is the safest approach as it doesn't use dangerouslySetInnerHTML
 */
export const TextRenderer = ({ content, className = '' }) => {
  if (!content) return null;

  // Split content by line breaks and process each line
  const lines = content.split('\n');
  
  const renderLine = (line, index) => {
    // Handle bold text (wrapped in **text**)
    const parts = line.split(/(\*\*.*?\*\*)/g);
    
    return (
      <div key={index} className="text-line">
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Bold text
            const boldText = part.slice(2, -2);
            return <strong key={partIndex}>{boldText}</strong>;
          } else if (part.trim() === '') {
            // Empty line - render as line break
            return <br key={partIndex} />;
          } else {
            // Regular text
            return <span key={partIndex}>{part}</span>;
          }
        })}
      </div>
    );
  };

  return (
    <div className={`text-renderer ${className}`}>
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  );
};

TextRenderer.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

