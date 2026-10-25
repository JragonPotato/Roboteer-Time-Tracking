"use server"

import { neon } from "@neondatabase/serverless"

export async function putActivity(username: string, date: string, activity: string, timeHours: number, timeMinutes: number, crew: string) {
    const sql = neon(process.env.DATABASE_URL as string)

    sql`INSERT INTO activities (username, date, activity, timeHours, timeMinutes, crew) VALUES (${username}, ${date}, ${activity}, ${timeHours}, ${timeMinutes}, ${crew})`
}