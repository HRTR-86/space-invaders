const ChannelUserAddInput = require('../../../UseCases/ChannelUser/ChannelUserAddInput');
const ChannelUserAddService = require('../../../Services/Usecases/Channel/ChannelUserAddService');

module.exports = async (request, response) => {
    const input = new ChannelUserAddInput(request.body);
    const channelUserAddService = new ChannelUserAddService();
    const output = await channelUserAddService.handle(input);

    return response.json(output.getOutput());
};
