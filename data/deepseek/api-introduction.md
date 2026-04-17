Source: https://api-docs.deepseek.com/

# Your First API Call
The DeepSeek API uses an API format compatible with OpenAI. By modifying the configuration, you can use the OpenAI SDK or softwares compatible with the OpenAI API to access the DeepSeek API.
PARAM VALUE
base_url * âââââââ` https://api.deepseek.com`
api_key apply for an API key
* To be compatible with OpenAI, you can also use ` https://api.deepseek.com/v1`  as the ` base_url`. But note that the ` v1`  here has NO relationship with the model's version.
* The ` deepseek-chat`  and ` deepseek-reasoner`  correspond to the model version DeepSeek-V3.2 (128K context limit), which differs from the APP/WEB version.` deepseek-chat`  is the non-thinking mode  of DeepSeek-V3.2 and ` deepseek-reasoner`  is the thinking mode  of DeepSeek-V3.2.

## Invoke The Chat API
Once you have obtained an API key, you can access the DeepSeek API using the following example scripts. This is a non-stream example, you can set the ` stream`  parameter to ` true`  to get stream response.
- curl
- python
- nodejs

```
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" \
  -d '{
        "model": "deepseek-chat",
        "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        "stream": false
      }'

```

```
# Please install OpenAI SDK first: `pip3 install openai`
import os
from openai import OpenAI
client = OpenAI(api_key=os.environ.get('DEEPSEEK_API_KEY'), base_url="https://api.deepseek.com")
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
    ],
    stream=False
)
print(response.choices[0].message.content)

```

```
// Please install OpenAI SDK first: `npm install openai`
import OpenAI from "openai";
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "deepseek-chat",
  });
  console.log(completion.choices[0].message.content);
}
main();

```

- Invoke The Chat API
WeChat Official Account
-
Community
- Email
- Discord
- Twitter
More
- GitHub
Copyright Â© 2026 DeepSeek, Inc.
