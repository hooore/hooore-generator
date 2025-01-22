import type { ProjectMetaSchema } from "./project-meta.definition";
import { sql } from "@/lib/db";

export async function getMetaByProjectIdRepo(projectId: string) {
  const metas = await sql<ProjectMetaSchema[]>`
            SELECT
                id,
                type,
                content
            FROM
                project_meta
            WHERE
                project_id  = ${projectId}
            `;

  return metas;
}
