// services/cacheService.js
// Simple in-memory cache implementation

const cache = new Map();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

module.exports = {
  // Get cached data
  get: (key) => {
    const cached = cache.get(key);
    
    if (!cached) return null;
    
    // Check if expired
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      cache.delete(key);
      return null;
    }
    
    return cached.data;
  },

  // Set cache data
  set: (key, data) => {
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
  },

  // Clear specific cache
  clear: (key) => {
    cache.delete(key);
  },

  // Clear all cache
  clearAll: () => {
    cache.clear();
  },

  // Get cache stats
  getStats: () => {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    };
  }
};