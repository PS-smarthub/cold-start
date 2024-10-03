import { db } from "@/lib/db";

async function seed() {
  for (let i = 0; i < 12; i++) {
    await db.container.create({
      data: {
        device: "container_" + (i + 1),
        temperatures: {
          createMany: {
            data: Array.from({ length: 24 }, () => ({
              roomTemperature: Math.floor(Math.random() * 100),
              temperature1: Math.floor(Math.random() * 100),
              temperature2: Math.floor(Math.random() * 100),
              dateTime: new Date(Date.now() + Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
            })),
          },
        },
      },
    });
  }
}
seed().then(() => {
  console.log("Database seeded!");
  db.$disconnect();
});
