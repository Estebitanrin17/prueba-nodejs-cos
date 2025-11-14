const { Op } = require("sequelize");
const Gestion = require("../models/gestion.model");

class GestionService {
  
  // Crear gestión
  async create(data) {
    const gestion = await Gestion.create(data);
    return gestion;
  }

  // Obtener todas las gestiones con filtros avanzados
  async findAll(filters) {
    const { page = 1, limit = 10, q, tipificacion, asesorId, desde, hasta } = filters;

    const where = {};

    // Buscador general por texto (nombre o documento)
    if (q) {
      where[Op.or] = [
        { clienteDocumento: { [Op.like]: `%${q}%` } },
        { clienteNombre: { [Op.like]: `%${q}%` } }
      ];
    }

    // Filtro por tipificación
    if (tipificacion) {
      where.tipificacion = tipificacion;
    }

    // Filtro por asesorId
    if (asesorId) {
      where.asesorId = asesorId;
    }

    // Filtro por rango de fechas
    if (desde && hasta) {
      where.createdAt = {
        [Op.between]: [new Date(desde), new Date(hasta)]
      };
    } else if (desde) {
      where.createdAt = {
        [Op.gte]: new Date(desde)
      };
    } else if (hasta) {
      where.createdAt = {
        [Op.lte]: new Date(hasta)
      };
    }

    // Paginación
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

  // Buscar una gestión por ID
  async findOne(id) {
    const gestion = await Gestion.findByPk(id);
    return gestion;
  }

  // Actualizar gestión
  async update(id, data) {
    const gestion = await Gestion.findByPk(id);

    if (!gestion) return null;

    await gestion.update(data);
    return gestion;
  }

  // Borrado lógico (status = "CERRADA")
  async delete(id) {
    const gestion = await Gestion.findByPk(id);

    if (!gestion) return null;

    await gestion.update({ estado: "CERRADA" });
    return gestion;
  }
}

module.exports = new GestionService();
