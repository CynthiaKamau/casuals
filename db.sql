CREATE SEQUENCE roles_id_seq;
CREATE TABLE "public"."roles" (
  "id" int8 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."roles" 
  OWNER TO "postgres";
  
CREATE SEQUENCE skills_id_seq;
CREATE TABLE "public"."skills" (
  "id" int8 NOT NULL DEFAULT nextval('skills_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."skills" 
  OWNER TO "postgres";

CREATE SEQUENCE users_id_seq;
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "first_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "middle_name" varchar(255) COLLATE "pg_catalog"."default",
  "last_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "phone_number" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "role_id" int8 NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "email_verified_at" timestamp(0),
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "remember_token" varchar(100) COLLATE "pg_catalog"."default",
  "created_by" int8,
  "updated_by" int8,
  "deleted_by" int8,
  "restored_by" int8,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  "deleted_at" timestamp(0),
  "restored_at" timestamp(0),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("deleted_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("restored_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  UNIQUE ("email"),
  UNIQUE ("phone_number")
);

ALTER TABLE "public"."users" 
  OWNER TO "postgres";

CREATE SEQUENCE profiles_id_seq;
CREATE TABLE "public"."profiles" (
  "id" int8 NOT NULL DEFAULT nextval('profiles_id_seq'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "gender" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "dob" date NOT NULL,
  "user_id" int8 NOT NULL,
  "profile_photo" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL DEFAULT true,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  "deleted_at" timestamp(0),
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "citizenship" varchar(255) COLLATE "pg_catalog"."default",
  "created_by" int8,
  "updated_by" int8,
  "deleted_by" int8,
  "restored_by" int8,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("deleted_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("restored_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  CHECK (gender::text = ANY (ARRAY['MALE'::character varying::text, 'FEMALE'::character varying::text, 'TRANS-GENDER'::character varying::text, 'OTHER'::character varying::text]))
)
;

ALTER TABLE "public"."profiles" 
  OWNER TO "postgres";


CREATE SEQUENCE jobs_id_seq;
CREATE TABLE "public"."jobs" (
  "id" int8 NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "date_added" date NOT NULL,
  "validity" date NOT NULL,
  "client_id" int8 NOT NULL,
  "worker_id" int8 NOT NULL,
  "preferance" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "ratings" int8 NOT NULL,
  "status" bool NOT NULL DEFAULT true,
  "location" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  "deleted_at" timestamp(0),
  "created_by" int8,
  "updated_by" int8,
  "deleted_by" int8,
  "restored_by" int8,
  "restored_at" timestamp(0),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("client_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("worker_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("deleted_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY ("restored_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
)
;


ALTER TABLE "public"."jobs" 
  OWNER TO "postgres";