const UserEditInput = require('../../../UseCases/User/UserEditInput');
const UserEditService = require('../../../Services/Usecases/User/UserEditService');

module.exports = async (request, response) => {
    const input = new UserEditInput(request.body);
    const userEditService = new UserEditService();
    const output = await userEditService.handle(input);

    return response.json(output.getOutput());
};
