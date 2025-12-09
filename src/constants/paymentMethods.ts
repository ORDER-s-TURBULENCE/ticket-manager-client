import { createListCollection } from "@chakra-ui/react";

export const paymentMethods = createListCollection({
    items:[
        { value: "square", label: "Square" },
        { value: "bank_transfer", label: "銀行振込" },
        { value: "cash", label: "現金" },
    ]
});
