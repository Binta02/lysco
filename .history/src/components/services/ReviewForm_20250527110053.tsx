
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface ReviewFormProps {
  productName: string;
  productId: string;
  onReviewSubmitted: () => void;
}

const reviewSchema = z.object({
  comment: z.string().min(5, {
    message: "Votre avis doit contenir au moins 5 caractères.",
  }),
});

type FormData = z.infer<typeof reviewSchema>;

const ReviewForm = ({ productName, productId, onReviewSubmitted }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez attribuer une note",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Vérifier si l'utilisateur est connecté
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour laisser un avis",
          variant: "destructive",
        });
        return;
      }

      // Enregistrer l'avis dans la base de données
      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          product_name: productName,
          rating: rating,
          comment: data.comment,
          user_id: session.session.user.id,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Avis envoyé",
        description: "Merci pour votre avis !",
      });
      
      // Réinitialiser le formulaire
      form.reset();
      setRating(0);
      
      // Informer le composant parent qu'un nouvel avis a été soumis
      onReviewSubmitted();
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de votre avis",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">
        Donnez votre avis sur "{productName}"
      </h3>
      <p className="text-sm text-gray-500">
        Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Votre note *</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={`p-0 h-auto transition-colors duration-200`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star 
                    className={`h-6 w-6 ${
                      (hoveredRating > 0 ? value <= hoveredRating : value <= rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </Button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-600 self-center">
                  ({rating}/5)
                </span>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Votre avis *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Partagez votre expérience avec ce service..." 
                    className="min-h-[120px]" 
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.comment && (
                  <p className="text-sm text-red-500">{form.formState.errors.comment.message}</p>
                )}
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="bg-lysco-turquoise hover:bg-lysco-turquoise/90 flex gap-2 items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Envoi en cours...</>
            ) : (
              <>
                <Send className="h-4 w-4" /> Soumettre
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
