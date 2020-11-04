const users = [];

module.exports = {
  // Join user to Room
  userJoined: (userId, number, room) => {
    const user = { userId, number, room };

    users.push(user);

    return user;
  },

  // Get current user
  getCurrentUser: (userId) => {
    return users.find((user) => user.id === userId);
  },
};
