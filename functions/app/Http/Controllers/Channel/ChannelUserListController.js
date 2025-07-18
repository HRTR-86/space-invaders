const ChannelUserListInput = require('../../../UseCases/Channel/ChannelUserListInput');
const ChannelUserListService = require('../../../Services/Usecases/ChannelUser/ChannelUserListService');

module.exports = async (request, response) => {
    const input = new ChannelUserListInput(request.query);
    const channelUserService = new ChannelUserListService();
    const output = await channelUserService.handle(input);

    return response.json(await output.getOutput());
};
