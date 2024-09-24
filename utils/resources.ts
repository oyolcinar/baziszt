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
  login: {
    en: 'Login',
    fr: 'Connexion',
  },
  signUp: {
    en: 'Sign Up',
    fr: 'Inscription',
  },
  firstName: {
    en: 'First Name',
    fr: 'Prénom',
  },
  lastName: {
    en: 'Last Name',
    fr: 'Nom de famille',
  },
  password: {
    en: 'Password',
    fr: 'Mot de passe',
  },
  email: {
    en: 'Email',
    fr: 'Courriel',
  },
  dontHaveAccountSignUp: {
    en: "Don't have an account? Sign Up",
    fr: "Vous n'avez pas de compte ? Inscrivez-vous",
  },
  alreadyHaveAccountLogin: {
    en: 'Already have an account? Login',
    fr: 'Vous avez déjà un compte ? Connectez-vous',
  },
  signOut: {
    en: 'Sign Out',
    fr: 'Déconnexion',
  },
  failedLogin: {
    en: 'Failed to login. Please check your credentials.',
    fr: 'Échec de la connexion. Veuillez vérifier vos identifiants.',
  },
  failedSignUp: {
    en: 'Failed to sign up. Please try again.',
    fr: "Échec de l'inscription. Veuillez réessayer.",
  },
  legal: {
    en: 'legal',
    fr: 'légal',
  },
  contactUs: {
    en: 'Contact Us',
    fr: 'Contactez-Nous',
  },
  name: {
    en: 'Name',
    fr: 'Nom',
  },
  message: {
    en: 'Message',
    fr: 'Message',
  },
  send: {
    en: 'Send',
    fr: 'Envoyer',
  },
  failedContactSubmission: {
    en: 'Failed to submit the contact form. Please try again.',
    fr: 'Échec de la soumission du formulaire de contact. Veuillez réessayer.',
  },
  legalNotice: {
    en: 'LEGAL NOTICE',
    fr: 'MENTIONS LÉGALES',
  },
  publisher: {
    en: 'PUBLISHER',
    fr: 'ÉDITEUR',
  },
  legalNoticeContent: {
    en: 'The website www.baziszt.com is published by Baziszt SAS, a simplified joint stock company duly organised and existing under the laws of France, with a share capital of 1.000 euros, registered with the Trade and Companies Register of Paris under the no. 883 587 081, whose Intracommunity VAT number is FR 60 883 587 081 and whose registered office is situated 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: 'Le site web www.baziszt.com est publié par Baziszt SAS, une société par actions simplifiée dûment organisée et existante en vertu des lois de la France, avec un capital social de 1.000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le n° 883 587 081, dont le numéro de TVA intracommunautaire est FR 60 883 587 081 et dont le siège social est situé 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
  },
  editorInChief: {
    en: 'Editor in Chief',
    fr: 'Rédacteur en Chef',
  },
  wishlist: {
    en: 'wishlist',
    fr: 'liste de souhaits',
  },
  wishlistItems: {
    en: 'wishlist items',
    fr: 'articles de la liste de souhaits',
  },
  termsOfSale: {
    en: 'TERMS OF SALE',
    fr: 'CONDITIONS DE VENTE',
  },
  vendorIdentification: {
    en: '1. IDENTIFICATION OF THE VENDOR',
    fr: '1. IDENTIFICATION DU VENDEUR',
  },
  vendorDetails: {
    en: 'BAZISZT, a “société par actions simplifiée” (simplified joint stock company) duly organized and existing under the laws of France, with a share capital of 1.000 euros, registered with the Trade and Companies Register of Paris under the no. 883 587 081, whose Intracommunity VAT number is FR 60 883 587 081 and whose registered office is situated 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: 'BAZISZT, une « société par actions simplifiée » dûment organisée et existante en vertu des lois de la France, avec un capital social de 1.000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le n° 883 587 081, dont le numéro de TVA intracommunautaire est FR 60 883 587 081 et dont le siège social est situé 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
  },
  scopeAndAcceptance: {
    en: '2. SCOPE AND ACCEPTANCE OF THE GENERAL TERMS OF SALE',
    fr: "2. CHAMP D'APPLICATION ET ACCEPTATION DES CONDITIONS GÉNÉRALES DE VENTE",
  },
  purchaseOfProducts: {
    en: 'The purchase of Products offered on the website',
    fr: "L'achat de Produits proposés sur le site Web",
  },
  websiteAndGTS: {
    en: '(hereafter the “Website”) is subject to these general terms of online sale (hereafter the “GTS”).',
    fr: '(ci-après le « Site Web ») est soumis aux présentes conditions générales de vente en ligne (ci-après les « CGV »).',
  },
  productsAndCustomers: {
    en: 'BAZISZT products (hereafter the “Products”) are exclusively intended to be sold to end consumers, natural persons or end customers legal entities, excluding all resellers or intermediaries acting on behalf of resellers (hereafter the “Customers”). Consequently, the Customer represents that he/she/it is acting as end consumer and that he/she/it has no intention of reselling the Products for commercial purpose.',
    fr: "Les produits BAZISZT (ci-après les « Produits ») sont exclusivement destinés à être vendus à des consommateurs finaux, personnes physiques ou entités juridiques clientes finales, à l’exclusion de tous les revendeurs ou intermédiaires agissant pour le compte de revendeurs (ci-après les « Clients »). Par conséquent, le Client déclare qu'il/elle agit en tant que consommateur final et qu'il/elle n'a pas l'intention de revendre les Produits à des fins commerciales.",
  },
  updateGTS: {
    en: 'BAZISZT can update these GTS at any time.',
    fr: 'BAZISZT peut mettre à jour ces CGV à tout moment.',
  },
  familiariseGTS: {
    en: 'The Customer can familiarise himself at any time with the version of the GTS then in force by clicking on the link.',
    fr: 'Le Client peut se familiariser à tout moment avec la version des CGV alors en vigueur en cliquant sur le lien.',
  },
  applicableGTS: {
    en: 'The applicable GTS at the time of the conclusion of the sales contract are those that are enforceable to, and binding on, the Customer.',
    fr: 'Les CGV applicables au moment de la conclusion du contrat de vente sont celles qui sont opposables et contraignantes pour le Client.',
  },
  acceptanceGTS: {
    en: 'Furthermore, with each purchase of Products on the Website, the Customer shall be asked to confirm the acceptance of applicable GTS on the date of placing his/her/its order. Said GTS can be viewed at the time he/she/it is asked to confirm that he/she/it accepts them. To substantiate this acceptance, the Customer must check the box “I have read and hereby accept the General Terms of Sale of the baziszt.com website”.',
    fr: "En outre, à chaque achat de Produits sur le Site, il sera demandé au Client de confirmer l'acceptation des CGV applicables à la date de passation de sa commande. Lesdites CGV peuvent être consultées au moment où il lui est demandé de confirmer qu'il les accepte. Pour valider cette acceptation, le Client doit cocher la case « J'ai lu et j'accepte les Conditions Générales de Vente du site baziszt.com ».",
  },
  termsOfOrder: {
    en: '3. TERMS OF THE ORDER',
    fr: '3. CONDITIONS DE LA COMMANDE',
  },
  orderAcceptance: {
    en: 'Any order placed on the Website shall imply express acceptance of the GTS and acceptance of the prices and Products available for sale on the Website.',
    fr: "Toute commande passée sur le site implique l'acceptation expresse des CGV et l'acceptation des prix et des Produits disponibles à la vente sur le site.",
  },
  orderProcess: {
    en: 'ORDER PROCESS',
    fr: 'PROCESSUS DE COMMANDE',
  },
  orderProcedure: {
    en: 'The Customer who wants to place an order must comply with the following procedure:',
    fr: 'Le Client qui souhaite passer une commande doit suivre la procédure suivante :',
  },
  productChoice: {
    en: 'Product choice:',
    fr: 'Choix du produit :',
  },
  productSelection: {
    en: 'the Customer must select the Product that he/she/it would like to order.',
    fr: 'le Client doit sélectionner le Produit qu’il/elle souhaite commander.',
  },
  checkingSelectionContent: {
    en: 'Checking of the content of the Customer’s selection:',
    fr: 'Vérification du contenu de la sélection du Client:',
  },
  identification: {
    en: 'Identification:',
    fr: 'Identification:',
  },
  customerIdentificationForm: {
    en: 'The Customer must complete the identification form made available to him/her/it and provide the requested information (mandatory information: title, surname, first name or corporate name, e-mail address, password, telephone number for the delivery).',
    fr: "Le client doit remplir le formulaire d'identification mis à sa disposition et fournir les informations demandées (informations obligatoires : titre, nom, prénom ou raison sociale, adresse e-mail, mot de passe, numéro de téléphone pour la livraison).",
  },
  checkingCustomerOrder: {
    en: 'Checking of the Customer’s order:',
    fr: 'Vérification de la commande du client :',
  },
  customerOrderVerification: {
    en: 'The Customer checks the content of his/her/its order, the total price, the delivery and invoicing addresses while keeping the possibility of deleting a Product or modifying the invoicing or delivery address. The Customer confirms his/her/its method of delivery and payment. The Customer must confirm his/her/its acceptance of these GTS by checking the corresponding box. The validation of the order is only possible after having checked this box. From this step, the Customer cannot anymore modify and/or cancel its order.',
    fr: 'Le client vérifie le contenu de sa commande, le prix total, les adresses de livraison et de facturation tout en ayant la possibilité de supprimer un produit ou de modifier l’adresse de facturation ou de livraison. Le client confirme son mode de livraison et de paiement. Le client doit confirmer son acceptation de ces CGV en cochant la case correspondante. La validation de la commande n’est possible qu’après avoir coché cette case. À partir de cette étape, le client ne peut plus modifier ou annuler sa commande.',
  },
  orderAcknowledgementOfReceipt: {
    en: 'Order acknowledgement of receipt:',
    fr: 'Accusé de réception de la commande:',
  },
  emailOrderSummary: {
    en: 'The Customer receives an e-mail summing up the content of his/her/its order, namely:',
    fr: 'Le client reçoit un e-mail récapitulant le contenu de sa commande, à savoir:',
  },
  deliveryAndInvoicingAddresses: {
    en: 'His/her/its delivery and invoicing addresses',
    fr: 'Ses adresses de livraison et de facturation',
  },
  orderNumber: {
    en: 'The order number',
    fr: 'Le numéro de commande',
  },
  orderDate: {
    en: 'The date of the order',
    fr: 'La date de la commande',
  },
  orderedProductsList: {
    en: 'The list of Products ordered and their amounts',
    fr: 'La liste des produits commandés et leurs montants',
  },
  deliveryMethod: {
    en: 'The method of delivery (Client’s address or “point relay”)',
    fr: 'Le mode de livraison (adresse du client ou « point relais »)',
  },
  orderProof: {
    en: 'The Customer is advised to keep and print this document, which is official proof of his/her/its order. The order is then registered and processed by BAZISZT which checks the availability of the Product(s) ordered. Any order placed implies acceptance of the prices and descriptions of the Products available for sale.',
    fr: "Il est conseillé au Client de conserver et d'imprimer ce document, qui constitue la preuve officielle de sa commande. La commande est ensuite enregistrée et traitée par BAZISZT, qui vérifie la disponibilité des Produit(s) commandé(s). Toute commande passée implique l'acceptation des prix et des descriptions des Produits disponibles à la vente.",
  },
  confirmationOfShipping: {
    en: 'Confirmation of shipping of the order:',
    fr: "Confirmation de l'expédition de la commande:",
  },
  orderEmailSummary: {
    en: 'The Customer receives an e-mail summarising the content of his/her/its order and confirming the dispatch of the same. The contract is deemed to have been concluded on the date on which this e-mail is sent.',
    fr: "Le Client reçoit un e-mail récapitulant le contenu de sa commande et confirmant l'expédition de celle-ci. Le contrat est réputé conclu à la date d'envoi de cet e-mail.",
  },
  section4ProductAvailability: {
    en: '4. PRODUCT AVAILABILITY',
    fr: '4. DISPONIBILITÉ DU PRODUIT',
  },
  offersValidity: {
    en: 'The offers of Products and prices of BAZISZT are valid while they are visible on the Website, and subject to stocks availability.',
    fr: "Les offres de produits et les prix de BAZISZT sont valables tant qu'ils sont visibles sur le site Web, et sous réserve de la disponibilité des stocks.",
  },
  errorsOrModifications: {
    en: 'Errors or modifications can exceptionally occur, notably in the event of simultaneous orders of the same Product by several Customers.',
    fr: 'Des erreurs ou des modifications peuvent exceptionnellement survenir, notamment en cas de commandes simultanées du même produit par plusieurs clients.',
  },
  productUnavailable: {
    en: 'In the event the Product is found unavailable after placing the order, BAZISZT shall inform the Customer by e-mail or by telephone as soon as possible, by offering that he/she/it either order another Product available on the Website as a replacement, or cancels his/her/its order at no cost.',
    fr: "Dans le cas où le produit s'avérerait indisponible après la passation de la commande, BAZISZT informera le client par e-mail ou par téléphone dès que possible, en lui proposant soit de commander un autre produit disponible sur le site en remplacement, soit d'annuler sa commande sans frais.",
  },
  productChangeRight: {
    en: 'BAZISZT reserves the right to change at any time and without prior notice the Products offered on the Website.',
    fr: 'BAZISZT se réserve le droit de modifier à tout moment et sans préavis les produits proposés sur le site.',
  },
  productQuantityLimit: {
    en: 'To ensure a better quality of service and availability of its Products with all of its online Customers, BAZISZT reserves the right to limit the quantity of Products that can be bought by a given Customer, this in accordance with the provisions applicable on the matter and notably those of Article L.121-11 of the French Consumer Code.',
    fr: "Afin de garantir une meilleure qualité de service et la disponibilité de ses produits à tous ses clients en ligne, BAZISZT se réserve le droit de limiter la quantité de produits pouvant être achetés par un client donné, conformément aux dispositions applicables, notamment celles de l'article L.121-11 du Code de la consommation français.",
  },
  productPhotoDisclaimer: {
    en: 'Although all efforts are made to ensure that the colour and pattern of the Products whose photos are displayed on the Website are faithful to the original Products, variations may occur, notably due to the technical limitations of colour reproduction on the Customer’s computer equipment. Consequently, BAZISZT cannot be held liable for non-substantial errors or inaccuracies of photographs or graphic representations of Products appearing on the Website.',
    fr: "Bien que tous les efforts soient faits pour garantir que les couleurs et motifs des produits dont les photos sont affichées sur le site Web soient fidèles aux produits originaux, des variations peuvent survenir, notamment en raison des limitations techniques de la reproduction des couleurs sur l'équipement informatique du client. En conséquence, BAZISZT ne peut être tenu responsable des erreurs ou inexactitudes non substantielles des photographies ou des représentations graphiques des produits apparaissant sur le site Web.",
  },
  orderRejectionClause: {
    en: 'BAZISZT reserves the right not to accept an order from a Customer with whom it is in a dispute for a previous order, or if BAZISZT reasonably considers that this Customer has infringed these GTS or that he/she/it has been engaged in a fraudulent activity, or for any other legitimate reason.',
    fr: "BAZISZT se réserve le droit de ne pas accepter une commande d'un client avec lequel elle est en litige pour une commande précédente, ou si BAZISZT estime raisonnablement que ce client a enfreint les présentes CGV ou qu'il/elle a été impliqué(e) dans une activité frauduleuse, ou pour toute autre raison légitime.",
  },
  priceSectionTitle: {
    en: '5. PRICE',
    fr: '5. PRIX',
  },
  priceDetails: {
    en: 'The Prices of Products are expressed in Euros with also the possibility to pay in the following currencies Dollar US, Pounds Sterling, Dollar Canadian, Dollar Australian, Yuan, Yen, Won, Rouble Russian (on the basis of a daily conversion via the converter used for the Website) inclusive of taxes and excluding customs duties, for orders outside of the EU that shall be borne by the Customer. Outside of the cases of reimbursement made (i) in connection with exercising the right of withdrawal or for (ii) lack of conformity and hidden defects, BAZISZT shall not reimburse the VAT applied to purchases made on the Website (even in the event the Customer, after receipt of the Products, reships the Products for a third country outside of the European Union).',
    fr: "Les prix des produits sont exprimés en euros avec la possibilité de payer également dans les devises suivantes : Dollar US, Livre Sterling, Dollar Canadien, Dollar Australien, Yuan, Yen, Won, Rouble Russe (sur la base d'une conversion quotidienne via le convertisseur utilisé pour le site Web), taxes incluses et hors droits de douane, pour les commandes en dehors de l'UE, qui seront à la charge du client. En dehors des cas de remboursement effectués (i) dans le cadre de l'exercice du droit de rétractation ou pour (ii) non-conformité et vices cachés, BAZISZT ne remboursera pas la TVA appliquée aux achats effectués sur le site Web (même dans le cas où le client, après réception des produits, réexpédie les produits vers un pays tiers en dehors de l'Union Européenne).",
  },
  priceChangeNotice: {
    en: 'BAZISZT reserves the right to change at any time and without prior notice the prices of Products offered on the Website.',
    fr: 'BAZISZT se réserve le droit de modifier à tout moment et sans préavis les prix des produits proposés sur le site Web.',
  },
  productInvoiceBasis: {
    en: 'The Products are invoiced on the basis of tariffs displayed on the Website at the time when the order is placed, subject to availability of the Products.',
    fr: 'Les produits sont facturés sur la base des tarifs affichés sur le site Web au moment où la commande est passée, sous réserve de la disponibilité des produits.',
  },
  orderPaymentTerms: {
    en: 'All the orders are payable in Euros and must be settled immediately upon placing the order with the exception of the occasional “0-interest financing with 3 instalments” offers, duly announced and made available solely for orders exceeding €100.00 paid by Belgian or French credit card and to be delivered to these territories, and which shall consist in three monthly payments as of the first payment.',
    fr: 'Toutes les commandes sont payables en euros et doivent être réglées immédiatement lors de la passation de la commande, à l\'exception des offres occasionnelles de "financement à 0 % en 3 versements", dûment annoncées et disponibles uniquement pour les commandes supérieures à 100,00 € payées par carte de crédit belge ou française et livrées dans ces territoires, et qui se composeront de trois paiements mensuels à partir du premier paiement.',
  },
  partialOrderDebited: {
    en: 'In the event of unavailability of certain Products ordered (see Article 4 “Product availability”), only the price and shipping costs related to the available Products shall be debited.',
    fr: "En cas d'indisponibilité de certains Produits commandés (voir l'article 4 \"Disponibilité des Produits\"), seuls le prix et les frais d'expédition relatifs aux Produits disponibles seront débités.",
  },
  meansOfPayment: {
    en: 'MEANS OF PAYMENT',
    fr: 'MOYENS DE PAIEMENT',
  },
  paymentInstructions: {
    en: 'The customer can pay for their order as follows:',
    fr: 'Le client peut payer sa commande comme suit :',
  },
  paymentByCreditCard: {
    en: 'Payments by credit card',
    fr: 'Paiements par carte de crédit',
  },
  creditCardPaymentDetails: {
    en: 'Payment may be made by Visa, CB, Mastercard, or American Express credit cards. Payment is made on the secure site of the Company’s banking partner. The Customer’s banking data does not circulate unencrypted on the Internet and cannot be intercepted. They are not communicated to the Company.',
    fr: "Le paiement peut être effectué par cartes de crédit Visa, CB, Mastercard ou American Express. Le paiement est effectué sur le site sécurisé du partenaire bancaire de l'entreprise. Les données bancaires du client ne circulent pas de manière non cryptée sur Internet et ne peuvent être interceptées. Elles ne sont pas communiquées à l'entreprise.",
  },
  paymentByApp: {
    en: 'Payment by payment application',
    fr: 'Paiement par application de paiement',
  },
  paymentByAppDetails: {
    en: 'Payment can be made via Apple Pay (mobile) according to the terms and conditions of this application. The Customer is deemed to have accepted the terms and conditions and privacy policy of the chosen payment application.',
    fr: "Le paiement peut être effectué via Apple Pay (mobile) selon les termes et conditions de cette application. Le client est réputé avoir accepté les termes et conditions ainsi que la politique de confidentialité de l'application de paiement choisie.",
  },
  paymentByGiftCards: {
    en: 'Payment by gift cards',
    fr: 'Paiement par cartes-cadeaux',
  },
  purchaseOfGiftCards: {
    en: 'Purchase of gift cards on the Site',
    fr: 'Achat de cartes-cadeaux sur le Site',
  },
  giftCardsAvailability: {
    en: 'Gift cards are available for sale on the Site (hereinafter the “Gift Card(s)”).',
    fr: 'Les cartes-cadeaux sont disponibles à la vente sur le Site (ci-après les “Cartes-Cadeaux”).',
  },
  giftCardAmounts: {
    en: 'These Gift Cards will have predefined amounts to be selected by the Customer at the time of purchase.',
    fr: "Ces Cartes-Cadeaux auront des montants prédéfinis à sélectionner par le client au moment de l'achat.",
  },
  giftCardDelivery: {
    en: 'They will be sent to the Customer or the recipient of his/her choice by email.',
    fr: 'Elles seront envoyées au client ou au destinataire de son choix par email.',
  },
  giftCardConditions: {
    en: 'These Gift Cards are non-refundable and are valid only for purchases on the Site for a period of one (1) year from the date of activation.',
    fr: "Ces Cartes-Cadeaux ne sont pas remboursables et sont valables uniquement pour les achats sur le Site pendant une période d'un (1) an à partir de la date d'activation.",
  },
  giftCardDeactivation: {
    en: 'If the total amount of the Gift Card is used, the Gift Card is deactivated.',
    fr: 'Si le montant total de la Carte-Cadeau est utilisé, la Carte-Cadeau est désactivée.',
  },
  paymentWithGiftCards: {
    en: 'Payment with Gift Cards on the Site',
    fr: 'Paiement avec Cartes-Cadeaux sur le Site',
  },
  giftCardUsage: {
    en: 'The Gift Cards can be used on the Site by entering the Gift Card code provided in the confirmation email of the Gift Card purchased on the Site in the dedicated field.',
    fr: "Les Cartes-Cadeaux peuvent être utilisées sur le Site en entrant le code de la Carte-Cadeau fourni dans l'email de confirmation de la Carte-Cadeau achetée sur le Site dans le champ dédié.",
  },
  giftCardPartialPayment: {
    en: 'If the total amount of the Order exceeds the amount of the Gift Card, the remaining amount will be paid with the other means of payment proposed on the Site as described above.',
    fr: 'Si le montant total de la Commande dépasse le montant de la Carte-Cadeau, le montant restant sera payé avec les autres moyens de paiement proposés sur le Site comme décrit ci-dessus.',
  },
  giftCardRemainingAmount: {
    en: 'If the total amount of the Order is less than the amount of the Gift Card, the Customer will not have to make any additional payment and he will receive by email a new code corresponding to the remaining amount to be spent on the Gift Card, to be used on his next purchase on the Site. The validity date of this new code is identical to the original code.',
    fr: "Si le montant total de la Commande est inférieur au montant de la Carte-Cadeau, le Client n'aura pas à effectuer de paiement supplémentaire et il recevra par email un nouveau code correspondant au montant restant à dépenser sur la Carte-Cadeau, à utiliser lors de son prochain achat sur le Site. La date de validité de ce nouveau code est identique à celle du code original.",
  },
  refundWithGiftCard: {
    en: 'Refund of all or part of an Order paid for in whole or in part with a Gift Card',
    fr: "Remboursement total ou partiel d'une Commande payée en tout ou en partie avec une Carte-Cadeau",
  },
  refundWithGiftCardProcedure: {
    en: 'A Customer who has paid for all or part of an Order with a Gift Card shall be refunded for all or part of said Order as follows:',
    fr: "Un Client ayant payé tout ou une partie d'une Commande avec une Carte-Cadeau sera remboursé en tout ou en partie comme suit :",
  },
  refundAllGiftCard: {
    en: 'If all the Order has been paid with a Gift Card, the Company shall issue a new Gift Card in the form of a credit note for the amount of the returned item(s), subject to validation of the return by the Company’s warehouse (hereinafter the “Gift Card Credit”). This Gift Card Credit has the same validity period as the original Gift Card, except in the case where the Gift Card has already expired at the date of issue of the Gift Card Credit. In which case, the Gift Card Credit is valid for one (1) month. The Gift Card Credit is only valid for use on the Site.',
    fr: 'Si la totalité de la Commande a été réglée avec une Carte-Cadeau, la Société émettra une nouvelle Carte-Cadeau sous forme de note de crédit pour le montant des articles retournés, sous réserve de validation du retour par l’entrepôt de la Société (ci-après la “Carte-Cadeau Crédit”). Cette Carte-Cadeau Crédit a la même période de validité que la Carte-Cadeau originale, sauf si la Carte-Cadeau a déjà expiré à la date d’émission de la Carte-Cadeau Crédit. Dans ce cas, la Carte-Cadeau Crédit est valable pendant un (1) mois. La Carte-Cadeau Crédit est uniquement valable pour une utilisation sur le Site.',
  },
  refundPartialGiftCard: {
    en: 'If the Order was paid for in part with a Gift Card and partly with an additional payment method, and provided that the return of the relevant item(s) for which reimbursement is being sought has been declared compliant by the Company’s warehouse, the Customer will be reimbursed proportionally for the relevant item(s) on the different means of payment used, i.e.:',
    fr: 'Si la Commande a été réglée en partie avec une Carte-Cadeau et en partie avec un autre moyen de paiement, et sous réserve que le retour des articles concernés pour lesquels le remboursement est demandé ait été déclaré conforme par l’entrepôt de la Société, le Client sera remboursé proportionnellement pour les articles concernés sur les différents moyens de paiement utilisés, c’est-à-dire :',
  },
  refundGiftCardCredit: {
    en: 'The part related to the amount paid by the Customer for the relevant item(s) with the issuance of a Gift Card Credit of a value proportional to the amount initially paid with this payment method for said item(s); and',
    fr: 'La part relative au montant payé par le Client pour les articles concernés avec l’émission d’un Crédit Carte-Cadeau d’un montant proportionnel au montant initialement payé avec ce moyen de paiement pour ces articles ; et',
  },
  refundAdditionalPaymentMethod: {
    en: 'The remainder of the amount paid reimbursed with the additional payment method.',
    fr: 'Le reste du montant payé remboursé avec le moyen de paiement supplémentaire.',
  },
  giftCardCreditValidity: {
    en: 'This Gift Card Credit has the same validity period as the original Gift Card, except in the event that the Gift Card has already expired at the date of issue of the Gift Card Credit. In which case, the Gift Card Credit is valid for one (1) month. The Gift Card Credit is only valid for use on the Site.',
    fr: 'Ce Crédit de Carte Cadeau a la même période de validité que la Carte Cadeau originale, sauf si la Carte Cadeau a déjà expiré à la date d’émission du Crédit de Carte Cadeau. Dans ce cas, le Crédit de Carte Cadeau est valide pendant un (1) mois. Le Crédit de Carte Cadeau n’est valable que pour une utilisation sur le Site.',
  },
  reservationOfOwnership: {
    en: '6. RESERVATION OF OWNERSHIP',
    fr: '6. RÉSERVE DE PROPRIÉTÉ',
  },
  productsOwnership: {
    en: 'The ordered Products remain the property of BAZISZT until receipt of full payment of the price by BAZISZT. However, the Customer assumes the risk (namely of loss, theft or deterioration) regarding the Products delivered from the time that they are delivered to the address indicated at the time of the order.',
    fr: 'Les Produits commandés restent la propriété de BAZISZT jusqu’à la réception du paiement complet du prix par BAZISZT. Cependant, le Client assume le risque (notamment de perte, vol ou détérioration) concernant les Produits livrés à partir du moment où ils sont livrés à l’adresse indiquée au moment de la commande.',
  },
  deliveryTerms: {
    en: '7. TERMS AND CONDITIONS OF DELIVERY',
    fr: '7. CONDITIONS DE LIVRAISON',
  },
  handlingShippingCosts: {
    en: 'Handling and shipping costs depend on the country and the total amount of the order. They shall be indicated on the invoice.',
    fr: 'Les frais de traitement et de livraison dépendent du pays et du montant total de la commande. Ils seront indiqués sur la facture.',
  },
  customsResponsibility: {
    en: 'BAZISZT cannot be held responsible for any action and/or costs and/or taxes (which fall under the Customer’s responsibility) and/or delays due to customs over which it has no control.',
    fr: 'BAZISZT ne peut être tenu responsable de toute action et/ou coûts et/ou taxes (qui relèvent de la responsabilité du Client) et/ou délais dus aux douanes sur lesquels elle n’a aucun contrôle.',
  },
  preparationTime: {
    en: 'For all the Products, the order is prepared for departure from BAZISZT’s logistics warehouses within a maximum period of 3 working days (subject to stock availability and except for the special case of Products sold “on pre-order” for which the sheet indicates the specific estimated time of delivery) from confirmation by e-mail of the order. The average period between the placing of an order and its delivery is from 4 to 9 working days. This is an average period based on prior orders.',
    fr: 'Pour tous les Produits, la commande est préparée pour départ des entrepôts logistiques de BAZISZT dans un délai maximum de 3 jours ouvrés (sous réserve de disponibilité en stock et sauf pour les cas particuliers de Produits vendus en « précommande » pour lesquels la fiche indique le délai de livraison estimé spécifique) à compter de la confirmation par e-mail de la commande. Le délai moyen entre le placement d’une commande et sa livraison est de 4 à 9 jours ouvrés. Il s’agit d’un délai moyen basé sur des commandes précédentes.',
  },
  preOrderShippingTime: {
    en: 'By exception to the above mentioned time frames, “pre-order” transactions may be subject to shipping periods that might exceed the estimated shipping time. The estimated shipping time for “pre-order” transactions may be as long as 6 to 9 months as of the date of the order, as mentioned in the purchase process.',
    fr: 'Exception faite des délais mentionnés ci-dessus, les transactions en « précommande » peuvent être soumises à des délais de livraison pouvant dépasser le délai de livraison estimé. Le délai de livraison estimé pour les transactions en « précommande » peut aller jusqu’à 6 à 9 mois à partir de la date de la commande, comme mentionné dans le processus d’achat.',
  },
  deliveryExceedingPeriod: {
    en: 'Exceeding this estimated period may not give rise to any cancellation of the order, reduction in the price paid by the Customer, or to any damages. Customer is further informed that in some special cases (e.g. products marketed on “pre-order”), the periods indicated above can be longer. However, failure to deliver within a period of 30 days from the maximum estimated time of delivery, the Customer shall have the possibility to cancel the said order at no cost. The sums that he/she/it will have paid will then be reimbursed. In cases where it has the capacity to do so, BAZISZT reserves the possibility to offer the Customer a Product of equivalent quality and price as the initial product.',
    fr: 'Le dépassement de ce délai estimé ne pourra donner lieu à une annulation de la commande, une réduction du prix payé par le Client, ni à des dommages et intérêts. Le Client est également informé que dans certains cas particuliers (par exemple, les produits commercialisés en « précommande »), les délais indiqués peuvent être plus longs. Toutefois, en cas de non-livraison dans un délai de 30 jours à compter du délai estimé maximum, le Client pourra annuler la commande sans frais. Les sommes qu’il/elle aura versées seront alors remboursées. Dans la mesure du possible, BAZISZT se réserve la possibilité de proposer au Client un Produit de qualité et de prix équivalents à celui initialement commandé.',
  },
  multipleDeliveries: {
    en: 'If the order reaches a certain volume BAZISZT may send it to the Customer in several deliveries and/or several packages.',
    fr: 'Si la commande atteint un certain volume, BAZISZT peut l’envoyer au Client en plusieurs livraisons et/ou en plusieurs colis.',
  },
  shippingMethod: {
    en: 'Generally, all of the parcels are shipped via UPS. A delivery note is attached to the parcel. Customer is encouraged to keep it as it will serve as proof of delivery.',
    fr: 'En général, tous les colis sont expédiés via UPS. Un bon de livraison est joint au colis. Le Client est invité à le conserver car il servira de preuve de livraison.',
  },
  deliveryCompliance: {
    en: 'The Customer must check the compliance of the Products delivered at the time of the delivery and before signature of the carrier’s delivery note. He/she/it must indicate on this delivery note and in the form of handwritten reservations any defect concerning the delivery (damaged Product etc.). This verification is deemed achieved as soon as the Customer, or a person of his/her/its choice, has signed the delivery note. No claim regarding the condition of the parcel(s) will be admissible thereafter. In the event of reservations regarding the delivery, the Customer must also confirm them to the carrier at the latest within 3 working days following receipt of the article(s) and send a copy of this letter to BAZISZT by e-mail to the address together@baziszt.com with confirmation by registered letter with acknowledgement of receipt to Customer Service at the following address: SAS BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: "Le Client doit vérifier la conformité des Produits livrés au moment de la livraison et avant la signature du bon de livraison du transporteur. Il/elle doit indiquer sur ce bon de livraison et sous forme de réserves manuscrites tout défaut concernant la livraison (Produit endommagé, etc.). Cette vérification est considérée comme effectuée dès que le Client, ou une personne de son choix, a signé le bon de livraison. Aucune réclamation concernant l'état du ou des colis ne sera recevable par la suite. En cas de réserves concernant la livraison, le Client doit également les confirmer au transporteur au plus tard dans les 3 jours ouvrés suivant la réception des articles et envoyer une copie de cette lettre à BAZISZT par e-mail à l'adresse together@baziszt.com avec confirmation par lettre recommandée avec accusé de réception au Service Client à l'adresse suivante : SAS BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.",
  },
  incompleteAddress: {
    en: 'In the event of an incomplete address, incorrect address, inability to place the parcel in the Customer’s letterbox, refusal of the parcel by the recipient, lack of information making it impossible to deliver the Product to the recipient at the appointed time, BAZISZT cannot be held liable for the complete, final, completion of this delivery. If this lack of information leads to a second presentation to the recipient, BAZISZT shall be entitled to request that the Customer pay the corresponding fees for this second delivery.',
    fr: "En cas d'adresse incomplète, d'adresse incorrecte, d'impossibilité de placer le colis dans la boîte aux lettres du Client, de refus du colis par le destinataire, de manque d'informations rendant impossible la livraison du Produit au destinataire à l'heure convenue, BAZISZT ne peut être tenue responsable de la livraison complète et finale. Si ce manque d'informations entraîne une seconde présentation au destinataire, BAZISZT sera en droit de demander au Client de payer les frais correspondants à cette seconde livraison.",
  },
  deliveryTerms2: {
    en: 'The Customer is subject to the general terms of delivery of the carrier that, in some cases, if he/she/it does not submit to them can impact the quality of the delivery. Accordingly, in the event of absence of the recipient, according to the general terms of delivery of the carrier, the product may be presented again and/or left at an agreed drop-off point and/or in front of the Customer’s home and/or in a “sorting – pending” centre of the carrier and/or returned to BAZISZT who shall in no event be held responsible for any theft of, loss, or damage to the Products in connection with their delivery and, more generally, the final quality of the delivery.',
    fr: "Le Client est soumis aux conditions générales de livraison du transporteur qui, dans certains cas, s'il/elle ne s'y conforme pas, peuvent impacter la qualité de la livraison. En conséquence, en cas d'absence du destinataire, selon les conditions générales de livraison du transporteur, le produit peut être représenté et/ou laissé à un point de dépôt convenu et/ou devant la maison du Client et/ou dans un centre de « tri – en attente » du transporteur et/ou retourné à BAZISZT, qui ne pourra en aucun cas être tenu responsable de tout vol, perte ou dommage aux Produits en lien avec leur livraison et, plus généralement, de la qualité finale de la livraison.",
  },
  undeliverableReturn: {
    en: 'In the event that it is impossible to deliver and if the product must be returned to BAZISZT by the carrier, BAZISZT will not make any new delivery.',
    fr: "En cas d'impossibilité de livraison et si le produit doit être retourné à BAZISZT par le transporteur, BAZISZT ne procédera à aucune nouvelle livraison.",
  },
  returnClaim: {
    en: 'Any claim regarding the delivery of Products must be submitted in 14 working days following receipt of the Product(s) in the same conditions as mentioned above. If it is decided that the product(s) must be returned to BAZISZT, they must be sent in their original condition (packaging, accessories, etc.) and according to the following shipping conditions. The Customer must contact the customer service beforehand via e-mail at together@baziszt.com to obtain a return number to note on the “Return Authorisation” enclosed with the order as well as any information relating to the shipping. No parcel shall be accepted without a return number. This number must be written legibly with a marker pen on the parcel. The Product must be returned to BAZISZT - customer service - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: "Toute réclamation concernant la livraison des Produits doit être soumise dans un délai de 14 jours ouvrés suivant la réception des Produits, dans les mêmes conditions que celles mentionnées ci-dessus. Si il est décidé que les produits doivent être retournés à BAZISZT, ils doivent être envoyés dans leur état d'origine (emballage, accessoires, etc.) et selon les conditions d'expédition suivantes. Le Client doit contacter au préalable le service client par e-mail à together@baziszt.com pour obtenir un numéro de retour à noter sur l'« Autorisation de Retour » jointe à la commande ainsi que toute information relative à l'expédition. Aucun colis ne sera accepté sans un numéro de retour. Ce numéro doit être écrit de manière lisible avec un marqueur sur le colis. Le Produit doit être retourné à BAZISZT - service client - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.",
  },
  rightOfWithdrawal: {
    en: '8. RIGHT OF WITHDRAWAL',
    fr: '8. DROIT DE RÉTRACTATION',
  },
  rightOfWithdrawalDetails: {
    en: 'Pursuant to Articles L. 221-18 et seq. of the Consumer Code, the Customer has 14 days from the day of delivery of the Product purchased on the Website to inform the customer service of his/her/its desire to return the Product.',
    fr: 'Conformément aux Articles L. 221-18 et suivants du Code de la consommation, le Client dispose de 14 jours à compter du jour de la livraison du Produit acheté sur le Site pour informer le service client de son souhait de retourner le Produit.',
  },
  returnShipmentFees: {
    en: 'The customer is responsible for all fees related to the return shipment.',
    fr: "Le client est responsable de tous les frais liés au retour de l'envoi.",
  },
  returnProcedure: {
    en: 'For any return, the Customer shall i) use the return form enclosed in the delivery packing or ii) contact customer service via e-mail together@baziszt.com to inform it of his/her/its decision to use his/her/its right of withdrawal. Any parcel returned after the prescribed timeframe shall be refused and returned to the sender. No parcel returned as cash on delivery shipping shall be accepted, whatever the reason. The costs and risks pertaining to the return of Products are borne by the sender. In order for the customer service to accept the exchange and/or reimbursement, the Product must be returned in full condition in its original packing, undamaged, with its label attached, not worn, accompanied by all of its accessories, and a copy of the purchase invoice to BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE. The Customer shall not have to justify the reasons or pay penalties, with the exception of return costs.',
    fr: 'Pour tout retour, le Client doit i) utiliser le formulaire de retour inclus dans l’emballage de livraison ou ii) contacter le service client par e-mail à together@baziszt.com pour l’informer de sa décision d’exercer son droit de rétractation. Tout colis retourné après le délai prescrit sera refusé et renvoyé à l’expéditeur. Aucun colis retourné en port dû ne sera accepté, quelle qu’en soit la raison. Les coûts et risques liés au retour des Produits sont à la charge de l’expéditeur. Afin que le service client accepte l’échange et/ou le remboursement, le Produit doit être retourné en parfait état dans son emballage d’origine, non endommagé, avec son étiquette attachée, non porté, accompagné de tous ses accessoires et d’une copie de la facture d’achat à BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE. Le Client n’aura pas à justifier les raisons ou à payer des pénalités, à l’exception des frais de retour.',
  },
  parcelResponsibility: {
    en: 'BAZISZT cannot be held responsible in the event of loss, theft, or damage of the parcel.',
    fr: 'BAZISZT ne peut être tenu responsable en cas de perte, de vol ou de dommages du colis.',
  },
  parcelIdentification: {
    en: 'Parcels for which the Customer’s identification (surname, first name, address, and return code) is not possible shall be refused.',
    fr: 'Les colis pour lesquels l’identification du Client (nom, prénom, adresse et code de retour) est impossible seront refusés.',
  },
  returnTracking: {
    en: 'Any return must be made by a traceable method (UPS, FEDEX, DHL, return receipt requested, etc.) and the tracking number must be provided to BAZISZT.',
    fr: 'Tout retour doit être effectué par une méthode traçable (UPS, FEDEX, DHL, accusé de réception, etc.) et le numéro de suivi doit être fourni à BAZISZT.',
  },
  returnReceiptConfirmation: {
    en: 'On receipt of the Product returned by the Customer, the customer service shall send a confirmation of receipt of the Product by e-mail.',
    fr: 'À réception du Produit retourné par le Client, le service client enverra une confirmation de réception du Produit par e-mail.',
  },
  reimbursementPolicy: {
    en: 'In the event the Customer makes a valid use of this right, BAZISZT shall reimburse the Customer for the sums paid corresponding to the acquisition of the returned Products (therefore excluding potential customs duties), within a maximum period of 14 days by bank transfer into the account used with the credit card bearing the Customer’s name.',
    fr: 'Dans le cas où le Client exerce valablement ce droit, BAZISZT remboursera le Client des sommes payées correspondant à l’acquisition des Produits retournés (à l’exclusion des éventuels droits de douane), dans un délai maximum de 14 jours par virement bancaire sur le compte utilisé avec la carte de crédit au nom du Client.',
  },
  deliveryCostReimbursement: {
    en: 'BAZISZT undertakes to reimburse the standard delivery costs including the tracking of the parcel. For that purpose, the Customer shall insert the delivery invoice indicating the parcel tracking number into the return parcel.',
    fr: 'BAZISZT s’engage à rembourser les frais de livraison standard incluant le suivi du colis. À cette fin, le Client doit insérer la facture de livraison indiquant le numéro de suivi du colis dans le colis de retour.',
  },
  statutoryWarranties: {
    en: '9. STATUTORY WARRANTIES',
    fr: '9. GARANTIES LÉGALES',
  },
  warrantyConditions: {
    en: 'The Products sold by BAZISZT are subject to the conditions of statutory warranties provided by Articles L.217-4 to L.217-14 of the Consumer Code as well as by Articles 1641 through 1648 of the Civil Code, to the exclusion of any other warranties.',
    fr: 'Les Produits vendus par BAZISZT sont soumis aux conditions des garanties légales prévues par les Articles L.217-4 à L.217-14 du Code de la consommation ainsi que par les Articles 1641 à 1648 du Code civil, à l’exclusion de toute autre garantie.',
  },
  productComplaintRefusal: {
    en: 'BAZISZT shall refuse any complaint for Products that have been used contrary to their intended use.',
    fr: 'BAZISZT refusera toute réclamation concernant des Produits ayant été utilisés de manière contraire à leur usage prévu.',
  },
  productComplaintSubmission: {
    en: 'Any complaint regarding the Products in their current form and without relation to the delivery must be submitted by e-mail to the address together@baziszt.com followed by a written confirmation sent by registered letter with acknowledgement of receipt to the customer service at the following address: BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: 'Toute réclamation concernant les Produits dans leur état actuel et sans rapport avec la livraison doit être soumise par e-mail à l’adresse together@baziszt.com suivie d’une confirmation écrite envoyée par lettre recommandée avec accusé de réception au service client à l’adresse suivante : BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
  },
  warrantyOfConformity: {
    en: 'Statutory warranty of conformity:',
    fr: 'Garantie légale de conformité :',
  },
  warrantyOfConformityDetails: {
    en: 'BAZISZT shall deliver to the Customer a Product that complies with the contract and which is exempt from conformity defects at the time of the delivery of said Product, to the extent that the Product shall be fit for the use normally expected of similar goods and that it shall have the characteristics featured during the sale. BAZISZT is also liable for conformity defects resulting from the packaging, assembly, or installation instructions provided such liability as agreed by contract or such processes where made under its responsibility.',
    fr: 'BAZISZT livrera au Client un Produit conforme au contrat et exempt de défauts de conformité au moment de la livraison dudit Produit, dans la mesure où le Produit sera apte à l’usage normalement attendu de biens similaires et qu’il présentera les caractéristiques annoncées lors de la vente. BAZISZT est également responsable des défauts de conformité résultant de l’emballage, du montage ou des instructions d’installation, lorsque cette responsabilité est convenue par contrat ou que ces processus ont été réalisés sous sa responsabilité.',
  },
  warrantyAgainstHiddenDefects: {
    en: 'Statutory warranty against hidden defects:',
    fr: 'Garantie légale contre les vices cachés :',
  },
  warrantyAgainstHiddenDefectsDetails: {
    en: 'BAZISZT shall ship to the Customer a Product free of hidden defects that would make it unfit for the use for which it was intended, or that substantially decreases this use, that he/she/it would not have acquired it or would have paid a lower price if he/she/it had been aware of them.',
    fr: 'BAZISZT expédiera au Client un Produit exempt de vices cachés qui le rendraient impropre à l’usage auquel il est destiné, ou qui diminueraient substantiellement cet usage, au point qu’il/elle ne l’aurait pas acquis ou en aurait payé un prix inférieur s’il/elle en avait eu connaissance.',
  },
  warrantyTimeframe: {
    en: 'These guarantees shall apply provided that the Customer makes the request within a period of 24 months following the delivery of the Product (for the statutory warranty of conformity) or the discovery of the defect (for the statutory warranty of hidden defects).',
    fr: 'Ces garanties s’appliquent à condition que le Client fasse la demande dans un délai de 24 mois suivant la livraison du Produit (pour la garantie légale de conformité) ou la découverte du défaut (pour la garantie légale contre les vices cachés).',
  },
  conformityDefectsPresumption: {
    en: 'Conformity defects that appear within a period of 24 months from delivery are presumed to exist at the time of delivery, unless proven otherwise.',
    fr: 'Les défauts de conformité qui apparaissent dans un délai de 24 mois à compter de la livraison sont présumés exister au moment de la livraison, sauf preuve contraire.',
  },
  nonConformityOptions: {
    en: 'In the event of an actual non-conformity on a Product sold by BAZISZT, the Customer may choose between the Product being repaired or replaced unless one of these choices is commercially unreasonable for BAZISZT. If the repair or the replacement of the Product is impossible, the Customer may be reimbursed and shall return the Product or keep the Product and have a part of the price reimbursed to him/her/it, unless the conformity defect is minor.',
    fr: 'En cas de non-conformité avérée sur un Produit vendu par BAZISZT, le Client peut choisir entre la réparation ou le remplacement du Produit, sauf si l’un de ces choix est déraisonnable d’un point de vue commercial pour BAZISZT. Si la réparation ou le remplacement du Produit est impossible, le Client peut être remboursé et doit retourner le Produit ou conserver le Produit et se faire rembourser une partie du prix, sauf si le défaut de conformité est mineur.',
  },
  hiddenDefectOptions: {
    en: 'In the event of an actual hidden defect on a Product sold by BAZISZT, the Customer shall have the choice of returning the Product and having the price and costs incurred by the sale refunded or keeping the Product and having a part of the price returned to him/her/it.',
    fr: 'En cas de vice caché avéré sur un Produit vendu par BAZISZT, le Client a le choix de retourner le Produit et de se faire rembourser le prix et les frais engagés lors de l’achat ou de conserver le Produit et de se faire rembourser une partie du prix.',
  },
  customerProofOfGuarantee: {
    en: 'In any event, it shall be up to the Customer to prove that he/she/it fulfills the conditions of the guarantee properly.',
    fr: 'En tout état de cause, il appartient au Client de prouver qu’il/elle remplit correctement les conditions de la garantie.',
  },
  returnReplacementReimbursement: {
    en: 'The return, replacement, or reimbursement of the Product shall occur without costs for the Customer and shall not prevent potential damages where applicable.',
    fr: 'Le retour, le remplacement ou le remboursement du Produit s’effectuera sans frais pour le Client et n’exclut pas d’éventuels dommages et intérêts, le cas échéant.',
  },
  returnProcedureWithNumber: {
    en: 'In the case of lack of conformity and/or hidden defects admitted by BAZISZT, should the Customer choose to return the Product, he/she/it shall ship it to the following address: BAZISZT – customer service - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE. The Customer must obtain beforehand a return number as well as any details relating to shipping from the customer service, to be contacted via e-mail at together@baziszt.com. No parcel shall be accepted without a return number. This number must be written legibly with a marker pen on the parcel.',
    fr: 'En cas de défaut de conformité et/ou de vices cachés reconnus par BAZISZT, si le Client choisit de retourner le Produit, il/elle devra l’expédier à l’adresse suivante : BAZISZT – service client - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE. Le Client doit obtenir au préalable un numéro de retour ainsi que toutes les précisions relatives à l’expédition auprès du service client, à contacter par e-mail à together@baziszt.com. Aucun colis ne sera accepté sans numéro de retour. Ce numéro doit être inscrit lisiblement au marqueur sur le colis.',
  },
  afterSalesService: {
    en: '10. AFTER-SALES SERVICE AND AVAILABILITY OF SPARE PARTS',
    fr: '10. SERVICE APRÈS-VENTE ET DISPONIBILITÉ DES PIÈCES DÉTACHÉES',
  },
  repairService: {
    en: 'Any Product that can be technically repaired benefits from an after-sales service for a fee. For any repair request, the Customer must directly contact the customer service via e-mail at: together@baziszt.com.',
    fr: 'Tout Produit techniquement réparable bénéficie d’un service après-vente moyennant des frais. Pour toute demande de réparation, le Client doit directement contacter le service client par e-mail à : together@baziszt.com.',
  },
  sparePartsAvailability: {
    en: 'In accordance with Article L 111-3 paragraph 1 of the French Consumer Code, BAZISZT makes no warranty regarding the availability period of spare parts that are essential for the use of the Products. BAZISZT shall nonetheless make its best efforts to satisfy its Customers in the event of a request for one or several spare parts.',
    fr: 'Conformément à l’Article L 111-3 paragraphe 1 du Code de la consommation français, BAZISZT ne donne aucune garantie quant à la durée de disponibilité des pièces détachées indispensables à l’utilisation des Produits. BAZISZT s’efforcera néanmoins de satisfaire ses Clients en cas de demande d’une ou plusieurs pièces détachées.',
  },
  limitationOfLiability: {
    en: '11. LIMITATION OF LIABILITY',
    fr: '11. LIMITATION DE RESPONSABILITÉ',
  },
  liabilityExclusion: {
    en: 'In no event may BAZISZT be held liable for any damage which does not result from a failure by BAZISZT to honor one of its obligations.',
    fr: 'En aucun cas BAZISZT ne peut être tenu responsable de tout dommage qui ne résulte pas d’un manquement de BAZISZT à l’une de ses obligations.',
  },
  personalData: {
    en: '12. PERSONAL DATA',
    fr: '12. DONNÉES PERSONNELLES',
  },
  customerRegistration: {
    en: 'When the Customer registers on the ',
    fr: 'Lorsque le Client s’inscrit sur le ',
  },
  personalInformationCollection: {
    en: ', BAZISZT collects personal information (personal data, e-mail address, gender, etc.) via the registration form in order to offer him/her/it accessible services in the reserved access areas of BAZISZT. The filling in of personal information is essential for the processing and delivery of his/her/its orders.',
    fr: ', BAZISZT collecte des informations personnelles (données personnelles, adresse e-mail, sexe, etc.) via le formulaire d’inscription afin de lui proposer des services accessibles dans les espaces réservés de BAZISZT. Le renseignement des informations personnelles le concernant est essentiel au traitement et à la livraison de ses commandes.',
  },
  orderProcess2: {
    en: 'The order process on the ',
    fr: 'Le processus de commande sur le ',
  },
  customerAccountCreation: {
    en: ' Website requires the creation of a Customer account in which his/her/its information is stored and protected by a password chosen by the Customer. This information is strictly confidential and intended for BAZISZT exclusively. It shall be processed in strict compliance with the provisions of Data Protection Act No. 78-17 of 6 January 1978 and the regulation (EU) 2016/679, General Data Protection Regulation (GDPR).',
    fr: ' Site nécessite la création d’un compte Client dans lequel ses informations sont stockées et protégées par un mot de passe choisi par le Client. Ces informations sont strictement confidentielles et destinées exclusivement à BAZISZT. Elles seront traitées dans le strict respect des dispositions de la Loi Informatique et Libertés n° 78-17 du 6 janvier 1978 et du règlement (UE) 2016/679, règlement général sur la protection des données (RGPD).',
  },
  dataProtectionCommitments: {
    en: 'In this respect, BAZISZT notably undertakes to: (i) guarantee the confidentiality of personal data processed in the framework hereof by implementing the appropriate security measures in its field of activity, (ii) ensure that the persons authorized to process personal data in virtue hereof undertake to respect confidentiality or are subject to an appropriate legal obligation of confidentiality and receive the necessary training regarding the protection of personal data, and (iii) ensure that its potential subcontractors respect the legal obligations on behalf of and according to the instructions of BAZISZT.',
    fr: 'À ce titre, BAZISZT s’engage notamment à : (i) garantir la confidentialité des données à caractère personnel traitées dans le cadre des présentes en mettant en œuvre les mesures de sécurité appropriées dans son domaine d’activité, (ii) veiller à ce que les personnes autorisées à traiter les données à caractère personnel en vertu des présentes s’engagent à respecter la confidentialité ou soient soumises à une obligation légale appropriée de confidentialité et reçoivent la formation nécessaire à la protection des données à caractère personnel, et (iii) veiller à ce que ses éventuels sous-traitants respectent les obligations légales au nom et selon les instructions de BAZISZT.',
  },
  customerDataRights: {
    en: 'The Customer shall at all times have a right of access, amendment, rectification, and deletion of his/her/its data. To exercise this right, he/she/it may present a request to BAZISZT by e-mail to the address together@baziszt.com or by letter to the following address: BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: 'Le Client dispose à tout moment d’un droit d’accès, de modification, de rectification et de suppression de ses données. Pour exercer ce droit, il/elle peut adresser une demande à BAZISZT par e-mail à l’adresse together@baziszt.com ou par lettre à l’adresse suivante : BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
  },
  optInMarketing: {
    en: 'Subject to validation by an “opt-in” of the Customer, personal information (personal data, e-mail address, gender, etc.) can also be used by BAZISZT and/or its partners for marketing purposes like the sending of newsletters or requests.',
    fr: 'Sous réserve de la validation par un « opt-in » du Client, les informations personnelles (données personnelles, adresse e-mail, sexe, etc.) peuvent également être utilisées par BAZISZT et/ou ses partenaires à des fins marketing comme l’envoi de newsletters ou de sollicitations.',
  },
  cookieUsage: {
    en: 'The Website uses cookies in order to best satisfy and customize the Customer’s requirements. The purpose of the cookie is to indicate that you have visited the Website.',
    fr: 'Le Site utilise des cookies afin de mieux répondre et personnaliser les besoins du Client. Le cookie a pour but d’indiquer que vous avez visité le Site.',
  },
  dataPolicyAccess: {
    en: 'The personal data management policy of BAZISZT can be accessed on the Website.',
    fr: 'La politique de gestion des données personnelles de BAZISZT est accessible sur le Site.',
  },
  intellectualProperty: {
    en: '13. INTELLECTUAL PROPERTY',
    fr: '13. PROPRIÉTÉ INTELLECTUELLE',
  },
  intellectualPropertyContent: {
    en: 'All documents, information, texts, graphs, images, photographs or any other content published on the ',
    fr: 'Tous les documents, informations, textes, graphiques, images, photographies ou tout autre contenu publié sur le ',
  },
  intellectualPropertyRights: {
    en: ' Website content is the exclusive property of BAZISZT. Consequently, it may not be reproduced, exploited, or used for any purpose whatsoever, without the express authorization of the publication manager.',
    fr: ' Le contenu du Site est la propriété exclusive de BAZISZT. Par conséquent, il ne peut être reproduit, exploité ou utilisé à quelque fin que ce soit, sans l’autorisation expresse du responsable de la publication.',
  },
  intellectualPropertyOwnership: {
    en: 'BAZISZT is the owner of all the intellectual property (with the exception of authors’ moral rights) pertaining to Products and distinctive trademarks and signs under which the Products are marketed.',
    fr: 'BAZISZT est propriétaire de tous les droits de propriété intellectuelle (à l’exception des droits moraux des auteurs) relatifs aux Produits et aux marques et signes distinctifs sous lesquels les Produits sont commercialisés.',
  },
  intellectualPropertyAcknowledgement: {
    en: 'The Customer acknowledges without reservations the intellectual property rights of BAZISZT and undertakes not to infringe them in any manner howsoever. More specifically, the Customer expressly undertakes not to manufacture, sell, provide a licence or market in any manner howsoever, directly or through a third party, for its benefit or the benefit of a third party, the Products, imitations or reproductions of the Products or the intellectual property rights pertaining to the Products and trademarks belonging to BAZISZT.',
    fr: 'Le Client reconnaît sans réserve les droits de propriété intellectuelle de BAZISZT et s’engage à ne pas y porter atteinte de quelque manière que ce soit. Plus précisément, le Client s’engage expressément à ne pas fabriquer, vendre, accorder une licence ou commercialiser de quelque manière que ce soit, directement ou par l’intermédiaire d’un tiers, à son profit ou au profit d’un tiers, les Produits, imitations ou reproductions des Produits ou les droits de propriété intellectuelle relatifs aux Produits et marques appartenant à BAZISZT.',
  },
  forceMajeureDefinition: {
    en: '"Force majeure" means all external unforeseeable and unavoidable circumstances, beyond the reasonable control of the party which is suffering a force majeure case.',
    fr: 'La "force majeure" désigne toutes les circonstances extérieures, imprévisibles et inévitables, échappant au contrôle raisonnable de la partie subissant un cas de force majeure.',
  },
  forceMajeureDetails: {
    en: 'In the situation where BAZISZT is prevented or delayed by a force majeure case in honoring its commitments, BAZISZT undertakes to inform the Customer within 96 hours by specifying the exact elements constituting the force majeure and the reasonably foreseeable period of delay or prevention. BAZISZT shall then be exempt from liability in connection with the non-performance or delay in performance of its obligations but undertakes to use its best efforts to resume full performance without further delay. In such a case of force majeure, BAZISZT may exercise its discretionary right to terminate the order or any part thereof, without being held liable, except however that BAZISZT shall be responsible to reimburse the Customer for any amounts already paid. In no event shall the Customer invoke a case of force majeure to release himself/herself/itself even temporarily from an obligation to pay a sum of money.',
    fr: 'Dans le cas où BAZISZT est empêché ou retardé par un cas de force majeure dans l’exécution de ses engagements, BAZISZT s’engage à informer le Client dans un délai de 96 heures en précisant les éléments exacts constituant la force majeure et la période de retard ou de prévention raisonnablement prévisible. BAZISZT sera alors exonéré de toute responsabilité en lien avec la non-exécution ou le retard dans l’exécution de ses obligations, mais s’engage à faire de son mieux pour reprendre l’exécution complète sans autre retard. En cas de force majeure, BAZISZT pourra exercer son droit discrétionnaire de résilier la commande ou une partie de celle-ci, sans être tenu responsable, sauf que BAZISZT sera responsable de rembourser le Client pour toute somme déjà payée. En aucun cas le Client ne pourra invoquer un cas de force majeure pour se libérer, même temporairement, d’une obligation de payer une somme d’argent.',
  },
  governingLawDisputes: {
    en: '15. GOVERNING LAW – DISPUTES',
    fr: '15. LOI APPLICABLE – LITIGES',
  },
  governingLaw: {
    en: 'These GTS shall be governed and interpreted in accordance with French law. The language of this contract is French.',
    fr: 'Les présentes CGV sont régies et interprétées conformément au droit français. La langue de ce contrat est le français.',
  },
  disputeResolution: {
    en: 'In the event of a dispute, the French courts shall have sole jurisdiction. However, in accordance with Regulation EC 593/2008 of 17 June 2008, these GTS do not prevent the application of more favorable mandatory non-waivable provisions to the Customer, as may be applicable based on the Customer’s normal place of residence.',
    fr: 'En cas de litige, les tribunaux français auront compétence exclusive. Cependant, conformément au Règlement CE 593/2008 du 17 juin 2008, les présentes CGV n’empêchent pas l’application de dispositions impératives plus favorables et non dérogeables au Client, et pouvant s’appliquer en fonction du lieu de résidence habituel du Client.',
  },
  mediationProcedure: {
    en: 'In the event of a dispute arising in connection with the performance and/or the interpretation of these GTS, the Customer may submit such dispute to a contractually-agreed mediation procedure or any other alternative dispute resolution procedure. Pursuant to Ordinance No. 2015-1033 of 20 August 2015 and to the application decree No. 2015-1382 of 30 October 2015, any consumer dispute or litigation, subject to Article L.612-2 of the Consumer Code, may be the subject of an amicable settlement by mediation through the CMAP - Paris Centre of Mediation and Arbitration. In order to bring a complaint before the mediator, the Customer may (i) fill in the form on the CMAP website',
    fr: 'En cas de litige relatif à l’exécution et/ou à l’interprétation des présentes CGV, le Client peut soumettre ce litige à une procédure de médiation contractuellement convenue ou à toute autre procédure de règlement alternatif des litiges. Conformément à l’Ordonnance n° 2015-1033 du 20 août 2015 et au décret d’application n° 2015-1382 du 30 octobre 2015, tout litige ou différend de consommation, sous réserve de l’article L.612-2 du Code de la consommation, peut faire l’objet d’un règlement amiable par médiation via le CMAP - Centre de Médiation et d’Arbitrage de Paris. Pour déposer une réclamation auprès du médiateur, le Client peut (i) remplir le formulaire sur le site du CMAP',
  },
  mediationContact: {
    en: ', tab "you are: a consumer", (ii) send his/her/its request by first-class mail or registered letter to: CMAP - Médiation Consommation, 39 avenue Franklin D. Roosevelt, 75008 PARIS, or (iii) send an e-mail to',
    fr: ', onglet "vous êtes : un consommateur", (ii) envoyer sa demande par courrier ordinaire ou recommandé à : CMAP - Médiation Consommation, 39 avenue Franklin D. Roosevelt, 75008 PARIS, ou (iii) envoyer un e-mail à',
  },
  mediationRequestDetails: {
    en: '. Irrespective of the means used to contact CMAP, the Customer’s request must contain the following elements in order to be processed rapidly: his/her/its postal address, e-mail address, and telephone number, as well as the full name and address of BAZISZT, a clear statement of the facts, and proof of previous steps taken with BAZISZT.',
    fr: '. Quel que soit le moyen utilisé pour contacter le CMAP, la demande du Client doit contenir les éléments suivants afin d’être traitée rapidement : son adresse postale, adresse e-mail et numéro de téléphone, ainsi que le nom complet et l’adresse de BAZISZT, un exposé clair des faits, et la preuve des démarches préalables effectuées auprès de BAZISZT.',
  },
  disputeRegulation: {
    en: 'Notwithstanding the foregoing, in the case of a dispute, in accordance with Regulation No. 1215/2012 of 12 December 2012:',
    fr: 'Nonobstant ce qui précède, en cas de litige, conformément au Règlement n° 1215/2012 du 12 décembre 2012:',
  },
  customerCourtChoice: {
    en: 'The Customer may bring the matter before the competent court of his/her/its domicile or the French courts,',
    fr: 'Le Client peut porter l’affaire devant le tribunal compétent de son domicile ou les tribunaux français,',
  },
  bazisztCourtChoice: {
    en: 'BAZISZT may bring the matter before the court of the Customer’s domicile.',
    fr: 'BAZISZT peut porter l’affaire devant le tribunal du domicile du Client.',
  },
  privacyPolicy: {
    en: 'PRIVACY POLICY',
    fr: 'POLITIQUE DE CONFIDENTIALITÉ',
  },
  controller1: {
    en: '1. CONTROLLER',
    fr: '1. RESPONSABLE DU TRAITEMENT',
  },
  controller1_1: {
    en: '1.1 The controller is BAZISZT SAS, whose head office is located at 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE (hereinafter « BAZISZT »). BAZISZT – and its service providers acting on its behalf – determines the purposes, the technical and juridical means of the data processing and commits to take all necessary measures to ensure that the processing is compliant with the provisions of Data Protection Act of January 6, 1978 modified by the law of August 6, 2004 (hereinafter “the Law”) and the regulation (EU) 2016/679 of April 26, 2016, general regulation on data protection (hereinafter “GDPR”).',
    fr: '1.1 Le responsable du traitement est BAZISZT SAS, dont le siège social est situé au 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE (ci-après « BAZISZT »). BAZISZT – et ses prestataires agissant en son nom – détermine les finalités, les moyens techniques et juridiques du traitement des données et s’engage à prendre toutes les mesures nécessaires pour garantir que le traitement soit conforme aux dispositions de la loi Informatique et Libertés du 6 janvier 1978 modifiée par la loi du 6 août 2004 (ci-après « la Loi ») et au règlement (UE) 2016/679 du 26 avril 2016, règlement général sur la protection des données (ci-après « RGPD »).',
  },
  controller1_2: {
    en: '1.2 BAZISZT is free to choose any natural or legal person to process the User’s personal data at its request and on its behalf (hereinafter « the processor »). BAZISZT commits to select processors providing sufficient guarantees regarding technical and organizational security measures of the personal data processing.',
    fr: '1.2 BAZISZT est libre de choisir toute personne physique ou morale pour traiter les données personnelles de l’Utilisateur à sa demande et en son nom (ci-après « le sous-traitant »). BAZISZT s’engage à sélectionner des sous-traitants offrant des garanties suffisantes concernant les mesures de sécurité techniques et organisationnelles du traitement des données personnelles.',
  },
  personalDataProcessing2: {
    en: '2. PERSONAL DATA PROCESSING',
    fr: '2. TRAITEMENT DES DONNÉES PERSONNELLES',
  },
  personalDataProcessing2_1: {
    en: '2.1 The use of the Website, the access to specific pages and / or all information or services requested by the website User may lead to the communication of personal data. The processing of those data by BAZISZT, as controller, and/or by the processors acting on BAZISZT behalf, shall be compliant to the Law and the GDPR Regulation.',
    fr: '2.1 L’utilisation du site web, l’accès à des pages spécifiques et / ou toutes les informations ou services demandés par l’Utilisateur du site peuvent entraîner la communication de données personnelles. Le traitement de ces données par BAZISZT, en tant que responsable du traitement, et/ou par les sous-traitants agissant au nom de BAZISZT, doit être conforme à la Loi et au Règlement RGPD.',
  },
  personalDataProcessing2_2: {
    en: '2.2 The purpose of this Privacy Policy is to inform the User, before accessing specific pages of the Website and communicating its personal data, about the way BAZISZT processes its data. The User shall be aware of this Privacy Policy before providing personal data by filling the forms provided in that respect in the different pages of the Website.',
    fr: '2.2 Le but de cette politique de confidentialité est d’informer l’Utilisateur, avant d’accéder à des pages spécifiques du site web et de communiquer ses données personnelles, sur la manière dont BAZISZT traite ses données. L’Utilisateur doit avoir pris connaissance de cette politique de confidentialité avant de fournir des données personnelles en remplissant les formulaires prévus à cet effet sur les différentes pages du site web.',
  },
  personalDataProcessing2_3: {
    en: '2.3 The personal data will be processed mainly in an automated manner, with procedures linked to the purposes described in point 3. BAZISZT cares that User’s personal data are processed safely and in confidentiality and takes all necessary measures to avoid loss, misuse, deterioration, or deletion of the personal data.',
    fr: '2.3 Les données personnelles seront principalement traitées de manière automatisée, selon des procédures liées aux finalités décrites au point 3. BAZISZT veille à ce que les données personnelles de l’Utilisateur soient traitées en toute sécurité et confidentialité, et prend toutes les mesures nécessaires pour éviter la perte, l’utilisation abusive, la détérioration ou la suppression des données personnelles.',
  },
  personalDataProcessing2_4: {
    en: '2.4 BAZISZT also collects User’s specific personal data in order to recognize him/her and offer him/her an optimal and personalized use experience. This collection also aims to correct potential mistakes in the Website. The collected data concern the User’s connection (IP address, geographical zone, day and hour of connection, pages viewed and / or used, etc.) as well as the equipment from where the connection occurred.',
    fr: '2.4 BAZISZT collecte également des données personnelles spécifiques à l’Utilisateur afin de le reconnaître et de lui offrir une expérience d’utilisation optimale et personnalisée. Cette collecte vise également à corriger les éventuelles erreurs du site web. Les données collectées concernent la connexion de l’Utilisateur (adresse IP, zone géographique, jour et heure de connexion, pages consultées et / ou utilisées, etc.) ainsi que l’équipement à partir duquel la connexion a eu lieu.',
  },
  personalDataProcessing2_5: {
    en: '2.5 The Website, to better meet the needs of the User and personalize them, makes use of cookies. The purpose of the cookie is to signal your visit to the Website.',
    fr: '2.5 Le site web, afin de mieux répondre aux besoins de l’Utilisateur et de les personnaliser, utilise des cookies. L’objectif du cookie est de signaler votre visite sur le site web.',
  },
  personalDataProcessing2_6: {
    en: '2.6 Any failure, partial or inaccurate information on personal data, indicated by an asterisk, and therefore necessary for the performance of the requested service, makes it impossible to carry out. On the other hand, any failure, partial or inaccurate information on optional personal data has no consequence.',
    fr: '2.6 Toute absence, inexactitude ou information partielle concernant les données personnelles, indiquées par un astérisque, et donc nécessaires à l’exécution du service demandé, rend son exécution impossible. En revanche, toute absence, inexactitude ou information partielle concernant des données personnelles facultatives n’a aucune conséquence.',
  },
  purposesOfPersonalDataProcessing3: {
    en: '3. PURPOSES OF PERSONAL DATA PROCESSING',
    fr: '3. FINALITÉS DU TRAITEMENT DES DONNÉES PERSONNELLES',
  },
  purposesOfPersonalDataProcessing3_1: {
    en: 'The User’s personal data are processed in order to process and deliver his/her orders. The order process on the Website www.baziszt.com requires the creation of a Customer account in which his/her information is stored and protected by a password chosen by the Customer. Subject to validation by an “opt-in” of the Customer, personal information (personal data, e-mail address, gender, etc.…) can also be used by BAZISZT and/or its partners for marketing purposes like the sending of newsletters or requests.',
    fr: 'Les données personnelles de l’Utilisateur sont traitées afin de traiter et livrer ses commandes. Le processus de commande sur le site www.baziszt.com nécessite la création d’un compte Client dans lequel ses informations sont stockées et protégées par un mot de passe choisi par le Client. Sous réserve de la validation par un « opt-in » du Client, les informations personnelles (données personnelles, adresse e-mail, sexe, etc.) peuvent également être utilisées par BAZISZT et/ou ses partenaires à des fins marketing telles que l’envoi de newsletters ou de demandes.',
  },
  personalDataLikelyToBeProcessed4: {
    en: '4. PERSONAL DATA LIKELY TO BE PROCESSED',
    fr: '4. DONNÉES PERSONNELLES SUSCEPTIBLES D’ÊTRE TRAITÉES',
  },
  personalDataLikelyToBeProcessed4_1: {
    en: 'The information given by the User while filling the forms or creating his/her account are collected and processed. This information includes the User’s name, gender, size, address, email, and phone number.',
    fr: 'Les informations fournies par l’Utilisateur lors du remplissage des formulaires ou de la création de son compte sont collectées et traitées. Ces informations incluent le nom, le sexe, la taille, l’adresse, l’e-mail et le numéro de téléphone de l’Utilisateur.',
  },
  consent5: {
    en: '5. CONSENT',
    fr: '5. CONSENTEMENT',
  },
  consent5_1: {
    en: 'The User can withdraw his/her consent at any time. The withdrawal of his/her consent does not question the legality of the process already done, based on the consent given before the withdrawal. This right can be exercised by e-mail to the address together@baziszt.com or by letter to the following address: BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: 'L’Utilisateur peut retirer son consentement à tout moment. Le retrait de son consentement ne remet pas en cause la légalité du traitement déjà effectué, sur la base du consentement donné avant le retrait. Ce droit peut être exercé par e-mail à l’adresse together@baziszt.com ou par courrier à l’adresse suivante : BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
  },
  durationOfPersonalDataStorage6: {
    en: '6. DURATION OF PERSONAL DATA’S STORAGE',
    fr: '6. DURÉE DE CONSERVATION DES DONNÉES PERSONNELLES',
  },
  durationOfPersonalDataStorage6_1: {
    en: 'In compliance with the Law and GDPR Regulation, BAZISZT only stores User’s personal data during a timeframe reasonably necessary to achieve the purposes for which it is collected.',
    fr: 'Conformément à la Loi et au Règlement RGPD, BAZISZT ne conserve les données personnelles de l’Utilisateur que pendant une période raisonnablement nécessaire pour atteindre les finalités pour lesquelles elles sont collectées.',
  },
  communicationOfUsersPersonalData7: {
    en: '7. COMMUNICATION OF USER’S PERSONAL DATA FOR INTERNAL PURPOSES',
    fr: "7. COMMUNICATION DES DONNÉES PERSONNELLES DE L'UTILISATEUR À DES FINS INTERNES",
  },
  personalDataProvidedToEmployees7_1: {
    en: '7.1 The personal data can be provided to BAZISZT’ employees and staff who, acting under BAZISZT’ direct authority, are considered controller or processor and receive appropriate operational instructions. The personal data can be disclosed to the controller’s employees or staff, appointed by BAZISZT, provided that the data are collected according to the pursued purposes.',
    fr: "7.1 Les données personnelles peuvent être communiquées aux employés et au personnel de BAZISZT qui, agissant sous l'autorité directe de BAZISZT, sont considérés comme responsables du traitement ou sous-traitants et reçoivent des instructions opérationnelles appropriées. Les données personnelles peuvent être divulguées aux employés ou au personnel du responsable du traitement, désignés par BAZISZT, à condition que les données soient collectées en fonction des finalités poursuivies.",
  },
  bazisztEnsuresProtection7_2: {
    en: '7.2 BAZISZT ensures that the processors, employees or staff guarantee the same level of protection as itself and ensures that these processors, employees or staff process the personal data only for the pursued purposes, with the required discretion and security.',
    fr: "7.2 BAZISZT s'assure que les sous-traitants, employés ou personnel garantissent le même niveau de protection qu'elle-même et veille à ce que ces sous-traitants, employés ou personnel traitent les données personnelles uniquement pour les finalités poursuivies, avec la discrétion et la sécurité requises.",
  },
  personalDataDisclosedToProviders7_3: {
    en: '7.3 The personal data directly communicated by the Users through the online forms can be disclosed and collected by external providers acting on BAZISZT’ behalf.',
    fr: '7.3 Les données personnelles directement communiquées par les Utilisateurs via les formulaires en ligne peuvent être divulguées et collectées par des prestataires externes agissant au nom de BAZISZT.',
  },
  dataNotTransferredToThirdCountry7_4: {
    en: '7.4 The data are not subject to a transfer to a third country outside the European Union.',
    fr: "7.4 Les données ne font pas l'objet d'un transfert vers un pays tiers en dehors de l'Union européenne.",
  },
  usersRights8: {
    en: '8. THE USER’S RIGHTS',
    fr: "8. LES DROITS DE L'UTILISATEUR",
  },
  fairAndLawfulProcessing8_1: {
    en: '8.1 BAZISZT guarantees fair and lawful processing of User’s personal data.',
    fr: "8.1 BAZISZT garantit un traitement équitable et légal des données personnelles de l'Utilisateur.",
  },
  rightToAccessPersonalData8_2: {
    en: '8.2 BAZISZT guarantees the User a right to access his/her personal data.',
    fr: "8.2 BAZISZT garantit à l'Utilisateur un droit d'accès à ses données personnelles.",
  },
  rightToObtainInformationGDPR8_3: {
    en: 'According to article 15 of GDPR, the User shall have the right to obtain from BAZISZT the following (non-exhaustive) information:',
    fr: "Conformément à l'article 15 du RGPD, l'Utilisateur a le droit d'obtenir de BAZISZT les informations suivantes (liste non exhaustive):",
  },
  purposesOfProcessing8_3_1: {
    en: 'The purposes of the processing;',
    fr: 'Les finalités du traitement;',
  },
  categoriesOfPersonalData8_3_2: {
    en: 'The categories of personal data concerned;',
    fr: 'Les catégories de données personnelles concernées;',
  },
  recipientsOfPersonalData8_3_3: {
    en: 'The recipients or categories of recipients to whom the personal data have been or will be disclosed, in particular recipients in third countries or international organizations;',
    fr: 'Les destinataires ou les catégories de destinataires auxquels les données personnelles ont été ou seront divulguées, en particulier les destinataires dans des pays tiers ou des organisations internationales;',
  },
  dataStoragePeriod8_3_4: {
    en: 'Where possible, the envisaged period for which the personal data will be stored, or, if not possible, the criteria used to determine that period;',
    fr: "Si possible, la durée envisagée de conservation des données personnelles ou, si ce n'est pas possible, les critères utilisés pour déterminer cette durée;",
  },
  automatedDecisionMaking8_3_5: {
    en: 'The existence of automated decision-making, including profiling, referred to in Article 22(1) and (4) and, at least in those cases, meaningful information about the logic involved, as well as the significance and the envisaged consequences of such processing for the data subject.',
    fr: "L'existence de décisions automatisées, y compris le profilage, mentionnées à l'article 22(1) et (4) et, au moins dans ces cas, des informations utiles sur la logique impliquée, ainsi que l'importance et les conséquences envisagées de ce traitement pour la personne concernée.",
  },
  rightToAccessPersonalData8_3: {
    en: '8.3 BAZISZT guarantees the User a right to access his/her personal data.',
    fr: "8.3 BAZISZT garantit à l'Utilisateur un droit d'accès à ses données personnelles.",
  },
  rectificationOfData8_4: {
    en: 'According to article 16 of GDPR, the incorrect or inaccurate data can be rectified or deleted at any time. First, the User shall proceed by himself to the necessary modifications from his/her user account, then the User shall ask BAZISZT to proceed to the modifications if necessary.',
    fr: "Conformément à l'article 16 du RGPD, les données incorrectes ou inexactes peuvent être rectifiées ou supprimées à tout moment. L'Utilisateur doit d'abord procéder lui-même aux modifications nécessaires depuis son compte utilisateur, puis, si nécessaire, demander à BAZISZT d'effectuer les modifications.",
  },
  rightToDeletion8_5: {
    en: 'The User shall have a right to obtain the deletion of his/her personal data in the cases listed in article 17 of GDPR.',
    fr: "L'Utilisateur a le droit d'obtenir la suppression de ses données personnelles dans les cas énumérés à l'article 17 du RGPD.",
  },
  rightToRestrictionOfProcessing8_4: {
    en: '8.4 BAZISZT guarantees the right to restriction of processing.',
    fr: '8.4 BAZISZT garantit le droit à la limitation du traitement.',
  },
  restrictionOfProcessingConditions8_5: {
    en: 'The User shall have the right to obtain restriction of processing where one of the cases described in article 18 of GDPR applies.',
    fr: "L'Utilisateur a le droit d'obtenir la limitation du traitement lorsque l'un des cas décrits à l'article 18 du RGPD s'applique.",
  },
  rightToDataPortability8_5: {
    en: '8.5 BAZISZT guarantees the right to data portability.',
    fr: '8.5 BAZISZT garantit le droit à la portabilité des données.',
  },
  rightToReceiveData8_6: {
    en: 'According to article 20 of GDPR, the User shall have the right to receive from BAZISZT the personal data concerning him or her, in a structured, commonly used and machine-readable format.',
    fr: "Conformément à l'article 20 du RGPD, l'Utilisateur a le droit de recevoir de BAZISZT les données personnelles le concernant, dans un format structuré, couramment utilisé et lisible par machine.",
  },
  rightToTransmitData8_7: {
    en: 'The User shall also have a right to transmit those data to another controller without hindrance from BAZISZT, in the cases described in GDPR.',
    fr: "L'Utilisateur a également le droit de transmettre ces données à un autre responsable du traitement sans entrave de la part de BAZISZT, dans les cas décrits dans le RGPD.",
  },
  rightToObjectProcessing8_6: {
    en: '8.6 BAZISZT guarantees the right to object to the processing.',
    fr: "8.6 BAZISZT garantit le droit de s'opposer au traitement.",
  },
  rightToObjectConditions8_7: {
    en: 'The User shall have the right to object, on compelling and legitimate grounds relating to his or her particular situation, at any time to processing of personal data concerning him or her. In such a case, BAZISZT will not process the personal data, unless there are compelling legitimate grounds for the processing which override the interests, rights and freedoms of the data subject or for the establishment, exercise or defense of legal claims.',
    fr: "L'Utilisateur a le droit de s'opposer, pour des raisons impérieuses et légitimes liées à sa situation particulière, à tout moment au traitement des données personnelles le concernant. Dans un tel cas, BAZISZT ne traitera pas les données personnelles, sauf s'il existe des motifs légitimes impérieux pour le traitement qui priment sur les intérêts, les droits et les libertés de la personne concernée ou pour la constatation, l'exercice ou la défense de droits en justice.",
  },
  rightToLodgeComplaint8_7: {
    en: '8.7 BAZISZT guarantees the right to lodge a complaint.',
    fr: '8.7 BAZISZT garantit le droit de déposer une plainte.',
  },
  rightToLodgeComplaintWithCNIL8_8: {
    en: 'The User shall have the right to lodge a complaint regarding the processing of his/her personal data by BAZISZT with the CNIL, the supervisory authority competent in the French territory.',
    fr: "L'Utilisateur a le droit de déposer une plainte concernant le traitement de ses données personnelles par BAZISZT auprès de la CNIL, l'autorité de contrôle compétente sur le territoire français.",
  },
  exerciseOfRights8_8: {
    en: '8.8 The User can exercise the rights listed above, at any time, by e-mail to the address together@baziszt.com or by letter to the following address: BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: "8.8 L'Utilisateur peut exercer les droits énumérés ci-dessus, à tout moment, par e-mail à l'adresse together@baziszt.com ou par courrier à l'adresse suivante : BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.",
  },
  processorsLimitationOfLiability9: {
    en: '9. PROCESSOR’S LIMITATION OF LIABILITY',
    fr: '9. LIMITATION DE RESPONSABILITÉ DU SOUS-TRAITANT',
  },
  thirdPartyWebsitesLiability9_1: {
    en: 'The website may contain hyperlinks to websites controlled and operated by third parties not linked to BAZISZT. In such a case, BAZISZT cannot be held responsible for the content of these websites, or for these third parties’ practices as regards personal data protection.',
    fr: 'Le site peut contenir des hyperliens vers des sites contrôlés et exploités par des tiers non liés à BAZISZT. Dans ce cas, BAZISZT ne peut être tenu responsable du contenu de ces sites, ni des pratiques de ces tiers en matière de protection des données personnelles.',
  },
  bazisztNoLiabilityForLoss9_2: {
    en: 'BAZISZT cannot be held responsible for the loss, data corruption, or identity theft, which may be caused particularly but not exclusively by the presence of viruses or by cyber-attacks.',
    fr: "BAZISZT ne peut être tenu responsable de la perte, de la corruption des données ou du vol d'identité, qui peuvent être causés notamment, mais pas exclusivement, par la présence de virus ou par des cyberattaques.",
  },
  usersDataModificationProcess10: {
    en: '10. USER’S DATA MODIFICATION PROCESS',
    fr: "10. PROCESSUS DE MODIFICATION DES DONNÉES DE L'UTILISATEUR",
  },
  modifyPersonalData10_1: {
    en: 'The User can, at any time, modify the disclosed personal data by e-mail to the address together@baziszt.com or by letter to the following address: BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.',
    fr: "L'Utilisateur peut, à tout moment, modifier les données personnelles divulguées par e-mail à l'adresse together@baziszt.com ou par courrier à l'adresse suivante : BAZISZT – 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.",
  },
  cookiesUsage11_1: {
    en: 'Cookies are used on the site, in order to improve your experience of the site. The cookie identifies your computer and allows the site to remember your personal settings. Cookies are also used for statistical purposes.',
    fr: "Des cookies sont utilisés sur le site afin d'améliorer votre expérience du site. Le cookie identifie votre ordinateur et permet au site de se souvenir de vos paramètres personnels. Les cookies sont également utilisés à des fins statistiques.",
  },
  cookieSettings11_2: {
    en: 'You can set your browser to notify you when a cookie is to be activated. This enables you to reject the use of this cookie or to tell your browser to erase the cookie at the end of your visit. The web shop cannot be used if cookies are disallowed.',
    fr: "Vous pouvez configurer votre navigateur pour qu'il vous avertisse lorsqu'un cookie est activé. Cela vous permet de refuser l'utilisation de ce cookie ou d'indiquer à votre navigateur de supprimer le cookie à la fin de votre visite. La boutique en ligne ne peut pas être utilisée si les cookies sont désactivés.",
  },
  userIDTracking11_3: {
    en: 'A user-ID will be assigned to logged-in users, which allows for anonymized website tracking across multiple devices (tablet, desktop, mobile, etc.). No personally identifiable data is collected or connected to the user-ID and you can opt out by contacting: together@baziszt.com.',
    fr: "Un ID utilisateur sera attribué aux utilisateurs connectés, ce qui permet un suivi anonymisé du site Web sur plusieurs appareils (tablette, ordinateur de bureau, mobile, etc.). Aucune donnée personnelle identifiable n'est collectée ou liée à l'ID utilisateur et vous pouvez vous désinscrire en contactant : together@baziszt.com.",
  },
  privacyPolicyModification12: {
    en: '12. PRIVACY POLICY’S MODIFICATION',
    fr: '12. MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ',
  },
  privacyPolicyRightToModify12_1: {
    en: 'BAZISZT reserves the right to modify this Privacy policy for compliance with privacy laws and regulations or in order to adapt it to its practice. Therefore, the User is encouraged to consult it regularly to be aware of potential modifications and adaptations.',
    fr: "BAZISZT se réserve le droit de modifier cette politique de confidentialité pour se conformer aux lois et réglementations en matière de confidentialité ou pour l'adapter à ses pratiques. Par conséquent, l'Utilisateur est encouragé à la consulter régulièrement pour être informé des éventuelles modifications et adaptations.",
  },
  cookieList12_2: {
    en: 'Cookie List',
    fr: 'Liste des cookies',
  },
  cookieDefinition12_3: {
    en: 'A cookie is a small piece of data (text file) that a website – when visited by a user – asks your browser to store on your device in order to remember information about you, such as your language preference or login information. Those cookies are set by us and called first-party cookies. We also use third-party cookies – which are cookies from a domain different than the domain of the website you are visiting – for our advertising and marketing efforts. More specifically, we use cookies and other tracking technologies for the following purposes:',
    fr: "Un cookie est un petit morceau de données (fichier texte) qu'un site Web – lorsqu'il est visité par un utilisateur – demande à votre navigateur de stocker sur votre appareil afin de se souvenir d'informations vous concernant, telles que votre préférence de langue ou vos informations de connexion. Ces cookies sont définis par nous et sont appelés cookies de première partie. Nous utilisons également des cookies tiers – qui sont des cookies provenant d'un domaine différent de celui du site Web que vous visitez – pour nos efforts publicitaires et marketing. Plus précisément, nous utilisons des cookies et d'autres technologies de suivi aux fins suivantes :",
  },
  necessaryCookiesForStoreFunctioning12_4: {
    en: 'Necessary Cookies for the Functioning of the Store',
    fr: 'Cookies nécessaires au fonctionnement de la boutique',
  },
  cookieName12_5: {
    en: 'NAME',
    fr: 'NOM',
  },
  cookieFunction12_6: {
    en: 'FUNCTION',
    fr: 'FONCTION',
  },
  usedForAdminAccess12_7: {
    en: 'Used in connection with access to admin.',
    fr: "Utilisé en relation avec l'accès à l'administration.",
  },
  usedForStorefrontNavigation12_8: {
    en: 'Used in connection with navigation through a storefront.',
    fr: 'Utilisé en relation avec la navigation dans une vitrine.',
  },
  usedForShoppingCart12_9: {
    en: 'Used in connection with shopping cart.',
    fr: "Utilisé en relation avec le panier d'achat.",
  },
  usedForCheckout12_10: {
    en: 'Used in connection with checkout.',
    fr: 'Utilisé en relation avec le processus de paiement.',
  },
  usedForCustomerLogin12_11: {
    en: 'Used in connection with customer login.',
    fr: 'Utilisé en relation avec la connexion client.',
  },
  usedForUpdatingCustomerInfo12_12: {
    en: 'Used to facilitate updating customer account information.',
    fr: 'Utilisé pour faciliter la mise à jour des informations du compte client.',
  },
  performanceAndTargetingCookies12_13: {
    en: 'Performance Cookies and Targeting Cookies',
    fr: 'Cookies de performance et cookies de ciblage',
  },
  trackingPreferences12_14: {
    en: 'Tracking preferences.',
    fr: 'Suivi des préférences.',
  },
  trackLandingPages12_15: {
    en: 'Track landing pages.',
    fr: "Suivi des pages d'atterrissage.",
  },
  shopifyAnalytics12_16: {
    en: 'Shopify analytics.',
    fr: 'Analyses Shopify.',
  },
  shopifyMarketingAndReferralsAnalytics12_17: {
    en: 'Shopify analytics relating to marketing & referrals.',
    fr: 'Analyses Shopify liées au marketing et aux parrainages.',
  },
  noOrders: {
    en: 'no previous orders found.',
    fr: 'Aucune commande précédente trouvée.',
  },
  previousOrders: {
    en: 'previous orders',
    fr: 'commandes précédentes',
  },
  noWishlistItems: {
    en: 'no wishlist items found.',
    fr: 'aucun article dans la liste de souhaits trouvé.',
  },
};

export default resources;
