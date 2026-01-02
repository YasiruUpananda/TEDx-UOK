import { Helmet } from "react-helmet-async";

interface SEOProps {
  eventName: string;
  description: string;
  image?: string;
  url?: string;
}

const SEO = ({ eventName, description, image, url }: SEOProps) => {
  const siteTitle = eventName || "TEDxUOK 2026";

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
