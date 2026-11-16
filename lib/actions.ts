"use server"

import { neon } from "@neondatabase/serverless"

export async function putActivity(username: string, date: string, activity: string, startTime: string, endTime: string, description: string, crew: string) {
    const sql = neon(process.env.DATABASE_URL as string);
    await sql`
        INSERT INTO activities (
            username,
            squareoncalendar,
            activity,
            starttime,
            endtime,
            description,
            crew
        ) 
        VALUES (
            ${username},
            ${date},
            ${activity},
            ${startTime + ":00"},
            ${endTime + ":00"},
            ${description},
            ${crew}
        )
    `
}


export async function putActivityId(id: number, username: string, date: string, activity: string, startTime: string, endTime: string, description: string, crew: string) {
    const sql = neon(process.env.DATABASE_URL as string);
    await sql`
        UPDATE activities
        SET
            username = ${username},
            squareoncalendar = ${date},
            activity = ${activity},
            starttime = ${startTime + ":00"},
            endtime = ${endTime + ":00"},
            description = ${description},
            crew = ${crew}
        WHERE id = ${id}
    `
}

export async function getActivities(username: string) {
    const sql = neon(process.env.DATABASE_URL as string);
    return await sql`
        SELECT * FROM activities WHERE username = ${username}
    `
}

export async function getActivityById(id: number) {
    const sql = neon(process.env.DATABASE_URL as string);
    return (await sql`SELECT * FROM activities WHERE id = ${id}`)[0];
}

export async function search(query: string) {
    const sql = neon(process.env.DATABASE_URL as string);
    return await sql`
        SELECT * 
        FROM activities 
        WHERE username ILIKE ${query + "%"}
    `;
}