import { FORM_COMPONENTS_CODES, SELECTABLE_FORM_ELES } from 'app/data/model/form-model-commons';
import { SectionCustomFieldProperties, SectionDetailsDeclaration } from 'app/data/model/project-info';
import { RESERVED_FIELDS } from 'app/data/model/reserved-fields.constant';
import { FormFieldsModel } from 'app/ui-react-components/shared-components/forms-automator/form-fields/form-fields-model';

export const sectionDetailsFormFieldsModel: Array<FormFieldsModel<SectionDetailsDeclaration>> = [
  {
    componentCode: FORM_COMPONENTS_CODES.hiddenInput,
    fieldName: RESERVED_FIELDS.id
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'title',
    type: 'text',
    label: 'Section name',
    required: true
  },
  {
    componentCode: FORM_COMPONENTS_CODES.childOfSelectorForSection,
    fieldName: 'childOf',
    label: 'Parent sections:',
    options: []
  }
];

/**
 * Defines common fields that are used both when creating and editing fields of a `Section`.
 */
const commonAddAndEditFields: Array<FormFieldsModel<SectionCustomFieldProperties>> = [
  {
    componentCode: FORM_COMPONENTS_CODES.optionsMaker,
    fieldName: 'options',
    type: 'text',
    label: 'Possible values',
    prerequisites: [{ componentCode: [FORM_COMPONENTS_CODES.basicSelect, FORM_COMPONENTS_CODES.basicRadio] }],
    required: true
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicCheckbox,
    fieldName: 'required',
    value: false,
    label: 'Required'
  }
];

/**
 * Defines the Form model to set the field properties of a `Section`.
 * All the values specified in each field of `sectionElesNewItemAdvanced` are necessary for creating each field.
 *
 * @remarks
 * For new fields only. Existing items must use `sectionElesForEditingAdvanced` as some properties can't be changed after the filed has been created.
 */
export const sectionElesNewItemAdvanced: Array<FormFieldsModel<SectionCustomFieldProperties>> = [
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'label',
    type: 'text',
    label: 'Field label',
    required: true,
    width: "7"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicSelect,
    fieldName: 'componentCode',
    options: SELECTABLE_FORM_ELES,
    value: 1,
    label: 'Data type',
    required: true,
    width: "3"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'fieldName',
    type: 'text',
    label: 'Identifier',
    required: true,
    width: "2"
  },
  ...commonAddAndEditFields
];

export const sectionElesNewItemBasic: Array<FormFieldsModel<SectionCustomFieldProperties>> = [
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'label',
    type: 'text',
    label: 'Field label',
    required: true,
    width: "8"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicSelect,
    fieldName: 'componentCode',
    options: SELECTABLE_FORM_ELES,
    value: 1,
    label: 'Data type',
    required: true,
    width: "4"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.hiddenInput,
    fieldName: 'fieldName'
  },
  ...commonAddAndEditFields
];

/**
 * Defines the Form model to edit the properties of an existing field of a `Section`.
 *
 * @remarks
 * For existing fields only, some properties can't be changed after the filed has been created. New items must use `sectionElesNewItemAdvanced` instead.
 */
export const sectionElesForEditingAdvanced: Array<FormFieldsModel<SectionCustomFieldProperties>> = [
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'label',
    type: 'text',
    label: 'Field label',
    required: true,
    width: "7"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicSelect,
    fieldName: 'componentCode',
    options: SELECTABLE_FORM_ELES,
    value: 1,
    label: 'Data type',
    required: true,
    width: "3"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'fieldName',
    type: 'text',
    label: 'Identifier',
    disabled: true,
    required: true,
    width: "2"
  },
  ...commonAddAndEditFields
];

export const sectionElesForEditingBasic: Array<FormFieldsModel<SectionCustomFieldProperties>> = [
  {
    componentCode: FORM_COMPONENTS_CODES.basicInput,
    fieldName: 'label',
    type: 'text',
    label: 'Field label',
    required: true,
    width: "8"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.basicSelect,
    fieldName: 'componentCode',
    options: SELECTABLE_FORM_ELES,
    value: 1,
    label: 'Data type',
    required: true,
    width: "4"
  },
  {
    componentCode: FORM_COMPONENTS_CODES.hiddenInput,
    fieldName: 'fieldName'
  },
  ...commonAddAndEditFields
];