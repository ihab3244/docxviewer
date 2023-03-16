import { TemplateHandler } from "easy-template-x";
import JSZip from 'jszip'
import im from './ph.png'
async function docxGenerator(template, data, image) {
  const response = await fetch(template);
  const templateFile = await response.blob();
  const handler = new TemplateHandler();
  const doc = await handler.process(templateFile, data);


  // // Replace the placeholder images
  // Read the produced binary zip file again to replace the placeholder images
  const new_zip = new JSZip()
  await new_zip.loadAsync(doc)

  // Replace the image
  const target_path = 'word/media/image1.png'
  new_zip.remove(target_path)
  new_zip.file(target_path, image, { binary: true })

  // Produce an output buffer
  const blob = await new_zip.generateAsync({ type: "blob" })



  saveFile('myTemplate - output.docx', blob);
}
export default docxGenerator



function saveFile(filename, blob) {

  // see: https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob);

  // create temp link element
  let link = document.createElement("a");
  link.download = filename;
  link.href = blobUrl;

  // use the link to invoke a download
  document.body.appendChild(link);
  link.click();

  // remove the link
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
    link = null;
  }, 0);
}

async function readLocalImage(image) {
  const response = await fetch(image);
  const imageBlob = await response.blob();

  return imageBlob
}

export {saveFile, readLocalImage}
