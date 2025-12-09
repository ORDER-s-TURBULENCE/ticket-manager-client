"use client";

import {
  Field,
  VStack,
  Input,
  NumberInput,
  Select,
  Button,
  createListCollection,
  Portal,
} from "@chakra-ui/react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitErrorHandler } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.email("有効なメールアドレスを入力してください"),
  numberOfSeatTickets: z
    .number()
    .min(1, "座席チケット枚数は1以上である必要があります"),
  numberOfGoodsTickets: z
    .number()
    .min(0, "グッズチケット枚数は0以上である必要があります"),
  paymentMethod: z.string().min(1, "支払い方法は必須です"),
  remark: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const paymentMethods = createListCollection({
    items:[
  { value: "Square", label: "Square" },
  { value: "bank_transfer", label: "銀行振込" },
  { value: "cash", label: "現金" },
]});

const FormField = ({
  label,
  isRequired = false,
  children,
  errorMessage,
  helperText,
}: {
  label: string;
  isRequired?: boolean;
  children: React.ReactNode;
  errorMessage?: string;
  helperText?: string;
}) => (
  <Field.Root required={isRequired} invalid={!!errorMessage}>
    <Field.Label>
      {label}  <Field.RequiredIndicator />
    </Field.Label>
    {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    {children}
    <Field.ErrorText>{errorMessage}</Field.ErrorText>
  </Field.Root>
);

export const UserForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
        name: "",
        email: "",
        numberOfSeatTickets: 1,
        numberOfGoodsTickets: 0,
        paymentMethod: "",
        remark: "",
    },
    resolver: zodResolver(formSchema),
  });

    const onSubmit = (data: FormData) => {
        console.log("Form Data Submitted:");
        console.log(data);
    }

    const onError: SubmitErrorHandler<FormData> = (errors) => {
        console.log("Form Errors:");
        console.log(errors);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <VStack gap="5" width="full">

                <FormField
                    label="購入者氏名"
                    isRequired={true}
                    errorMessage={errors.name?.message}
                >
                    <Input
                        placeholder="名前を入力してください"
                        {...register("name")}
                        aria-label="購入者氏名"
                    />
                </FormField>

                <FormField
                    label="メールアドレス"
                    isRequired={true}
                    errorMessage={errors.email?.message}
                >
                    <Input
                        placeholder="メールアドレスを入力してください"
                        {...register("email")}
                        aria-label="メールアドレス"
                    />
                </FormField>

                <FormField
                    label="座席チケット枚数"
                    isRequired={true}
                    errorMessage={errors.numberOfSeatTickets?.message}
                    helperText="映画の鑑賞に必要なチケットです"
                >
                    <NumberInput.Root defaultValue="1" width="full">
                        <NumberInput.Control />
                        <NumberInput.Input 
                            {...register("numberOfSeatTickets", {
                                valueAsNumber: true,
                            })}
                        />
                    </NumberInput.Root>
                </FormField>

                <FormField
                    label="グッズチケット枚数"
                    isRequired={true}
                    errorMessage={errors.numberOfGoodsTickets?.message}
                >
                    <NumberInput.Root defaultValue="0" width="full">
                        <NumberInput.Control />
                        <NumberInput.Input 
                            {...register("numberOfGoodsTickets", {
                                valueAsNumber: true,
                            })}
                        />
                    </NumberInput.Root>
                </FormField>

                <FormField
                    label="支払い方法"
                    isRequired={true}
                    errorMessage={errors.paymentMethod?.message}
                >
                    <Select.Root 
                        width="full" 
                        collection={paymentMethods} 
                        onValueChange={(e) => setValue("paymentMethod", e.value[0])}
                        >
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="未選択"/>
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {paymentMethods.items.map((method) => (
                                        <Select.Item item={method} key={method.value}>
                                            {method.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                </FormField>

                <FormField
                    label="備考"
                    isRequired={false}
                    errorMessage={errors.remark?.message}
                >
                    <Input
                        placeholder="配慮事項あればご記入ください"
                        {...register("remark")}
                        aria-label="備考"
                    />
                </FormField>

            <Button colorPalette="blue" variant="surface" type="submit">
                内容確認
            </Button>
        </VStack>
        </form>
    );
};
