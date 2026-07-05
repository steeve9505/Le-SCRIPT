# API Documentation - LE SCRIPT

## Base URL
```
http://localhost:3001/api
```

## Authentication
Toutes les requêtes protégées nécessitent un header `Authorization`:
```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication Endpoints

### Register
**POST** `/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "artist" // or "certifier", "user"
}
```

**Response (201):**
```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "artist"
  }
}
```

### Login
**POST** `/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "artist"
  }
}
```

---

## 🎵 Artists Endpoints

### Create Artist Profile
**POST** `/artists`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "artistName": "John Doe",
  "musicalCategory": "Hip-Hop",
  "bio": "Artiste passionné...",
  "profileImageUrl": "https://..."
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "artistName": "John Doe",
  "musicalCategory": "Hip-Hop",
  "bio": "Artiste passionné...",
  "profileImageUrl": "https://...",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Get All Artists
**GET** `/artists`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "artistName": "John Doe",
    "musicalCategory": "Hip-Hop",
    "profileImageUrl": "https://...",
    "projects": [...]
  }
]
```

### Get Artist by ID
**GET** `/artists/{id}`

**Response (200):**
```json
{
  "id": "uuid",
  "artistName": "John Doe",
  "projects": [...]
}
```

### Update Artist
**PUT** `/artists/{id}`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "artistName": "John Doe Updated",
  "bio": "Nouvelle bio..."
}
```

---

## 📁 Projects Endpoints

### Create Project
**POST** `/projects`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "title": "Mon Premier Album",
  "coverImageUrl": "https://..."
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "artistId": "uuid",
  "title": "Mon Premier Album",
  "coverImageUrl": "https://...",
  "currentCertification": null,
  "totalPoints": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get All Projects
**GET** `/projects`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Mon Premier Album",
    "totalPoints": 150,
    "currentCertification": "Or",
    "artist": {...}
  }
]
```

### Get Project by ID
**GET** `/projects/{id}`

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Mon Premier Album",
  "totalPoints": 150,
  "currentCertification": "Or",
  "reactions": [...],
  "certifications": [...],
  "streamingLinks": [...]
}
```

### Update Project
**PUT** `/projects/{id}`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "title": "Titre Modifié"
}
```

---

## ⭐ Reactions Endpoints

### Create Reaction
**POST** `/reactions`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "projectId": "uuid",
  "type": "like", // like, dislike, comment, share, joker
  "content": "Excellent! 🔥" // optional for comments
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "projectId": "uuid",
  "certifierId": "uuid",
  "type": "like",
  "points": 1,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get Reactions by Project
**GET** `/reactions/project/{projectId}`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "type": "like",
    "points": 1,
    "certifier": {...}
  }
]
```

### Get Total Points by Certifier
**GET** `/reactions/certifier/{certifierId}/total`

**Response (200):**
```json
{
  "totalPoints": 250
}
```

---

## 🏆 Certifications Endpoints

### Get Certifications by Project
**GET** `/certifications/project/{projectId}`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "level": "Or",
    "pointsRequired": 250,
    "achievedAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Certification by ID
**GET** `/certifications/{id}`

**Response (200):**
```json
{
  "id": "uuid",
  "level": "Or",
  "pointsRequired": 250,
  "achievedAt": "2024-01-01T00:00:00Z"
}
```

---

## 🔗 Streaming Links Endpoints

### Add Streaming Link
**POST** `/streaming-links`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "projectId": "uuid",
  "platform": "spotify", // spotify, apple_music, youtube_music, soundcloud, etc.
  "url": "https://open.spotify.com/track/..."
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "projectId": "uuid",
  "platform": "spotify",
  "url": "https://open.spotify.com/track/...",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get Streaming Links by Project
**GET** `/streaming-links/project/{projectId}`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "platform": "spotify",
    "url": "https://..."
  }
]
```

### Delete Streaming Link
**DELETE** `/streaming-links/{id}`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true
}
```

---

## 💳 Payments Endpoints

### Create Joker Payment
**POST** `/payments/joker`

**Headers:** `Authorization: Bearer <token>`

**Response (201):**
```json
{
  "id": "pi_...",
  "amount": 200,
  "currency": "eur",
  "status": "requires_payment_method",
  "client_secret": "pi_..._secret_..."
}
```

### Confirm Payment
**POST** `/payments/confirm`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "paymentIntentId": "pi_..."
}
```

**Response (200):**
```json
{
  "success": true
}
```

---

## 👥 Certifiers Endpoints

### Create Certifier Profile
**POST** `/certifiers`

**Headers:** `Authorization: Bearer <token>`

```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "gender": "male" // male, female, other
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "firstName": "Jean",
  "lastName": "Dupont",
  "gender": "male",
  "totalReactions": 0,
  "badgeLevel": null
}
```

### Get Certifier by ID
**GET** `/certifiers/{id}`

**Response (200):**
```json
{
  "id": "uuid",
  "firstName": "Jean",
  "lastName": "Dupont",
  "totalReactions": 250,
  "badgeLevel": "or"
}
```

### Get All Certifiers
**GET** `/certifiers`

**Response (200):**
```json
[
  {
    "id": "uuid",
    "firstName": "Jean",
    "lastName": "Dupont",
    "totalReactions": 250,
    "badgeLevel": "or"
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Invalid request data",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 🎯 Points System

| Réaction | Points |
|----------|--------|
| Like | +1 |
| Dislike | -1 |
| Commentaire | +2 |
| Partage | +4 |
| Joker (2€) | +50 |

## 🏅 Certifications

| Niveau | Points Requis |
|--------|---------------|
| Bronze | 50 |
| Or | 250 |
| Platine | 500 |
| Diamant | 1000 |

## 🎖️ Certifier Badges

| Badge | Réactions Cumul |
|-------|------------------|
| Or ⭐ | 100 |
| Vert 🟢 | 200 |
| Violet 🟣 | 500 |