import { db } from "@/lib/db";

async function seed() {
  for (let i = 0; i < 12; i++) {
    await db.container.create({
      data: {
        device: "container_" + (i + 1),
      },
    });
  }
}

seed().then(() => {
  console.log("Database seeded!");
  db.$disconnect();
});
