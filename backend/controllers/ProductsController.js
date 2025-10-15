import db from '../db.js'

class ProductController {
    async createProduct(req, res) {
        const { name, price, description, category_id, seller_id } = req.body;
        try {
            if (!name || !price || !description) {
                return res.status(400).json({ message: "Поля name, price, description обязательны" })
            }

            const result = await db.query(
                'INSERT INTO products(name, price, description, category_id, seller_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
                [name, price, description, category_id || null, seller_id || null]
            );
            const files = req.files;

            for (const file of files) {
                await db.query(`
                    INSERT INTO product_images (product_id, image_url)
                    VALUES ($1, $2)
                    `, [result.rows[0].id, `/static/${file.filename}`])
            }

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка добавления товара' });
        }
    }

    async getProducts(req, res) {
        try {
            const result = await db.query(`
            SELECT 
                p.*,
                COALESCE(
                    json_agg(pi.image_url) FILTER (WHERE pi.id IS NOT NULL), 
                    '[]'
                ) AS images
            FROM products p
            LEFT JOIN product_images pi
                ON pi.product_id = p.id
            GROUP BY p.id
        `);

            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка получения товаров" });
        }
    }

};

export default new ProductController();