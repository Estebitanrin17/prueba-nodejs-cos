const service = require("../services/gestion.service");

class GestionController {
  async create(req, res, next) {
    try {
      const gestion = await service.create(req.body);
      res.status(201).json(gestion);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const gestiones = await service.findAll(req.query);
      res.json(gestiones);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const gestion = await service.findOne(req.params.id);
      if (!gestion) return res.status(404).json({ message: "No encontrada" });
      res.json(gestion);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const gestion = await service.update(req.params.id, req.body);
      if (!gestion) return res.status(404).json({ message: "No encontrada" });
      res.json(gestion);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const gestion = await service.delete(req.params.id);
      if (!gestion) return res.status(404).json({ message: "No encontrada" });
      res.json({ message: "Gestión cerrada" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GestionController();
