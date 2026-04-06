import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

const rateLimitSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  type: { type: String, enum: ["guest", "user"], default: "guest" },
  count: { type: Number, default: 0 },
  date: { type: String, required: true },
});

rateLimitSchema.index({ identifier: 1, date: 1 }, { unique: true });

const RateLimit =
  mongoose.models.RateLimit || mongoose.model("RateLimit", rateLimitSchema);

const GUEST_LIMIT = 5;
const USER_LIMIT = 10;

export async function checkAndIncrementLimit(identifier, isLoggedIn) {
  await connectDB();

  const limit = isLoggedIn ? USER_LIMIT : GUEST_LIMIT;
  const today = new Date().toISOString().split("T")[0];

  let record = await RateLimit.findOne({ identifier, date: today });

  if (!record) {
    await RateLimit.create({
      identifier,
      type: isLoggedIn ? "user" : "guest",
      count: 1,
      date: today,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  await record.save();

  return { allowed: true, remaining: limit - record.count };
}