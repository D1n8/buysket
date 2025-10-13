# Используем Node.js для сборки
FROM node:20

# Рабочая директория
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Пробрасываем порт Vite
EXPOSE 5173

# Команда запуска Vite
CMD ["npm", "run", "dev", "--", "--host"]
