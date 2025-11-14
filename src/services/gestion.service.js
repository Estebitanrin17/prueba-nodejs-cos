const Gestion = require("../models/gestion.model");
const { Op } = require("sequelize");

class GestionService {
  async create(data) {
    return await Gestion.create(data);
  }

  async findAll(filters) {
    const { page = 1, limit = 10, q, tipificacion, asesorId, desde, hasta } = filters;

    const where = {};

    if (q) {
      where[Op.or] = [
        { clienteDocumento: { [Op.like]: `%${q}%` } },
        { clienteNombre: { [Op.like]: `%${q}%` } }
      ];
    }

    if (tipificacion) where.tipificacion = tipificacion;
    if (asesorId) where.asesorId = asesorId;

    if (desde && hasta) {
      where.createdAt = { [Op.between]: [desde, hasta] }
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Gestion.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]]
    });

    return {
      data: rows,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async findOne(id) {
    return await Gestion.findByPk(id);
  }

  async update(id, data) {
    const gestion = await this.findOne(id);
    if (!gestion) return null;
    return await gestion.update(data);
  }

  async delete(id) {
    const gestion = await this.findOne(id);
    if (!gestion) return null;
    return await gestion.update({ estado: "cerrada" });
  }
}

module.exports = new GestionService();
