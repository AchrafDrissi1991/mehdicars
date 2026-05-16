import { useState, useEffect, useRef } from "react";
import "./ProcessSteps.css";

const steps = [
  {
    id: 1,
    icon: "🔍",
    label: "ÉTAPE 01",
    title: "Recherche du véhicule",
    text: "Trouvez le véhicule sur mobile.de ou AutoScout24 et envoyez-nous le lien. Nous prenons en charge la suite.",
  },
  {
    id: 2,
    icon: "📞",
    label: "ÉTAPE 02",
    title: "Contact vendeur & vérification",
    text: "Le vendeur est contacté et les points clés vérifiés : historique des accidents, entretien, kilométrage et état technique.",
  },
  {
    id: 3,
    icon: "👁️",
    label: "ÉTAPE 03",
    title: "Inspection sur place",
    text: "Inspection complète sur place : carrosserie, moteur, intérieur, pneus et freins. Vous recevez photos, vidéos et rapport honnête.",
  },
  {
    id: 4,
    icon: "✅",
    label: "ÉTAPE 04",
    title: "Finalisation de l'achat",
    text: "Tous les documents sont préparés : contrat, réservation et coordination complète jusqu'au retrait du véhicule.",
  },
];

export default function ProcessSteps() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

  // Intersection Observer — Section ins Viewport → Animation starten
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-Rotation
  useEffect(() => {
    if (!autoPlay) return;
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [autoPlay]);

  const handleClick = (index) => {
    setActive(index);
    setAutoPlay(false);
    clearInterval(autoRef.current);
  };

  return (
    <section className="ps-section" ref={sectionRef}>
      {/* Header */}
      <div className={`ps-header ${visible ? "ps-visible" : ""}`}>
        <div className="ps-tag">— Détails du service</div>
        <h2 className="ps-title">Comment fonctionne le service</h2>
        <p className="ps-sub">
          4 étapes simples, de la recherche à la remise des clés.
        </p>
      </div>

      {/* Stepper */}
      <div className="ps-stepper">
        {steps.map((step, index) => {
          const isActive = active === index;
          const isDone = index < active;
          return (
            <div
              key={step.id}
              className={`ps-step ${isActive ? "ps-step--active" : ""} ${isDone ? "ps-step--done" : ""} ${visible ? "ps-step--in" : ""}`}
              style={{ transitionDelay: `${index * 0.12}s` }}
              onClick={() => handleClick(index)}
            >
              {/* Left: icon + vertical line */}
              <div className="ps-step__left">
                <div className="ps-step__dot">
                  <span className="ps-step__icon">{step.icon}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="ps-step__line">
                    <div
                      className={`ps-step__line-fill ${isDone || isActive ? "ps-step__line-fill--active" : ""}`}
                    />
                  </div>
                )}
              </div>

              {/* Right: content */}
              <div className="ps-step__right">
                <div className="ps-step__label">{step.label}</div>
                <div className="ps-step__title">{step.title}</div>
                <div className={`ps-step__text ${isActive ? "ps-step__text--open" : ""}`}>
                  {step.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
