const { searchImages } = require('../services/imageService');

module.exports = {
    fetchImages: async (req, res) => {
        try {
            const {
                q, pageSize, description, location, page, yearStart, yearEnd, mediaType
            } = req.body;

            if (!q){
                return res.status(400).json({
                    success: false,
                    error: "Query parameter 'q' is required"
                })
            }

            if (mediaType && !['image', 'video', 'audio'].includes(mediaType)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid media type. Must be 'image', 'video', or 'audio'"
                });
            }

            // Panggil searchImages dan tunggu hasilnya
            const result = await searchImages(q, pageSize, description, location, page, yearStart, yearEnd, mediaType);
            
            // Kirimkan hasilnya ke klien
            res.json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error('Fetch Images Error:', error.message);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch images'
            });
        }
    }
}
