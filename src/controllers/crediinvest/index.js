import PDFDocument from "pdfkit";
import fs from "fs";

import { Credit } from "../../models/Crediinvest/index.js";

export const create = async (req, res) => {
  const data = req.body;

  try {
    const doc = new PDFDocument();

    const date = Date.now();

    const formatador = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const docName = `crediinvest-requisicao-${date}-${data.nome}`;

    doc.pipe(fs.createWriteStream(`./static/crediinvest/${docName}.pdf`));

    doc
      .image("./static/cover/crediinvest/crediinvest-logo-text.png", 220, 70, {
        fit: [180, 100],
        align: "center",
      })
      .text("FORMULÁRIO DE REQUISIÇÃO DE CRÉDITO", 100, 150, {
        align: "center",
      })
      .text(`ID da requisição: ${date}       Data: ${formatador.format(date)}`, 100, 170)
      .text(
        `Nome: ${data.nome} ${data.apelido}       BI: ${data.bi}       NUIT: ${data.nuit}`,
      )
      .text(`Telefone: ${data.tel}  Valor requerido: ${data.valor} Mt`)
      .text(`Maputo, ${formatador.format(date).split(",")[0]}`, 100, 330, {
        align: "center",
      })
      .text("_________________________________________", 100, 360, {
        align: "center",
      })
      .text(`(${data.nome} ${data.apelido})`, 100, 380, { align: "center" })
      .fontSize(9)
      .opacity(.4)
      .text('----------------------------------------', 100, 600)
      .text('Maputo, Av Karl Marx, nº 204')
      .text('(+258) 872081978')
      .text('https://crediinvest.co.mz')
      .text('contact@crediinvest.co.mz')
      .end();

    const credit = await new Credit({
      ...data,
      created_at: date,
      docName,
      aproved: false,
    }).save();

    res.json(credit);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};

export const getAll = async (req, res) => {
  try {
    const credits = await Credit.find({});
    res.json(credits);
  } catch (error) {
    console.log(error);
    res.status(409).json({});
  }
};
