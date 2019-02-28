const assert = require('assert');
const server = require('./server');
const User = require('./user');

const PORT = 3456;

before(done => {
  server.listen(PORT, done);
});

it('should get hello on enter', async () => {
  const user = new User(`http://localhost:${PORT}`); // создаем пользователя
  const response = await user.enter(); // заходим в навык и получаем ответ
  assert.equal(response.text, 'Hello!'); // проверяем текст ответа
});

it('should reply the same message', async () => {
  const user = new User(`http://localhost:${PORT}`); // создаем пользователя
  await user.enter(); // заходим в навык
  const response = await user.say('что ты умеешь?'); // отправляем сообщение
  assert.equal(response.text, 'что ты умеешь?'); // проверяем текст ответа
});

after(done => {
  server.close(done);
});