const MessageEditGoodInput = require('../../../UseCases/Message/MessageEditGoodInput');
const MessageEditGoodService = require('../../../Services/Usecases/Message/MessageEditGoodService');

module.exports = async (request, response) => {
    const input = new MessageEditGoodInput(request.body);
    const messageEditGoodService = new MessageEditGoodService();
    const output = await messageEditGoodService.handle(input);

    return response.json(output.getOutput());
};
