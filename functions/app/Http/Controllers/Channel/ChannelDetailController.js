const ChannelDetailInput = require('../../../UseCases/Channel/ChannelDetailInput');
const ChannelDetailService = require('../../../Services/Usecases/Channel/ChannelDetailService');

module.exports = async (request, response) => {
    const input = new ChannelDetailInput(request.query);
    const channelDetailService = new ChannelDetailService();
    const output = await channelDetailService.handle(input);

    return response.json(output.getOutput());
};
