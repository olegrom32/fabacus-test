# fabacus-test

Description of the task does not mention if it should be written in js or ts, thus assuming js by default.

Other assumptions:
- token length is 8 characters
- 404 is returned for tokens that do not exist

### Directory structure
This app is implemented using Hexagonal architectural pattern:
- `src/ui` - the "user-side" or "driving" side, e.g API, CLI, cron, AMQP, etc (so-called thin controllers).
- `src/application` - handlers that contain business logic of our app
- `src/domain` - domain layer contains models, value objects and domain services (potentially, not in our case)
- `src/infrastructure` - the "server-side" or "driven" part, includes integrations with libraries and external data sources (databases, APIs or crypto library)

### Run
```bash
docker compose build
docker compose up
```

### API
Base URL: `http://localhost:3000/`
