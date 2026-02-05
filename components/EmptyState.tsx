import { AlertCircle } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  instructions?: string[]
}

export function EmptyState({
  title,
  description,
  instructions,
}: EmptyStateProps) {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="border border-border rounded-lg p-12 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-semibold mb-3">{title}</h1>
          <p className="text-muted-foreground mb-6">{description}</p>

          {instructions && instructions.length > 0 && (
            <div className="mt-8 text-left">
              <p className="font-medium mb-3">Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                {instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
