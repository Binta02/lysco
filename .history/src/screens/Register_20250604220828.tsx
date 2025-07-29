import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const isPasswordValid = (pwd: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|<>?,./`~]).{8,}$/;
    return regex.test(pwd);
  };

  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           first_name: firstName,
  //           last_name: lastName
  //         }
  //       }
  //     });

  //     if (error) {
  //       toast.error('Erreur lors de l\'inscription', {
  //         description: error.message
  //       });
  //       return;
  //     }

  //     if (data.user) {
  //       toast.success('Inscription réussie', {
  //         description: 'Vous êtes maintenant inscrit. Bienvenue chez Lys&Co!'
  //       });
  //       navigate('/dashboard');
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     toast.error('Une erreur inattendue est survenue');
  //   }
  // };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        if (
          error.message.includes("already registered") ||
          error.message.includes("Email already in use")
        ) {
          toast.error("Cet email est déjà associé à un compte.", {
            description:
              "Essayez de vous connecter ou de réinitialiser votre mot de passe.",
          });
        } else {
          toast.error("Erreur lors de l'inscription", {
            description: error.message,
          });
        }
        return;
      }

      if (data.user) {
        toast.success("Inscription réussie", {
          description: "Vous êtes maintenant inscrit. Bienvenue chez Lys&Co!",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Une erreur inattendue est survenue");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-center">
              Inscrivez-vous pour accéder à nos services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  {/* <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre
                </p> */}
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(!isPasswordValid(e.target.value));
                    }}
                    required
                    className={`pl-10 pr-10 ${
                      passwordError ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500">
                    Le mot de passe doit contenir : 1 minuscule, 1 majuscule, 1
                    chiffre et 1 caractère spécial.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-lysco-pink text-white hover:bg-opacity-90"
              >
                S'inscrire
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Déjà un compte?{" "}
              <Link
                to="/login"
                className="text-lysco-turquoise hover:underline"
              >
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
