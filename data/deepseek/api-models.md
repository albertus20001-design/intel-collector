Source: https://api-docs.deepseek.com/api/list-models

# Lists Models

```
GET

## /models

```

Lists the currently available models, and provides basic information about each one such as the owner and availability. Check Models & Pricing  for our currently supported models.

## Responses
- 200
OK, returns A list of models
- application/json
- Schema
- Example (from schema)
- Example
Schema
object string required Possible values:  [` list`]
data
Model[]
required
- Array [
id string required The model identifier, which can be referenced in the API endpoints.
object string required Possible values:  [` model`]
The object type, which is always "model".
owned_by string required The organization that owns the model.
- ]

```
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

```

```
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

```

Loading...
WeChat Official Account
-
Community
- Email
- Discord
- Twitter
More
- GitHub
Copyright Â© 2026 DeepSeek, Inc.
