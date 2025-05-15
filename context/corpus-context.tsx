import { createContext, useContext, useState, ReactNode } from "react"

// 1. Create the context object
const CorpusContext = createContext<{
  corpusOn: boolean
  setCorpusOn: (on: boolean) => void
} | null>(null)

// 2. Custom hook for easy use in other components
export const useCorpus = () => {
  const context = useContext(CorpusContext)
  if (!context)
    throw new Error("useCorpus must be used within a CorpusProvider")
  return context
}

// 3. The provider wraps your app and stores the state
export const CorpusProvider = ({ children }: { children: ReactNode }) => {
  const [corpusOn, setCorpusOn] = useState(true) // default ON
  return (
    <CorpusContext.Provider value={{ corpusOn, setCorpusOn }}>
      {children}
    </CorpusContext.Provider>
  )
}
