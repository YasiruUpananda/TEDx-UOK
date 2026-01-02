-- Instructions:
-- 1. Run this SQL in your Supabase SQL Editor.
-- 2. Ensure you have a 'speaker-photos' bucket in Supabase Storage.
--    If not, create it and set it to public.
-- 3. For the speakers below, I have used placeholders like 'jane_doe.jpg'.
--    You MUST upload images with these exact filenames to the 'speaker-photos' bucket.
--    Alternatively, if you want to see images NOW, replace the filenames 
--    with valid HTTPS URLs (e.g., from Unsplash) in this script before running.

-- Clean up existing data (optional, remove if you want to keep existing data)
TRUNCATE TABLE agenda_items CASCADE;
TRUNCATE TABLE speakers CASCADE;
TRUNCATE TABLE blog_posts;

-- Insert Speakers (Professional Dummy Data)
-- Insert Speakers (Professional Dummy Data)
INSERT INTO speakers (speaker_id, full_name, title, organization, bio_short, bio_long, photo_url, talk_title, talk_description, social_links, expertise)
VALUES 
(
  'd290f1ee-6c54-4b01-90e6-d701748f0851',
  'Dr. Elara Vance',
  'Neuroscientist & Futurist',
  'Neural Institute',
  'Leading expert in neural interfaces and memory reconstruction technologies.',
  'Dr. Elara Vance is a pioneering neuroscientist whose work at the intersection of biology and technology has redefined our understanding of human memory. With over 15 years of research at the forefront of neural interface technology, she has developed non-invasive methods to record and replay memories. Her work raises profound questions about identity, privacy, and what it means to be human in a digital age. She is a recipient of the Global Science Innovation Award and has published three best-selling books on the future of the mind.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  'Can We Upload Our Memories?',
  'In this mind-bending talk, Dr. Vance explores the latest breakthroughs in neural interface technology that could allow us to backup our memories like files on a hard drive. She discusses the potential medical applications for Alzheimer''s patients, as well as the ethical dilemmas we must face as we approach the era of digital immortality.',
  '{"linkedin": "https://linkedin.com/in/elaravance", "twitter": "https://twitter.com/elaravance", "website": "https://elaravance.com"}',
  '{ "Neuroscience", "Futurism", "Bioethics" }'
),
(
  'e390f1ee-6c54-4b01-90e6-d701748f0852',
  'Marcus Thorne',
  'Sustainable Architect',
  'GreenHorizon',
  'Award-winning architect designing self-sustaining vertical ecosystems.',
  'Marcus Thorne believe that the cities of the future shouldn''t just house people; they should heal the planet. As the founder of GreenHorizon, an architectural firm dedicated to "living structures," Marcus designs buildings that generate their own energy, clean the air, and grow food. His "Vertical Village" project in Singapore has been hailed as a blueprint for urban sustainability. He advocates for a radical shift in how we view construction—from conquering nature to collaborating with it.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
  'Architecture That Breathes',
  'Concrete jungles are suffocating our planet. Marcus Thorne presents a new vision for urban living where skyscrapers act like giant trees—absorbing carbon, filtering water, and providing green spaces for every resident. He showcases his latest projects that prove sustainability and luxury can coexist.',
  '{"linkedin": "https://linkedin.com/in/marcusthorne", "website": "https://greenhorizon.arch"}',
  '{ "Sustainability", "Architecture", "Urban Planning" }'
),
(
  'f490f1ee-6c54-4b01-90e6-d701748f0853',
  'Sarah Jenkins',
  'AI Ethicist',
  'Institute for Digital Ethics',
  'Philosopher and coder exploring the moral landscape of artificial intelligence.',
  'Sarah Jenkins began her career as a software engineer at a major tech giant before pivoting to philosophy to address the growing ethical chasm in AI development. Now a professor at the Institute for Digital Ethics, she advises governments and corporations on responsible AI deployment. Her research focuses on algorithmic bias, the rights of synthetic beings, and maintaining human agency in an automated world.',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
  'Teaching Morality to Machines',
  'As AI systems make more decisions for us—from who gets a loan to who gets medical treatment—how do we ensure they share our values? Sarah Jenkins argues that we cannot just code intelligence; we must code empathy. She outlines a framework for "Ethical AI" that prioritizes human well-being over efficiency.',
  '{"twitter": "https://twitter.com/sarahjenkins_ai", "linkedin": "https://linkedin.com/in/sarahjenkins"}',
  '{ "AI Ethics", "Philosophy", "Tech Policy" }'
),
(
  'a190f1ee-6c54-4b01-90e6-d701748f0854',
  'Kaito Tanaka',
  'Ocean Clean-up Innovator',
  'BlueFuture',
  'Inventor of the "Ocean Skimmer" autonomous cleaning drone network.',
  'At just 24 years old, Kaito Tanaka has done more for ocean conservation than most do in a lifetime. What started as a high school science project has evolved into a global network of autonomous solar-powered drones that collect plastic waste from the ocean surface. Kaito''s non-profit, BlueFuture, now operates in 12 countries and has removed over 5,000 tons of plastic from marine ecosystems.',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
  'A Plastic-Free Future is Possible',
  'Kaito shares his journey from a concerned teenager to a global changemaker. He demonstrates his drone technology live on stage and issues a rallying cry for the next generation of engineers to use their skills for planetary repair. His message is simple: We broke the ocean, but we have the tools to fix it.',
  '{"website": "https://bluefuture.org", "twitter": "https://twitter.com/kaitotanaka"}',
  '{ "Ocean Cleanup", "Robotics", "Environment" }'
);

