export const fetchApi = async (url) => {
    try {
        const response = await fetch(url)
        /*if(!response.ok){
            throw Error('An error occured !88!')
        }*/
        return response.json()
    } catch (error) {
        console.log(error, 'errrrrrrrrrooooooor')
        throw error
    }
}
