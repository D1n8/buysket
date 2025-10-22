import db from '../db.js'

class CategoryController {
    async createCategory(req, res) {
        const { name, parent_id } = req.body;
        try {
            if (!name || name.trim() === '') {
                return res.status(400).json({ message: 'Поле name обязательное' })
            }
            // проверка на сущестование род категории
            if (parent_id) {
                const parentCheck = await db.query(
                    'SELECT id FROM category WHERE id = $1',
                    [parent_id]
                );

                if (parentCheck.rows.length === 0) {
                    return res.status(404).json({
                        message: 'Родительская категория не найдена'
                    });
                }
            }
            const result = await db.query(
                `INSERT INTO category(name, parent_id) VALUES ($1, $2)`,
                [name.trim(), parent_id || null]);

            res.status(201).json(result.rows)
        } catch (error) {
            res.status(500).json({ error: 'Ошибка добавления категории' })
        }
    }

    async getCategories(req, res) {
        try {
            const result = await db.query(`SELECT * FROM category`);
            res.json(result.rows)
        } catch (error) {
            res.status(500).json({ error: "Ошибка получения категорий" });
        }
    }

    async getOneCategory(req, res) {
        const id = req.params.id;
        try {
            const result = await db.query(`SELECT * FROM category WHERE id=$1`, [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Категория не найдена" });
            }

            res.json(result.rows);
        } catch (error) {
            res.status(500).json({error: "Ошибка получения категории"});
        }
    }

    async deleteCategory(req, res) {
        const id = req.params.id;
        try {
            await db.query(`DELETE FROM category WHERE id=$1`, [id]);
            res.json({message: "Категория успешно удалена, ее подкатегории стали категориями"});
        } catch (error) {
            res.status(500).json({error: "Ошибка удаления категории"})
        }
    }
}

export default new CategoryController();