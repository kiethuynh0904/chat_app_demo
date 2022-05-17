const {createServer} = require('http');
const {Server} = require('socket.io');
const Client = require('socket.io-client');

describe('my awesome project', () => {
  let io, serverSocket, clientSocket;
  let room = 'room1';
  let user = {
    name: 'test',
    id: 'test',
  };

  beforeAll(done => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', socket => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('joined room', done => {
    clientSocket.on('joinPlanetRoom', arg => {
      // clientSocket.join(arg.room);
      // expect(clientSocket);
      done();
    });
    serverSocket.emit('joinPlanetRoom', {user, room});
  });
});
