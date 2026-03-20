import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '../prisma/generated/prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables immediately
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!; // Service role key

const supabase = createClient(supabaseUrl, supabaseKey);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function createAdmin() {
  const email = 'admin@parbase.com';
  const password = 'AdminPassword123!';

  console.log(`Creating admin user: ${email}...`);

  try {
    // 1. Create User in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: 'Admin',
        last_name: 'User',
      }
    });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        console.log('User already exists in Supabase Auth. Proceeding to update database role...');
      } else {
        throw authError;
      }
    }

    // Get the user ID
    let userId;
    if (authData?.user) {
      userId = authData.user.id;
    } else {
      // Find existing user if creation failed due to existing
      const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
      if (usersError) throw usersError;
      
      const existingUser = usersData.users.find((u: any) => u.email === email);
      if (!existingUser) throw new Error("Could not find existing user.");
      userId = existingUser.id;
    }

    console.log(`Supabase User ID: ${userId}`);

    // 2. Create or Update Profile in Prisma
    const profile = await prisma.profile.upsert({
      where: { email },
      update: {
        role: 'ADMIN',
      },
      create: {
        id: userId,
        email,
        fullName: 'Admin User',
        role: 'ADMIN',
      }
    });

    console.log('Successfully created/updated Admin profile in the database.');
    console.log('--- CREDENTIALS ---');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('-------------------');

  } catch (error) {
    console.error('Failed to create admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
