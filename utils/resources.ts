import { subscribe } from 'diagnostics_channel';

interface Resources {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const resources: Resources = {
  menu: {
    en: 'MENU',
    fr: 'MENU',
  },
  cart: {
    en: 'CART',
    fr: 'PANIER',
  },
  close: {
    en: 'CLOSE',
    fr: 'FERMER',
  },
  new: {
    en: 'NEW',
    fr: 'NOUVEAU',
  },
  oneofone: {
    en: 'ONE OF ONE',
    fr: 'PIÈCE UNIQUE',
  },
  tops: {
    en: 'Tops',
    fr: 'Hauts',
  },
  bottoms: {
    en: 'Bottoms',
    fr: 'Bas',
  },
  accessories: {
    en: 'Accessories',
    fr: 'Accessoires',
  },
  catalog: {
    en: 'CATALOG',
    fr: 'CATALOGUE',
  },
  stockists: {
    en: 'STOCKISTS',
    fr: 'DISTRIBUTEURS',
  },
  press: {
    en: 'PRESS',
    fr: 'PRESSE',
  },
  journal: {
    en: 'JOURNAL',
    fr: 'JOURNAL',
  },
  account: {
    en: 'account',
    fr: 'compte',
  },
  terms: {
    en: 'terms',
    fr: 'conditions',
  },
  privacy: {
    en: 'privacy',
    fr: 'confidentialité',
  },
  contact: {
    en: 'contact',
    fr: 'contact',
  },
  subscribe: {
    en: 'SUBSCRIBE TO OUR NEWSLETTER',
    fr: 'ABONNEZ-VOUS À NOTRE NEWSLETTER',
  },
  subscribesmall: {
    en: 'Subscribe to our Newsletter',
    fr: 'Abonnez-vous à notre Newsletter',
  },
  search: {
    en: 'search',
    fr: 'recherche',
  },
  youremail: {
    en: 'your email',
    fr: 'votre email',
  },
  ourcommitment: {
    en: 'Our Commitment',
    fr: 'Notre Engagement',
  },
  commitmenttext: {
    en: 'We had at heart to create an eco-responsible and socially conscious brand. We work with collectives of dyers and embroiders in forsaken villages in India. We work with collectives of dyers and embroiders in forsaken villages in India. Most of the pieces in this collection were made from hemp, a material that is on the rise not only for its nice feel on the skin but also thanks to the plant not being water intensive. We create unique clothes from vintage fabrics that tell the stories of the past but are made to live in the present and for many years to come.',
    fr: "Nous avions à cœur de créer une marque écoresponsable et socialement consciente. Nous travaillons avec des collectifs de teinturiers et de brodeurs dans des villages abandonnés en Inde. La plupart des pièces de cette collection sont fabriquées à partir de chanvre, un matériau en vogue non seulement pour son toucher agréable sur la peau, mais aussi parce que la plante n'est pas gourmande en eau. Nous créons des vêtements uniques à partir de tissus vintage qui racontent les histoires du passé mais sont faits pour vivre dans le présent et pour de nombreuses années à venir.",
  },
  yourcart: {
    en: 'Your Cart',
    fr: 'Votre Panier',
  },
  yourcartisempty: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
  },
  proceedtocheckout: {
    en: 'PROCEED TO CHECKOUT',
    fr: 'PASSER À LA CAISSE',
  },
  freeshipping: {
    en: 'FREE SHIPPING WORLDWIDE FOR ORDERS OVER €600',
    fr: 'LIVRAISON GRATUITE DANS LE MONDE ENTIER POUR LES COMMANDES DE PLUS DE 600 €',
  },
  description: {
    en: 'DESCRIPTIONS',
    fr: 'DESCRIPTIONS',
  },
  color: {
    en: 'COLOR',
    fr: 'COULEUR',
  },
  size: {
    en: 'SIZE',
    fr: 'TAILLE',
  },
  completethelook: {
    en: 'COMPLETE THE LOOK',
    fr: 'COMPLÉTEZ LE LOOK',
  },
  add: {
    en: 'ADD',
    fr: 'AJOUTER',
  },
  chest: {
    en: 'CHEST',
    fr: 'POITRINE',
  },
  length: {
    en: 'LENGTH',
    fr: 'LONGUEUR',
  },
  searchresultsfor: {
    en: 'Search results for ',
    fr: 'Résultats de recherche pour ',
  },
  oneofoneheader: {
    en: 'We partnered with skilled artisans to create one-of-one pieces that celebrate the beauty of individuality and the artistry of hand craftsmanship, each piece a testament to the collaboration between artisanal mastery and creative vision.',
    fr: "Nous avons collaboré avec des artisans qualifiés pour créer des pièces uniques qui célèbrent la beauté de l'individualité et l'artisanat manuel, chaque pièce étant un témoignage de la collaboration entre la maîtrise artisanale et la vision créative.",
  },
  topsheader: {
    en: 'Our latest collection features bold tops, whether adorned with hand-embroidered details, striking graphics, or vibrant hand-painted accents.',
    fr: "Notre dernière collection propose des hauts audacieux, ornés de détails brodés à la main, de graphiques saisissants ou d'accents peints à la main vibrants.",
  },
  bottomsheader: {
    en: 'Crafted from a blend of natural fibers like cotton, hemp, and artisanal fabrics, a collection of versatile bottoms feature nature-inspired motifs and intricate embroidered botanicals that elevate everyday style.',
    fr: "Fabriquée à partir d'un mélange de fibres naturelles comme le coton, le chanvre et les tissus artisanaux, notre collection de bas polyvalents présente des motifs inspirés de la nature et des broderies botaniques complexes qui élèvent le style quotidien.",
  },
  accessoriesheader: {
    en: 'Our accessories collection demonstrates our commitment to sustainability and social consciousness, while also featuring high-quality materials that will last for years to come.',
    fr: "Notre collection d'accessoires démontre notre engagement envers la durabilité et la conscience sociale, tout en mettant en avant des matériaux de haute qualité qui dureront de nombreuses années.",
  },
  subscribeheader: {
    en: 'Stay updated with our latest news and offers!',
    fr: 'Restez informé de nos dernières nouvelles et offres!',
  },
  enteryouremail: {
    en: 'Enter your email',
    fr: 'Entrez votre email',
  },
  subscribebutton: {
    en: 'Subscribe',
    fr: "S'abonner",
  },
  subscribebanner: {
    en: 'Save 10% when you sign up!',
    fr: 'Économisez 10% lorsque vous vous inscrivez!',
  },
  price: {
    en: 'PRICE',
    fr: 'PRIX',
  },
  remove: {
    en: 'Remove',
    fr: 'Retirer',
  },
  all: {
    en: 'ALL',
    fr: 'TOUS',
  },
  oneofonegroup: {
    en: 'ONE OF ONE',
    fr: 'PIÈCE UNIQUE',
  },
  packaging: {
    en: 'Packaging',
    fr: 'Emballage',
  },
  freeonlinereturns: {
    en: 'Free Online Returns',
    fr: 'Retours en ligne gratuits',
  },
  freeexchangeinstore: {
    en: 'Free exchange in store',
    fr: 'Échange gratuit en magasin',
  },
  freeshippinggroup: {
    en: 'Free shipping',
    fr: 'Livraison gratuite',
  },
  language: {
    en: 'Language:',
    fr: 'Langue:',
  },
};

export default resources;
