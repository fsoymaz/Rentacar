export interface Option {
	id: string;
	name: string;
	value: string;
	label: string;
	placeholder: string;
  }

  export const generateOptions = (enumObject: any): Option[] => {
	return Object.keys(enumObject).map(key => ({
	  id: key,
	  name: key,
	  value: enumObject[key as keyof typeof enumObject],
	  label: enumObject[key as keyof typeof enumObject],
	  placeholder: `Please select a ${key}`
	}));
  };