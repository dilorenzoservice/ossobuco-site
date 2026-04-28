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

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <p className="text-osso-parchment/40 text-xs tracking-wider font-body">
            Ultimo aggiornamento: 21 aprile 2026
          </p>
        </div>

        <div className="text-osso-parchment/60 text-sm leading-relaxed font-body mb-10 p-5 rounded-sm"
          style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(40 85% 41% / 0.1)" }}>
          La presente Cookie Policy, ai sensi dell'art. 122 del D.Lgs. 196/2003 e delle Linee guida del Garante
          per la protezione dei dati personali, informa l'utente sull'utilizzo dei cookie e tecnologie similari
          sul sito <strong className="text-osso-parchment/80">ossobucorestaurant.it</strong>.
          Per informazioni sul trattamento dei dati personali, si rinvia alla{" "}
          <Link to="/privacy" className="text-osso-amber/80 hover:text-osso-amber underline underline-offset-2 transition-colors">
            Privacy Policy
          </Link>.
        </div>

        <Section title="1. Cosa Sono i Cookie">
          <p>
            I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al terminale
            (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi
            siti alla visita successiva. I cookie permettono a un sito web di riconoscere il dispositivo
            dell'utente e di ricordarne le preferenze.
          </p>
          <p>
            Oltre ai cookie in senso stretto, questo documento copre anche tecnologie analoghe come il
            <strong className="text-osso-parchment/90"> localStorage</strong> e il{" "}
            <strong className="text-osso-parchment/90">sessionStorage</strong>, che memorizzano dati
            localmente nel browser senza inviarli al server.
          </p>
        </Section>

        <Section title="2. Cookie Tecnici (Strettamente Necessari)">
          <p>
            I cookie tecnici sono essenziali per il corretto funzionamento del sito e non richiedono
            il consenso dell'utente ai sensi dell'art. 122, comma 1, D.Lgs. 196/2003.
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(40 85% 41% / 0.2)" }}>
                  <th className="text-left py-2 pr-4 text-osso-parchment/90 font-bold uppercase tracking-wider">Nome / Chiave</th>
                  <th className="text-left py-2 pr-4 text-osso-parchment/90 font-bold uppercase tracking-wider">Tipo</th>
                  <th className="text-left py-2 text-osso-parchment/90 font-bold uppercase tracking-wider">Finalità</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["ossobuco_lang", "localStorage", "Memorizza la preferenza linguistica dell'utente (IT/EN) per mantenere la lingua scelta tra una visita e l'altra"],
                  ["ossobuco_cookie_consent", "localStorage", "Registra la scelta dell'utente riguardo al consenso cookie (\"accepted\" o \"minimal\") per non mostrare il banner a ogni visita"],
                  ["ossobuco_intro_seen", "sessionStorage", "Indica se l'animazione introduttiva è già stata mostrata durante la sessione corrente"],
                ].map(([name, type, desc]) => (
                  <tr key={name}>
                    <td className="py-2.5 pr-4 align-top font-mono text-osso-amber/70">{name}</td>
                    <td className="py-2.5 pr-4 align-top text-osso-parchment/50 whitespace-nowrap">{type}</td>
                    <td className="py-2.5 align-top text-osso-parchment/60">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-osso-parchment/50 text-xs">
            Questi dati rimangono esclusivamente nel browser dell'utente e non vengono mai trasmessi a server
            di terze parti. La loro eliminazione non compromette la navigabilità del sito.
          </p>
        </Section>

        <Section title="3. Cookie di Terze Parti">
          <p>
            Il sito integra servizi di terze parti che possono installare cookie propri sul terminale
            dell'utente. Tali cookie sono soggetti alla normativa e alle privacy policy dei rispettivi titolari,
            sui quali ossobucorestaurant.it non ha controllo diretto.
          </p>

          <div className="mt-4 space-y-5">

            <div className="p-4 rounded-sm" style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(40 85% 41% / 0.08)" }}>
              <p className="font-bold text-osso-parchment/90 mb-1">Google Maps</p>
              <p className="text-osso-parchment/55 text-xs mb-2">
                Utilizzato nella sezione Contatti per visualizzare la mappa interattiva del ristorante.
                Quando l'utente interagisce con la mappa, Google può installare cookie di profilazione
                e raccogliere dati come posizione, indirizzo IP e comportamento di navigazione.
              </p>
              <p className="text-osso-parchment/40 text-xs">
                Base giuridica: consenso (art. 6(1)(a) GDPR) ·{" "}
                <ExternalLink href="https://policies.google.com/privacy">Privacy Policy Google</ExternalLink>{" "}·{" "}
                <ExternalLink href="https://tools.google.com/dlpage/gaoptout">Opt-out Google</ExternalLink>
              </p>
            </div>

            <div className="p-4 rounded-sm" style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(40 85% 41% / 0.08)" }}>
              <p className="font-bold text-osso-parchment/90 mb-1">Google Fonts</p>
              <p className="text-osso-parchment/55 text-xs mb-2">
                Il sito carica i font <em>Playfair Display</em> e <em>Inter</em> dai server di Google Fonts.
                Il browser dell'utente contatta i server di Google per scaricare i file font, trasmettendo
                l'indirizzo IP. Google dichiara di non utilizzare questi dati per scopi di profilazione.
              </p>
              <p className="text-osso-parchment/40 text-xs">
                Base giuridica: legittimo interesse (art. 6(1)(f) GDPR) ·{" "}
                <ExternalLink href="https://developers.google.com/fonts/faq/privacy">FAQ Privacy Google Fonts</ExternalLink>
              </p>
            </div>

            <div className="p-4 rounded-sm" style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(40 85% 41% / 0.08)" }}>
              <p className="font-bold text-osso-parchment/90 mb-1">WhatsApp (Meta Platforms Ireland)</p>
              <p className="text-osso-parchment/55 text-xs mb-2">
                Il pulsante di prenotazione via WhatsApp reindirizza all'applicazione WhatsApp o al sito
                web di WhatsApp. La navigazione sul sito di Meta è soggetta alle loro politiche sui cookie.
              </p>
              <p className="text-osso-parchment/40 text-xs">
                <ExternalLink href="https://www.whatsapp.com/legal/privacy-policy-eea">Privacy Policy WhatsApp</ExternalLink>
              </p>
            </div>

            <div className="p-4 rounded-sm" style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(40 85% 41% / 0.08)" }}>
              <p className="font-bold text-osso-parchment/90 mb-1">Instagram / TikTok</p>
              <p className="text-osso-parchment/55 text-xs mb-2">
                I link ai profili social nel footer reindirizzano a piattaforme esterne. I cookie di
                Instagram (Meta) e TikTok vengono installati solo se l'utente clicca sul link
                e naviga sui rispettivi siti.
              </p>
              <p className="text-osso-parchment/40 text-xs">
                <ExternalLink href="https://privacycenter.instagram.com/policies/">Privacy Instagram</ExternalLink>{" "}·{" "}
                <ExternalLink href="https://www.tiktok.com/legal/privacy-policy">Privacy TikTok</ExternalLink>
              </p>
            </div>

          </div>
        </Section>

        <Section title="4. Cookie di Analisi">
          <p>
            Il sito <strong className="text-osso-parchment/90">non utilizza</strong> cookie di analisi
            (es. Google Analytics) né cookie di profilazione/remarketing propri. I dati di navigazione
            acquisiti dal server web (indirizzi IP, pagine visitate) sono usati esclusivamente per
            statistiche anonime e sicurezza, come descritto nella{" "}
            <Link to="/privacy" className="text-osso-amber/80 hover:text-osso-amber underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </Section>

        <Section title="5. Durata dei Cookie">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(40 85% 41% / 0.2)" }}>
                  <th className="text-left py-2 pr-4 text-osso-parchment/90 font-bold uppercase tracking-wider">Tipo</th>
                  <th className="text-left py-2 text-osso-parchment/90 font-bold uppercase tracking-wider">Durata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Cookie di sessione", "Eliminati alla chiusura del browser"],
                  ["localStorage (preferenze)", "Persistenti fino a cancellazione manuale da parte dell'utente"],
                  ["Cookie Google Maps", "Fino a 2 anni (secondo le policy di Google)"],
                  ["Cookie Google Fonts", "Nessun cookie installato — solo richiesta HTTP (IP log ~30 giorni)"],
                ].map(([type, dur]) => (
                  <tr key={type}>
                    <td className="py-2.5 pr-4 align-top">{type}</td>
                    <td className="py-2.5 align-top text-osso-parchment/50">{dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="6. Come Gestire i Cookie">
          <p>
            L'utente può controllare e/o eliminare i cookie e i dati del localStorage in qualsiasi momento
            tramite le impostazioni del proprio browser. Di seguito le istruzioni per i principali browser:
          </p>
          <ul className="space-y-3 mt-3">
            {[
              { name: "Google Chrome", href: "https://support.google.com/chrome/answer/95647" },
              { name: "Mozilla Firefox", href: "https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" },
              { name: "Apple Safari", href: "https://support.apple.com/it-it/guide/safari/sfri11471/mac" },
              { name: "Microsoft Edge", href: "https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
              { name: "Opera", href: "https://help.opera.com/en/latest/web-preferences/#cookies" },
            ].map(({ name, href }) => (
              <li key={name} className="flex gap-2">
                <span className="text-osso-amber/60 flex-shrink-0 mt-0.5">·</span>
                <span>
                  <ExternalLink href={href}>{name} — Gestione cookie</ExternalLink>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-osso-parchment/50 text-xs">
            Si avvisa che la disabilitazione totale dei cookie potrebbe compromettere alcune funzionalità
            del sito (es. mantenimento della preferenza linguistica). I cookie tecnici necessari al
            funzionamento del sito non possono essere disabilitati tramite il banner del sito.
          </p>
        </Section>

        <Section title="7. Revoca del Consenso">
          <p>
            L'utente può revocare in qualsiasi momento il consenso prestato per i cookie non necessari
            (es. Google Maps) cancellando i dati del browser o cliccando nuovamente sul banner cookie
            (cancellare la chiave <code className="text-osso-amber/70 text-xs bg-white/5 px-1.5 py-0.5 rounded">ossobuco_cookie_consent</code> dal localStorage del browser).
          </p>
          <p>
            Per revocare il consenso tramite strumenti di opt-out specifici per servizio, si faccia
            riferimento ai link riportati nella sezione 3.
          </p>
        </Section>

        <Section title="8. Modifiche alla Presente Policy">
          <p>
            Il Titolare si riserva il diritto di modificare la presente Cookie Policy in qualsiasi momento.
            Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
            In caso di modifiche sostanziali ai cookie utilizzati, verrà nuovamente richiesto il consenso
            dell'utente ove necessario.
          </p>
          <p>
            Per ulteriori informazioni:{" "}
            <a href="mailto:privacy@ossobucorestaurant.it"
              className="text-osso-amber/80 hover:text-osso-amber transition-colors underline underline-offset-2">
              privacy@ossobucorestaurant.it
            </a>
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
