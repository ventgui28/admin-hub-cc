import { Skeleton } from "@/components/ui/skeleton"

export default function AthletesLoading() {
  return (
    <div className="flex flex-col gap-8 animate-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="h-4 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-40 rounded-2xl" />
      </div>

      <div className="glass-card p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-8 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <Skeleton className="h-14 w-14 rounded-2xl shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-2xl ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
