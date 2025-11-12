import { pgTable, text, timestamp, uuid, boolean, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Tabla de Usuarios
export const users = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hash_pwd: text("hash_pwd").notNull(),
  estado: varchar("estado", { length: 50 }).default("activo"), 
  creado_en: timestamp("creado_en").defaultNow(),
  actualizado_en: timestamp("actualizado_en").defaultNow(),
})

// Tabla de Roles
export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 100 }).notNull().unique(),
  descripcion: text("descripcion"),
  creado_en: timestamp("creado_en").defaultNow(),
})

// Tabla de Permisos
export const permisos = pgTable("permisos", {
  id: uuid("id").primaryKey().defaultRandom(),
  codigo: varchar("codigo", { length: 100 }).notNull().unique(),
  descripcion: text("descripcion"),
  creado_en: timestamp("creado_en").defaultNow(),
})

// Tabla de relación N:M - Rol Permisos
export const rol_permisos = pgTable("rol_permisos", {
  id: uuid("id").primaryKey().defaultRandom(),
  rol_id: uuid("rol_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  permiso_id: uuid("permiso_id")
    .notNull()
    .references(() => permisos.id, { onDelete: "cascade" }),
  creado_en: timestamp("creado_en").defaultNow(),
})

// Tabla de relación N:M - Usuario Roles
export const usuario_roles = pgTable("usuario_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  usuario_id: uuid("usuario_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rol_id: uuid("rol_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  creado_en: timestamp("creado_en").defaultNow(),
})

// Tabla de Tokens (Sesiones/Auth)
export const tokens = pgTable("tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  usuario_id: uuid("usuario_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token_hash: text("token_hash").notNull().unique(),
  expira_en: timestamp("expira_en").notNull(),
  creado_en: timestamp("creado_en").defaultNow(),
  activo: boolean("activo").default(true),
})

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
  tokens: many(tokens),
  usuario_roles: many(usuario_roles),
}))

export const rolesRelations = relations(roles, ({ many }) => ({
  usuario_roles: many(usuario_roles),
  rol_permisos: many(rol_permisos),
}))

export const permisosRelations = relations(permisos, ({ many }) => ({
  rol_permisos: many(rol_permisos),
}))

export const usuario_rolesRelations = relations(usuario_roles, ({ one }) => ({
  usuario: one(users, {
    fields: [usuario_roles.usuario_id],
    references: [users.id],
  }),
  rol: one(roles, {
    fields: [usuario_roles.rol_id],
    references: [roles.id],
  }),
}))

export const rol_permisosRelations = relations(rol_permisos, ({ one }) => ({
  rol: one(roles, {
    fields: [rol_permisos.rol_id],
    references: [roles.id],
  }),
  permiso: one(permisos, {
    fields: [rol_permisos.permiso_id],
    references: [permisos.id],
  }),
}))

export const tokensRelations = relations(tokens, ({ one }) => ({
  usuario: one(users, {
    fields: [tokens.usuario_id],
    references: [users.id],
  }),
}))
