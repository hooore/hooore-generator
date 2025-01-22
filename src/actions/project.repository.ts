import { sql } from "@/lib/db";
import type { ProjectSchema } from "./project.defininiton";

export async function getProjectByIdRepo(projectId: string) {
  const [project] = await sql<[ProjectSchema?]>`
    SELECT
        id,
        domain,
        user_id,
        business_name,
        business_logo
    FROM project
    WHERE id = ${projectId}
    `;

  return project;
}
