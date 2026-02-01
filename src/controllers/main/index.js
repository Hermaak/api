import XLSX from "xlsx";
import path from "path";
import { __dirname } from "../../config/index.js";
import { env } from "../../config/index.js";
import sendMail from "../../services/nodemailer/send_mail.js";

export const home = (req, res) => {
  const auth = req.headers.authorization;
  res.json({
    info: "Welcome to our API 🖖",
  });
};

export const bairros = (req, res) => {
  const distrito = req.params.distrito;

  // Specify the path to your Excel file
  const excelFilePath = path.join(__dirname, "../../static/api-bairros.xlsx");

  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);

  // Get the names of all sheets in the Excel file
  const sheetNames = workbook.SheetNames;

  // Choose the sheet you want to read (assuming the first sheet for this example)
  const selectedSheet = sheetNames[0];

  // Get the data from the selected sheet
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[selectedSheet]);

  res.json(XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[2]]));
};

export const getBairros = (req, res) => {
  const distrito = req.params.distrito;

  // Specify the path to your Excel file
  const excelFilePath = path.join(__dirname, "../../static/api-bairros.xlsx");

  // Read the Excel file
  const workbook = XLSX.readFile(excelFilePath);

  // Get the names of all sheets in the Excel file
  const sheetNames = workbook.SheetNames;

  // Choose the sheet you want to read (assuming the first sheet for this example)
  const selectedSheet = sheetNames[0];

  // Get the data from the selected sheet
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[selectedSheet]);

  res.json({
    distrito: XLSX.utils
      .sheet_to_json(workbook.Sheets[sheetNames[1]])
      .find(function (obj) {
        return obj.id == distrito;
      }),
    bairros: XLSX.utils
      .sheet_to_json(workbook.Sheets[sheetNames[2]])
      .filter(function (obj) {
        return obj.id_distrito == distrito;
      }),
  });
};

export const getDistritos = (req, res) => {
  const workbook = XLSX.readFile(
    path.join(__dirname, "../../static/api-bairros.xlsx")
  );
  const sheet_name_list = workbook.SheetNames;
  let distritos = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);

  distritos = distritos.map((ds) => ({
    ...ds,
    bairros: XLSX.utils
      .sheet_to_json(workbook.Sheets[sheet_name_list[2]])
      .filter((b) => b.id_distrito == ds.id)
      .map(({id, label}) => ({id, label})),
  }));

  res.json(distritos);
};

export const getMusics = (req, res) => {
  const musics = [
    {
      id: 0,
      url: "https://the-music-link.com/0",
    },
  ];

  res.json(musics);
};

export const getResource = (req, res) => {
  const id = req.headers.id;
  const data = req.body;

  console.log(id, data);

  const resource = {};

  res.json(resource);
};

export const cronusSendMsg = async (req, res) => {
  const data = req.body;
  const { email, name } = data.contact;
  const user = req.headers.user;
  const text = data.text;
  sendMail(email, `CRONUS > ${user}`, text);
  res.json({});
};
