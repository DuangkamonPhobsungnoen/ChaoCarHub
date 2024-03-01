# เลือก Base Image
FROM node:14-alpine

# กำหนด Working Directory
WORKDIR /app

# คัดลอก Package Files
COPY package*.json ./

# รัน npm install
RUN npm install

# คัดลอกไฟล์โปรเจค
COPY . .

# เปิดพอร์ต
EXPOSE 3000

# ระบุคำสั่งเริ่มต้น
CMD ["npm", "run", "dev"]