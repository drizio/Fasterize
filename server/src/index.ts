import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import axios, { AxiosResponse } from 'axios'
import {isURL, Result, FSTRZFLAG} from "./utils/"


const app = express()
app.use(bodyParser.json())
app.use(cors())
const PORT= 3000


app.get('/', async (req, res)=> {
    const url = <string|undefined> req.query?.url
    if(url && isURL(url)) {
        let result: Result = {
            plugged: false,
            statusCode: 200
        }
        try {
            const response = await axios(url ? url : '')
            if(response.headers["x-fstrz"]) {
                result.plugged= true;
                const flag = <string>response.headers["x-fstrz"]
                result.fstrzFlags = FSTRZFLAG[flag].split(', ')
                result.cloudfrontPOP = await getPopCity(response.headers['x-amz-cf-pop'])
                result.cloudfrontStatus = response.headers['x-cache'].split(" ")[0].toUpperCase()
            }
            result.statusCode = response.status
            res.send(result)
        } catch (error) {
            res.statusCode = 400
            result.statusCode = 400
            res.send(result)
        } 
    } else {
        res.statusCode = 400;
        res.send({
            error: "Invalid url format"
        })
    }
    
})

app.listen(PORT, ()=> {
    console.log(`[SERVER] running on ${PORT}`)
})

interface POPResponse {
    self: string,
    source: string,
    nodes: {
        [key: string]: {
            country: string,
            city: string,
            airport: string
        }
    }
}
const getPopCity = async (pop: string) => {
    try {
         const response: AxiosResponse<POPResponse> = await axios("https://www.cloudping.cloud/cloudfront-edge-locations.json")
        if(response.status === 200) {
            return response.data.nodes[pop.substring(0,3)].city
        }else {
            return ""
        }
    } catch (error) {
        console.log(error)
        return ""
    }
   
}

export default app