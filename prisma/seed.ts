import { db } from "@/lib/db";

async function seed() {
  for (let i = 0; i < 12; i++) {
    await db.container.create({
      data: {},
    });
  }
}

seed().then(() => {
  console.log("Database seeded!");
  db.$disconnect();
});
