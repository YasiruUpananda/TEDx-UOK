export default function Empty({ message = 'No results.' }: { message?: string }) {
  return (
    <div className="py-6 text-center text-white/60">
      <div className="text-sm">{message}</div>
    </div>
  );

}
