
export const fetchProducts = async (API_URL: string) => {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        return await res.json();
    } catch (error) {
        console.error(error);
    }
};

export const addProduct = async (API_URL: string, name: string, price: number, description: string, images: File[], category_id?: number) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        images.forEach(img => {
            formData.append("images", img)
        });

        if (category_id) formData.append("category_id", category_id.toString());

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
    try {
        const res = await fetch(`${API_URL}/api/products/${id}`,
            {
                method: "DELETE"
            }
        );
        return await res.json();
    } catch (error){
        console.log(error);
    }
    
}