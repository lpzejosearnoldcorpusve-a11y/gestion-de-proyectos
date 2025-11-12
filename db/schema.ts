import { pgTable, text, timestamp, uuid, boolean, varchar, doublePrecision, jsonb } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Tabla de Usuarios
export const users = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hash_pwd: text("hash_pwd").notNull(),
  estado: varchar("estado", { length: 50 }).default("activo"), // activo, inactivo, bloqueado
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

// Tabla de Inmuebles
export const inmuebles = pgTable("inmuebles", {
  id: uuid("id").primaryKey().defaultRandom(),
  cod_catastral: varchar("cod_catastral", { length: 100 }).notNull().unique(),
  direccion: varchar("direccion", { length: 255 }).notNull(),
  distrito: varchar("distrito", { length: 100 }).notNull(),
  zona: varchar("zona", { length: 100 }),
  estado: varchar("estado", { length: 50 }).default("activo"),
  creado_en: timestamp("creado_en").defaultNow(),
  actualizado_en: timestamp("actualizado_en").defaultNow(),
})

// Tabla de Expedientes
export const expedientes = pgTable("expedientes", {
  id: uuid("id").primaryKey().defaultRandom(),
  inmueble_id: uuid("inmueble_id")
    .notNull()
    .references(() => inmuebles.id, { onDelete: "cascade" }),
  solicitante_id: uuid("solicitante_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  estado: varchar("estado", { length: 50 }).default("en_tramite"), // en_tramite, aprobado, rechazado
  prioridad: varchar("prioridad", { length: 50 }).default("normal"), // baja, normal, alta, urgente
  canal: varchar("canal", { length: 50 }).default("web"), // web, ventanilla, email
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

// Tabla de Expediente Historial
export const expediente_historial = pgTable("expediente_historial", {
  id: uuid("id").primaryKey().defaultRandom(),
  expediente_id: uuid("expediente_id")
    .notNull()
    .references(() => expedientes.id, { onDelete: "cascade" }),
  estado_from: varchar("estado_from", { length: 50 }),
  estado_to: varchar("estado_to", { length: 50 }).notNull(),
  by_user: uuid("by_user").references(() => users.id, { onDelete: "set null" }),
  at: timestamp("at").defaultNow(),
})

// Tabla de Proyecto Param
export const proyecto_param = pgTable("proyecto_param", {
  id: uuid("id").primaryKey().defaultRandom(),
  expediente_id: uuid("expediente_id")
    .notNull()
    .references(() => expedientes.id, { onDelete: "cascade" }),
  uso_suelo_decl: varchar("uso_suelo_decl", { length: 100 }),
  pisos_prop: varchar("pisos_prop", { length: 50 }),
  altura_m_prop: doublePrecision("altura_m_prop"),
  area_construida: doublePrecision("area_construida"),
  estacionamientos_prop: varchar("estacionamientos_prop", { length: 50 }),
  densidad_prop: varchar("densidad_prop", { length: 50 }),
  jsonb_extra: jsonb("jsonb_extra"),
})

// Tabla de Permiso Construcción
export const permiso_construccion = pgTable("permiso_construccion", {
  id: uuid("id").primaryKey().defaultRandom(),
  expediente_id: uuid("expediente_id")
    .notNull()
    .references(() => expedientes.id, { onDelete: "cascade" }),
  nro: varchar("nro", { length: 100 }).notNull(),
  emision: timestamp("emision"),
  vence: timestamp("vence"),
  tipo: varchar("tipo", { length: 100 }),
  estado: varchar("estado", { length: 50 }).default("vigente"),
})

// Tabla de As Built
export const as_built = pgTable("as_built", {
  id: uuid("id").primaryKey().defaultRandom(),
  expediente_id: uuid("expediente_id")
    .notNull()
    .references(() => expedientes.id, { onDelete: "cascade" }),
  version: varchar("version", { length: 50 }).notNull(),
  observaciones: text("observaciones"),
  creado_en: timestamp("creado_en").defaultNow(),
})

// Tabla de Ubicación Referencia
export const ubicacion_referencia = pgTable("ubicacion_referencia", {
  id: uuid("id").primaryKey().defaultRandom(),
  inmueble_id: uuid("inmueble_id")
    .notNull()
    .references(() => inmuebles.id, { onDelete: "cascade" }),
  lat: doublePrecision("lat").notNull(),
  lon: doublePrecision("lon").notNull(),
  fuente: varchar("fuente", { length: 100 }),
})

// Tabla de Vecino Colindante
export const vecino_colindante = pgTable("vecino_colindante", {
  id: uuid("id").primaryKey().defaultRandom(),
  inmueble_id: uuid("inmueble_id")
    .notNull()
    .references(() => inmuebles.id, { onDelete: "cascade" }),
  lado: varchar("lado", { length: 50 }).notNull(), // norte, sur, este, oeste
  nombre: varchar("nombre", { length: 255 }),
  observ: text("observ"),
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

export const inmueblesRelations = relations(inmuebles, ({ many, one }) => ({
  expedientes: many(expedientes),
  ubicaciones: many(ubicacion_referencia),
  vecinos: many(vecino_colindante),
}))

export const expedientesRelations = relations(expedientes, ({ one, many }) => ({
  inmueble: one(inmuebles, {
    fields: [expedientes.inmueble_id],
    references: [inmuebles.id],
  }),
  solicitante: one(users, {
    fields: [expedientes.solicitante_id],
    references: [users.id],
  }),
  historial: many(expediente_historial),
  proyecto_param: one(proyecto_param),
  permisos: many(permiso_construccion),
  as_built: many(as_built),
}))

export const expediente_historialRelations = relations(expediente_historial, ({ one }) => ({
  expediente: one(expedientes, {
    fields: [expediente_historial.expediente_id],
    references: [expedientes.id],
  }),
  usuario: one(users, {
    fields: [expediente_historial.by_user],
    references: [users.id],
  }),
}))

export const proyecto_paramRelations = relations(proyecto_param, ({ one }) => ({
  expediente: one(expedientes, {
    fields: [proyecto_param.expediente_id],
    references: [expedientes.id],
  }),
}))

export const permiso_construccionRelations = relations(permiso_construccion, ({ one }) => ({
  expediente: one(expedientes, {
    fields: [permiso_construccion.expediente_id],
    references: [expedientes.id],
  }),
}))

export const as_builtRelations = relations(as_built, ({ one }) => ({
  expediente: one(expedientes, {
    fields: [as_built.expediente_id],
    references: [expedientes.id],
  }),
}))

export const ubicacion_referenciaRelations = relations(ubicacion_referencia, ({ one }) => ({
  inmueble: one(inmuebles, {
    fields: [ubicacion_referencia.inmueble_id],
    references: [inmuebles.id],
  }),
}))

export const vecino_colindanteRelations = relations(vecino_colindante, ({ one }) => ({
  inmueble: one(inmuebles, {
    fields: [vecino_colindante.inmueble_id],
    references: [inmuebles.id],
  }),
}))
