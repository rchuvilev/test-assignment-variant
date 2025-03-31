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
  const origin = req.headers.get("Origin") || req.headers.get("Referer") || "";
  console.log(
    11111111,
    req,
    req.headers.get("Origin"),
    req.headers.get("Referer"),
  );
  const isDev =
    !origin || origin.includes("localhost") || origin.includes("127.0.0.1");
  console.log("Origin: ", origin, isDev);
  if (req.method !== "POST" && !isDev) {
    res.status(405);
    return res.send(JSON.stringify({ [res.statusCode]: "Wrong method" }));
  }
  const notAllowedOrigin = ["rchuvilev.github.io"].every(
    (allowedOrigin) => !origin?.includes(allowedOrigin),
  );
  if (origin && notAllowedOrigin && !isDev) {
    res.status(401);
    return res.send(JSON.stringify({ [res.statusCode]: "Unauthorized" }));
  }
  let reqBody;
  try {
    const reqBodyJSON = await req.text();
    reqBody = JSON.parse(reqBodyJSON);
  } catch (e) {
    console.error("Error parsing data from request", e);
    reqBody = isDev
      ? {
          Job_title: "FALLBACK, Software Engineer",
          Company: "FALLBACK, OpenAI",
          I_am_good_at: "FALLBACK, writing code",
          Additional_details:
            "FALLBACK, I have a strong passion for AI and ML.",
        }
      : "";
  }
  let msg;
  if (!reqBody) {
    const prompt = generatePrompt(reqBody);
    msg = await fetchCompletion(prompt).catch((err: any) => console.error);
  } else {
    msg = "";
  }
  res.status(200);
  return res.send(JSON.stringify({ msg }));
}

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
        Use only the information provided in the sample cover letter and avoid adding any new details or template placeholders.
    `.trim();
  return prompt;
}

async function fetchCompletion(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or other available models like gpt-4, text-davinci-003
    messages: [{ role: "user", content: prompt }],
  });
  const message = response.choices[0]?.message?.content;
  return message?.toString();
}
