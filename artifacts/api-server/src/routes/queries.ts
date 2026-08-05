import { Router, type IRouter } from "express";
import { db, queriesTable } from "@workspace/db";
import { SubmitQueryBody, SubmitQueryResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/queries", async (req, res): Promise<void> => {
  const parsed = SubmitQueryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid query submission body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, profile, mobile, email, queryText } = parsed.data;

  const [inserted] = await db
    .insert(queriesTable)
    .values({ name, profile, mobile, email, queryText })
    .returning();

  res.status(201).json(SubmitQueryResponse.parse(inserted));
});

export default router;
