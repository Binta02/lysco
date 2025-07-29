import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Vérification de la session utilisateur

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [accountDisabledMessage, setAccountDisabledMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Récupérer le paramètre redirect de l'URL
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect");

  // Rediriger si déjà connecté
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/dashboard");
        }
      }
    };

    checkSession();
  }, [navigate, redirectUrl]);

  // const handleLogin = async (values: LoginFormValues) => {
  //   setIsLoading(true);

  //   try {
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email: values.email,
  //       password: values.password,
  //     });

  //     if (error) {
  //       toast.error("Erreur de connexion", {
  //         description: error.message,
  //       });
  //       return;
  //     }

  //     if (data.user) {
  //       toast.success("Connexion réussie", {
  //         description: "Bienvenue sur Lys&Co!",
  //       });

  //       // Redirection après connexion réussie
  //       if (redirectUrl) {
  //         navigate(redirectUrl);
  //       } else {
  //         navigate("/dashboard");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast.error("Une erreur inattendue est survenue");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAccountDisabledMessage(""); // reset au cas où

    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

      if (signInError) {
        toast.error("Erreur de connexion", {
          description: signInError.message,
        });
        return;
      }

      const user = signInData?.user;
      if (!user) {
        toast.error("Erreur", {
          description: "Utilisateur introuvable après connexion.",
        });
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("deleted_at")
        .eq("id", user.id)
        .single();

      if (profileError) {
        toast.error("Erreur", {
          description: "Impossible de vérifier l'état du compte.",
        });
        return;
      }

      if (profileData?.deleted_at) {
        setAccountDisabledMessage(
          "Votre compte a été désactivé. Contactez le support ou utilisez le lien de réactivation."
        );
        await supabase.auth.signOut();
        return;
      }

      toast.success("Connexion réussie", {
        description: "Bienvenue sur Lys&Co !",
      });

      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const email = form.getValues("email");
    if (!email) {
      toast.error("Email requis", {
        description:
          "Veuillez entrer votre email pour réinitialiser votre mot de passe",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error("Erreur", {
          description: error.message,
        });
        return;
      }

      toast.success("Email envoyé", {
        description:
          "Veuillez vérifier votre boîte mail pour réinitialiser votre mot de passe",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Une erreur inattendue est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Connexion
            </CardTitle>
            <CardDescription className="text-center">
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="exemple@email.com"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <button
                          type="button"
                          onClick={handleResetPassword}
                          className="text-xs text-lysco-turquoise hover:underline"
                        >
                          Mot de passe oublié?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="pl-10 pr-10"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {accountDisabledMessage && (
                  <div className="text-red-600 text-sm font-medium text-center">
                    {accountDisabledMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-lysco-turquoise hover:bg-opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Pas encore de compte?{" "}
              <Link to="/register" className="text-lysco-pink hover:underline">
                Créer un compte
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
