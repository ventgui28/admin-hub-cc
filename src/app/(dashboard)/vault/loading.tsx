import { Skeleton } from "@/components/ui/skeleton"

export default function VaultLoading() {
  return (
    <div className="flex flex-col gap-8 animate-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-40 rounded-2xl" />
      </div>

      <div className="flex gap-4 mb-4">
        <Skeleton className="h-12 w-48 rounded-xl" />
        <Skeleton className="h-12 w-48 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-card p-0 overflow-hidden border-none shadow-xl flex flex-col h-[280px]">
            <Skeleton className="flex-1 rounded-none" />
            <div className="p-4 flex items-center justify-between border-t border-white/10 mt-auto bg-white/5">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-2 w-1/2 rounded-sm" />
              </div>
              <Skeleton className="h-8 w-8 rounded-lg ml-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
