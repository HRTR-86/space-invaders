const SignUpInput = require('../../../UseCases/Login/SignUpInput');
const SignUpService = require('../../../Services/Usecases/Login/SignUpService');

module.exports = async (request, response) => {
    const input = new SignUpInput(request.body);
    const signUpService = new SignUpService();
    const output = await signUpService.handle(input);

    return response.json(output.getOutput());
};
