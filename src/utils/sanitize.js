import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, {
    // Allow basic formatting tags
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    // Allow basic attributes
    ALLOWED_ATTR: ['class', 'id'],
    // Remove any script tags and event handlers
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
  });
};

/**
 * Alternative: Convert HTML to plain text (most secure option)
 * @param {string} html - The HTML string to convert
 * @returns {string} - Plain text string
 */
export const htmlToText = (html) => {
  if (!html) return '';
  
  // Create a temporary div element
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};
