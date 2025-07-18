const LoginInput = require('../../../UseCases/Login/LoginInput');
const LoginService = require('../../../Services/Usecases/Login/LoginService');

module.exports = async (request, response) => {
    const input = new LoginInput(request.body);
    const loginService = new LoginService();
    const output = await loginService.handle(input);

    return response.json(output.getOutput());
};
