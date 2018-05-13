# Test Mercado Libre - Buscar ADN mutante

# Tecnologia

- NodeJS: 8.11.1
- ExpressJS: 4.16.2
- Mongodb Drive: 3.1.0-beta4
- [MongoDB](https://mlab.com/)
- [Google Cloud](https://cloud.google.com/)

## Setup

### Requisito

- NodeJS: 8.11.1
- npm: 5.6.0

### Instalacion

- Clonar repositorio https://github.com/vchibilisco/test-ml.git
- Ejecutar comando npm install
- Iniciar proyecto con comando npm run dev
- El servicio se inicia en puerto :8080

## Uso

### URL
### Localmente con Postman

#### Evaluar si ADN es mutante

- URL: http://localhost:8080/mutant

#### Recuperar estadistica

- URL: http://localhost:8080/stats

### Servicio Google Cloud con Postman

#### Evaluar si ADN es mutante

- URL: https://mlmutant-203923.appspot.com/mutant

#### Recuperar estadistica

- URL: https://mlmutant-203923.appspot.com/stats

### Ejemplos
#### Evaluar si ADN es mutante

- Header:
    Content-Type: application/json
- Body - raw:
    { "dna": ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"] }

- Resultado Exitoso: 
    Status: 200
    Body: { "result": "Is mutant" }

- Resultado Error:
    Status: 403
    Body: { "result": "Is human" }

#### Recuperar estadistica

- Resultado:
    Status: 200
    Body: 
      {
        "count_mutant_dna": 1,
        "count_human_dna": 4,
        "ratio": "0.25"
      }


