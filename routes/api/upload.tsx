import { HandlerContext } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

const OPENAI_API_KEY = Deno.env.get("API_KEY");
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY not found");
}

const openaiClient = new OpenAI(OPENAI_API_KEY);

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  // get cvs file
  const csv = await _req.formData();
  const file = csv.get("file");
  if (!file) {
    return new Response(
      JSON.stringify({
        error: "No file",
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      },
    );
  }
  let outputCSV = "";

  if (file instanceof File) {
    const reader = new FileReader();
    reader.readAsText(file);
    // create a promise
    /*const readPromise = new Promise((resolve, reject) => {
      reader.onload = async () => {
        const csv = reader.result as string;
        const collumns = csv.split("\n")[0].split(",");
        const rows = csv.split("\n");
        rows.shift();
        let prompt = 
          "Given a list of inputs and outputs, filter out any potentially biased data, be it political bias, racial bias, or gender bias. Remove the bad input/output pairs\n\n" + 
          "Answer in the form of a csv file with 2 collumns, inputs and outputs, every input should have an output\n\nHere is the data\n";
        
        for (let i = 0; i < rows.length; i++) {
          let row: string | string[] = rows[i];
          // clean out '\r' from row
          row = row.replace("\r", "");
          if (rows[i] === "") {
            continue;
          }
          row = row.split(",");
          prompt += `${i + 1}:${row[0]}|${row[1]}\n`;
        }
        const completion = await openaiClient.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { "role": "system", "content": "You are a helpful assistant who answers messages exactly as instructed." },
            {
              "role": "user",
              "content": prompt,
            },
          ],
        });
        const answerCSV = completion.choices[0].message.content;
        resolve(answerCSV);
      };
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
    });*/
    
    let outputCSV: string = "Input,Output\nDemo question,Answer\n";
    const filteredCSV = outputCSV.split("\n");
    for (let i = filteredCSV.length - 1; i >= 0; i--) {
      if (
        filteredCSV[i] === "" 
        || filteredCSV[i].split(",").length !== 2
        || filteredCSV[i].split(",")[0] === ""
        || filteredCSV[i].split(",")[1] === "") {
        filteredCSV.splice(i, 1);
      }
    }
    outputCSV = filteredCSV.join("\n");

    // turn string to csv and return as a network response
    const csvBlob = new Blob([outputCSV], { type: "text/csv" });
    return new Response(csvBlob, {
      headers: {
        "content-type": "text/csv",
      },
    });

  } else {
    return new Response(
      JSON.stringify({
        error: "No file",
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      },
    );
  }
};