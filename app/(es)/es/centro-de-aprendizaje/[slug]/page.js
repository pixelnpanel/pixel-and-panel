import { notFound } from "next/navigation";
import ArticlePageEs from "@/components/learning-center/ArticlePageEs";
import {
  getPostBySlugEs,
  learningCenterPostsEs,
} from "@/lib/learning-center-posts-es";
import { learningCenterSeoOverridesEs } from "@/lib/seo-copy-overrides";

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
  const seo = learningCenterSeoOverridesEs[post.slug] || {};
  const title = seo.title || post.title;
  const description = seo.description || post.description;

  return {
    title: { absolute: `${title} | Pixel & Panel` },
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "en-US": enUrl,
        "es-US": pageUrl,
      },
    },
    openGraph: {
      title: `${title} | Pixel & Panel`,
      description,
      url: pageUrl,
      siteName: "Pixel & Panel",
      locale: "es_US",
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pixel & Panel`,
      description,
    },
  };
}

export default async function SpanishLearningCenterArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlugEs(slug);

  if (!post) notFound();

  return <ArticlePageEs post={post} />;
}
