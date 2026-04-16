Lists Models | DeepSeek API Docs

Skip to main content

DeepSeek API Docs

English

English
中文（中国）DeepSeek Platform

Quick Start

Your First API Call
Models & Pricing
The Temperature Parameter
Token & Token Usage
Rate Limit
Error Codes

News

DeepSeek-V3.2 Release 2025/12/01
DeepSeek-V3.2-Exp Release 2025/09/29
DeepSeek V3.1 Update 2025/09/22
DeepSeek V3.1 Release 2025/08/21
DeepSeek-R1-0528 Release 2025/05/28
DeepSeek-V3-0324 Release 2025/03/25
DeepSeek-R1 Release 2025/01/20
DeepSeek APP 2025/01/15
Introducing DeepSeek-V3 2024/12/26
DeepSeek-V2.5-1210 Release 2024/12/10
DeepSeek-R1-Lite Release 2024/11/20
DeepSeek-V2.5 Release 2024/09/05
Context Caching is Available 2024/08/02
New API Features 2024/07/25

API Reference

Introduction

Chat

Completions

Models

Lists Models

Others

API Guides

Thinking Mode
Multi-round Conversation
Chat Prefix Completion (Beta)
FIM Completion (Beta)
JSON Output
Tool Calls
Context Caching
Anthropic API

Other Resources

Integrations

API Status Page

FAQ
Change Log

API Reference

Models

Lists Models

# Lists Models

GET
# /models

Lists the currently available models, and provides basic information about each one such as the owner and availability. Check Models & Pricing for our currently supported models.

# Responses​

200

OK, returns A list of models

application/json

Schema

Example (from schema)

Example

Schema

object

string

required

Possible values: [
list]

data

Model[]

required

Array [

id

string

required

The model identifier, which can be referenced in the API endpoints.

object

string

required

Possible values: [
model]

The object type, which is always "model".

owned_by

string

required

The organization that owns the model.

]

{

  "object": "list",

  "data": [

    {

      "id": "string",

      "object": "model",

      "owned_by": "string"

    }

  ]

}

{

  "object": "list",

  "data": [

    {

      "id": "deepseek-chat",

      "object": "model",

      "owned_by": "deepseek"

    },

    {

      "id": "deepseek-reasoner",

      "object": "model",

      "owned_by": "deepseek"

    }

  ]

}

Loading...

Previous
Create FIM Completion (Beta)
Next
Get User Balance

WeChat Official Account

Community

Email

Discord

Twitter

More

GitHub

Copyright © 2026 DeepSeek, Inc.
