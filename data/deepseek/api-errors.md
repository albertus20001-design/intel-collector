Source: https://api-docs.deepseek.com/quick_start/error_codes

# Error Codes
When calling DeepSeek API, you may encounter errors. Here list the causes and solutions.
Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â CODEÂ Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â DESCRIPTION
400Â -Â InvalidÂ Format Cause: Invalid request body format.
Solution: Please modify your request body according to the hints in the error message. For more API format details, please refer to DeepSeek API Docs.
401Â -Â AuthenticationÂ Fails Cause: Authentication fails due to the wrong API key.
Solution: Please check your API key. If you don't have one, please create an API key  first.
402Â -Â InsufficientÂ Balance Cause: You have run out of balance.
Solution: Please check your account's balance, and go to the Top up  page to add funds.
422Â -Â InvalidÂ Parameters Cause: Your request contains invalid parameters.
Solution: Please modify your request parameters according to the hints in the error message. For more API format details, please refer to DeepSeek API Docs.
429Â -Â RateÂ LimitÂ Reached Cause: You are sending requests too quickly.
Solution: Please pace your requests reasonably. We also advise users to temporarily switch to the APIs of alternative LLM service providers, like OpenAI.
500Â -Â ServerÂ Error Cause: Our server encounters an issue.
Solution: Please retry your request after a brief wait and contact us if the issue persists.
503Â -Â ServerÂ Overloaded Cause: The server is overloaded due to high traffic.
Solution: Please retry your request after a brief wait.
WeChat Official Account
-
Community
- Email
- Discord
- Twitter
More
- GitHub
Copyright Â© 2026 DeepSeek, Inc.
