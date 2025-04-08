<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
- https://www.exchangerate-api.com/docs/java-currency-api

- https://docs.nestjs.com/security/rate-limiting


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

Package Versions


node -v

20.12.2

node -v

11.0.6

npm --v
10.5.0


---

## Architecture Diagram
 
The diagram can be viewed here at  apps/Screenshots/Architecture.png


----


## Running This Application Locally with Docker Compose

Follow these steps to run all microservices locally using Docker:

---

###  Prerequisites

- [Node.js](https://nodejs.org) installed
- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Docker Compose](https://docs.docker.com/compose/) installed
- [Nestjs](https://www.npmjs.com/package/@nestjs/cli) installed
- Clone this repo

---

### 1. Install Dependencies

Install packages so that `package-lock.json` is created (needed for Docker caching):

```bash
npm install
```

---

### 2. Populate Environment Variables

Create a `.env` file in the **root** of your project (same level as `docker-compose.yml`):

```env
# RabbitMQ
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672

# API Gateway
API_GATEWAY_PORT=3000

# Auth Service (PostgreSQL DB credentials)
AUTH_DB_HOST=your-db-host
AUTH_DB_PORT=5432
AUTH_DB_DATABASE=your-db-name
AUTH_DB_USERNAME=your-username
AUTH_DB_PASSWORD=your-password

# Wallet Service
WALLET_DB_HOST=your-db-host
WALLET_DB_PORT=5432
WALLET_DB_DATABASE=your-db-name
WALLET_DB_USERNAME=your-username
WALLET_DB_PASSWORD=your-password

# FX Service
FX_DB_HOST=your-db-host
FX_DB_PORT=5432
FX_DB_DATABASE=your-db-name
FX_DB_USERNAME=your-username
FX_DB_PASSWORD=your-password

# Mailer
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_USE_TLS=false
MAIL_USE_SSL=false

# FX API
FX_API_KEY=your-fx-api-key

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
```

> ⚠️ Replace the values with your actual credentials or Supabase/PostgreSQL config.

---

###  3. Start All Services

```bash
docker-compose up --build
```

This will spin up:
- `auth-service`
- `wallet-service`
- `fx-service`
- `api-gateway`
- `rabbitmq`
- `redis`

🖥️ The API Gateway will be available at: [http://localhost:3000](http://localhost:3000)

---

### 4. Shut Down Services

To gracefully stop and remove all containers:

```bash
docker-compose down
```



---
## Role Creation for DB

To create a role (user) with the name `xxxxxxxxxxxxxxx` in your Supabase PostgreSQL instance, you can use the SQL editor provided by the Supabase dashboard. This’s how you can do it:

1. **Log In to Your Supabase Dashboard:**  
   Open your Supabase project and navigate to the SQL editor.

2. **Run a SQL Command to Create the Role:**  
   Use a command like the following. Make sure to enclose the role name in double quotes if it contains special characters (like dots). Replace the password with your desired password:

   ```sql
   CREATE ROLE "xxxxxxxxxxxxxxxxxxxxx" LOGIN PASSWORD 'xxxxxxxxxxxxxxxxx';
   ```

3. **Grant Necessary Privileges:**  
   If this role needs to access a specific database, grant it the necessary privileges. For example, if you want to grant all privileges on a database named `your_database`, run:

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE your_database TO "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   ```

4. **Verify the Role:**  
   You can verify that the role has been created by querying the `pg_roles` table:

   ```sql
   SELECT rolname FROM pg_roles;
   ```

### Important Notes

- **Role Naming:**  
  Role names that include dots or other special characters must be double-quoted.  
- **Supabase Restrictions:**  
  Depending on your Supabase project’s configuration, there might be some restrictions on role creation or privilege grants. Make sure your Supabase user has sufficient permissions to create new roles.
- **Use in Your Application:**  
  Once the role is created and privileges are granted, update your application’s environment variables (e.g., `AUTH_DB_USERNAME`, `WALLET_DB_USERNAME`, etc.) to match this new role if you plan to use it for database connections.

By running the above commands in the Supabase SQL editor, you’ll create the role and grant it access to your desired database.

---

## PART 1: Documented Assumptions



### 📌 Assumptions

#### 💱 FX Rates
- The app fetches **real-time FX rates** from [ExchangeRate-API](https://www.exchangerate-api.com/), using the `latest/:base` endpoint.
- The rates are not cached yet. Every conversion/trade fetches the latest rate during the request.
- If the rate API fails or the requested currency pair is missing, the operation returns a `400` error.
- Rates are assumed to be **one-way** (e.g., `NGN → USD`). Reverse rates are calculated using new requests or by re-querying.

#### 👛 Wallet Design
- Each user has a single wallet that stores balances as a key-value pair:
  ```json
  { "NGN": 10000, "USD": 5.45, "EUR": 2.93 }
  ```
- Wallets are created **automatically** when first accessed (`get_wallet`) or during the first fund/convert/trade operation.
- **Multi-currency support** is native: each currency is a separate key inside the `balances` JSONB column.
- There is **no overdraft** — all balance checks are enforced before converting or trading.
- Funds are only modified in atomic operations to prevent race conditions.
- Transactions are recorded for every wallet action: `fund`, `convert`, `trade`.

#### 🛂 User System
- Only **verified users** are allowed to trade.
- Users are registered with an email and password, and must verify with an OTP sent via email.
- `userId` is used to identify and link wallet and transaction records — currently passed directly via API calls.

#### 📤 Other Notes
- FX conversions use `amount * rate`, not `amount / rate`. (This assumes NGN → USD would return few USD for a large amount of NGN.)
- No admin users or role-based access currently.
- Rate decimals are not truncated — precision is preserved as returned by the API.

---

## PART 2: Testing 


##  Testing

This project includes **unit tests** for critical controller logic related to wallet operations.

###  What’s Tested

- **Get Wallet**: Returns user wallet by ID, creates it if not found.
- **Fund Wallet**: Adds currency balance and logs transaction.
- **Convert Currency**: Converts from one currency to another using live FX rates.
-  **Trade Currency**: Identical to conversion, simulating a currency trade.
-  **Transaction History**: Returns all wallet transactions for a given user.
-  **Health Check**: Confirms the wallet service is reachable.

### 🛠 How to Run Tests

Make sure you're in the root of the project and run:

```bash
npm run test wallet-service
```

To view test coverage:

```bash
npm run test:cov wallet-service
```

### 🧪 Test File

Tests are located in:

```bash
apps/wallet-service/src/wallet.controller.spec.ts
```

> These tests use Nest’s `@nestjs/testing` module and Jest for mocking service behavior.


---

##  Scalability Strategy

To ensure this FX Trading App scales effectively to support **millions of users**, we’ve designed the architecture with several key scalability considerations in mind:

---

###  Microservices Architecture

Each core domain (`auth-service`, `wallet-service`, `fx-service`, `api-gateway`) is independently containerized and deployed as a Kubernetes `Deployment`. This enables:

- Horizontal scaling of each service based on load
- Isolation of failures and resource bottlenecks
- Independent deployments and versioning

---

### Kubernetes + Kustomize for Declarative Infrastructure

We leverage **Kubernetes** for container orchestration, and use `kustomize` to:

- Cleanly manage base and overlay environments
- Automate creation of namespaces, services, secrets, ingress, and autoscaling objects
- Keep deployments reproducible and environment-specific

Deployment is executed via:

```bash
kubectl apply -k k8s/base
```

---

### 🔁 Event-Driven Autoscaling with KEDA

KEDA (Kubernetes Event-Driven Autoscaler) allows services to scale based on real-time activity:

- **CPU-based triggers** dynamically scale the `auth-service` and `wallet-service` from 1 to 10+ replicas.
- Each microservice can independently auto-scale based on incoming traffic, usage, or queue length.

Sample KEDA config for `wallet-service`:

```yaml
minReplicaCount: 1
maxReplicaCount: 10
triggers:
  - type: cpu
    metadata:
      type: Utilization
      value: "70"
```

This ensures optimal resource usage during both low and peak traffic periods.

---

### 📦 Image Management via DockerHub

All microservices are built and pushed to DockerHub under:

```
docker.io/adesojialu/{service-name}:latest
```

This enables versioned and reproducible image deployments in all environments.

---

### 🧪 CI/CD with Jenkins

We use a `Jenkinsfile` that automates:

- Code checkout
- Building & tagging Docker images
- Pushing to DockerHub
- Deploying to Kubernetes using Helm

This ensures every new commit can be safely and consistently deployed to production environments.

---

### 🔐 TLS & Secure Ingress with cert-manager

We use **cert-manager** and Let's Encrypt to automatically provision TLS certificates for the website below as an example:

```
https://sortolng.com
```

This ensures encrypted communication and secure API access.

---

### 🔐 Secrets Management via Kubernetes

Sensitive values like database credentials, SMTP passwords, and API keys are stored securely using Kubernetes `Secrets`. These are mounted into the appropriate services at runtime.

---

### 📊 (Optional Enhancements)

For additional observability and long-term scalability:

- 🔍we can use **Prometheus + Grafana** for monitoring metrics like CPU, memory, and response times
- 💡 Enable **distributed tracing** (e.g., OpenTelemetry or Jaeger)
- 📬 Set up Slack/Email alerts for auto-scaling events and errors

---


### Conclusion

So this architecture is built with scalability, resilience, and maintainability in mind. Thanks to Kubernetes + KEDA + CI/CD, the app can:

- Scale to thousands of concurrent users
- Automatically provision resources during traffic spikes
- Reduce cost by scaling down during low usage
- Maintain fast deploy cycles and independent service updates

> 💡 This infrastructure can be ported to any cloud environment (GKE, EKS, AKS, DigitalOcean, etc.) with minimal changes.

---

### Endpoint Testing

---


### API Endpoint Testing Using Curl and Postman
The successful implementation of these is found in the screenshots folder  or visit  http://localhost:3000/api/docs


Key API Endpoints
Endpoint Description

Post Register a user and trigger OTP email
/outh/register

POST /auth/verify Verify OTP and activate account

GET /wallet Get user wallet balances by currency


POST /wallet/fund

Post
/wallet/convert

Post
/wallet/trade

GET /fx/rates

GET /transactions

Fund wallet in NGN or other currencies

Convert between currencies using real-time FX rates

‘Trade Naira with other currencies and vice versa

Retrieve current FX rates for supported currency
pairs

View transaction history

All transactions

http://localhost:3000/transactions/1

Filter by type

http://localhost:3000/transactions/1?type=convert

Filter by status

http://localhost:3000/transactions/1?status=success

Filter by date range

http://localhost:3000/transactions/1?from=2025-04-06&to=2025-04-08

---

### Deploying to your Host Server

---
Reference files are availabe at k8s then run bash `start.sh` for a Posix OS CLI 

---

## Deploying via Helm

---
Reference files are availabe at `helm` and are still worked upon

---


### References





 https://medium.com/@ryanmambou/how-to-setup-a-microservice-with-nestjs-rabbitmq-typeorm-and-postgres-2eb691c17e17

 https://amplication.com/blog/working-with-microservices-with-nestjs

 https://docs.nestjs.com/

 https://www.npmjs.com/package/@nestjs/microservices

 https://medium.com/@Xfade/microservices-with-nestjs-10b2a10a1911

 https://www.npmjs.com/package/@nestjs/microservices

 https://docs.nestjs.com/cli/overview