const MessageEditInput = require('../../../UseCases/Message/MessageEditInput');
const MessageEditService = require('../../../Services/Usecases/Message/MessageEditService');

module.exports = async (request, response) => {
    const input = new MessageEditInput(request.body);
    const messageEditService = new MessageEditService();
    const output = await messageEditService.handle(input);

    return response.json(output.getOutput());
};
