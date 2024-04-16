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
        .then(({body}) => {
        })
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
            console.log(body)
            expect(typeof body.author).toBe("string")
            expect(typeof body.title).toBe("string")
            expect(typeof body.article_id).toBe("number")
            expect(typeof body.body).toBe("string")
            expect(typeof body.topic).toBe("string")
            expect(typeof body.created_at).toBe("string")
            expect(typeof body.votes).toBe("number")
            expect(typeof body.article_img_url).toBe("string")
        })
    })

    test("GET 400: Responds with 400 (Bad Request) when an incorrect id format is entered", () => {
        return request(app)
        .get("/api/articles/article-1")
        .expect(400)
        .then(({body})=> {
            expect(body.msg).toBe("Bad Request")
        })
    })

    test("GET 404: Responds with 404 (Not Found) when a non-existent id is entered", () => {
        return request(app)
        .get("/api/articles/99")
        .expect(404)
        .then(({body})=> {
            expect(body.msg).toBe("Not Found")
        })
    })
})

describe("/api/articles", () => {
    test("GET 200: Responds with a list of all articles, ordered by created_by", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({body}) => {
            const articles = body.articles

            expect(articles.length).toBe(13)

            articles.forEach((article)=>{
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comments: expect.any(Number)
                })
            })

            expect(articles).not.toContain("body")

            expect(articles).toBeSortedBy("created_at", { descending: true })
        
        })
    })
})


describe("/api/articles/:article_id/comments", () => {
    test("GET 200: Responds with a 200 OK status", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
    })

    test("GET 200: Responds with a list of the correct length", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .then(({body})=> {
           const {comments} = body
           expect(comments.length).toBe(11)

        })
    })

    test("GET 200: Responds with a list of all comments from a particular article", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .then(({body})=> {
           const {comments} = body

           comments.forEach((comment)=>{
            expect(comment.article_id).toBe(1)
           })

        })
    })

    test("GET 200: Response contains all of the correct object keys", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .then(({body})=> {
           const {comments} = body

           comments.forEach((comment)=>{
            expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                body: expect.any(String),
                article_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
            })
        })

        })
    })

    test("GET 200: Comments are all ordered by created_at: descending", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .then(({body})=> {
           const {comments} = body

            expect(comments).toBeSortedBy("created_at", {descending: true})

        })
    })

    test("GET 400: Returns a 400 (Bad request) when an incorrect article_id format is entered", () => {
        return request(app)
        .get("/api/articles/firstArticle/comments")
        .expect(400)
        .then(({body})=> {
            expect(body.msg).toBe("Bad Request")
        })
    })

    test("GET 404: Returns a 404 (Not Found) when a non-existant article_id is entered", () => {
        return request(app)
        .get("/api/articles/999/comments")
        .expect(404)
        .then(({body})=> {
            expect(body.msg).toBe("Not Found")
        })
    })

    // THIS TEST NEEDS TO GIVE A DIFFERENT ERROR MESSAGE BACK
    test("GET 200: Returns a 200 when an article exists but has no comments", () => {
        return request(app)
        .get("/api/articles/10/comments")
        .expect(200)
        .then(({body})=> {
            expect(body.comments.length).toBe(0)
        })
    })

})