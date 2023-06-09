const usageService = require("../service/usage.service");

class UsageController {
  async create(ctx) {
    try {
      const usage = ctx.request.body;
      const newUsage = await usageService.createUsage(usage);
      ctx.status = 201;
      ctx.body = newUsage;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  }

  async findUsagesByPId(ctx) {
    try {
      const u_p_id = ctx.params.u_p_id;
      const usages = await usageService.findUsagesByPId(u_p_id);
      ctx.status = 200;
      ctx.body = usages;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  }

  async deleteUsageById(ctx) {
    try {
      const id = ctx.params.id;
      const result = await usageService.deleteUsageById(id);
      if (result) {
        ctx.status = 200;
        ctx.body = { message: "Usage deleted successfully" };
      } else {
        ctx.status = 404;
        ctx.body = { error: "Usage not found" };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  }

  async updateUsageById(ctx) {
    try {
      const id = ctx.params.id;
      const usage = ctx.request.body;
      const result = await usageService.updateUsageById(id, usage);
      if (result) {
        ctx.status = 200;
        ctx.body = { message: "Usage updated successfully" };
      } else {
        ctx.status = 404;
        ctx.body = { error: "Usage not found" };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  }

  async findOne(ctx) {
    try {
      const id = ctx.params.id;
      const usage = await usageService.findOne(id);
      if (usage) {
        ctx.status = 200;
        ctx.body = usage;
      } else {
        ctx.status = 404;
        ctx.body = { error: "Usage not found" };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  }

  async findUsageByName(ctx) {
    try {
      const name = ctx.params.name;
      const usages = await usageService.findUsageByName(name);
      ctx.status = 200;
      ctx.body = usages;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  }
}

module.exports = new UsageController();
