import { Option } from "../components/GenerateOptions/GenerateOptions";

export const getModelInfo = (
    brands?: Option[],
) => {
    const initialOption: any = { value: '', name: 'Lütfen bir Seçim yapınız', label: 'Seçiniz' };

    const modelInfo = [
        { formikType: "FormikInput", label: "Model Name", name: "name", type: "string", placeholder: "Model ismi giriniz" },
     
            { formikType: "FormikSelect", label: "Brand", name: "brandId", options: brands ? [initialOption, ...brands] : [] }
    ]
    return modelInfo;
};