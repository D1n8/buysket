
export const fetchProducts = async (API_URL: string) => {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
};

export const addProduct = async (API_URL: string, name: string, price: number, description: string, images: File[]) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        images.forEach(img => {
            formData.append("images", img)
        });

        const res = await fetch(`${API_URL}/api/products`, {
            method: "POST",
            body: formData
        });

        return await res.json();
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (API_URL: string, id: number) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, 
        {
            method: "DELETE"
        }
    );
    return await res.json();
}