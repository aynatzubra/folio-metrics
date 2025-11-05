import { PrismaClient, type Visit } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const utc = (iso: string) => new Date(iso)

export const mockVisits: Omit<Visit, 'id'>[] = [
  {
    sectionId: 'experience',
    country: 'USA',
    city: 'San Francisco',
    ipAddress: '192.168.0.1',
    userAgent: 'Desktop, Chrome',
    duration: 125_000,
    createdAt: utc('2025-09-29T10:00:00Z'),
  },
  {
    sectionId: 'adds',
    country: 'Germany',
    city: 'Berlin',
    ipAddress: '10.0.0.1',
    userAgent: 'Mobile, Safari',
    duration: 80_000,
    createdAt: utc('2025-09-30T12:30:00Z'),
  },
  {
    sectionId: 'skills',
    country: 'France',
    city: 'Paris',
    ipAddress: '172.16.0.1',
    userAgent: 'Desktop, Firefox',
    duration: 210_000,
    createdAt: utc('2025-09-30T14:45:00Z'),
  },
  {
    sectionId: 'experience',
    country: 'USA',
    city: 'San Francisco',
    ipAddress: '192.168.1.1',
    userAgent: 'Desktop, Chrome',
    duration: 125_000,
    createdAt: utc('2025-09-29T10:00:00Z'),
  },
  {
    sectionId: 'adds',
    country: 'Germany',
    city: 'Berlin',
    ipAddress: '105.0.0.1',
    userAgent: 'Mobile, Safari',
    duration: 80_000,
    createdAt: utc('2025-09-30T12:30:00Z'),
  },
  {
    sectionId: 'skills',
    country: 'France',
    city: 'Paris',
    ipAddress: '172.164.0.1',
    userAgent: 'Desktop, Firefox',
    duration: 210_000,
    createdAt: utc('2025-09-30T14:45:00Z'),
  },
  {
    sectionId: 'experience',
    country: 'USA',
    city: 'San Francisco',
    ipAddress: '192.15.1.1',
    userAgent: 'Desktop, Chrome',
    duration: 125_000,
    createdAt: utc('2025-09-29T10:00:00Z'),
  },
  {
    sectionId: 'adds',
    country: 'Germany',
    city: 'Berlin',
    ipAddress: '10.0.1.1',
    userAgent: 'Mobile, Safari',
    duration: 80_000,
    createdAt: utc('2025-09-30T12:30:00Z'),
  },
  {
    sectionId: 'skills',
    country: 'France',
    city: 'Paris',
    ipAddress: '178.16.0.1',
    userAgent: 'Desktop, Firefox',
    duration: 210_000,
    createdAt: utc('2025-09-30T14:45:00Z'),
  },
  {
    sectionId: 'experience',
    country: 'USA',
    city: 'San Francisco',
    ipAddress: '192.158.1.1',
    userAgent: 'Desktop, Chrome',
    duration: 125_000,
    createdAt: utc('2025-09-29T10:00:00Z'),
  },
  {
    sectionId: 'adds',
    country: 'Germany',
    city: 'Berlin',
    ipAddress: '10.1.0.1',
    userAgent: 'Mobile, Safari',
    duration: 80_000,
    createdAt: utc('2025-09-30T12:30:00Z'),
  },
  {
    sectionId: 'skills',
    country: 'France',
    city: 'Paris',
    ipAddress: '172.164.1.1',
    userAgent: 'Desktop, Firefox',
    duration: 210_000,
    createdAt: utc('2025-09-30T14:45:00Z'),
  },
  {
    sectionId: 'experience',
    country: 'USA',
    city: 'San Francisco',
    ipAddress: '192.168.0.1',
    userAgent: 'Desktop, Chrome',
    duration: 125_000,
    createdAt: utc('2025-09-29T10:00:00Z'),
  },
  {
    sectionId: 'adds',
    country: 'Germany',
    city: 'Berlin',
    ipAddress: '110.1.0.1',
    userAgent: 'Mobile, Safari',
    duration: 80_000,
    createdAt: utc('2025-09-30T12:30:00Z'),
  },
  {
    sectionId: 'skills',
    country: 'France',
    city: 'Paris',
    ipAddress: '175.16.0.1',
    userAgent: 'Desktop, Firefox',
    duration: 210_000,
    createdAt: utc('2025-09-30T14:45:00Z'),
  },
  {
    sectionId: 'experience',
    country: 'USA',
    city: 'San Francisco',
    ipAddress: '192.168.4.1',
    userAgent: 'Desktop, Chrome',
    duration: 125_000,
    createdAt: utc('2025-09-29T10:00:00Z'),
  },
  {
    sectionId: 'adds',
    country: 'Germany',
    city: 'Berlin',
    ipAddress: '108.2.0.1',
    userAgent: 'Mobile, Safari',
    duration: 80_000,
    createdAt: utc('2025-09-30T12:30:00Z'),
  },
  {
    sectionId: 'skills',
    country: 'France',
    city: 'Paris',
    ipAddress: '179.16.1.1',
    userAgent: 'Desktop, Firefox',
    duration: 210_000,
    createdAt: utc('2025-09-30T14:45:00Z'),
  },
]

async function main() {
  console.log('Seeding start...')
  await prisma.visit.deleteMany({})
  await prisma.user.deleteMany({ where: { email: process.env.SECRET_DEMO_USER } })

  await prisma.visit.createMany({
    data: mockVisits,
    skipDuplicates: true,
  })
  console.log('Successfully created visits!')

  console.log('Create demo user...')
  const hashedPassword = await bcrypt.hash(process.env.SECRET_DEMO_PASSWORD!, 10)
  await prisma.user.upsert({
    where: { email: process.env.SECRET_DEMO_USER! },
    update: { password: hashedPassword },
    create: {
      email: process.env.SECRET_DEMO_USER!,
      password: hashedPassword,
    },
  })
  console.log('Demo user created')
}

main()
  .catch((e) => {
    console.error('Seeding mistakes:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
