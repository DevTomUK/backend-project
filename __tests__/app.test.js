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

    test("GET 200: Responds with a 200 OK status and an object containing the article when accessed with a correct article_id", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {
            expect(typeof body.article.author).toBe("string")
            expect(typeof body.article.title).toBe("string")
            expect(typeof body.article.article_id).toBe("number")
            expect(typeof body.article.body).toBe("string")
            expect(typeof body.article.topic).toBe("string")
            expect(typeof body.article.created_at).toBe("string")
            expect(typeof body.article.votes).toBe("number")
            expect(typeof body.article.article_img_url).toBe("string")
        })
    })

    test("GET 400: Responds with 400 (Bad Request) when an incorrect id format is entered", () => {
        return request(app)
        .get("/api/articles/article-1")
        .expect(400)
        .then((err)=> {
            expect(err.res.statusMessage).toBe("Bad Request")
        })
    })

    test("GET 404: Responds with 404 (Not Found) when a non-existent id is entered", () => {
        return request(app)
        .get("/api/articles/99")
        .expect(404)
        .then((err)=> {
            expect(err.res.statusMessage).toBe("Not Found")
        })
    })

})