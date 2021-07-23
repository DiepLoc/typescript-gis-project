const nameValidator = [
  { required: true, message: "This field is required" },
  { max: 50 },
  {
    validator: (_: any, value: string) =>
      value.trim() == ""
        ? Promise.reject(new Error("Name not empty"))
        : Promise.resolve(),
  },
];

const integerValidator = [
  { type: "integer", min: 0, max: 100000, required: true },
];

const areaFormatter = (value: string | undefined) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const selectedOptionFilter = (input: string, option: any) =>
  option.children.toLowerCase().includes(input.toLowerCase());

export { nameValidator, integerValidator, areaFormatter, selectedOptionFilter };
