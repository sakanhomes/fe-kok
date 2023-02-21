import { FormikProps, FormikHelpers } from 'formik'

export type TFormik = FormikProps<any>
export type TFormPropsAsync<T> = { formData: T; formikHelpers?: FormikHelpers<T> }
export type TFormSubmit<T> = (d: TFormPropsAsync<T>) => void
