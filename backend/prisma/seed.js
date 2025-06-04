/* Prisma Client is separate library I use to interact with the db
 Prisma API lets me run queries against my db */
const { PrismaClient } = require("@prisma/client");
// bcrypt is pw-hashing library that securely stores user pws
const bcrypt = require("bcryptjs");
// instantiates the client, allows access to my db models
const prisma = new PrismaClient();

/* once schema file is created, run npx prisma generate
- Prisma ORM generates the client for me 
- the client can handle the querying: joins, filters, sorting, pagination, etc. */
// creates a new user
async function main() {
  /* - .hash generates a random salt
  - combines the salt with my pw
  - runs a key derivation function repeatedly based on 10 
  - returns a string that encoded algorithm version, cost factor, salt + hash */
  const password = await bcrypt.hash("password123", 10);
  // creates a user in User model of schema.prisma with email and password fields
  await prisma.user.create({
    data: {
      email: "test@example.com",
      password,
    },
  });
}

// executes the main function
main()
  // if an error occurs, logs the error
  .catch((e) => console.error(e))
  /* whether successful or failed, it always disconnects from the db to free up 
  the connection */
  .finally(() => prisma.$disconnect());
