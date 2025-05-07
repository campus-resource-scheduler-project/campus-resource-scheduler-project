/* eslint-disable max-len */

'use server';

import { Stuff, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string; }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      role: 'USER',
      name: '',
      image: '',
      occupation: '',
      bio: '',
      phone: '',
      major: '',
      standing: '',
      campus: '',
      personal: '',
    },
  });
}

export async function editUser(user: {
  id: number;
  bio: string;
  phone: string;
  major: string;
  standing: string;
  campus: string;
  personal: string;
}) {
  await prisma.user.update({
    where: { id: user.id },
    data: {
      id: user.id,
      bio: user.bio,
      phone: user.phone,
      major: user.major,
      standing: user.standing,
      campus: user.campus,
      personal: user.personal,
    },
  });
  redirect('/profile');
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function addResource(resource: {
  name: string;
  category: string;
  type: string;
  owner: string;
  location: string;
  campus: string;
  image: string;
  posted: string;
  deadline: string;
}) {
  await prisma.resource.create({ data: resource });
  redirect('/admin');
}

export async function getResourceById(id: number) {
  return prisma.resource.findUnique({ where: { id } });
}

export async function editResource(resource: {
  id: number;
  name: string;
  category: string;
  type: string;
  owner: string;
  location: string;
  campus: string;
  image: string;
  posted: string;
  deadline: string;
}) {
  const { id, ...rest } = resource;
  await prisma.resource.update({
    where: { id },
    data: rest,
  });
  redirect('/admin');
}

export async function deleteResource(id: number) {
  await prisma.resource.delete({ where: { id } });
  redirect('/admin');
}

/**
 * Borrows a resource by assigning it to the current user and setting a return deadline.
 * @param id The ID of the resource to borrow
 * @param userEmail The email of the user borrowing it
 * @returns The updated resource or an error
 */
function generateDeadline(): string {
  const now = new Date();
  now.setDate(now.getDate() + 1); // 1 day later
  now.setHours(9, 0, 0, 0); // 9:00 AM
  return now.toISOString(); // store in ISO format
}

export async function borrowResource(resourceId: number, borrowerEmail: string) {
  try {
    const updated = await prisma.resource.update({
      where: { id: resourceId },
      data: {
        owner: borrowerEmail,
        deadline: generateDeadline(),
      },
    });
    return { success: true, resource: updated };
  } catch (error) {
    console.error('Error borrowing resource:', error);
    return { success: false, error: 'Failed to borrow resource' };
  }
}

/**
 * Returns a resource by changing its owner to admin@foo.com
 * @param id The ID of the resource to return
 * @returns The updated resource
 */
export async function returnResource(id: number) {
  try {
    const updatedResource = await prisma.resource.update({
      where: { id },
      data: {
        owner: 'admin@foo.com',
        deadline: '1999-12-31T13:59:00.000Z', // Set a past date to indicate it's available
      },
    });
    return { success: true, resource: updatedResource };
  } catch (error) {
    console.error('Error returning resource:', error);
    return { success: false, error: 'Failed to return the resource' };
  }
}

/**
 * Reserves a room by assigning it to the current user and setting a return deadline.
 * @param resourceId The ID of the room to reserve
 * @param reserverEmail The email of the user reserving it
 * @returns The updated resource or an error
 */
function generateRoomDeadline(): string {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(9, 0, 0, 0); // Due at 9:00 AM the next day
  return now.toISOString();
}

export async function reserveResource(resourceId: number, reserverEmail: string) {
  try {
    const updated = await prisma.resource.update({
      where: { id: resourceId },
      data: {
        owner: reserverEmail,
        deadline: generateRoomDeadline(),
      },
    });
    return { success: true, resource: updated };
  } catch (error) {
    console.error('Error reserving room:', error);
    return { success: false, error: 'Failed to reserve room' };
  }
}
