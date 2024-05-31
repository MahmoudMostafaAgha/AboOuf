export const fetchProducts = async (page, productsPerPage) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Origin", "postman");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "cookieName=cookieValue");
  
      const raw = JSON.stringify({
        "category": "",
        "price_range": [0, 100000000],
        "products_per_page": productsPerPage,
        "page": page,
        "sort": { "criteria": "date", "arrangement": "DESC" },
        "keyword": ""
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("https://woosonicpwa.com/MitchAPI/filter.php", requestOptions);
      const text = await response.text();
      const startIndex = text.indexOf('[');
      const endIndex = text.lastIndexOf(']');
      const jsonData = text.substring(startIndex, endIndex + 1);
      const data = JSON.parse(jsonData);
      console.log(data, 'data');
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  