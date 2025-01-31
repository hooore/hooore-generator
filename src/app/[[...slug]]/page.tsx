import { getPagePathsRepo, getPageRepo } from "@/actions/page";
import { getNavbarByProjectIdRepo } from "@/actions/project-navbar.repository";
import { getProjectByIdRepo } from "@/actions/project.repository";
import { Toaster } from "@/components/toaster";
import { PageRenderer } from "@hooore/components/page-renderer";
import type { Metadata, ResolvingMetadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(
  _: Props,
  __: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const project = await getProjectByIdRepo(process.env.PROJECT_ID);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    icons: [
      {
        rel: "icon",
        type: "image/x-icon",
        url: project.favico,
      },
    ],
  };
}

export async function generateStaticParams() {
  return await getPagePathsRepo();
}

export default async function Page(props: Props) {
  const params = await props.params;
  const slug = params.slug;
  const [project, navbars, pageData] = await Promise.all([
    getProjectByIdRepo(process.env.PROJECT_ID),
    getNavbarByProjectIdRepo(process.env.PROJECT_ID),
    getPageRepo(slug),
  ]);

  if (!pageData) {
    return redirect("/not-found");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <PageRenderer
          contents={[...navbars, ...pageData]}
          projectLogo={project?.business_logo}
        />
        <Toaster />
        <Script
          defer
          src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
        />
      </body>
    </html>
  );
}
