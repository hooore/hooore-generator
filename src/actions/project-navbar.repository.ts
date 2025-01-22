import { sql } from "@/lib/db";
import type { PageContent } from "@hooore/components/types/page-content";

export async function getNavbarByProjectIdRepo(projectId: string) {
  const navbars = await sql<PageContent[]>`
            SELECT
                pc.id,
                pc."content",
                tc.slug
            FROM
                project_navbar pc
            LEFT JOIN
                template_content tc
                    ON tc.id = pc.template_content_id
            WHERE
                pc.project_id  = ${projectId}
            LIMIT 1
            `;

  return navbars;
}
