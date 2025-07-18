const MessageDetailInput = require('../../../UseCases/Message/MessageDetailInput');
const MessageDetailService = require('../../../Services/Usecases/Message/MessageDetailService');

module.exports = async (request, response) => {
    const input = new MessageDetailInput(request.query);
    const messageDetailService = new MessageDetailService();
    const output = await messageDetailService.handle(input);

    return response.json(await output.getOutput());
};
