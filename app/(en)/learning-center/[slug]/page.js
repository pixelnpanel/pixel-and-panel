import { notFound } from "next/navigation";
import ArticlePage from "@/components/learning-center/ArticlePage";
import {
  getPostBySlug,
  learningCenterPosts,
} from "@/lib/learning-center-posts";
import { learningCenterSlugMap } from "@/lib/learning-center-posts-es";

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

  const pageUrl = `https://pixelnpanel.com/learning-center/${post.slug}`;
  const esSlug = learningCenterSlugMap[post.slug];
  const esUrl = esSlug
    ? `https://pixelnpanel.com/es/centro-de-aprendizaje/${esSlug}`
    : null;

  return {
    title: { absolute: `${post.title} | Pixel & Panel Learning Center` },
    description: post.description,
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
      title: `${post.title} | Pixel & Panel`,
      description: post.description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Pixel & Panel`,
      description: post.description,
    },
  };
}

export default async function LearningCenterArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return <ArticlePage post={post} />;
}
