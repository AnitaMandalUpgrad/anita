import { SectionElement } from 'app/models/SectionElement/SectionElement.class'
import { IOptionKeysModel } from 'app/components/shared-components/forms-automator/form-automator.types'

interface ITextFromOptionsByValueProps {
  value: string | number
}

export const TextFromOptionsByValue = (options: Array<IOptionKeysModel>, { value }: ITextFromOptionsByValueProps) => SectionElement.txtByFieldValue(options, value)
