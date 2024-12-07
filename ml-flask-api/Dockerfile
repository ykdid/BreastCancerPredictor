FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python model/train.py

CMD ["python", "app.py"]

EXPOSE 5000
