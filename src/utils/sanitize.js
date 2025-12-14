
const DANGEROUS_TAGS = [
  'script', 'iframe', 'object', 'embed', 'applet',
  'link', 'style', 'meta', 'form', 'input', 'button'
];


const DANGEROUS_ATTRIBUTES = [
  'onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout',
  'onkeydown', 'onkeyup', 'onfocus', 'onblur', 'onchange',
  'onsubmit', 'onreset', 'onselect', 'onabort', 'ondblclick'
];


/**
 * 
 * @param {string} input 
 * @returns {string} 
 */

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  let cleaned = input;
  
  
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  
  DANGEROUS_TAGS.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b[^<]*(?:(?!<\\/${tag}>)<[^<]*)*<\\/${tag}>`, 'gi');
    cleaned = cleaned.replace(regex, '');
    
    cleaned = cleaned.replace(new RegExp(`<${tag}[^>]*\\/?>`, 'gi'), '');
  });
  
 
  DANGEROUS_ATTRIBUTES.forEach(attr => {
    const regex = new RegExp(`${attr}\\s*=\\s*["'][^"']*["']`, 'gi');
    cleaned = cleaned.replace(regex, '');
  });
  
  
  cleaned = cleaned.replace(/javascript:/gi, '');
  
  
  cleaned = cleaned.replace(/data:text\/html/gi, '');
  
  
  cleaned = cleaned.replace(/vbscript:/gi, '');
  
  
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  
  
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  return cleaned.trim();
}

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  return text.replace(/[&<>"'`=\/]/g, char => map[char]);
}

/**
 * 
 * @param {string} input 
 * @returns {boolean} 
 */
export function hasSuspiciousContent(input) {
  if (typeof input !== 'string') return false;
  
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,  
    /<iframe/i,
    /eval\s*\(/i,
    /expression\s*\(/i, 
    /vbscript:/i,
    /data:text\/html/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * 
 * @param {string} url 
 * @returns {string} 
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  
 
  url = url.trim();
  
  
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const urlLower = url.toLowerCase();
  
  if (dangerousProtocols.some(protocol => urlLower.startsWith(protocol))) {
    return '';
  }
  
  
  if (url && !url.match(/^(https?:\/\/|mailto:|\/)/)) {
    return '';
  }
  
  return url;
}

/**
 * 
 * @param {string} str 
 * @param {number} maxLength 
 * @returns {string} 
 */
export function limitLength(str, maxLength = 1000) {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength);
}

/**
 * 
 * @param {object} obj 
 * @returns {object} 
 */
export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  const sanitized = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value);
      } else if (typeof value === 'object') {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
}