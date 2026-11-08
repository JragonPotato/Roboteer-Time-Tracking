"use server"

import { neon } from "@neondatabase/serverless"

export async function putActivity(username: string, date: string, activity: string, startTime: string, endTime: string, description: string, crew: string) {
    const sql = neon(process.env.DATABASE_URL as string)
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