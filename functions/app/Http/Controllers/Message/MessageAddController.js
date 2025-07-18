const MessageAddInput = require('../../../UseCases/Message/MessageAddInput');
const MessageAddService = require('../../../Services/Usecases/Message/MessageAddService');

module.exports = async (request, response) => {
    const input = new MessageAddInput(request.body);
    const messageAddService = new MessageAddService();
    const output = await messageAddService.handle(input);

    return response.json(output.getOutput());
};
