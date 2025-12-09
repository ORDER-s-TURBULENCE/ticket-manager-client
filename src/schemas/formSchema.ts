import z from "zod";

export const formSchema = z.object({
    name: z.string().min(1, "名前は必須です"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    number_of_seat_tickets: z
        .number()
        .min(1, "座席チケット枚数は1以上である必要があります"),
    number_of_goods_tickets: z
        .number()
        .min(0, "グッズチケット枚数は0以上である必要があります"),
    payment_method: z.enum(["square", "bank_transfer", "cash"], {
        message: "有効な支払い方法を選択してください",
    }),
    remarks: z.string().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
