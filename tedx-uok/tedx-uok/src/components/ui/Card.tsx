import type React from 'react';

type CardProps = {
	children: React.ReactNode;
	className?: string;
	role?: string;
};


export default function Card({ children, className = '', role = 'article' }: CardProps) {
	return (
		<article role={role} className={`card-core p-6 ${className}`}>
			{children}
		</article>
	);
}
