"use client";

import {
  VStack,
  Input,
  NumberInput,
  Select,
  Button,
  Portal,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postFormData } from "../../api/form";
import { useParams } from "@tanstack/react-router";
import type { components } from "../../types/api";
import FormField from "../../components/ui/FormField";
import { formSchema, type FormSchemaType } from "../../schemas/formSchema";
import { paymentMethods } from "../../constants/paymentMethods";
import { zodResolver } from "@hookform/resolvers/zod";

type FormInput = components['schemas']['FormInput'];
type FormType = FormInput['type'];

export const UserForm = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormSchemaType>({
        defaultValues: {
            name: "",
            email: "",
            number_of_seat_tickets: 1,
            number_of_goods_tickets: 0,
            payment_method: undefined,
            remarks: "",
        },
        resolver: zodResolver(formSchema),
    });

    const mutation = useMutation<
        { message: string },
        Error,
        FormInput
    >({
        mutationFn: postFormData,
    });

    const validTypes: FormType[] = ["staff", "crowdfunding", "preorder", "onTheDay"];
    const { movie_id, type } = useParams({ from: '/user/form/$movie_id/$type' });
    if (!movie_id || !type || !validTypes.includes(type)) {
        return <div>Invalid URL parameters.</div>;
    }

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        const mutatePayload: FormInput = {
            ...data,
            movie_id: movie_id,
            type: type,
            is_verified: false,
            payment_status: "pending",
        };
        mutation.mutate(mutatePayload, {
            onSuccess: (response) => {
                console.log("データ送信に成功しました。message:", response.message);
            },
            onError: (error) => {
                console.error("データ送信中にエラーが発生しました:", error);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    errorMessage={errors.number_of_seat_tickets?.message}
                    helperText="映画の鑑賞に必要なチケットです"
                >
                    <NumberInput.Root defaultValue="1" width="full">
                        <NumberInput.Control />
                        <NumberInput.Input 
                            {...register("number_of_seat_tickets", {
                                valueAsNumber: true,
                            })}
                        />
                    </NumberInput.Root>
                </FormField>

                <FormField
                    label="グッズチケット枚数"
                    isRequired={true}
                    errorMessage={errors.number_of_goods_tickets?.message}
                >
                    <NumberInput.Root defaultValue="0" width="full">
                        <NumberInput.Control />
                        <NumberInput.Input 
                            {...register("number_of_goods_tickets", {
                                valueAsNumber: true,
                            })}
                        />
                    </NumberInput.Root>
                </FormField>

                <FormField
                    label="支払い方法"
                    isRequired={true}
                    errorMessage={errors.payment_method?.message}
                >
                    <Select.Root 
                        width="full" 
                        collection={paymentMethods} 
                        onValueChange={(e) => setValue("payment_method", e.value[0] as FormInput['payment_method'])}
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
                    errorMessage={errors.remarks?.message}
                >
                    <Input
                        placeholder="配慮事項あればご記入ください"
                        {...register("remarks")}
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
