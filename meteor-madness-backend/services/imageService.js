const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY || '5sALuA49dTDDacMDQsVPbbmESU5w6mNa6PL85IuU';
const NASA_NEO_API = 'https://images-api.nasa.gov';

const axiosInstance = axios.create({
    baseURL: NASA_NEO_API,
    timeout: 10000,
    headers: {
        'Accept': 'application/json'
    }
});

module.exports = {
    searchImages: async (Q, pageSize, description, location, page, yearStart, yearEnd, mediaType) => {
        try {
            const response = await axiosInstance.get('/search', {

                params: {
                    q: Q,
                    description_image: description,
                    page_size: pageSize || 10,
                    location_name: location,
                    page: page || 1,
                    year_start: yearStart,
                    year_end: yearEnd,
                    media_type: mediaType
                }
            });

            let result = [];

            if (response.data && response.data.collection && Array.isArray(response.data.collection.items)) {
                result = response.data.collection.items;
            }

            // Kembalikan hasilnya
            return result;

        } catch (error) {
            console.error('NASA Image API Error:', error.message);
            throw new Error('Failed to fetch images');  // Throw error agar bisa ditangani oleh controller
        }
    }
}
