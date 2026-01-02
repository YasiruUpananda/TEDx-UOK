// Common styles for Team and Partners pages
export const sharedStyles = {
	// Card styles
	card: {
		base: 'group bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full transition-transform hover:scale-105 shadow-lg hover:shadow-2xl',
		imageContainer: 'relative aspect-[3/4] overflow-hidden bg-[#0E0E0E]',
		content: 'p-4 sm:p-6',
	},
	// Typography
	typography: {
		brandTitle: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight',
		heroTitle: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight',
		sectionTitle: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white',
		cardTitle: 'font-bold text-white text-lg',
		cardSubtitle: 'text-sm sm:text-base text-white/80',
		cardAccent: 'text-sm sm:text-base text-white/70',
		trackLabel: 'text-xs uppercase text-white/60',
		description: 'text-xl md:text-2xl text-white/80',
		heroDescriptionLight: 'text-base md:text-lg text-white/80',
		heroDescriptionDark: 'text-xl md:text-2xl text-white/50',
	},	
	// Colors
	colors: {
		tedxRed: 'text-[#EB0028]',
		black: 'text-black',
		white: 'text-white',
	},
	// Layout
	layout: {
		main: 'min-h-screen bg-black',
		heroSection: 'pt-24 pb-12 px-4 sm:px-6 md:pt-32 md:pb-16',
		heroContainer: 'max-w-7xl mx-auto',
		heroFlex: 'flex flex-col md:flex-row justify-between items-start gap-8',
		heroAside: 'max-w-md md:text-right md:ml-auto mt-4 md:mt-0',
		divider: 'border-t border-gray-200 max-w-7xl mx-auto',
		contentSection: 'py-12 px-4 sm:px-6 md:py-16',
		pageContainer: 'max-w-7xl mx-auto',
		pageStack: 'max-w-7xl mx-auto space-y-16 md:space-y-24',
		gridThreeCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
		partnerGrid: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
	},
	// Partner configuration
	partner: {
		logoMaxHeight: 'max-h-36',
		imageContainer: 'relative bg-[#0E0E0E] flex items-center justify-center p-8 h-48 overflow-hidden',
	},
};
