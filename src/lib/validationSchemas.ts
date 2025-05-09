import * as Yup from 'yup';

export const EditUserSchema = Yup.object({
  id: Yup.number().required(),
  bio: Yup.string().required(),
  phone: Yup.string().required(),
  major: Yup.string().required(),
  standing: Yup.string().required(),
  campus: Yup.string().required(),
  personal: Yup.string().required(),
});

export const AddResourceSchema = Yup.object({
  name: Yup.string().required('Resource name is required'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().required('Type is required'),
  owner: Yup.string().email().required('Owner email is required'),
  location: Yup.string().required('Location is required'),
  campus: Yup.string().required('Campus is required'),
  posted: Yup.string().required('Posted time is required'),
  deadline: Yup.string().required('Deadline is required'),
  image: Yup.string().url('Must be a valid image URL').required('Image URL is required'),
});

export const EditResourceSchema = Yup.object({
  id: Yup.number().required('ID is required'),
  name: Yup.string().required('Resource name is required'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().required('Type is required'),
  owner: Yup.string().email().required('Owner email is required'),
  location: Yup.string().required('Location is required'),
  campus: Yup.string().required('Campus is required'),
  posted: Yup.string().required('Posted time is required'),
  deadline: Yup.string().required('Deadline is required'),
  image: Yup.string().url('Must be a valid image URL').required('Image URL is required'),
});

export const ReturnResourceSchema = Yup.object({
  id: Yup.number().required('Resource ID is required'),
});
