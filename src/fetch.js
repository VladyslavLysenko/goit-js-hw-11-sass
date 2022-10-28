import axios from 'axios';
export async function apiPixabay(findImage, key, baseUrl, baseUrlOptions,perPage,page) {
//    pixabay.com/api
    const response = await axios.get(`${baseUrl}?key=${key}&q=${findImage}&${baseUrlOptions}&per_page=${perPage}&page=${page}`)
    return response
    }