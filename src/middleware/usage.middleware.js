const {  dbError, productFormatError } = require("../const/err.type");
const db = require("../database/seq.mysql");

const usageValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      u_id: { type: "number", required: true },
      u_p_id: { type: "number", required: true },
      u_name: { type: "string", required: true },
      u_sex: { type: "string", required: true },
      u_age: { type: "number", required: true },
      u_first: { type: "date", required: true },
      u_last: { type: "date", required: true },
      u_plan_url: { type: "string", required: true },
    });
  } catch (err) {
    console.error(err);
    productFormatError.result = err;
    return ctx.app.emit("error", productFormatError, ctx);
  }
  await next();

  const { u_id, u_p_id, u_name, u_sex, u_age, u_first, u_last, u_plan_url } =
    ctx.request.body;

  try {
    const result = await db.query(
      `INSERT INTO \`Usage\` (\`u_id\`, \`u_p_id\`, \`u_name\`, \`u_sex\`, \`u_age\`, \`u_first\`, \`u_last\`, \`u_plan_url\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [u_id, u_p_id, u_name, u_sex, u_age, u_first, u_last, u_plan_url]
    );
    if (result.affectedRows !== 1) {
      throw new Error("Insert failed");
    }
  } catch (err) {
    console.error(err);
    dbError.result = err;
    return ctx.app.emit("error", dbError, ctx);
  }
};

module.exports = {
  usageValidator,
};
