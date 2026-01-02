export default function Loading({ label = 'Loading...' }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center py-8 text-white/70">
      <div className="animate-spin  rounded-full h-8 w-8 border-t-2 border-white/70 mb-3" aria-hidden></div>
      <div>{label}</div>
    </div>
  );
}
