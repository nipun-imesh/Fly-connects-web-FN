type LoaderProps = {
  label?: string
  fullScreen?: boolean
}

export default function Loader({ label = "Loading...", fullScreen = true }: LoaderProps) {
  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-8 flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 rounded-full border-4 border-red-600/20 border-t-red-600 animate-spin"
            aria-hidden
          />
          <p className="text-sm sm:text-base font-semibold text-gray-700">{label}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-8 flex flex-col items-center gap-4">
            <div
              className="h-10 w-10 rounded-full border-4 border-red-600/20 border-t-red-600 animate-spin"
              aria-hidden
            />
            <p className="text-sm sm:text-base font-semibold text-gray-700">{label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
