import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_ENTRIES = [
  { name: "Alice Chen", score: 9800, runtimeSpeed: 12, testCasesPassed: 248 },
  { name: "Bob Kumar", score: 9450, runtimeSpeed: 18, testCasesPassed: 235 },
  { name: "Carol Smith", score: 9100, runtimeSpeed: 21, testCasesPassed: 228 },
  { name: "Dave Patel", score: 8750, runtimeSpeed: 25, testCasesPassed: 210 },
  { name: "Eve Johnson", score: 8400, runtimeSpeed: 30, testCasesPassed: 198 },
  { name: "Frank Liu", score: 7900, runtimeSpeed: 35, testCasesPassed: 185 },
  { name: "Grace Kim", score: 7500, runtimeSpeed: 40, testCasesPassed: 172 },
  { name: "Hiro Tanaka", score: 7100, runtimeSpeed: 45, testCasesPassed: 160 },
  { name: "Iris Brown", score: 6800, runtimeSpeed: 52, testCasesPassed: 148 },
  { name: "Jake Wilson", score: 6200, runtimeSpeed: 60, testCasesPassed: 135 },
];

async function main() {
  console.log("🌱 Seeding leaderboard...");

  // Clear existing
  await prisma.leaderboardEntry.deleteMany();

  for (const entry of SEED_ENTRIES) {
    await prisma.leaderboardEntry.create({ data: entry });
  }

  console.log(`✅ Seeded ${SEED_ENTRIES.length} leaderboard entries`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
