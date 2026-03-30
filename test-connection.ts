import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    // Test connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Connection successful:', result);
    
    // Check if tables exist
    const userCount = await prisma.user.count();
    console.log('✅ Users table exists. Count:', userCount);
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    if (error.message.includes('Can\'t reach')) {
      console.error('\nPossible causes:');
      console.error('1. Database is paused in Supabase');
      console.error('2. Network/firewall blocking connection');
      console.error('3. Wrong connection string or credentials');
    }
  } finally {
    await prisma.$disconnect();
  }
}

test();
