import './globals.css';

export const metadata = {
  title: 'Att1tud – Prenotazioni',
  description: 'Prenota. Allena. Migliora.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <header className="header">
          <div className="container">
            <div className="row" style={{justifyContent:'space-between'}}>
              <div className="row">
                <div className="badge"><b>ATT1</b></div>
                <div>
                  <div style={{fontWeight:700}}>Att1tud – Prenotazioni</div>
                  <div className="subtitle">Nero & Argento · Veloce · Intuitiva</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="container" style={{paddingTop:16}}>{children}</main>
      </body>
    </html>
  );
}
