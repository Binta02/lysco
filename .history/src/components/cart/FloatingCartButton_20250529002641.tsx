// import React, { useState } from "react";
// import {
//   Sheet,
//   SheetTrigger,
//   SheetContent,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/components/cart/CartContext";
// import { Badge } from "@/components/ui/badge";
// import { CartDrawer } from "@/components/cart/CartDrawer";

// export function FloatingCartButton() {
//   const { items } = useCart();
//   const [open, setOpen] = useState(false);

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <div className="fixed bottom-4 right-4 z-50">
//           <Button variant="outline" size="icon" className="relative">
//             <ShoppingCart className="h-5 w-5" />
//             {items.length > 0 && (
//               <Badge
//                 variant="destructive"
//                 className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
//               >
//                 {items.length}
//               </Badge>
//             )}
//           </Button>
//         </div>
//       </SheetTrigger>
//       <SheetContent
//         side="right"
//         className="w-[400px] sm:w-[540px] flex flex-col"
//       >
//         <SheetTitle>Votre panier</SheetTitle>
//         <CartDrawer onCheckout={() => setOpen(false)} />
//       </SheetContent>
//     </Sheet>
//   );
// }

import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function FloatingCartButton() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7" />
            {items.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {items.length}
              </Badge>
            )}
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex flex-col px-4 sm:px-6"
      >
        <SheetTitle className="text-lg sm:text-xl font-semibold mb-4">
          Votre panier
        </SheetTitle>
        <CartDrawer onCheckout={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
