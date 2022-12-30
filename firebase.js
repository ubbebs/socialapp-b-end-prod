import { initializeApp, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = {
    "type": "service_account",
    "project_id": "socialapp-c3f3f",
    "private_key_id": "56fe52a812da682c39b49b83921b58dc1717cc2e",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDticbglerd4tkO\nI3cf6NP30qje83xLtONGv8xQqiYwv+0ETX0QYdUF92rvVhWKQDfUKE/cPy8KPf2x\nXhSPZzzVH/Qrj1s02OFbgO9yYaLWCIv/T86quEWRd9KQp9XUyjaRaSxooxYbQ2m6\nhlf5mngXcRH6yJxQYdb25vEFQi2eA2E3tl1qE9pP0WoRV+LJMp9HXPkQUeWTOAaN\nXtEbgqpQ3plhG2UBBuNOeW3GtJ15p8RmhL/NT+4TuUKxjy4+WsiJw8Oj2fvAd5ln\nO/srbI08PPLbKsKq/ZF+ASJK1bi5stvgTWp+lrQAD1Z3iNorcbk8Xf6RxxbPV8N1\nNEKDoSnrAgMBAAECggEAK3PDJi02eB15sDzrmzI3qENocdRfnee6laQbR3xAnTVW\nsa1NHfSPh9ZhQOPh79bcf5paNYN3YuvBHzODFlJ/zcrZGyjPueScoOT+qFFU/Ms2\ndN9QAmnQDBK7uYuCMblF7yaqoX+H2TflPOI7cKUBp+Qesl4FPi0Pqj3HxDr9ZkSE\nx48pyRncwpw64gdj+PgNo35LnqXUkEqBtqc4SFONl9Kb8xdp7qSEIQBKfOywmRdY\nK4XyOQgKyQaTyTgSV34FsiWcAoAA4T97SwYfcYMcI437pBjw/R7q9q5gRQLnDgKq\nDZYaVlEqdm+2yPLOVc4kUlF9lQokKSfhos7n1Ee0zQKBgQD5wkPn2cMOLMRU9Qw5\n8Qx9CpvXuvMmK4+niG4Chk+LISAllTzze6b8fLmQvn7+xepd5I4thALM2hD0Ps7F\nrJ4SfRI+vkfCtsRczA1jq5JOJRXWZqB9SUEPVMTPn9rDnjP6q9n8WiZYALis+hY+\n67L+IkXCsbfdZd8WcXrIKj07/wKBgQDzeVWwNM+6M0e7FouoJ0DouwVU8mK5w9G2\nRzatjuSl+W0e3jb5zLq8Ifo2f/fq6yIA1Zp/0Na/jS+OAx3yjmB4KaSFoZHaB4ve\nwZE3Cpu9m7F1ToHbFMz1sZVDNcwzr8LTfYqndSf8QWdFRe/BRxoXIzz0MJylbICy\n2cui6tzCFQKBgQDD3UApm5GnFR5mzcFn0wyLJv2uQbMbVQAUTx6OpkvM/Q5bytyA\nyZDb4ugXhfzLyeQQ/AMv2J3ljoHLOVIonUVdlG3xfIGERpZZe8BoUI2s8NJeUB8+\nAWufHUg21tLVo8R5qbmKeBwn2XD6XimB8I9vUutIUtyxKIm57QZv4QgiewKBgQDH\nBA045VJPP4+IrBsoLj3ufsES+LYeZqRLPNbC86SOzt2Vd8q0Udbp5VQjrGK4Uc8P\no4qQo+KF3SBcEswt8peEYXWsDa+s6rI4OT08Ip2/VT6vRqb6r3wB8VCzCYyLS0YT\nnfDyhN9UYRnLFCmwcTAwbYtrhzjkN1bT2xeLajNdKQKBgQC7i48OYPeQI6poLOX6\nvp1EY09IySi8OeGcSYoZlAPjRwC733Ak0PeRjOrqxR10dSEWbIz9tr7JRO3eFlIh\nli0ih2XllVqrM3c2MVHS+Em1KmcqWwSFEXjdnMhBm8rNcrJIzggycef57MSSkOOB\njEMhhTrjTb4Irw4MD1DwjL/gKA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-cgg3b@socialapp-c3f3f.iam.gserviceaccount.com",
    "client_id": "103297376716279524339",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cgg3b%40socialapp-c3f3f.iam.gserviceaccount.com"
  }

initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://socialapp-c3f3f-default-rtdb.europe-west1.firebasedatabase.app"
})

export const auth = getAuth()
export const db = getDatabase()