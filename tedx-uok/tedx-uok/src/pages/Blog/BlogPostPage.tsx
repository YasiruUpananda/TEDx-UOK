import { useParams } from "react-router-dom";
import { useSEO } from "../../hooks/useSEO";

export default function BlogPostPage() {
  const { slug } = useParams();

  useSEO({
    title: "Blog Post | TEDxUOK",
    description: "Read our latest stories and insights.",
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Blog Post</h1>
      <p className="text-xl text-gray-400">Slug: {slug}</p>
    </div>
  );
}
