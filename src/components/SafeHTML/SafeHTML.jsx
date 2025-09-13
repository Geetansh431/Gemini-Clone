import PropTypes from 'prop-types';
import { sanitizeHTML } from '../../utils/sanitize';

/**
 * SafeHTML component that renders HTML content safely
 * Uses DOMPurify to sanitize HTML before rendering
 */
const SafeHTML = ({ content, className = '', ...props }) => {
  if (!content) return null;

  const sanitizedContent = sanitizeHTML(content);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      {...props}
    />
  );
};

SafeHTML.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default SafeHTML;
