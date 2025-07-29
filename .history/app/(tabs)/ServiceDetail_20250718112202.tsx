import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-native";

import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/src/components/cart/CartContext";

// Icônes → à remplacer par react-native-vector-icons ou expo/vector-icons

// Custom components à réécrire :
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import ProductDescription from "@/src/components/services/ProductDescription";
import RelatedProducts from "@/src/components/services/RelatedProducts";
import ReviewForm from "@/src/components/services/ReviewForm";
import ReviewsList from "@/src/components/services/ReviewsList";
import { ReservationPrices, ServiceData } from "@/src/types/database";
import { useRoute } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import Toast from "react-native-toast-message";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Date picker (tu devras utiliser @react-native-community/datetimepicker)

// Toast (exemple : react-native-toast-message)

const serviceData: Record<string, ServiceData> = {
  "reexpedition-courrier": {
    title: "Réexpédition courrier (3 mois)",
    price: "30,00",
    description:
      "Notre service de réexpédition de courrier sur 3 mois vous offre une solution pratique pour recevoir votre courrier où que vous soyez. Nous réexpédions votre courrier chaque mardi pendant un trimestre, assurant ainsi une gestion efficace de votre correspondance. Le coût de ce service est de 10 euros par mois, avec des frais supplémentaires pour les timbres utilisés lors de la réexpédition. Avec notre service, vous pouvez avoir l’assurance que votre courrier vous parviendra de manière fiable et sécurisée pendant toute la durée de votre absence.",
  },
  "scan-courrier": {
    title: "Scan de courrier (3 mois)",
    price: "18,00",
    description:
      "Notre service de scan de courrier sur 3 mois est conçu pour vous offrir une solution pratique et efficace pour la gestion de votre correspondance, même lorsque vous n’avez pas le temps de vous en occuper ou que vous ne souhaitez pas opter pour la réexpédition de courrier. Avec ce service, dès réception de votre courrier, notre équipe se charge de le scanner et de vous envoyer une copie numérique par voie électronique. Vous n’aurez plus à vous soucier de trier et de gérer votre courrier physiquement. Vous pouvez accéder à vos documents où que vous soyez, à tout moment, simplement en quelques clics. Le règlement de ce service se fait au trimestre, vous offrant ainsi une flexibilité maximale dans la gestion de vos paiements. Vous pouvez profiter de la tranquillité d’esprit en sachant que votre courrier est pris en charge de manière professionnelle et sécurisée.",
  },
  "reception-colis": {
    title: "Réception colis (3 mois)",
    price: "18,00",
    description:
      "Notre service de réception de colis pour une période de 3 mois est conçu pour répondre à vos besoins de réception de petits colis de manière pratique et sécurisée. Que vous soyez un particulier ou une entreprise, notre service vous permet de faire livrer vos petits colis à notre adresse pendant une période de 3 mois. Nous recevons vos colis en votre nom et les conservons en toute sécurité jusqu’à ce que vous veniez les récupérer. Ce service est idéal pour ceux qui ont besoin d’une adresse de livraison temporaire pour recevoir des colis pendant une courte période, que ce soit pour des raisons professionnelles ou personnelles. Profitez dès maintenant de notre service de réception de colis pour une durée de 3 mois et bénéficiez de la tranquillité d’esprit en sachant que vos colis sont entre de bonnes mains.",
  },
  "location-bureau": {
    title: "Location de bureau",
    price: "5,00",
    priceUnit: "/heure",
    description:
      "Espaces de coworking modernes et confortables, équipés de toutes les commodités nécessaires. Location flexible à l'heure, à la demi-journée ou à la journée complète.",
  },
  "coworking-space": {
    title: "Espace de coworking",
    price: "5,00",
    priceUnit: "/heure",
    description:
      "Espace de coworking pour 8 personnes avec Wi-Fi et espace calme. Réservation flexible à l’heure.",
  },
  "formation-room": {
    title: "Salle de formation",
    price: "10,00",
    priceUnit: "/heure",
    description:
      "Salle pour 10 personnes. Tarifs : 10€/h, 25€/demi-journée, 45€/journée. Matériel pédagogique disponible.",
  },
  "domiciliation-1an-entreprise": {
    title: "Domiciliation 1 an – Entreprise",
    price: "361,80",
    originalPrice: "432,00",
    isPromo: true,
    description:
      "Profitez de notre offre spéciale de domiciliation pour une réservation d’un an et économisez sur vos frais pendant toute la durée de votre engagement! En réservant notre service de domiciliation pour une période d’un an, vous bénéficiez d’une réduction exceptionnelle : 50% de réduction sur les frais des 3 premiers mois. 5% de réduction sur les frais des 9 mois suivants. Cette offre exclusive vous permet d’économiser dès le début de votre engagement, avec une réduction significative sur les 3 premiers mois. En plus, vous continuez à bénéficier d’une réduction supplémentaire de 5% sur les frais pour les 9 mois restants, ce qui représente une économie sur toute l’année. Profitez dès maintenant de cette offre spéciale et donnez à votre entreprise une adresse prestigieuse tout en réalisant des économies sur vos frais de domiciliation.",
  },
  "domiciliation-3mois-entreprise": {
    title: "Domiciliation 3 mois – Entreprise",
    price: "108,00",
    description:
      "Notre service de domiciliation pour société est spécialement conçu pour répondre aux besoins des entreprises de différents types juridiques, y compris les SARL, SAS, EURL et SASU, leur offrant une adresse professionnelle prestigieuse pendant une période de 3 mois. Avec notre service, votre société bénéficie des avantages suivants pendant 3 mois : Une adresse commerciale de qualité pour votre société, vous permettant de présenter une image professionnelle à vos clients, partenaires et autorités. La réception et la gestion de votre courrier pendant la période de domiciliation, assurant que vous ne manquiez aucune communication importante pour votre entreprise. Que vous soyez une petite entreprise en démarrage ou une entreprise établie, notre service de domiciliation vous offre la flexibilité et la commodité nécessaires pour gérer efficacement vos opérations commerciales. Profitez dès maintenant de notre service de domiciliation pour société sur une période de 3 mois et donnez à votre entreprise une adresse professionnelle tout en bénéficiant d’une gestion pratique de votre courrier.",
  },
  "domiciliation-3mois-micro": {
    title: "Domiciliation 3 mois – Micro Entreprise",
    price: "72,00",
    description:
      "Notre service de domiciliation pour micro-entreprise pendant 3 mois est conçu pour répondre aux besoins spécifiques des entrepreneurs individuels et des petites entreprises qui recherchent une adresse professionnelle pour leur activité. Avec notre service, vous bénéficiez d’une adresse prestigieuse pour votre micro-entreprise pendant une période de 3 mois. Cette adresse peut être utilisée sur vos documents officiels, vos cartes de visite et votre correspondance professionnelle, vous permettant de présenter une image professionnelle à vos clients et partenaires. En plus de l’adresse commerciale, notre service comprend la réception et la gestion de votre courrier pendant la période de domiciliation. Nous recevons votre courrier en votre nom et pouvons vous le transférer selon vos instructions. Profitez dès maintenant de notre service de domiciliation pour micro-entreprise pendant 3 mois et donnez à votre activité une image professionnelle et crédible sans les coûts et les engagements à long terme.",
  },
  "domiciliation-6mois-entreprise": {
    title: "Domiciliation 6 mois – Entreprise",
    price: "162,00",
    originalPrice: "216,00",
    isPromo: true,
    description:
      "Profitez de notre offre exclusive de domiciliation d’entreprise avec une promotion spéciale sur les premiers 6 mois! Nous vous offrons une réduction exceptionnelle sur les frais de domiciliation jusqu’au 30 Septembre, vous permettant de bénéficier d’un avantage financier significatif tout en profitant de nos services de qualité. Avec cette promotion, vous bénéficierez d’une réduction de 50% sur les 3 premiers mois de domiciliation lorsque vous vous engagez pour une période de 6 mois. C’est une opportunité unique pour vous d’économiser sur les frais de domiciliation tout en bénéficiant d’une adresse professionnelle prestigieuse pour votre entreprise. Profitez dès maintenant de cette offre spéciale et donnez à votre entreprise une image professionnelle et crédible avec notre service de domiciliation de qualité supérieure.",
  },
  "domiciliation-6mois-micro": {
    title: "Domiciliation 6 mois – Micro Entreprise",
    price: "108,00",
    originalPrice: "144,00",
    isPromo: true,
    description:
      "Profitez de notre offre spéciale de domiciliation pour micro-entreprise sur une période de 6 mois, avec des avantages financiers exceptionnels pour vous aider à démarrer votre activité en toute tranquillité d’esprit. Avec notre service, vous bénéficiez de : 3 mois de domiciliation pour votre micro-entreprise, avec une adresse professionnelle prestigieuse pour vos activités commerciales. Les 3 mois suivants à moins 50%, vous permettant de bénéficier d’une réduction significative sur les frais de domiciliation. Cette offre exclusive vous offre non seulement une adresse commerciale professionnelle pour votre entreprise, mais vous permet également de réaliser des économies substantielles sur les frais de domiciliation pour les 6 premiers mois. Profitez dès maintenant de notre service de domiciliation pour micro-entreprise sur une période de 6 mois et donnez à votre entreprise une image professionnelle sans compromettre votre budget.",
  },
  "pack-domine": {
    title: "Pack domicilié",
    price: "1514,00",
    description:
      "Pack complet incluant un site internet sur mesure, 100 cartes de visite professionnelles, création de pages Instagram et LinkedIn, et 3 mois de domiciliation gratuite.",
  },
  "vtc-creation": {
    title: "Accompagnement création VTC – Driel",
    price: "900,00",
    note: "*hors coûts organismes",
    description:
      "Notre service d’accompagnement pour l’ouverture de votre société VTC est spécialement conçu pour simplifier le processus de création et de lancement de votre entreprise de transport avec chauffeur. En partenariat avec notre expert-comptable spécialisé dans le domaine, nous vous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une démarche efficace et conforme à toutes les exigences réglementaires. Nous comprenons que le démarrage d’une entreprise VTC peut être complexe, avec de nombreuses démarches administratives et juridiques à suivre. C’est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis l’enregistrement de votre société jusqu’à l’obtention des licences et des permis nécessaires. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de lancer votre entreprise avec confiance et succès. De plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s’applique en plus des frais de service hors frais d’organisme, ce qui vous permet de bénéficier d’un accompagnement professionnel à un tarif avantageux.",
  },
  "bank-account": {
    title: "Accompagnement ouverture de compte bancaire en ligne",
    price: "150,00",
    description:
      "L’ouverture d’un compte bancaire peut souvent s’avérer complexe et chronophage, surtout lorsqu’il s’agit de répondre aux nombreuses exigences réglementaires. C’est là que notre service d’Accompagnement à l’Ouverture de Compte entre en jeu. Nous offrons un soutien complet pour vous aider à naviguer à travers le processus d’ouverture de compte, en rendant l’expérience aussi fluide et rapide que possible. Nos services incluent : Consultation Initiale : Une évaluation de vos besoins spécifiques pour déterminer le type de compte et l’institution financière la plus adaptée à votre situation. Préparation des Documents : Assistance dans la compilation et la vérification de tous les documents et informations nécessaires pour répondre aux critères d’éligibilité de la banque. Représentation : Si nécessaire, nous pouvons agir en votre nom pour communiquer avec les banques, vous permettant de vous concentrer sur votre activité principale. Suivi Post-Ouverture : Après l’ouverture de votre compte, nous restons à votre disposition pour toute question ou besoin supplémentaire. Que vous lanciez une startup, gériez une entreprise établie cherchant à optimiser ses opérations bancaires, ou soyez un particulier en quête d’une solution bancaire adaptée, notre service d’Accompagnement à l’Ouverture de Compte est la solution idéale pour vous garantir une transition bancaire sans stress et efficace.",
  },
  "company-creation": {
    title: "Accompagnement ouverture de votre société",
    price: "600,00",
    description:
      "Notre service d’accompagnement à l’ouverture de société est conçu pour vous fournir une assistance professionnelle et complète tout au long du processus de création de votre entreprise. En partenariat avec notre expert-comptable qualifié, nous vous guidons à travers les démarches administratives, fiscales et juridiques nécessaires pour établir votre société avec succès. Les caractéristiques de notre service comprennent : Consultation initiale : Nous commençons par une consultation approfondie pour comprendre vos besoins, vos objectifs et les spécificités de votre projet entrepreneurial. Conseils personnalisés : Sur la base de notre consultation, nous vous fournissons des conseils adaptés à votre situation, notamment sur le choix de la forme juridique la plus appropriée pour votre entreprise. Préparation des documents : Notre équipe vous assiste dans la préparation de tous les documents nécessaires à l’enregistrement de votre société, en veillant à ce que toutes les exigences légales soient respectées. Partenariat avec un expert-comptable : Nous travaillons en partenariat avec un expert-comptable qualifié qui vous apporte son expertise pour assurer la conformité fiscale et comptable de votre entreprise dès sa création. Réduction sur les frais de domiciliation : Nous vous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre société chez nous, ce qui vous permet de bénéficier d’un avantage financier supplémentaire. Notre objectif est de vous fournir le soutien nécessaire pour créer votre société en toute confiance et tranquillité d’esprit, en vous libérant des tracas administratifs et en vous permettant de vous concentrer sur le développement de votre activité.",
  },
  "micro-company": {
    title: "Accompagnement ouverture micro entreprise",
    price: "150,00",
    description:
      "Notre service d’accompagnement à l’ouverture de micro-entreprise offre une assistance professionnelle et complète pour vous guider à travers toutes les étapes nécessaires pour démarrer votre activité avec succès. Que vous envisagiez de vous lancer en tant qu’entrepreneur individuel, auto-entrepreneur ou dans le cadre d’une autre forme juridique adaptée aux micro-entreprises, notre équipe expérimentée est là pour vous aider à naviguer dans les complexités administratives, fiscales et juridiques du processus de création d’entreprise. Notre service comprend : Consultation initiale : Nous commençons par une consultation approfondie pour comprendre vos besoins spécifiques, vos objectifs commerciaux et les exigences de votre projet entrepreneurial. Conseils personnalisés : Sur la base de notre consultation initiale, nous vous fournissons des conseils personnalisés sur le choix de la forme juridique la mieux adaptée à votre activité, les démarches administratives à suivre et les obligations légales à respecter. Assistance à la constitution du dossier : Nous vous assistons dans la préparation de tous les documents nécessaires à l’immatriculation de votre micro-entreprise, y compris les formulaires administratifs, les statuts, et autres documents juridiques requis. Suivi et support continu : Notre équipe reste à vos côtés tout au long du processus, vous guidant à chaque étape et répondant à toutes vos questions pour garantir que votre ouverture de micro-entreprise se déroule sans accroc. Avec notre service d’accompagnement à l’ouverture de micro-entreprise, vous pouvez démarrer votre activité en toute confiance, sachant que vous bénéficiez d’un soutien professionnel et personnalisé à chaque étape du processus.",
  },
  "company-transfer": {
    title: "Accompagnement transfert de société",
    price: "600,00",
    note: "*hors coûts organismes",
    description:
      "Notre service d’accompagnement pour le transfert de votre société est conçu pour simplifier et faciliter le processus de transfert de propriété ou de siège social de votre entreprise. En partenariat avec notre expert-comptable expérimenté, nous offrons une assistance professionnelle et personnalisée à chaque étape du processus, garantissant une transition fluide et conforme à toutes les exigences légales. Nous comprenons que le transfert de société peut être un processus complexe, impliquant des aspects juridiques, fiscaux et administratifs délicats à gérer. C’est pourquoi notre équipe dédiée est là pour vous guider à travers toutes les étapes, depuis la préparation de la documentation nécessaire jusqu’à la finalisation du transfert auprès des autorités compétentes. Notre objectif est de vous offrir une assistance complète et de qualité, vous permettant de mener à bien votre transfert d’entreprise en toute confiance. De plus, pour rendre nos services encore plus accessibles, nous offrons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous. Cette réduction s’applique en plus des frais de service hors frais d’organisme, ce qui vous permet de bénéficier d’un accompagnement professionnel à un tarif avantageux.",
  },
  "share-transfer": {
    title: "Cession de parts",
    price: "200,00",
    description:
      "Notre service de cession de parts est conçu pour faciliter le processus de transfert de propriété dans les sociétés, en offrant une assistance professionnelle et complète à tous les acteurs impliqués. Que vous soyez un associé désireux de vendre vos parts, un investisseur cherchant à acquérir une participation dans une entreprise existante, ou une société cherchant à gérer efficacement les transitions de propriété, notre équipe expérimentée est là pour vous accompagner à chaque étape du processus. Nous offrons une gamme complète de services, comprenant la consultation sur les aspects juridiques et fiscaux de la cession, la négociation et la rédaction d’accords de cession personnalisés, ainsi que l’assistance dans l’obtention des approbations nécessaires des autres associés ou actionnaires. Notre objectif est de simplifier et d’accélérer le processus de cession de parts, tout en veillant à ce que les intérêts de toutes les parties concernées soient pris en compte. Que vous soyez un particulier, un investisseur institutionnel ou une entreprise, notre service de cession de parts peut vous aider à atteindre vos objectifs de manière efficace et professionnelle.",
  },
  "commercial-ad": {
    title: "Création annonce commerciale pour site d'annonces",
    price: "15,00",
    description:
      "Notre service de création d’annonces commerciales pour sites d’annonces offre une solution complète pour vous aider à maximiser la visibilité et l’efficacité de vos annonces en ligne. Que vous souhaitiez promouvoir un produit, un service ou une offre spéciale, notre équipe expérimentée est là pour vous aider à créer des annonces attrayantes et convaincantes qui captivent l’attention de votre public cible. Nous pensons soigneusement chaque annonce pour qu’elle soit vendeuse et optimisée avec les bons mots-clés, ce qui augmente vos chances d’apparaître en haut des résultats de recherche et de générer plus de trafic vers votre annonce. Notre processus de création d’annonces commence par une analyse approfondie de votre produit ou service, ainsi que de votre public cible et de la plateforme sur laquelle vous souhaitez diffuser votre annonce. Ensuite, nous travaillons à créer un contenu persuasif, accrocheur et pertinent, en utilisant des techniques de copywriting éprouvées pour inciter les utilisateurs à cliquer et à en savoir plus. Que vous utilisiez des sites d’annonces classifiées, des plateformes de commerce électronique ou d’autres types de sites d’annonces en ligne, notre service vous permet de vous démarquer de la concurrence et d’attirer l’attention de clients potentiels.",
  },
  "quote-creation": {
    title: "Création devis ou service",
    price: "15,00",
    description:
      "Notre service de création de devis et services offre une solution professionnelle pour la conception et la présentation de vos devis et documents de services. Avec votre logo fourni, nous travaillons en étroite collaboration avec vous pour créer des devis personnalisés qui mettent en valeur les avantages de vos produits ou services. Nous nous assurons que chaque devis est clair, complet et professionnel, vous permettant de présenter votre entreprise de manière convaincante à vos clients.",
  },
  "annual-accounts": {
    title: "Dépôt des comptes annuels",
    price: "300,00",
    note: "*hors coûts organismes",
    description:
      "Le service de dépôt des comptes annuels de notre société offre une assistance complète pour aider les entreprises à respecter leurs obligations légales en matière de transparence financière et de conformité réglementaire. De la préparation des états financiers annuels à la soumission auprès des autorités compétentes, en passant par la gestion de toute correspondance avec les organismes de régulation, notre équipe dévouée est là pour simplifier et faciliter ce processus complexe. Notre objectif est de garantir que le dépôt des comptes annuels se déroule de manière fluide et sans accroc, offrant aux entreprises la tranquillité d’esprit nécessaire pour se concentrer sur leurs activités principales.",
  },
  "company-modification": {
    title: "Modification société",
    price: "900,00",
    note: "*hors coûts organismes",
    description:
      "Notre service d’accompagnement pour les modifications de société offre une assistance professionnelle et complète pour faciliter les changements au sein de votre entreprise. En partenariat avec notre expert-comptable, nous vous guidons à travers chaque étape du processus, depuis la préparation de la documentation jusqu’à la soumission auprès des autorités compétentes. Notre objectif est de vous offrir une assistance personnalisée et professionnelle, garantissant une transition fluide et conforme à toutes les exigences légales. De plus, nous proposons une réduction de 50 euros sur les frais de service si vous choisissez de domicilier votre entreprise chez nous, rendant nos services encore plus accessibles et avantageux.",
  },
};
const reservationPrices: ReservationPrices = {
  "coworking-space": { hour: 5 },
  "formation-room": { hour: 10, halfDay: 25, fullDay: 45 },
  "location-bureau": { halfDay: 125, fullDay: 250 },
};

const HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];
const translateReservationType = (type: string) => {
  switch (type) {
    case "hour":
      return "à l'heure";
    case "halfDay":
      return "demi-journée";
    case "fullDay":
      return "journée complète";
    case "morning":
      return "matin";
    case "afternoon":
      return "après-midi";
    default:
      return type;
  }
};
const ServiceDetail: React.FC = () => {
  const { addItem } = useCart();
  const { id } = useRoute().params<{ id: string }>();
  const showToast = (type: string, title: string, message: string) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "bottom",
    });
  };
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const service = useMemo(() => {
    return id ? serviceData[id] : serviceData["coworking-space"];
  }, [id]);

  const [modeReservation, setModeReservation] = useState<
    "hour" | "halfDay" | "fullDay"
  >("hour");
  const [dateReservation, setDateReservation] = useState("");
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [halfDayPeriod, setHalfDayPeriod] = useState<"morning" | "afternoon">(
    "morning"
  );

  const [fullDayDates, setFullDayDates] = useState<Date[]>([]);
  const [reservedPeriods, setReservedPeriods] = useState<string[]>([]);
  const reservedDates = reservedPeriods
    .map((range) => {
      // Nettoyage du format JSON éventuel
      const match = range.match(/\d{4}-\d{2}-\d{2}/); // extrait seulement la première date (même si entourée de guillemets)
      return match ? new Date(match[0]) : null;
    })
    .filter(Boolean) as Date[];

  // const fullDayDates: Date[] = [];

  const reservationsByDay: Record<
    string,
    { morning: boolean; afternoon: boolean }
  > = {};

  reservedPeriods.forEach((range) => {
    const match = range.match(/\[(.+?),(.+?)\)/);
    if (!match) return;

    const start = new Date(match[1]);
    const end = new Date(match[2]);
    const dayKey = start.toISOString().split("T")[0];

    if (!reservationsByDay[dayKey]) {
      reservationsByDay[dayKey] = { morning: false, afternoon: false };
    }

    const startHour = start.getUTCHours();
    const endHour = end.getUTCHours();

    if (startHour === 9 && endHour === 12) {
      reservationsByDay[dayKey].morning = true;
    }
    if (startHour === 13 && endHour === 16) {
      reservationsByDay[dayKey].afternoon = true;
    }
    if (startHour === 9 && endHour === 16) {
      // cas fullDay explicite
      reservationsByDay[dayKey].morning = true;
      reservationsByDay[dayKey].afternoon = true;
    }
  });

  Object.entries(reservationsByDay).forEach(([day, { morning, afternoon }]) => {
    if (morning && afternoon) {
      fullDayDates.push(new Date(day));
    }
  });

  // console.log("📆 Dates full-day bloquées :", fullDayDates);

  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  // const getReservationPeriod = () => {
  //   if (!dateReservation) return "";
  //   if (modeReservation === "halfDay") {
  //     if (halfDayPeriod === "morning") {
  //       return `[${dateReservation} 09:00:00+00,${dateReservation} 12:00:00+00)`;
  //     } else {
  //       return `[${dateReservation} 13:00:00+00,${dateReservation} 16:00:00+00)`;
  //     }
  //   }
  //   if (modeReservation === "fullDay") {
  //     return `[${dateReservation} 09:00:00+00,${dateReservation} 16:00:00+00)`;
  //   }
  //   if (modeReservation === "hour" && selectedHours.length > 0) {
  //     const hour = selectedHours[0];
  //     const start = `${dateReservation} ${hour}:00+00`;
  //     const endHour = String(Number(hour.split(":")[0]) + 1).padStart(2, "0");
  //     const end = `${dateReservation} ${endHour}:00+00`;
  //     return `[${start},${end})`;
  //   }
  //   return "";
  // };
  const getReservationPeriod = () => {
    if (!dateReservation) return "";

    const startDate = new Date(dateReservation);
    const endDate = new Date(dateReservation);

    if (modeReservation === "halfDay") {
      if (halfDayPeriod === "morning") {
        startDate.setUTCHours(9, 0, 0, 0);
        endDate.setUTCHours(12, 0, 0, 0);
      } else {
        startDate.setUTCHours(13, 0, 0, 0);
        endDate.setUTCHours(16, 0, 0, 0);
      }
    } else if (modeReservation === "fullDay") {
      startDate.setUTCHours(9, 0, 0, 0);
      endDate.setUTCHours(16, 0, 0, 0);
    } else if (modeReservation === "hour" && selectedHours.length > 0) {
      const hour = Number(selectedHours[0].split(":")[0]);
      startDate.setUTCHours(hour, 0, 0, 0);
      endDate.setUTCHours(hour + 1, 0, 0, 0);
    } else {
      return "";
    }

    return `[${startDate.toISOString()},${endDate.toISOString()})`;
  };

  const getReservationType = (id: any) => {
    if (id === "coworking-space") return "coworking";
    if (id === "formation-room") return "formation";
    if (id === "location-bureau") return "bureau";
    return id;
  };

  // Fonction pour vérifier si une plage est réservée
  const isRangeReserved = (range: string): boolean => {
    const result = reservedPeriods.some((reservedRange) => {
      // console.log('[isRangeReserved] Test:', { reservedRange, range });
      // Convertir les plages en dates pour comparaison
      const extractDates = (rangeStr: string) => {
        // Pour [2025-05-28 09:00:00+00,2025-05-28 16:00:00+00)
        const match = rangeStr.match(/\[(.+?),(.+?)\)/);
        return match
          ? [new Date(match[1].trim()), new Date(match[2].trim())]
          : [null, null];
      };

      const [reservedStart, reservedEnd] = extractDates(reservedRange);
      const [checkStart, checkEnd] = extractDates(range);

      if (!reservedStart || !reservedEnd || !checkStart || !checkEnd)
        return false;

      // Vérifier si les plages se chevauchent
      return (
        (checkStart >= reservedStart && checkStart < reservedEnd) ||
        (checkEnd > reservedStart && checkEnd <= reservedEnd) ||
        (checkStart <= reservedStart && checkEnd >= reservedEnd)
      );
    });
    // console.log('[isRangeReserved] Résultat pour', range, ':', result);
    return result;
  };

  // Fonctions pour générer les plages de temps
  const getHalfDayRange = (period: "morning" | "afternoon"): string => {
    if (!dateReservation) return "";
    const range =
      period === "morning"
        ? `[${dateReservation} 09:00:00+00,${dateReservation} 12:00:00+00)`
        : `[${dateReservation} 13:00:00+00,${dateReservation} 16:00:00+00)`;
    // console.log('[getHalfDayRange]', period, ':', range);
    return range;
  };

  const getFullDayRange = (): string => {
    if (!dateReservation) return "";
    const range = `[${dateReservation} 09:00:00+00,${dateReservation} 16:00:00+00)`;
    // console.log('[getFullDayRange] :', range);
    return range;
  };

  // Vérifications des réservations existantes
  const isMorningReserved = isRangeReserved(getHalfDayRange("morning"));
  // console.log('[isMorningReserved]', isMorningReserved);
  const isAfternoonReserved = isRangeReserved(getHalfDayRange("afternoon"));
  // console.log('[isAfternoonReserved]', isAfternoonReserved);
  // Full day est réservé uniquement si matin et après-midi le sont tous les deux
  // ✅ jour complet bloqué seulement si matin ET aprèm sont pris
  const isFullDayReserved = isMorningReserved && isAfternoonReserved;

  // ✅ on bloque l'option "journée complète" dès qu'une moitié est prise
  const isFullDayOptionDisabled = isMorningReserved || isAfternoonReserved;

  // ✅ on bloque juste la moitié correspondante
  const isHalfDayOptionDisabled = (period: "morning" | "afternoon") =>
    period === "morning"
      ? isMorningReserved // si matin déjà réservé → bloqué
      : isAfternoonReserved;

  // ===== AJOUTER ICI =====
  let reservationNotice = "";
  if (isMorningReserved && isAfternoonReserved) {
    reservationNotice = "La journée entière est déjà réservée pour cette date.";
  } else if (isMorningReserved) {
    reservationNotice = "Le matin est déjà réservé pour cette date.";
  } else if (isAfternoonReserved) {
    reservationNotice = "L’après-midi est déjà réservé pour cette date.";
  }

  useEffect(() => {
    const fetchFullDayDates = async () => {
      if (!id) return;
      const reservationType = getReservationType(id);

      // On récupère toutes les périodes pour ce service
      const { data, error } = await supabase
        .from("reservations")
        .select("period, reservation_date")
        .ilike("reservation_type", `%${reservationType}%`);

      if (error) {
        setFullDayDates([]);
        return;
      }

      // On regroupe les périodes par date
      const reservationsByDay: Record<
        string,
        { morning: boolean; afternoon: boolean }
      > = {};
      data.forEach((r: any) => {
        const range = r.period;
        const match = range.match(/\[(.+?),(.+?)\)/);
        if (!match) return;
        const start = new Date(match[1]);
        const end = new Date(match[2]);
        const dayKey = start.toISOString().split("T")[0];

        if (!reservationsByDay[dayKey]) {
          reservationsByDay[dayKey] = { morning: false, afternoon: false };
        }
        const startHour = start.getUTCHours();
        const endHour = end.getUTCHours();

        if (startHour === 9 && endHour === 12)
          reservationsByDay[dayKey].morning = true;
        if (startHour === 13 && endHour === 16)
          reservationsByDay[dayKey].afternoon = true;
        if (startHour === 9 && endHour === 16) {
          reservationsByDay[dayKey].morning = true;
          reservationsByDay[dayKey].afternoon = true;
        }
      });

      // On ne bloque que les jours où matin ET après-midi sont pris
      const fullDays = Object.entries(reservationsByDay)
        .filter(([_, v]) => v.morning && v.afternoon)
        .map(([day]) => new Date(day));

      setFullDayDates(fullDays);
    };

    fetchFullDayDates();
  }, [id]);
  useEffect(() => {
    const fetchReservedPeriods = async () => {
      try {
        if (!id || !dateReservation) return;
        const reservationType = getReservationType(id);

        const { data, error } = await supabase
          .from("reservations")
          .select("period")
          .ilike("reservation_type", `%${reservationType}%`)
          .eq("reservation_date", dateReservation);

        if (error) {
          setReservedPeriods([]);
        } else {
          const periods = data.map((r: any) => {
            const p = r.period;
            if (typeof p === "string" && p.startsWith('["')) {
              try {
                const [start, end] = JSON.parse(p);
                return `[${start},${end})`;
              } catch {
                return p;
              }
            }
            if (typeof p === "string" && /^\[.+,.+\)$/.test(p)) {
              return p;
            }
            return p;
          });
          setReservedPeriods(periods);
        }
      } catch (e) {
        setReservedPeriods([]);
      }
    };
    fetchReservedPeriods();
  }, [id, dateReservation]);

  const isHourDisabled = (hour: string): boolean => {
    if (!dateReservation) return false;
    const start = `${dateReservation} ${hour}:00+00`;
    const endHour = String(Number(hour.split(":")[0]) + 1).padStart(2, "0");
    const end = `${dateReservation} ${endHour}:00:00+00`;
    const rangeToCheck = `[${start},${end})`;
    const disabled = isRangeReserved(rangeToCheck);
    // console.log('[isHourDisabled]', hour, rangeToCheck, '=>', disabled);
    return disabled;
  };

  const calculPrix = () => {
    if (id === "coworking-space") {
      const pricePerHour = reservationPrices["coworking-space"].hour;
      return (selectedHours.length || 1) * pricePerHour;
    }

    if (id === "formation-room") {
      const priceConfig = reservationPrices["formation-room"];
      if (modeReservation === "hour") {
        return (selectedHours.length || 1) * priceConfig.hour;
      }
      if (modeReservation === "halfDay") {
        return priceConfig.halfDay;
      }
      if (modeReservation === "fullDay") {
        return priceConfig.fullDay;
      }
    }

    if (id === "location-bureau") {
      const priceConfig = reservationPrices["location-bureau"];
      if (modeReservation === "halfDay") {
        return priceConfig.halfDay;
      }
      if (modeReservation === "fullDay") {
        return priceConfig.fullDay;
      }
    }

    // fallback si jamais
    const basePrice = parseFloat(service.price.replace(",", "."));
    return basePrice;
  };

  const toggleHour = (hour: string) => {
    setSelectedHours((s) =>
      s.includes(hour) ? s.filter((h) => h !== hour) : [...s, hour]
    );
  };

  const getRange = (start: string, end: string) => `[${start},${end})`;

  const isRangeOverlapping = (range: string): boolean => {
    return reservedPeriods.some((existing) => existing === range);
  };

  // const generateRange = () => {
  //   if (!dateReservation) return "";

  //   const timeZone = "Europe/Paris";
  //   let startLocalStr = "";
  //   let endLocalStr = "";

  //   if (modeReservation === "hour") {
  //     if (!selectedHours.length) return "";
  //     const hour = selectedHours[0];
  //     const [hourPart] = hour.split(":");
  //     const startHour = Number(hourPart);
  //     const endHour = startHour + 1;

  //     startLocalStr = `${dateReservation} ${String(startHour).padStart(
  //       2,
  //       "0"
  //     )}:00:00`;
  //     endLocalStr = `${dateReservation} ${String(endHour).padStart(
  //       2,
  //       "0"
  //     )}:00:00`;
  //   } else if (modeReservation === "halfDay") {
  //     if (halfDayPeriod === "morning") {
  //       startLocalStr = `${dateReservation} 09:00:00`;
  //       endLocalStr = `${dateReservation} 12:00:00`;
  //     } else {
  //       startLocalStr = `${dateReservation} 13:00:00`;
  //       endLocalStr = `${dateReservation} 16:00:00`;
  //     }
  //   } else if (modeReservation === "fullDay") {
  //     startLocalStr = `${dateReservation} 09:00:00`;
  //     endLocalStr = `${dateReservation} 16:00:00`;
  //   } else {
  //     return "";
  //   }

  //   const startUTCStr = fromZonedTime(startLocalStr, timeZone);
  //   const endUTCStr = fromZonedTime(endLocalStr, timeZone);

  //   return `[${startUTCStr},${endUTCStr})`;
  // };

  const generateRange = () => {
    if (!dateReservation) return "";

    let startLocalStr = "";
    let endLocalStr = "";

    if (modeReservation === "hour") {
      if (!selectedHours.length) return "";
      const hour = selectedHours[0];
      const [hourPart] = hour.split(":");
      const startHour = Number(hourPart);
      const endHour = startHour + 1;

      startLocalStr = `${dateReservation}T${String(startHour).padStart(
        2,
        "0"
      )}:00:00Z`;
      endLocalStr = `${dateReservation}T${String(endHour).padStart(
        2,
        "0"
      )}:00:00Z`;
    } else if (modeReservation === "halfDay") {
      if (halfDayPeriod === "morning") {
        startLocalStr = `${dateReservation}T09:00:00Z`;
        endLocalStr = `${dateReservation}T12:00:00Z`;
      } else {
        startLocalStr = `${dateReservation}T13:00:00Z`;
        endLocalStr = `${dateReservation}T16:00:00Z`;
      }
    } else if (modeReservation === "fullDay") {
      startLocalStr = `${dateReservation}T09:00:00Z`;
      endLocalStr = `${dateReservation}T16:00:00Z`;
    } else {
      return "";
    }

    return `[${startLocalStr},${endLocalStr})`;
  };

  const getCategory = (id: string) => {
    // Catégorie Domiciliation (hors services courrier)
    if (
      [
        "domiciliation-1an-entreprise",
        "domiciliation-3mois-entreprise",
        "domiciliation-3mois-micro",
        "domiciliation-6mois-entreprise",
        "domiciliation-6mois-micro",
        "pack-domicilie",
      ].includes(id)
    ) {
      return "domiciliation";
    }
    // Catégorie Courrier (réception, scan, réexpédition)
    if (
      ["reception-colis", "scan-courrier", "reexpedition-courrier"].includes(id)
    ) {
      return "courrier";
    }
    // Catégorie Admin
    if (
      [
        "company-creation",
        "micro-company",
        "company-transfer",
        "share-transfer",
        "commercial-ad",
        "quote-creation",
        "annual-accounts",
        "company-modification",
        "bank-account",
        "vtc-creation",
      ].includes(id)
    ) {
      return "admin";
    }
    // Par défaut
    return "service";
  };
  // ...existing code...
  const currentRange = generateRange();
  const isReserved = currentRange && isRangeOverlapping(currentRange);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Navbar session={session} onToggleMenu={() => setMenuOpen(!menuOpen)} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{service.title}</Text>

          <View style={styles.priceSection}>
              <View style={styles.sectionContainer}>
  <View>
    <Text style={styles.priceText}>{calculPrix().toFixed(2)} €</Text>

    {service.priceUnit && (
      <Text style={styles.priceUnitText}>{service.priceUnit}</Text>
    )}

    <Text style={styles.smallText}>Hors taxes</Text>

    {!["coworking-space", "formation-room", "location-bureau"].includes(id) && (
      <Text style={styles.descriptionText}>
        {service.description?.slice(0, 200)}...
      </Text>
    )}
  </View>
</View>


              <div className="bg-gray-50 p-6 rounded-lg">
                <Tabs
                  defaultValue="description"
                  onValueChange={(value) =>
                    setActiveTab(value as "description" | "reviews")
                  }
                  className="w-full"
                >
                  <TabsContent value="description">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">
                        {service.description}
                      </p>
                      {service.note && (
                        <p className="mt-4 italic text-gray-600">
                          {service.note}
                        </p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <ReviewsList reviews={reviews} isLoading={loadingReviews} />
                    <ReviewForm
                      productId={id!}
                      productName={service.title}
                      onReviewSubmitted={() => setRefreshReviews((r) => !r)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          <ProductDescription />
          <RelatedProducts
            currentId={id}
            currentCategory={getCategory(id)}
          />{" "}
        </View >
      </ScrollView>
      <Footer />
      <Toaster />
    </View >
  );
};

export default ServiceDetail;
