const Room1 = 'general'
const users = {
  [Room1]: {},
};

const joinRoom = (socket) => ({ username, room = Room1 }) => {
  socket.join(room, () => {
      // push user for the suitable room
      users[room][socket.client.id] = { username: username, id: socket.client.id }
      // Notify all the users in the same room
      socket.broadcast.in(room).emit('newUser', users[room]);
  });
}

const leaveRoom = (socket) => ({ room, username }) => {
  socket.leave(room, () => {
      let usersRoom = users[room]
      delete  users[room][socket.client.id]
      // usersRoom = usersRoom.filter((user) => (user.username !== username)) // delete user from the array
      socket.broadcast.in(room).emit('userLeave', usersRoom); // To all the users in the same room
  })
}

const offer = (socket) => ({room, offer}) => {
  console.log('switch offer')
  socket.broadcast.in(room).emit('offer', offer);
}

const answer = (socket) => ({room, answer}) => {
  console.log('switch answer')
  socket.broadcast.in(room).emit('answer', answer);
}

const icecandidate = (socket) => ({room, candidate}) => {
  console.log('switch icecandidate')
  socket.broadcast.in(room).emit('icecandidate', candidate);
}


module.exports = {
  joinRoom,
  leaveRoom,
  offer,
  answer,
  icecandidate
}
