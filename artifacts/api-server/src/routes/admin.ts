import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db, queriesTable } from "@workspace/db";
import {
  AdminLoginBody,
  ListAdminQueriesResponse,
  ToggleQueryRepliedResponse,
  ToggleQueryRepliedParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Admin auth middleware
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    req.log.error("ADMIN_PASSWORD env var is not set");
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || token !== adminPassword) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}

// POST /admin/login
router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    req.log.error("ADMIN_PASSWORD env var is not set");
    res.status(500).json({ error: "Server misconfiguration" });
    return;
  }

  if (parsed.data.password !== adminPassword) {
    req.log.warn("Failed admin login attempt");
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  // Token is the password itself — single-user admin
  res.json({ token: adminPassword });
});

// GET /admin/queries
router.get("/admin/queries", requireAdmin, async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(queriesTable)
    .orderBy(queriesTable.createdAt);

  const serialized = rows.map((r) => ({
    ...r,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
  }));
  res.json(ListAdminQueriesResponse.parse(serialized));
});

// PATCH /admin/queries/:id/toggle-replied
router.patch(
  "/admin/queries/:id/toggle-replied",
  requireAdmin,
  async (req, res): Promise<void> => {
    const paramParsed = ToggleQueryRepliedParams.safeParse({
      id: req.params.id,
    });
    if (!paramParsed.success) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const id = paramParsed.data.id;

    const existing = await db
      .select()
      .from(queriesTable)
      .where(eq(queriesTable.id, id))
      .limit(1);

    if (existing.length === 0) {
      res.status(404).json({ error: "Query not found" });
      return;
    }

    const [updated] = await db
      .update(queriesTable)
      .set({ replied: !existing[0].replied })
      .where(eq(queriesTable.id, id))
      .returning();

    res.json(ToggleQueryRepliedResponse.parse({
      ...updated,
      createdAt: updated.createdAt instanceof Date ? updated.createdAt.toISOString() : updated.createdAt,
    }));
  },
);

export default router;
