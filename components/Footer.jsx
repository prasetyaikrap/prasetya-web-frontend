
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`flex smallText`}>Copyright {year} | Prasetya Ikra Priyadi</footer>
  )
}