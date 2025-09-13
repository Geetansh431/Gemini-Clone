import PropTypes from 'prop-types';
import './TextRenderer.css';

/**
 * TextRenderer component that safely renders formatted text
 * Converts markdown-like formatting to React elements
 * This is the safest approach as it doesn't use dangerouslySetInnerHTML
 */
export const TextRenderer = ({ content, className = '' }) => {
  if (!content) return null;

  // Split content by line breaks and process each line
  const lines = content.split('\n');
  
  const renderLine = (line, index) => {
    const trimmedLine = line.trim();
    
    // Handle headings (##, ###, etc.)
    if (trimmedLine.startsWith('#')) {
      const headingMatch = trimmedLine.match(/^(#{1,6})\s*(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2];
        const HeadingTag = `h${Math.min(level, 6)}`;
        return (
          <HeadingTag key={index} className="text-heading">
            {renderTextWithFormatting(text, index)}
          </HeadingTag>
        );
      }
    }
    
    // Handle empty lines with proper spacing
    if (trimmedLine === '') {
      return <div key={index} className="text-empty-line"></div>;
    }
    
    // Regular text line with formatting
    return (
      <div key={index} className="text-line">
        {renderTextWithFormatting(line, index)}
      </div>
    );
  };

  const renderTextWithFormatting = (text, lineIndex) => {
    // Handle bold text (wrapped in **text**) - improved regex to handle more cases
    const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
    
    return parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        // Bold text - ensure it's not just **
        const boldText = part.slice(2, -2).trim();
        if (boldText) {
          return <strong key={`${lineIndex}-${partIndex}`}>{boldText}</strong>;
        }
      }
      // Regular text (including empty strings and malformed bold syntax)
      return part ? <span key={`${lineIndex}-${partIndex}`}>{part}</span> : null;
    }).filter(Boolean); // Remove null elements
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

