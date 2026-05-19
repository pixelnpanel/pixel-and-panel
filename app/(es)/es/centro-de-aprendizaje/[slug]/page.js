import { notFound } from "next/navigation";
import ArticlePageEs from "@/components/learning-center/ArticlePageEs";
import {
  getPostBySlugEs,
  learningCenterPostsEs,
} from "@/lib/learning-center-posts-es";

export function generateStaticParams() {
  return learningCenterPostsEs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlugEs(slug);

  if (!post) {
    return {
      title: { absolute: "Centro de Aprendizaje | Pixel & Panel" },
    };
  }

  const pageUrl = `https://pixelnpanel.com/es/centro-de-aprendizaje/${post.slug}`;
  const enUrl = `https://pixelnpanel.com/learning-center/${post.enSlug}`;

  return {
    title: { absolute: `${post.title} | Centro de Aprendizaje Pixel & Panel` },
    description: post.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": enUrl,
        "es-US": pageUrl,
      },
    },
    openGraph: {
      title: `${post.title} | Pixel & Panel`,
      description: post.description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: "es_US",
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

export default async function SpanishLearningCenterArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlugEs(slug);

  if (!post) notFound();

  return <ArticlePageEs post={post} />;
}
