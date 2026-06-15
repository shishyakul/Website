import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const defaultTitle = "Shishyakul | Best Coaching Classes in Kamothe, Navi Mumbai";
  const defaultDesc = "Top-rated tuitions in Kamothe for Classes 8, 9, 10. Expert CBSE and State Board coaching for Maths, Science, SST, and English. Join Shishyakul Navi Mumbai!";
  const defaultKeywords = "Shishyakul, tuitions in kamothe, coaching classes in kamothe, best tuition in kamothe, CBSE classes in kamothe, State board classes kamothe, sector 20 kamothe coaching, 10th standard tuitions kamothe, maths tuition kamothe, science classes kamothe, navi mumbai tuitions";

  const seoTitle = title ? `${title} | Shishyakul Kamothe` : defaultTitle;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description || defaultDesc} />

      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
    </Helmet>
  );
}
