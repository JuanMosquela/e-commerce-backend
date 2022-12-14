import { v4 } from "uuid";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const uploadFileHelper = (files, folder = "") => {
  return new Promise((resolve, reject) => {
    const { imagen } = files;

    const modifyName = imagen.name.split(".");
    const extension = modifyName[modifyName.length - 1];

    const validExtensions = ["jpg", "png", "jpeg"];

    if (!validExtensions.includes(extension.toLowerCase())) {
      return reject(`The extension ${extension} its not  valid`);
    }
    const tempName = v4() + "." + extension;
    const uploadPath = join(__dirname, "../uploads/", folder, tempName);

    imagen.mv(uploadPath, function (err) {
      if (err) {
        reject(err);
      }
      resolve(tempName);
    });
  });
};

export { uploadFileHelper };
