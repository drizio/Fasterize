import app from "../../src/index"
import supertest from 'supertest'
const request = supertest(app)

describe("Checking urls", () => {
    it("Consuming API endpoint: no url params", async (done) => {
        const res = await request
            .get('/')
        expect(res).toHaveProperty("error");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("Invalid url format");
        done()
    });

    it("Consuming API endpoint: empty url param", async (done) => {
        const res = await request
            .get('/?url=')
        expect(res).toHaveProperty("error");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("Invalid url format");
        done()
    });

    it("Consuming API endpoint: wrong url format", async (done) => {
        const res = await request
            .get('/?url=')
        expect(res).toHaveProperty("error");
        expect(res.body).toHaveProperty("error");
        expect(res.body.error).toBe("Invalid url format");
        done()
    });

    it("Consuming API endpoint: good url but wrong not fstrz website", async (done) => {
        const res = await request
            .get('/?url=https://www.google.com/fr')
        expect(res.body).toHaveProperty("statusCode");
        expect(res.body).toHaveProperty("plugged");
        expect(res.body.statusCode).toBe(200);
        expect(res.body.plugged).toBe(false);
        expect(res.body).not.toHaveProperty("fstrzFlags");
        expect(res.body).not.toHaveProperty("cloudfrontPOP");
        expect(res.body).not.toHaveProperty("cloudfrontStatus");
        done()
    });

    it("Consuming API endpoint: good url and good fstrz website", async (done) => {
        const res = await request
            .get('/?url=https://www.fasterize.com/fr/')
        expect(res.body).toHaveProperty("plugged");
        expect(res.body).toHaveProperty("statusCode");
        expect(res.body).toHaveProperty("fstrzFlags");
        expect(res.body).toHaveProperty("cloudfrontPOP");
        expect(res.body).toHaveProperty("cloudfrontStatus");
        expect(res.body.plugged).toBe(true);
        expect(res.body.statusCode).toBe(200);
        /* expect(res.body.fstrzFlags).toBe(["optimisée", "cachée"]);
        expect(res.body.cloudfrontPOP).toBe("Miss");
        expect(res.body.cloudfrontStatus).toBe("paris"); */
        done()
    });
});