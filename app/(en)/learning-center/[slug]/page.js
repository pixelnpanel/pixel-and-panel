import { notFound } from "next/navigation";
import ArticlePage from "@/components/learning-center/ArticlePage";
import {
  getPostBySlug,
  learningCenterPosts,
} from "@/lib/learning-center-posts";
import { learningCenterSlugMap } from "@/lib/learning-center-posts-es";
import { learningCenterSeoOverrides } from "@/lib/seo-copy-overrides";
import { withDefaultSocialImage } from "@/lib/seo";

export function generateStaticParams() {
  return learningCenterPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: { absolute: "Learning Center | Pixel & Panel" },
    };
  }

  const pageUrl = `https://www.pixelnpanel.com/learning-center/${post.slug}`;
  const esSlug = learningCenterSlugMap[post.slug];
  const esUrl = esSlug
    ? `https://www.pixelnpanel.com/es/centro-de-aprendizaje/${esSlug}`
    : null;
  const seo = learningCenterSeoOverrides[post.slug] || {};
  const title = seo.title || post.title;
  const description = seo.description || post.description;

  return withDefaultSocialImage({
    title: { absolute: `${title} | Pixel & Panel` },
    description,
    alternates: {
      canonical: pageUrl,
      ...(esUrl
        ? {
            languages: {
              "en-US": pageUrl,
              "es-US": esUrl,
            },
          }
        : {}),
    },
    openGraph: {
      title: `${title} | Pixel & Panel`,
      description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pixel & Panel`,
      description,
    },
  });
}

export default async function LearningCenterArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return <ArticlePage post={post} />;
}
