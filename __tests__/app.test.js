const request = require("supertest")
const app = require("../app.js")
const db = require("../db/connection")
const seed = require("../db/seeds/seed.js")
const data = require("../db/data/test-data")

beforeEach(() => {
    return seed(data);
  });

  afterAll(() => {
    db.end();
  });

describe("/api/topics", () => {
    test("GET 200: Should respond with a 200 OK status", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
    })
    test("GET 200: Should respond with all topics", () => {
        return request(app)
        .get("/api/topics")
        .then(({body}) => {
            expect(body).toEqual(    
            [
                { slug: 'mitch', description: 'The man, the Mitch, the legend' },
                { slug: 'cats', description: 'Not dogs' },
                { slug: 'paper', description: 'what books are made of' }
            ]
        )
        })
    })
})