const UserDetailInput = require('../../../UseCases/User/UserDetailInput');
const UserDetailService = require('../../../Services/Usecases/User/UserDetailService');

module.exports = async (request, response) => {
    const input = new UserDetailInput(request.query);
    const userDetailService = new UserDetailService();
    const output = await userDetailService.handle(input);

    return response.json(output.getOutput());
};
