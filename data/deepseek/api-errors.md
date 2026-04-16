Error Codes | DeepSeek API Docs

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

Quick Start

Error Codes

# Error Codes

When calling DeepSeek API, you may encounter errors. Here list the causes and solutions.

                    CODE                    
DESCRIPTION

400 - Invalid Format
Cause: Invalid request body format.
 Solution: Please modify your request body according to the hints in the error message. For more API format details, please refer to DeepSeek API Docs.

401 - Authentication Fails
Cause: Authentication fails due to the wrong API key.
 Solution: Please check your API key. If you don&#x27;t have one, please create an API key first.

402 - Insufficient Balance
Cause: You have run out of balance.
 Solution: Please check your account&#x27;s balance, and go to the Top up page to add funds.

422 - Invalid Parameters
Cause: Your request contains invalid parameters.
 Solution: Please modify your request parameters according to the hints in the error message. For more API format details, please refer to DeepSeek API Docs.

429 - Rate Limit Reached
Cause: You are sending requests too quickly.
 Solution: Please pace your requests reasonably. We also advise users to temporarily switch to the APIs of alternative LLM service providers, like OpenAI.

500 - Server Error
Cause: Our server encounters an issue.
 Solution: Please retry your request after a brief wait and contact us if the issue persists.

503 - Server Overloaded
Cause: The server is overloaded due to high traffic.
 Solution: Please retry your request after a brief wait.

Previous
Rate Limit
Next
DeepSeek-V3.2 Release

WeChat Official Account

Community

Email

Discord

Twitter

More

GitHub

Copyright © 2026 DeepSeek, Inc.
