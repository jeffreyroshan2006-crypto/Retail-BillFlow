import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, hashPassword } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up Authentication
  setupAuth(app);

  // === Middleware to protect routes ===
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Unauthorized" });
  };

  // === Products ===
  app.get(api.products.list.path, requireAuth, async (req, res) => {
    const products = await storage.getProducts(
      req.query.search as string, 
      req.query.category as string
    );
    res.json(products);
  });

  app.get(api.products.get.path, requireAuth, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post(api.products.create.path, requireAuth, async (req, res) => {
    try {
      const input = api.products.create.input.parse(req.body);
      const product = await storage.createProduct(input);
      res.status(201).json(product);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({ message: e.errors[0].message });
      }
      throw e;
    }
  });

  app.put(api.products.update.path, requireAuth, async (req, res) => {
    try {
      const input = api.products.update.input.parse(req.body);
      const product = await storage.updateProduct(Number(req.params.id), input);
      res.json(product);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({ message: e.errors[0].message });
      }
      res.status(404).json({ message: "Product not found" });
    }
  });

  app.delete(api.products.delete.path, requireAuth, async (req, res) => {
    await storage.deleteProduct(Number(req.params.id));
    res.sendStatus(204);
  });

  // === Customers ===
  app.get(api.customers.list.path, requireAuth, async (req, res) => {
    const customers = await storage.getCustomers(req.query.search as string);
    res.json(customers);
  });

  app.post(api.customers.create.path, requireAuth, async (req, res) => {
    try {
      const input = api.customers.create.input.parse(req.body);
      const customer = await storage.createCustomer(input);
      res.status(201).json(customer);
    } catch (e) {
      res.status(400).json({ message: "Validation error" });
    }
  });

  // === Bills ===
  app.post(api.bills.create.path, requireAuth, async (req, res) => {
    try {
      const input = api.bills.create.input.parse(req.body);
      const bill = await storage.createBill(input, (req.user as any).id);
      res.status(201).json(bill);
    } catch (e: any) {
      res.status(400).json({ message: e.message || "Error processing bill" });
    }
  });

  app.get(api.bills.list.path, requireAuth, async (req, res) => {
    const bills = await storage.getBills();
    res.json(bills);
  });

  // === Stats ===
  app.get(api.stats.dashboard.path, requireAuth, async (req, res) => {
    const dailySales = await storage.getDailySales();
    const topProducts = await storage.getTopProducts();
    const lowStock = await storage.getLowStockProducts();
    
    res.json({
      dailySales,
      topProducts,
      lowStock
    });
  });

  // === Seed Data ===
  await seed();

  return httpServer;
}

async function seed() {
  const existingUser = await storage.getUserByUsername("admin");
  if (!existingUser) {
    const hashedPassword = await hashPassword("admin123");
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      name: "System Admin",
      role: "admin",
    });
    
    // Seed Products
    await storage.createProduct({
      name: "Organic Milk 1L",
      category: "Dairy",
      sku: "MILK001",
      stockQuantity: 50,
      purchasePrice: "45.00",
      sellingPrice: "60.00",
      taxRate: "5.00",
      supplierId: null,
      expiryDate: "2024-12-31"
    });
    
    await storage.createProduct({
      name: "Whole Wheat Bread",
      category: "Bakery",
      sku: "BRD001",
      stockQuantity: 20,
      purchasePrice: "30.00",
      sellingPrice: "45.00",
      taxRate: "0",
      supplierId: null,
      expiryDate: "2024-05-20"
    });
    
    await storage.createProduct({
      name: "Wireless Mouse",
      category: "Electronics",
      sku: "TECH001",
      stockQuantity: 15,
      purchasePrice: "400.00",
      sellingPrice: "850.00",
      taxRate: "18.00",
      supplierId: null,
      expiryDate: null
    });

    await storage.createCustomer({
      name: "John Doe",
      phone: "9876543210",
      email: "john@example.com",
    });
  }
}
