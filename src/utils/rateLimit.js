const rateLimitMap = new Map();

export function rateLimit(options = {}) {
  const {
    interval = 60 * 1000, 
    uniqueTokenPerInterval = 500, 
    maxRequestsPerInterval = 5, 
  } = options;

  return {
    check: (identifier) => {
      return new Promise((resolve, reject) => {
        
        const now = Date.now();
        const clearBefore = now - interval;
        
        for (const [key, value] of rateLimitMap.entries()) {
          if (value.resetTime < clearBefore) {
            rateLimitMap.delete(key);
          }
        }

      
        const tokenCount = rateLimitMap.get(identifier) || {
          count: 0,
          resetTime: now + interval,
        };

        if (tokenCount.count >= maxRequestsPerInterval) {
          const timeRemaining = Math.ceil((tokenCount.resetTime - now) / 1000);
          reject({
            error: 'Rate limit exceeded',
            retryAfter: timeRemaining,
          });
        } else {
          tokenCount.count += 1;
          rateLimitMap.set(identifier, tokenCount);
          resolve({
            remaining: maxRequestsPerInterval - tokenCount.count,
            resetTime: tokenCount.resetTime,
          });
        }
      });
    },
  };
}


export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}