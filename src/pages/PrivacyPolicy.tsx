import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-display text-xl md:text-2xl font-bold text-osso-parchment mb-4 pb-2"
      style={{ borderBottom: "1px solid hsl(40 85% 41% / 0.15)" }}>
      {title}
    </h2>
    <div className="space-y-3 text-osso-parchment/70 text-sm leading-relaxed font-body">
      {children}
    </div>
  </div>
);

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="text-osso-amber/80 hover:text-osso-amber underline underline-offset-2 transition-colors">
    {children}
  </a>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-osso-black grain-overlay">

      {/* Header sticky */}
      <header className="sticky top-0 z-10 bg-osso-black/96 backdrop-blur-md"
        style={{ borderBottom: "1px solid hsl(40 85% 41% / 0.1)" }}>
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between max-w-3xl">
          <div className="flex items-center gap-3">
            <img src="/images/logo.webp" alt="Ossobuco" className="w-8 h-8 rounded-sm object-cover"
              width={32} height={32} loading="eager" />
            <span className="font-display text-osso-parchment/70 text-sm font-bold tracking-wide hidden sm:block">
              OSSOBUCO
            </span>
          </div>
          <Link to="/"
            className="text-osso-amber text-xs uppercase tracking-[0.2em] font-bold hover:text-osso-parchment transition-colors flex items-center gap-2">
            ← Torna al sito
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-3xl">

        <div className="mb-12">
          <p className="text-osso-amber/80 text-xs uppercase tracking-[0.3em] font-body mb-3">Documento legale</p>
          <h1 className="font-display font-black text-osso-parchment mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Privacy Policy
          </h1>
          <p className="text-osso-parchment/40 text-xs tracking-wider font-body">
            Ultimo aggiornamento: 21 aprile 2026
          </p>
        </div>

        <div className="text-osso-parchment/60 text-sm leading-relaxed font-body mb-10 p-5 rounded-sm"
          style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(40 85% 41% / 0.1)" }}>
          Ai sensi del Regolamento (UE) 2016/679 (GDPR) e del D.Lgs. 196/2003, come modificato dal D.Lgs. 101/2018,
          il Titolare del trattamento fornisce le seguenti informazioni sul trattamento dei dati personali degli utenti
          che visitano il sito <strong className="text-osso-parchment/80">ossobucorestaurant.it</strong>.
        </div>

        <Section title="1. Titolare del Trattamento">
          <p><strong className="text-osso-parchment/90">Ossobuco Steakhouse &amp; Restaurant</strong></p>
          <p>Viale Giuseppe Di Vittorio 31, 71042 Cerignola (FG) — Italia</p>
          <p>P.IVA: IT03828660716</p>
          <p>Telefono: <a href="tel:+393484351871" className="text-osso-amber/80 hover:text-osso-amber transition-colors">+39 348 435 1871</a> · <a href="tel:088532566" className="text-osso-amber/80 hover:text-osso-amber transition-colors">0885 325669</a></p>
          <p>Email per richieste privacy: <a href="mailto:privacy@ossobucorestaurant.it" className="text-osso-amber/80 hover:text-osso-amber transition-colors">privacy@ossobucorestaurant.it</a></p>
        </Section>

        <Section title="2. Tipologie di Dati Trattati">
          <p><strong className="text-osso-parchment/90">2.1 Dati di navigazione</strong></p>
          <p>
            I sistemi informatici preposti al funzionamento di questo sito acquisiscono, nel normale esercizio,
            alcuni dati personali la cui trasmissione è implicita nell'uso dei protocolli di Internet
            (indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orario di accesso).
            Questi dati sono utilizzati esclusivamente per ricavare informazioni statistiche anonime sull'uso del sito
            e per controllarne il corretto funzionamento.
          </p>
          <p><strong className="text-osso-parchment/90">2.2 Dati forniti volontariamente dall'utente</strong></p>
          <p>
            Tramite il pulsante WhatsApp presente sul sito, l'utente può avviare una comunicazione con il ristorante
            per effettuare prenotazioni o richiedere informazioni. I dati condivisi (nome, numero di telefono,
            contenuto del messaggio) sono trattati esclusivamente per rispondere alla richiesta.
          </p>
        </Section>

        <Section title="3. Finalità e Base Giuridica del Trattamento">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(40 85% 41% / 0.2)" }}>
                  <th className="text-left py-2 pr-4 text-osso-parchment/90 font-bold uppercase tracking-wider">Finalità</th>
                  <th className="text-left py-2 text-osso-parchment/90 font-bold uppercase tracking-wider">Base giuridica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Funzionamento del sito web", "Legittimo interesse (art. 6(1)(f) GDPR)"],
                  ["Risposta a prenotazioni via WhatsApp", "Esecuzione di misure precontrattuali (art. 6(1)(b) GDPR)"],
                  ["Visualizzazione mappa Google Maps", "Consenso dell'interessato (art. 6(1)(a) GDPR)"],
                  ["Statistiche di accesso anonime", "Legittimo interesse (art. 6(1)(f) GDPR)"],
                ].map(([f, b]) => (
                  <tr key={f}>
                    <td className="py-2.5 pr-4 align-top">{f}</td>
                    <td className="py-2.5 align-top text-osso-parchment/50">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="4. Cookie">
          <p>
            Per informazioni dettagliate sui cookie utilizzati dal sito, si rimanda alla{" "}
            <Link to="/cookie" className="text-osso-amber/80 hover:text-osso-amber underline underline-offset-2 transition-colors">
              Cookie Policy
            </Link>.
          </p>
        </Section>

        <Section title="5. Servizi di Terze Parti">
          <p>Il sito utilizza i seguenti servizi di terze parti che possono raccogliere dati personali:</p>
          <ul className="space-y-3 mt-3">
            {[
              {
                name: "Google Maps",
                desc: "Visualizzazione della mappa nella sezione Contatti. Dati elaborati da Google LLC.",
                href: "https://policies.google.com/privacy",
              },
              {
                name: "Google Fonts",
                desc: "Tipografia del sito (font Playfair Display e Inter). Dati elaborati da Google LLC.",
                href: "https://policies.google.com/privacy",
              },
              {
                name: "WhatsApp (Meta Platforms Ireland)",
                desc: "Servizio di messaggistica per prenotazioni e comunicazioni.",
                href: "https://www.whatsapp.com/legal/privacy-policy-eea",
              },
              {
                name: "Deliveroo",
                desc: "Piattaforma per ordini online.",
                href: "https://deliveroo.it/it/privacy",
              },
              {
                name: "Instagram (Meta Platforms Ireland)",
                desc: "Profilo social collegato dal footer del sito.",
                href: "https://privacycenter.instagram.com/policies/",
              },
              {
                name: "TikTok",
                desc: "Profilo social collegato dal footer del sito.",
                href: "https://www.tiktok.com/legal/privacy-policy",
              },
            ].map(({ name, desc, href }) => (
              <li key={name} className="flex gap-2">
                <span className="text-osso-amber/60 flex-shrink-0 mt-0.5">·</span>
                <span>
                  <strong className="text-osso-parchment/90">{name}</strong> — {desc}{" "}
                  <ExternalLink href={href}>Privacy Policy</ExternalLink>
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="6. Conservazione dei Dati">
          <p>
            I dati di navigazione vengono conservati per il tempo strettamente necessario alle finalità per cui
            sono stati raccolti, comunque non oltre <strong className="text-osso-parchment/90">12 mesi</strong>.
          </p>
          <p>
            I dati relativi a prenotazioni e comunicazioni vengono conservati per la durata del rapporto
            e per il periodo previsto dalla normativa fiscale vigente (10 anni).
          </p>
        </Section>

        <Section title="7. Trasferimento verso Paesi Terzi">
          <p>
            Alcuni servizi di terze parti (Google, Meta, TikTok) possono trasferire i dati personali
            verso Paesi al di fuori dell'Unione Europea. Tali trasferimenti avvengono nel rispetto
            delle garanzie previste dagli artt. 44–49 GDPR, in particolare mediante clausole contrattuali
            standard approvate dalla Commissione Europea.
          </p>
        </Section>

        <Section title="8. Diritti dell'Interessato">
          <p>Ai sensi degli artt. 15–22 GDPR, l'interessato ha diritto di:</p>
          <ul className="space-y-2 mt-3">
            {[
              ["Accesso (art. 15)", "Ottenere conferma del trattamento e copia dei propri dati"],
              ["Rettifica (art. 16)", "Correggere dati inesatti o incompleti"],
              ["Cancellazione (art. 17)", "Ottenere la cancellazione dei dati (\"diritto all'oblio\")"],
              ["Limitazione (art. 18)", "Limitare il trattamento in determinati casi previsti dalla legge"],
              ["Portabilità (art. 20)", "Ricevere i propri dati in formato strutturato e leggibile"],
              ["Opposizione (art. 21)", "Opporsi al trattamento basato sul legittimo interesse"],
            ].map(([right, desc]) => (
              <li key={right} className="flex gap-2">
                <span className="text-osso-amber/60 flex-shrink-0 mt-0.5">·</span>
                <span><strong className="text-osso-parchment/90">{right}</strong>: {desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Per esercitare i propri diritti, contattare il Titolare:
          </p>
          <p>
            📧 <a href="mailto:privacy@ossobucorestaurant.it" className="text-osso-amber/80 hover:text-osso-amber transition-colors underline underline-offset-2">privacy@ossobucorestaurant.it</a>
            {" "} · 💬 <a href="https://wa.me/393484351871" target="_blank" rel="noopener noreferrer" className="text-osso-amber/80 hover:text-osso-amber transition-colors underline underline-offset-2">WhatsApp +39 348 435 1871</a>
          </p>
          <p className="mt-2">Il Titolare risponderà entro <strong className="text-osso-parchment/90">30 giorni</strong> dalla ricezione della richiesta.</p>
        </Section>

        <Section title="9. Diritto di Reclamo">
          <p>
            L'interessato ha il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali:{" "}
            <ExternalLink href="https://www.garanteprivacy.it">www.garanteprivacy.it</ExternalLink>
            {" "}— Piazza Venezia 11, 00187 Roma.
          </p>
        </Section>

        <Section title="10. Modifiche alla Presente Informativa">
          <p>
            Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento,
            dando adeguata pubblicità agli utenti. Le modifiche saranno pubblicate su questa pagina
            con indicazione della data di aggiornamento.
          </p>
        </Section>

        {/* Back CTA */}
        <div className="mt-16 pt-8 text-center" style={{ borderTop: "1px solid hsl(40 85% 41% / 0.1)" }}>
          <Link to="/"
            className="inline-flex items-center gap-3 bg-osso-red text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-red-700 transition-colors duration-300 active:scale-[0.97]"
            style={{ boxShadow: "0 4px 25px hsl(0 100% 40% / 0.25)" }}>
            ← Torna al sito
          </Link>
        </div>
      </main>
    </div>
  );
}
