Rate Limit | DeepSeek API Docs

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

Rate Limit

# Rate Limit

DeepSeek API does NOT constrain user&#x27;s rate limit. We will try out best to serve every request.

However, please note that when our servers are under high traffic pressure, your requests may take some time to receive a response from the server. During this period, your HTTP request will remain connected, and you may continuously receive contents in the following formats:

Non-streaming requests: Continuously return empty lines

Streaming requests: Continuously return SSE keep-alive comments (
: keep-alive)

These contents do not affect the parsing of the JSON body by the OpenAI SDK. If you are parsing the HTTP responses yourself, please ensure to handle these empty lines or comments appropriately.

If the request has not started inference after 10 minutes, the server will close the connection.

Previous
Token & Token Usage
Next
Error Codes

WeChat Official Account

Community

Email

Discord

Twitter

More

GitHub

Copyright © 2026 DeepSeek, Inc.
