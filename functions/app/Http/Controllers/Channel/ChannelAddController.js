const ChannelAddInput = require('../../../UseCases/Channel/ChannelAddInput');
const ChannelAddService = require('../../../Services/Usecases/Channel/ChannelAddService');

module.exports = async (request, response) => {
    const input = new ChannelAddInput(request.body);
    const channelAddService = new ChannelAddService();
    const output = await channelAddService.handle(input);

    return response.json(output.getOutput());
};
