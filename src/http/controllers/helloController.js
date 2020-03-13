class HelloController {
  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    this.helloService = container.helloService;
  }

  /**
   * Find hello by ID.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      res.send(await this.helloService.findHelloById(parseInt(id, 10)));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create hello
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { body } = req;
      res.send(await this.helloService.createHello(body));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete hello by ID.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.helloService.deleteHelloById(parseInt(id, 10));
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HelloController;
