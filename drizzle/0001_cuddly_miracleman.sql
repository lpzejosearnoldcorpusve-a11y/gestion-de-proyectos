CREATE TABLE "as_built" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expediente_id" uuid NOT NULL,
	"version" varchar(50) NOT NULL,
	"observaciones" text,
	"creado_en" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expediente_historial" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expediente_id" uuid NOT NULL,
	"estado_from" varchar(50),
	"estado_to" varchar(50) NOT NULL,
	"by_user" uuid,
	"at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "expedientes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inmueble_id" uuid NOT NULL,
	"solicitante_id" uuid NOT NULL,
	"estado" varchar(50) DEFAULT 'en_tramite',
	"prioridad" varchar(50) DEFAULT 'normal',
	"canal" varchar(50) DEFAULT 'web',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "inmuebles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cod_catastral" varchar(100) NOT NULL,
	"direccion" varchar(255) NOT NULL,
	"distrito" varchar(100) NOT NULL,
	"zona" varchar(100),
	"estado" varchar(50) DEFAULT 'activo',
	"creado_en" timestamp DEFAULT now(),
	"actualizado_en" timestamp DEFAULT now(),
	CONSTRAINT "inmuebles_cod_catastral_unique" UNIQUE("cod_catastral")
);
--> statement-breakpoint
CREATE TABLE "permiso_construccion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expediente_id" uuid NOT NULL,
	"nro" varchar(100) NOT NULL,
	"emision" timestamp,
	"vence" timestamp,
	"tipo" varchar(100),
	"estado" varchar(50) DEFAULT 'vigente'
);
--> statement-breakpoint
CREATE TABLE "proyecto_param" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expediente_id" uuid NOT NULL,
	"uso_suelo_decl" varchar(100),
	"pisos_prop" varchar(50),
	"altura_m_prop" double precision,
	"area_construida" double precision,
	"estacionamientos_prop" varchar(50),
	"densidad_prop" varchar(50),
	"jsonb_extra" jsonb
);
--> statement-breakpoint
CREATE TABLE "ubicacion_referencia" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inmueble_id" uuid NOT NULL,
	"lat" double precision NOT NULL,
	"lon" double precision NOT NULL,
	"fuente" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "vecino_colindante" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inmueble_id" uuid NOT NULL,
	"lado" varchar(50) NOT NULL,
	"nombre" varchar(255),
	"observ" text
);
--> statement-breakpoint
ALTER TABLE "as_built" ADD CONSTRAINT "as_built_expediente_id_expedientes_id_fk" FOREIGN KEY ("expediente_id") REFERENCES "public"."expedientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expediente_historial" ADD CONSTRAINT "expediente_historial_expediente_id_expedientes_id_fk" FOREIGN KEY ("expediente_id") REFERENCES "public"."expedientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expediente_historial" ADD CONSTRAINT "expediente_historial_by_user_usuarios_id_fk" FOREIGN KEY ("by_user") REFERENCES "public"."usuarios"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expedientes" ADD CONSTRAINT "expedientes_inmueble_id_inmuebles_id_fk" FOREIGN KEY ("inmueble_id") REFERENCES "public"."inmuebles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expedientes" ADD CONSTRAINT "expedientes_solicitante_id_usuarios_id_fk" FOREIGN KEY ("solicitante_id") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permiso_construccion" ADD CONSTRAINT "permiso_construccion_expediente_id_expedientes_id_fk" FOREIGN KEY ("expediente_id") REFERENCES "public"."expedientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proyecto_param" ADD CONSTRAINT "proyecto_param_expediente_id_expedientes_id_fk" FOREIGN KEY ("expediente_id") REFERENCES "public"."expedientes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ubicacion_referencia" ADD CONSTRAINT "ubicacion_referencia_inmueble_id_inmuebles_id_fk" FOREIGN KEY ("inmueble_id") REFERENCES "public"."inmuebles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vecino_colindante" ADD CONSTRAINT "vecino_colindante_inmueble_id_inmuebles_id_fk" FOREIGN KEY ("inmueble_id") REFERENCES "public"."inmuebles"("id") ON DELETE cascade ON UPDATE no action;