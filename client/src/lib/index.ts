import axios from "axios";
export const getData = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Data fetching Error" + response?.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error while fetching data", error);
    throw error;
  }
};

// export const getProducts = async () => {
//   const products = await axios.get("http://localhost:8000/products");
//   return products;
// };

export const getProducts = async () => {
  return [
    { id: 1, name: "Produit 1", price: 10 },
    { id: 2, name: "Produit 2", price: 20 }
  ];
};