const fs = require("fs");
const path = require("path");

const {
  fileUploadError,
  unSupportedFileType,
  operateProductError,
  invalidProductId,
  findProductError,
} = require("../const/err.type");
const {
  createProduct,
  updateProduct,
  removeProduct,
  findProducts,
  findProductById,
} = require("../service/product.service");

class ProductController {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit("error", unSupportedFileType, ctx);
      }
      ctx.body = {
        code: 0,
        message: "产品图片上传成功",
        result: {
          person_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", fileUploadError, ctx);
    }
  }

  async unlink(ctx, next) {
    try {
      const res = await findProductById(ctx.params.id);
      fs.unlinkSync(path.join(__dirname, "../upload/", res.p_img_url));
      ctx.body = {
        code: 0,
        message: "删除图片成功",
        result: res.p_img_url,
      };
    } catch (err) {
      console.error(err);
      return ctx.app.emit("error", invalidProductId, ctx);
    }
    await next();
  }

  async create(ctx) {
    try {
      const res = await createProduct(ctx.request.body);
      ctx.body = {
        code: 0,
        message: "操作产品信息成功",
        result: res,
      };
    } catch (err) {
      console.log(ctx.request.body);
      console.error(err);
      return ctx.app.emit("error", operateProductError, ctx);
    }
  }

  async update(ctx) {
    try {
      const res = await updateProduct(ctx.params.id, ctx.request.body);

      if (res) {
        ctx.body = {
          code: 0,
          message: "修改产品信息成功",
          result: "",
        };
      } else {
        return ctx.app.emit("error", invalidProductId, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async remove(ctx) {
    const res = await removeProduct(ctx.params.id);

    if (res) {
      ctx.body = {
        code: 0,
        message: "删除产品成功",
        result: "",
      };
    } else {
      return ctx.app.emit("error", invalidProductId, ctx);
    }
  }

  async findAll(ctx) {
    const res = await findProducts(ctx.params.page);
    ctx.body = {
      code: 0,
      message: "获取产品信息列表成功",
      result: res,
    };
  }

  async findOne(ctx) {
    try {
      const res = await findProductById(ctx.params.id);
      ctx.body = {
        code: 0,
        message: "查询产品信息成功",
        result: res,
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", findProductError, ctx);
    }
  }
}

module.exports = new ProductController();
