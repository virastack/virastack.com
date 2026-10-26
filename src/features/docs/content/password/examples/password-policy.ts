// Shared by the form and the server, so no "use client".
import { definePolicy } from "@virastack/password/strength";

export const policy = definePolicy({ preset: "nist", blocklist: ["virastack"] });
