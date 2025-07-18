const ReplyListInput = require('../../../UseCases/Reply/ReplyListInput');
const ReplyListService = require('../../../Services/Usecases/Reply/ReplyListService');

module.exports = async (request, response) => {
    const input = new ReplyListInput(request.query);
    const replyListService = new ReplyListService();
    const output = await replyListService.handle(input);

    return response.json(await output.getOutput());
};
