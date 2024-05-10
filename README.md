# gradient-paste

An open source paste server powered by [Hono](https://hono.dev), [React](https://react.dev/), [Mantine](https://mantine.dev/) and [MongoDB](https://www.mongodb.com/)

![kotlin](https://img.shields.io/badge/written%20in-TypeScript-bd13d4?style=for-the-badge)
![license](https://img.shields.io/badge/license-MIT-bd13d4?style=for-the-badge)

## Self hosting

1. `git clone https://github.com/GradientTim/paste`
2. Copy the `.env.example` to `.env` and modify the data in it
   - If you want to use a different port, you must change the Dockerfile
3. (Not Docker users: You need to have the MongoDB Server installed)
4. Start the paste server
   - Docker: `docker compose up -d`
   - Bun: `bun run prod`

### License

This project is licensed under the [MIT](./LICENSE) license