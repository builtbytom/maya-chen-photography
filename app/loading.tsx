export default function Loading() {
  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-cream/20 animate-pulse" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-t-cream border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
    </div>
  )
}