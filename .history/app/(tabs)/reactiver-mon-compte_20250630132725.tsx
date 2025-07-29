import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ReactiverMonCompte() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!user) return;

    const reactivate = async () => {
      try {
        const res = await fetch(
          `https://mon-backend-node.vercel.app/api/reactivate-account?user=${user}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Erreur inconnue");

        setMessage("🎉 Votre compte a été réactivé avec succès.");
      } catch (err: any) {
        setMessage(`❌ Échec : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    reactivate();
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Réactivation de compte
        </h1>
        {loading ? (
          <p className="text-gray-500">Traitement en cours...</p>
        ) : (
          <p className="text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
