"use strict";

class Repository {
  constructor(Model) {
    this.Model = Model;
    this.all = this.all.bind(this);
    this.update = this.update.bind(this);
    this.findOne = this.findOne.bind(this);
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.upsert = this.upsert.bind(this);
    this.paginate = this.paginate.bind(this);
    this.findAndCountAll = this.findAndCountAll.bind(this);
  }

  create(payload) {
    return this.Model.create(payload);
  }

  find(id) {
    return this.Model.findByPk(id);
  }

  findOne(condition) {
    return this.Model.findOne({ where: condition });
  }

  update(condition, update) {
    return this.Model.update(update, { where: condition });
  }

  findAll(condition) {
    return this.Model.findAll({ where: condition });
  }

  findAndCountAll(condition) {
    return this.Model.findAndCountAll(condition);
  }

  all(condition) {
    return this.Model.findAll(condition);
  }

  upsert(payload) {
    return this.Model.upsert(payload, { returning: true });
  }

  async paginate(condition = {}, page, limit, orderBy, order) {
    if (!page) page = 1;
    if (!limit) limit = 4;
    const offset = limit * (page - 1);
    const query = {};
    if (offset && offset > 0) query.offset = offset;

    query.limit = parseInt(limit);
    console.log("Condi", condition);
    const { count, rows } = await this.Model.findAndCountAll({
      where: condition,
      order: [[orderBy || "id", order || "DESC"]],
      ...query,
    });

    return {
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(count / limit),
      total: count,
      data: rows,
    };
  }

  getModel() {
    return this.Model;
  }
}

module.exports = Repository;
