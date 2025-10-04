// services/apiService.js
// Default implementation menggunakan in-memory storage
// File ini bisa diganti dengan implementasi lain (MongoDB, PostgreSQL, External API, dll)

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

let nextId = 4;

module.exports = {
  // Get all users dengan pagination
  getAllUsers: async (page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    return {
      users: users.slice(start, end),
      total: users.length,
      hasMore: end < users.length
    };
  },

  // Get user by ID
  getUserById: async (id) => {
    return users.find(u => u.id === parseInt(id));
  },

  // Create new user
  createUser: async (userData) => {
    const newUser = {
      id: nextId++,
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  // Update user
  updateUser: async (id, userData) => {
    const idx = users.findIndex(u => u.id === parseInt(id));
    if (idx === -1) return null;
    
    users[idx] = {
      ...users[idx],
      ...userData,
      updatedAt: new Date()
    };
    return users[idx];
  },

  // Delete user
  deleteUser: async (id) => {
    const idx = users.findIndex(u => u.id === parseInt(id));
    if (idx === -1) return false;
    
    users.splice(idx, 1);
    return true;
  },

  // Search users
  searchUsers: async (query) => {
    if (!query) return users;
    
    const q = query.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q)
    );
  },

  // Login
  login: async (email, password) => {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Dalam implementasi real, check password hash
    // Ini hanya contoh
    return {
      user: { id: user.id, name: user.name, email: user.email },
      token: 'dummy-token-' + user.id
    };
  }
};