import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import './landingPage.css';

interface LegalPageProps {
  type: 'imprint' | 'privacy';
}

export function LegalPage({ type }: LegalPageProps) {
  const { lang = 'fr' } = useParams();
  const isPrivacy = type === 'privacy';
  const language = lang === 'de' ? 'de' : 'fr';
  const homePath = `/${language}`;

  const privacySections = useMemo(
    () =>
      language === 'fr'
        ? [
            {
              title: '1. Responsable',
              paragraphs: [
                'Cette page explique comment Mehdi Cars traite les données personnelles transmises via le site, la demande véhicule et la prise de rendez-vous conseil.',
                'Le responsable du traitement est Mehdi Cars. Pour toute question relative à la confidentialité, vous pouvez nous contacter via les coordonnées communiquées sur le site.',
              ],
            },
            {
              title: '2. Données collectées',
              paragraphs: [
                'Nous pouvons collecter les informations que vous saisissez volontairement: nom, prénom, numéro de téléphone, adresse e-mail, adresse de facturation, informations sur votre projet véhicule, préférence de rendez-vous et tout message complémentaire.',
                'Selon votre demande, ces informations peuvent aussi contenir un lien d’annonce, des critères de recherche, votre budget ou des éléments utiles à l’évaluation du projet.',
              ],
            },
            {
              title: '3. Finalités du traitement',
              paragraphs: [
                'Vos données sont utilisées pour répondre à votre demande, préparer une recherche véhicule, organiser un rendez-vous conseil, vous recontacter et assurer le suivi commercial et administratif du dossier.',
                'Si vous l’acceptez dans le formulaire, nous pouvons vous contacter par e-mail, téléphone ou WhatsApp lorsque ce canal est utile pour échanger rapidement au sujet de votre projet.',
              ],
            },
            {
              title: '4. Communication et prestataires',
              paragraphs: [
                'Vos données peuvent être traitées via des outils techniques nécessaires au fonctionnement du service, par exemple l’hébergement, l’envoi d’e-mails, la prise de rendez-vous ou la messagerie professionnelle.',
                'Nous ne vendons pas vos données. Elles ne sont partagées qu’avec les prestataires utiles à la gestion de votre demande ou lorsque cela est nécessaire pour l’exécution du service.',
              ],
            },
            {
              title: '5. Durée de conservation',
              paragraphs: [
                'Nous conservons vos données pendant la durée nécessaire au traitement de votre demande, au suivi client et au respect de nos obligations administratives ou légales.',
                'Lorsqu’une conservation plus longue n’est plus nécessaire, les données sont supprimées ou anonymisées dans un délai raisonnable.',
              ],
            },
            {
              title: '6. Vos droits',
              paragraphs: [
                'Vous pouvez demander l’accès à vos données, leur rectification, leur suppression ou la limitation de leur traitement, dans la mesure prévue par le droit applicable.',
                'Vous pouvez également retirer à tout moment votre accord pour les prises de contact non strictement nécessaires, notamment via WhatsApp.',
              ],
            },
          ]
        : [
            {
              title: '1. Verantwortliche Stelle',
              paragraphs: [
                'Diese Seite erläutert, wie Mehdi Cars personenbezogene Daten verarbeitet, die ueber die Website, die Fahrzeuganfrage und die Beratungsbuchung uebermittelt werden.',
                'Verantwortliche Stelle ist Mehdi Cars. Bei Fragen zum Datenschutz koennen Sie uns ueber die auf der Website genannten Kontaktdaten erreichen.',
              ],
            },
            {
              title: '2. Erhobene Daten',
              paragraphs: [
                'Wir verarbeiten die Daten, die Sie uns freiwillig mitteilen, zum Beispiel Name, Telefonnummer, E-Mail-Adresse, Rechnungsadresse, Angaben zu Ihrem Fahrzeugprojekt, Terminwuensche und sonstige Nachrichten.',
                'Je nach Anfrage koennen dazu auch Inseratslinks, Suchkriterien, Budgetangaben oder weitere Informationen gehoeren, die fuer die Bearbeitung Ihres Projekts hilfreich sind.',
              ],
            },
            {
              title: '3. Zweck der Verarbeitung',
              paragraphs: [
                'Ihre Daten werden verwendet, um Ihre Anfrage zu bearbeiten, eine Fahrzeugsuche vorzubereiten, einen Beratungstermin zu organisieren, Sie zu kontaktieren und den kaufmaennischen sowie administrativen Ablauf zu begleiten.',
                'Wenn Sie im Formular zustimmen, duerfen wir Sie per E-Mail, Telefon oder WhatsApp kontaktieren, sofern dieser Kommunikationsweg fuer die schnelle Abstimmung zu Ihrem Projekt sinnvoll ist.',
              ],
            },
            {
              title: '4. Weitergabe und Dienstleister',
              paragraphs: [
                'Ihre Daten koennen ueber technische Dienstleister verarbeitet werden, die fuer Hosting, E-Mail-Versand, Terminbuchung oder geschäftliche Kommunikation erforderlich sind.',
                'Wir verkaufen Ihre Daten nicht. Eine Weitergabe erfolgt nur an beteiligte Dienstleister oder Partner, soweit dies fuer die Bearbeitung Ihrer Anfrage oder die Erbringung des Services notwendig ist.',
              ],
            },
            {
              title: '5. Speicherdauer',
              paragraphs: [
                'Wir speichern Ihre Daten nur so lange, wie es fuer die Bearbeitung Ihrer Anfrage, die Kundenbetreuung sowie fuer gesetzliche oder administrative Pflichten erforderlich ist.',
                'Sobald eine weitere Aufbewahrung nicht mehr notwendig ist, werden die Daten innerhalb eines angemessenen Zeitraums geloescht oder anonymisiert.',
              ],
            },
            {
              title: '6. Ihre Rechte',
              paragraphs: [
                'Sie koennen im Rahmen der geltenden gesetzlichen Bestimmungen Auskunft, Berichtigung, Loeschung oder Einschraenkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.',
                'Eine erteilte Einwilligung fuer nicht zwingend notwendige Kontaktwege, insbesondere ueber WhatsApp, koennen Sie jederzeit mit Wirkung fuer die Zukunft widerrufen.',
              ],
            },
          ],
    [language],
  );

  return (
    <main className="landing-page legal-page">
      <LandingTopBar />

      <section className="legal-hero">
        <div className="section-inner legal-hero__inner">
          <span className="eyebrow">{isPrivacy ? (language === 'fr' ? 'Confidentialité' : 'Datenschutz') : 'Legal'}</span>
          <h1>{isPrivacy ? (language === 'fr' ? 'Protection des données' : 'Datenschutz') : 'Impressum'}</h1>
          <p>
            {isPrivacy
              ? language === 'fr'
                ? 'Informations sur le traitement de vos données personnelles dans le cadre de nos demandes et rendez-vous conseil.'
                : 'Informationen zur Verarbeitung Ihrer personenbezogenen Daten im Rahmen unserer Anfragen und Beratungstermine.'
              : language === 'fr'
                ? 'Informations légales de l’entreprise.'
                : 'Rechtliche Angaben zum Unternehmen.'}
          </p>
        </div>
      </section>

      <section className="content-section legal-content-section">
        <div className="section-inner legal-card">
          {isPrivacy ? (
            <>
              {privacySections.map((section) => (
                <article className="legal-block" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}

              <article className="legal-block">
                <h2>{language === 'fr' ? '7. Contact' : '7. Kontakt'}</h2>
                <p>
                  {language === 'fr'
                    ? 'Pour toute demande relative à vos données, vous pouvez nous écrire par e-mail ou utiliser le formulaire de contact du site.'
                    : 'Fuer Datenschutzanfragen koennen Sie uns per E-Mail kontaktieren oder das Kontaktformular auf der Website nutzen.'}
                </p>
              </article>
            </>
          ) : (
            <article className="legal-block">
              <h2>{language === 'fr' ? 'Informations légales' : 'Rechtliche Angaben'}</h2>
              <p>
                {language === 'fr'
                  ? 'Les informations légales détaillées doivent être complétées avec les données officielles de l’entreprise avant la mise en production.'
                  : 'Die vollstaendigen rechtlichen Unternehmensangaben sollten vor dem Livegang noch mit den offiziellen Firmendaten ergaenzt werden.'}
              </p>
            </article>
          )}

          <div className="legal-actions">
            <Link className="legal-back-link" to={homePath}>
              {language === 'fr' ? "Retour à l'accueil" : 'Zur Startseite'}
            </Link>
          </div>
        </div>
      </section>

      <footer className="funnel-footer">
        <div className="section-inner funnel-footer__inner">
          <SocialLinks />
        </div>
      </footer>
    </main>
  );
}
