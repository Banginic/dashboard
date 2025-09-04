import {
  integer,
  pgTable,
  varchar,
  boolean,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("client"),
  password: varchar({ length: 255 }).notNull(),
  createAt: timestamp("created_at").notNull().defaultNow(),
});

export const productsTable = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  category: varchar({ length: 255 }).notNull(),
  subCategory: varchar("sub_category", { length: 255 }).notNull(),
  description: varchar({ length: 500 }).notNull(),
  alergies: varchar({ length: 500 }).notNull(),
  rating: integer().notNull().default(4),
  isInStock: boolean().notNull().default(true),
  price: integer().notNull().default(0.0),
  photos: jsonb().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messagesTable = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull(),
  subject: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const employeesTable = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  position: varchar({ length: 255 }).notNull(),
  qualification: varchar({ length: 255 }).notNull(),
  photo: varchar({ length: 255 }).notNull(),
  bio: varchar({ length: 500 }).notNull(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonialTable = pgTable("testimonies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  project: varchar({ length: 255 }).notNull(),
  rating: integer().notNull().default(4.5),
  photo: varchar({ length: 255 }).notNull(),
  message: varchar({ length: 250 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const ordersTable = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId").references(() => usersTable.id),
  location: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  orderDetails: jsonb().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const newsTable = pgTable("news", {
  id: uuid("id").defaultRandom().primaryKey(),
  subject: varchar({ length: 255 }).notNull(),
  body: varchar({ length: 500 }).notNull(),
  isActive: boolean().notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
