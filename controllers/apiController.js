// controllers/apiController.js
// Controller tidak bergantung pada implementasi spesifik API
// Service di-inject sehingga mudah diganti

module.exports = (apiService) => {
  return {
    // Get all users
    getUsers: async (req, res) => {
      try {
        const { page = 1, limit = 10 } = req.query;
        const users = await apiService.getAllUsers(page, limit);
        res.json({
          success: true,
          data: users,
          page: parseInt(page),
          limit: parseInt(limit)
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    },

    // Get user by ID
    getUserById: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await apiService.getUserById(id);
        
        if (!user) {
          return res.status(404).json({
            success: false,
            error: 'User not found'
          });
        }
        
        res.json({
          success: true,
          data: user
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    },

    // Create user
    createUser: async (req, res) => {
      try {
        const userData = req.body;
        const newUser = await apiService.createUser(userData);
        res.status(201).json({
          success: true,
          data: newUser
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      }
    },

    // Update user
    updateUser: async (req, res) => {
      try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = await apiService.updateUser(id, userData);
        
        if (!updatedUser) {
          return res.status(404).json({
            success: false,
            error: 'User not found'
          });
        }
        
        res.json({
          success: true,
          data: updatedUser
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message
        });
      }
    },

    // Delete user
    deleteUser: async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await apiService.deleteUser(id);
        
        if (!deleted) {
          return res.status(404).json({
            success: false,
            error: 'User not found'
          });
        }
        
        res.json({
          success: true,
          message: 'User deleted successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    },

    // Search users
    searchUsers: async (req, res) => {
      try {
        const { q } = req.query;
        const users = await apiService.searchUsers(q);
        res.json({
          success: true,
          data: users
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    },

    // Login
    login: async (req, res) => {
      try {
        const { email, password } = req.body;
        const result = await apiService.login(email, password);
        res.json({
          success: true,
          data: result
        });
      } catch (error) {
        res.status(401).json({
          success: false,
          error: error.message
        });
      }
    }
  };
};