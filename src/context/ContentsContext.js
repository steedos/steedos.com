export const ContentsContext = React.createContext({})

export const ContentsContext = ({children}) => {
  return (
    <ContentsContext.Provider value={{...values}}>
      {children}
    </ContentsContext.Provider>
  )
}