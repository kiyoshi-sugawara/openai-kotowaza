import { AzureKeyCredential, ChatRequestMessage, OpenAIClient } from "@azure/openai";

export const generateKotowazaText = async (message: string) => {
  console.log("enter lib/generateKotowazaText.ts")
  try {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const azureApiKey = process.env.AZURE_OPENAI_API_KEY!;
    const deploymentId = process.env.AZURE_OPENAI_DEPLOYMENT_ID!;
    const content = `
    #以下のキーワードを含むような、架空のことわざとその意味を教えてください。
    #キーワード:
    ${message}
    #注意
    #・返信する内容は、"{"title": "xxx", "detail": "xxx", "englishDetail": "xxx"}"のようにjson形式で返してください。jsonのキーとバリューは、必ず{"key1": "value1", "key2": "value2", "key3": "value3"}のように、各キーとバリューをダブルクオーテーション("")で囲んでください。
    #・架空のことわざのタイトル(title)は、この世に存在しない架空のことわざ名を記載してください。
    #・架空のことわざの意味(detail)は、架空のことわざ(kotowaza)の意味やその使い方を記載してください。
    #・架空のことわざの意味の英訳(englishDetail)は、架空のことわざの意味(detail)を英語に翻訳して記載してください。
    #・架空のことわざは、30文字以内。
    #・架空のことわざの意味は、100文字程度。
    `;
    console.log("content")
    console.log(content)

    const messages : ChatRequestMessage[] = [
      { role: "system", content: "You are a brilliant japanese linguist." },
      { role: "user", content },
    ];
    console.log("messages");
    console.log(messages);
    console.log("endpoint: " + endpoint)
    console.log("azureApiKey: " + azureApiKey)
    const client = new OpenAIClient(
      endpoint,
      new AzureKeyCredential(azureApiKey)
    );

    console.log("call client.getChatCompletions()")
    const result = await client.getChatCompletions(deploymentId, messages);
    console.log("return client.getChatCompletions()")
    console.log("result");
    console.log(result);
    console.log("result.choices");
    console.log(result.choices);
    console.log("result.choices[0].message?.content");
    console.log(result.choices[0].message?.content);
    return result.choices;
  } catch (error) {
    console.log("テキスト生成エラー：", error);
  }
};
