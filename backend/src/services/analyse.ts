const {
  DocumentAnalysisClient,
  AzureKeyCredential,
} = require("@azure/ai-form-recognizer");
import {
  ConflictApplicationInterface,
  defaultConflictApplication,
} from "../models/Application/conflict";

const fs = require("fs");

const endpoint = "https://formrecognizer-instance.cognitiveservices.azure.com/";
const apiKey = "b3b946325c194c32afecab1a7bd3e35a";

// const formUrl = "./LZS_TEST.pdf";
type FormWithoutDocumentPath = Omit<ConflictApplicationInterface, "document">;
interface ProgressStatus {
  status: string;
}
async function runFormRecogniser(formUrl: string) {
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

  const data = await poller.pollUntilDone();
  const { documents } = data;
  const { fields } = documents[0];
  const { family_list_from_MAIS } = fields;
  // construct object
  let result: FormWithoutDocumentPath = Object.keys(fields).reduce(
    (acc, cur) => {
      return { ...acc, [cur]: (fields as any)[cur].value };
    },
    defaultConflictApplication
  );

  // handle table
  const table = family_list_from_MAIS.values;
  // console.log("family_list_from_MAIS.values[0]", table);
  const familyListFromMAIS = table.map((row: { properties: object }) => {
    return Object.keys(row.properties).reduce((acc, cur) => {
      return { ...acc, [cur]: (row.properties as any)[cur].value };
    }, {});
  });
  result.family_list_from_MAIS = familyListFromMAIS;

  console.log(`output for ${formUrl} is`, result);
  return result;
  // uncomment below to save js object into json
  // to avoid unnecessary analysis
  // var jsonData = JSON.stringify(data);
  // fs.writeFile("test.json", jsonData, function (err: Error) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
}

export default runFormRecogniser;
