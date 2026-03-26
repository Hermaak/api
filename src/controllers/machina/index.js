import { Machina } from "../../services/mongoose/index.js";

export const create = async (req, res) => {
  const machina = await new Machina(req.body).save();
  res.json(machina);
};

export const update = async (req, res) => {
  const _id = req.headers.id;
  const updatedMachina = await Machina.findOneAndUpdate({ _id }, req.body, {
    new: true,
  });
  res.json(updatedMachina);
};

export const findById = async (req, res) => {
  const _id = req.params.id;
  if (_id.toLowerCase() == "all") {
    Machina.find().then((machinas) => res.json(machinas));
  } else {
    const machina = await Machina.findById(_id);
    res.json(machina);
  }
};

export const removeAttr = async (req, res) => {
  const _id = req.params.id;
  const params = req.body.attr;
  const obj = {};
  params.map((e) => {
    obj[e] = true;
  });
  db.machina.machinas.update({ _id }, { $unset: obj }, {}, (err, num) => {
    res.json(obj);
  });
};

export const remove = async (req, res) => {
  const _id = req.params.id;
  db.machina.machinas.remove({ _id });
  res.json({});
};
