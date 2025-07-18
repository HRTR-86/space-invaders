const AuthorityListInput = require('../../../UseCases/Login/AuthorityListInput');
const AuthorityListService = require('../../../Services/Usecases/Login/AuthorityListService');

module.exports = async (request, response) => {
    const input = new AuthorityListInput(request.query);
    const authorityListService = new AuthorityListService();
    const output = await authorityListService.handle(input);

    return response.json(output.getOutput());
};
