import { ResponseBuilder } from "@fermyon/spin-sdk";
import { OpenAI } from "openai";
import "abortcontroller-polyfill/dist/abortcontroller-polyfill-only";

const controller = new AbortController();
const signal = controller.signal;
const openai = new OpenAI({
  apiKey:
    "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", // Replace with your OpenAI API Key
});

export async function handler(req: Request, res: ResponseBuilder) {
  // console.log({ ...req, headers: { ...Object.fromEntries(req.headers) } });
  const origin = req.headers.get("Origin") || req.headers.get("Referer");
  console.log("Origin: ", origin);
  if (req.method !== "POST") {
    res.statusCode = 403;
    return res.send("Wrong method");
  }
  if (
    origin &&
    !origin?.includes("rchuvilev.github.io") &&
    !origin?.includes("127.0.0.1")
  ) {
    res.statusCode = 401;
    return res.send("Unauthorized");
  }
  if (!req.body || !Object.keys(req.body)) {
    res.statusCode = 500;
    return res.send(`No req.body provided: ${JSON.stringify(req.body)}`);
  }

  const reqBody = await req.json();
  const prompt = generatePrompt(reqBody);
  const msg = await fetchCompletion(prompt).catch((err) => console.error);
  res.statusCode = 200;
  return res.send(msg?.toString());

  function generatePrompt(reqBody: {
    Job_title: string;
    Company: string;
    I_am_good_at: string;
    Additional_details: string;
  }): string {
    const Job_title: string = reqBody.Job_title ?? "";
    const Company: string = reqBody.Company ?? "";
    const I_am_good_at: string = reqBody.I_am_good_at ?? "";
    const Additional_details: string = reqBody.Additional_details ?? "";
    const prompt: string = `Given the following template for a cover letter:
        "Dear ${Company} Team,
        I am writing to express my interest in the ${Job_title} position.
        My experience in the realm combined with my skills in ${I_am_good_at} make me a strong candidate for this role.
        ${Additional_details}
        I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.
        Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further."

        Please tailor this template to create an improved, engaging cover letter. 
        Be sure to enhance the structure, tone, and language, making it more compelling and aligned with industry standards. 
        Highlight the most relevant skills and experiences, ensuring the letter speaks directly to the company’s needs. 
        Include specific achievements or examples where applicable to add weight to my qualifications. 
        Additionally, suggest any areas where I could provide more personal insight or unique qualities that would stand out.
    `.trim();
    return prompt;
  }

  async function fetchCompletion(prompt: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or other available models like gpt-4, text-davinci-003
      messages: [{ role: "user", content: "What's the weather like today?" }],
    });
    const message = response.choices[0]?.message?.content;
    console.log("Message: ", message);
    return message?.toString();
  }
}
