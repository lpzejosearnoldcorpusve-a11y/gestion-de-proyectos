import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// Crear cliente de Neon
const client = neon(process.env.DATABASE_URL || "")

// Crear instancia de Drizzle
export const db = drizzle(client, { schema })

export type Database = typeof db
