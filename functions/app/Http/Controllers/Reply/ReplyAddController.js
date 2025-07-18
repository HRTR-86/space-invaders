const ReplyAddInput = require('../../../UseCases/Reply/ReplyAddInput');
const ReplyAddService = require('../../../Services/Usecases/Reply/ReplyAddService');

module.exports = async (request, response) => {
    const input = new ReplyAddInput(request.body);
    const replyAddService = new ReplyAddService();
    const output = await replyAddService.handle(input);

    return response.json(output.getOutput());
};
