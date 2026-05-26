import { PrismaClient } from "../src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { hashPassword } from "@better-auth/utils/password";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

// ---------------------------------------------------------------------------
// Demo accounts
// ---------------------------------------------------------------------------
// Admin / teacher – can access the full dashboard
const ADMIN = {
  name: "Admin Teacher",
  email: "admin@quizmaster.dev",
  password: "Admin1234",
};

// Students – match the names used in the static UI data
const STUDENTS = [
  { name: "Alice Johnson",  email: "alice@school.edu",  password: "Student123" },
  { name: "Bob Smith",      email: "bob@school.edu",    password: "Student123" },
  { name: "Carlos Rivera",  email: "carlos@school.edu", password: "Student123" },
  { name: "Diana Lee",      email: "diana@school.edu",  password: "Student123" },
  { name: "Ethan Brown",    email: "ethan@school.edu",  password: "Student123" },
  { name: "Fiona Chen",     email: "fiona@school.edu",  password: "Student123" },
  { name: "George Kim",     email: "george@school.edu", password: "Student123" },
  { name: "Hannah Park",    email: "hannah@school.edu", password: "Student123" },
  { name: "Ivan Torres",    email: "ivan@school.edu",   password: "Student123" },
  { name: "Julia Wang",     email: "julia@school.edu",  password: "Student123" },
  { name: "Kevin Patel",    email: "kevin@school.edu",  password: "Student123" },
  { name: "Laura Martinez", email: "laura@school.edu",  password: "Student123" },
];

async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    console.log(`  skip  ${data.email} (already exists)`);
    return;
  }

  const hashed = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      emailVerified: true,
    },
  });

  // better-auth stores credentials under providerId "credential"
  await prisma.account.create({
    data: {
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: hashed,
    },
  });

  console.log(`  ✓     ${data.email}`);
}

async function main() {
  console.log("\n🌱  Seeding database…\n");

  console.log("Admin:");
  await createUser(ADMIN);

  console.log("\nStudents:");
  for (const s of STUDENTS) {
    await createUser(s);
  }

  console.log("\n✅  Done.\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
