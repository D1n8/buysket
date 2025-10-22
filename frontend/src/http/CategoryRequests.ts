export const fetchCategory = async (API_URL: string) => {
    try {
        const res = await fetch(`${API_URL}/api/category`);
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export const addCategory = async (API_URL: string, name: string, parent_id?: number) => {
    try {
        const res = await fetch(`${API_URL}/api/category`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                parent_id: parent_id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}