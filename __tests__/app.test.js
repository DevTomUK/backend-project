const request = require("supertest")
const app = require("../app.js")
const db = require("../db/connection")
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data")
const endpoints = require("../endpoints.json")

beforeEach(() => {
    return seed(data);
  });

  afterAll(() => {
    db.end();
  });

describe("Non-existent endpoints", () => {
    test("GET 404: Should respond with a 404 (Not found) if endpoint does not exist", () => {
        return request(app)
        .get("/api/non-existent")
        .expect(404)
    })
})

describe("/api/topics", () => {

    test("GET 200: Should respond with a 200 OK status with correct endpoint", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
    })

    test("GET 200: Should respond with all topics", () => {
        return request(app)
        .get("/api/topics")
        .then(({body}) => {
            expect(body.topics).toEqual(
                
                [
                { slug: 'mitch', description: 'The man, the Mitch, the legend' },
                { slug: 'cats', description: 'Not dogs' },
                { slug: 'paper', description: 'what books are made of' }
            ])
        })
    })

})

describe("/api", () => {

    test("Returns 200 OK and a response body of all of the available endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body}) => {
            expect(body.endpoints).toEqual(endpoints)
        })
    })
    
})

describe("/api/articles/:article_id", () => {
    test("GET 200: Responds with a 200 when accessed", () => {
        
    })
})