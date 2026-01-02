import type React from 'react';

type SectionProps = {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
      <div>{children}</div>
    </section>
  );

}
