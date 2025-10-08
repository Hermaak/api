import { Class } from "../../models/class/index.js";

export const home = (req, res) => {
  res.json({ app: "Class" });
};

export const create = async (req, res) => {
  const data = req.body;
  try {
    const cls = await new Class({
      ...data,
      created_at: Date.now(),
    }).save();
    res.json(cls);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getAll = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.json(classes);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};
