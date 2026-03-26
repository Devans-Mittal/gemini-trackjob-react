import axios from 'axios';

export const fetchInitialMockData = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=10');
    return response.data.products.map((item) => ({
      id: `mock-${item.id}`,
      company: item.brand || "Tech Global",
      role: item.category === "smartphones" ? "Mobile Developer" : "Software Engineer",
      location: "Remote",
      salary: item.price * 100,
      platform: "LinkedIn",
      status: "Applied",
      appliedDate: new Date().toISOString().split('T')[0],
      notes: item.description,
      bookmarked: false
    }));
  } catch (error) {
    console.error("Error fetching mock jobs:", error);
    return [];
  }
};