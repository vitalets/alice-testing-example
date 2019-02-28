const fetch = require('node-fetch');

module.exports = class User {
  /**
   * Конструктор
   * @param {String} webhookUrl
   */
  constructor(webhookUrl) {
    this._webhookUrl = webhookUrl;
  }

  /**
   * Вход в навык
   */
  async enter() {
    // при заходе в навык, сообщение - пустая строка
    const body = this._buildRequest('');
    return this._sendRequest(body);
  }

  /**
   * Отправка сообщения
   * @param {String} message
   */
  async say(message) {
    const body = this._buildRequest(message);
    return this._sendRequest(body);
  }

  /**
   * Отправка http-запроса
   * @param {Object} body тело запроса
   */
  async _sendRequest(body) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const response = await fetch(this._webhookUrl, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json.response;
  }

  /**
   * Сборка тела запроса с заданным сообщением пользователя
   * @param {String} message
   */
  _buildRequest(message) {
    return {
      request: {
        command: message,
        original_utterance: message,
        type: 'SimpleUtterance',
      },
      session: {
        new: true,
        user_id: 'user-1',
        session_id: 'session-1'
      },
      version: '1.0'
    }
  }
};