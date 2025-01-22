import { sql } from "@/lib/db";
import type { PageContent } from "@hooore/components/types/page-content";

export async function getPagePathsRepo() {
  const pageSlugs = await sql<{ slug: string }[]>`
              SELECT
                  slug
              FROM 
                page
              WHERE
                project_id = ${process.env.PROJECT_ID}
                AND published = true
          `;

  const paths = pageSlugs.map((pageSlug) => {
    const slug = pageSlug.slug.split("/");
    slug.shift();

    return { slug };
  });

  return paths;
}

export async function getPageRepo(slugSegments: string[] = []) {
  const slug = slugSegments.length === 0 ? "/" : `/${slugSegments.join("/")}`;

  const pageContents = await sql<PageContent[]>`
              SELECT
                  pc.id,
                  pc."content",
                  tc.slug
              FROM 
                page_content pc
              LEFT JOIN
                template_content tc
                    ON tc.id = pc.template_content_id
              LEFT JOIN
                page p
                    ON p.id = pc.page_id
              WHERE
                p.slug = ${slug}
                AND p.published = true
                AND p.project_id = ${process.env.PROJECT_ID}
              ORDER BY
                "order" ASC
          `;

  return pageContents;
}
