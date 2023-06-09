const { productFormatError } = require("../const/err.type");

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      p_id:{type:"string",required:false},
      p_type: { type: "string", required: true },
      p_state: { type: "string", required: true },
      p_time: { type: "datetime", required: false },
      p_img_url: { type: "string", required: true },
    });
  } catch (err) {
    console.error(err);
    productFormatError.result = err;
    return ctx.app.emit("error", productFormatError, ctx);
  }
  await next();
};

const unlink = async (ctx, next) => {
  const id = ctx.params.id;
  const product = await Product.findOne({ where: { p_id: id } });
  if (product) {
    const imgUrl = product.p_img_url;
    await deleteImg(imgUrl);
  }
  await next();
};

module.exports = {
  validator,
  unlink,
};
