import { FORM_COMPONENTS_CODES } from 'app/data/model/form-model-commons';
import { SectionElement } from 'app/data/model/project-info';
import { BasicCheckbox } from 'app/ui-react-components/shared-components/forms-automator/form-fields/basic-checkbox.component';
import { BasicInput } from 'app/ui-react-components/shared-components/forms-automator/form-fields/basic-input.component';
import { BasicRadio } from 'app/ui-react-components/shared-components/forms-automator/form-fields/basic-radio.component';
import { BasicSelect } from 'app/ui-react-components/shared-components/forms-automator/form-fields/basic-select.component';
import { BasicTextarea } from 'app/ui-react-components/shared-components/forms-automator/form-fields/basic-textarea.component';
import { ChildOfSelectorForSection } from 'app/ui-react-components/shared-components/forms-automator/form-fields/child-of-selector-for-section.component';
import { DatePicker } from 'app/ui-react-components/shared-components/forms-automator/form-fields/date-picker.component';
import { DateTimePicker } from 'app/ui-react-components/shared-components/forms-automator/form-fields/date-time-picker.component';
import { IBasicRadio, IBasicSelect, ICommonFormEleProps } from 'app/ui-react-components/shared-components/forms-automator/form-fields/form-fields-model';
import { HiddenInput } from 'app/ui-react-components/shared-components/forms-automator/form-fields/hidden-input.component';
import { OptionsMaker } from 'app/ui-react-components/shared-components/forms-automator/form-fields/options-maker.component';
import { ParentsSelector } from 'app/ui-react-components/shared-components/forms-automator/form-fields/parents-selector.component';

export function formElesSwitcher(key: string, componentCode: FORM_COMPONENTS_CODES, props: ICommonFormEleProps) {
  switch (componentCode) {
    case FORM_COMPONENTS_CODES.hiddenInput:
      return <HiddenInput key={key} {...props} />
    case FORM_COMPONENTS_CODES.basicInput:
      return <BasicInput key={key} {...props} />
    case FORM_COMPONENTS_CODES.basicSelect:
      return <BasicSelect key={key} {...props as ICommonFormEleProps<IBasicSelect<SectionElement>>} />
    case FORM_COMPONENTS_CODES.basicTextarea:
      return <BasicTextarea key={key} {...props} />
    case FORM_COMPONENTS_CODES.basicCheckbox:
      return <BasicCheckbox key={key} {...props} />
    case FORM_COMPONENTS_CODES.basicRadio:
      return <BasicRadio key={key} {...props as ICommonFormEleProps<IBasicRadio<SectionElement>>} />
    case FORM_COMPONENTS_CODES.datePicker:
      return <DatePicker key={key} {...props} />
    case FORM_COMPONENTS_CODES.dateTimePicker:
      return <DateTimePicker key={key} {...props} />
    case FORM_COMPONENTS_CODES.optionsMaker:
      return <OptionsMaker key={key} {...props} />
    case FORM_COMPONENTS_CODES.childOfSelectorForSection:
      return <ChildOfSelectorForSection key={key} {...props as ICommonFormEleProps<IBasicSelect<SectionElement>>} />
    case FORM_COMPONENTS_CODES.parentsSelector:
      return <ParentsSelector key={key} {...props as ICommonFormEleProps<IBasicSelect<SectionElement>>} />
    default:
      return <BasicInput key={key} {...props} />
  }
}