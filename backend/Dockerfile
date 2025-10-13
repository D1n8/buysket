# Используем Node.js 20
FROM node:20

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json / package*.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники в контейнер
COPY . .

# Пробрасываем порт Node.js
EXPOSE 3000

# Команда запуска для разработки
CMD ["npm", "run", "dev"]
