import * as React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag } from "lucide-react";
import ContractGenerator from "@/components/contract/ContractGenerator";

const Confirmation = () => {
  const location = useLocation();

  // Rediriger si l'utilisateur accède directement à la page sans passer par le checkout
  if (!location.state?.order) {
    return <Navigate to="/" replace />;
  }

  const { order } = location.state;
  const { orderId, items, subtotal, tax, total, clientInfo } = order;

  // Check if the order contains domiciliation items
  const domiciliationItems = items.filter(
    (item) =>
      // item.title.toLowerCase().includes('domiciliation') ||
      item.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes("domicili") ||
      item.title.toLowerCase().includes("entreprise") ||
      item.title.toLowerCase().includes("auto-entrepreneur") ||
      item.title.toLowerCase().includes("association")
  );

  // Get first domiciliation item for the contract
  const domiciliationItem =
    domiciliationItems.length > 0 ? domiciliationItems[0] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Commande confirmée</h1>
            <p className="text-gray-600 mt-2">
              Vous trouverez les informations de votre commande ci-dessous.
              <br />
              Votre facture sera disponible dans votre espace personnel.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Détails de la commande</span>
                <span className="text-sm font-normal text-gray-600">
                  #{orderId}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Articles</h3>
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <p>{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {(item.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>TVA (20%)</span>
                    <span>{tax.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between pt-4 mt-2 border-t font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Informations client</h3>
                  <p className="text-gray-800">
                    {clientInfo.firstName} {clientInfo.lastName}
                  </p>
                  <p className="text-gray-600">{clientInfo.email}</p>
                  <p className="text-gray-600">{clientInfo.companyName}</p>
                  <p className="text-gray-600">
                    SIRET: {clientInfo.siretNumber}
                  </p>
                  <p className="text-gray-600">{clientInfo.address}</p>
                  {clientInfo.addressDetails && (
                    <p className="text-gray-600">{clientInfo.addressDetails}</p>
                  )}
                  <p className="text-gray-600">
                    {clientInfo.city}, {clientInfo.postalCode}
                  </p>
                </div>
              </div>

              {domiciliationItem && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">
                    Votre contrat de domiciliation
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Il est impératif de télécharger votre contrat de
                    domiciliation maintenant. Vous ne pourrez plus y accéder par
                    la suite, sauf en repassant commande ou en venant à
                    l’agence.
                    <br />
                    <br />
                    Merci d’imprimer le contrat en deux exemplaires, de les
                    signer et de nous les retourner à notre adresse.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800">
                    <strong>Attention :</strong>
                    <br />
                    Merci de bien vouloir retourner le contrat signé accompagné
                    des documents suivants :
                    <ul className="list-disc pl-5 mt-2">
                      <li>
                        Pièce d’identité : Veuillez fournir une copie de votre
                        pièce d’identité valide.
                      </li>
                      <li>
                        Justificatif de domicile : Merci de nous faire parvenir
                        un justificatif de domicile récent (moins de 3 mois).
                      </li>
                    </ul>
                    <br />
                    Ces documents sont nécessaires pour compléter votre
                    inscription et finaliser le processus.
                    <br />
                    Nous vous remercions de votre coopération et restons
                    disponibles pour toute question.
                  </div>
                  <ContractGenerator
                    clientInfo={clientInfo}
                    planDetails={{
                      name: domiciliationItem.title,
                      price: domiciliationItem.price,
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link
                to="/"
                className="flex items-center gap-2 bg-lysco-turquoise hover:bg-lysco-turquoise/90"
              >
                <ShoppingBag size={16} />
                Continuer vos achats
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
