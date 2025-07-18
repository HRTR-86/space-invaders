const MessageDeleteInput = require('../../../UseCases/Message/MessageDeleteInput');
const MessageDeleteService = require('../../../Services/Usecases/Message/MessageDeleteService');

module.exports = async (request, response) => {
    const input = new MessageDeleteInput(request.body);
    const messageDeleteService = new MessageDeleteService();
    const output = await messageDeleteService.handle(input);

    return response.json(output.getOutput());
};
