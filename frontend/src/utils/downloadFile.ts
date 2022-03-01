const downloadFile = (path: string, fileName = "") => {
  fetch(`/api/application/form/download/${path}`)
    .then((x) => x.blob())
    .then((b) => {
      const url = window.URL.createObjectURL(b);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
    })
    .catch((err) => {
      alert("Sila cuba sekali lagi");
      console.log(err);
    });
};
export default downloadFile;
