# Node.js LTS sürümünü temel alın
FROM --platform=linux/amd64 node:21.6.2

# Çalışma dizinini ayarlayın
WORKDIR /var/app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

COPY package-lock.json ./

COPY ./ ./
# Bağımlılıkları yükleyin
RUN apt-get update && apt-get install -y vim
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN npm install --loglevel verbose
# Uygulama kodunu kopyalayın

# Uygulamanın çalışacağı portu belirtin
EXPOSE 3000

# Uygulamayı başlatın
CMD ["npm", "start"]