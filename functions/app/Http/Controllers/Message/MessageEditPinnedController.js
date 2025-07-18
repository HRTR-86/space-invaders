const MessageEditPinnedInput = require('../../../UseCases/Message/MessageEditPinnedInput');
const MessageEditPinnedService = require('../../../Services/Usecases/Message/MessageEditPinnedService');

module.exports = async (request, response) => {
    const input = new MessageEditPinnedInput(request.body);
    const messageEditPinnedService = new MessageEditPinnedService();
    const output = await messageEditPinnedService.handle(input);

    return response.json(output.getOutput());
};
