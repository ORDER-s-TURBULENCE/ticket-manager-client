import { customFetch } from "../lib/fetch";
import type { components } from "../types/api";

type FormInput = components['schemas']['FormInput'];
export const postFormData = async (data: FormInput) => {
    const response =  await customFetch('/user/forms', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.data;
};