-- Insert Blog Posts (Professional Dummy Data)
INSERT INTO blog_posts (blog_id, title, slug, content, cover_image_url, author_name, published_at, is_published)
VALUES
(
  '123e4567-e89b-12d3-a456-426614174000',
  'The Paradox of Connection',
  'paradox-of-connection',
  '<p>We have never been more connected, yet loneliness is at an all-time high. In this exploration of our digital habits, we dive into the psychology of social media and how "likes" have replaced love.</p><h3>The Shallow End of the Pool</h3><p>Infinite scrolling gives us the illusion of keeping up with friends, but it often leaves us feeling empty. True connection requires vulnerability, presence, and time—resources that are scarce in the attention economy.</p><h3>Reclaiming Our Attention</h3><p>We discuss practical strategies for digital minimalism and how to curate online spaces that nourish rather than drain us. It starts with turning off notifications and turning toward the person sitting across from you.</p>',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
  'Elena Richardson',
  '2025-01-15T10:00:00Z',
  TRUE
),
(
  '223e4567-e89b-12d3-a456-426614174001',
  'Why Failure is the Best Teacher',
  'failure-best-teacher',
  '<p>In a culture obsessed with success, we often hide our failures. But what if we celebrated them? This post examines the "fail fast" mentality of Silicon Valley and how it applies to personal growth.</p><h3>The Growth Mindset</h3><p>Psychologist Carol Dweck coined the term "growth mindset" to describe the belief that abilities can be developed. When we view failure as data rather than a verdict on our worth, we unlock unlimited potential.</p><p>We share stories of famous innovators who failed their way to the top and provide a framework for conducting your own "life post-mortems."</p>',
  'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop',
  'Marcus Thorne',
  '2025-02-01T14:30:00Z',
  TRUE
),
(
  '323e4567-e89b-12d3-a456-426614174002',
  'The Gentle Art of Slow Living',
  'art-of-slow-living',
  '<p>Burnout is the pandemic of the modern worker. "Slow Living" isn''t about being lazy; it''s about being intentional. It''s about choosing quality over quantity in everything from the food we eat to the work we do.</p><h3>Micro-Habits for a Slower Life</h3><p>You don''t need to move to a cabin in the woods to slow down. Simple changes like single-tasking, savoring your morning coffee without a screen, and scheduling "do nothing" time can radically lower stress levels.</p><p>Join the movement of people who are refusing to measure their worth by their productivity.</p>',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop',
  'Sarah Jenkins',
  '2025-02-20T09:15:00Z',
  TRUE
);
