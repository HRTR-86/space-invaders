const MessageEditExpiredInput = require('../../../UseCases/Message/MessageEditExpiredInput');
const MessageEditExpiredService = require('../../../Services/Usecases/Message/MessageEditExpiredService');

module.exports = async (request, response) => {
    const input = new MessageEditExpiredInput(request.body);
    const messageEditExpiredService = new MessageEditExpiredService();
    const output = await messageEditExpiredService.handle(input);

    return response.json(output.getOutput());
};
