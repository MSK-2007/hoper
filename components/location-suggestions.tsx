"use client"

interface LocationSuggestion {
  name: string
  address: string
  lat: number
  lng: number
}

interface LocationSuggestionsProps {
  suggestions: LocationSuggestion[]
  isOpen: boolean
  isLoading: boolean
  onSelectSuggestion: (suggestion: LocationSuggestion) => void
  onClose: () => void
}

export function LocationSuggestions({
  suggestions,
  isOpen,
  isLoading,
  onSelectSuggestion,
  onClose,
}: LocationSuggestionsProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {isLoading && (
        <div className="p-4 text-center text-muted-foreground">
          <div className="animate-pulse">Searching locations...</div>
        </div>
      )}

      {!isLoading && suggestions.length === 0 && (
        <div className="p-4 text-center text-muted-foreground text-sm">No locations found</div>
      )}

      {!isLoading && suggestions.length > 0 && (
        <ul className="divide-y divide-border">
          {suggestions.map((suggestion, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => {
                  onSelectSuggestion(suggestion)
                  onClose()
                }}
                className="w-full text-left p-4 hover:bg-muted transition-colors focus:outline-none focus:bg-muted"
              >
                <p className="font-semibold text-foreground text-sm">{suggestion.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{suggestion.address}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
