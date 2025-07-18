const MessageListInput = require('../../../UseCases/Message/MessageListInput');
const MessageListService = require('../../../Services/Usecases/Message/MessageListService');

module.exports = async (request, response) => {
    const input = new MessageListInput(request.query);
    const messageListService = new MessageListService();
    const output = await messageListService.handle(input);

    return response.json(await output.getOutput());
};
