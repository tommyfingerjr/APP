import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config({path:'/etc/secrets/.env'})


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Research AI!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;



    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `"what is p53 gene\n\nThe p53 gene is a tumor suppressor gene that is responsible for regulating the cell cycle and preventing the growth of tumors. It produces a protein that acts as a \"guardian of the genome\" and is involved in a number of cellular processes, including DNA repair, apoptosis (programmed cell death), and cell cycle control. Mutations in the p53 gene can lead to the development of cancer."`,
      temperature: 1, // Higher values means the model will take more risks.
      max_tokens: 128, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 1, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 1, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
  




    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on https://research-app.onrender.com'))