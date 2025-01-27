// utils/api.ts
 const fetchImages = async (productName: string, limit: number) => {
    const apiKey = 'nKlx3G6JvwPJSVIhPXFho_zdm5HNyYLl4H2qIhU_HeE'; // Replace with your actual Unsplash Access Key
    const url = `https://api.unsplash.com/search/photos?query=${productName}&per_page=${limit}&client_id=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Extract the URLs of the images from the response
      return data.results.map((image: any) => ({
        id: image.id,
        url: image.urls.small, // You can choose the image size you prefer
        description: image.description || 'No description',
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      return []; // Return an empty array in case of error
    }
  };
  
  export default fetchImages