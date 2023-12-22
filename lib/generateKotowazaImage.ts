import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

export const generateKotowazaImage = async (message: string) => {
  console.log("enter lib/generateKotowazaImage.ts")
  try {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const azureApiKey = process.env.AZURE_OPENAI_API_KEY!;
    const deploymentName = "Dalle3";
    console.log("endpoint: " + endpoint)
    console.log("azureApiKey: " + azureApiKey)
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );

    const prompt = message;
    console.log("ことわざの英訳：", prompt);
    const size = "1024x1024";
    const n = 1;

    //const result = await client.getImages(prompt, { n, size });
    const result = await client.getImages(deploymentName, prompt, { n, size });
    console.log(result)
    return result;
  } catch (error) {
    console.log("イメージ生成エラー：", error);
  }
};
