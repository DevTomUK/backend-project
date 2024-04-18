
# Northcoders News API  

---  

> ## Live Version:  
> **[NC News API](https://backend-project-c921.onrender.com/api)**


## Summary:

NC News is a backend service built for the purpose of accessing application data programmatically. The data stored on this API can be retrieved through a front end architecture.

## Local Install Instructions:

*Built using PSQL and node-postgres, there are a few requirements needed to run this app locally.*

### 1. **Clone the repo**  
To clone this repo, use `git clone https://github.com/DevTomUK/backend-project.git`.

### 2. **Install Dependencies**
- supertest
- express
- jest-sorted

### 3. **Create .env Files**  
*Test and Development .env files are used to populate the environment variables. Create the following files in the root directory with the contents:*  
> .env.test:   
PGDATABASE=nc_news_test
  
> .env.development:  
PGDATABASE=nc_news

### 4. **Setup and seed local databases**  
*Initial setup of databases will require PSQL to be installed.*  
- Create the local databases using `npm setup-dbs`.  
- Seed the local development databases using `npm seed`.

### 5. **Run tests**  
- Running local tests will also seed the local test databases.
- Use `npm test` to run local testing with jest.

*When pushing to a repo, husky is used to ensure all tests pass before push is complete.*

## **Requirements:**  
**Version Requirements:**  
Node.js - v21.6.2  
Postgres - v8.7.3



  
