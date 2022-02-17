const {
  DocumentAnalysisClient,
  AzureKeyCredential,
} = require("@azure/ai-form-recognizer");
// const { DefaultAzureCredential } = require("@azure/identity");

const fs = require("fs");

const endpoint = "https://formrecognizer-instance.cognitiveservices.azure.com/";
const apiKey = "b3b946325c194c32afecab1a7bd3e35a";

const formUrl = "./LZS_TEST.pdf";

interface ProgressStatus {
  status: string;
}
async function main() {
  // const credential = new DefaultAzureCredential(endpoint, new AzureKeyCredential(apiKey));
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );
  const file = fs.createReadStream(formUrl);

  // The model that is passed to the following function call determines the type of the eventual result. In the
  // example, we will use the prebuilt receipt model, but you could use a custom model ID/name instead.
  const poller = await client.beginAnalyzeDocument("zakat-second", file, {
    onProgress: ({ status }: ProgressStatus) => {
      console.log(`status: ${status}`);
    },
  });
  // const poller = await client.beginAnalyzeDocuments("zakat-project", formUrl);

  const data = await poller.pollUntilDone();
  const { pages, tables, styles, keyValuePairs, entities, documents } = data;
  var jsonData = JSON.stringify(data);
  fs.writeFile("test.json", jsonData, function (err: Error) {
    if (err) {
      console.log(err);
    }
  });
  console.log("documents", documents);
  console.log("tables", tables);
  console.log("pages", pages);
  console.log("styles", styles);

  if (keyValuePairs.length <= 0) {
    console.log("No key-value pairs were extracted from the document.");
  } else {
    console.log("Key-Value Pairs:");
    for (const { key, value, confidence } of keyValuePairs) {
      console.log("- Key  :", `"${key.content}"`);
      console.log(
        "  Value:",
        `"${value?.content ?? "<undefined>"}" (${confidence})`
      );
    }
  }

  if (entities.length <= 0) {
    console.log("No entities were extracted from the document.");
  } else {
    console.log("Entities:");
    for (const entity of entities) {
      console.log(
        `- "${entity.content}" ${entity.category} - ${
          entity.subCategory ?? "<none>"
        } (${entity.confidence})`
      );
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
