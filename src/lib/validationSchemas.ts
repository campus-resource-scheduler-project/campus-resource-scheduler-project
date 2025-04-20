import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditUserSchema = Yup.object({
  id: Yup.number().required(),
  bio: Yup.string().required(),
  phone: Yup.string().required(),
  major: Yup.string().required(),
  standing: Yup.string().required(),
  campus: Yup.string().required(),
  personal: Yup.string().required(),
});
