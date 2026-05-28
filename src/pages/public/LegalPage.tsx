import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { getLanguage } from '../../lib/language';
import { pickText } from '../../lib/localized';
import './landingPage.css';

interface LegalPageProps {
  type: 'imprint' | 'privacy';
}

export function LegalPage({ type }: LegalPageProps) {
  const { lang = 'fr' } = useParams();
  const isPrivacy = type === 'privacy';
  const language = getLanguage(lang);
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
        : language === 'de'
          ? [
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
          ]
          : language === 'en'
            ? [
                {
                  title: '1. Data controller',
                  paragraphs: [
                    'This page explains how Mehdi Cars processes personal data submitted through the website, the vehicle request and consultation booking.',
                    'Mehdi Cars is the data controller. For any privacy question, you can contact us using the details published on the website.',
                  ],
                },
                {
                  title: '2. Data collected',
                  paragraphs: [
                    'We may collect the information you voluntarily provide, such as name, phone number, email address, billing address, vehicle project details and appointment preferences.',
                    'Depending on your request, this may also include listing links, search criteria, your budget or any information useful for evaluating the project.',
                  ],
                },
                {
                  title: '3. Purpose of processing',
                  paragraphs: [
                    'Your data is used to answer your request, prepare a vehicle search, organize a consultation, contact you and manage the commercial and administrative follow-up.',
                    'If you agree in the form, we may contact you by email, phone or WhatsApp when this is useful for discussing your project.',
                  ],
                },
                {
                  title: '4. Service providers',
                  paragraphs: [
                    'Your data may be processed through technical services required to operate the service, such as hosting, email delivery, booking or business messaging tools.',
                    'We do not sell your data. It is only shared with providers needed to manage your request or deliver the service.',
                  ],
                },
                {
                  title: '5. Retention period',
                  paragraphs: [
                    'We keep your data for the time necessary to process your request, support customers and comply with legal or administrative obligations.',
                    'When longer retention is no longer necessary, the data is deleted or anonymized within a reasonable period.',
                  ],
                },
                {
                  title: '6. Your rights',
                  paragraphs: [
                    'You may request access, correction, deletion or restriction of processing of your personal data within the scope permitted by applicable law.',
                    'You may also withdraw your consent for non-essential contact channels, especially WhatsApp, at any time.',
                  ],
                },
              ]
            : [
                {
                  title: '1. Responsable',
                  paragraphs: [
                    'Esta página explica cómo Mehdi Cars trata los datos personales enviados a través del sitio web, la solicitud de vehículo y la reserva de consulta.',
                    'Mehdi Cars es el responsable del tratamiento. Para cualquier consulta sobre privacidad, puede contactarnos mediante los datos publicados en el sitio.',
                  ],
                },
                {
                  title: '2. Datos recogidos',
                  paragraphs: [
                    'Podemos recopilar la información que usted proporciona voluntariamente, como nombre, teléfono, correo electrónico, dirección de facturación, detalles del proyecto y preferencias de cita.',
                    'Según su solicitud, esto también puede incluir enlaces de anuncios, criterios de búsqueda, presupuesto u otra información útil para evaluar el proyecto.',
                  ],
                },
                {
                  title: '3. Finalidad del tratamiento',
                  paragraphs: [
                    'Sus datos se utilizan para responder a su solicitud, preparar una búsqueda de vehículo, organizar una consulta, contactarle y gestionar el seguimiento comercial y administrativo.',
                    'Si lo acepta en el formulario, podemos contactarle por correo electrónico, teléfono o WhatsApp cuando sea útil para hablar de su proyecto.',
                  ],
                },
                {
                  title: '4. Proveedores de servicio',
                  paragraphs: [
                    'Sus datos pueden tratarse mediante servicios técnicos necesarios para el funcionamiento del servicio, como alojamiento, envío de correos, reservas o mensajería profesional.',
                    'No vendemos sus datos. Solo se comparten con proveedores necesarios para gestionar su solicitud o prestar el servicio.',
                  ],
                },
                {
                  title: '5. Conservación',
                  paragraphs: [
                    'Conservamos sus datos durante el tiempo necesario para tratar su solicitud, atender al cliente y cumplir con obligaciones legales o administrativas.',
                    'Cuando ya no sea necesaria una conservación más larga, los datos se eliminarán o anonimizarán en un plazo razonable.',
                  ],
                },
                {
                  title: '6. Sus derechos',
                  paragraphs: [
                    'Puede solicitar acceso, rectificación, supresión o limitación del tratamiento de sus datos personales dentro de lo permitido por la legislación aplicable.',
                    'También puede retirar en cualquier momento su consentimiento para canales de contacto no esenciales, especialmente WhatsApp.',
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
          <span className="eyebrow">{isPrivacy ? pickText({ de: 'Datenschutz', en: 'Privacy', es: 'Privacidad', fr: 'Confidentialité' }, language) : 'Legal'}</span>
          <h1>{isPrivacy ? pickText({ de: 'Datenschutz', en: 'Data protection', es: 'Protección de datos', fr: 'Protection des données' }, language) : pickText({ de: 'Impressum', en: 'Imprint', es: 'Aviso legal', fr: 'Mentions légales' }, language)}</h1>
          <p>
            {isPrivacy
              ? pickText({
                  de: 'Informationen zur Verarbeitung Ihrer personenbezogenen Daten im Rahmen unserer Anfragen und Beratungstermine.',
                  en: 'Information about the processing of your personal data in connection with our requests and consultation appointments.',
                  es: 'Información sobre el tratamiento de sus datos personales en el marco de nuestras solicitudes y citas de consulta.',
                  fr: 'Informations sur le traitement de vos données personnelles dans le cadre de nos demandes et rendez-vous conseil.',
                }, language)
              : pickText({
                  de: 'Rechtliche Angaben zum Unternehmen.',
                  en: 'Legal information about the company.',
                  es: 'Información legal de la empresa.',
                  fr: 'Informations légales de l’entreprise.',
                }, language)}
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
                <h2>{pickText({ de: '7. Kontakt', en: '7. Contact', es: '7. Contacto', fr: '7. Contact' }, language)}</h2>
                <p>
                  {pickText({
                    de: 'Fuer Datenschutzanfragen koennen Sie uns per E-Mail kontaktieren oder das Kontaktformular auf der Website nutzen.',
                    en: 'For privacy requests, you can contact us by email or use the contact form on the website.',
                    es: 'Para solicitudes relacionadas con privacidad, puede contactarnos por correo electrónico o utilizar el formulario de contacto del sitio web.',
                    fr: 'Pour toute demande relative à vos données, vous pouvez nous écrire par e-mail ou utiliser le formulaire de contact du site.',
                  }, language)}
                </p>
              </article>
            </>
          ) : (
            <article className="legal-block">
              <h2>{pickText({ de: 'Rechtliche Angaben', en: 'Legal information', es: 'Información legal', fr: 'Informations légales' }, language)}</h2>
              <p>
                {pickText({
                  de: 'Die vollstaendigen rechtlichen Unternehmensangaben sollten vor dem Livegang noch mit den offiziellen Firmendaten ergaenzt werden.',
                  en: 'The detailed legal company information should be completed with the official company data before production.',
                  es: 'La información legal detallada debe completarse con los datos oficiales de la empresa antes de producción.',
                  fr: 'Les informations légales détaillées doivent être complétées avec les données officielles de l’entreprise avant la mise en production.',
                }, language)}
              </p>
            </article>
          )}

          <div className="legal-actions">
            <Link className="legal-back-link" to={homePath}>
              {pickText({ de: 'Zur Startseite', en: 'Back to home', es: 'Volver al inicio', fr: "Retour à l'accueil" }, language)}
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
