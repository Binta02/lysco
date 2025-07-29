import React from "react";
import Navbar from "../../src/components/Navbar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Footer from "../../src/components/Footer";
import { Button } from "../../src/components/ui/button";
import { Card, CardContent } from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Textarea } from "../../src/components/ui/textarea";
import { Toaster } from "../../src/components/ui/toaster";
import { useToast } from "../../src/hooks/use-toast";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  subject: z
    .string()
    .min(3, { message: "Le sujet doit contenir au moins 3 caractères" }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(
        "https://mon-backend-node.vercel.app/api/send-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json();
      if (res.ok && json.status === "success") {
        toast({
          title: "Message envoyé",
          description: "Votre message a bien été envoyé.",
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "Erreur",
          description: json.error || "Une erreur est survenue.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Erreur de connexion",
        description: "Impossible de joindre le serveur.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-lysco-turquoise/10 to-lysco-pink/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Notre équipe est à votre disposition pour répondre à vos
              questions.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
            {/* Coordonnées */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-lysco-turquoise mt-1" />
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-gray-600">
                    28 Rue de l'Eglise, 95210 Deuil-la-Barre
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-lysco-turquoise mt-1" />
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">
                    09 53 42 11 63 / 07 56 85 37 02
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-lysco-turquoise mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href="mailto:contact@lys-and-co.com"
                    className="text-gray-600 hover:text-lysco-turquoise"
                  >
                    contact@lys-and-co.com
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Votre prénom" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Votre nom" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              placeholder="votre@email.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Sujet de votre message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Votre message..."
                              className="min-h-[150px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-lysco-turquoise hover:bg-opacity-90"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Envoi en cours..."
                        : "Envoyer"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Contact;
