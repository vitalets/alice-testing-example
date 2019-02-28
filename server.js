const micro = require('micro');
const {json} = micro;

module.exports = micro(async req => {
  const {request, session, version} = await json(req);
  return {
    version,
    session,
    response: {
      text: request.original_utterance || 'Hello!',
      end_session: false,
    },
  };
});