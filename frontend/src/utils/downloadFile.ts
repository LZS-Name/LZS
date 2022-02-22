const downloadFile = (url: string, fileName = "") => {
  console.log("url", url);
  fetch(url)
    .then((x) => x.blob())
    .then((b) => {
      const url = window.URL.createObjectURL(b);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
    })
    .catch((err) => console.log);
};
export default downloadFile;
